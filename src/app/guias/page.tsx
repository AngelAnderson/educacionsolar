import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guías de Energía Solar — Educación Solar",
  description:
    "Guías gratuitas sobre energía solar en Puerto Rico: cómo leer tu factura LUMA, estafas, incentivos federales, baterías y net metering.",
};

const guides = [
  {
    slug: "como-leer-factura-luma",
    title: "Cómo Leer tu Factura de LUMA",
    description: "Entiende cada cargo y calcula tu tarifa real.",
  },
  {
    slug: "estafas-solares-puerto-rico",
    title: "5 Estafas Solares Comunes en Puerto Rico",
    description: "Cómo identificar contratistas deshonestos.",
  },
  {
    slug: "incentivos-federales-2026",
    title: "Incentivos Federales para Solar (2026)",
    description: "Créditos, subsidios y programas disponibles en PR.",
  },
  {
    slug: "baterias-solares-necesito",
    title: "¿Necesito Batería con mi Sistema Solar?",
    description: "Guía honesta: cuándo vale la pena y cuándo no.",
  },
  {
    slug: "net-metering-puerto-rico",
    title: "Net Metering en Puerto Rico",
    description: "Cómo funciona la medición neta y la Ley 10-2024.",
  },
];

export default function GuiasPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-emerald-900 mb-4">
        Guías de Energía Solar
      </h1>
      <p className="text-gray-600 mb-10">
        Todo lo que necesitas saber antes de tomar una decisión sobre solar en
        Puerto Rico. Sin jerga técnica, sin sales pitch.
      </p>

      <div className="space-y-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guia/${guide.slug}`}
            className="block p-6 bg-white border border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-emerald-800 mb-1">
              {guide.title}
            </h2>
            <p className="text-gray-600">{guide.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-amber-50 rounded-xl border border-amber-200 text-center">
        <p className="text-lg font-semibold text-emerald-900 mb-3">
          ¿Prefieres aprender por texto?
        </p>
        <a
          href="sms:7874177711?body=SOLAR"
          className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition"
        >
          Curso Gratis: 7 Lecciones por SMS
        </a>
      </div>
    </main>
  );
}
