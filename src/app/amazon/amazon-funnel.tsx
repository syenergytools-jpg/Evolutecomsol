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
import { amazonContent } from "./amazon-content";

const DISCLAIMER =
  "Evolut Ecommerce Solutions is an independent Amazon account management service. We are not affiliated with, endorsed by, or sponsored by Amazon.com, Inc. or its affiliates. Amazon, Seller Central, Vendor Central, and FBA are trademarks of Amazon.com, Inc. Results vary by product, category, and budget, nothing on this page is a guarantee of income, sales, or ranking.";

/**
 * AmazonFunnel — the actual page tree, as a Client Component with no
 * props from its Server Component parent (page.tsx). Required because
 * `amazonContent` embeds Lucide icon components in `features.items[].icon`
 * — React can serialize plain data across a Server→Client prop boundary,
 * but not function/class references, so `amazonContent` must be
 * imported directly inside client code, not passed down as a prop.
 * (page.tsx still needs to stay a Server Component so it can export
 * `metadata` directly, same reasoning as /consultation/page.tsx.)
 */
export function AmazonFunnel() {
  return (
    <FunnelFontScope>
      <FunnelBookingModalProvider content={amazonContent}>
        <FunnelUrgencyBar message={amazonContent.urgency.message} accent={amazonContent.accent} />
        <main>
          <FunnelHero content={amazonContent} />
          <FunnelTrustMarquee content={amazonContent} />
          <FunnelStatsBar content={amazonContent} />
          <FunnelExplainer content={amazonContent} />
          <FunnelFeatureGrid content={amazonContent} />
          <FunnelQualify content={amazonContent} />
          <FunnelTestimonials content={amazonContent} />
          <FunnelTeam content={amazonContent} />
          <FunnelFaq content={amazonContent} />
          <FunnelProjects content={amazonContent} />
          <FunnelCommitment content={amazonContent} />
          <FunnelFinalCta content={amazonContent} />
        </main>
        <FunnelFooter disclaimer={DISCLAIMER} />
      </FunnelBookingModalProvider>
    </FunnelFontScope>
  );
}
