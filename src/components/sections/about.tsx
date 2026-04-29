"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import {
  HighlightProse,
  Highlight,
  Italic,
  InlineBadge,
  InlineAvatarStack,
} from "@/components/ui/aceternity/highlight-prose";
import { Deco } from "@/components/ui/decorations";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * About v2 — editorial split. Left: huge serif paragraph with inline
 * highlight pills + badges (Flowmania reference). Right: 3-image grid
 * collage with parallax. Decorative shapes scattered for personality.
 */
export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yB = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yC = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-canvas py-24 md:py-32 overflow-hidden"
    >
      {/* decorative scatter */}
      <span className="absolute top-16 right-12 opacity-50">
        <Deco name="spark" className="h-8 w-8 text-copper" pulse />
      </span>
      <span className="absolute bottom-24 left-12 opacity-40 hidden md:block">
        <Deco name="ring-dashed" className="h-12 w-12 text-electric" spin />
      </span>
      <span className="absolute top-1/3 left-[44%] opacity-50 hidden md:block">
        <Deco name="plus" className="h-5 w-5 text-ink/50" drift />
      </span>

      {/* Section header */}
      <div className="container-x mb-14 md:mb-20">
        <Reveal>
          <p className="eyebrow eyebrow-line mb-6">About Evolut</p>
        </Reveal>
        <h2 className="display text-[clamp(2.25rem,5vw,4.75rem)] text-ink leading-[1.02]">
          <StaggerWords text="When your ideas take shape," />
          <br />
          <StaggerWords
            text="our expertise takes over."
            delayStart={0.18}
            wordClassName="italic font-normal text-ink-soft"
          />
        </h2>
      </div>

      {/* Body grid — text left, image collage right */}
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-y-14 gap-x-12 items-start">
        {/* LEFT — editorial prose with inline highlights */}
        <div className="lg:col-span-7 lg:sticky lg:top-28 self-start">
          <Reveal delay={0.15}>
            <HighlightProse className="mb-10">
              We&apos;re operators who got tired of agencies that <Italic>talked.</Italic>{" "}
              Evolut is a <Highlight tone="lime">full-service</Highlight> ecommerce
              team built by founders who&apos;ve scaled brands past{" "}
              <Highlight tone="copper">8 figures</Highlight> on Amazon and Shopify.
            </HighlightProse>
          </Reveal>

          <Reveal delay={0.3}>
            <HighlightProse>
              Whether you&apos;re listing your first SKU{" "}
              <InlineBadge tone="electric">1</InlineBadge> or rebuilding the catalog
              that drives <Highlight tone="yellow">70% of revenue</Highlight> — we run
              sourcing, listings, photography, and ads as a{" "}
              <Highlight tone="mint">single accountable function</Highlight>.{" "}
              <InlineAvatarStack initials={["AM", "ZK", "SH", "RA"]} />
            </HighlightProse>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-3 text-[0.9rem] font-medium hover:bg-ink-soft transition-all hover:-translate-y-0.5"
              >
                Explore services
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-ink border-b border-ink/30 hover:border-ink pb-1 transition-colors"
              >
                Book a call
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </Reveal>

          {/* Foot strip — quick stats with mini SVGs */}
          <Reveal delay={0.6}>
            <div className="mt-14 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <p className="display text-2xl text-ink leading-none mb-1">8+</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-mute">
                  Years operating
                </p>
              </div>
              <div>
                <p className="display text-2xl text-ink leading-none mb-1">240+</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-mute">
                  Brands shipped
                </p>
              </div>
              <div>
                <p className="display text-2xl text-ink leading-none mb-1">4</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-mute">
                  Continents
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — 3-image asymmetric collage */}
        <div className="lg:col-span-5 relative">
          <div className="grid grid-cols-2 gap-3 md:gap-4 relative">
            {/* big tile, full row at top */}
            <motion.div style={{ y: yA }} className="col-span-2">
              <ImagePlaceholder
                src="/images/about-studio.jpg"
                alt="Studio interior — workspace + moodboard"
                prompt="Editorial photo of a modern minimalist design studio interior — exposed concrete floor, warm oak desks, large arched windows pouring in afternoon daylight, a few moodboards pinned to a long pin-rail, no people, soft shadows, hyperreal magazine quality, 16:9 ratio."
                aspectRatio="16/9"
                variant="accent"
                className="w-full"
                showPrompt={false}
                caption="Workspace · Jhelum studio"
              />
            </motion.div>

            {/* two smaller tiles in a row */}
            <motion.div style={{ y: yB }}>
              <ImagePlaceholder
                src="/images/about-laptop.jpg"
                alt="Operator at work — laptop closeup"
                prompt="Editorial closeup of a hand on a laptop trackpad, soft natural daylight from a window, a notebook with handwritten notes beside the laptop, warm color grade, hyperreal, no text, no logos, 1:1 ratio."
                aspectRatio="1/1"
                variant="dark"
                className="w-full"
                showPrompt={false}
                caption="Daily ops"
              />
            </motion.div>
            <motion.div style={{ y: yC }}>
              <ImagePlaceholder
                src="/images/about-brandbook.jpg"
                alt="Catalog spread — printed brand book"
                prompt="Overhead flat-lay of an open brand guideline book on a dusty pink linen surface, color swatches and a fountain pen beside it, soft afternoon window light, magazine quality, no readable text, 1:1 ratio."
                aspectRatio="1/1"
                variant="copper"
                className="w-full"
                showPrompt={false}
                caption="Brand systems"
              />
            </motion.div>
          </div>

          {/* live ops chip floating bottom-right of the collage */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: PREMIUM_EASE }}
            className="absolute -bottom-4 right-4 md:-right-4 z-10 rounded-2xl bg-canvas border border-hairline shadow-[0_18px_40px_-16px_rgba(15,17,21,0.18)] backdrop-blur p-4 flex items-center gap-3"
          >
            <span className="conic-chrome h-9 w-9 rounded-full p-[2px]">
              <span className="block h-full w-full rounded-full bg-canvas grid place-items-center">
                <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
              </span>
            </span>
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-mute">
                Live ops
              </p>
              <p className="text-xs font-semibold text-ink">
                240+ brands · 4 continents
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
