"use client";

import { useState, useRef, useCallback } from "react";

interface SavingsScenario {
  name: string;
  monthly_savings_usd: number;
  annual_savings_usd: number;
  payback_years: number;
  offset_pct: number;
  estimated_system_cost: number;
  twenty_five_year_savings: number;
}

interface OcrResult {
  municipality: string;
  kwh_monthly: number;
  bill_amount_usd: number;
  rate_per_kwh: number;
}

interface ApiResponse {
  success: boolean;
  data: OcrResult;
  savings: { scenarios: SavingsScenario[] };
  confidence: number;
}

type Status = "idle" | "preview" | "loading" | "results" | "error";

const scenarioStyles: Record<string, { border: string; label: string; desc: string }> = {
  Pessimistic: { border: "border-red-300 bg-red-50", label: "Conservador", desc: "Si las condiciones no son ideales" },
  Realistic: { border: "border-green-400 bg-green-50 ring-2 ring-green-300", label: "Lo Más Probable", desc: "Basado en datos reales de PR" },
  Optimistic: { border: "border-amber-300 bg-amber-50", label: "Mejor Caso", desc: "Si todo sale perfecto" },
};

const LUMA_AVG_RATE = 0.27;
const AVG_KWH_PR = 700;

function getVerdict(rate: number, kwh: number): { emoji: string; text: string; color: string } {
  if (rate >= 0.25 && kwh >= 400) return { emoji: "\u2705", text: "Solar TE CONVIENE", color: "text-green-700 bg-green-50 border-green-200" };
  if (rate >= 0.20 || kwh >= 300) return { emoji: "\u26A0\uFE0F", text: "Solar PUEDE convenirte", color: "text-amber-700 bg-amber-50 border-amber-200" };
  return { emoji: "\u274C", text: "Solar probablemente NO te conviene ahora", color: "text-red-700 bg-red-50 border-red-200" };
}

function getRateComparison(rate: number): string {
  if (rate > LUMA_AVG_RATE + 0.03) return "m\u00e1s alto que el promedio en PR";
  if (rate < LUMA_AVG_RATE - 0.03) return "m\u00e1s bajo que el promedio en PR";
  return "similar al promedio en PR";
}

function getConsumptionLevel(kwh: number): string {
  if (kwh > 900) return "alto";
  if (kwh > 500) return "normal";
  return "bajo";
}

function getConfidenceInfo(confidence: number): { emoji: string; text: string } {
  if (confidence >= 0.8) return { emoji: "\uD83D\uDFE2", text: "Alta confianza en los datos" };
  if (confidence >= 0.5) return { emoji: "\uD83D\uDFE1", text: "Confianza moderada \u2014 verifica los n\u00fameros" };
  return { emoji: "\uD83D\uDD34", text: "Baja confianza \u2014 los datos podr\u00edan no ser exactos" };
}

