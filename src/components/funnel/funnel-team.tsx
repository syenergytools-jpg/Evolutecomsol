"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { FunnelHeading } from "./funnel-heading";
import { funnelAccent } from "./funnel-theme";
import type { FunnelContent } from "./funnel-types";

/**
 * FunnelTeam — "the people behind your account", now a single real
 * team photo (the user's own `/public/team-image.jpg`, 625×350 —
 * matches `aspect-video` almost exactly, so `object-cover` crops
 * nothing meaningful) rather than the earlier per-operator headshot
 * grid, matching the reference site's one-photo team section. Followed
 * by `content.team.badges` — real, page-specific credential badges
 * (e.g. /amazon and /shopify's "Top 10 Ecommerce Leaders" award vs.
 * /legal's own credential seals, see each *-content.ts). All
 * `loading="eager"` — see the same note in funnel-hero.tsx on why an
 * image inside a <Reveal> can't reliably rely on native lazy-loading.
 */
export function FunnelTeam({ content }: { content: FunnelContent }) {
  const accent = funnelAccent[content.accent];

  return (
    <section className="relative bg-obsidian py-16 md:py-32">
      <div className="container-x">
        <FunnelHeading
          accent={content.accent}
          eyebrow={content.team.eyebrow}
          title={content.team.title}
          subtitle={content.team.subtitle}
        />

        <Reveal delay={0.1}>
          <div className="mt-14 md:mt-16 max-w-4xl mx-auto relative">
            <span
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] opacity-30 blur-2xl pointer-events-none"
              style={{ background: accent.glowSoft }}
            />
            <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-canvas/10">
              <Image
                src="/team-image.jpg"
                alt="The Evolut team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-14 md:gap-24">
            {content.team.badges.map((badge) => (
              <Image
                key={badge.src}
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                loading="eager"
                className={cn(badge.className ?? "h-36 md:h-44", "w-auto rounded-lg")}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
