# Full Audit Report — worldcup26.world

**Audit date:** 2026-06-05
**Target:** https://worldcup26.world/
**Auditor:** Automated review (HTTP/headers, markup, endpoints, legal pages)
**Scope:** Public, unauthenticated surface only (no account, no penetration testing)

---

## 1. Executive Summary

WorldCup26.world is a **real-money FIFA World Cup 2026 prediction game**: users pay a **$50 USDT buy-in**, pick 3 of the 48 teams, and compete for a shared **$4,360 prize pool** (top 10). It is a well-built modern web app (Next.js + Supabase on Vercel/Cloudflare) with **strong HTTP security headers** and a **complete PWA** setup.

The engineering is solid. **The primary risk is not technical — it is legal/compliance.** This is a paid-entry, crypto-settled contest with affiliate/agent reselling, which puts it squarely in gambling/lottery/AML/consumer-protection territory. The current Terms and Privacy pages are thin for that risk profile, there is no operator legal identity, no responsible-gaming provision, and no jurisdiction restrictions. Search visibility is also fully disabled (`noindex` site-wide).

**Overall grade by area:**

| Area | Grade | Note |
|---|---|---|
| Security (headers/transport) | A− | Strong CSP/HSTS; `unsafe-inline` is the gap |
| Infrastructure / Stack | A | Next.js + Supabase + Vercel/Cloudflare |
| PWA / Mobile | A | Complete manifest, maskable icons |
| SEO / Discoverability | D | Entire site `noindex`, no sitemap/robots |
| Privacy compliance | C− | Basics only; no cookies/GDPR/processors |
| Legal / Gambling compliance | D | High-risk model, thin protections |
| Responsible gaming | F | None present |

---

## 2. What the Site Is

- **Model:** Pick 3 teams → earn points as they perform → climb leaderboard → top 10 split prize pool.
- **Money:** $50 USDT entry; $4,360 pool; payouts to crypto wallets.
- **Scoring:** `(base + goal bonus + clean-sheet bonus) × team coefficient × stage coefficient`. Team coefficients 1.00–3.00 (underdogs higher); stage multiplier 1.0× (group) → 2.0× (final).
- **Growth mechanics:** Referral commissions (5% if invited, 3% direct) and an **"Agent Deal"** reselling program (1 free code per 10 sold).
- **Auth:** Google sign-in.
- **Support:** WhatsApp only (`wa.me/40750257337` — Romania, +40).
- **Status:** Pre-launch (event starts 11 Jun 2026; leaderboard shows one seeded user).

---

## 3. Technical & Infrastructure

| Item | Finding |
|---|---|
| Framework | **Next.js** (App Router, Turbopack build) |
| Hosting | **Vercel** (`server: Vercel`, `x-vercel-id`, `x-vercel-cache`) |
| Backend | **Supabase** (auth/db/realtime — `*.supabase.co`, `wss://*.supabase.co`) |
| API | Separate `api.worldcup26.world` behind **Cloudflare** (`__cf_bm` bot mgmt, `cf-ray`) |
| Protocol | HTTP/2 + HTTP/3 advertised (`alt-svc: h3`) on API |
| Rendering | Client-rendered app shell with launch splash screen |
| PWA | `manifest.webmanifest`, maskable + apple-touch icons, standalone/portrait |

**Observations**
- Clean separation of front end (Vercel) and API (Cloudflare) is a good architecture.
- `x-powered-by: Next.js` is exposed — minor information disclosure; recommend removing via `poweredByHeader: false`.
- App-shell + heavy JS chunk loading means first paint depends on JS; consider measuring Core Web Vitals (see §6).

---

## 4. Security Review

### 4.1 HTTP response headers (front end) — strong

| Header | Value | Verdict |
|---|---|---|
| `content-security-policy` | restrictive (see below) | Good, with one gap |
| `strict-transport-security` | `max-age=63072000; includeSubDomains; preload` | Excellent (2y, preload) |
| `x-frame-options` | `DENY` | Good |
| `x-content-type-options` | `nosniff` | Good |
| `referrer-policy` | `strict-origin-when-cross-origin` | Good |
| `permissions-policy` | `camera=(), microphone=(), geolocation=()` | Good |
| `x-powered-by` | `Next.js` | Remove (info disclosure) |

