import type { CSSProperties } from "react";

/**
 * Shared accent system for the /legal, /amazon, /shopify funnel pages.
 * Each page picks ONE accent so its buttons, numbers, and glows read as
 * a distinct brand moment instead of all three pages looking identical.
 *
 * Values are drawn straight from globals.css's existing tokens (electric
 * / copper / emerald) — no new colors invented. "Brighter than the
 * reference" comes from using three saturated hues across the three
 * pages instead of one muted copper everywhere.
 */
export type FunnelAccent = "electric" | "copper" | "emerald" | "lime";

export const funnelAccent: Record<
  FunnelAccent,
  {
    fg: string;
    tint: string;
    tintStrong: string;
    /** Solid fill + hover, safe as Tailwind classes — only `border-*`
     *  color utilities are defeated by the unlayered rule below, not `bg-*`. */
    solid: string;
    hex: string;
    glow: string;
    glowSoft: string;
  }
> = {
  electric: {
    fg: "text-electric",
    tint: "bg-electric/10",
    tintStrong: "bg-electric/15",
    solid: "bg-electric hover:bg-electric-glow text-white",
    hex: "var(--electric)",
    glow: "rgba(0,102,255,0.45)",
    glowSoft: "rgba(0,102,255,0.22)",
  },
  copper: {
    fg: "text-copper",
    tint: "bg-copper/10",
    tintStrong: "bg-copper/15",
    solid: "bg-copper hover:bg-copper-soft text-white",
    hex: "var(--copper)",
    glow: "rgba(232,112,74,0.45)",
    glowSoft: "rgba(232,112,74,0.22)",
  },
  emerald: {
    fg: "text-emerald",
    tint: "bg-emerald/10",
    tintStrong: "bg-emerald/15",
    solid: "bg-emerald hover:bg-emerald/85 text-white",
    hex: "var(--emerald)",
    glow: "rgba(16,185,129,0.45)",
    glowSoft: "rgba(16,185,129,0.22)",
  },
  lime: {
    fg: "text-lime",
    tint: "bg-lime/10",
    tintStrong: "bg-lime/15",
    // Lime is a bright yellow-green — every existing bg-lime use
    // site-wide (tech-stack.tsx, services.tsx, avatar.tsx, etc.) pairs
    // it with dark ink text, never white, for contrast.
    solid: "bg-lime hover:bg-lime/85 text-ink",
    hex: "var(--lime)",
    glow: "rgba(217,255,60,0.45)",
    glowSoft: "rgba(217,255,60,0.22)",
  },
};

/**
 * Inline border-color style, required rather than a `border-<color>`
 * utility: globals.css has an UNLAYERED `* { border-color: var(--hairline) }`
 * that beats every Tailwind border-color utility regardless of specificity
 * (see globals.css:86 and the repeated notes across consultation-*.tsx).
 */
export function accentBorder(accent: FunnelAccent, pct = 30): CSSProperties {
  return {
    borderColor: `color-mix(in oklab, ${funnelAccent[accent].hex} ${pct}%, transparent)`,
  };
}
