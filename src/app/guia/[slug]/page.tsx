import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ContentBlock {
  type: "p" | "h2" | "list";
  text?: string;
  items?: string[];
}

interface Guide {
  title: string;
  description: string;
  content: ContentBlock[];
}

const guides: Record<string, Guide> = {
  "como-leer-factura-luma": {
    title: "Cómo Leer tu Factura de LUMA",
    description:
      "Aprende a entender cada cargo en tu factura eléctrica de LUMA Energy en Puerto Rico.",
    content: [
      { type: "p", text: "Tu factura de LUMA tiene más de 10 cargos distintos. La mayoría de la gente solo mira el total — y eso es exactamente lo que las compañías de energía quieren." },
      { type: "h2", text: "Los cargos principales" },
      { type: "p", text: "Cargo por energía (kWh): Es lo que realmente consumes. Se mide en kilovatios-hora. Un hogar promedio en PR consume entre 500-900 kWh/mes. Este es el número más importante para calcular si solar te conviene." },
      { type: "p", text: "Cargo fijo residencial: LUMA cobra ~$4/mes solo por estar conectado. Propusieron subirlo a $15/mes en 2026." },
      { type: "p", text: "Rider de pensiones: 1.9 centavos por cada kWh. Sí, tú pagas las pensiones de los empleados de PREPA." },
      { type: "p", text: "Aumento provisional: 1.4 centavos/kWh adicionales aprobados por PREB en 2025." },
      { type: "p", text: "Cargo por combustible: Varía cada mes según el precio del petróleo y gas natural. Es el cargo más volátil." },
      { type: "h2", text: "El número mágico: tu tarifa real" },
      { type: "p", text: "Divide el total de tu factura entre los kWh consumidos. Ejemplo: $250 ÷ 900 kWh = $0.278/kWh. Ese es tu costo real por kilovatio-hora. En el mainland de EE.UU. el promedio es $0.16/kWh — tú pagas casi el doble." },
      { type: "h2", text: "¿Por qué importa para solar?" },
      { type: "p", text: "Mientras más alta tu tarifa real, más sentido tiene solar. Si tu tarifa supera $0.20/kWh (y en PR casi todos superan $0.25), solar probablemente te ahorra dinero. Pero depende de tu consumo, tu techo, y tu situación financiera." },
      { type: "p", text: "¿Quieres saber exactamente cuánto ahorrarías? Sube tu factura y te damos los números reales — sin venderte nada." },
    ],
  },
  "estafas-solares-puerto-rico": {
    title: "5 Estafas Solares Comunes en Puerto Rico",
    description:
      "Cómo identificar contratistas solares deshonestos y proteger tu inversión en Puerto Rico.",
    content: [
      { type: "p", text: "Puerto Rico instala 4,500 sistemas solares al mes. Con ese volumen, los estafadores llegaron. Aquí te decimos qué buscar." },
      { type: "h2", text: "1. 'Solar gratis — $0 de tu bolsillo'" },
      { type: "p", text: "Nada es gratis. Lo que hay son financiamientos, leases y PPAs. Cada uno tiene pros y contras. Si alguien te dice 'gratis' sin explicar la estructura, sal corriendo." },
      { type: "h2", text: "2. Promesas de ahorro exageradas" },
      { type: "p", text: "'Te vas a ahorrar el 100% de tu factura.' Muy raro. LUMA cobra un cargo fijo aunque no consumas nada. Un sistema bien diseñado te puede reducir 80-95% del cargo variable, pero siempre quedará algo." },
      { type: "h2", text: "3. Sin licencia o seguro" },
      { type: "p", text: "En PR, un instalador solar debe tener licencia del DACO y seguro de responsabilidad. Pide el número de licencia y verifica en DACO antes de firmar nada." },
      { type: "h2", text: "4. Presión para firmar hoy" },
      { type: "p", text: "'Esta oferta solo es válida hoy.' No. Los incentivos federales no expiran mañana. Los programas de PR tienen plazos largos. Cualquier instalador serio te da tiempo para pensarlo." },
      { type: "h2", text: "5. No mencionan permisos" },
      { type: "p", text: "Toda instalación solar en PR necesita permisos de LUMA para interconexión. Si el instalador no menciona permisos, o dice que 'no hacen falta,' eso es una bandera roja enorme. Sin permiso, LUMA puede desconectar tu sistema." },
      { type: "h2", text: "Cómo protegerte" },
      { type: "list", items: [
        "Pide 3 cotizaciones mínimo",
        "Verifica licencia en DACO",
        "Lee el contrato completo (especialmente la letra pequeña de financiamiento)",
        "Pregunta específicamente: '¿Cuántos kWh va a producir mi sistema al mes?'",
        "Habla con vecinos que ya tengan solar del mismo instalador",
      ]},
      { type: "p", text: "¿Quieres una evaluación honesta? Sube tu factura y te damos los números — incluyendo si solar NO te conviene." },
    ],
  },
  "incentivos-federales-2026": {
    title: "Incentivos Federales para Solar en Puerto Rico (2026)",
    description:
      "Guía completa de créditos contributivos, programas y subsidios federales para energía solar en PR.",
    content: [
      { type: "p", text: "Puerto Rico tiene acceso a más de $1.5 billones en programas federales de energía renovable. Aquí te explicamos cuáles aplican en 2026." },
      { type: "h2", text: "CAMBIO IMPORTANTE: El ITC residencial expiró" },
      { type: "p", text: "El crédito contributivo residencial del 30% (ITC) expiró para sistemas comprados por el dueño después del 31 de diciembre de 2025. Esto NO aplica a sistemas en lease o PPA — esos todavía califican porque el crédito va al dueño del sistema (la compañía)." },
      { type: "h2", text: "ITC comercial: todavía disponible" },
      { type: "p", text: "Negocios que comiencen construcción antes del 4 de julio de 2026 pueden reclamar 30% de crédito. Con bonos adicionales (contenido doméstico, comunidad energética, comunidad de bajos ingresos) puede llegar a 40-50%." },
      { type: "h2", text: "Programas específicos para PR" },
      { type: "list", items: [
        "Programa Acceso Solar (DOE): Parte de $1B+ del DOE. Solar + batería subsidiado para hogares de bajos ingresos. Hasta 30,000 hogares.",
        "Solar Incentive Program (CDBG-MIT): $100M disponibles. Subsidio de hasta 30% del costo o $15,000.",
        "New Energy Program (CDBG-MIT): $350M. Cubre 100% del costo hasta $30,000 para ingresos <80% del promedio.",
        "CEWRI Program (HUD): $50M. Cubre 100% hasta $40,000. Comunidades seleccionadas.",
        "FEMA BRIC 2025/2026: $1B federal. Solicitudes abiertas hasta julio 23, 2026.",
      ]},
      { type: "p", text: "Sube tu factura LUMA y te mostramos no solo tu ahorro estimado, sino qué programas podrían aplicar a tu caso." },
    ],
  },
  "baterias-solares-necesito": {
    title: "¿Necesito Batería con mi Sistema Solar?",
    description:
      "Guía honesta sobre baterías solares en Puerto Rico: cuándo vale la pena y cuándo no.",
    content: [
      { type: "p", text: "En Puerto Rico, el 100% de las instalaciones solares nuevas incluyen batería. ¿Pero realmente la necesitas? La respuesta honesta: probablemente sí, pero depende." },
      { type: "h2", text: "Por qué PR es diferente" },
      { type: "p", text: "En el mainland, la batería es opcional — la red es estable. En PR, LUMA proyecta que el cliente promedio perderá 154 horas de servicio al año. Eso son 6.4 días sin luz. La batería no es lujo aquí — es necesidad." },
      { type: "h2", text: "Cuándo SÍ necesitas batería" },
      { type: "list", items: [
        "Tienes apagones frecuentes (¿quién en PR no?)",
        "Trabajas desde la casa y no puedes perder conectividad",
        "Tienes equipo médico que depende de electricidad",
        "Quieres independencia real de LUMA",
      ]},
      { type: "h2", text: "Cuándo podrías NO necesitarla" },
      { type: "list", items: [
        "Tu presupuesto es limitado y prefieres maximizar paneles primero",
        "Tienes generador de respaldo que funciona bien",
        "Tu área tiene relativamente pocos apagones (raro, pero existe)",
      ]},
      { type: "h2", text: "El costo real" },
      { type: "p", text: "Una batería de 10 kWh (Tesla Powerwall o similar) cuesta ~$10,000-$15,000 instalada. Te da 8-12 horas de energía básica (nevera, luces, WiFi, cargar teléfonos). Para aire acondicionado necesitas más capacidad." },
      { type: "h2", text: "Net metering vs. batería" },
      { type: "p", text: "Con net metering (disponible en PR hasta 2030), la red funciona como tu 'batería' durante el día — exportas exceso, te lo acreditan. Pero net metering no te salva de un apagón. La batería sí." },
      { type: "p", text: "¿Quieres saber cuánto costaría tu sistema completo? Sube tu factura y te damos escenarios con y sin batería." },
    ],
  },
  "net-metering-puerto-rico": {
    title: "Net Metering en Puerto Rico: Lo que Necesitas Saber",
    description:
      "Cómo funciona la medición neta en Puerto Rico, la Ley 10-2024, y qué pasa con tu exceso de energía solar.",
    content: [
      { type: "p", text: "Net metering es la razón principal por la cual solar hace sentido financiero en Puerto Rico. Aquí te explicamos cómo funciona y hasta cuándo está garantizado." },
      { type: "h2", text: "¿Qué es net metering?" },
      { type: "p", text: "Cuando tu sistema solar produce más energía de la que consumes, el exceso se envía a la red de LUMA. Tu contador corre 'al revés' — te acreditan esa energía. Al final del mes, solo pagas la diferencia." },
      { type: "h2", text: "La Ley 10-2024" },
      { type: "p", text: "El Gobernador Pierluisi firmó la Ley 10-2024, que protege el net metering en Puerto Rico hasta 2030. Cualquier cambio aprobado después de esa fecha no puede tomar efecto hasta 12 meses después. Tienes garantía mínima hasta 2031." },
      { type: "h2", text: "¿Cuánto me acreditan?" },
      { type: "p", text: "LUMA te acredita al mismo precio que te cobran por kWh consumido (retail rate). En un mercado donde la tarifa es ~$0.27/kWh, cada kWh que exportas vale $0.27 en crédito. Esto es mucho más generoso que muchos estados del mainland." },
      { type: "h2", text: "Límites importantes" },
      { type: "list", items: [
        "Tu sistema no puede exceder el 120% de tu consumo anual histórico",
        "Los créditos se acumulan mes a mes pero no te pagan en efectivo — solo reducen tu factura",
        "Necesitas permiso de interconexión de LUMA (tu instalador debe gestionarlo)",
      ]},
      { type: "h2", text: "¿Qué pasa después de 2030?" },
      { type: "p", text: "Nadie sabe con certeza. Podría continuar igual, reducirse, o cambiar a 'net billing'. La tendencia nacional es reducir net metering. Eso hace que instalar AHORA sea más ventajoso — si te conectas bajo las reglas actuales, generalmente mantienes esas condiciones." },
      { type: "p", text: "¿Quieres saber cuánto ahorra net metering con TU consumo? Sube tu factura y te mostramos los números exactos." },
    ],
  },
};

