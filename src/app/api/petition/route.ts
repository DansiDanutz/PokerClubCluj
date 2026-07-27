import { NextRequest, NextResponse } from "next/server";
import { classifyPetitionInsert } from "./petition-insert.mjs";
import { validatePetitionBody } from "./petition-input.mjs";
import { readJsonObject } from "./request-body.mjs";
import { getSupabaseConfig, supabaseHeaders } from "./supabase-config.mjs";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = getSupabaseConfig();
  if (!config) {
    return NextResponse.json({ count: 0, recent: [] });
  }
  try {
    const res = await fetch(`${config.url}/rest/v1/rpc/petition_stats`, {
      method: "POST",
      headers: supabaseHeaders(config),
      body: JSON.stringify({ p_api_secret: config.apiSecret }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      return NextResponse.json({ count: 0, recent: [] });
    }
    const stats = await res.json();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ count: 0, recent: [] });
  }
}

export async function POST(req: NextRequest) {
  const config = getSupabaseConfig();
  if (!config) {
    return NextResponse.json(
      { error: "Colectarea semnaturilor nu este inca activata." },
      { status: 503 }
    );
  }

  type PetitionBody = {
    fullName?: string;
    email?: string;
    city?: string;
    comment?: string;
    website?: string;
  };
  const parsed = await readJsonObject<PetitionBody>(req);
  if (parsed.ok === false) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }
  const body = parsed.value;

  // Honeypot: real users never fill this hidden field.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const validated = validatePetitionBody(body);
  if (validated.ok === false) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }
  const { fullName, email, city, comment } = validated.value;

  // Retinute pentru prevenirea si investigarea abuzurilor (nu sunt publice).
  const ip =
    (
      req.headers.get("x-vercel-forwarded-for") ??
      req.headers.get("x-forwarded-for") ??
      ""
    )
      .split(",")[0]
      .trim()
      .slice(0, 64) || null;
  const userAgent = req.headers.get("user-agent")?.slice(0, 300) ?? null;
  const lang = req.headers.get("accept-language")?.slice(0, 120) ?? null;

  let res: Response;
  try {
    res = await fetch(`${config.url}/rest/v1/rpc/petition_submit`, {
      method: "POST",
      headers: supabaseHeaders(config),
      body: JSON.stringify({
        p_full_name: fullName,
        p_email: email,
        p_city: city || null,
        p_comment: comment || null,
        p_ip: ip,
        p_user_agent: userAgent,
        p_lang: lang,
        p_api_secret: config.apiSecret,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return NextResponse.json(
      { error: "A aparut o eroare de conexiune. Va rugam incercati din nou." },
      { status: 502 }
    );
  }

  const result = classifyPetitionInsert(res.status);
  return NextResponse.json(result.body, { status: result.status });
}
