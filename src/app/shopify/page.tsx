import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { shopifyContent } from "./shopify-content";
import { ShopifyFunnel } from "./shopify-funnel";

/**
 * /shopify — standalone funnel page, not linked in navItems or
 * sitemap.ts on purpose (direct-traffic only), same convention as
 * /consultation. robots:{index:false} keeps it out of search.
 *
 * Kept as a Server Component so it can export `metadata` directly —
 * see shopify-funnel.tsx for why the tree renders through a Client
 * Component that imports its own content.
 */
export const metadata: Metadata = {
  title: shopifyContent.seo.title,
  description: shopifyContent.seo.description,
  robots: { index: false, follow: false },
  alternates: { canonical: "/shopify" },
  openGraph: {
    title: `${shopifyContent.seo.title} | Evolut Ecommerce Solutions`,
    description: shopifyContent.seo.description,
    url: `${site.url}/shopify`,
    type: "website",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "Evolut Ecommerce Solutions", type: "image/jpeg" },
    ],
  },
};

export default function ShopifyPage() {
  return <ShopifyFunnel />;
}
