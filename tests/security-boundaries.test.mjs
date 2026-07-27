import assert from "node:assert/strict";
import test from "node:test";

import {
  ADMIN_SESSION_MAX_AGE_SECONDS,
  ADMIN_SESSION_COOKIE,
  openAdminSession,
  sealAdminSession,
} from "../src/app/api/petition/admin/admin-session.mjs";
import { authorizeAdminRequest } from "../src/app/api/petition/admin/admin-auth.mjs";
import { hasSameOrigin } from "../src/app/api/petition/admin/request-guard.mjs";
import { classifyPetitionInsert } from "../src/app/api/petition/petition-insert.mjs";
import { validatePetitionBody } from "../src/app/api/petition/petition-input.mjs";
import { getSupabaseConfig } from "../src/app/api/petition/supabase-config.mjs";
import { escapeCsvCell } from "../src/app/memoriu/csv.mjs";

const secret = "test-secret-that-is-at-least-thirty-two-characters-long";

test("admin credentials round-trip through an opaque expiring session", () => {
  const now = Date.UTC(2026, 6, 27, 8, 0, 0);
  const credentials = { email: "admin@example.com", password: "not-for-the-client" };
  const token = sealAdminSession(credentials, secret, now);

  assert.ok(!token.includes(credentials.email));
  assert.ok(!token.includes(credentials.password));
  assert.deepEqual(openAdminSession(token, secret, now + 1_000), credentials);
  assert.equal(
    openAdminSession(token, secret, now + ADMIN_SESSION_MAX_AGE_SECONDS * 1_000 + 1),
    null,
  );
});

test("admin sessions reject tampering and the wrong signing secret", () => {
  const token = sealAdminSession(
    { email: "admin@example.com", password: "correct horse battery staple" },
    secret,
  );
  const replacement = token.endsWith("A") ? "B" : "A";
  const tampered = `${token.slice(0, -1)}${replacement}`;

  assert.equal(openAdminSession(tampered, secret), null);
  assert.equal(openAdminSession(token, `${secret}-wrong`), null);
});

test("privileged writes require an exact same-origin browser request", () => {
  const request = (origin) => ({
    headers: new Headers(origin ? { origin } : {}),
    url: "https://poker-club-cluj.vercel.app/api/petition/admin/delete",
  });

  assert.equal(hasSameOrigin(request("https://poker-club-cluj.vercel.app")), true);
  assert.equal(hasSameOrigin(request("https://attacker.example")), false);
  assert.equal(hasSameOrigin(request(null)), false);
});

test("privileged writes recover credentials only from a valid session cookie", () => {
  const credentials = { email: "admin@example.com", password: "session-only-password" };
  const token = sealAdminSession(credentials, secret);
  const request = {
    headers: new Headers({
      cookie: `${ADMIN_SESSION_COOKIE}=${token}`,
      origin: "https://poker-club-cluj.vercel.app",
    }),
    url: "https://poker-club-cluj.vercel.app/api/petition/admin/delete",
  };

  assert.deepEqual(
    authorizeAdminRequest(request, { ADMIN_SESSION_SECRET: secret }),
    { ok: true, credentials },
  );
  assert.equal(authorizeAdminRequest(request, {}).status, 503);
});

test("duplicate petition submissions do not disclose supporter membership", () => {
  assert.deepEqual(classifyPetitionInsert(201), { body: { ok: true }, status: 201 });
  assert.deepEqual(classifyPetitionInsert(409), { body: { ok: true }, status: 201 });
  assert.deepEqual(classifyPetitionInsert(500), {
    body: { error: "A aparut o eroare. Va rugam incercati din nou." },
    status: 500,
  });
});

test("petition validation enforces server-side field bounds", () => {
  const valid = {
    fullName: "Ana Popescu",
    email: "ANA@example.com",
    city: "Cluj-Napoca",
    comment: "Susțin memoriul.",
  };
  assert.deepEqual(validatePetitionBody(valid), {
    ok: true,
    value: {
      fullName: "Ana Popescu",
      email: "ana@example.com",
      city: "Cluj-Napoca",
      comment: "Susțin memoriul.",
    },
  });
  assert.equal(validatePetitionBody({ ...valid, city: "x".repeat(81) }).ok, false);
  assert.equal(validatePetitionBody({ ...valid, comment: "x".repeat(2_001) }).ok, false);
});

test("Supabase configuration fails closed without an explicit HTTPS deployment target", () => {
  assert.equal(getSupabaseConfig({}), null);
  assert.equal(
    getSupabaseConfig({
      SUPABASE_URL: "http://example.com",
      SUPABASE_ANON_KEY: "public",
      PETITION_API_SECRET: "x".repeat(32),
    }),
    null,
  );
  assert.deepEqual(
    getSupabaseConfig({
      SUPABASE_URL: "https://example.supabase.co/",
      SUPABASE_ANON_KEY: "public-anon-key",
      PETITION_API_SECRET: "server-only-secret-that-is-long-enough",
    }),
    {
      anonKey: "public-anon-key",
      apiSecret: "server-only-secret-that-is-long-enough",
      url: "https://example.supabase.co",
    },
  );
});

test("CSV cells neutralize spreadsheet formulas without damaging normal text", () => {
  assert.equal(escapeCsvCell("Ana Popescu"), '"Ana Popescu"');
  assert.equal(escapeCsvCell('Ana "Ace" Popescu'), '"Ana ""Ace"" Popescu"');
  assert.equal(escapeCsvCell("=HYPERLINK(\"https://attacker.example\")"),
    '"\'=HYPERLINK(""https://attacker.example"")"');
  assert.equal(escapeCsvCell("  +SUM(1,2)"), '"\'  +SUM(1,2)"');
});
