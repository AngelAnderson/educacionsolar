import Link from "next/link";

const stats = [
  { value: "191,929", label: "techos solares en PR (EIA, cierre 2025)" },
  { value: "$8/mes", label: "cargo fijo LUMA desde jul 2026 (era $4)" },
  { value: "13x", label: "más horas sin luz que el mainland, sin contar huracanes" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#ecfdf5] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#065f46] leading-tight">
            ¿Tu factura LUMA está por las nubes?
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Sube tu factura y te decimos la verdad &mdash; ¿te conviene solar o
            no?
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/factura"
              className="inline-block bg-[#065f46] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#064e3b] transition-colors"
            >
              Analiza tu Factura
            </Link>
            <Link
              href="/curso"
              className="inline-block bg-[#f59e0b] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#d97706] transition-colors"
            >
              Curso Gratis por Texto
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-[#f9fafb]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <p className="text-3xl font-bold text-[#065f46]">{s.value}</p>
              <p className="mt-1 text-gray-600 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Record + Casos */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          <Link
            href="/datos"
            className="block bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-emerald-600 transition"
          >
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
              Nuevo
            </p>
            <h3 className="mt-1 text-xl font-bold text-[#065f46]">
              El Récord Solar de PR
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Los números que nadie junta: el cargo fijo que ya se duplicó, la
              meta renovable que borraron, el crédito federal que murió. Cada
              dato con fuente.
            </p>
          </Link>
          <Link
            href="/casos"
            className="block bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-emerald-600 transition"
          >
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
              Nuevo
            </p>
            <h3 className="mt-1 text-xl font-bold text-[#065f46]">
              Casos reales con números
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Un sistema pagado cash con 4.5 años sin fallas. Una retirada con
              lease ahorrando desde el mes 1. La fórmula y las 7 preguntas
              antes de firmar.
            </p>
          </Link>
        </div>
      </section>

      {/* Trust — real evidence, not happy talk */}
      <section className="bg-[#fffbeb] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl font-semibold text-[#065f46]">
            No vendemos paneles. No instalamos nada.
          </p>
          <p className="mt-2 text-gray-700">
            Si solar no te conviene, te lo decimos. Ya más de 100 residentes han analizado su factura aquí.
          </p>
        </div>
      </section>

      {/* How it works — timeline layout, not 3-column grid */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#065f46] mb-10">
            ¿Cómo funciona?
          </h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="w-10 h-10 rounded-full bg-[#065f46] text-white flex items-center justify-center font-bold text-sm shrink-0">1</span>
                <div className="w-px flex-1 bg-[#065f46]/20 mt-2" />
              </div>
              <div className="pb-2">
                <h3 className="text-lg font-semibold text-gray-900">Sube tu factura</h3>
                <p className="mt-1 text-gray-600">Tómale foto o sube el PDF de tu factura LUMA.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="w-10 h-10 rounded-full bg-[#065f46] text-white flex items-center justify-center font-bold text-sm shrink-0">2</span>
                <div className="w-px flex-1 bg-[#065f46]/20 mt-2" />
              </div>
              <div className="pb-2">
                <h3 className="text-lg font-semibold text-gray-900">Te damos los números reales</h3>
                <p className="mt-1 text-gray-600">IA analiza tu consumo y calcula 3 escenarios de ahorro.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="w-10 h-10 rounded-full bg-[#065f46] text-white flex items-center justify-center font-bold text-sm shrink-0">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Tú decides</h3>
                <p className="mt-1 text-gray-600">Sin presión, sin vendedores. Tú tienes los datos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
