import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CTA } from "@/components/sections/cta";
import { caseStudies, services, type CaseStudy } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return { title: "Case study" };
  return {
    title: `${study.brand} · ${study.metric.value}`,
    description: study.outcome,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
  const channelObjs = study.channels
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        {/* ============================================================ *
         * 01 · HERO — full-bleed cover with brand, headline metric, CTA
         * ============================================================ */}
        <section className="relative bg-canvas pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden border-b border-hairline">
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
            {/* breadcrumb back */}
            <Reveal>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mute hover:text-ink transition-colors mb-10"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                Back to all work
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12 items-start">
              {/* LEFT — meta + headline */}
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="flex items-center gap-3 mb-7">
                    {study.logo ? (
                      <span className="grid place-items-center h-10 w-10 rounded-xl bg-canvas-2 border border-hairline-strong overflow-hidden p-1.5">
                        <Image
                          src={study.logo}
                          alt={study.brand}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </span>
                    ) : null}
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-mute">
                      Case study · {study.category}
                    </span>
                  </div>
                </Reveal>

                <h1 className="display text-[clamp(2.5rem,6vw,5.5rem)] text-ink leading-[1.0] tracking-[-0.025em] mb-7">
                  <StaggerWords text={study.brand} />
                  <br />
                  <StaggerWords
                    text={study.metric.value}
                    delayStart={0.18}
                    wordClassName="italic font-normal text-copper"
                  />
                </h1>

                <Reveal delay={0.4}>
                  <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-xl mb-10">
                    {study.productName}. {study.outcome}
                  </p>
                </Reveal>

                <Reveal delay={0.5}>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-5 py-2.5 text-[0.9rem] font-medium hover:bg-ink-soft transition-all hover:-translate-y-0.5"
                    >
                      Brief us on your brand
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </Link>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mute">
                      Engagement · {study.duration}
                    </span>
                  </div>
                </Reveal>
              </div>

              {/* RIGHT — hero image */}
              <div className="lg:col-span-5">
                <Reveal delay={0.3}>
                  <div className="relative aspect-square rounded-[1.75rem] overflow-hidden bg-canvas-2 border border-hairline-strong shadow-[0_50px_120px_-40px_rgba(15,17,21,0.25)]">
                    <Image
                      src={study.image}
                      alt={`${study.brand} ${study.productName}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-contain"
                      priority
                    />
                    <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-ink/90 backdrop-blur px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-canvas">
                      <span className="h-1 w-1 rounded-full bg-copper" />
                      Featured · 2026
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ *
         * 02 · AT-A-GLANCE — 4 numbers + duration + headline metric
         * ============================================================ */}
        <section className="relative bg-canvas-2/60 border-y border-hairline py-12 md:py-16">
          <div className="container-x">
            <p className="eyebrow eyebrow-line mb-6">At a glance</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-8">
              <Stat label={study.metric.label} value={study.metric.value} highlight />
              {study.stats.slice(0, 4).map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ *
         * 03 · THE BRAND — intro paragraph, no fluff
         * ============================================================ */}
        <CaseSection
          number="03"
          eyebrow="The brand"
          title={`Meet ${study.brand}.`}
        >
          <p className="text-lg md:text-xl text-ink-soft leading-[1.7] max-w-2xl">
            {study.brand} sells {study.productName.toLowerCase()} into{" "}
            {study.category.toLowerCase()}. We met them at{" "}
            <span className="text-ink font-medium">
              the moment most operators stall
            </span>
            : the catalog was real, the demand was there, and the
            execution layer was the thing holding everything back.
          </p>
        </CaseSection>

        {/* ============================================================ *
         * 04 · CHALLENGE — what they came in with
         * ============================================================ */}
        <CaseSection
          number="04"
          eyebrow="The challenge"
          title="What we walked into."
          dark
        >
          <p className="text-lg md:text-xl leading-[1.7] max-w-2xl">{study.challenge}</p>
        </CaseSection>

        {/* ============================================================ *
         * 05 · APPROACH — services applied as a chip cloud
         * ============================================================ */}
        <CaseSection
          number="05"
          eyebrow="The approach"
          title="One team. Every lever."
        >
          <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-2xl mb-10">
            We didn&apos;t pick one service line and stop. The
            engagement spanned the whole stack — every move feeding the
            next.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {channelObjs.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-canvas px-4 py-2 text-sm text-ink hover:bg-ink hover:text-canvas hover:border-ink transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  {s.title}
                </Link>
              );
            })}
          </div>
        </CaseSection>

        {/* ============================================================ *
         * 06 · SOURCING & SUPPLY
         * ============================================================ */}
        <CaseSection number="06" eyebrow="Sourcing & supply" title="Built from the SKU up.">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <p className="text-base md:text-lg text-ink-soft leading-[1.7] mb-6">
                Manufacturer vetted across 3 candidates, samples
                shipped within 12 days, packaging spec locked. We
                handle the supplier dance so the founder gets to spend
                their week on brand work, not chasing replies.
              </p>
              <ul className="space-y-3 mt-6">
                {[
                  "Verified factories with QC photo reporting",
                  "MOQ + price negotiation handled in-language",
                  "Packaging redesign before first mass order",
                  "FBA prep + pallet labels per Amazon spec",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-ink-soft">
                    <CheckCircle2 className="h-4 w-4 mt-1 text-copper shrink-0" strokeWidth={2} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              {study.shots && study.shots[0] ? (
                <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-canvas-2 border border-hairline-strong">
                  <Image
                    src={study.shots[0]}
                    alt={`${study.brand} sourcing shot`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </CaseSection>

        {/* ============================================================ *
         * 07 · PHOTOGRAPHY — 6-shot pack
         * ============================================================ */}
        {study.shots && study.shots.length >= 4 ? (
          <CaseSection
            number="07"
            eyebrow="Photography"
            title="The whole pack — coherent across every channel."
          >
            <p className="text-base md:text-lg text-ink-soft leading-[1.7] max-w-2xl mb-10">
              Main image, infographic, lifestyle, scale shot,
              packaging, and 360°. Six frames of the same product,
              styled the same way, lit the same way — that&apos;s how
              the brand reads as one thing across Amazon, Shopify, and
              paid social.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {study.shots.slice(0, 6).map((src, i) => (
                <div
                  key={src}
                  className="group relative aspect-square rounded-[1.25rem] overflow-hidden bg-canvas-2 border border-hairline-strong"
                >
                  <Image
                    src={src}
                    alt={`${study.brand} shot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-canvas/95 backdrop-blur px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ink">
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </CaseSection>
        ) : null}

        {/* ============================================================ *
         * 08 · LISTING ARCHITECTURE
         * ============================================================ */}
        <CaseSection
          number="08"
          eyebrow="Listing architecture"
          title="Built for the algorithm and the shopper."
          dark
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-lg leading-[1.7] mb-6">
                Title hierarchy, bullet density, A+ Premium block flow,
                and Brand Store nav — re-architected so the catalog
                reads as one shoppable thing instead of a list of
                ASINs.
              </p>
              <ul className="space-y-3 mt-6">
                {[
                  "SEO-clean titles + 8-keyword density per bullet",
                  "A+ Premium with infographic-led blocks",
                  "Brand Store with category sub-pages",
                  "Variation parents wired to filter the right way",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-canvas/80">
                    <CheckCircle2 className="h-4 w-4 mt-1 text-copper shrink-0" strokeWidth={2} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="font-mono text-[0.78rem] leading-[1.7] text-canvas/65 bg-obsidian-soft/60 rounded-[1.25rem] p-6 md:p-7 border border-canvas/10">
              <p className="text-canvas mb-4 font-semibold tracking-wide">Listing checklist · v.2026</p>
              {[
                "✓  Title — primary keyword in first 80 chars",
                "✓  Bullets — feature → benefit → keyword pattern",
                "✓  Description — long-form keyword sweep",
                "✓  Backend — search terms / synonyms / typos",
                "✓  A+ Premium — 7 modules including video",
                "✓  Brand Store — homepage + 4 sub-pages",
                "✓  Variations — parent / child wired correctly",
                "✓  Compliance — category-specific claims pass",
              ].map((line) => (
                <p key={line} className="whitespace-pre">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </CaseSection>

        {/* ============================================================ *
         * 09 · ADS & GROWTH
         * ============================================================ */}
        <CaseSection
          number="09"
          eyebrow="Ads & growth"
          title="Margin tiers, manual + smart-auto."
        >
          <p className="text-base md:text-lg text-ink-soft leading-[1.7] max-w-2xl mb-10">
            Sponsored Products, Brands, and Display campaigns
            structured around your actual margin profile — not generic
            ACoS targets. Manual layered with smart-auto, never just
            one or the other.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                tier: "Tier 1 — Margin",
                body: "Hero SKUs · branded keywords · ACoS goal locked to margin floor.",
              },
              {
                tier: "Tier 2 — Discovery",
                body: "Auto + broad-match research · feeds keyword harvest weekly.",
              },
              {
                tier: "Tier 3 — Defense",
                body: "Sponsored Brands + Display retargeting on competitor traffic.",
              },
            ].map((c) => (
              <div
                key={c.tier}
                className="rounded-[1.25rem] border border-hairline-strong bg-canvas-2/40 p-6"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-copper mb-3">
                  {c.tier}
                </p>
                <p className="text-sm text-ink-soft leading-[1.6]">{c.body}</p>
              </div>
            ))}
          </div>
        </CaseSection>

        {/* ============================================================ *
         * 10 · SALES CHART — real Amazon screenshot
         * ============================================================ */}
        {study.salesChart ? (
          <CaseSection
            number="10"
            eyebrow="The receipts"
            title="Pulled directly from Seller Central."
          >
            <p className="text-base md:text-lg text-ink-soft leading-[1.7] max-w-2xl mb-8">
              No charts dressed up in our colors — this is the actual
              dashboard, year-to-date 2026.
            </p>
            <div className="relative w-full rounded-[1.5rem] overflow-hidden border border-hairline-strong bg-surface shadow-[0_30px_70px_-30px_rgba(15,17,21,0.22)]">
              <Image
                src={study.salesChart}
                alt={`${study.brand} Amazon sales snapshot`}
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="w-full h-auto"
              />
            </div>
          </CaseSection>
        ) : null}

        {/* ============================================================ *
         * 11 · OUTCOME — headline metric repeat + tight summary
         * ============================================================ */}
        <CaseSection
          number="11"
          eyebrow="The outcome"
          title="Same product, different trajectory."
          dark
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-7">
              <p className="display text-[clamp(3rem,6vw,5.5rem)] leading-[0.96] mb-4 tabular-nums">
                {study.metric.value}
              </p>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-canvas/60">
                {study.metric.label}
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="text-base md:text-lg leading-[1.7] text-canvas/80">
                {study.outcome}
              </p>
            </div>
          </div>
        </CaseSection>

        {/* ============================================================ *
         * 12 · QUOTE — pull-quote testimonial
         * ============================================================ */}
        {study.quote ? (
          <section className="relative bg-canvas py-20 md:py-28 border-y border-hairline overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 paper-grid opacity-30 pointer-events-none"
            />
            <div className="container-narrow relative text-center">
              <Quote className="h-10 w-10 md:h-12 md:w-12 text-copper/70 mx-auto mb-6" strokeWidth={1.5} />
              <p className="display text-[clamp(1.6rem,3.4vw,2.6rem)] text-ink leading-[1.25] mb-8 max-w-3xl mx-auto">
                &ldquo;{study.quote.text}&rdquo;
              </p>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-mute">
                — {study.quote.attribution}
              </p>
            </div>
          </section>
        ) : null}

        {/* ============================================================ *
         * 13 · TIMELINE — phased execution
         * ============================================================ */}
        {study.timeline && study.timeline.length ? (
          <CaseSection
            number="13"
            eyebrow="Timeline"
            title="What happened, in order."
          >
            <ol className="relative border-l border-hairline-strong pl-8 space-y-8">
              {study.timeline.map((p, i) => (
                <li key={p.phase} className="relative">
                  <span className="absolute -left-[2.35rem] top-1 grid place-items-center h-6 w-6 rounded-full bg-canvas border border-hairline-strong font-mono text-[0.62rem] text-ink">
                    {i + 1}
                  </span>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-copper mb-1.5">
                    {p.phase}
                  </p>
                  <p className="text-base md:text-lg text-ink-soft leading-[1.6] max-w-2xl">
                    {p.body}
                  </p>
                </li>
              ))}
            </ol>
          </CaseSection>
        ) : null}

        {/* ============================================================ *
         * 14 · TECH & PARTNERS — what we ran on
         * ============================================================ */}
        <CaseSection
          number="14"
          eyebrow="Tech & partners"
          title="What we ran the engagement on."
          dark
        >
          <div className="flex flex-wrap gap-3">
            {[
              "Amazon Seller Central",
              "Brand Registry",
              "A+ Premium",
              "Sponsored Ads",
              "Klaviyo",
              "Shopify",
              "Stripe",
              "DSP",
            ].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-canvas/20 bg-canvas/[0.04] px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-canvas/75"
              >
                · {tag}
              </span>
            ))}
          </div>
        </CaseSection>

        {/* ============================================================ *
         * 15 · NEXT CASE — prev / next nav + CTA
         * ============================================================ */}
        <section className="relative bg-canvas py-20 md:py-28 border-t border-hairline">
          <div className="container-x">
            <p className="eyebrow eyebrow-line mb-10">Keep reading</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <NextPrevCard study={prev} direction="prev" />
              <NextPrevCard study={next} direction="next" />
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}

