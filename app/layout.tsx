// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://syndaverse.com"), // ← cambia si usas otro dominio
  applicationName: "SYNDΛverse",
  title: {
    default: "SYNDΛverse",
    template: "SYNDΛverse — %s",
  },
  description:
    "Tres pilares: TRU-e (IET por industria), Syndapsis (desafíos + match AHP) y Syndatools (apps, agentes y conocimiento).",
  keywords: [
    "SYNDΛverse",
    "TRU-e",
    "IET",
    "AHP",
    "Syndapsis",
    "Syndatools",
    "neurodivergente",
    "confianza",
  ],
  authors: [{ name: "SYNDΛverse" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#0B0F19",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://syndaverse.com",
    siteName: "SYNDΛverse",
    title: "SYNDΛverse — TRU-e · Syndapsis · Syndatools",
    description:
      "Valorizamos la confianza por industria (TRU-e), resolvemos desafíos con agentes (Syndapsis) y escalamos herramientas & conocimiento (Syndatools).",
    images: [
      {
        url: "/og-syndaverse.png", // 1200x630 recomendado
        width: 1200,
        height: 630,
        alt: "SYNDΛverse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SYNDΛverse — TRU-e · Syndapsis · Syndatools",
    description:
      "IET por industria, desafíos con match AHP y marketplace de herramientas & knowledge.",
    images: ["/og-syndaverse.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-[#0B0F19] text-slate-100 antialiased`}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:m-4 focus:rounded focus:bg-white/10 focus:px-3 focus:py-2">
          Saltar al contenido
        </a>

        {/* wrapper opcional para anclar el main */}
        <div id="main">{children}</div>

        {/* JSON-LD (Organization) — ajusta url/logo si es necesario */}
        <Script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SYNDΛverse",
              url: "https://syndaverse.com",
              logo: "/og-syndaverse.png",
              sameAs: ["https://www.linkedin.com/company/syndaverse"],
            }),
          }}
        />
      </body>
    </html>
  );
}
