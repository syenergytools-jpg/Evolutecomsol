import type { Metadata } from "next";
import { site } from "@/lib/site-config";
import { amazonContent } from "./amazon-content";
import { AmazonFunnel } from "./amazon-funnel";

/**
 * /amazon — standalone funnel page, not linked in navItems or
 * sitemap.ts on purpose (direct-traffic only), same convention as
 * /consultation. robots:{index:false} keeps it out of search.
 *
 * Kept as a Server Component (no "use client") specifically so it can
 * export `metadata` directly — the actual tree renders via
 * <AmazonFunnel/>, a Client Component that imports its own content
 * (see amazon-funnel.tsx for why `content` can't be passed as a prop
 * across this boundary).
 */
export const metadata: Metadata = {
  title: amazonContent.seo.title,
  description: amazonContent.seo.description,
  robots: { index: false, follow: false },
  alternates: { canonical: "/amazon" },
  openGraph: {
    title: `${amazonContent.seo.title} | Evolut Ecommerce Solutions`,
    description: amazonContent.seo.description,
    url: `${site.url}/amazon`,
    type: "website",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "Evolut Ecommerce Solutions", type: "image/jpeg" },
    ],
  },
};

export default function AmazonPage() {
  return <AmazonFunnel />;
}
