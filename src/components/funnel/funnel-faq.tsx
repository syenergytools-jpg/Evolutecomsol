"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { FunnelHeading } from "./funnel-heading";
import { funnelAccent } from "./funnel-theme";
import type { FunnelContent } from "./funnel-types";

/**
 * FunnelFaq — accordion. Items come from `content.faq.items`: each page
 * mixes in the relevant slice of site-config's real `faqs` plus one or
 * two page-specific questions written fresh for that service.
 */
export function FunnelFaq({ content }: { content: FunnelContent }) {
  const [open, setOpen] = useState<number | null>(0);
  const accent = funnelAccent[content.accent];

  return (
    <section className="relative bg-obsidian-soft py-16 md:py-32">
      <div className="container-narrow">
        <FunnelHeading
          accent={content.accent}
          eyebrow={content.faq.eyebrow}
          title={content.faq.title}
        />

        <div className="mt-12 md:mt-14 max-w-2xl mx-auto divide-y divide-canvas/10 border-t border-b border-canvas/10">
          {content.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.03}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group w-full flex items-center justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "text-lg md:text-xl font-medium transition-colors duration-300",
                        isOpen ? accent.fg : "text-canvas group-hover:text-canvas/80"
                      )}
                    >
                      {item.q}
                    </span>
                    <Plus
                      className={cn(
                        "h-5 w-5 shrink-0 transition-all duration-300",
                        isOpen ? cn(accent.fg, "rotate-45") : "text-canvas/50"
                      )}
                      strokeWidth={2.2}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-base md:text-lg text-canvas/60 leading-relaxed pr-8">
                        {item.a}
                      </p>
                    </div>
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