**CSP detail:**
```
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none';
form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https://flagcdn.com; font-src 'self' data:;
connect-src 'self' https://*.supabase.co wss://*.supabase.co
  https://api.worldcup26.world wss://api.worldcup26.world;
frame-src 'self'; worker-src 'self' blob:; manifest-src 'self'; upgrade-insecure-requests
```
- **Strengths:** locked `default-src`/`base-uri`/`object-src`/`frame-ancestors`/`form-action`; explicit allow-list for Supabase + API; `upgrade-insecure-requests`.
- **Gap:** `script-src 'unsafe-inline'` and `style-src 'unsafe-inline'` substantially weaken the CSP's XSS protection. Migrate to **nonce- or hash-based** script/style policies (Next.js supports CSP nonces). This is the single most valuable security hardening here.

### 4.2 API subdomain
- Returns `404 {json}` on root (no info leak), sets Cloudflare bot-management cookie, HSTS present, `x-frame-options: SAMEORIGIN`. Reasonable. Authenticated endpoints were **not** tested (out of scope).

### 4.3 Missing / recommended
- **No `/.well-known/security.txt`** (404). Add one with a security contact for responsible disclosure — especially important for a platform holding funds.
- Confirm Supabase **Row Level Security (RLS)** is enforced on all tables (wallets, picks, balances). With a public Supabase URL in the CSP, RLS is the only thing preventing direct data access — this is the highest-impact item to verify internally (not externally observable).
- Validate that **payout/withdrawal logic and balance mutations are server-side only** (never trust client). Not externally verifiable; flag for internal review.

---

## 5. SEO & Discoverability

| Check | Result |
|---|---|
| `<title>` / meta description | Present and good |
| Open Graph tags | Complete (title, description, image 1200×630, type) |
| Twitter Card | Complete (`summary_large_image`) |
| **Robots meta** | **`noindex` site-wide** |
| `robots.txt` | Not a real file (serves app 404) |
| `sitemap.xml` | **404** |
| Canonical | Not observed |

- The entire site is **excluded from search engines** (`<meta name="robots" content="noindex">` on the rendered page). If this is intentional (invite-only / regulatory caution), fine — but it means **zero organic discovery**. If growth via search is desired, remove `noindex`, add a real `robots.txt` and `sitemap.xml`, and add canonical URLs.
- Social sharing previews, however, are well configured (OG/Twitter), so referral links will render nicely on WhatsApp/social.

---

## 6. Performance (recommended, not measured)

Lighthouse/WebPageTest were not run in this audit. Given the architecture (client-rendered app shell, multiple JS chunks, splash screen), recommend:
- Run **Lighthouse** (mobile) and capture **Core Web Vitals** (LCP, INP, CLS).
- Verify fonts are subset/preloaded (one `woff2` is already preloaded — good).
- Consider server-rendering the marketing/landing content for faster LCP and to allow indexing if SEO is enabled.

---

## 7. PWA & Mobile

Strong. `manifest.webmanifest` is complete:
- `name`, `short_name`, `description`, `id`, `start_url=/?source=pwa`, `scope=/`
- `display: standalone` + `display_override` (window-controls-overlay, standalone, browser)
- `theme_color #106b4f`, `background_color #04120f`, `portrait`
- `categories: [sports, games, entertainment]`
- Icons: 192, 512, **maskable-512** (correct for Android adaptive icons), apple-touch-icon 180
- `viewport`, `apple-mobile-web-app-*`, `theme-color` all set.

Installable PWA experience is essentially production-ready.

---

## 8. Legal & Regulatory Compliance — **highest priority**

This is a **paid-entry, crypto-settled contest** with **affiliate and reseller commissions**. Depending on jurisdiction this may be classified as gambling, a lottery, or a skill contest — each with different licensing, tax, AML, and advertising obligations. The Romania-based contact (+40) suggests an EU nexus, which brings GDPR and EU gambling rules into play.

### 8.1 Terms of Use — present vs missing
**Present:** 18+ requirement (and ID proof before payout), "use only where lawful" self-certification, USDT/irreversibility disclosure, KYC via government photo ID, fixed mid-tournament rules.

