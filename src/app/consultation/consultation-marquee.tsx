"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ConsultationMarquee — trust-builder ticker. Alternates the 8 service
 * lines with real credibility stats so it doubles as "here's everything
 * we do" and "here's proof it works" in one glance. Same `.marquee-track`
 * / `.fade-edges` recipe as the Footer's ticker (globals.css) — no new
 * CSS, just reused utilities.
 */
const ITEMS = [
  "Amazon Account Management",
  "240+ Brands Scaled",
  "Shopify & MERN Development",
  "$420M GMV Managed",
  "Branding & Listing Optimization",
  "4.9 / 5 Average Rating",
  "PPC & Advertising",
  "9 Years Operating",
  "Product Photography",
  "Product Sourcing",
  "Freight Forwarding",
  "Trademark & Patent Registration",
];

export function ConsultationMarquee() {
  const reduce = useReducedMotion();

  return (
    <div className="relative bg-obsidian py-5 md:py-6 border-y border-canvas/10 overflow-hidden fade-edges">
      <div
        className={cn(
          "flex gap-10 whitespace-nowrap",
          reduce ? "" : "marquee-track"
        )}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-3 font-mono text-[0.7rem] md:text-[0.78rem] uppercase tracking-[0.16em] text-canvas/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-copper shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
