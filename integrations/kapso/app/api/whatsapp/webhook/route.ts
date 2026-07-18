/**
 * Kapso WhatsApp inbound webhook (Next.js App Router).
 *
 * Receives `whatsapp.message.received` events, verifies the HMAC-SHA256 signature,
 * and replies with an opt-in onboarding/support auto-reply. This only ever responds
 * to users who messaged us first — no unsolicited messaging.
 *
 * Copy to: src/app/api/whatsapp/webhook/route.ts
 */
import crypto from 'crypto';
import { sendText } from '@/lib/whatsapp';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const JOIN_URL = process.env.WC26_JOIN_URL ?? 'https://worldcup26.world/login';

/** Timing-safe HMAC-SHA256 verification over the raw request body. */
function verifySignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Build the auto-reply based on simple keyword intent. */
function buildReply(text: string): string {
  const t = text.trim().toLowerCase();

  if (t === 'stop') {
    return 'You will no longer receive messages from us. Reply START anytime to opt back in.';
  }
  if (t.includes('rule')) {
    return `🏆 WorldCup26 — how it works:\nPick 3 of the 48 teams. They earn points as they win (goals & clean sheets count, multiplied by team & stage coefficients). Climb the leaderboard — top 10 split the prize pool.\nJoin: ${JOIN_URL}\n(18+ · play responsibly)`;
  }
  if (t.includes('deposit') || t.includes('pay') || t.includes('usdt')) {
    return `💳 Entry is paid in USDT. Deposits are credited after the transaction is verified on-chain (transfers are irreversible). Need help? Reply here and our team will assist.\n(18+ · play responsibly)`;
  }
  if (t.includes('payout') || t.includes('withdraw') || t.includes('prize')) {
    return `🏅 Payouts go to the top 10 finishers. Before any withdrawal we verify you are 18+ with a government ID. Reply here if you need a hand.`;
  }
  // Default welcome / onboarding
  return `👋 Welcome to WorldCup26 — the World Cup 2026 pick'em!\nPick 3 teams, climb the leaderboard, top 10 split the pool.\n\n• Reply RULES for how it works\n• Reply DEPOSIT for payments\n• Reply PAYOUT for prizes\n\nJoin here: ${JOIN_URL}\n(18+ · play responsibly · reply STOP to opt out)`;
}

export async function POST(req: Request): Promise<Response> {
  const secret = process.env.KAPSO_WEBHOOK_SECRET;
  if (!secret) return new Response('Server not configured', { status: 500 });

  // Read the RAW body for signature verification (do not parse first).
  const rawBody = await req.text();
  const signature = req.headers.get('x-webhook-signature');

  if (!verifySignature(rawBody, signature, secret)) {
    return new Response('Invalid signature', { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response('Bad JSON', { status: 400 });
  }

  // Extract inbound messages. Kapso proxies Meta's Cloud API shape:
  // entry[].changes[].value.messages[] with .from, .text.body, .type
  try {
    const entries = payload?.entry ?? [];
    for (const entry of entries) {
      for (const change of entry?.changes ?? []) {
        const messages = change?.value?.messages ?? [];
        for (const msg of messages) {
          if (msg?.type !== 'text') continue; // only handle text for now
          const from: string = msg.from;
          const text: string = msg.text?.body ?? '';
          if (from) {
            await sendText(from, buildReply(text));
          }
        }
      }
    }
  } catch (err) {
    // Never 500 on a handled webhook — log and ack so Kapso doesn't retry-storm.
    console.error('[whatsapp webhook] handler error', err);
  }

  return new Response('ok', { status: 200 });
}

// Some providers verify the endpoint with a GET challenge. Adjust to Kapso's flow if needed.
export async function GET(): Promise<Response> {
  return new Response('ok', { status: 200 });
}
