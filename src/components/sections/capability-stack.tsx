"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, Hammer, TrendingUp, ShieldCheck, ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";

type Capability = {
  n: string;
  kicker: string;
  title: string;
  body: string;
  bullets: string[];
  Icon: LucideIcon;
  bg: string;
  fg: string;
  accentText: string;
  bullet: string;
  ctaLabel: string;
  ctaHref: string;
  imageAlt: string;
  imagePrompt: string;
  imageSrc?: string;
  imageVariant: "light" | "dark" | "accent" | "obsidian" | "copper" | "lime";
};

const CAPABILITIES: Capability[] = [
  {
    n: "01",
    kicker: "Source",
    title: "Find the SKU before competitors do.",
    body:
      "Trend mining, manufacturer vetting, sample QC, and FBA prep — your sourcing arm without the supplier dance.",
    bullets: [
      "Verified factories across CN, VN, IN, PK",
      "Sampling in 7–14 days",
      "Pre-shipment QC with photo reporting",
      "MOQ + price negotiation",
    ],
    Icon: Search,
    bg: "bg-electric",
    fg: "text-canvas",
    accentText: "text-canvas/70",
    bullet: "bg-canvas/80",
    ctaLabel: "Sourcing service",
    ctaHref: "/services/sourcing",
    imageAlt: "Manufacturing line photography — quality inspection",
    imagePrompt:
      "Editorial photo of a quality inspector examining a product on a clean factory line, soft daylight from large windows, shallow depth of field, hands and gloves in focus, cinematic color grade, premium ecommerce supply-chain mood, no logos, 4:3 ratio, ultra sharp.",
    imageSrc: "/images/capability-source.jpg",
    imageVariant: "dark",
  },
  {
    n: "02",
    kicker: "Build",
    title: "Listings, A+ content, and photography that converts.",
    body:
      "Catalog architecture, magazine-grade A+ Premium, studio photography, and storefronts engineered around the algorithm and the shopper.",
    bullets: [
      "SEO-clean titles, bullets, descriptions",
      "A+ Premium + multi-page Brand Stores",
      "Studio + lifestyle photography",
      "Shopify / Hydrogen / MERN custom builds",
    ],
    Icon: Hammer,
    bg: "bg-canvas",
    fg: "text-ink",
    accentText: "text-ink-soft",
    bullet: "bg-ink/60",
    ctaLabel: "Build services",
    ctaHref: "/services/shopify",
    imageAlt: "Studio product shot on clean backdrop",
    imagePrompt:
      "Studio product photography of a premium amber glass cosmetic bottle on a seamless soft cream backdrop, single softbox key light from the upper right, gentle long shadow, beauty editorial style, magazine quality, no labels, no text, 4:3 ratio, hyper crisp focus.",
    imageSrc: "/images/capability-build.jpg",
    imageVariant: "accent",
  },
  {
    n: "03",
    kicker: "Scale",
    title: "PPC, DSP, freight, and brand registry under one roof.",
    body:
      "Campaign architecture with manual + smart-auto tiers, demand-side retargeting for 7-fig+ brands, and door-to-FBA freight on the same dashboard.",
    bullets: [
      "Sponsored Products / Brands / Display",
      "DSP audience expansion + retargeting",
      "Air / sea / road freight, customs handled",
      "Inventory + cash-flow forecasting",
    ],
    Icon: TrendingUp,
    bg: "bg-copper",
    fg: "text-canvas",
    accentText: "text-canvas/80",
    bullet: "bg-canvas/80",
    ctaLabel: "Scale services",
    ctaHref: "/services/ppc",
    imageAlt: "Performance dashboard with rising charts",
    imagePrompt:
      "Sleek dashboard UI mockup screenshot showing rising performance charts in copper and electric blue accents, dark obsidian background, Apple-style minimal interface, monospace numbers, clean grid, depth of field bokeh on edges, isometric 3/4 angle, 4:3 ratio, premium SaaS aesthetic, no real brand names.",
    imageSrc: "/images/capability-scale.jpg",
    imageVariant: "dark",
  },
  {
    n: "04",
    kicker: "Defend",
    title: "Trademark, patent, and brand registry — locked.",
    body:
      "IP protection that pays for itself the first time someone tries to hijack your listing. Search, file, defend — local + international counsel.",
    bullets: [
      "Patent search + risk analysis",
      "Trademark availability + filing",
      "Amazon Brand Registry enrollment",
      "Office actions handled by counsel",
    ],
    Icon: ShieldCheck,
    bg: "bg-obsidian",
    fg: "text-canvas",
    accentText: "text-canvas/70",
    bullet: "bg-electric",
    ctaLabel: "Trademark service",
    ctaHref: "/services/trademark",
    imageAlt: "Brand identity system — wordmark + protection seal",
    imagePrompt:
      "Editorial flat-lay of a brand identity guideline book opened to a page showing logo marks, color swatches in copper and electric blue, and a wax seal stamp, photographed on a charcoal grey desk surface, single overhead soft daylight, hyperreal detail, magazine quality, 4:3 ratio, no readable text.",
    imageSrc: "/images/capability-defend.jpg",
    imageVariant: "obsidian",
  },
];

