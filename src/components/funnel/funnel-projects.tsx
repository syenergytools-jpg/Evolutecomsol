"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { FunnelHeading } from "./funnel-heading";
import { CountUp } from "@/components/ui/count-up";
import { parseMetric } from "@/lib/parse-metric";
import { funnelAccent } from "./funnel-theme";
import type { FunnelContent } from "./funnel-types";

function AnimatedMetric({ value, className }: { value: string; className?: string }) {
  const p = parseMetric(value);
  if (!p.animatable) return <span className={className}>{value}</span>;
  return (
    <CountUp
      value={p.value}
      prefix={p.prefix}
      suffix={p.suffix}
      decimals={p.decimals}
      className={className}
    />
  );
}

/**
 * FunnelProjects — "Real brands. Real numbers." Renders `content.projects`
 * (page-specific — /amazon and /legal share the same real Amazon/FBA case
 * studies from funnel-projects-data.ts, /shopify shows its own real
 * Shopify builds instead, see shopify-content.ts), restyled entirely in
 * this page family's own dark card language instead of consultation's
 * light alternating-spotlight layout — a bordered card grid, matching
 * <FunnelFeatureGrid/> and <FunnelTestimonials/>, in the page's own
 * accent color and Plus Jakarta Sans (via <FunnelFontScope/>).
 */
export function FunnelProjects({ content }: { content: FunnelContent }) {
  const accent = funnelAccent[content.accent];

  return (
    <section className="relative bg-obsidian py-16 md:py-32">
      <div className="container-x">
        <FunnelHeading
          accent={content.accent}
          eyebrow="Selected work"
          title={{ lead: "Real brands.", accent: "Real numbers." }}
          subtitle={`${content.projects.length} engagement${content.projects.length === 1 ? "" : "s"}, and the work behind each number.`}
        />

        <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {content.projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <Link
                href={project.href ?? `/work/${project.slug}`}
                target={project.href ? "_blank" : undefined}
                rel={project.href ? "noopener noreferrer" : undefined}
                className="group h-full flex flex-col rounded-[1.5rem] border border-canvas/10 bg-canvas/[0.03] overflow-hidden transition-colors hover:bg-canvas/[0.06]"
              >
                <div className="relative aspect-[4/3] bg-canvas/[0.02]">
                  {/* loading="eager" — same Reveal-blocks-native-lazy-load
                      issue documented in funnel-hero.tsx's heroBadges. */}
                  <Image
                    src={project.image}
                    alt={`${project.company} ${project.product}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    loading="eager"
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-4 left-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-canvas/60 bg-obsidian/80 backdrop-blur rounded-full px-2.5 py-1 border border-canvas/10">
                    {project.category}
                  </span>
                </div>

                <div className="flex-1 flex flex-col p-6 md:p-7">
                  <h3 className="text-lg md:text-xl font-semibold text-canvas leading-snug mb-3 transition-colors duration-300 group-hover:text-canvas/90">
                    {project.company}
                    <span className="block text-canvas/50 font-normal">{project.product}</span>
                  </h3>

                  <p className={`display text-[clamp(1.8rem,4vw,2.5rem)] leading-none tabular-nums mb-1.5 ${accent.fg}`}>
                    <AnimatedMetric value={project.metric.value} />
                  </p>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-canvas/40 mb-4">
                    {project.metric.label}
                  </p>

                  <p className="text-base text-canvas/60 leading-relaxed mb-5">
                    {project.outcome}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-canvas/70 group-hover:text-canvas transition-colors">
                    {project.href ? "Visit live store" : "View case study"}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={2.2}
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
