import Link from "next/link";

// Los tres relojes que ya se movieron este año — ninguno requiere que tengas la factura en mano.
const RELOJES = [
  {
    fecha: "1 de julio de 2026",
    titulo: "Tu cargo fijo se duplicó",
    texto:
      "De $4 a $8 al mes solo por estar conectado. Sube a ~$16 en 2028. Aplica aunque tengas placas. Ya está en tu factura de este mes.",
    fuente: "Negociado de Energía, caso NEPR-AP-2023-0003",
    url: "https://www.metro.pr/noticias/2026/04/15/negociado-cambia-la-tarifa-de-la-luz-mas-cargos-fijos-y-menor-costo-por-consumo/",
    estado: "ya pasó",
  },
  {
    fecha: "31 de diciembre de 2025",
    titulo: "El descuento de 30% para placas se murió",
    texto:
      "El crédito federal para el que compra su sistema (Sección 25D) expiró. Todo sistema comprado en 2026 cuesta efectivamente ~30% más que hace un año.",
    fuente: "IRS · P.L. 119-21",
    url: "https://www.irs.gov/credits-deductions/residential-clean-energy-credit",
    estado: "ya pasó",
  },
  {
    fecha: "ahora mismo",
    titulo: "Tu net metering está en un pleito federal",
    texto:
      "Lo que LUMA te acredita por el exceso que produces está protegido por ley hasta 2030 — pero la Junta de Supervisión Fiscal demandó para anular esa ley. El caso sigue vivo.",
    fuente: "Ley 10-2024 · demanda JSF, Tribunal Federal",
    url: "https://www.sesapr.org/netmetering",
    estado: "activo",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — el por qué HOY. No pide factura, no pide que estés comprando. */}
      <section className="bg-[#ecfdf5] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-3">
            El récord de tu factura de luz
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#065f46] leading-tight">
            Este año te cambiaron la factura de la luz tres veces. Nadie te avisó.
          </h1>
          <p className="mt-5 text-lg text-gray-700">
            No estás loco ni eres malo con el dinero. Te movieron los números sin
            avisarte. Aquí está el récord — con fecha y fuente — y qué puedes
            hacer sin que te cojan dormido otra vez.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/17874177711?text=SOLAR"
              className="inline-block bg-[#065f46] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#064e3b] transition-colors"
            >
              Textea SOLAR — te aviso cuando cambie otra vez
            </a>
            <Link
              href="/datos"
              className="inline-block bg-white border border-[#065f46] text-[#065f46] font-semibold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Ver qué te cambiaron
            </Link>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Gratis. Sin vendedores. No necesitas tener la factura a mano.
          </p>
        </div>
      </section>

      {/* Los tres relojes */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#065f46] mb-2">
            Lo que cambió este año en tu factura
          </h2>
          <p className="text-gray-600 mb-8">
            Tres cosas. Todas verdad. Ninguna te la anunciaron.
          </p>
          <div className="space-y-4">
            {RELOJES.map((r) => (
              <div
                key={r.titulo}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm sm:flex sm:gap-5 sm:items-start"
              >
                <div className="shrink-0 mb-2 sm:mb-0 sm:w-40">
                  <span
                    className={`inline-block text-xs font-bold uppercase tracking-wide px-2 py-1 rounded ${
                      r.estado === "activo"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {r.estado === "activo" ? "⏳ activo" : "✓ ya pasó"}
                  </span>
                  <p className="mt-1 text-sm font-semibold text-gray-500">
                    {r.fecha}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{r.titulo}</h3>
                  <p className="mt-1 text-gray-700">{r.texto}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Fuente:{" "}
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 underline hover:text-emerald-900"
                    >
                      {r.fuente}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué esto importa — la vuelta emocional (ALIVIO) */}
      <section className="bg-[#fffbeb] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#065f46]">
            ¿Por qué esto importa hoy?
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Porque Puerto Rico paga la luz más cara y más inestable de la nación
            — <strong>13 veces</strong> más horas sin luz que el resto de EE.UU.,
            sin contar huracanes. Y la única salida que existe (soltar el
            sistema roto con placas) es justo la que te acaban de encarecer.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            No te vamos a decir que corras a comprar nada. Te vamos a dar los
            números reales — los tuyos y los de una familia de verdad — para que
            la decisión sea tuya, con calma, y sin que nadie te robe en el
            camino.
          </p>
        </div>
      </section>

      {/* Dos caminos: el récord y los casos */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          <Link
            href="/casos"
            className="block bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-emerald-600 transition"
          >
            <h3 className="text-xl font-bold text-[#065f46]">
              Casos reales con números
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Un sistema pagado cash con 4 años y medio sin fallas. Una retirada
              con lease ahorrando desde el primer mes. La fórmula y las 7
              preguntas antes de firmar cualquier papel.
            </p>
            <p className="mt-3 text-emerald-700 font-semibold text-sm">
              Ver los casos →
            </p>
          </Link>
          <Link
            href="/datos"
            className="block bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-emerald-600 transition"
          >
            <h3 className="text-xl font-bold text-[#065f46]">
              El Récord Solar de PR
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Todos los números en un solo sitio, cada uno con su fuente: la meta
              limpia que borraron, el crédito que murió, cuántos ya se salieron.
            </p>
            <p className="mt-3 text-emerald-700 font-semibold text-sm">
              Ver el récord →
            </p>
          </Link>
        </div>
      </section>

      {/* La herramienta — de-enfatizada, honesta: es para cuando SÍ tengas la factura */}
      <section className="bg-[#f9fafb] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#065f46]">
            ¿Ya tienes tu factura a mano?
          </h2>
          <p className="mt-3 text-gray-700">
            Súbela y te decimos, con tu consumo real, si solar te conviene o no —
            incluyendo cuando la respuesta es que no. Si no la tienes ahora, no
            hay prisa: textea SOLAR y aprendes primero.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/factura"
              className="inline-block bg-[#065f46] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#064e3b] transition-colors"
            >
              Analiza tu factura
            </Link>
            <a
              href="https://wa.me/17874177711?text=SOLAR"
              className="inline-block bg-[#f59e0b] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#d97706] transition-colors"
            >
              Empieza por texto
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
