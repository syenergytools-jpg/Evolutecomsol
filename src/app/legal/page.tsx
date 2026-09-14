import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { legalContent } from "./legal-content";
import { LegalFunnel } from "./legal-funnel";

/**
 * /legal — standalone funnel page, not linked in navItems or
 * sitemap.ts on purpose (direct-traffic only), same convention as
 * /consultation. robots:{index:false} keeps it out of search.
 *
 * Kept as a Server Component so it can export `metadata` directly —
 * see legal-funnel.tsx for why the tree renders through a Client
 * Component that imports its own content.
 */
export const metadata: Metadata = {
  title: legalContent.seo.title,
  description: legalContent.seo.description,
  robots: { index: false, follow: false },
  alternates: { canonical: "/legal" },
  openGraph: {
    title: `${legalContent.seo.title} | Evolut Ecommerce Solutions`,
    description: legalContent.seo.description,
    url: `${site.url}/legal`,
    type: "website",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "Evolut Ecommerce Solutions", type: "image/jpeg" },
    ],
  },
};

export default function LegalPage() {
  return <LegalFunnel />;
}
