import { NextRequest, NextResponse } from "next/server";

// Cheia "anon" este publica prin design (protectia reala este RLS in Supabase);
// env vars permit suprascrierea fara redeploy de cod.
const SUPABASE_URL =
  process.env.SUPABASE_URL ?? "https://pewwxyyxcepvluowvaxh.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBld3d4eXl4Y2Vwdmx1b3d2YXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxOTA2MjgsImV4cCI6MjA3Mjc2NjYyOH0.nVln959hYDI4mDhdR_4K2FQ_vX9gtiSJMe4yiiqU0qs";

const baseHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
};

export const dynamic = "force-dynamic";

export async function GET() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.json({ count: 0, recent: [] });
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/petition_stats`, {
      method: "POST",
      headers: baseHeaders,
      body: "{}",
      cache: "no-store",
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
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.json(
      { error: "Colectarea semnaturilor nu este inca activata." },
      { status: 503 }
    );
  }

  let body: {
    fullName?: string;
    email?: string;
    city?: string;
    comment?: string;
    website?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalida." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const fullName = (body.fullName ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  const city = (body.city ?? "").trim();
  const comment = (body.comment ?? "").trim();

  if (fullName.length < 3 || fullName.length > 120) {
    return NextResponse.json(
      { error: "Va rugam introduceti numele complet." },
      { status: 400 }
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Adresa de email nu este valida." },
      { status: 400 }
    );
  }

  let res: Response;
  try {
    res = await fetch(`${SUPABASE_URL}/rest/v1/petition_signatures`, {
      method: "POST",
      headers: { ...baseHeaders, Prefer: "return=minimal" },
      body: JSON.stringify({
        full_name: fullName,
        email,
        city: city || null,
        comment: comment || null,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "A aparut o eroare de conexiune. Va rugam incercati din nou." },
      { status: 502 }
    );
  }

  if (res.status === 409) {
    return NextResponse.json(
      { error: "Aceasta adresa de email a semnat deja. Multumim!" },
      { status: 409 }
    );
  }
  if (!res.ok) {
    return NextResponse.json(
      { error: "A aparut o eroare. Va rugam incercati din nou." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
