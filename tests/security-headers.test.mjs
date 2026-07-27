import assert from "node:assert/strict";
import test from "node:test";

import nextConfig from "../next.config.mjs";

test("every route receives the production browser-security baseline", async () => {
  const rules = await nextConfig.headers();
  const global = rules.find((rule) => rule.source === "/:path*");
  assert.ok(global);
  const headers = Object.fromEntries(
    global.headers.map(({ key, value }) => [key.toLowerCase(), value]),
  );

  assert.match(headers["content-security-policy"], /default-src 'self'/u);
  assert.match(headers["content-security-policy"], /object-src 'none'/u);
  assert.match(headers["content-security-policy"], /frame-ancestors 'none'/u);
  assert.equal(headers["x-content-type-options"], "nosniff");
  assert.equal(headers["x-frame-options"], "DENY");
  assert.equal(headers["referrer-policy"], "strict-origin-when-cross-origin");
  assert.match(headers["strict-transport-security"], /max-age=63072000/u);
  assert.equal(headers["cross-origin-opener-policy"], "same-origin");
});
