import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CTA } from "@/components/sections/cta";
import { services } from "@/lib/site-config";
import { servicePages } from "@/lib/service-pages";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services · Evolut",
  description:
    "Eight services, one operating team. Sourcing, listings, photography, ads, freight, branding, Shopify development, and trademark — Evolut runs the entire ecommerce stack.",
};

const accentMap: Record<
  string,
  { bg: string; fg: string; ring: string; chip: string }
> = {
  electric: {
    bg: "bg-electric/[0.06]",
    fg: "text-ink",
    ring: "ring-electric/30",
    chip: "bg-electric/10 text-electric",
  },
  copper: {
    bg: "bg-copper/[0.06]",
    fg: "text-ink",
    ring: "ring-copper/30",
    chip: "bg-copper/12 text-copper",
  },
  obsidian: {
    bg: "bg-obsidian/[0.04]",
    fg: "text-ink",
    ring: "ring-obsidian/30",
    chip: "bg-obsidian/8 text-obsidian",
  },
  chrome: {
    bg: "bg-canvas-2",
    fg: "text-ink",
    ring: "ring-chrome-3/40",
    chip: "bg-chrome-2/30 text-chrome-4",
  },
  lime: {
    bg: "bg-lime/[0.10]",
    fg: "text-ink",
    ring: "ring-lime/40",
    chip: "bg-lime/30 text-ink",
  },
};

export default function ServicesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="bg-canvas">
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
                "radial-gradient(60% 50% at 100% 0%, rgba(232,112,74,0.10) 0%, transparent 60%), " +
                "radial-gradient(50% 45% at 0% 100%, rgba(0,102,255,0.06) 0%, transparent 60%)",
            }}
          />

          <div className="container-x relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-14 md:mb-20">
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="eyebrow eyebrow-line mb-6">
                    Services · {services.length} disciplines
                  </p>
                </Reveal>
                <h1 className="display text-[clamp(2.5rem,6vw,5.5rem)] text-ink leading-[1.02]">
                  <StaggerWords text="One stack." />
                  <br />
                  <StaggerWords
                    text="Eight disciplines."
                    delayStart={0.18}
                    wordClassName="italic font-normal text-copper"
                  />
                </h1>
              </div>
              <div className="lg:col-span-5">
                <Reveal delay={0.25}>
                  <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md lg:ml-auto">
                    Most brands stitch together five vendors. Evolut
                    runs the whole ecommerce stack as one accountable
                    team — every move compounding inside your catalog.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Service grid — every entry links to its 20-section detail page */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {services.map((s, i) => {
                const accent = accentMap[s.accent] ?? accentMap.obsidian;
                const Icon = s.icon;
                const hasDetail = Boolean(servicePages[s.slug]);
                return (
                  <Reveal key={s.slug} delay={i * 0.05}>
                    <Link
                      href={`/services/${s.slug}`}
                      className={cn(
                        "group relative block rounded-3xl border border-hairline-strong p-7 md:p-8 transition-all duration-500 h-full",
                        accent.bg,
                        accent.fg,
                        "hover:shadow-[0_30px_70px_-30px_rgba(15,17,21,0.22)] hover:-translate-y-1"
                      )}
                    >
                      <div className="flex items-start justify-between mb-7">
                        <span
                          className={cn(
                            "h-11 w-11 rounded-xl grid place-items-center transition-colors duration-300",
                            accent.chip
                          )}
                        >
                          <Icon className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 text-mute group-hover:text-ink transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={2}
                        />
                      </div>

                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mute mb-3">
                        {String(i + 1).padStart(2, "0")} ·{" "}
                        {s.accent}
                      </p>

                      <h3 className="display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.08] text-ink mb-3">
                        {s.title}
                      </h3>

                      <p className="text-[0.95rem] text-ink-soft leading-[1.55] mb-5 max-w-md">
                        {s.blurb}
                      </p>

                      <ul className="space-y-1.5 text-[0.85rem] text-ink-soft mb-6">
                        {s.features.slice(0, 3).map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2"
                          >
                            <span className="mt-2 h-1 w-1 rounded-full bg-ink/40 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between pt-4 border-t border-hairline">
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute group-hover:text-copper transition-colors">
                          {hasDetail ? "20-section deep-dive" : "Detail page"}
                        </span>
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute">
                          {s.features.length} capabilities
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
