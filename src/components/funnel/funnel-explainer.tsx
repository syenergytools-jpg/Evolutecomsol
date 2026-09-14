"use client";

import { Reveal } from "@/components/ui/reveal";
import { FunnelHeading } from "./funnel-heading";
import { funnelAccent, accentBorder } from "./funnel-theme";
import type { FunnelContent } from "./funnel-types";

/**
 * FunnelExplainer — "the model in plain English", the reference site's
 * calm, unhyped middle beat right after the stats bar: a couple of
 * short paragraphs, then one bolded line drawing the boundary around
 * what this is NOT (their "Not dropshipping. Not reselling." move).
 */
export function FunnelExplainer({ content }: { content: FunnelContent }) {
  const accent = funnelAccent[content.accent];

  return (
    <section className="relative bg-obsidian py-16 md:py-32">
      <div className="container-narrow">
        <FunnelHeading
          accent={content.accent}
          eyebrow={content.explainer.eyebrow}
          title={content.explainer.title}
          size="md"
        />

        <div className="mt-10 md:mt-12 max-w-2xl mx-auto space-y-5">
          {content.explainer.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-lg md:text-xl text-canvas/70 leading-[1.7] text-center">
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p
            className="mt-9 md:mt-10 mx-auto max-w-xl rounded-2xl border px-6 py-4 text-center text-lg md:text-xl font-medium italic text-canvas transition-colors duration-300"
            style={{
              ...accentBorder(content.accent),
              background: `color-mix(in oklab, ${accent.hex} 10%, transparent)`,
            }}
          >
            {content.explainer.distinction}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