export default function FacturaPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setError("");
    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
    setStatus("preview");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const submit = async () => {
    if (!file) return;
    setStatus("loading");
    setError("");

    try {
      const reader = new FileReader();
      const base64: string = await new Promise((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mimeType: file.type }),
      });

      if (!res.ok) throw new Error("Error al analizar la factura");

      const data: ApiResponse = await res.json();
      setResult(data);
      setStatus("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setStatus("error");
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setStatus("idle");
    setError("");
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#065f46] text-center">
          Analiza tu Factura LUMA
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Sube una foto o PDF de tu factura. Tu información es privada.
        </p>

        {/* Upload zone */}
        {(status === "idle" || status === "error") && (
          <>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className="mt-8 border-2 border-dashed border-[#065f46]/40 rounded-xl p-12 text-center cursor-pointer hover:border-[#065f46] transition-colors"
            >
              <p className="text-lg font-medium text-[#065f46]">
                Arrastra tu factura aquí
              </p>
              <p className="mt-1 text-sm text-gray-500">
                o toca para seleccionar foto / PDF
              </p>
              <input
                ref={inputRef}
                type="file"
                accept="image/*,application/pdf"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </div>

            {/* Trust signals */}
            <div className="mt-8 space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">🔒</span>
                <p><strong>Tu información es 100% privada.</strong> No guardamos tu factura ni la compartimos con nadie.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">⚡</span>
                <p><strong>Resultado en 30 segundos.</strong> IA analiza tu consumo y calcula 3 escenarios de ahorro.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 mt-0.5">✓</span>
                <p><strong>Sin compromiso.</strong> No te vamos a llamar, ni vender nada, ni compartir tu número.</p>
              </div>
            </div>
          </>
        )}

        {error && (
          <p className="mt-4 text-center text-red-600 text-sm">{error}</p>
        )}

        {/* Preview */}
        {status === "preview" && file && (
          <div className="mt-8 text-center">
            {preview ? (
              <img
                src={preview}
                alt="Vista previa de factura"
                className="mx-auto max-h-64 rounded-lg border"
              />
            ) : (
              <div className="mx-auto w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                {file.name}
              </div>
            )}
            <div className="mt-6 flex gap-4 justify-center">
              <button
                onClick={submit}
                className="bg-[#065f46] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#064e3b] transition-colors"
              >
                Analizar mi Factura
              </button>
              <button
                onClick={reset}
                className="border border-gray-300 px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cambiar
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {status === "loading" && (
          <div className="mt-12 text-center">
            <div className="w-10 h-10 border-4 border-[#065f46] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-[#065f46] font-medium">
              Analizando tu factura con inteligencia artificial...
            </p>
          </div>
        )}

        {/* Results */}
        {status === "results" && result && (() => {
          const verdict = getVerdict(result.data.rate_per_kwh, result.data.kwh_monthly);
          const conf = getConfidenceInfo(result.confidence);
          const realistic = result.savings.scenarios.find(s => s.name === "Realistic");
          const shareText = realistic
            ? `Descubr\u00ed que puedo ahorrar $${realistic.monthly_savings_usd.toFixed(0)}/mes con solar. Analiza tu factura gratis en educacionsolar.com`
            : "Analiza tu factura LUMA gratis en educacionsolar.com";
          return (
          <div className="mt-10">
            {/* Confidence indicator */}
            <p className="text-center text-sm text-gray-500 mb-4">
              {conf.emoji} {conf.text}
            </p>

            {/* Section 1: Tu Diagn\u00f3stico */}
            <div className={`rounded-xl p-6 mb-8 border-2 ${verdict.color}`}>
              <h2 className="text-xl font-bold mb-4">Tu Diagn\u00f3stico</h2>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Tu municipio:</strong> {result.data.municipality}
                </p>
                <p>
                  <strong>Tu consumo:</strong> {result.data.kwh_monthly} kWh/mes \u2014 eso es{" "}
                  <strong>{getConsumptionLevel(result.data.kwh_monthly)}</strong> para una casa en PR
                </p>
                <p>
                  <strong>Tu tarifa real:</strong> ${result.data.rate_per_kwh.toFixed(2)}/kWh \u2014{" "}
                  {getRateComparison(result.data.rate_per_kwh)}
                </p>
                <p>
                  <strong>Tu factura:</strong> ${result.data.bill_amount_usd.toFixed(2)}/mes
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-current/20">
                <p className="text-lg font-bold">
                  {verdict.emoji} Veredicto: {verdict.text}
                </p>
              </div>
            </div>

            {/* Section 2: Escenarios de ahorro */}
            <h2 className="text-xl font-bold text-[#065f46] text-center mb-2">
              Tus 3 Escenarios de Ahorro
            </h2>
            <p className="text-center text-sm text-gray-500 mb-6">
              Basados en tu consumo real de {result.data.kwh_monthly} kWh/mes
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {result.savings.scenarios.map((s) => {
                const style = scenarioStyles[s.name] || { border: "border-gray-200", label: s.name, desc: "" };
                return (
                <div
                  key={s.name}
                  className={`border-2 rounded-xl p-6 text-center ${style.border}`}
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                    {style.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{style.desc}</p>
                  <p className="mt-3 text-2xl font-bold text-[#065f46]">
                    ${s.monthly_savings_usd.toFixed(0)}/mes
                  </p>
                  <p className="text-sm text-gray-600">
                    ${s.annual_savings_usd.toFixed(0)}/a\u00f1o
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Se paga solo en ~{s.payback_years.toFixed(1)} a\u00f1os
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    En 25 a\u00f1os ahorras ${s.twenty_five_year_savings.toLocaleString()}
                  </p>
                </div>
                );
              })}
            </div>

            {/* Section 3: Qu\u00e9 hago ahora */}
            <div className="mt-10 bg-[#ecfdf5] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#065f46] mb-4">
                \u00bfQu\u00e9 hago ahora?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#065f46] text-white flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <p className="font-semibold text-gray-800">Aprende m\u00e1s antes de decidir</p>
                    <p className="text-sm text-gray-600">
                      Lee nuestra <a href="/guia/estafas-solares-puerto-rico" className="text-[#065f46] underline">gu\u00eda de estafas solares</a> y{" "}
                      <a href="/guia/incentivos-federales-2026" className="text-[#065f46] underline">los incentivos federales disponibles</a>.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#065f46] text-white flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <p className="font-semibold text-gray-800">Toma el curso gratis (7 lecciones por texto)</p>
                    <p className="text-sm text-gray-600">
                      Texto <strong>SOLAR</strong> al{" "}
                      <a href="sms:7874177711?body=SOLAR" className="text-[#065f46] underline">787-417-7711</a>.
                      Sin costo. Sin compromiso.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <p className="font-semibold text-gray-800">Habla con un instalador verificado</p>
                    <p className="text-sm text-gray-600">
                      Texto <strong>INSTALADOR</strong> al{" "}
                      <a href="sms:7874177711?body=INSTALADOR" className="text-[#f59e0b] underline font-semibold">787-417-7711</a>.
                      Solo instaladores que hemos verificado.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Lo que NO te van a decir */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                Lo que NO te van a decir
              </h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>\u2022 Tu cargo fijo de LUMA ($4-15/mes) <strong>NO desaparece</strong> con solar</li>
                <li>\u2022 Necesitas <strong>permiso de LUMA</strong> para conectarte \u2014 sin permiso, te desconectan</li>
                <li>\u2022 Los paneles se degradan ~0.5% por a\u00f1o \u2014 en 25 a\u00f1os producen ~12% menos</li>
                <li>\u2022 Si tu techo necesita reparaci\u00f3n, h\u00e1zla <strong>antes</strong> de instalar paneles</li>
                <li>\u2022 El net metering est\u00e1 protegido hasta 2030, pero <strong>no sabemos qu\u00e9 pasa despu\u00e9s</strong></li>
              </ul>
            </div>

            {/* Share + Reset */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#1da851] transition-colors"
              >
                Compartir por WhatsApp
              </a>
              <button
                onClick={reset}
                className="inline-flex items-center justify-center border border-gray-300 px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Analizar otra factura
              </button>
            </div>
          </div>
          );
        })()}
      </div>
    </section>
  );
}
