import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Récord Solar de Puerto Rico — Educación Solar",
  description:
    "Los números de energía solar en PR que nadie junta en un solo sitio: cargo fijo, net metering, incentivos, apagones. Cada dato con fecha y fuente primaria.",
};

interface Dato {
  num: string;
  texto: string;
  fuente: string;
  url: string;
}

const DATOS: Dato[] = [
  {
    num: "191,929",
    texto:
      "techos solares en Puerto Rico al cierre de 2025. Unos 3,850 sistemas nuevos cada mes. El techo solar ya es la SEGUNDA fuente de capacidad de la isla (1,456 MW), por encima del gas natural.",
    fuente: "EIA, Today in Energy, 2 abr 2026",
    url: "https://www.eia.gov/todayinenergy/detail.php?id=67406",
  },
  {
    num: "$8/mes",
    texto:
      "el cargo fijo residencial de LUMA desde el 1 de julio de 2026. Era $4. Sube gradualmente hasta ~$16 en 2028. Aplica aunque tengas placas: el cargo es por estar conectado, no por consumir.",
    fuente: "Negociado de Energía, caso NEPR-AP-2023-0003, resolución 15 abr 2026 (vía Metro PR)",
    url: "https://www.metro.pr/noticias/2026/04/15/negociado-cambia-la-tarifa-de-la-luz-mas-cargos-fijos-y-menor-costo-por-consumo/",
  },
  {
    num: "~27 horas",
    texto:
      "sin luz al año pierde el cliente promedio en PR, SIN contar huracanes ni eventos mayores. En el continente: ~2 horas. Trece veces peor. En 2024, contando eventos mayores, fueron más de 73 horas.",
    fuente: "EIA, 2021-2024",
    url: "https://www.eia.gov/todayinenergy/detail.php?id=65925",
  },
  {
    num: "30% → 0%",
    texto:
      "el crédito federal residencial (Sección 25D) MURIÓ el 31 de diciembre de 2025. Todo sistema comprado por el dueño en 2026 cuesta efectivamente ~30% más que hace un año. El crédito comercial (48E) sigue vivo para sistemas de lease/PPA, pero con reloj: en servicio antes del 31 de diciembre de 2027.",
    fuente: "IRS + P.L. 119-21 (OBBBA)",
    url: "https://www.irs.gov/credits-deductions/residential-clean-energy-credit",
  },
  {
    num: "2030",
    texto:
      "hasta enero de 2030 el Negociado NO puede ni empezar el estudio para cambiar el net metering (Ley 10-2024). El que se conecta hoy, se conecta bajo las reglas de hoy. Ojo: la Junta de Supervisión Fiscal demandó en el Tribunal Federal para anular esa ley. El pleito sigue activo.",
    fuente: "Ley 10-2024 + demanda JSF jul 2024",
    url: "https://www.sesapr.org/netmetering",
  },
  {
    num: "45%",
    texto:
      "de las casas unifamiliares servidas por Hawaiian Electric ya tienen techo solar (Oahu: 49%). Hawaii es la otra isla americana con luz cara y combustible importado. Es el espejo de a dónde va esto.",
    fuente: "Hawaiian Electric, 25 nov 2025",
    url: "https://www.hawaiianelectric.com/nearly-half-of-all-oahu-single-family-homes-now-have-rooftop-solar-as-installations-continue-at-steady-pace",
  },
  {
    num: "14 negocios",
    texto:
      "alrededor de la plaza de Adjuntas operan con la microrred solar comunitaria de Casa Pueblo. Cinco microredes completadas en el pueblo, 400+ proyectos solares instalados. El espejo no está en Hawaii nada más: está en la montaña.",
    fuente: "Casa Pueblo / reportes 2025",
    url: "https://casapueblo.org/energia-solar-con-responsabilidad-social-el-modelo-de-adjuntas/",
  },
];

interface Contradiccion {
  dicen: string;
  record: string;
  fuente: string;
  url: string;
}

