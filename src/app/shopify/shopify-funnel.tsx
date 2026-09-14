"use client";

import { FunnelFontScope } from "@/components/funnel/funnel-font-scope";
import { FunnelBookingModalProvider } from "@/components/funnel/funnel-booking-modal";
import { FunnelUrgencyBar } from "@/components/funnel/funnel-urgency-bar";
import { FunnelHero } from "@/components/funnel/funnel-hero";
import { FunnelTrustMarquee } from "@/components/funnel/funnel-trust-marquee";
import { FunnelStatsBar } from "@/components/funnel/funnel-stats-bar";
import { FunnelExplainer } from "@/components/funnel/funnel-explainer";
import { FunnelFeatureGrid } from "@/components/funnel/funnel-feature-grid";
import { FunnelQualify } from "@/components/funnel/funnel-qualify";
import { FunnelTestimonials } from "@/components/funnel/funnel-testimonials";
import { FunnelTeam } from "@/components/funnel/funnel-team";
import { FunnelFaq } from "@/components/funnel/funnel-faq";
import { FunnelProjects } from "@/components/funnel/funnel-projects";
import { FunnelCommitment } from "@/components/funnel/funnel-commitment";
import { FunnelFinalCta } from "@/components/funnel/funnel-final-cta";
import { FunnelFooter } from "@/components/funnel/funnel-footer";
import { shopifyContent } from "./shopify-content";

const DISCLAIMER =
  "Evolut Ecommerce Solutions is an independent Shopify development partner. We are not affiliated with, endorsed by, or sponsored by Shopify Inc. Shopify and Hydrogen are trademarks of Shopify Inc. Timelines and costs vary by project scope, nothing on this page is a fixed quote until confirmed in writing.";

/**
 * ShopifyFunnel — Client Component with no props from page.tsx; see
 * amazon-funnel.tsx for why `shopifyContent` (which embeds Lucide icon
 * components) has to be imported here directly rather than passed down
 * from the Server Component.
 */
export function ShopifyFunnel() {
  return (
    <FunnelFontScope>
      <FunnelBookingModalProvider content={shopifyContent}>
        <FunnelUrgencyBar message={shopifyContent.urgency.message} />
        <main>
          <FunnelHero content={shopifyContent} />
          <FunnelTrustMarquee content={shopifyContent} />
          <FunnelStatsBar content={shopifyContent} />
          <FunnelExplainer content={shopifyContent} />
          <FunnelFeatureGrid content={shopifyContent} />
          <FunnelQualify content={shopifyContent} />
          <FunnelTestimonials content={shopifyContent} />
          <FunnelTeam content={shopifyContent} />
          <FunnelFaq content={shopifyContent} />
          <FunnelProjects content={shopifyContent} />
          <FunnelCommitment content={shopifyContent} />
          <FunnelFinalCta content={shopifyContent} />
        </main>
        <FunnelFooter disclaimer={DISCLAIMER} />
      </FunnelBookingModalProvider>
    </FunnelFontScope>
  );
}
