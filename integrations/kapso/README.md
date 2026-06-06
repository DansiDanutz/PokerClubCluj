# Kapso WhatsApp Integration (drop-in module)

Compliant, **opt-in** WhatsApp automation for WorldCup26 built on [Kapso](https://kapso.ai).
This module **only replies to people who message you first** (support + onboarding). It does
**not** send unsolicited bulk messages — that violates Meta's WhatsApp Business policy and gets
your number permanently banned.

> ⚠️ This folder lives in the `pokercluj` repo for delivery only. **Copy these files into the
> WorldCup26 Next.js app** (it's also Next.js App Router, so they drop straight in).

## Files & where they go (in the WorldCup26 app)
| This module | Copy to (worldcup26 app) |
|---|---|
| `lib/whatsapp.ts` | `src/lib/whatsapp.ts` |
| `app/api/whatsapp/webhook/route.ts` | `src/app/api/whatsapp/webhook/route.ts` |
| `.env.example` | merge into your `.env.local` / Vercel env vars |

## 1. Install
```bash
npm install @kapso/whatsapp-cloud-api
```

## 2. Set environment variables (NEVER commit secrets)
In Vercel → Project → Settings → Environment Variables (and `.env.local` for dev):
```
KAPSO_API_KEY=...            # from Kapso dashboard — ROTATE the one you pasted in chat
KAPSO_PHONE_NUMBER_ID=...    # your WhatsApp phone number id
KAPSO_WEBHOOK_SECRET=...     # from Kapso account settings (for signature verification)
KAPSO_BASE_URL=https://app.kapso.ai/api/meta/
WC26_JOIN_URL=https://worldcup26.world/login
```

## 3. Register the webhook (CLI)
```bash
kapso whatsapp webhooks new \
  --phone-number-id "$KAPSO_PHONE_NUMBER_ID" \
  --url "https://worldcup26.world/api/whatsapp/webhook" \
  --event whatsapp.message.received \
  --active
```

## 4. Test
Message your WhatsApp business number from your phone. You should get the onboarding auto-reply.

---

## Compliance guardrails (read before going further)
- **Opt-in only.** This bot replies inside the 24-hour customer-service window opened when a user
  messages you. Do not message people who didn't contact you.
- **Real-money gambling is restricted** under WhatsApp's Business Messaging Policy. Confirm WhatsApp's
  stance for your region before sending any *promotional* templates. Support + transactional is safest.
- **Templates** (business-initiated, e.g. match reminders) must be pre-approved in your WABA and sent
  **only to users who explicitly opted in** to receive them.
- Keep an **unsubscribe** path ("reply STOP") and honor it.
