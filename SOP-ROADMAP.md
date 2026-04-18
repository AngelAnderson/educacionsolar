# educacionsolar.com — SOP & Roadmap

## How Each Page Works

### `/` — Homepage
**Purpose:** First impression. Convert visitors to bill uploads or SMS course signups.
**Pitch elements:**
- Headline: "¿Tu factura LUMA está por las nubes?"
- Subheadline: "Sube tu factura y te decimos la verdad"
- 2 CTAs: "Analiza tu Factura" (→ /factura) + "Curso Gratis por Texto" (→ /curso)
- 3 stats: 4,500 installs/month, $0.27/kWh LUMA rate, $1.5B+ in incentives
- Trust statement: "Sin venderte nada. Si solar no te conviene, te lo decimos."
- 3-step how it works: Sube → Números reales → Tú decides
**File:** `src/app/page.tsx`

### `/factura` — Bill Upload & Analysis
**Purpose:** Core data acquisition. Every upload = one row in `solar_bills`.
**Flow:**
1. User drags/drops photo or taps to take camera photo of LUMA bill
2. Preview shown. User clicks "Analizar mi Factura"
3. Image sent as base64 to `/api/ocr`
4. GPT-4o Vision extracts: kWh, amount, rate, municipality
5. Savings calculator runs 3 scenarios (pessimistic/realistic/optimistic)
6. Results displayed: extracted data + 3 scenario cards
7. CTA: "¿Quieres hablar con un instalador verificado?" → SMS link
**Pitch:** No form to fill. Just a photo. AI does the work. Honest results including "no te conviene" when applicable.
**File:** `src/app/factura/page.tsx` (client component)

### `/curso` — SMS Course Landing
**Purpose:** Convert visitors to SMS opt-ins. Zero-friction acquisition channel.
**Pitch elements:**
- "7 Lecciones Gratis Sobre Energía Solar"
- "Por mensaje de texto. Sin spam. Sin vendedores."
- Numbered lesson list (7 topics)
- Big amber CTA: "Texto SOLAR al 787-417-7711" (SMS deep link)
- Trust badges: "100% gratis", "Sin compromiso", "Cancela cuando quieras"
- 4 FAQs: cost, frequency, calls, cancellation
**How it works:** User texts SOLAR → El Veci bot detects keyword → solar-tutor.ts sends Lesson 1 → every 2 days next lesson → Lesson 7 = installer handoff
**File:** `src/app/curso/page.tsx`

### `/guias` — Guides Index
**Purpose:** SEO hub. Internal linking to 5 educational articles.
**Content:** Cards linking to each guide with title + description.
**Cross-sell:** Bottom CTA for SMS course.
**File:** `src/app/guias/page.tsx`

### `/guia/[slug]` — Educational Guides (5 articles)
**Purpose:** SEO + trust building. Positions educacionsolar.com as the authority.
**Articles:**
1. `como-leer-factura-luma` — What each LUMA charge means, how to calculate real rate
2. `estafas-solares-puerto-rico` — 5 red flags, how to protect yourself
3. `incentivos-federales-2026` — ITC changes, PR-specific programs ($1.5B+)
4. `baterias-solares-necesito` — When yes, when no, real costs
5. `net-metering-puerto-rico` — Law 10-2024, how credits work, what happens after 2030
**Every article ends with:** CTA to upload bill + links to other guides.
**File:** `src/app/guia/[slug]/page.tsx` (content is hardcoded in the file as structured data)

### `/municipio/[slug]` — Municipal Pages (78)
**Purpose:** Programmatic SEO. One page per PR municipality.
**Content (template):**
- "Energía Solar en [Municipality], Puerto Rico"
- Stats grid: rate, avg bill, solar penetration, installs/month
- "¿Cuánto puedes ahorrar en [Municipality]?"
- Incentives available (links to incentivos guide)
- Estafas warning (links to estafas guide)
- Dual CTA: upload bill + SMS course
- Links to 20 other municipalities
**SEO value:** "energia solar cabo rojo", "solar mayaguez", etc. — hundreds of long-tail keywords.
**Future enrichment:** As real bills come in, stats update with actual municipality data from `solar_savings_cache`.
**File:** `src/app/municipio/[slug]/page.tsx` + `src/lib/municipalities.ts`

### `/api/ocr` — OCR Endpoint
**Purpose:** Process LUMA bill images.
**Input:** `POST { image: base64, mimeType: string }`
**Pipeline:**
1. Send to GPT-4o Vision with extraction prompt
2. Parse JSON response
3. Validate ranges (kWh 50-10K, amount $5-$2K)
4. Calculate 3 savings scenarios
5. Insert into `solar_bills` table
**Output:** `{ success, data, savings, confidence, bill_id }`
**File:** `src/app/api/ocr/route.ts` → `src/lib/ocr.ts` + `src/lib/savings-calculator.ts`

### `/api/leads` — Lead Assignment
**Purpose:** Connect qualified leads with installers.
**Input:** `POST { bill_id, phone?, email? }`
**Flow:** Updates bill record with contact info, assigns to first verified installer (Noel/MES).
**Output:** `{ success, message, installer_name }`
**File:** `src/app/api/leads/route.ts`

---

## Pitch Deck (for Noel / future installers)

### The Problem
- LUMA charges $0.27/kWh (2x mainland US)
- 154 hours of outages/year projected
- 4,500 solar installs/month but most leads are cold
- Consumers don't understand their bills or solar economics

### Our Solution
- Free 7-lesson SMS course educates consumers BEFORE they talk to a salesperson
- AI-powered bill analysis gives honest numbers (including "don't buy solar")
- Leads come pre-qualified with: actual kWh, bill amount, municipality, savings estimate
- Trust-first brand: "los que te dicen la verdad"

