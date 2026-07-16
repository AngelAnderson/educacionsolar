# educacionsolar.com — Roadmap & Estado (2026-07-16)

> **Qué es:** la cara solar del substrato cívico. Récord vertical (mismo estándar PuertoRicoSinFiltros: número + fecha + fuente primaria + link · contradicciones DICEN/RÉCORD · Mientras Tanto escudo/palanca · firma ALIVIO · correcciones públicas), apuntado a UNA decisión: *¿me monto en solar y cómo no me joden en el proceso?*
>
> **Modo $1B:** plataforma de adquisición de data (facturas OCR + crowdsource de créditos mal acreditados = dataset residencial de consumo que ni LUMA comparte) disfrazada de récord educativo. Flywheel: récord con intención altísima → capturas de lead/factura → leads a instaladores ($50-300) + data licensing + outreach. Solo+AI: récords con crons, intake por el Veci, "vendedor" = deep link.

---

## ✅ HECHO (sesión 2026-07-16)

### Ronda 1 — Récord (contenido)
- **`/datos`** — El Récord Solar de PR: 7 datos verificados con fuente + 4 contradicciones DICEN/RÉCORD + Mientras Tanto (escudo/palanca). Live.
- **`/casos`** — 2 casos reales de la familia del operador (cash dic-2021 · lease de retirada) + la fórmula (resta) + las 7 preguntas antes de firmar. Live.
- **Guías corregidas** (`/guia/[slug]`): cargo fijo decidido ($8→$16, caso NEPR-AP-2023-0003), ventana 48E (jul-2026 cerró → en servicio antes dic-2027), pleito JSF vs Ley 10-2024.
- README + SOP-ROADMAP v2. Sitemap con /datos, /casos, /instaladores.

