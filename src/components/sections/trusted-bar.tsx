"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { caseStudies } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * TrustedBar — slim strip directly under the hero.
 *
 * Shows our education partner (BJK University) on the left, then a
 * compact row of 3 brand chips (Gloco + 2 strongest case studies) on
 * the right. Each chip links to its case-study detail page.
 */

const FEATURED_SLUGS = [
  "gloco-calm-carry-us",
  "pawsteps-dog-ramp-us",
  "shilajit-resin-au",
];

export function TrustedBar() {
  const featured = FEATURED_SLUGS.map((slug) =>
    caseStudies.find((c) => c.slug === slug)
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section
      aria-label="Trusted by"
      className="relative bg-canvas border-y border-hairline overflow-hidden"
    >
      {/* tiny ambient gradient — picks up the hero's brand-warmth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(232,112,74,0.04) 0%, transparent 30%, transparent 70%, rgba(0,102,255,0.04) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 0.7, ease: PREMIUM_EASE }}
        className="container-x relative py-5 md:py-6 flex flex-col md:flex-row items-center gap-y-5 gap-x-8"
      >
        {/* LEFT — BJK education partner */}
        <Link
          href="https://bjkuniversity.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 shrink-0"
        >
          <span className="grid place-items-center h-10 w-10 rounded-xl bg-canvas-2 border border-hairline-strong overflow-hidden p-1.5">
            <Image
              src="/bjk1_logo.png"
              alt="BJK University"
              width={32}
              height={32}
              className="object-contain"
            />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute">
              Education partner
            </span>
            <span className="font-medium text-[0.9rem] text-ink group-hover:text-copper transition-colors">
              BJK University
            </span>
          </div>
        </Link>

        {/* DIVIDER */}
        <span
          aria-hidden="true"
          className="hidden md:block h-8 w-px bg-hairline-strong"
        />

        {/* MIDDLE — eyebrow */}
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mute shrink-0 hidden md:inline">
          Trusted by brands we&apos;ve scaled
        </span>

        {/* RIGHT — 3 brand chips */}
        <div className="flex items-center gap-3 md:gap-4 md:ml-auto flex-wrap justify-center">
          {featured.map((cs, i) => (
            <BrandChip
              key={cs.slug}
              slug={cs.slug}
              brand={cs.brand}
              metricValue={cs.metric.value}
              logo={cs.logo}
              accent={cs.accent}
              delay={0.15 + i * 0.08}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function BrandChip({
  slug,
  brand,
  metricValue,
  logo,
  accent,
  delay,
}: {
  slug: string;
  brand: string;
  metricValue: string;
  logo?: string;
  accent: string;
  delay: number;
}) {
  const dot: Record<string, string> = {
    electric: "bg-electric",
    copper: "bg-copper",
    obsidian: "bg-ink",
    chrome: "bg-chrome-3",
    lime: "bg-lime",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, delay, ease: PREMIUM_EASE }}
    >
      <Link
        href={`/work/${slug}`}
        className="group inline-flex items-center gap-2.5 rounded-full border border-hairline-strong bg-canvas px-3 py-1.5 transition-all hover:border-ink hover:-translate-y-0.5"
      >
        {logo ? (
          <span className="grid place-items-center h-6 w-6 rounded-md bg-canvas-2 overflow-hidden p-0.5">
            <Image
              src={logo}
              alt={brand}
              width={20}
              height={20}
              className="object-contain"
            />
          </span>
        ) : (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full shrink-0",
              dot[accent] ?? "bg-ink"
            )}
          />
        )}
        <span className="font-medium text-[0.78rem] text-ink">{brand}</span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-mute group-hover:text-copper transition-colors">
          {metricValue}
        </span>
      </Link>
    </motion.div>
  );
}