/* ---------------------------------------------------------------- *
 * Re-usable building blocks
 * ---------------------------------------------------------------- */

function CaseSection({
  number,
  eyebrow,
  title,
  children,
  dark = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative py-20 md:py-28 border-b border-hairline",
        dark ? "bg-obsidian text-canvas" : "bg-canvas text-ink"
      )}
    >
      <div className="container-x">
        <Reveal>
          <div className="flex items-center gap-4 mb-6">
            <span
              className={cn(
                "font-mono text-[0.65rem] uppercase tracking-[0.2em]",
                dark ? "text-canvas/55" : "text-mute"
              )}
            >
              {number}
            </span>
            <span
              className={cn(
                "h-px flex-1 max-w-[3rem]",
                dark ? "bg-canvas/20" : "bg-hairline-strong"
              )}
            />
            <span
              className={cn(
                "font-mono text-[0.65rem] uppercase tracking-[0.22em]",
                dark ? "text-copper-soft" : "text-copper"
              )}
            >
              {eyebrow}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.04] mb-10 max-w-3xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>{children}</Reveal>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  highlight = false,
}: {
  value: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div className={cn(highlight && "md:col-span-1")}>
      <p
        className={cn(
          "display leading-none mb-2 tabular-nums",
          highlight ? "text-[clamp(1.75rem,3vw,2.5rem)] text-copper" : "text-[1.5rem] text-ink"
        )}
      >
        {value}
      </p>
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute">
        {label}
      </p>
    </div>
  );
}

function NextPrevCard({
  study,
  direction,
}: {
  study: CaseStudy;
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group relative rounded-[1.5rem] md:rounded-[1.75rem] overflow-hidden border border-hairline-strong bg-surface hover:shadow-[0_30px_70px_-30px_rgba(15,17,21,0.25)] transition-all"
    >
      <div className="grid grid-cols-[auto_1fr] items-stretch min-h-[10rem]">
        <div className="relative w-32 md:w-40 bg-canvas-2/40">
          <Image
            src={study.image}
            alt={study.brand}
            fill
            sizes="160px"
            className="object-contain"
          />
        </div>
        <div className="p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute mb-3">
            {direction === "prev" ? (
              <>
                <ArrowLeft className="h-3 w-3" strokeWidth={2.5} />
                Previous case
              </>
            ) : (
              <>
                Next case
                <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
              </>
            )}
          </div>
          <p className="display text-[1.4rem] leading-[1.05] mb-1 text-ink">
            {study.brand}
          </p>
          <p className="text-sm text-ink-soft">{study.metric.value}</p>
        </div>
      </div>
    </Link>
  );
}
