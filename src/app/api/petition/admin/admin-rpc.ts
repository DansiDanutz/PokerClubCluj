import type { AdminCredentials } from "./admin-session.mjs";
import {
  getSupabaseConfig,
  supabaseHeaders,
} from "../supabase-config.mjs";

export type Failure = { ok: false; error: string; status: 401 | 429 | 502 | 503 };
export type Success = { ok: true; response: Response };

export async function callAdminRpc(
  credentials: AdminCredentials,
  rpc: string,
  payload: Record<string, unknown> = {},
): Promise<Failure | Success> {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, error: "Administrarea nu este configurata.", status: 503 };
  }

  let response: Response;
  try {
    response = await fetch(`${config.url}/rest/v1/rpc/${rpc}`, {
      method: "POST",
      headers: supabaseHeaders(config),
      body: JSON.stringify({
        ...payload,
        p_api_secret: config.apiSecret,
        p_email: credentials.email,
        p_secret: credentials.password,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return { ok: false, error: "Serviciul de administrare nu raspunde.", status: 502 };
  }

  if (response.status === 429) {
    return { ok: false, error: "Prea multe incercari.", status: 429 };
  }
  if (response.status >= 500) {
    return { ok: false, error: "Serviciul de administrare nu raspunde.", status: 502 };
  }
  if (!response.ok) {
    return { ok: false, error: "Neautorizat.", status: 401 };
  }
  return { ok: true, response };
}
