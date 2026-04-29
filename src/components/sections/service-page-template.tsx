"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Check,
  Minus,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SplitHeading } from "@/components/ui/split-heading";
import { CountUp } from "@/components/ui/count-up";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { parseMetric } from "@/lib/parse-metric";
import { servicePages, type ServicePageData } from "@/lib/service-pages";
// (servicePages is imported here so the rich data — including
// LucideIcon function refs — never crosses the server→client boundary)
import { services } from "@/lib/site-config";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------- *
 * tone helpers — same accent semantics as case studies + process
 * ---------------------------------------------------------------- */
const tone: Record<
  ServicePageData["tone"],
  { bg: string; fg: string; accent: string; cssAccent: string }
> = {
  electric: {
    bg: "bg-electric",
    fg: "text-canvas",
    accent: "text-electric",
    cssAccent: "rgba(0,102,255,0.18)",
  },
  copper: {
    bg: "bg-copper",
    fg: "text-canvas",
    accent: "text-copper",
    cssAccent: "rgba(232,112,74,0.20)",
  },
  obsidian: {
    bg: "bg-obsidian",
    fg: "text-canvas",
    accent: "text-copper-soft",
    cssAccent: "rgba(15,17,21,0.30)",
  },
  lime: {
    bg: "bg-lime",
    fg: "text-ink",
    accent: "text-ink",
    cssAccent: "rgba(217,255,60,0.25)",
  },
  emerald: {
    bg: "bg-emerald",
    fg: "text-canvas",
    accent: "text-emerald",
    cssAccent: "rgba(16,185,129,0.22)",
  },
};

/* ============================================================== *
 * MAIN TEMPLATE
 * ============================================================== */

/**
 * Client component — receives only the slug (a serializable string)
 * and resolves the rich `ServicePageData` (which contains LucideIcon
 * function refs) on the client, avoiding the "Functions cannot be
 * passed directly to Client Components" RSC serialization error.
 */
export function ServicePageTemplate({ slug }: { slug: string }) {
  const data = servicePages[slug];
  if (!data) return null;
  const t = tone[data.tone];

  return (
    <main className="bg-canvas">
      {/* 01 · HERO */}
      <Section01Hero data={data} t={t} />

      {/* 02 · STATS BAR */}
      <Section02Stats data={data} />

      {/* 03 · PROBLEM */}
      <Section03Problem data={data} />

      {/* 04 · APPROACH */}
      <Section04Approach data={data} />

      {/* 04b · VISUAL STORY (optional — shown only when data.visualStory is set) */}
      {data.visualStory && <SectionVisualStory data={data} />}

      {/* 05 · INCLUDES */}
      <Section05Includes data={data} />

      {/* 06 · PROCESS */}
      <Section06Process data={data} />

      {/* 07 · TOOLS */}
      <Section07Tools data={data} t={t} />

      {/* 08 · DELIVERABLE */}
      <Section08Deliverable data={data} t={t} />

      {/* 08b · GALLERY (optional — shown only when data.gallery is set) */}
      {data.gallery && <SectionGallery data={data} />}

      {/* 09 · BIG STAT */}
      <Section09BigStat data={data} />

      {/* 10 · MINI CASE */}
      <Section10MiniCase data={data} />

      {/* 11 · ENGAGEMENT */}
      <Section11Engagement data={data} />

      {/* 12 · FAQ */}
      <Section12FAQ data={data} />

      {/* 13 · TESTIMONIAL */}
      <Section13Quote data={data} />

      {/* 14 · COMPARISON */}
      <Section14Comparison data={data} />

      {/* 15 · GUARANTEES */}
      <Section15Guarantees data={data} />

      {/* 16 · ONBOARDING */}
      <Section16Onboarding data={data} />

      {/* 17 · OUTPUT */}
      <Section17Output data={data} />

      {/* 18 · RELATED */}
      <Section18Related data={data} />

      {/* 19 · OPERATOR */}
      <Section19Operator data={data} t={t} />

      {/* 20 · CLOSE CTA */}
      <Section20Close data={data} />
    </main>
  );
}

/* ============================================================== *
 * Section primitives
 * ============================================================== */

