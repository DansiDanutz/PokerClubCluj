# PokerClubCluj

Public campaign site and petition workflow for the Cluj-Napoca local-council
memorandum. The application is a Next.js App Router project deployed by Vercel;
petition data and moderation RPCs are provided by Supabase.

## Repository map

- `src/app/page.tsx`: public campaign landing page
- `src/app/memoriu/`: memorandum, signature form, printable document, and admin UI
- `src/app/api/petition/`: bounded public petition/statistics and like routes
- `src/app/api/petition/admin/`: authenticated moderation routes and session helpers
- `tests/`: request-boundary, session, privacy, CSV, and browser-header regressions
- `public/memoriu-poker-cluj-iulie-2026.pdf`: published memorandum PDF
- `greptile.json`: repository-specific automated review policy

## Local setup

Use Node.js 20.9 or newer.

```bash
npm ci
npm run verify
```

The runtime fails closed unless these variables are explicitly configured:

- `SUPABASE_URL`: HTTPS Supabase project origin
- `SUPABASE_ANON_KEY`: publishable anon key used only to invoke approved RPCs
- `PETITION_API_SECRET`: at least 32 random bytes used server-side as a second
  factor for every public and administrative petition RPC
- `ADMIN_SESSION_SECRET`: at least 32 random bytes used only server-side to encrypt
  two-hour admin session cookies

For an authorized Vercel project checkout, `vercel env pull` can populate a
gitignored `.env.local`. Never commit `.env*` files or a Supabase service-role
key.

## Security model

- Request bodies are JSON objects capped at 16 KiB and fields are bounded again
  at the application boundary.
- Public and administrative routes use secret-gated RPC overloads. Direct Data
  API access to petition tables is disabled, so the anon key alone cannot read
  or mutate petition data.
- Duplicate signatures return the same public success shape as new signatures,
  preventing email-membership enumeration.
- Admin credentials are submitted only at login. Successful login creates an
  encrypted, `HttpOnly`, `SameSite=Strict` cookie; moderation calls require that
  session and an exact same-origin request.
- Vercel Firewall rate-limits petition submission, likes, admin login, and admin
  mutation paths by source IP. Provider rules are deployment configuration and
  must be reverified during every security audit.
- CSV exports neutralize spreadsheet formula prefixes before download.
- Production responses include CSP, HSTS, framing, MIME, referrer, opener, and
  permissions headers from `next.config.mjs`.

Supabase remains the final authorization and row-level-security boundary. The
versioned migrations in `supabase/migrations/` define the petition RPC and table
privilege boundary. Retention policy and operator account recovery still require
separate provider-side validation.

## Release gate

`npm run verify` runs the full dependency audit, regression suite, TypeScript
check, and production build. Pull requests also run the pinned GitHub Actions
workflow, Greptile review, and Vercel preview before merge.
