import type { AdminCredentials } from "./admin-session.mjs";

export function authorizeAdminRequest(
  request: Request,
  env?: NodeJS.ProcessEnv,
  now?: number,
):
  | { ok: true; credentials: AdminCredentials }
  | { ok: false; error: string; status: 401 | 403 | 503 };

