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
      <h1 className="text-3xl font-bold text-[#065f46] text-center">
        Leads Verificados de Energía Solar
      </h1>
      <p className="mt-4 text-center text-gray-600 text-lg">
        Residentes que ya subieron su factura LUMA y quieren cotización.
      </p>

      <div className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-[#065f46]">Cómo funciona</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#ecfdf5] rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-[#065f46]">1</p>
            <p className="mt-2 text-sm text-gray-700">
              El residente sube su factura LUMA
            </p>
          </div>
          <div className="bg-[#ecfdf5] rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-[#065f46]">2</p>
            <p className="mt-2 text-sm text-gray-700">
              IA analiza consumo y calcula ahorro
            </p>
          </div>
          <div className="bg-[#ecfdf5] rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-[#065f46]">3</p>
            <p className="mt-2 text-sm text-gray-700">
              Te conectamos con el lead verificado
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-[#065f46] mb-4">
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

      <div className="mt-12 bg-gradient-to-br from-[#065f46] to-[#064e3b] rounded-2xl p-8 text-white text-center">
        <p className="text-sm uppercase tracking-wide text-white/70">
          Suscripción mensual
        </p>
        <p className="mt-2 text-5xl font-bold">
          $99<span className="text-xl font-normal">/mes</span>
        </p>
        <p className="mt-2 text-white/80">
          Sin contrato. Cancela cuando quieras.
        </p>
        <div className="mt-6 space-y-1 text-sm text-white/70">
          <p>Hasta 50 leads/mes</p>
          <p>Solo instaladores verificados</p>
          <p>Exclusividad por municipio disponible ($299/mes)</p>
        </div>
        <a
          href="sms:7874177711?body=INSTALADOR%20PARTNER"
          className="inline-block mt-6 bg-[#f59e0b] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#d97706] transition-colors"
        >
          Texto INSTALADOR PARTNER al 787-417-7711
        </a>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-[#065f46] mb-4">
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

      <div className="mt-8 text-center">
        <Link href="/" className="text-[#065f46] underline text-sm">
          ← Volver a Educación Solar
        </Link>
      </div>
    </main>
  );
}
