const lessons = [
  "¿Qué es energía solar y cómo funciona en PR?",
  "Tu factura LUMA explicada paso a paso",
  "¿Cuántos paneles necesitas? La matemática real",
  "Baterías: ¿las necesitas o no?",
  "Incentivos federales y créditos contributivos",
  "Cómo elegir un instalador (sin que te tumben)",
  "Tu plan de acción personalizado",
];

const faqs = [
  {
    q: "¿Cuánto cuesta?",
    a: "Gratis. 100% gratis. No hay catch.",
  },
  {
    q: "¿Cada cuánto recibo lecciones?",
    a: "Cada 2 días recibes un mensaje de texto con la próxima lección.",
  },
  {
    q: "¿Me van a llamar?",
    a: "No. Solo texto. Sin llamadas, sin spam, sin vendedores.",
  },
  {
    q: "¿Puedo cancelar?",
    a: 'Sí. Escribe STOP en cualquier momento y se detiene.',
  },
];

export default function CursoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(f => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      {/* Hero */}
      <section className="bg-[#ecfdf5] py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#065f46] leading-tight">
            7 Lecciones Gratis Sobre Energía Solar
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Por mensaje de texto. Sin spam. Sin vendedores.
          </p>
        </div>
      </section>

      {/* Lessons */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto">
          <ol className="space-y-4">
            {lessons.map((lesson, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#065f46] text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </span>
                <p className="pt-1.5 text-gray-800">{lesson}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#fffbeb] py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <a
            href="sms:7874177711?body=SOLAR"
            className="inline-block bg-[#f59e0b] text-white text-lg font-bold px-10 py-4 rounded-xl hover:bg-[#d97706] transition-colors"
          >
            Texto SOLAR al 787-417-7711
          </a>
          <div className="mt-6 flex justify-center gap-6 text-sm text-gray-600">
            <span>100% gratis</span>
            <span>Sin compromiso</span>
            <span>Cancela cuando quieras</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-[#065f46] text-center mb-8">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold text-[#065f46]">{faq.q}</h3>
                <p className="mt-1 text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
