import { NextRequest, NextResponse } from "next/server";
import { readJsonObject } from "../../request-body.mjs";

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? "https://pewwxyyxcepvluowvaxh.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBld3d4eXl4Y2Vwdmx1b3d2YXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxOTA2MjgsImV4cCI6MjA3Mjc2NjYyOH0.nVln959hYDI4mDhdR_4K2FQ_vX9gtiSJMe4yiiqU0qs";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const parsed = await readJsonObject<{
    email?: string;
    password?: string;
    id?: string;
  }>(req);
  if (parsed.ok === false) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }
  const body = parsed.value;

  const email = (body.email ?? "").trim();
  const password = (body.password ?? "").trim();
  const id = (body.id ?? "").trim();
  if (!email || !password || !id) {
    return NextResponse.json({ error: "Date lipsa." }, { status: 400 });
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/petition_admin_delete`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_email: email, p_secret: password, p_id: id }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Neautorizat." }, { status: 401 });
  }

  const deleted = await res.json();
  return NextResponse.json({ ok: true, deleted });
}
