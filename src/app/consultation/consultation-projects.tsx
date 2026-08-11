import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { parseMetric } from "@/lib/parse-metric";
import { funnelProducts } from "./funnel-products";
import { cn } from "@/lib/utils";

/**
 * ConsultationProjects — page-specific portfolio. Not the homepage's
 * dense bento grid: four full-width, alternating editorial spotlights
 * so each result reads as a single big proof point instead of a wall
 * of tiles. `id="case-studies"` is kept so the hero's "See our
 * portfolio" anchor link still lands here.
 *
 * Reads `./funnel-products`, NOT `caseStudies` — this page shows full
 * product names and unabbreviated money figures, and that presentation
 * is deliberately isolated from the rest of the site. See that file for
 * the rules.
 */

function AnimatedMetric({ value, className }: { value: string; className?: string }) {
  const p = parseMetric(value);
  if (!p.animatable) return <span className={className}>{value}</span>;
  return <CountUp value={p.value} prefix={p.prefix} suffix={p.suffix} decimals={p.decimals} className={className} />;
}

export function ConsultationProjects() {
  return (
    <section id="case-studies" className="relative bg-canvas-2 py-28 md:py-36 scroll-mt-20">
      <div className="container-x">
        <SectionHeader
          align="center"
          eyebrow="Selected work"
          title="Real brands. Real numbers."
          subtitle="Four engagements, and the work behind each number."
          size="md"
        />

        <div className="mt-16 md:mt-20 max-w-6xl mx-auto space-y-16 md:space-y-24">
          {funnelProducts.map((study, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={study.slug}>
                <Link
                  href={`/work/${study.slug}`}
                  className={cn(
                    "group flex flex-col md:flex-row items-center gap-8 md:gap-14"
                  )}
                >
                  {/* image */}
                  <div
                    className={cn(
                      "relative w-full md:w-[48%] aspect-[4/3] rounded-[1.75rem] overflow-hidden bg-canvas border border-hairline-strong shrink-0",
                      reversed && "md:order-2"
                    )}
                  >
                    <Image
                      src={study.image}
                      alt={study.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 48vw"
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-4 left-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute bg-canvas/90 backdrop-blur rounded-full px-2.5 py-1 border border-hairline">
                      {study.category}
                    </span>
                  </div>

                  {/* content */}
                  <div
                    className={cn(
                      "flex-1 text-center md:text-left",
                      reversed && "md:order-1 md:text-right"
                    )}
                  >
                    {/* Sized down from the brand-only version: full
                        product names are 3-4x longer and were breaking
                        awkwardly against the image column. */}
                    <h3 className="display text-[clamp(1.5rem,3vw,2.25rem)] text-ink leading-[1.15] mb-4 text-balance">
                      {study.name}
                    </h3>
                    <p
                      className={cn(
                        "display text-[clamp(2.5rem,5vw,4rem)] leading-none text-ink mb-2 tabular-nums",
                        !reversed && "text-copper",
                        reversed && "text-electric"
                      )}
                    >
                      <AnimatedMetric value={study.metric.value} />
                    </p>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mute mb-5">
                      {study.metric.label}
                    </p>
                    <p
                      className={cn(
                        "text-base md:text-lg text-ink-soft leading-relaxed max-w-md mb-6",
                        reversed ? "md:ml-auto" : "mx-auto md:mx-0"
                      )}
                    >
                      {study.outcome}
                    </p>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink transition-colors group-hover:text-copper"
                      )}
                    >
                      View case study
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
