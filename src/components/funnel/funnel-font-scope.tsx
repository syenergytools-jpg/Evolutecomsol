import type { CSSProperties, ReactNode } from "react";
import { funnelFont } from "./funnel-font";

/**
 * Wraps a funnel page's whole tree so it renders in Plus Jakarta Sans
 * instead of the site's Geist Sans — see funnel-font.ts for why. The
 * two custom properties are what actually retarget `.display`/`.eyebrow`
 * (globals.css), which read `var(--font-geist-sans)` /
 * `var(--font-geist-mono)` rather than a hardcoded stack.
 */
export function FunnelFontScope({ children }: { children: ReactNode }) {
  const vars: CSSProperties = {
    ["--font-geist-sans" as string]: funnelFont.style.fontFamily,
    ["--font-geist-mono" as string]: funnelFont.style.fontFamily,
  };

  return (
    <div className={funnelFont.className} style={vars}>
      {children}
    </div>
  );
}
