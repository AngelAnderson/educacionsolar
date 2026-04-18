# educacionsolar.com — Solar Intelligence Platform

> "Te decimos la verdad sobre tu factura LUMA y si solar te conviene — sin venderte nada."

## What This Is

A solar education platform for Puerto Rico that acquires the largest independent residential electricity consumption dataset on the island — bill by bill, for free — disguised as a free education tool.

**Public mission:** Honest solar education in Spanish.
**Real mission:** Proprietary LUMA bills database → 4 revenue streams.

## Revenue Model

| Stream | When | Revenue |
|--------|------|---------|
| Lead Marketplace | Day 1 (Noel/MES first) | $50-300/lead |
| Data Licensing | After 5K bills | $10K-50K/license |
| Government Outreach | After 10K bills | $100K-$1M contracts |
| Solar Finance Referrals | After 25K bills | $200-500/referral |

## Stack

- **Web:** Next.js 16 + Vercel
- **Database:** Supabase (project `vprjteqgmanntvisjrvp`)
- **OCR:** OpenAI GPT-4o Vision
- **SMS Tutor:** El Veci bot (*7711), keyword SOLAR
- **Domain:** educacionsolar.com (GoDaddy)

## Pages (92 total)

| Page | Path | Type | Purpose |
|------|------|------|---------|
| Homepage | `/` | Static | Hero + 2 CTAs + stats + trust + how it works |
| Factura Upload | `/factura` | Client | Drag & drop LUMA bill → OCR → 3 savings scenarios |
| Curso SMS | `/curso` | Static | 7-lesson SMS course landing + CTA |
| Guías Index | `/guias` | Static | Index of 5 educational guides |
| Guía Detail | `/guia/[slug]` | SSG (5) | Educational articles (factura, estafas, incentivos, baterías, net metering) |
| Municipio | `/municipio/[slug]` | SSG (78) | Programmatic SEO pages for all PR municipalities |
| Sitemap | `/sitemap.xml` | Dynamic | 86 URLs |
| OCR API | `/api/ocr` | Serverless | GPT-4o Vision OCR → validate → save to Supabase |
| Leads API | `/api/leads` | Serverless | Assign lead to verified installer |

## Supabase Tables

| Table | Purpose |
|-------|---------|
| `solar_bills` | Core asset: every LUMA bill processed by OCR |
| `solar_installers` | Marketplace: verified installers (Noel/MES = first) |
| `solar_course_progress` | SMS course: lesson progress per phone number |
| `solar_savings_cache` | Aggregated consumption stats by municipality |

**Storage bucket:** `luma-bills` (private) — bill images

## SMS Course (El Veci Integration)

Keyword `SOLAR` to 787-417-7711 triggers a 7-lesson course:

| # | Topic | Special |
|---|-------|---------|
| 1 | ¿Qué es energía solar? | — |
| 2 | Tu factura LUMA | — |
| 3 | ¿Cuántos paneles? | — |
| 4 | Baterías | — |
| 5 | Incentivos federales | — |
| 6 | Estafas solares | — |
| 7 | Próximo paso | **Lead handoff to Noel** |

Cadence: 1 lesson every 2 days. User responds "SÍ" after lesson 7 → connected with Manage Energy Solutions.

Files: `Vecinoai/supabase/functions/twilio-webhook/solar-tutor.ts`, `intent.ts`, `handler.ts`

## OCR Pipeline

1. User uploads photo/PDF of LUMA bill (web or MMS)
2. Image → Supabase Storage (`luma-bills` bucket)
3. GPT-4o Vision extracts: kWh, amount, rate, municipality, billing period, account last 4
4. Validation: kWh 50-10,000, amount $5-$2,000
5. Savings calculator runs 3 scenarios (pessimistic/realistic/optimistic)
6. Results displayed + stored in `solar_bills`
7. User can request installer connection → lead assigned

### Savings Calculator Constants (PR-specific)

- LUMA average rate: $0.27/kWh
- Installed solar cost: $2.80/watt
- Peak sun hours: 5.5/day
- Panel degradation: 0.5%/year
- System lifetime: 25 years

## SEO

- `robots.txt` — allows all crawlers
- `sitemap.xml` — 86 dynamic URLs
- `llms.txt` — AI discoverability
- JSON-LD schema — WebSite + Organization
- 78 programmatic municipal pages — long-tail keywords
- 5 educational guides — informational keywords

## Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel | Supabase anon key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel | Supabase admin (server-only) |
| `OPENAI_API_KEY` | Vercel | GPT-4o Vision for OCR |

All also in `.env.local` for local dev (gitignored).

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Production build (92 pages)
```

## Deploy

Push to `master` → Vercel auto-deploys. Or:

```bash
vercel --prod
```

## DNS Setup (GoDaddy)

Domain `educacionsolar.com` needs A records pointing to Vercel:
- `@` → `76.76.21.21`
- `www` → `76.76.21.21`

Or change nameservers to `ns1.vercel-dns.com` + `ns2.vercel-dns.com`.

## Kill Criteria

- 60 days without 200 bills → acquisition channel broken
- Noel doesn't close 3 deals in 90 days → lead quality issue
- OCR accuracy < 80% on real LUMA bills → fallback to manual form

## Key People

- **Noel Bonilla** — Manage Energy Solutions salesperson. First installer. Gets 10 free leads to prove quality.
- **Angel Anderson** — Owner. Platform operator. Lead marketplace owner.

## Moat

1. **Bills database** — proprietary consumption data (12-18 months to copy)
2. **SMS distribution** — *7711 + boricua voice (6 months)
3. **Trust brand** — "los que te dicen la verdad" (years)
4. **SEO** — 78 municipalities + guides (6-12 months)
5. **Flywheel** — more bills → better data → more trust → more bills (impossible to copy without the flywheel)
