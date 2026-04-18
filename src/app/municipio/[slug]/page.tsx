import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { municipalities, slugify, findBySlug } from "@/lib/municipalities";

export function generateStaticParams() {
  return municipalities.map((m) => ({ slug: slugify(m) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = findBySlug(slug);
  if (!name) return { title: "Municipio no encontrado" };
  return {
    title: `Educación Solar en ${name} — Ahorro Real con Energía Solar`,
    description: `¿Cuánto puedes ahorrar con energía solar en ${name}, Puerto Rico? Sube tu factura LUMA y te damos los números reales.`,
  };
}

export default async function MunicipioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = findBySlug(slug);
  if (!name) notFound();

  // PR-wide stats from market intel report (will be enriched with real bill data later)
  const stats = {
    avg_rate: 0.27,
    avg_bill: 115,
    solar_penetration: 12,
    installs_per_month: 4500,
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-700">Inicio</Link>
        {" → "}
        <span className="text-gray-800">Energía Solar en {name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-emerald-900 mb-4">
        Energía Solar en {name}, Puerto Rico
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        ¿Estás pagando demasiado por electricidad en {name}? No estás solo.
        Con una tarifa promedio de ${stats.avg_rate}/kWh y apagones frecuentes,
        miles de familias en {name} están evaluando energía solar.
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-emerald-50 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-emerald-800">${stats.avg_rate}/kWh</p>
          <p className="text-sm text-gray-600 mt-1">Tarifa promedio LUMA</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-emerald-800">${stats.avg_bill}/mes</p>
          <p className="text-sm text-gray-600 mt-1">Factura promedio PR</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-amber-700">{stats.solar_penetration}%</p>
          <p className="text-sm text-gray-600 mt-1">Hogares con solar en PR</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-5 text-center">
          <p className="text-2xl font-bold text-amber-700">{stats.installs_per_month.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">Instalaciones/mes en PR</p>
        </div>
      </div>

      {/* Content sections */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-emerald-800 mb-3">
          ¿Cuánto puedes ahorrar en {name}?
        </h2>
        <p className="text-gray-700 mb-4">
          El ahorro depende de tu consumo real. Una familia en {name} que paga
          $200/mes podría ahorrar entre $120-$190/mes con solar. Pero cada caso
          es diferente — por eso te damos números basados en TU factura, no promedios.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-emerald-800 mb-3">
          Incentivos disponibles
        </h2>
        <p className="text-gray-700 mb-4">
          Residentes de {name} tienen acceso a más de $1.5 billones en programas
          federales de energía solar, incluyendo subsidios que cubren hasta el 100%
          del costo para familias de bajos ingresos.
        </p>
        <Link
          href="/guia/incentivos-federales-2026"
          className="text-emerald-700 font-semibold hover:underline"
        >
          Ver guía completa de incentivos →
        </Link>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-emerald-800 mb-3">
          Cuidado con las estafas en {name}
        </h2>
        <p className="text-gray-700 mb-4">
          Con el boom solar, han aumentado los contratistas deshonestos.
          Antes de firmar con cualquier instalador, conoce las 5 estafas más comunes.
        </p>
        <Link
          href="/guia/estafas-solares-puerto-rico"
          className="text-emerald-700 font-semibold hover:underline"
        >
          Leer: 5 estafas solares comunes →
        </Link>
      </section>

      {/* CTA */}
      <div className="mt-10 p-8 bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl text-center">
        <h2 className="text-2xl font-bold text-emerald-900 mb-3">
          ¿Te conviene solar en {name}?
        </h2>
        <p className="text-gray-700 mb-6">
          Sube tu factura LUMA y te damos la respuesta honesta en 30 segundos.
          Sin vendedores. Sin compromiso.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/factura"
            className="inline-block bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition"
          >
            Analiza tu Factura
          </Link>
          <a
            href="sms:7874177711?body=SOLAR"
            className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition"
          >
            Curso Gratis por Texto
          </a>
        </div>
      </div>

      {/* Other municipalities */}
      <div className="mt-12 border-t pt-8">
        <h3 className="font-semibold text-gray-800 mb-4">
          Otros municipios
        </h3>
        <div className="flex flex-wrap gap-2">
          {municipalities
            .filter((m) => m !== name)
            .slice(0, 20)
            .map((m) => (
              <Link
                key={m}
                href={`/municipio/${slugify(m)}`}
                className="text-sm text-emerald-700 hover:underline bg-emerald-50 px-2 py-1 rounded"
              >
                {m}
              </Link>
            ))}
          <span className="text-sm text-gray-400">
            y {municipalities.length - 21} más...
          </span>
        </div>
      </div>
    </main>
  );
}
