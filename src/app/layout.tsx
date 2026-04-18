import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Educación Solar — La verdad sobre tu factura LUMA",
  description: "Sube tu factura LUMA y te decimos la verdad: ¿te conviene solar? Sin venderte nada.",
  openGraph: {
    title: "Educación Solar — La verdad sobre tu factura LUMA",
    description: "Sube tu factura LUMA y te decimos la verdad: ¿te conviene solar? Sin venderte nada.",
    url: "https://educacionsolar.com",
    siteName: "Educación Solar",
    locale: "es_PR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Educación Solar — ¿Te conviene solar en PR?",
    description: "Analiza tu factura LUMA con IA. 3 escenarios de ahorro. Gratis. Sin vendedores.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          // Safe: hardcoded server-side JSON-LD, no user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Educación Solar",
              url: "https://educacionsolar.com",
              description:
                "Plataforma educativa sobre energía solar en Puerto Rico. Analiza tu factura LUMA con IA.",
              inLanguage: "es",
              publisher: {
                "@type": "Organization",
                name: "Educación Solar",
                url: "https://educacionsolar.com",
                areaServed: {
                  "@type": "Place",
                  name: "Puerto Rico",
                },
                sameAs: [
                  "https://caborojo.com",
                  "https://paloeste.com",
                  "https://mapadecaborojo.com",
                  "https://angelanderson.com",
                  "https://chequeodenegocio.com",
                ],
              },
            }),
          }}
        />
        <nav className="bg-[#065f46] text-white relative">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Educación Solar
            </Link>
            <div className="hidden md:flex gap-1 text-sm font-medium">
              <Link href="/" className="hover:text-amber-300 transition-colors px-3 py-2 rounded-md">
                Inicio
              </Link>
              <Link
                href="/factura"
                className="hover:text-amber-300 transition-colors px-3 py-2 rounded-md"
              >
                Analiza tu Factura
              </Link>
              <Link
                href="/curso"
                className="hover:text-amber-300 transition-colors px-3 py-2 rounded-md"
              >
                Curso Gratis
              </Link>
              <Link
                href="/guias"
                className="hover:text-amber-300 transition-colors px-3 py-2 rounded-md"
              >
                Guías
              </Link>
              <Link
                href="/instaladores"
                className="hover:text-amber-300 transition-colors px-3 py-2 rounded-md"
              >
                Instaladores
              </Link>
            </div>
            <MobileNav />
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="bg-[#065f46] text-white/80 text-sm">
          <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>&copy; 2026 Educación Solar &mdash; Puerto Rico</p>
            <p>
              Texto{" "}
              <span className="font-bold text-amber-300">SOLAR</span> al{" "}
              <a href="sms:7874177711?body=SOLAR" className="underline">
                787-417-7711
              </a>
            </p>
            <p className="text-white/50 text-xs mt-2">
              Un proyecto de{" "}
              <a href="https://caborojo.com" className="underline hover:text-white/80">CaboRojo.com</a>
              {" · "}
              <a href="https://angelanderson.com" className="underline hover:text-white/80">Angel Anderson</a>
            </p>
          </div>
        </footer>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
