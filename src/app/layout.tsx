import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { WhatsAppWidget } from "@/components/ui/whatsapp-widget";
import { site } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Evolut Ecommerce Solutions — Full-Stack Amazon, Shopify & DTC Agency",
    template: "%s · Evolut Ecommerce Solutions",
  },
  description: site.description,
  keywords: [
    "Evolut",
    "Evolut Ecommerce Solutions",
    "evolutecomsolutions",
    "Amazon FBA agency",
    "Amazon account management",
    "Shopify development agency",
    "Shopify Hydrogen",
    "MERN stack ecommerce",
    "ecommerce agency",
    "ecommerce services",
    "product sourcing agent",
    "Amazon sourcing agent",
    "Amazon PPC management",
    "Amazon Sponsored Products",
    "Amazon DSP",
    "listing optimization",
    "A+ content design",
    "product photography",
    "Amazon brand registry",
    "trademark registration",
    "patent registration",
    "freight forwarding FBA",
    "ecommerce agency Pakistan",
    "Jhelum ecommerce",
    "DTC growth agency",
  ],
  authors: [{ name: "Evolut Ecommerce Solutions", url: site.url }],
  creator: "Evolut Ecommerce Solutions",
  publisher: "Evolut Ecommerce Solutions",
  applicationName: site.fullName,
  category: "Ecommerce Agency",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Evolut Ecommerce Solutions — Engineered for Scale",
    description:
      "Sourcing, listings, photography, ads, trademark, freight, and Shopify/MERN dev. One accountable team. $420M+ GMV under management across 240+ brands.",
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.fullName,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Evolut Ecommerce Solutions — Engineered for Scale",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evolut Ecommerce Solutions — Engineered for Scale",
    description:
      "Full-stack ecommerce agency for Amazon, Shopify, and DTC operators. Sourcing, listings, photography, ads, trademark — one team.",
    images: ["/og-image.jpg"],
    site: "@evolut",
    creator: "@evolut",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "",
    other: {
      ...(process.env.BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
        : {}),
      ...(process.env.YANDEX_VERIFICATION
        ? { "yandex-verification": process.env.YANDEX_VERIFICATION }
        : {}),
    },
  },
};

/* ------------------------------------------------------------------ *
 * JSON-LD Structured Data — Organization + LocalBusiness
 *
 * This tells Google who the business is, where it's located, and
 * what it does. Essential for appearing in Google Knowledge Panels
 * and Google Maps results.
 * ------------------------------------------------------------------ */
function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${site.url}/#organization`,
        name: site.fullName,
        legalName: site.fullName,
        alternateName: [site.name, "evolutecomsolutions"],
        url: site.url,
        logo: {
          "@type": "ImageObject",
          "@id": `${site.url}/#logo`,
          url: `${site.url}/logo_1.png`,
          contentUrl: `${site.url}/logo_1.png`,
          width: 2294,
          height: 1824,
          caption: site.fullName,
        },
        image: [
          `${site.url}/logo_1.png`,
          `${site.url}/og-image.jpg`,
          `${site.url}/icon-512.png`,
        ],
        description: site.description,
        slogan: site.tagline,
        foundingDate: "2018",
        foundingLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jhelum",
            addressRegion: "Punjab",
            addressCountry: "PK",
          },
        },
        email: site.contact.email,
        telephone: site.contact.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Citi Housing Society",
          addressLocality: "Jhelum",
          addressRegion: "Punjab",
          addressCountry: "PK",
        },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "Pakistan" },
        ],
        knowsAbout: [
          "Amazon FBA",
          "Amazon Seller Central",
          "Amazon Vendor Central",
          "Amazon PPC",
          "Amazon DSP",
          "Shopify development",
          "Shopify Hydrogen",
          "MERN stack development",
          "Product sourcing",
          "Manufacturer vetting",
          "Quality control inspection",
          "Freight forwarding",
          "Trademark registration",
          "Patent registration",
          "Product photography",
          "A+ Content design",
          "Listing optimization",
          "Brand store design",
        ],
        sameAs: [
          site.socials.linkedin,
          site.socials.instagram,
          site.socials.twitter,
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: site.contact.phone,
            contactType: "customer service",
            email: site.contact.email,
            availableLanguage: ["English", "Urdu"],
            areaServed: "Worldwide",
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday", "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/#localbusiness`,
        name: site.fullName,
        image: `${site.url}/logo_1.png`,
        logo: `${site.url}/logo_1.png`,
        url: site.url,
        telephone: site.contact.phone,
        email: site.contact.email,
        description: site.description,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Citi Housing Society",
          addressLocality: "Jhelum",
          addressRegion: "Punjab",
          postalCode: "49600",
          addressCountry: "PK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "32.9425",
          longitude: "73.7257",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
        parentOrganization: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.fullName,
        description: site.description,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${site.url}/insights?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full bg-canvas text-ink selection:bg-ink selection:text-canvas">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <WhatsAppWidget />
      </body>
    </html>
  );
}
