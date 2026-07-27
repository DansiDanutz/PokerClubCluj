import { NextRequest, NextResponse } from "next/server";
import { readJsonObject } from "../request-body.mjs";
import { getSupabaseConfig, supabaseHeaders } from "../supabase-config.mjs";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const config = getSupabaseConfig();
  if (!config) {
    return NextResponse.json({ error: "Serviciul nu este configurat." }, { status: 503 });
  }
  const parsed = await readJsonObject<{ id?: string }>(req);
  if (parsed.ok === false) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }
  const body = parsed.value;

  const id = (body.id ?? "").trim();
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "ID invalid." }, { status: 400 });
  }

  const ip =
    (
      req.headers.get("x-vercel-forwarded-for") ??
      req.headers.get("x-forwarded-for") ??
      ""
    )
      .split(",")[0]
      .trim()
      .slice(0, 64) ||
    "unknown";

  let res: Response;
  try {
    res = await fetch(`${config.url}/rest/v1/rpc/petition_like`, {
      method: "POST",
      headers: supabaseHeaders(config),
      body: JSON.stringify({
        p_id: id,
        p_ip: ip,
        p_api_secret: config.apiSecret,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return NextResponse.json({ error: "Serviciul nu raspunde." }, { status: 502 });
  }

  if (!res.ok) {
    return NextResponse.json({ error: "Eroare." }, { status: 500 });
  }

  const likes = await res.json();
  return NextResponse.json({ ok: true, likes });
}
