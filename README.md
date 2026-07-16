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
| El Récord | `/datos` | Static | Solar record of PR: verified numbers + DICEN/RÉCORD contradictions + Mientras Tanto (shipped 2026-07-16) |
| Casos Reales | `/casos` | Static | Two real family cases (cash 2021 / lease retiree) + la fórmula + 7 preguntas antes de firmar (shipped 2026-07-16) |
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

- LUMA average rate: $0.27/kWh (residencial ~24-28¢ según EIA/PREB 2026; cargo fijo $8/mes desde jul 2026, ~$16 en 2028 — NEPR-AP-2023-0003)
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

## Positioning v2 (2026-07-16) — la cara solar del substrato cívico

educacionsolar.com dejó de ser "sitio de educación + lead-gen" y opera como **récord vertical** (mismo estándar PuertoRicoSinFiltros: número + fecha + fuente primaria + link, contradicciones DICEN/RÉCORD, Mientras Tanto escudo/palanca, correcciones públicas).

**Hechos que anclan el récord (verificados 2026-07-16):**
- Cargo fijo residencial: $4 → $8 (vigente 1-jul-2026) → ~$16 en 2028. Caso PREB NEPR-AP-2023-0003, resolución 15-abr-2026.
- Crédito federal 25D (30% residencial) murió 31-dic-2025 (P.L. 119-21). 48E (lease/PPA) vivo con reloj: en servicio antes de 31-dic-2027 (ventana "comenzar construcción antes de jul 2026" ya cerró).
- Ley 1-2025 eliminó la meta intermedia de 40% renovable/2025 de la Ley 17-2019 (y extendió carbón a 2032).
- 191,929 techos solares en PR (EIA abr 2026); rooftop = 2da fuente de capacidad (1,456 MW).
- Net metering: protegido hasta 2030 (Ley 10-2024) pero demandado por la JSF en Tribunal Federal (activo).
- Espejos: Hawaii 45% de casas con techo solar / caída -37% al matar NEM 2015; California NEM 3.0 = ventas -66% a -83%.

**Casos ancla (familia del operador):** cash dic-2021 ($40-42K, 2 Powerwall, 4.5 años sin fallas, $4→$8/mes LUMA) + lease de retirada (~$40-50/mes de ahorro neto). El récord no puede fallar en su caso ancla.

**Data flywheel activo:** facturas OCR + crowdsource de créditos mal acreditados ("¿LUMA no te acredita? textea SOLAR con la foto") = dataset propietario. Meta $1B path: lead marketplace → data licensing → outreach contracts.

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
