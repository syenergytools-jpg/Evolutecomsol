"use client";

import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { parseMetric } from "@/lib/parse-metric";
import { funnelAccent } from "./funnel-theme";
import type { FunnelContent } from "./funnel-types";

function AnimatedStat({ value, className }: { value: string; className?: string }) {
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
 * FunnelStatsBar — the reference site's 4-number credibility row
 * ("100+ Active Partner Stores", "$24M+ Generated"...). Every number
 * here is real and traceable to site-config (stats / deepStats /
 * ipAccelerator.stats depending on the page) — see each page's
 * *-content.ts for which source it pulls from.
 */
export function FunnelStatsBar({ content }: { content: FunnelContent }) {
  const accent = funnelAccent[content.accent];

  return (
    <section className="relative bg-obsidian border-y border-canvas/10 py-12 md:py-16">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 text-center">
            {content.stats.map((s) => (
              <div key={s.label} className="group">
                <p className={`display text-[clamp(1.9rem,4.6vw,3.25rem)] leading-none transition-transform duration-300 group-hover:scale-105 ${accent.fg}`}>
                  <AnimatedStat value={s.value} />
                </p>
                <p className="mt-2.5 font-mono text-[0.68rem] sm:text-[0.74rem] uppercase tracking-[0.12em] text-canvas/55 leading-snug">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
