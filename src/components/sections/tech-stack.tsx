"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { techStack } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { Deco } from "@/components/ui/decorations";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Each tech category gets a color so the dark obsidian section sings.
 * Inspired by the 2D Shape Interaction reference's colorful pill pile.
 */
const PILL_TONES: Record<string, string> = {
  Framework: "bg-electric text-canvas",
  UI: "bg-lime text-ink",
  Runtime: "bg-emerald text-canvas",
  API: "bg-copper text-canvas",
  Database: "bg-canvas text-ink",
  Commerce: "bg-[#a78bfa] text-canvas",
  Headless: "bg-[#fb7185] text-canvas",
  Payments: "bg-canvas text-ink",
  CRM: "bg-canvas/15 text-canvas border border-canvas/25",
  Email: "bg-[#fde047] text-ink",
};

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discovery & Consultation",
    body: "Architecture, scope, success criteria — locked in 5 days.",
    /** layered radial-gradient backdrop for the fancy look */
    gradient:
      "radial-gradient(120% 100% at 0% 0%, rgba(0,102,255,0.45) 0%, transparent 55%), radial-gradient(120% 100% at 100% 100%, rgba(61,139,255,0.32) 0%, transparent 60%)",
    accent: "border-electric/40",
  },
  {
    n: "02",
    title: "Design & Development",
    body: "Custom themes, headless builds, MERN apps — sprinted in two-week cycles.",
    gradient:
      "radial-gradient(120% 100% at 100% 0%, rgba(232,112,74,0.45) 0%, transparent 55%), radial-gradient(120% 100% at 0% 100%, rgba(244,165,133,0.32) 0%, transparent 60%)",
    accent: "border-copper/40",
  },
  {
    n: "03",
    title: "Integration",
    body: "Stripe, HubSpot, Klaviyo, Recharge — wired into one event model.",
    gradient:
      "radial-gradient(120% 100% at 0% 100%, rgba(217,255,60,0.42) 0%, transparent 55%), radial-gradient(120% 100% at 100% 0%, rgba(168,200,40,0.32) 0%, transparent 60%)",
    accent: "border-lime/40",
  },
  {
    n: "04",
    title: "Launch & Support",
    body: "Zero-downtime cutover, then continuous tuning of CWV + features.",
    gradient:
      "radial-gradient(120% 100% at 50% 100%, rgba(16,185,129,0.45) 0%, transparent 55%), radial-gradient(120% 100% at 50% 0%, rgba(52,211,153,0.32) 0%, transparent 60%)",
    accent: "border-emerald/40",
  },
];

