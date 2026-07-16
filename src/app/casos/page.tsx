import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Casos reales con números — Educación Solar",
  description:
    "Dos casos reales de solar en Puerto Rico con números verificables: uno pagado cash, uno en lease. La fórmula para hacer tu propia matemática y las 7 preguntas antes de firmar.",
};

export default function CasosPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-2">
        Casos reales
      </p>
      <h1 className="text-3xl font-bold text-emerald-900 mb-4">
        Dos casas de la misma familia. Dos caminos distintos. Números de verdad.
      </h1>
      <p className="text-gray-700 mb-10">
        Esto no es un testimonio de vendedor. Son los números de la familia del
        que hizo este sitio. Si el récord no aguanta en casa, no aguanta en
        ningún lado.
      </p>

      {/* Caso 1 — Cash */}
      <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="bg-emerald-800 text-white px-5 py-3">
          <p className="font-bold">Caso 1: pagado cash</p>
        </div>
        <div className="p-5 space-y-3 text-gray-700">
          <p>
            Sistema instalado el <strong>16 de diciembre de 2021</strong> en
            Cabo Rojo: 20+ placas y 2 baterías Tesla Powerwall. Costo
            aproximado: <strong>$40,000-$42,000</strong>, pagado completo.
          </p>
          <p>
            Desde entonces: <strong>4 años y medio corridos sin una falla</strong>.
            En ese tiempo Puerto Rico pasó el huracán Fiona (2022) y los
            colapsos del sistema de 2024-2025. Esta casa ni se enteró.
          </p>
          <p>
            La factura de LUMA: el cargo por conexión, nada más. Con el aire
            acondicionado de la sala prendido desde las 7 de la mañana hasta
            las 10 de la noche, y los cuartos toda la noche.
          </p>
          <p className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
            <strong>La parte honesta:</strong> ese sistema se compró con el
            crédito federal del 26% que existía en 2021. Ese crédito ya no
            existe (murió el 31 de diciembre de 2025). El mismo sistema hoy
            sale efectivamente ~30% más caro para el que compra cash. La
            matemática que funcionó en 2021 hay que hacerla más fina en 2026.
            Por eso existe este sitio.
          </p>
        </div>
      </div>

      {/* Caso 2 — Lease */}
      <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="bg-emerald-800 text-white px-5 py-3">
          <p className="font-bold">Caso 2: retirada, con lease, cero capital</p>
        </div>
        <div className="p-5 space-y-3 text-gray-700">
          <p>
            Una retirada de ingreso fijo. Antes pagaba <strong>~$90+ al mes</strong>{" "}
            de luz. Con un sistema en modalidad de lease (no puso dinero de
            entrada), hoy su gasto mensual total de energía es{" "}
            <strong>~$40-50 menos</strong> que antes.
          </p>
          <p>
            Para alguien que no trabaja, $40-50 al mes son unos $500-600 al
            año de vuelta en el bolsillo. Eso no es una estadística: es
            compra, es medicina, es margen para vivir.
          </p>
          <p className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
            <strong>La parte honesta:</strong> el lease no es dueño de nada. La
            compañía es dueña del sistema y captura el incentivo federal
            comercial que sigue vivo. Un lease bien hecho salva a una retirada.
            Un lease mal hecho la amarra 25 años. La diferencia es UNA resta,
            y la fórmula está abajo.
          </p>
        </div>
      </div>

      {/* La fórmula */}
      <h2 className="text-2xl font-bold text-emerald-900 mt-12 mb-4">
        La fórmula (hazla antes de firmar NADA)
      </h2>
      <div className="bg-gray-900 text-gray-100 rounded-xl p-5 font-mono text-sm overflow-x-auto mb-4">
        <p>Lo que pagas HOY de luz al mes</p>
        <p className="text-amber-400">− (mensualidad nueva + lo que quede de LUMA)</p>
        <p className="border-t border-gray-600 mt-2 pt-2">= tu número real al mes</p>
      </div>
      <ul className="space-y-2 text-gray-700 mb-10">
        <li>
          Si el número es <strong>positivo</strong>: ese contrato te devuelve
          dinero desde el mes 1.
        </li>
        <li>
          Si es <strong>negativo</strong>: estás pagando por independencia y
          respaldo, no por ahorro. Puede valer la pena igual, pero que sea
          decisión tuya, no del vendedor.
        </li>
        <li>
          No olvides el cargo fijo de LUMA: <strong>$8/mes desde julio 2026</strong>,
          sube a ~$16 en 2028. Con placas y todo, eso se queda.
        </li>
      </ul>

      {/* Las 7 preguntas */}
      <h2 className="text-2xl font-bold text-emerald-900 mb-4">
        Las 7 preguntas antes de firmar
      </h2>
      <ol className="space-y-3 text-gray-700 list-decimal ml-6 mb-6">
        <li>
          <strong>¿Cuál es el precio por watt instalado?</strong> Divide el
          precio total entre los watts del sistema. En el mainland el benchmark
          ronda $2.75-$3.15/W. Si te cotizan mucho más, pregunta por qué.
        </li>
        <li>
          <strong>¿Hay cargos de financiamiento escondidos en el precio?</strong>{" "}
          (los llaman dealer fees y pueden ser 20-30% del total)
        </li>
        <li>
          <strong>¿Quién es el dueño del sistema?</strong> ¿Tú, el banco, o la
          compañía? Cambia todo: incentivos, mantenimiento, y qué pasa si
          vendes.
        </li>
        <li>
          <strong>¿Qué pasa si vendo la casa?</strong> Un lease mal escrito
          complica la venta. Pide esa cláusula por escrito.
        </li>
        <li>
          <strong>¿Cuál es la garantía de la batería, en años Y en ciclos?</strong>{" "}
          Y compárala con el tiempo en que el sistema se paga solo.
        </li>
        <li>
          <strong>¿Quién da servicio en mi área y en cuánto tiempo?</strong>{" "}
          Pide referencias de clientes con 3+ años instalados, no de la semana
          pasada.
        </li>
        <li>
          <strong>¿Qué asume el contrato sobre el net metering?</strong> Está
          protegido hasta 2030 por ley, pero hay un pleito federal activo para
          anular esa ley. Si el vendedor te dice que está garantizado para
          siempre, no lo está.
        </li>
      </ol>
      <p className="text-gray-600 text-sm mb-12">
        Cualquier instalador serio contesta las 7 sin molestarse. El que se
        moleste, ya te contestó.
      </p>

      {/* CTA */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-900 mb-3">
          Haz tu propia matemática con tu factura real
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/factura"
            className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition"
          >
            Analiza tu Factura
          </Link>
          <Link
            href="/datos"
            className="bg-white border border-emerald-700 text-emerald-800 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition"
          >
            Ver el Récord Solar de PR
          </Link>
        </div>
      </div>
    </main>
  );
}
