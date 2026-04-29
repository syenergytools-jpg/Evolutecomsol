"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative bg-canvas py-28 md:py-36 border-t border-hairline"
    >
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            eyebrow="Questions"
            title="The honest FAQ."
            subtitle="The things real founders actually ask before signing."
            size="md"
          />
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-hairline">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b border-hairline">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-7 text-left group"
                  >
                    <span className="flex items-start gap-5 flex-1">
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute pt-1.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display text-xl md:text-2xl text-ink leading-tight">
                        {item.q}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "shrink-0 h-8 w-8 rounded-full border border-hairline flex items-center justify-center transition-all duration-500 mt-1",
                        isOpen
                          ? "bg-ink text-canvas border-ink rotate-45"
                          : "text-ink group-hover:border-ink"
                      )}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: PREMIUM_EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pl-12 pr-12 text-ink-soft text-base md:text-lg leading-relaxed max-w-2xl">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