export function CapabilityStack() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative bg-canvas"
    >
      {/* Header */}
      <div className="container-x pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6">Capabilities · the four moves</p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.75rem)] text-ink leading-[1.02]">
              <StaggerWords text="Source," />{" "}
              <StaggerWords text="build," delayStart={0.12} wordClassName="italic font-normal text-ink-soft" />{" "}
              <StaggerWords text="scale," delayStart={0.24} />{" "}
              <StaggerWords text="defend." delayStart={0.36} wordClassName="italic font-normal text-copper" />
            </h2>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-mute leading-[1.6]">
                Four cards. Four moves. Watch how each one stacks on the
                last — same way our work compounds inside your catalog.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Sticky stack */}
      <div className="container-x pb-32">
        {CAPABILITIES.map((cap, i) => (
          <CapabilityCard key={cap.n} cap={cap} index={i} total={CAPABILITIES.length} />
        ))}
      </div>
    </section>
  );
}

function CapabilityCard({ cap, index, total }: { cap: Capability; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 30%", "end start"],
  });

  // As the next card scrolls over this one, scale + dim it slightly
  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.55]);

  // Each subsequent card pins lower so they "stack" visually
  const topOffset = `calc(5rem + ${index * 1.5}rem)`;

  const Icon = cap.Icon;

  return (
    <div
      ref={ref}
      className="sticky mb-6"
      style={{ top: topOffset }}
    >
      <motion.article
        style={{ scale, opacity }}
        className={cn(
          "rounded-[2rem] md:rounded-[2.5rem] overflow-hidden p-7 md:p-12 lg:p-16 shadow-[0_40px_100px_-30px_rgba(15,17,21,0.18)]",
          cap.bg,
          cap.fg
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch min-h-[28rem]">
          {/* LEFT — content */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className={cn("h-10 w-10 rounded-xl border border-current/20 flex items-center justify-center", cap.fg)}>
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <span className={cn("font-mono text-[0.7rem] uppercase tracking-[0.18em]", cap.accentText)}>
                  {cap.kicker}
                </span>
              </div>
              <span className={cn("font-mono text-[0.85rem]", cap.accentText)}>
                {cap.n} / {String(total).padStart(2, "0")}
              </span>
            </div>

            <h3 className="display text-[clamp(1.85rem,3.6vw,3.4rem)] leading-[1.06] mb-6">
              {cap.title}
            </h3>
            <p className={cn("text-base md:text-lg leading-[1.6] max-w-2xl mb-8", cap.accentText)}>
              {cap.body}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8 max-w-xl">
              {cap.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[0.95rem]">
                  <span className={cn("mt-2 h-1 w-1 rounded-full shrink-0", cap.bullet)} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <Link
              href={cap.ctaHref}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.9rem] font-medium self-start mt-auto transition-colors",
                "border-current/25 hover:border-current/60"
              )}
            >
              {cap.ctaLabel}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>

          {/* RIGHT — image placeholder */}
          <div className="lg:col-span-5 flex">
            <ImagePlaceholder
              src={cap.imageSrc}
              alt={cap.imageAlt}
              prompt={cap.imagePrompt}
              aspectRatio="4/5"
              variant={cap.imageVariant}
              className="w-full"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}
