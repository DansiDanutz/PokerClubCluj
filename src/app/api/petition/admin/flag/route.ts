import { NextRequest, NextResponse } from "next/server";
import { readJsonObject } from "../../request-body.mjs";
import { authorizeAdminRequest } from "../admin-auth.mjs";
import { callAdminRpc } from "../admin-rpc";

export const dynamic = "force-dynamic";

// action: "flag" (toggle review flag) | "restore" (show + unflag + unblock IP)
export async function POST(req: NextRequest) {
  const auth = authorizeAdminRequest(req);
  if (auth.ok === false) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  type FlagBody = {
    id?: string;
    action?: "flag" | "restore";
    flagged?: boolean;
  };
  const parsed = await readJsonObject<FlagBody>(req);
  if (parsed.ok === false) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }
  const body = parsed.value;

  const id = (body.id ?? "").trim();
  if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/iu.test(id)) {
    return NextResponse.json({ error: "Date lipsa." }, { status: 400 });
  }

  const isRestore = body.action === "restore";
  if (!isRestore && (body.action !== "flag" || typeof body.flagged !== "boolean")) {
    return NextResponse.json({ error: "Actiune invalida." }, { status: 400 });
  }
  const rpc = isRestore
    ? "petition_admin_restore"
    : "petition_admin_set_flag";
  const payload = isRestore
    ? { p_id: id }
    : {
        p_id: id,
        p_flagged: body.flagged,
      };

  const result = await callAdminRpc(auth.credentials, rpc, payload);
  if (result.ok === false) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
