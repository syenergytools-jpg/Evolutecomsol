import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { IpAccelerator } from "@/components/sections/ip-accelerator";
import { WhyUs } from "@/components/sections/why-us";
import { SpotlightStats } from "@/components/sections/spotlight-stats";
import { CaseStudies } from "@/components/sections/case-studies";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

/**
 * Evolut homepage — tells the full story the site needs to cover:
 *   • Hero           — value prop / who we are
 *   • Services       — all 8 service lines (detailed offerings → detail pages)
 *   • IpAccelerator  — Amazon IP Accelerator program (→ /ip-accelerator)
 *   • WhyUs          — core offerings, benefits & expertise
 *   • SpotlightStats — real Seller Central stat screenshots (credentials)
 *   • CaseStudies    — success stories, brand by brand
 *   • Testimonials   — client testimonials + social proof
 *   • FAQ            — objection handling
 *   • CTA            — convert
 *
 * The full section library still lives in `src/components/sections/`.
 * To restore any, re-import it and drop its tag into <main>. Available:
 *   Promise, TrustedBy, TrustedBar, BentoBrand, About, MacbookShowcase,
 *   CapabilityStack, OperatorFeed, ServicePreface, ServiceCompass,
 *   ServiceMarqueeIntro, SourcingProcess, PhotographyShowcase, CaseCompare,
 *   BrandMark, Showcase, TechStack, Connections, Freight, TrademarkPillars,
 *   Process, ShapePlayground, Philosophy, DeepStats, GlobalReach,
 *   AdvancedStats, Insights,
 *   MarqueeStrip (from "@/components/ui/aceternity/marquee-strip").
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <IpAccelerator />
        <WhyUs />
        <SpotlightStats />
        <CaseStudies />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
