import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CTA } from "@/components/sections/cta";
import { insights } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";
import { CardSpotlight } from "@/components/ui/aceternity/card-spotlight";
import { ArrowUpRight, Bookmark, Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Field notes from running 240+ brands. PPC ladders, A+ content tactics, sourcing playbooks — written for operators.",
};

const featured = insights[0];
const rest = insights.slice(1);
const categories = ["All", "Amazon Strategy", "Brand Building", "Sourcing", "Operations"];

export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Editorial cover — masthead + featured story preview, NOT the
            generic dark PageHero. This is the magazine landing for the
            field-notes library. */}
        <section className="relative bg-canvas pt-28 md:pt-36 pb-16 md:pb-20 border-b border-hairline overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 paper-grid opacity-25 pointer-events-none"
          />
          <div className="container-x relative">
            {/* Masthead row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 md:mb-14 border-b border-ink/15">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-9 w-9 rounded-full bg-ink text-canvas">
                  <Newspaper className="h-4 w-4" strokeWidth={2} />
                </span>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ink">
                  Evolut · Field Notes
                </p>
              </div>
              <div className="flex items-center gap-6 text-mute font-mono text-[0.6rem] uppercase tracking-[0.18em]">
                <span>Vol. 04 · 2026</span>
                <span className="hidden sm:inline">{insights.length} pieces</span>
                <span className="hidden md:inline">Operator-grade</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12 items-end">
              {/* LEFT — masthead title */}
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-electric mb-5">
                    This week
                  </p>
                </Reveal>
                <h1 className="display text-[clamp(2.5rem,6vw,5.5rem)] text-ink leading-[0.98] mb-6">
                  Field notes from
                  <br />
                  running{" "}
                  <span className="italic font-normal text-copper">
                    240+ brands.
                  </span>
                </h1>
                <Reveal delay={0.2}>
                  <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-xl">
                    No theory, no recycled advice. Tactics we use right now
                    across the portfolio — written for the operator who reads
                    on their phone between meetings.
                  </p>
                </Reveal>
              </div>

              {/* RIGHT — TOC of upcoming pieces */}
              <Reveal delay={0.3} className="lg:col-span-5">
                <div className="rounded-2xl border border-hairline-strong bg-canvas-2/60 backdrop-blur p-6 md:p-7">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute mb-4">
                    In this issue
                  </p>
                  <ol className="space-y-3">
                    {insights.slice(0, 4).map((post, i) => (
                      <li key={post.slug}>
                        <Link
                          href={`/insights/${post.slug}`}
                          className="group flex items-baseline gap-3 text-ink"
                        >
                          <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-mute shrink-0 w-6">
                            0{i + 1}
                          </span>
                          <span className="text-sm md:text-[0.95rem] leading-snug group-hover:text-electric transition-colors flex-1">
                            {post.title}
                          </span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-mute group-hover:text-electric transition-colors shrink-0"
                            strokeWidth={2.2}
                          />
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Category chips */}
        <section className="relative bg-canvas pt-12 pb-6">
          <div className="container-x">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((c, i) => (
                <button
                  key={c}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors border ${
                    i === 0
                      ? "bg-ink text-canvas border-ink"
                      : "bg-canvas-2 text-ink-soft border-hairline hover:bg-surface"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="relative bg-canvas py-12 md:py-16">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-5">Featured this week</p>
            </Reveal>
            <div className="rounded-3xl border border-hairline overflow-hidden bg-gradient-to-br from-electric/[0.10] via-canvas to-copper/[0.06]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 md:p-12 lg:p-16 items-end">
                <div className="lg:col-span-8">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-electric mb-5">
                    {featured.category} · {featured.readTime} read
                  </p>
                  <h2 className="display text-[clamp(2rem,4.5vw,3.75rem)] text-ink leading-[1.05] mb-5">
                    {featured.title}
                  </h2>
                  <p className="text-lg text-ink-soft leading-[1.6] max-w-xl">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="lg:col-span-4 flex lg:justify-end">
                  <Link
                    href={`/insights/${featured.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-canvas text-[0.95rem] font-medium hover:bg-ink-soft transition-colors"
                  >
                    Read the piece
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid of articles */}
        <section className="relative bg-canvas-2 py-20 md:py-28">
          <div className="container-x">
            <div className="max-w-2xl mb-12">
              <Reveal>
                <p className="eyebrow eyebrow-line mb-5">Recent</p>
              </Reveal>
              <h3 className="display text-[clamp(1.75rem,3vw,2.5rem)] text-ink leading-[1.05]">
                Latest field notes.
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post, i) => (
                <CardSpotlight key={`${post.slug}-${i}`} className="p-6 h-full" radius={400}>
                  <Link href={`/insights/${post.slug}`} className="group block h-full flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-electric">
                        {post.category}
                      </span>
                      <button aria-label="Bookmark" className="text-mute hover:text-ink transition-colors">
                        <Bookmark className="h-4 w-4" strokeWidth={2} />
                      </button>
                    </div>
                    <h4 className="display text-[1.4rem] text-ink leading-tight mb-3">
                      {post.title}
                    </h4>
                    <p className="text-sm text-mute leading-relaxed mb-6">{post.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between text-xs text-mute font-mono uppercase tracking-wider">
                      <span>{post.readTime} read</span>
                      <span className="inline-flex items-center gap-1 group-hover:text-electric text-ink transition-colors">
                        Read
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                    </div>
                  </Link>
                </CardSpotlight>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="relative bg-canvas py-20">
          <div className="container-x">
            <div className="rounded-3xl border border-hairline bg-obsidian text-canvas p-10 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-canvas/60 mb-4">
                  Field notes — weekly
                </p>
                <h3 className="display text-[clamp(1.75rem,3.2vw,2.6rem)] text-canvas leading-[1.1]">
                  One playbook in your inbox each Tuesday.
                </h3>
                <p className="mt-4 text-canvas/70 max-w-md leading-relaxed">
                  No fluff, no funnels. Just what we&apos;re running across 240+ brands this week.
                </p>
              </div>
              <form className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="email"
                  placeholder="you@brand.com"
                  className="flex-1 rounded-full border border-canvas/15 bg-canvas/[0.05] px-5 py-3.5 text-canvas placeholder:text-canvas/40 focus:border-electric focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="group rounded-full bg-canvas text-ink px-6 py-3.5 font-medium inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform"
                >
                  Subscribe
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
                </button>
              </form>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
