import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

/**
 * Evolut homepage — trimmed to the 5 essential sections that tell the
 * whole story in short:
 *   • Hero          — value prop / who we are
 *   • Services      — sticky-card deck of all 8 service lines
 *   • Testimonials  — social proof
 *   • FAQ           — objection handling
 *   • CTA           — convert
 *
 * The full section library still lives in `src/components/sections/`.
 * To restore any, re-import it and drop its tag into <main>. Available:
 *   Promise, TrustedBy, TrustedBar, BentoBrand, About, MacbookShowcase,
 *   CapabilityStack, WhyUs, OperatorFeed, ServicePreface, ServiceCompass,
 *   ServiceMarqueeIntro, SourcingProcess, PhotographyShowcase, CaseCompare,
 *   BrandMark, Showcase, TechStack, Connections, Freight, TrademarkPillars,
 *   Process, ShapePlayground, Philosophy, DeepStats, GlobalReach,
 *   SpotlightStats, AdvancedStats, Insights,
 *   MarqueeStrip (from "@/components/ui/aceternity/marquee-strip").
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
