"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { FunnelHeading } from "./funnel-heading";
import { funnelAccent } from "./funnel-theme";
import type { FunnelContent } from "./funnel-types";

/**
 * FunnelTestimonials — big circular photo + "How X did Y" headline,
 * matching the reference site's "How Shannon Made $123,000 With Amazon
 * Automation" layout. Every headline/quote is real, from site-config's
 * `testimonials` — see each *-content.ts for the "no new claim, just
 * restyled" rule behind the headlines.
 */
const NUMBER_RE = /(\$[\d,]+(?:\.\d+)?\+?|\d+(?:\.\d+)?[×%]|\d+\s+(?:weeks?|months?|days?|years?))/i;

function Highlighted({ text, accentClass }: { text: string; accentClass: string }) {
  const match = text.match(NUMBER_RE);
  if (!match || match.index === undefined) return <>{text}</>;
  const before = text.slice(0, match.index);
  const hit = match[0];
  const after = text.slice(match.index + hit.length);
  return (
    <>
      {before}
      <span className={accentClass}>{hit}</span>
      {after}
    </>
  );
}

export function FunnelTestimonials({ content }: { content: FunnelContent }) {
  const accent = funnelAccent[content.accent];

  return (
    <section className="relative bg-obsidian-soft py-16 md:py-32">
      <div className="container-x">
        <FunnelHeading
          accent={content.accent}
          eyebrow={content.testimonials.eyebrow}
          title={content.testimonials.title}
        />

        <div className="mt-14 md:mt-20 max-w-4xl mx-auto space-y-14 md:space-y-20">
          {content.testimonials.items.map((t, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={t.name} delay={i * 0.06}>
                <div
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-7 md:gap-12",
                    reversed && "md:flex-row-reverse"
                  )}
                >
                  <div className="relative shrink-0">
                    <span
                      aria-hidden="true"
                      className="absolute -inset-4 rounded-full opacity-40 blur-2xl"
                      style={{ background: accent.glowSoft }}
                    />
                    <span
                      className="relative block h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden"
                      style={{ boxShadow: `0 0 0 4px ${accent.hex}` }}
                    >
                      <Image
                        src={t.photo}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </span>
                  </div>

                  <div className={cn("flex-1 text-center", reversed ? "md:text-right" : "md:text-left")}>
                    <h3 className="display text-[clamp(1.6rem,3.8vw,2.5rem)] leading-[1.2] text-canvas mb-4 text-balance">
                      <Highlighted text={t.headline} accentClass={cn(accent.fg, "italic font-normal")} />
                    </h3>
                    <p className="italic text-lg md:text-xl text-canvas/65 leading-relaxed mb-4">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="text-base font-semibold text-canvas">
                      {t.name}
                      <span className="text-canvas/45 font-normal"> · {t.role}</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
