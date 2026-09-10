"use client";

import { Users, Layers, Target, Clock, TrendingUp, Globe, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { PillButton } from "@/components/ui/pill-button";
import { cn } from "@/lib/utils";
import { useBookingModal } from "./consultation-booking-modal";

/**
 * ConsultationWhyUs â€” page-specific "why us," written to convert, not
 * just inform. Deliberately NOT the homepage's bordered 3-col card grid
 * or a tab switcher: a single-column zigzag list reads calmer and more
 * editorial, with everything visible at once and nothing hidden behind
 * a click. Ends in a CTA â€” this is the second ask in the funnel.
 */
const REASONS: { title: string; detail: string; icon: LucideIcon }[] = [
  {
    title: "You get operators, not account managers",
    detail:
      "We've personally scaled brands past 8 figures. Book a call and you're talking to the person who runs the account, not a rep reading from a script.",
    icon: Users,
  },
  {
    title: "One team owns your entire funnel",
    detail:
      "Sourcing, listings, photography, and ads compound when one team owns them. No more chasing five vendors who blame each other when something breaks.",
    icon: Layers,
  },
  {
    title: "We already know what your buyers search for",
    detail:
      "Content and ad targeting built around real shopper intent, not guesses. That's the gap between page 3 and page 1.",
    icon: Target,
  },
  {
    title: "You're never waiting on a reply",
    detail:
      "Email, phone, WhatsApp, live chat. A real operator replies within the hour, 24/7. Time zones are not your problem to solve.",
    icon: Clock,
  },
  {
    title: "We win when you win",
    detail:
      "Engagements are scoped by outcomes, not billable hours. If the number doesn't move, neither does our invoice.",
    icon: TrendingUp,
  },
  {
    title: "Premium execution, without the premium markup",
    detail:
      "Studio operations in Jhelum, results across 4 continents. Same caliber of work, without the price tag that comes with a fancier zip code.",
    icon: Globe,
  },
];

const ACCENTS = [
  { fg: "text-electric", tint: "bg-electric/10", glow: "rgba(0,102,255,0.4)" },
  { fg: "text-copper", tint: "bg-copper/12", glow: "rgba(232,112,74,0.4)" },
  { fg: "text-emerald", tint: "bg-emerald/12", glow: "rgba(16,185,129,0.4)" },
] as const;

export function ConsultationWhyUs() {
  const { open } = useBookingModal();

  return (
    <section className="relative bg-canvas py-16 md:py-36 overflow-hidden">
      <div className="container-x relative">
        <SectionHeader
          align="center"
          eyebrow="Why Evolut"
          title="Six reasons brands choose us."
          size="md"
        />

        <div className="mt-16 md:mt-20 max-w-4xl mx-auto">
          {REASONS.map((item, i) => {
            const Icon = item.icon;
            const accent = ACCENTS[i % ACCENTS.length];
            const reversed = i % 2 === 1;
            return (
              <Reveal key={item.title} delay={0}>
                <div className="relative">
                  {/* always-on ambient wash behind the row â€” subtle, not just on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-4 -inset-x-4 md:-inset-x-8 rounded-[2rem] opacity-[0.05] pointer-events-none"
                    style={{ background: accent.glow }}
                  />
                  <div
                    className={cn(
                      "group relative flex flex-col md:flex-row items-center gap-6 md:gap-14 py-10 md:py-12",
                      i > 0 && "border-t border-hairline",
                      reversed && "md:flex-row-reverse"
                    )}
                  >
                    {/* icon + number */}
                    <div className="relative shrink-0">
                      <span
                        aria-hidden="true"
                        className="absolute -inset-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                        style={{ background: accent.glow }}
                      />
                      <div
                        className={cn(
                          "relative h-24 w-24 md:h-28 md:w-28 rounded-full grid place-items-center transition-transform duration-500 group-hover:scale-105 pulse-ring",
                          accent.tint,
                          accent.fg
                        )}
                      >
                        <Icon className={cn("h-9 w-9 md:h-10 md:w-10", accent.fg)} strokeWidth={1.6} />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 h-8 w-8 rounded-full bg-canvas border border-hairline-strong grid place-items-center font-mono text-[0.65rem] text-mute">
                        0{i + 1}
                      </span>
                    </div>

                    {/* text */}
                    <div
                      className={cn(
                        "flex-1 text-center md:text-left",
                        reversed && "md:text-right"
                      )}
                    >
                      <h3 className="display text-[clamp(1.3rem,3vw,2.15rem)] text-ink leading-tight mb-2.5 text-balance">
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          "text-base md:text-lg text-ink-soft leading-relaxed max-w-md",
                          reversed ? "md:ml-auto" : "mx-auto md:mx-0"
                        )}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 md:mt-20 text-center">
            <PillButton onClick={open} variant="ink" size="lg">
              Book your consultation
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
