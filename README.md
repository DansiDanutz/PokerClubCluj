# Poker Club Cluj

Site-ul campaniei Players Poker Club Cluj-Napoca: propunerea către Consiliul
Local și memoriul depus în consultarea publică (1–15 iulie 2026) privind
proiectul de interzicere a jocurilor de noroc, cu formular de semnare online.

Deployed la `poker-club-cluj.vercel.app` (Next.js App Router).

## Structura

- `src/app/page.tsx` — pagina principală (propunerea pentru Consiliul Local)
- `src/app/memoriu/page.tsx` — pagina memoriului + formular de semnare
- `src/app/memoriu/document.tsx` — textul integral al memoriului (sursă unică
  pentru web și PDF)
- `src/app/memoriu/summary.tsx` — sinteza decizională (pag. 1) și scutul
  juridic (pag. 2)
- `src/app/memoriu/print/page.tsx` — versiunea pentru tipar/PDF (noindex)
- `src/app/api/petition/route.ts` — API semnături (proxy către Supabase)
- `public/memoriu-poker-cluj-iulie-2026.pdf` — versiunea PDF descărcabilă

## Semnături (Supabase)

Semnăturile se stochează în proiectul Supabase `pewwxyyxcepvluowvaxh`, tabela
`petition_signatures`, cu RLS activ:

- rolul `anon` poate doar INSERT (nu poate citi rândurile — emailurile nu sunt
  expuse public);
- statisticile publice vin din funcția `petition_stats()` (SECURITY DEFINER),
  care returnează numele prescurtat („Prenume I."), localitatea, data și doar
  mesajele aprobate editorial (`comment_approved = true`);
- unicitatea emailului este garantată de un index unic pe `lower(email)`
  (formularul răspunde cu 409 la dublură).

Cheia anon din `src/app/api/petition/route.ts` este publică prin design;
`SUPABASE_URL` / `SUPABASE_ANON_KEY` pot fi suprascrise prin env vars.

## Comenzi

```bash
npm install
npm run dev    # dezvoltare locală
npm run build  # build de producție
```

## Regenerarea PDF-ului

PDF-ul din `public/` trebuie regenerat după orice modificare a textului
memoriului (`document.tsx`, `summary.tsx`): se tipărește pagina `/memoriu/print`
în format A4 și se salvează peste `public/memoriu-poker-cluj-iulie-2026.pdf`.