const CONTRADICCIONES: Contradiccion[] = [
  {
    dicen:
      "La Ley 17-2019 ordenaba que Puerto Rico tuviera 40% de energía renovable para el 2025.",
    record:
      "El 2025 llegó con ~20% de la CAPACIDAD en renovables (la generación real es menos). Y en vez de explicar por qué no se cumplió, la Ley 1-2025 BORRÓ la meta intermedia y extendió el carbón hasta 2032. La meta no se falló: se eliminó.",
    fuente: "CRS IF12913, dic 2024 + Ley 1-2025",
    url: "https://www.congress.gov/crs-products/product/pdf/IF/IF12913",
  },
  {
    dicen:
      "En febrero 2026 el sector solar denunció que LUMA proponía subir el cargo fijo de $4 a más de $40. LUMA respondió que su propuesta era $10.",
    record:
      "El Negociado decidió el 15 de abril: $8 ahora, ~$16 en 2028. Entró en vigor el 1 de julio de 2026. Mientras el debate público era '¿$10 o $40?', el cargo ya se duplicó y casi nadie lo ha notado en su factura.",
    fuente: "NEPR-AP-2023-0003 + prensa feb-abr 2026",
    url: "https://www.metro.pr/noticias/2026/02/18/sector-solar-rechaza-propuesta-de-luma-de-elevar-cargo-fijo-residencial-de-4-a-sobre-40/",
  },
  {
    dicen:
      "Washington habla de resiliencia energética para Puerto Rico: fondos FEMA, programas DOE, miles de millones asignados a la red.",
    record:
      "La misma ley federal de 2025 eliminó el crédito del 30% para el residente que compra sus placas. A la isla con más apagones de la nación le quitaron el descuento para independizarse de la red que no le funciona.",
    fuente: "P.L. 119-21 + EIA (interrupciones PR vs US)",
    url: "https://www.congress.gov/crs-product/IN12611",
  },
  {
    dicen:
      "California y Hawaii recortaron el net metering. Nada pasó, la industria se adaptó.",
    record:
      "Hawaii 2015: instalaciones cayeron ~37% el primer año (la industria reporta caídas mayores por zonas). California 2023: ventas residenciales cayeron entre 66% y 83% y se perdieron ~17,000 empleos solares. Eso es lo que está en juego en el pleito por la Ley 10-2024 en PR.",
    fuente: "Utility Dive 2017 (HSEA) + CALSSA nov 2023",
    url: "https://www.utilitydive.com/news/california-rooftop-solar-nem-30-outlook/702498/",
  },
];

export default function DatosPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: "El Récord Solar de Puerto Rico",
            description:
              "Datos verificados de energía solar en Puerto Rico: penetración, tarifas, cargo fijo, net metering, incentivos federales. Cada dato con fuente primaria.",
            url: "https://educacionsolar.com/datos",
            inLanguage: "es",
            creator: { "@type": "Organization", name: "Educación Solar" },
          }),
        }}
      />

      <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-2">
        El Récord Solar de PR
      </p>
      <h1 className="text-3xl font-bold text-emerald-900 mb-4">
        Los números que nadie junta en un solo sitio
      </h1>
      <p className="text-gray-700 mb-2">
        Cada dato con fecha y fuente primaria. Sin adjetivos, sin venta. Si un
        número está mal, se corrige público.
      </p>
      <p className="text-sm text-gray-500 mb-10">
        Última verificación: 16 de julio de 2026
      </p>

      {/* Los datos */}
      <div className="space-y-5">
        {DATOS.map((d, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <p className="text-2xl font-bold text-emerald-800">{d.num}</p>
            <p className="mt-2 text-gray-700 leading-relaxed">{d.texto}</p>
            <p className="mt-3 text-sm text-gray-500">
              Fuente:{" "}
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline hover:text-emerald-900"
              >
                {d.fuente}
              </a>
            </p>
          </div>
        ))}
      </div>

      {/* Contradicciones */}
      <h2 className="text-2xl font-bold text-emerald-900 mt-14 mb-3">
        Lo que dicen vs. el récord
      </h2>
      <p className="text-gray-700 mb-8">
        No opinamos. Ponemos las dos cosas una al lado de la otra y tú decides.
      </p>
      <div className="space-y-6">
        {CONTRADICCIONES.map((c, i) => (
          <div key={i} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="bg-gray-50 p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                Dicen
              </p>
              <p className="text-gray-700">{c.dicen}</p>
            </div>
            <div className="bg-amber-50 p-4">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">
                El récord
              </p>
              <p className="text-gray-800">{c.record}</p>
              <p className="mt-2 text-sm text-gray-500">
                Fuente:{" "}
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline hover:text-emerald-900"
                >
                  {c.fuente}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mientras tanto */}
      <div className="mt-14 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-xl font-bold text-emerald-900 mb-4">
          Mientras tanto, en tu casa
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-emerald-800 mb-2">
              🛡️ Cómo te proteges hoy
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                Mira tu factura de julio: el cargo fijo debe decir $8, no $4.
                Ya está vigente.
              </li>
              <li>
                Si tienes placas, verifica que tus créditos de exceso aparezcan
                cada mes. Los errores de acreditación existen y no se corrigen
                solos.
              </li>
              <li>
                Si vas a cotizar: la matemática de 2024 ya no aplica. Sin el
                30% federal, pide los números de nuevo y compara lease vs.
                compra.
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-emerald-800 mb-2">
              ⚡ La acción de 5 minutos
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <Link href="/factura" className="text-emerald-700 underline">
                  Sube tu factura
                </Link>{" "}
                y ve tu número real antes de hablar con cualquier vendedor.
              </li>
              <li>
                ¿LUMA no te acredita el exceso? Textea{" "}
                <span className="font-bold">SOLAR</span> al{" "}
                <a
                  href="https://wa.me/17874177711?text=SOLAR"
                  className="text-emerald-700 underline"
                >
                  787-417-7711
                </a>{" "}
                con la foto de tu factura. Estamos documentando cuántos casos
                hay.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cross links */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/casos"
          className="flex-1 text-center bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition"
        >
          Ver casos reales con números
        </Link>
        <Link
          href="/guias"
          className="flex-1 text-center bg-white border border-emerald-700 text-emerald-800 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition"
        >
          Las guías completas
        </Link>
      </div>
    </main>
  );
}
