"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Rocket } from "lucide-react";
import { ipAccelerator } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * IpAccelerator — dark, premium feature block for Amazon's IP Accelerator
 * program. Acts as the homepage teaser; CTAs point to the Trademark & IP
 * service page (/services/trademark) for the full breakdown.
 */
export function IpAccelerator() {
  const { eyebrow, badge, subtitle, benefits, stats } = ipAccelerator;
  // Homepage teaser shows the four headline protections; the rest live on the page.
  const featured = benefits.slice(0, 4);

  return (
    <section
      id="ip-accelerator"
      className="relative bg-obsidian text-canvas py-28 md:py-36 overflow-hidden"
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 45% at 12% 8%, rgba(232,112,74,0.16) 0%, transparent 60%), " +
            "radial-gradient(45% 40% at 92% 100%, rgba(0,102,255,0.14) 0%, transparent 60%)",
        }}
      />
      {/* faint grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="container-x relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-y-14 gap-x-16 items-center">
        {/* LEFT — copy, stats, CTAs */}
        <div className="lg:col-span-5">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline-dark bg-canvas/[0.04] px-3.5 py-1.5 mb-7">
              <Rocket className="h-3.5 w-3.5 text-copper-soft" strokeWidth={2} />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-canvas/70">
                {badge}
              </span>
            </span>
          </Reveal>

          <p className="eyebrow mb-5 text-canvas/55">{eyebrow}</p>

          <h2 className="display text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.02] mb-6">
            <StaggerWords text="Protect your brand" />
            <br />
            <StaggerWords
              text="before it even registers."
              delayStart={0.16}
              wordClassName="italic font-normal text-copper-soft"
            />
          </h2>

          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-canvas/70 leading-[1.65] max-w-xl mb-9">
              {subtitle}
            </p>
          </Reveal>

          {/* stat row */}
          <Reveal delay={0.3}>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 max-w-md mb-10">
              {stats.map((s) => (
                <div key={s.label} className="border-l border-hairline-dark pl-4">
                  <dt className="display text-xl md:text-2xl text-canvas leading-none mb-1.5">
                    {s.value}
                  </dt>
                  <dd className="text-[0.8rem] text-canvas/55 leading-snug">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.4}>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/services/trademark"
                className="group inline-flex items-center gap-2 rounded-full bg-canvas text-ink px-6 py-3.5 text-[0.95rem] font-medium transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                Explore IP Accelerator
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 px-2 py-3.5 text-[0.95rem] font-medium text-canvas relative"
              >
                Book a consult
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
                <span className="absolute left-2 right-7 -bottom-0.5 h-px bg-canvas/50" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — headline protections */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featured.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: PREMIUM_EASE }}
                  whileHover={{ y: -5 }}
                  className="group relative rounded-2xl border border-hairline-dark bg-obsidian-soft/80 p-6 md:p-7 overflow-hidden transition-colors hover:border-canvas/20"
                >
                  <div className="h-11 w-11 rounded-xl bg-canvas/[0.06] text-copper-soft flex items-center justify-center mb-5 transition-transform duration-500 group-hover:rotate-[6deg]">
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </div>
                  <h3 className="text-lg font-medium text-canvas mb-2 leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-[0.9rem] text-canvas/60 leading-relaxed">
                    {b.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <Reveal delay={0.3}>
            <Link
              href="/services/trademark"
              className="group mt-4 flex items-center justify-between rounded-2xl border border-dashed border-hairline-dark px-6 py-5 transition-colors hover:border-canvas/25 hover:bg-canvas/[0.03]"
            >
              <span className="text-[0.92rem] text-canvas/70">
                Plus counterfeit defense, the full brand toolkit &amp; 24/7 monitoring
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-copper-soft shrink-0 ml-4">
                See all
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2.2}
                />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
