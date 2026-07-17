import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Rocket, Check } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CTA } from "@/components/sections/cta";
import { ipAccelerator } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Amazon IP Accelerator · Evolut",
  description:
    "Evolut runs Amazon's IP Accelerator end-to-end — vetted IP law firms, fast trademark filing, and early Brand Registry access with counterfeit defense, the full brand toolkit, and 24/7 monitoring.",
};

export default function IpAcceleratorPage() {
  const { eyebrow, badge, title, subtitle, benefits, steps, stats, toolkit } =
    ipAccelerator;

  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        {/* ============================ HERO ============================ */}
        <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 border-b border-hairline overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 paper-grid opacity-30 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 50% at 100% 0%, rgba(232,112,74,0.12) 0%, transparent 60%), " +
                "radial-gradient(50% 45% at 0% 100%, rgba(0,102,255,0.07) 0%, transparent 60%)",
            }}
          />

          <div className="container-x relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-14 md:mb-16">
              <div className="lg:col-span-7">
                <Reveal>
                  <span className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-surface px-3.5 py-1.5 mb-6">
                    <Rocket className="h-3.5 w-3.5 text-copper" strokeWidth={2} />
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-soft">
                      {badge}
                    </span>
                  </span>
                </Reveal>
                <Reveal delay={0.05}>
                  <p className="eyebrow eyebrow-line mb-6">{eyebrow}</p>
                </Reveal>
                <h1 className="display text-[clamp(2.5rem,6vw,5.5rem)] text-ink leading-[1.02]">
                  <StaggerWords text="Protect your brand" />
                  <br />
                  <StaggerWords
                    text="before it registers."
                    delayStart={0.18}
                    wordClassName="italic font-normal text-copper"
                  />
                </h1>
              </div>
              <div className="lg:col-span-5">
                <Reveal delay={0.25}>
                  <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md lg:ml-auto mb-8">
                    {subtitle}
                  </p>
                </Reveal>
                <Reveal delay={0.35}>
                  <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-3.5 text-[0.95rem] font-medium transition-all hover:-translate-y-0.5 hover:bg-ink-soft shadow-[0_8px_24px_-8px_rgba(15,17,21,0.4)]"
                    >
                      Start my enrollment
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </Link>
                    <Link
                      href="/services/trademark"
                      className="group inline-flex items-center gap-1.5 px-2 py-3.5 text-[0.95rem] font-medium text-ink relative"
                    >
                      IP &amp; Trademark
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                      <span className="absolute left-2 right-7 -bottom-0.5 h-px bg-ink" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline rounded-2xl overflow-hidden border border-hairline">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.06}>
                  <div className="bg-canvas h-full px-6 py-7">
                    <p className="display text-2xl md:text-3xl text-ink leading-none mb-2">
                      {s.value}
                    </p>
                    <p className="text-[0.82rem] text-mute leading-snug">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ========================== BENEFITS ========================== */}
        <section className="relative py-24 md:py-32 border-b border-hairline">
          <div className="container-x">
            <div className="max-w-3xl mb-14 md:mb-16">
              <Reveal>
                <p className="eyebrow eyebrow-line mb-5">
                  What the program unlocks
                </p>
              </Reveal>
              <h2 className="display text-[clamp(2rem,4.4vw,3.75rem)] text-ink leading-[1.04]">
                <StaggerWords text="Registered-brand protection," />
                <br />
                <span className="italic font-normal text-ink-soft">
                  months ahead of schedule.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <Reveal key={b.title} delay={i * 0.05}>
                    <div className="group h-full rounded-3xl border border-hairline-strong bg-surface p-7 md:p-8 transition-all duration-500 hover:shadow-[0_30px_70px_-30px_rgba(15,17,21,0.22)] hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-7">
                        <span className="h-11 w-11 rounded-xl bg-ink text-canvas grid place-items-center transition-transform duration-500 group-hover:rotate-[6deg]">
                          <Icon className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mute">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="display text-[clamp(1.35rem,2vw,1.7rem)] leading-[1.1] text-ink mb-3">
                        {b.title}
                      </h3>
                      <p className="text-[0.92rem] text-ink-soft leading-[1.6]">
                        {b.detail}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================== PROCESS ========================== */}
        <section className="relative bg-obsidian text-canvas py-24 md:py-32 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 40% at 90% 0%, rgba(232,112,74,0.14) 0%, transparent 60%)",
            }}
          />
          <div className="container-x relative z-10">
            <div className="max-w-3xl mb-14 md:mb-16">
              <p className="eyebrow mb-5 text-canvas/55">The path</p>
              <h2 className="display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.04] text-canvas">
                <StaggerWords text="From unprotected to enrolled" />
                <br />
                <span className="italic font-normal text-copper-soft">
                  in five moves.
                </span>
              </h2>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-hairline-dark rounded-2xl overflow-hidden border border-hairline-dark">
              {steps.map((step) => (
                <li
                  key={step.n}
                  className="bg-obsidian h-full p-7 md:p-8 flex flex-col"
                >
                  <span className="font-mono text-[0.72rem] tracking-[0.2em] text-copper-soft mb-6">
                    {step.n}
                  </span>
                  <h3 className="text-lg font-medium text-canvas mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[0.88rem] text-canvas/60 leading-relaxed">
                    {step.blurb}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* =========================== TOOLKIT ========================== */}
        <section className="relative py-24 md:py-32 border-b border-hairline">
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-16 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow eyebrow-line mb-5">The brand toolkit</p>
              </Reveal>
              <h2 className="display text-[clamp(1.9rem,3.6vw,3.25rem)] text-ink leading-[1.06] mb-6">
                Everything Brand Registry turns on.
              </h2>
              <Reveal delay={0.15}>
                <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md mb-8">
                  Enrollment isn&apos;t the finish line — it&apos;s the switch.
                  Once you&apos;re in, we set up and wire the full protection and
                  conversion suite so it&apos;s working from day one.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-3.5 text-[0.95rem] font-medium transition-all hover:-translate-y-0.5 hover:bg-ink-soft"
                >
                  Talk to an IP specialist
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </Link>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {toolkit.map((item, i) => (
                  <Reveal key={item} delay={i * 0.04}>
                    <div
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border border-hairline-strong bg-surface px-5 py-4 transition-colors hover:border-ink/30"
                      )}
                    >
                      <span className="h-7 w-7 rounded-full bg-emerald/10 text-emerald grid place-items-center shrink-0">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <span className="text-[0.95rem] font-medium text-ink">
                        {item}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
