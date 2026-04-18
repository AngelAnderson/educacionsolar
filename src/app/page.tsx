import Link from "next/link";

const stats = [
  { value: "4,500", label: "instalaciones/mes en PR" },
  { value: "$0.27/kWh", label: "promedio LUMA" },
  { value: "$1.5B+", label: "en incentivos federales" },
];

const steps = [
  {
    num: "1",
    title: "Sube tu factura",
    desc: "Tómale foto o sube el PDF de tu factura LUMA.",
  },
  {
    num: "2",
    title: "Te damos los números reales",
    desc: "IA analiza tu consumo y calcula 3 escenarios de ahorro.",
  },
  {
    num: "3",
    title: "Tú decides",
    desc: "Sin presión, sin vendedores. Tú tienes los datos.",
  },
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
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-[#065f46]">{s.value}</p>
              <p className="mt-1 text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-[#fffbeb] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl font-semibold text-[#065f46]">
            Sin venderte nada.
          </p>
          <p className="mt-2 text-gray-700">
            Si solar no te conviene, te lo decimos. Punto.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#065f46] mb-10">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#065f46] text-white flex items-center justify-center text-xl font-bold">
                  {step.num}
                </div>
                <h3 className="mt-4 font-semibold text-lg">{step.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
