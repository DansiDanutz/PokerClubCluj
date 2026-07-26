import { NextRequest, NextResponse } from "next/server";
import { readJsonObject } from "../request-body.mjs";

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? "https://pewwxyyxcepvluowvaxh.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBld3d4eXl4Y2Vwdmx1b3d2YXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxOTA2MjgsImV4cCI6MjA3Mjc2NjYyOH0.nVln959hYDI4mDhdR_4K2FQ_vX9gtiSJMe4yiiqU0qs";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
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
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    "unknown";

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/petition_like`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_id: id, p_ip: ip }),
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Eroare." }, { status: 500 });
  }

  const likes = await res.json();
  return NextResponse.json({ ok: true, likes });
}
