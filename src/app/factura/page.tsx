"use client";

import { useState, useRef, useCallback } from "react";

interface SavingsScenario {
  label: string;
  monthly_savings: number;
  annual_savings: number;
  payback_years: number;
}

interface OcrResult {
  municipality: string;
  kwh: number;
  bill_amount: number;
}

interface ApiResponse {
  success: boolean;
  data: OcrResult;
  savings: SavingsScenario[];
  confidence: number;
}

type Status = "idle" | "preview" | "loading" | "results" | "error";

const scenarioColors: Record<string, string> = {
  Pesimista: "border-red-300 bg-red-50",
  Realista: "border-green-300 bg-green-50",
  Optimista: "border-amber-300 bg-amber-50",
};

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
        {status === "results" && result && (
          <div className="mt-10">
            {/* Extracted data */}
            <div className="bg-[#ecfdf5] rounded-lg p-6 mb-8">
              <h2 className="font-semibold text-[#065f46] mb-3">
                Datos extraídos
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <p className="text-gray-500">Municipio</p>
                  <p className="font-semibold">{result.data.municipality}</p>
                </div>
                <div>
                  <p className="text-gray-500">Consumo</p>
                  <p className="font-semibold">{result.data.kwh} kWh</p>
                </div>
                <div>
                  <p className="text-gray-500">Total factura</p>
                  <p className="font-semibold">
                    ${result.data.bill_amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Savings scenarios */}
            <h2 className="text-xl font-bold text-[#065f46] text-center mb-6">
              Tus escenarios de ahorro
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {result.savings.map((s) => (
                <div
                  key={s.label}
                  className={`border-2 rounded-xl p-6 text-center ${scenarioColors[s.label] || "border-gray-200"}`}
                >
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                    {s.label}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-[#065f46]">
                    ${s.monthly_savings.toFixed(0)}/mes
                  </p>
                  <p className="text-sm text-gray-600">
                    ${s.annual_savings.toFixed(0)}/año
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    Se paga en ~{s.payback_years.toFixed(1)} años
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <a
                href="sms:7874177711?body=INSTALADOR"
                className="inline-block bg-[#f59e0b] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#d97706] transition-colors"
              >
                ¿Quieres hablar con un instalador verificado?
              </a>
              <button
                onClick={reset}
                className="block mx-auto mt-4 text-sm text-gray-500 underline"
              >
                Analizar otra factura
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