const slugs = Object.keys(guides);

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) return { title: "Guía no encontrada" };
  return {
    title: `${guide.title} — Educación Solar`,
    description: guide.description,
  };
}

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-xl font-bold text-emerald-800 mt-8 mb-3">
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul className="mb-4 ml-6 space-y-1 text-gray-700">
          {block.items?.map((item, i) => (
            <li key={i} className="list-disc leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case "p":
    default:
      return (
        <p className="mb-4 text-gray-700 leading-relaxed">{block.text}</p>
      );
  }
}

export default async function GuiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-700">
          Inicio
        </Link>
        {" → "}
        <span className="text-gray-800">{guide.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-emerald-900 mb-6">
        {guide.title}
      </h1>

      <article>
        {guide.content.map((block, i) => (
          <RenderBlock key={i} block={block} />
        ))}
      </article>

      <div className="mt-12 p-6 bg-amber-50 rounded-xl border border-amber-200 text-center">
        <p className="text-lg font-semibold text-emerald-900 mb-3">
          ¿Listo para ver tus números reales?
        </p>
        <Link
          href="/factura"
          className="inline-block bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition"
        >
          Analiza tu Factura LUMA
        </Link>
      </div>

      <div className="mt-8 border-t pt-8">
        <h3 className="font-semibold text-gray-800 mb-4">Más guías</h3>
        <ul className="space-y-2">
          {slugs
            .filter((s) => s !== slug)
            .map((s) => (
              <li key={s}>
                <Link
                  href={`/guia/${s}`}
                  className="text-emerald-700 hover:underline"
                >
                  {guides[s].title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