### Why Leads Are Better
| Cold lead | educacionsolar.com lead |
|-----------|------------------------|
| Name + phone only | Name + phone + kWh + bill + municipality + savings estimate |
| Doesn't understand solar | Completed 7-lesson course |
| Price shopping | Already knows their numbers |
| 5-10% close rate | Projected 15-25% close rate |

### Pitch to Noel (copy-paste WhatsApp)
> Noel, te tengo algo. Estoy lanzando educacionsolar.com — un curso gratis por texto que educa a la gente sobre solar antes de que hablen con un vendedor. El que termina el curso ya sabe leer su factura, sabe cuánto puede ahorrar, y sabe qué preguntar. No es un lead frío — es alguien que ya entiende y quiere dar el paso.
>
> Los primeros 10 te los mando gratis para que veas la calidad. Cada lead viene con: foto de la factura, kWh mensual, municipio, y cuánto estimamos que ahorraría. Tú solo cierras.
>
> ¿Te interesa ser el primer instalador verificado?

---

## Roadmap

### Phase 0 — MVP (DONE ✅)
- [x] Next.js site deployed to Vercel
- [x] OCR pipeline (GPT-4o Vision)
- [x] Savings calculator (3 scenarios)
- [x] 92 pages (home, factura, curso, guias, 78 municipios)
- [x] Supabase tables + storage bucket
- [x] Noel/MES as first installer
- [x] SEO files (sitemap, robots, llms.txt, JSON-LD)
- [x] SMS tutor integrated in El Veci (keyword SOLAR)
- [x] 381/381 bot tests passing
- [ ] DNS pointed from GoDaddy
- [ ] Test SOLAR keyword live (text from real phone)
- [ ] Test OCR with real LUMA bill
- [ ] Send pitch to Noel

### Phase 1 — Marketplace (Month 3-4)
- [ ] Multi-installer support (installer dashboard)
- [ ] Lead bidding system
- [ ] Installer verification flow (DACO license check)
- [ ] GA4 tracking + conversion events
- [ ] Auto-send lesson cron (currently manual via bot flow)
- [ ] Bill image storage in Supabase (currently just metadata)
- [ ] Municipal pages enriched with real bill data from `solar_savings_cache`

### Phase 2 — Data Platform (Month 6-8)
- [ ] Public data dashboard (`/datos`) — anonymized stats by municipality
- [ ] API for data licensing
- [ ] Press kit with PR consumption data
- [ ] Federal program eligibility screening
- [ ] Integration with Acceso Solar / CDBG-MIT application portals

### Phase 3 — Finance Layer (Month 10-12)
- [ ] Solar finance pre-qualification model
- [ ] Partnerships with PR solar finance companies
- [ ] Automated eligibility matching (income + consumption + municipality)
- [ ] White-label installer tools

---

## Daily Operations SOP

### Monitor
1. Check `solar_bills` count daily: `SELECT count(*) FROM solar_bills`
2. Check `solar_course_progress` for active learners
3. Monitor OCR confidence: `SELECT avg(ocr_confidence) FROM solar_bills WHERE created_at > now() - interval '7 days'`

### Content
- Publish 1 FB post/week about solar education (cross-promote from CaboRojo.com)
- Share municipal page links in local FB groups (e.g., "Energía solar en Cabo Rojo")
- Twitter build-in-public posts about bills database growth

### Lead Management
1. New lead appears in `solar_bills` with `lead_status = 'qualified'`
2. Forward to Noel via WhatsApp with: municipality, kWh, savings estimate
3. Track close rate: update `lead_status` to 'closed' or 'rejected'
4. Monthly report: leads sent, closed, revenue

### OCR Maintenance
- Review bills with `ocr_confidence < 0.8` weekly
- Adjust GPT-4o prompt if LUMA changes bill format
- Track accuracy: `SELECT count(*) FILTER (WHERE ocr_confidence >= 0.8) * 100.0 / count(*) FROM solar_bills`

---

## File Map

```
educacionsolar/
├── README.md                              ← You are here (project overview)
├── SOP-ROADMAP.md                         ← This file (operations + roadmap)
├── .env.local                             ← Local dev env vars (gitignored)
├── public/
│   ├── robots.txt
│   └── llms.txt
├── src/
│   ├── app/
│   │   ├── page.tsx                       ← Homepage
│   │   ├── layout.tsx                     ← Nav + footer + JSON-LD
│   │   ├── globals.css                    ← Theme vars
│   │   ├── sitemap.ts                     ← Dynamic sitemap (86 URLs)
│   │   ├── factura/page.tsx               ← Bill upload (client component)
│   │   ├── curso/page.tsx                 ← SMS course landing
│   │   ├── guias/page.tsx                 ← Guides index
│   │   ├── guia/[slug]/page.tsx           ← 5 educational articles (SSG)
│   │   ├── municipio/[slug]/page.tsx      ← 78 municipal pages (SSG)
│   │   └── api/
│   │       ├── ocr/route.ts              ← OCR endpoint
│   │       └── leads/route.ts            ← Lead assignment
│   └── lib/
│       ├── supabase.ts                    ← Browser + admin clients
│       ├── ocr.ts                         ← GPT-4o Vision pipeline
│       ├── savings-calculator.ts          ← 3-scenario calculator
│       └── municipalities.ts              ← 78 PR municipalities + slugify
```

### Related files in other repos
```
Vecinoai/supabase/functions/twilio-webhook/
├── solar-tutor.ts                         ← 7-lesson SMS engine
├── intent.ts                              ← SOLAR keyword detection
└── handler.ts                             ← Routes solar_course intent
```
