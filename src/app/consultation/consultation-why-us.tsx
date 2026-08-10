import { Users, Layers, Target, Clock, TrendingUp, Globe, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { whyUs } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * ConsultationWhyUs — page-specific "why us." Deliberately NOT the
 * homepage's bordered 3-col card grid: a single-column zigzag list reads
 * calmer and more editorial for a funnel page, with nothing to click and
 * nothing hidden behind a tab.
 */
const ICONS: LucideIcon[] = [Users, Layers, Target, Clock, TrendingUp, Globe];

const ACCENTS = [
  { fg: "text-electric", tint: "bg-electric/10", glow: "rgba(0,102,255,0.35)" },
  { fg: "text-copper", tint: "bg-copper/12", glow: "rgba(232,112,74,0.35)" },
  { fg: "text-emerald", tint: "bg-emerald/12", glow: "rgba(16,185,129,0.35)" },
] as const;

export function ConsultationWhyUs() {
  return (
    <section className="relative bg-canvas py-28 md:py-36">
      <div className="container-x">
        <SectionHeader
          align="center"
          eyebrow="Why Evolut"
          title="Six reasons brands choose us."
          size="md"
        />

        <div className="mt-16 md:mt-20 max-w-4xl mx-auto">
          {whyUs.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const accent = ACCENTS[i % ACCENTS.length];
            const reversed = i % 2 === 1;
            return (
              <Reveal key={item.title} delay={0}>
                <div
                  className={cn(
                    "group flex flex-col md:flex-row items-center gap-6 md:gap-14 py-10 md:py-12",
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
                        "relative h-24 w-24 md:h-28 md:w-28 rounded-full grid place-items-center transition-transform duration-500 group-hover:scale-105",
                        accent.tint
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
                    <h3 className="display text-[clamp(1.5rem,3vw,2.15rem)] text-ink leading-tight mb-2.5">
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