function SectionWrapper({
  children,
  className,
  dark = false,
  number,
  eyebrow,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  number?: string;
  eyebrow?: string;
}) {
  return (
    <section
      className={cn(
        "relative py-20 md:py-28 border-b border-hairline",
        dark ? "bg-obsidian text-canvas" : "bg-canvas text-ink",
        className
      )}
    >
      <div className="container-x">
        {(number || eyebrow) && (
          <Reveal>
            <div
              className={cn(
                "flex items-center gap-4 mb-8",
                dark ? "text-canvas/55" : "text-mute"
              )}
            >
              {number && (
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">
                  {number}
                </span>
              )}
              <span
                className={cn(
                  "h-px flex-1 max-w-[3rem]",
                  dark ? "bg-canvas/20" : "bg-hairline-strong"
                )}
              />
              {eyebrow && (
                <span
                  className={cn(
                    "font-mono text-[0.65rem] uppercase tracking-[0.22em]",
                    dark ? "text-copper-soft" : "text-copper"
                  )}
                >
                  {eyebrow}
                </span>
              )}
            </div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/* ============================================================== *
 * 01 · HERO
 * ============================================================== */
function Section01Hero({
  data,
  t,
}: {
  data: ServicePageData;
  t: (typeof tone)[ServicePageData["tone"]];
}) {
  return (
    <section className="relative bg-canvas pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden border-b border-hairline">
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-grid opacity-30 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            `radial-gradient(60% 50% at 100% 0%, ${t.cssAccent} 0%, transparent 60%), ` +
            `radial-gradient(50% 45% at 0% 100%, rgba(0,102,255,0.06) 0%, transparent 60%)`,
        }}
      />

      <div className="container-x relative">
        <Reveal>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mute hover:text-ink transition-colors mb-10"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            All services
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6">{data.hero.chapter}</p>
            </Reveal>
            <SplitHeading
              as="h1"
              className="display text-[clamp(2.5rem,6vw,5.5rem)] text-ink leading-[1.0] tracking-[-0.025em] mb-7"
            >
              {data.hero.title}{" "}
              <span className="italic font-normal text-copper">
                {data.hero.italicTail}
              </span>
            </SplitHeading>

            <Reveal delay={0.4}>
              <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-xl mb-10">
                {data.hero.body}
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={data.hero.primaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-5 py-2.5 text-[0.95rem] font-medium hover:bg-ink-soft transition-all hover:-translate-y-0.5"
                >
                  {data.hero.primaryCta.label}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </Link>
                <Link
                  href={data.hero.secondaryCta.href}
                  className="inline-flex items-center gap-1.5 px-1 py-2 text-[0.95rem] font-medium text-ink relative"
                >
                  {data.hero.secondaryCta.label}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </div>
            </Reveal>
          </div>

          {data.hero.image && (() => {
            // Vector illustrations live in /services/ — show them
            // contained on a tinted backdrop so the artwork isn't
            // cropped. Anything else is a photo, so cover it.
            const isIllustration = data.hero.image?.startsWith("/services/");
            return (
              <Reveal delay={0.3} className="lg:col-span-5 w-full">
                <div
                  className={cn(
                    "relative w-full aspect-[4/5] rounded-[1.75rem] overflow-hidden border border-hairline-strong shadow-[0_50px_120px_-40px_rgba(15,17,21,0.25)]",
                    isIllustration ? "bg-canvas" : "bg-canvas-2"
                  )}
                >
                  <Image
                    src={data.hero.image}
                    alt={data.slug + " hero visual"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className={
                      isIllustration ? "object-contain p-8 md:p-10" : "object-cover"
                    }
                    priority
                  />
                </div>
              </Reveal>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

/* ============================================================== *
 * 02 · STATS BAR — animated CountUp
 * ============================================================== */
function Section02Stats({ data }: { data: ServicePageData }) {
  return (
    <section className="bg-canvas-2/60 border-y border-hairline py-12 md:py-16">
      <div className="container-x">
        <p className="eyebrow eyebrow-line mb-7">At a glance</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8">
          {data.stats.map((s) => {
            const m = parseMetric(s.value);
            return (
              <div key={s.label}>
                <p className="display text-[clamp(1.85rem,3.6vw,2.75rem)] leading-none text-ink mb-2 tabular-nums">
                  {m.animatable ? (
                    <CountUp
                      value={m.value}
                      prefix={m.prefix}
                      suffix={m.suffix}
                      decimals={m.decimals}
                    />
                  ) : (
                    s.value
                  )}
                </p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute leading-snug">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================== *
 * 03 · PROBLEM
 * ============================================================== */
function Section03Problem({ data }: { data: ServicePageData }) {
  return (
    <SectionWrapper number="03" eyebrow={data.problem.eyebrow}>
      <SplitHeading
        as="h2"
        className="display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.04] text-ink mb-8 max-w-3xl"
      >
        {data.problem.title}
      </SplitHeading>
      <Reveal delay={0.2}>
        <p className="text-lg md:text-xl text-ink-soft leading-[1.65] max-w-2xl">
          {data.problem.body}
        </p>
      </Reveal>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 04 · APPROACH
 * ============================================================== */
function Section04Approach({ data }: { data: ServicePageData }) {
  return (
    <SectionWrapper number="04" eyebrow="Approach">
      <SplitHeading
        as="h2"
        className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-ink mb-12 max-w-2xl"
      >
        Four moves, in order.
      </SplitHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.approach.map((a, i) => (
          <motion.div
            key={a.number}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: PREMIUM_EASE,
            }}
            className="rounded-[1.5rem] border border-hairline-strong bg-surface p-6 md:p-7 hover:shadow-[0_30px_70px_-30px_rgba(15,17,21,0.18)] transition-shadow"
          >
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-copper mb-4">
              {a.number}
            </p>
            <h3 className="display text-[1.4rem] leading-[1.1] text-ink mb-3">
              {a.title}
            </h3>
            <p className="text-[0.92rem] text-ink-soft leading-[1.6]">
              {a.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 05 · INCLUDES
 * ============================================================== */
function Section05Includes({ data }: { data: ServicePageData }) {
  const ref = useRef<HTMLDivElement>(null);

  // GSAP scroll-triggered cascade for the feature cards
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".include-card");
      if (!cards.length) return;
      gsap.set(cards, { opacity: 0, y: 24 });
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <SectionWrapper number="05" eyebrow="What's included">
      <div ref={ref}>
        <SplitHeading
          as="h2"
          className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-ink mb-12 max-w-2xl"
        >
          Every lever, in one engagement.
        </SplitHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline rounded-3xl overflow-hidden border border-hairline">
          {data.includes.map((m) => (
            <div
              key={m.title}
              className="include-card bg-canvas p-6 md:p-7 hover:bg-surface transition-colors duration-500"
            >
              <Check className="h-4 w-4 text-copper mb-4" strokeWidth={2.5} />
              <p className="text-base font-semibold text-ink mb-2 leading-snug">
                {m.title}
              </p>
              <p className="text-[0.85rem] text-ink-soft leading-[1.55]">
                {m.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 06 · PROCESS — vertical timeline
 * ============================================================== */
function Section06Process({ data }: { data: ServicePageData }) {
  return (
    <SectionWrapper number="06" eyebrow="Process" dark>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-12 md:mb-16">
        <div className="lg:col-span-7">
          <SplitHeading
            as="h2"
            className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04]"
          >
            How the cycle runs.
          </SplitHeading>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-canvas/65 leading-[1.6] max-w-md lg:ml-auto">
              Four moves, repeated every quarter. Each one stacks on the last —
              compounding is the system, not an outcome we hope for.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Card grid — 4 across on desktop, 2 on tablet, 1 on mobile.
          Replaces the cramped left-rail timeline so it scans cleanly. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {data.process.map((p, i) => (
          <motion.article
            key={p.phase}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.75,
              delay: i * 0.07,
              ease: PREMIUM_EASE,
            }}
            className="relative rounded-2xl border border-canvas/12 bg-canvas/[0.04] p-6 md:p-7 hover:bg-canvas/[0.07] transition-colors"
          >
            {/* Step badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="grid place-items-center h-8 w-8 rounded-full bg-copper text-canvas font-mono text-[0.7rem] font-semibold">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Connector dash to the next card — desktop only */}
              {i < data.process.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:block flex-1 h-px bg-gradient-to-r from-canvas/25 to-transparent"
                />
              )}
            </div>

            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-copper-soft mb-2">
              {p.phase}
            </p>
            <p className="text-[0.95rem] md:text-base leading-[1.55] text-canvas/82">
              {p.body}
            </p>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 07 · TOOLS — chip cloud
 * ============================================================== */
function Section07Tools({
  data,
  t,
}: {
  data: ServicePageData;
  t: (typeof tone)[ServicePageData["tone"]];
}) {
  return (
    <SectionWrapper number="07" eyebrow="Tools & tech">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-10 md:mb-12">
        <div className="lg:col-span-7">
          <SplitHeading
            as="h2"
            className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-ink"
          >
            What we run on.
          </SplitHeading>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-ink-soft leading-[1.6] max-w-md lg:ml-auto">
              The everyday stack — partners and platforms we&rsquo;ve put real
              money through across {data.tools.length}+ surfaces.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Logo strip — partner brands the team works with */}
      <div className="mb-10 -mx-4 sm:mx-0">
        <LogoMarquee logos={SERVICE_LOGOS} duration={50} />
      </div>

      <div className="flex flex-wrap gap-2.5">
        {data.tools.map((tool, i) => (
          <motion.span
            key={tool}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.03,
              ease: PREMIUM_EASE,
            }}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-4 py-2 text-[0.88rem] text-ink hover:border-ink transition-colors"
            )}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: t.cssAccent.replace("0.18", "0.85") }}
            />
            {tool}
          </motion.span>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* Brand logos shown across all service pages — keeps the trust signal
 * uniform without hand-curating per service. */
const SERVICE_LOGOS = [
  { src: "/logos/nextjs-icon.svg", alt: "Next.js" },
  { src: "/logos/React.svg", alt: "React" },
  { src: "/logos/hydrogen.svg", alt: "Hydrogen" },
  { src: "/logos/mongodb.svg", alt: "MongoDB" },
  { src: "/logos/node-js-svgrepo-com.svg", alt: "Node.js" },
  { src: "/logos/express-svgrepo-com.svg", alt: "Express" },
  { src: "/logos/stripe-svgrepo-com.svg", alt: "Stripe" },
  { src: "/logos/paypal-3-svgrepo-com.svg", alt: "PayPal" },
  { src: "/logos/hubspot.svg", alt: "HubSpot" },
  { src: "/logos/saleforce.svg", alt: "Salesforce" },
  { src: "/logos/mailchimp-svgrepo-com.svg", alt: "Mailchimp" },
];

/* ============================================================== *
 * 08 · DELIVERABLE
 * ============================================================== */
function Section08Deliverable({
  data,
}: {
  data: ServicePageData;
  t: (typeof tone)[ServicePageData["tone"]];
}) {
  return (
    <SectionWrapper number="08" eyebrow="The deliverable">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <SplitHeading
            as="h2"
            className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-ink mb-7"
          >
            {data.deliverable.title}
          </SplitHeading>
          <Reveal delay={0.2}>
            <p className="text-lg text-ink-soft leading-[1.65] max-w-xl">
              {data.deliverable.body}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.3} className="lg:col-span-6">
          <div className="aspect-[4/3] rounded-[1.75rem] overflow-hidden bg-gradient-to-br from-canvas-2 via-canvas to-canvas-2 border border-hairline-strong shadow-[0_30px_70px_-30px_rgba(15,17,21,0.18)] grid place-items-center">
            <div className="text-center px-8">
              <Sparkles
                className="h-8 w-8 text-copper mx-auto mb-4"
                strokeWidth={1.5}
              />
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mute mb-2">
                Sample deliverable
              </p>
              <p className="display text-[1.2rem] text-ink leading-snug">
                Visual lands here once we ship cycle one.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 08b · GALLERY (optional)
 * ============================================================== */
function SectionGallery({ data }: { data: ServicePageData }) {
  if (!data.gallery) return null;
  const g = data.gallery;
  const fit = g.fit ?? "cover";
  const aspectClass =
    g.aspect === "4/3"
      ? "aspect-[4/3]"
      : g.aspect === "1/1"
      ? "aspect-square"
      : g.aspect === "16/9"
      ? "aspect-video"
      : "aspect-[4/5]";

  return (
    <SectionWrapper number="08b" eyebrow={g.eyebrow}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 mb-10 md:mb-14">
        <div className="lg:col-span-7">
          <h2 className="display text-[clamp(1.85rem,3.5vw,2.85rem)] leading-[1.06] text-ink">
            {g.title}
          </h2>
        </div>
        <Reveal delay={0.2} className="lg:col-span-5">
          <p className="text-base md:text-lg text-ink-soft leading-[1.6] max-w-md lg:ml-auto">
            {g.body}
          </p>
        </Reveal>
      </div>
      <div
        className={cn(
          "grid gap-3 md:gap-4",
          // Documents (contain) usually need fewer-but-bigger tiles
          fit === "contain"
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-2 md:grid-cols-3"
        )}
      >
        {g.images.map((img, i) => (
          <motion.figure
            key={img.src + i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.7,
              delay: (i % 3) * 0.06,
              ease: PREMIUM_EASE,
            }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-hairline-strong",
              fit === "contain" ? "bg-canvas" : "bg-canvas-2",
              aspectClass
            )}
          >
            <Image
              src={img.src}
              alt={img.caption ?? `Sample ${i + 1}`}
              fill
              sizes={
                fit === "contain"
                  ? "(max-width: 640px) 100vw, 50vw"
                  : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 30vw"
              }
              className={cn(
                "transition-transform duration-700 group-hover:scale-[1.02]",
                fit === "contain" ? "object-contain p-3 md:p-5" : "object-cover"
              )}
            />
            {img.caption && (
              <figcaption className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-ink/70 backdrop-blur px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-canvas">
                <span className="h-1 w-1 rounded-full bg-canvas/70" />
                {img.caption}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 04b · VISUAL STORY (optional)
 * Three large illustrations narrating the service journey. Used by
 * the trademark page to walk through search → file → defend.
 * ============================================================== */
function SectionVisualStory({ data }: { data: ServicePageData }) {
  if (!data.visualStory) return null;
  const v = data.visualStory;
  return (
    <SectionWrapper number="04b" eyebrow={v.eyebrow} dark>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 mb-10 md:mb-14">
        <div className="lg:col-span-7">
          <h2 className="display text-[clamp(1.85rem,3.5vw,2.85rem)] leading-[1.06] text-canvas">
            {v.title}
          </h2>
        </div>
        <Reveal delay={0.2} className="lg:col-span-5">
          <p className="text-base md:text-lg text-canvas/70 leading-[1.6] max-w-md lg:ml-auto">
            {v.body}
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {v.steps.map((s, i) => (
          <motion.figure
            key={s.image}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.8,
              delay: i * 0.08,
              ease: PREMIUM_EASE,
            }}
            className="rounded-2xl border border-canvas/12 bg-canvas/[0.04] overflow-hidden flex flex-col"
          >
            <div className="relative aspect-[4/3] bg-ink overflow-hidden">
              <Image
                src={s.image}
                alt={s.label}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-4 md:p-6"
              />
            </div>
            <figcaption className="p-5 md:p-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-copper-soft mb-2">
                {s.label}
              </p>
              <p className="text-canvas/85 leading-[1.55] text-[0.95rem]">
                {s.caption}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 09 · BIG STAT
 * ============================================================== */
function Section09BigStat({ data }: { data: ServicePageData }) {
  const m = parseMetric(data.bigStat.value);
  return (
    <SectionWrapper dark>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-copper-soft mb-5">
              {data.bigStat.label}
            </p>
          </Reveal>
          <p className="display text-[clamp(3.5rem,9vw,8rem)] leading-[0.95] tracking-[-0.025em] text-canvas tabular-nums">
            {m.animatable ? (
              <CountUp
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                decimals={m.decimals}
                duration={1.8}
              />
            ) : (
              data.bigStat.value
            )}
          </p>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.2}>
            <p className="text-lg leading-[1.65] text-canvas/75">
              {data.bigStat.body}
            </p>
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 10 · MINI CASE
 * ============================================================== */
function Section10MiniCase({ data }: { data: ServicePageData }) {
  return (
    <SectionWrapper number="10" eyebrow="A quick proof point">
      <Link
        href={data.miniCase.href}
        className="group block rounded-[1.75rem] border border-hairline-strong bg-surface p-8 md:p-12 hover:shadow-[0_30px_70px_-30px_rgba(15,17,21,0.22)] transition-shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-copper mb-4">
              {data.miniCase.brand}
            </p>
            <p className="display text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.04] text-ink mb-4 tabular-nums">
              {data.miniCase.metric}
            </p>
            <p className="text-base text-ink-soft leading-[1.6] max-w-xl">
              {data.miniCase.body}
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink group-hover:text-copper transition-colors">
              Read the case
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </span>
          </div>
        </div>
      </Link>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 11 · ENGAGEMENT
 * ============================================================== */
function Section11Engagement({ data }: { data: ServicePageData }) {
  return (
    <SectionWrapper number="11" eyebrow="How we engage">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-12 md:mb-14">
        <div className="lg:col-span-7">
          <SplitHeading
            as="h2"
            className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-ink"
          >
            Two ways to work together.
          </SplitHeading>
        </div>
        <Reveal delay={0.2} className="lg:col-span-5">
          <p className="text-base md:text-lg text-ink-soft leading-[1.6] max-w-md lg:ml-auto">
            Every engagement is custom-scoped to your stage, channels, and
            margin profile — share a brief and we&rsquo;ll come back with a
            plan inside a week.
          </p>
        </Reveal>
      </div>

      {/* Engagement shape cards — descriptive only, no prices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-10 md:mb-12">
        {data.engagement.map((shape, i) => (
          <motion.div
            key={shape.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: PREMIUM_EASE,
            }}
            className={cn(
              "relative rounded-[1.75rem] p-7 md:p-9 border flex flex-col",
              i === 0
                ? "bg-surface border-hairline-strong"
                : "bg-obsidian text-canvas border-transparent"
            )}
          >
            <div className="flex items-center justify-between mb-5">
              <p
                className={cn(
                  "font-mono text-[0.6rem] uppercase tracking-[0.22em]",
                  i === 0 ? "text-copper" : "text-copper-soft"
                )}
              >
                {shape.name}
              </p>
              <span
                className={cn(
                  "font-mono text-[0.55rem] uppercase tracking-[0.18em] rounded-full px-2.5 py-1",
                  i === 0
                    ? "bg-canvas-2 text-mute"
                    : "bg-canvas/10 text-canvas/55"
                )}
              >
                {i === 0 ? "Start here" : "After pilot"}
              </span>
            </div>

            <p
              className={cn(
                "display text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[1.15] mb-7 max-w-sm",
                i === 0 ? "text-ink" : "text-canvas"
              )}
            >
              {shape.body}
            </p>

            <ul className="space-y-2.5 mb-8">
              {shape.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[0.9rem]">
                  <Check
                    className={cn(
                      "h-4 w-4 mt-0.5 shrink-0",
                      i === 0 ? "text-copper" : "text-copper-soft"
                    )}
                    strokeWidth={2.5}
                  />
                  <span className={i === 0 ? "text-ink-soft" : "text-canvas/80"}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Single, prominent CTA — replaces per-tier "Brief us" buttons */}
      <Reveal delay={0.3}>
        <div className="rounded-[1.75rem] border border-hairline-strong bg-canvas-2/60 backdrop-blur-sm p-7 md:p-9 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 justify-between">
          <div className="flex-1">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mute mb-2">
              Ready when you are
            </p>
            <p className="display text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15] text-ink max-w-xl">
              Tell us what you&rsquo;re building — we&rsquo;ll come back with a
              plan and the right shape inside a week.
            </p>
          </div>
          <Link
            href={`/contact?service=${data.slug}`}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink text-canvas px-6 py-3.5 text-[0.95rem] font-medium hover:bg-ink-soft transition-all hover:-translate-y-0.5 shrink-0"
          >
            Talk to us
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 12 · FAQ
 * ============================================================== */
function Section12FAQ({ data }: { data: ServicePageData }) {
  return (
    <SectionWrapper number="12" eyebrow="FAQ">
      <SplitHeading
        as="h2"
        className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-ink mb-12 max-w-2xl"
      >
        The questions we hear most.
      </SplitHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-12 max-w-5xl">
        {data.faqs.map((faq, i) => (
          <motion.div
            key={faq.q}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: PREMIUM_EASE,
            }}
          >
            <p className="text-lg font-semibold text-ink mb-2 leading-snug">
              {faq.q}
            </p>
            <p className="text-[0.95rem] text-ink-soft leading-[1.65]">
              {faq.a}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 13 · TESTIMONIAL
 * ============================================================== */
function Section13Quote({ data }: { data: ServicePageData }) {
  return (
    <SectionWrapper>
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <Sparkles
            className="h-9 w-9 text-copper mx-auto mb-7"
            strokeWidth={1.5}
          />
        </Reveal>
        <SplitHeading
          as="blockquote"
          className="display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.3] text-ink mb-8"
        >
          &ldquo;{data.quote.text}&rdquo;
        </SplitHeading>
        <Reveal delay={0.3}>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-mute">
            — {data.quote.attribution}
          </p>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 14 · COMPARISON
 * ============================================================== */
function Section14Comparison({ data }: { data: ServicePageData }) {
  return (
    <SectionWrapper number="14" eyebrow="Us vs. typical agency" dark>
      <SplitHeading
        as="h2"
        className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] mb-10 max-w-2xl"
      >
        The receipts, side by side.
      </SplitHeading>
      <div className="rounded-[1.5rem] overflow-hidden border border-canvas/12">
        <div className="grid grid-cols-12 bg-canvas/5 py-4 px-5 md:px-7">
          <p className="col-span-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-canvas/55">
            What
          </p>
          <p className="col-span-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-copper-soft">
            Evolut
          </p>
          <p className="col-span-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-canvas/55">
            Typical agency
          </p>
        </div>
        {data.comparison.map((row, i) => (
          <motion.div
            key={row.topic}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className={cn(
              "grid grid-cols-12 px-5 md:px-7 py-5 items-start",
              i % 2 === 0 ? "bg-obsidian-soft/40" : "bg-transparent",
              "border-t border-canvas/8"
            )}
          >
            <p className="col-span-4 text-[0.9rem] text-canvas font-medium pr-3">
              {row.topic}
            </p>
            <p className="col-span-4 text-[0.85rem] text-canvas/85 pr-3 flex items-start gap-2">
              <Check className="h-4 w-4 text-copper-soft mt-0.5 shrink-0" strokeWidth={2.5} />
              {row.us}
            </p>
            <p className="col-span-4 text-[0.85rem] text-canvas/55 flex items-start gap-2">
              <Minus className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={2} />
              {row.them}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 15 · GUARANTEES
 * ============================================================== */
function Section15Guarantees({ data }: { data: ServicePageData }) {
  return (
    <SectionWrapper number="15" eyebrow="Guarantees">
      <SplitHeading
        as="h2"
        className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-ink mb-10 max-w-2xl"
      >
        What we promise on day one.
      </SplitHeading>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {data.guarantees.map((g, i) => (
          <motion.li
            key={g}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.07,
              ease: PREMIUM_EASE,
            }}
            className="flex items-start gap-4 rounded-2xl border border-hairline-strong bg-surface p-6"
          >
            <span className="grid place-items-center h-8 w-8 rounded-full bg-copper/10 shrink-0">
              <Check className="h-4 w-4 text-copper" strokeWidth={2.5} />
            </span>
            <p className="text-[0.95rem] text-ink-soft leading-[1.6]">{g}</p>
          </motion.li>
        ))}
      </ul>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 16 · ONBOARDING
 * ============================================================== */
function Section16Onboarding({ data }: { data: ServicePageData }) {
  return (
    <SectionWrapper number="16" eyebrow="Onboarding flow" dark>
      <SplitHeading
        as="h2"
        className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] mb-12 max-w-2xl"
      >
        From hello to cycle one.
      </SplitHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {data.onboarding.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: PREMIUM_EASE,
            }}
            className="relative rounded-2xl border border-canvas/12 bg-obsidian-soft/60 backdrop-blur p-6 md:p-7"
          >
            <p className="display text-[3rem] leading-none text-copper-soft/30 mb-4">
              {step.step}
            </p>
            <p className="text-base font-semibold text-canvas mb-2">
              {step.title}
            </p>
            <p className="text-[0.85rem] text-canvas/70 leading-[1.6]">
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 17 · OUTPUT — sample report card
 * ============================================================== */
function Section17Output({ data }: { data: ServicePageData }) {
  return (
    <SectionWrapper number="17" eyebrow="Sample output">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-5">
          <SplitHeading
            as="h2"
            className="display text-[clamp(1.85rem,4vw,3.5rem)] leading-[1.05] text-ink mb-6"
          >
            {data.output.title}
          </SplitHeading>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md">
              {data.output.body}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.3} className="lg:col-span-7 min-w-0">
          <div className="rounded-[1.5rem] bg-obsidian text-canvas/85 p-5 sm:p-6 md:p-8 shadow-[0_30px_70px_-30px_rgba(15,17,21,0.32)]">
            {/* Faux terminal title bar */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-canvas/10">
              <span className="h-2.5 w-2.5 rounded-full bg-copper/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-canvas/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald/70" />
              <span className="ml-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-canvas/50 truncate">
                ./report · v.2026
              </span>
            </div>
            <ul className="space-y-2.5 font-mono text-[0.78rem] sm:text-[0.82rem] leading-[1.6]">
              {data.output.lines.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span className="text-emerald shrink-0 select-none">
                    {line.startsWith("✓") ? "✓" : "·"}
                  </span>
                  <span className="min-w-0 break-words">
                    {line.replace(/^[✓·]\s*/u, "")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 18 · RELATED SERVICES
 * ============================================================== */
function Section18Related({ data }: { data: ServicePageData }) {
  const related = data.related
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <SectionWrapper number="18" eyebrow="Pairs well with">
      <SplitHeading
        as="h2"
        className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] text-ink mb-12 max-w-2xl"
      >
        The other moves.
      </SplitHeading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative rounded-2xl border border-hairline-strong bg-surface p-6 hover:bg-ink hover:text-canvas transition-colors"
            >
              <Icon className="h-5 w-5 mb-5" strokeWidth={1.8} />
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] mb-2 opacity-60">
                Service · {s.slug}
              </p>
              <p className="display text-[1.15rem] leading-[1.1] mb-1">
                {s.title}
              </p>
              <ArrowUpRight
                className="absolute top-5 right-5 h-4 w-4 opacity-50 group-hover:opacity-100 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 19 · OPERATOR
 * ============================================================== */
function Section19Operator({
  data,
  t,
}: {
  data: ServicePageData;
  t: (typeof tone)[ServicePageData["tone"]];
}) {
  return (
    <SectionWrapper number="19" eyebrow="Who runs this">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-4">
          <Reveal>
            <div
              className={cn(
                "h-44 w-44 rounded-3xl grid place-items-center font-mono text-3xl font-semibold",
                t.bg,
                t.fg
              )}
            >
              {data.operator.initials}
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-copper mb-3">
            {data.operator.role}
          </p>
          <SplitHeading
            as="p"
            className="display text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.3] text-ink"
          >
            &ldquo;{data.operator.quote}&rdquo;
          </SplitHeading>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ============================================================== *
 * 20 · CLOSE CTA
 * ============================================================== */
function Section20Close({ data }: { data: ServicePageData }) {
  return (
    <section className="relative bg-obsidian text-canvas py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(232,112,74,0.18) 0%, transparent 70%)",
        }}
      />
      <div className="container-x relative text-center">
        <Reveal>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-canvas/55 mb-6">
            · {data.closeCta.eyebrow} ·
          </p>
        </Reveal>
        <SplitHeading
          as="h2"
          className="display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] mb-7 max-w-3xl mx-auto"
        >
          {data.closeCta.title}
        </SplitHeading>
        <Reveal delay={0.3}>
          <p className="text-base md:text-lg text-canvas/70 leading-[1.6] max-w-md mx-auto mb-9">
            {data.closeCta.body}
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <Link
            href={`/contact?service=${data.slug}`}
            className="group inline-flex items-center gap-2 rounded-full bg-canvas text-ink px-6 py-3 text-[0.95rem] font-medium hover:bg-canvas/90 transition-all hover:-translate-y-0.5"
          >
            Book a discovery call
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================== *
 * Public hydrate hook
 * ============================================================== */

export function getServicePageData(slug: string): ServicePageData | null {
  return servicePages[slug] ?? null;
}
