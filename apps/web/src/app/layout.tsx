import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "@/styles/globals.css";
import { site } from "@ekvir/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.brand.name} — ${site.brand.tagline}`,
    template: `%s | ${site.brand.name}`,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  description:
    "EKVIR is a premium recruitment and staffing solutions company based in Vadodara, Gujarat. We specialise in permanent staffing, contract staffing, and workforce solutions for MSMEs, startups, and founder-led businesses.",
  keywords: [...site.seo.primaryKeywords],
  authors: [{ name: site.brand.name }],
  creator: site.brand.name,
  metadataBase: new URL("https://ekvir.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ekvir.in",
    siteName: site.brand.name,
    title: `${site.brand.name} — ${site.brand.tagline}`,
    description:
      "Premium recruitment and staffing solutions for businesses in Gujarat and beyond.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand.name} — ${site.brand.tagline}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "EKVIR",
  description:
    "Premium recruitment and staffing solutions for MSMEs, startups, and founder-led businesses in Gujarat and beyond.",
  url: "https://ekvir.in",
  telephone: "+919904044439",
  email: "contact@ekvir.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Karelibaug",
    addressLocality: "Vadodara",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  areaServed: ["Gujarat", "India"],
  serviceType: ["Permanent Staffing", "Contract Staffing", "Executive Search", "Payroll & Compliance"],
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#C2A96A] focus:px-6 focus:py-3 focus:font-body focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