**Missing (recommend adding):**
- **Operator legal identity** — company name, registration number, registered address. (Currently none — a major trust and legal gap for a platform holding money.)
- **Regulatory classification / licensing** statement.
- **Prohibited / restricted jurisdictions** list (US states, and any country where this is illegal).
- **Refund / cancellation policy.**
- **Dispute resolution / arbitration / governing law.**
- **Limitation of liability** and warranty disclaimers.
- **Responsible gaming** provisions (see §8.3).
- **Anti–money-laundering** policy and source-of-funds terms (KYC currently only at withdrawal).

### 8.2 Privacy Policy — present vs missing
**Present:** data collected (email, display name, user ID, picks, wallet addresses, age-verification status, deposit claims), Google sign-in, generic third-party categories, retention rationale, access/correction/deletion on request.

**Missing (recommend adding):**
- **Cookie/tracking disclosure** — the site/API set cookies (e.g., Cloudflare `__cf_bm`); a cookie notice/consent is likely required under EU ePrivacy/GDPR.
- **Named processors** — Supabase, Vercel, Cloudflare, Google, payment/analytics vendors.
- **GDPR/CCPA framing** — legal basis, data-subject rights, **international transfer** mechanism (US-hosted Supabase/Vercel with EU users).
- **DPO / dedicated privacy contact** (WhatsApp alone is insufficient).
- **Specific retention periods.**
- **Children's data** safeguards beyond "adults only."

### 8.3 Responsible gaming — **absent**
No deposit limits, self-exclusion, problem-gambling resources, or links to support organizations. For a real-money product this is both an ethical and (in many jurisdictions) a legal gap. Add a responsible-gaming page and visible links.

### 8.4 AML / financial
- Crypto in **and** crypto out, plus reseller "agent" codes, create money-transmission and AML exposure. KYC is deferred to withdrawal; consider risk-based checks at deposit and transaction monitoring. Seek qualified legal/AML counsel for the target markets.

> **Note:** This section flags risk areas; it is not legal advice. Engage gaming/AML counsel for the specific operating jurisdictions before scaling (especially before the agent/reseller program expands distribution).

---

## 9. UX & Content

- **Single language (English)** despite an EU/Romania footprint — consider i18n (RO and others) for the target audience.
- **Support is WhatsApp-only** — fine for early stage, but add an email and an in-app help/FAQ for trust and for the privacy "contact" requirement.
- **Clear value prop and rules** on the landing page (picks, prize pool, scoring, coefficients) — well presented.
- **Leaderboard** currently shows a single seeded entry ("Seme", 0 pts) — expected pre-launch; ensure seed/test data is removed or clearly labeled at launch.
- Strong, consistent branding (splash screen, theme colors, icons).

---

## 10. Prioritized Recommendations

### Critical (before taking real money at scale)
1. **Publish operator legal identity** (entity, registration, address) and obtain jurisdiction/licensing review from gaming + AML counsel.
2. **Add responsible-gaming** page, deposit limits, self-exclusion, and support links.
3. **Expand Terms**: prohibited jurisdictions, refunds, dispute resolution/governing law, limitation of liability, AML policy.
4. **Verify Supabase RLS** and that all balance/payout mutations are server-authoritative (internal check).

### High
5. **Harden CSP**: replace `script-src/style-src 'unsafe-inline'` with nonces/hashes.
6. **Privacy**: add cookie/consent notice, name processors, GDPR rights + international-transfer basis, DPO/email contact, retention periods.
7. **Add `/.well-known/security.txt`** with a security contact.

### Medium
8. Remove `x-powered-by` header.
9. Decide on SEO: if discovery is wanted, drop site-wide `noindex`, add real `robots.txt`, `sitemap.xml`, canonicals.
10. Add an **email support** channel and in-app FAQ.

### Low / nice-to-have
11. Run Lighthouse; consider SSR for landing to improve LCP.
12. Add i18n (Romanian + others).
13. Remove/label seeded leaderboard data at launch.

---

## 11. Methodology & Limitations

- Based on **unauthenticated** inspection: HTTP headers, rendered markup/metadata, manifest, public endpoints (`/terms`, `/privacy`, `/login`, `/manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `security.txt`), and the API subdomain root.
- **No** account creation, payment, authenticated-endpoint testing, source-code review, load testing, or penetration testing was performed.
- Items marked "internal review" (RLS, server-side payout logic, performance metrics) cannot be confirmed from the outside and should be validated by the team.
- Legal observations are **not legal advice**.