### Ronda 2 — Tier-up UX (por feedback de Angel)
- **Homepage reframe** — dejó de liderar con "sube tu factura" (exige factura + intención de compra) → ahora lidera con **por-qué-HOY sin fricción**: *"Este año te cambiaron la factura de la luz tres veces. Nadie te avisó."* Los 3 relojes (cargo fijo · 25D · net metering) + vuelta ALIVIO. No requiere factura en mano.
- **Lead capture cableado en `/factura`** — el `/api/leads` existía pero el grabador NUNCA lo llamaba (el lead veía "ahorras $X/mes" y se iba sin dejar número). Ahora captura WhatsApp on-page tras el veredicto, usando `bill_id` del OCR.
- **Menú** — Instaladores fuera (página sigue viva pa' SEO/routing); reordenado: El Récord → Casos → Guías → Analiza Factura + botón ámbar persistente "Textea SOLAR".
- Cargo fijo viejo corregido en el grabador.

### Investigación verificada (fuentes primarias, guardada en handoff)
- Cargo fijo: $4 → $8 (vigente 1-jul-2026) → ~$16 en 2028 (PREB NEPR-AP-2023-0003, resolución 15-abr-2026).
- Crédito 25D (30% residencial) muerto 31-dic-2025 (P.L. 119-21). 48E (lease/PPA) vivo pero reloj a 31-dic-2027.
- Ley 1-2025 borró la meta 40%/2025 de la Ley 17-2019 + extendió carbón a 2032.
- 191,929 techos solares en PR (EIA abr-2026); rooftop = 2da fuente de capacidad (1,456 MW).
- Net metering protegido hasta 2030 (Ley 10-2024) PERO demandado por la JSF en Tribunal Federal (activo).
- Espejos: Hawaii 45% casas con techo solar / -37% al matar NEM 2015; California NEM 3.0 = ventas -66% a -83%.

### Drafts en Outbox
- `Sponsors/Noel-POSDepot-Brief-2026-07-16.md` — 3 opciones one-take + opción D (caso Angel) + data 25D/48E pa' la conversación con Noel.
- `Contenido/Solar/2026-07-16-caso-cash-angel.md` — listo.
- `Contenido/Solar/2026-07-16-matematica-de-mami-v2.md` — **BLOQUEADO** (discrepancia lease vs New Energy Program).

---

## 🔴 PENDIENTE URGENTE

1. **Dominio educacionsolar.com expira 5 de agosto 2026 (GoDaddy).** Renovar YA o se cae todo.
2. **Reconciliar caso Mami** — hoy Angel dijo "lease $90→$52 (~$40 ahorro)"; draft de mayo decía "New Energy Program CDBG-MIT $90→$42". 3 preguntas en el flag del draft. El récord no puede fallar en su caso ancla.

---

## 🟡 PENDIENTE (orden anti-ajoro)

### Pruebas que faltan
- **Angel textea SOLAR al 787-417-7711** — probar el curso end-to-end (trigger verificado por regex; el flujo completo no se probó pa' no disparar Twilio real).
- **Probar OCR con factura LUMA real** — sin una factura de verdad no se valida el grabador end-to-end.

### Contenido / récord
- **Refresh lecciones del curso** (`Vecinoai/.../solar-tutor.ts`): data vieja ($0.27/kWh real ~28.5¢ · "163,000 hogares" ya 191,929 · "ITC expiró pero hay alternativas" → precisar 25D muerto vs 48E lease). Requiere bot deploy con test suite 665/665.
- **`/apagones`** — Reloj del Apagón por municipio (SAIDI/SAIFI de reportes trimestrales LUMA a PREB, docket MI20190007). Requiere minar PDFs.
- **Crowdsource créditos mal acreditados** — primer dato propietario: "¿LUMA no te acredita el exceso? textea SOLAR con la foto". Con 20+ casos = titular citable + página propia.
- **Caso 3: financiado** — falta el tercer camino con números reales.

### Distribución (el gap #1 real)
- Curso SOLAR = 0 sesiones en 3 meses · 10 facturas OCR. **La infra existe; nadie llega.** Cada apagón del oeste = post caborojo.com con keyword SOLAR (ciclo 14 días v5); el deep link a /datos viaja por WhatsApp.
- Primer post con deep link a /datos (disparador: próximo apagón del oeste).
- Conversación Angel–Noel con el brief (la data del 48E con reloj a dic-2027 es el argumento de urgencia real, no fabricada).

### Mantenimiento
- **Cron de re-verificación mensual** de /datos (patrón SUTRA/hpsa-refresh): un récord con fecha stale pierde credibilidad.
- Actualizar municipio pages con data real cuando el flywheel de facturas dé n>10 por municipio.

---

## 🎵 Road Map Rítmico — la cadencia (no todo a la vez)

| Ritmo | Qué pasa | Disparador |
|---|---|---|
| **HOY / esta semana** | Renovar dominio · reconciliar Mami · Angel prueba curso · hablar con Noel | manual |
| **Por evento** | Post + deep link a /datos con keyword SOLAR | cada apagón del oeste |
| **Mensual** | Re-verificar /datos (cargo fijo escalones, pleito JSF, EIA) · triage de créditos crowdsourceados | cron |
| **Cuando haya señal** | /apagones, caso 3, refresh lecciones, municipio data | n>umbral (facturas, casos, sesiones) |
| **Vigilancia (cambia el contenido el mismo día)** | Pleito JSF cae → net metering · escalón cargo fijo 2027/2028 · 31-dic-2027 muere 48E · ene-2030 PREB abre estudio | fechas fijas |

**Regla editorial (heredada de PRSF):** número + fecha + fuente con link · cero adjetivos · contradicción mostrada no opinada · firma ALIVIO (quita peso: "no memorices, haz una resta") · correcciones públicas.

**Kill criteria (del canon original):** <200 facturas en 60 días = canal de adquisición roto · Noel no cierra 3 en 90 días = calidad de lead · OCR <80% = volver a form manual.
