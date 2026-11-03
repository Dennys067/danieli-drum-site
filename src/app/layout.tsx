import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { site } from "@/content/site";
import { contact, instagramUrl } from "@/components/sections-b/data";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const title = `${site.name} | Advogada em ${site.city} – Previdenciário e Cível`;
const description = `Escritório da advogada ${site.name} (${contact.oab}) em ${site.city}. ${site.areas}, com atendimento próximo, claro e humanizado.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  icons: { icon: "/brand/monograma-transparente.png" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
  },
};

// Dados estruturados para o Google entender quem é o escritório, onde fica e como contatar.
const legalService = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: `${site.name} – ${site.tagline}`,
  url: site.url,
  image: `${site.url}/brand/monograma-transparente.png`,
  telephone: `+${contact.whatsappNumber}`,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Origens França Simões, 1541, Centro",
    addressLocality: "Glória de Dourados",
    addressRegion: "MS",
    postalCode: "79730-007",
    addressCountry: "BR",
  },
  areaServed: site.city,
  knowsAbout: ["Direito Previdenciário", "Direito Cível"],
  sameAs: [instagramUrl].filter(Boolean),
};

export const viewport: Viewport = {
  themeColor: "#f8f4ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jost.variable} antialiased`}>
      <body className="min-h-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(legalService) }} />
        {children}
      </body>
    </html>
  );
}
