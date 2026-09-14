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
import { legalContent } from "./legal-content";

const DISCLAIMER =
  "Evolut Ecommerce Solutions is not a law firm and does not provide legal representation. Trademark filings are handled by independent, licensed IP attorneys we match you with at pre-negotiated rates. We are not affiliated with, endorsed by, or sponsored by Amazon.com, Inc. Amazon, Brand Registry, and IP Accelerator are programs and trademarks of Amazon.com, Inc. Registration timelines vary by jurisdiction and are not guaranteed.";

/**
 * LegalFunnel — Client Component with no props from page.tsx; see
 * amazon-funnel.tsx for why `legalContent` (which embeds Lucide icon
 * components via `ipAccelerator.benefits`) has to be imported here
 * directly rather than passed down from the Server Component.
 */
export function LegalFunnel() {
  return (
    <FunnelFontScope>
      <FunnelBookingModalProvider content={legalContent}>
        <FunnelUrgencyBar message={legalContent.urgency.message} />
        <main>
          <FunnelHero content={legalContent} />
          <FunnelTrustMarquee content={legalContent} />
          <FunnelStatsBar content={legalContent} />
          <FunnelExplainer content={legalContent} />
          <FunnelFeatureGrid content={legalContent} />
          <FunnelQualify content={legalContent} />
          <FunnelTestimonials content={legalContent} />
          <FunnelTeam content={legalContent} />
          <FunnelFaq content={legalContent} />
          <FunnelProjects content={legalContent} />
          <FunnelCommitment content={legalContent} />
          <FunnelFinalCta content={legalContent} />
        </main>
        <FunnelFooter disclaimer={DISCLAIMER} />
      </FunnelBookingModalProvider>
    </FunnelFontScope>
  );
}
