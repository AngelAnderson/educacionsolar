import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Para Instaladores Solares — Educación Solar",
  description:
    "Recibe leads verificados de residentes que ya analizaron su factura LUMA. $99/mes. Sin contratos.",
};

export default function InstaladoresPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#065f46]">
        Leads Verificados de Energía Solar
      </h1>
      <p className="mt-4 text-gray-600 text-lg">
        Residentes que ya subieron su factura LUMA y quieren cotización.
      </p>

      {/* How it works — timeline, not 3-column grid */}
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-bold text-[#065f46] mb-6">Cómo funciona</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="w-9 h-9 rounded-full bg-[#065f46] text-white flex items-center justify-center font-bold text-sm shrink-0">1</span>
              <div className="w-px flex-1 bg-[#065f46]/20 mt-2" />
            </div>
            <p className="text-gray-700 pt-1.5">El residente sube su factura LUMA</p>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="w-9 h-9 rounded-full bg-[#065f46] text-white flex items-center justify-center font-bold text-sm shrink-0">2</span>
              <div className="w-px flex-1 bg-[#065f46]/20 mt-2" />
            </div>
            <p className="text-gray-700 pt-1.5">IA analiza consumo y calcula ahorro</p>
          </div>
          <div className="flex gap-4">
            <span className="w-9 h-9 rounded-full bg-[#065f46] text-white flex items-center justify-center font-bold text-sm shrink-0">3</span>
            <p className="text-gray-700 pt-1.5">Te conectamos con el lead verificado</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-bold text-[#065f46] mb-4">
          Qué recibes con cada lead
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="text-green-600">✓</span> Municipio del cliente
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">✓</span> Consumo mensual en kWh
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">✓</span> Monto de factura mensual
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">✓</span> Tarifa real por kWh
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">✓</span> Escenarios de ahorro
            pre-calculados
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">✓</span> Teléfono o email del
            cliente
          </li>
        </ul>
      </div>

      {/* Pricing — same visual language as rest of site */}
      <div className="mt-12 bg-[#065f46] rounded-2xl p-8 text-white">
        <p className="text-sm uppercase tracking-wide text-white/70">
          Suscripción mensual
        </p>
        <p className="mt-2 text-5xl font-bold">
          $99<span className="text-xl font-normal text-white/70">/mes</span>
        </p>
        <p className="mt-2 text-white/80">
          Sin contrato. Cancela cuando quieras.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-white/70">
          <li>Hasta 50 leads/mes</li>
          <li>Solo instaladores verificados</li>
          <li>Exclusividad por municipio disponible ($299/mes)</li>
        </ul>
        <a
          href="sms:7874177711?body=INSTALADOR%20PARTNER"
          className="inline-block mt-6 bg-[#f59e0b] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#d97706] transition-colors"
        >
          Texto INSTALADOR PARTNER al 787-417-7711
        </a>
      </div>

      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-bold text-[#065f46] mb-4">
          ¿Por qué educacionsolar.com?
        </h2>
        <div className="space-y-3 text-gray-700 text-sm">
          <p>
            No somos una compañía solar. Somos una plataforma educativa. Los
            residentes que llegan a nosotros NO están siendo presionados — están
            investigando por su cuenta. Son leads de mejor calidad.
          </p>
          <p>
            Cada lead viene con datos reales de consumo extraídos de su factura
            LUMA con inteligencia artificial. No son formularios genéricos — son
            clientes informados.
          </p>
          <p>
            Parte del ecosistema de{" "}
            <a
              href="https://caborojo.com"
              className="text-[#065f46] underline"
            >
              CaboRojo.com
            </a>{" "}
            — el directorio local más completo del oeste de PR.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-[#065f46] underline text-sm">
          ← Volver a Educación Solar
        </Link>
      </div>
    </main>
  );
}
