import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
// import { Promise } from "@/components/sections/promise";
// import { TrustedBy } from "@/components/sections/trusted-by";
// import { About } from "@/components/sections/about";
// import { WhyUs } from "@/components/sections/why-us";
import { Services } from "@/components/sections/services";
// import { SourcingProcess } from "@/components/sections/sourcing-process";
// import { PhotographyShowcase } from "@/components/sections/photography-showcase";
// import { Showcase } from "@/components/sections/showcase";
// import { TechStack } from "@/components/sections/tech-stack";
// import { Freight } from "@/components/sections/freight";
// import { TrademarkPillars } from "@/components/sections/trademark-pillars";
// import { Process } from "@/components/sections/process";
// import { Philosophy } from "@/components/sections/philosophy";
// import { DeepStats } from "@/components/sections/deep-stats";
import { Testimonials } from "@/components/sections/testimonials";
// import { Insights } from "@/components/sections/insights";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

// NEW reference-driven sections
// import { CapabilityStack } from "@/components/sections/capability-stack";
// import { ShapePlayground } from "@/components/sections/shape-playground";
// import { Connections } from "@/components/sections/connections";
// import { SpotlightStats } from "@/components/sections/spotlight-stats";
// import { AdvancedStats } from "@/components/sections/advanced-stats";
// import { BentoBrand } from "@/components/sections/bento-brand";
// import { OperatorFeed } from "@/components/sections/operator-feed";
// import { MarqueeStrip } from "@/components/ui/aceternity/marquee-strip";
// import { ServicePreface } from "@/components/sections/service-preface";
// import { ServiceCompass } from "@/components/sections/service-compass";
// import { ServiceMarqueeIntro } from "@/components/sections/service-marquee-intro";
// import { BrandMark } from "@/components/sections/brand-mark";
// import { MacbookShowcase } from "@/components/sections/macbook-showcase";
// import { CaseCompare } from "@/components/sections/case-compare";
// import { TrustedBar } from "@/components/sections/trusted-bar";
// import { GlobalReach } from "@/components/sections/global-reach";

/**
 * Evolut homepage.
 *
 * Trimmed to the 5 essential sections that cover the whole story in short:
 *   • Hero          — value prop / who we are
 *   • Services      — sticky-card deck of all 8 service lines (the full offering)
 *   • Testimonials  — social proof
 *   • FAQ           — objection handling
 *   • CTA           — convert
 *
 * Everything else is commented out below (easy to restore).
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 01 — Cinematic dark hero w/ chrome 3D scene + live ticker */}
        <Hero />

        {/* 01b — Trusted-by strip (BJK + 3 case-study brands) */}
        {/* <TrustedBar /> */}

        {/* 01c — BentoBrand: 9-card brand snapshot directly under hero */}
        {/* <BentoBrand /> */}

        {/* 02 — Brand promise (scroll-lit) */}
        {/* <Promise /> */}

        {/* 03 — Big rotating divider (Flow Party style) */}
        {/* <MarqueeStrip
          items={[
            "Sourcing",
            "Listings",
            "Photography",
            "Ads",
            "Freight",
            "Trademark",
            "Branding",
            "Storefronts",
          ]}
          variant="lime"
          size="lg"
          duration={36}
        /> */}

        {/* 04 — Trusted by (logo marquee) */}
        {/* <TrustedBy /> */}

        {/* 05 — About (operators, not executors) */}
        {/* <About /> */}

        {/* 06 — MacBook showcase: Scene.mp4 playing inside the lid */}
        {/* <MacbookShowcase /> */}

        {/* 07 — Capability stack (Source · Build · Scale · Defend) — STICKY CARDS */}
        {/* <CapabilityStack /> */}

        {/* 08 — Why us (6-reason grid) */}
        {/* <WhyUs /> */}

        {/* 08.5 — Operator feed: live-cycling activity stream */}
        {/* <OperatorFeed /> */}

        {/* 09a — Service preface: oversized intro w/ chrome blobs */}
        {/* <ServicePreface /> */}

        {/* 09b — Service compass: orbit diagram of 8 nodes */}
        {/* <ServiceCompass /> */}

        {/* 09c — Service marquee intro: kinetic obsidian preview */}
        {/* <ServiceMarqueeIntro /> */}

        {/* 09 — Services (sticky-card deck — replaces 8-card grid) */}
        <Services />

        {/* 10 — Sourcing process timeline */}
        {/* <SourcingProcess /> */}

        {/* 11 — Photography showcase masonry */}
        {/* <PhotographyShowcase /> */}

        {/* 12.3 — Case compare: drag-to-reveal before/after */}
        {/* <CaseCompare /> */}

        {/* 12.5 — BrandMark: manifesto on giant ghost-logo background */}
        {/* <BrandMark /> */}

        {/* 13 — Showcase highlight (copper block) */}
        {/* <Showcase /> */}

        {/* 14 — Tech stack (obsidian pills) */}
        {/* <TechStack /> */}

        {/* 14.5 — Connections: animated beams Evolut → platforms */}
        {/* <Connections /> */}

        {/* 15 — Freight forwarding */}
        {/* <Freight /> */}

        {/* 16 — Trademark pillars */}
        {/* <TrademarkPillars /> */}

        {/* 17 — Pinned horizontal process */}
        {/* <Process /> */}

        {/* 18 — Manifesto: 2D shape playground */}
        {/* <ShapePlayground /> */}

        {/* 19 — Philosophy (4 principles, obsidian) */}
        {/* <Philosophy /> */}

        {/* 20 — Deep stats */}
        {/* <DeepStats /> */}

        {/* 21 — Big rotating divider */}
        {/* <MarqueeStrip
          items={[
            "Compounding since 2018",
            "240+ brands",
            "$150M+ GMV",
            "4 continents",
            "24/7 ops",
          ]}
          variant="obsidian"
          size="md"
          duration={42}
          separator="·"
        /> */}

        {/* 23.5 — Global reach: world-map of brands across continents */}
        {/* <GlobalReach /> */}

        {/* 23.6 — Spotlight bento: real Amazon Seller-Central charts */}
        {/* <SpotlightStats /> */}

        {/* 23.7 — AdvancedStats: operator dashboard with mini-charts */}
        {/* <AdvancedStats /> */}

        {/* 24 — Testimonials */}
        <Testimonials />

        {/* 25 — Insights */}
        {/* <Insights /> */}

        {/* 26 — FAQ */}
        <FAQ />

        {/* 27 — CTA */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