export function TechStack() {
  return (
    <section
      id="shopify"
      className="relative bg-obsidian text-canvas py-24 md:py-32 overflow-hidden"
    >
      {/* atmospheric blobs */}
      <div
        className="gradient-blob"
        style={{
          width: 540,
          height: 540,
          left: "-15%",
          top: "10%",
          background: "radial-gradient(circle, rgba(0,102,255,0.45), transparent 70%)",
          opacity: 0.4,
        }}
      />
      <div
        className="gradient-blob"
        style={{
          width: 460,
          height: 460,
          right: "-12%",
          bottom: "10%",
          background: "radial-gradient(circle, rgba(232,112,74,0.35), transparent 70%)",
          opacity: 0.4,
          animationDelay: "-8s",
        }}
      />

      {/* decorative shapes */}
      <span className="absolute top-16 right-16 opacity-70">
        <Deco name="asterisk" className="h-7 w-7 text-lime" spin />
      </span>
      <span className="absolute bottom-24 left-12 opacity-50 hidden md:block">
        <Deco name="ring-dashed" className="h-12 w-12 text-canvas/30" spin />
      </span>
      <span className="absolute top-1/3 left-12 opacity-60 hidden md:block">
        <Deco name="spark" className="h-5 w-5 text-copper" pulse />
      </span>

      <div className="container-x relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 md:mb-20 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6 text-canvas/60">
                Shopify · MERN · Headless
              </p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] text-canvas leading-[1.02]">
              <StaggerWords text="Custom storefronts." />
              <br />
              <StaggerWords
                text="Built to scale."
                delayStart={0.18}
                wordClassName="italic font-normal text-canvas/60"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-canvas/70 leading-[1.6] max-w-md">
                Custom Shopify themes, MERN-stack web apps, headless commerce, and
                the integrations that hold it all together — Stripe, HubSpot,
                Klaviyo, and your own APIs.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <Link
                href="/services/shopify"
                className="group inline-flex items-center gap-2 mt-7 rounded-full bg-canvas text-ink px-6 py-3 text-[0.9rem] font-medium hover:bg-canvas/90 transition-all hover:-translate-y-0.5"
              >
                Brief our team
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Pill cloud — colored, scattered */}
        <div className="relative mb-16 md:mb-20">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
            {techStack.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.6, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.04,
                  ease: PREMIUM_EASE,
                }}
                whileHover={{ scale: 1.06, rotate: i % 2 ? 2 : -2 }}
                className={cn(
                  "rounded-full px-5 py-3 cursor-default shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]",
                  PILL_TONES[t.category] ?? "bg-canvas/10 text-canvas border border-canvas/20"
                )}
              >
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] opacity-75">
                  {t.category}
                </span>
                <span className="block text-sm font-semibold mt-0.5">{t.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partner strip — clean monogram chips, no image slots */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center justify-between mb-8">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-canvas/50">
              Integrations · partners
            </p>
            <span className="h-px flex-1 ml-6 bg-canvas/10" />
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px rounded-2xl overflow-hidden bg-canvas/10 border border-canvas/10">
            {[
              // Each chip: real SVG when we have one, else a brand-color
              // monogram fallback. The hover lights the brand color.
              { name: "Shopify", icon: null, color: "#95BF47" },
              { name: "Stripe", icon: "/logos/stripe-svgrepo-com.svg", color: "#635BFF" },
              { name: "Klaviyo", icon: null, color: "#1A1340" },
              { name: "HubSpot", icon: "/logos/hubspot.svg", color: "#FF7A59" },
              { name: "Mailchimp", icon: "/logos/mailchimp-svgrepo-com.svg", color: "#FFE01B" },
              { name: "Recharge", icon: null, color: "#FFB627" },
              { name: "Yotpo", icon: null, color: "#0042E4" },
              { name: "Algolia", icon: null, color: "#003DFF" },
            ].map((p, i) => (
              <motion.li
                key={p.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.55, delay: i * 0.04, ease: PREMIUM_EASE }}
                className="group relative flex items-center justify-center gap-2.5 bg-obsidian-soft py-5 md:py-6 px-3 transition-colors duration-500 hover:bg-canvas hover:text-ink"
                style={{
                  ["--brand-color" as string]: p.color,
                }}
              >
                {/* Soft brand-tinted glow on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(80% 80% at 50% 50%, ${p.color}1f 0%, transparent 70%)`,
                  }}
                />

                {/* Real SVG when present, else colored monogram disc */}
                {p.icon ? (
                  <span className="relative grid place-items-center h-7 w-7 rounded-full bg-canvas overflow-hidden p-1 shrink-0">
                    <Image
                      src={p.icon}
                      alt={p.name}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </span>
                ) : (
                  <span
                    className="relative grid place-items-center h-7 w-7 rounded-full font-mono text-[0.7rem] font-semibold shrink-0 transition-colors duration-500"
                    style={{
                      backgroundColor: p.color,
                      color: p.name === "Mailchimp" ? "#0a0a0b" : "#ffffff",
                    }}
                  >
                    {p.name.charAt(0)}
                  </span>
                )}

                <span className="relative font-mono text-[0.7rem] uppercase tracking-[0.16em] text-canvas/65 transition-colors duration-500 group-hover:text-ink">
                  {p.name}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Process strip — 4 gradient cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: PREMIUM_EASE }}
              whileHover={{ y: -4 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border bg-obsidian-soft/40 backdrop-blur p-6 transition-shadow duration-500",
                step.accent,
                "hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
              )}
            >
              {/* gradient wash */}
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: step.gradient }}
              />
              {/* film-grain overlay (very faint) */}
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
                  backgroundSize: "3px 3px",
                }}
              />

              <div className="relative flex items-center gap-3 mb-5">
                <span className="conic-chrome h-9 w-9 rounded-full p-[2px]">
                  <span className="block h-full w-full rounded-full bg-obsidian grid place-items-center font-mono text-[0.7rem] font-semibold text-canvas">
                    {step.n}
                  </span>
                </span>
                <span className="h-px flex-1 bg-canvas/15" />
              </div>
              <p className="relative text-base font-semibold text-canvas mb-2 leading-snug">
                {step.title}
              </p>
              <p className="relative text-[0.78rem] text-canvas/75 leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
