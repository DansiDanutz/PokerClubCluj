import { NextRequest, NextResponse } from "next/server";
import { readJsonObject } from "../request-body.mjs";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  configuredAdminSessionSecret,
  sealAdminSession,
} from "./admin-session.mjs";
import { authorizeAdminRequest } from "./admin-auth.mjs";
import { callAdminRpc } from "./admin-rpc";
import { hasSameOrigin } from "./request-guard.mjs";

export const dynamic = "force-dynamic";

const rowsFor = async (credentials: { email: string; password: string }) => {
  const result = await callAdminRpc(credentials, "petition_admin_list");
  if (result.ok === false) return result;
  try {
    return { ok: true as const, rows: await result.response.json() };
  } catch {
    return {
      ok: false as const,
      error: "Raspuns invalid de la serviciul de administrare.",
      status: 502 as const,
    };
  }
};

const errorResponse = (result: { error: string; status: number }) =>
  NextResponse.json({ error: result.error }, { status: result.status });

export async function POST(req: NextRequest) {
  if (!hasSameOrigin(req)) {
    return NextResponse.json({ error: "Origine nepermisa." }, { status: 403 });
  }
  const sessionSecret = configuredAdminSessionSecret();
  if (!sessionSecret) {
    return NextResponse.json(
      { error: "Administrarea nu este configurata." },
      { status: 503 },
    );
  }
  const parsed = await readJsonObject<{ email?: string; password?: string }>(req);
  if (parsed.ok === false) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }
  const body = parsed.value;

  const email = (body.email ?? "").trim().toLowerCase();
  const password = (body.password ?? "").trim();
  if (!email || email.length > 254 || !password || password.length > 512) {
    return NextResponse.json(
      { error: "Email si parola sunt obligatorii." },
      { status: 400 }
    );
  }

  const result = await rowsFor({ email, password });
  if (result.ok === false) return errorResponse(result);

  const response = NextResponse.json({ rows: result.rows });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: sealAdminSession({ email, password }, sessionSecret),
    httpOnly: true,
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    path: "/api/petition/admin",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

export async function PUT(req: NextRequest) {
  const auth = authorizeAdminRequest(req);
  if (auth.ok === false) return errorResponse(auth);
  const result = await rowsFor(auth.credentials);
  if (result.ok === false) return errorResponse(result);
  return NextResponse.json({ rows: result.rows });
}

export async function DELETE(req: NextRequest) {
  if (!hasSameOrigin(req)) {
    return NextResponse.json({ error: "Origine nepermisa." }, { status: 403 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    maxAge: 0,
    path: "/api/petition/admin",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
