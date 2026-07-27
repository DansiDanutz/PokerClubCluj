import { NextRequest, NextResponse } from "next/server";
import { readJsonObject } from "../../request-body.mjs";
import { authorizeAdminRequest } from "../admin-auth.mjs";
import { callAdminRpc } from "../admin-rpc";

export const dynamic = "force-dynamic";

// Fixeaza/defixeaza un mesaj ca "mesaj al organizatorului" (apare sus, marcat transparent).
export async function POST(req: NextRequest) {
  const auth = authorizeAdminRequest(req);
  if (auth.ok === false) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const parsed = await readJsonObject<{
    id?: string;
    featured?: boolean;
  }>(req);
  if (parsed.ok === false) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }
  const body = parsed.value;

  const id = (body.id ?? "").trim();
  if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/iu.test(id) || typeof body.featured !== "boolean") {
    return NextResponse.json({ error: "Date lipsa." }, { status: 400 });
  }

  const result = await callAdminRpc(auth.credentials, "petition_admin_set_featured", {
    p_id: id,
    p_featured: body.featured,
  });
  if (result.ok === false) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
