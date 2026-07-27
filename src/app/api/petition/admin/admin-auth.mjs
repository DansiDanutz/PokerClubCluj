import {
  ADMIN_SESSION_COOKIE,
  configuredAdminSessionSecret,
  openAdminSession,
} from "./admin-session.mjs";
import { hasSameOrigin } from "./request-guard.mjs";

const cookieValue = (request, name) => {
  const fromNext = request.cookies?.get?.(name)?.value;
  if (fromNext) return fromNext;
  const header = request.headers.get("cookie") ?? "";
  for (const entry of header.split(";")) {
    const [key, ...parts] = entry.trim().split("=");
    if (key === name) return parts.join("=");
  }
  return undefined;
};

export const authorizeAdminRequest = (request, env = process.env, now = Date.now()) => {
  if (!hasSameOrigin(request)) {
    return { ok: false, error: "Origine nepermisa.", status: 403 };
  }
  const secret = configuredAdminSessionSecret(env);
  if (!secret) {
    return { ok: false, error: "Administrarea nu este configurata.", status: 503 };
  }
  const credentials = openAdminSession(
    cookieValue(request, ADMIN_SESSION_COOKIE),
    secret,
    now,
  );
  if (!credentials) {
    return { ok: false, error: "Sesiune expirata.", status: 401 };
  }
  return { ok: true, credentials };
};

