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

  // `funnel-theme` (globals.css) pins the colour tokens back to the
  // site's original light-theme values, so these funnel pages keep their
  // locked look while the rest of the site is dark + copper.
  return (
    <div className={`funnel-theme ${funnelFont.className}`} style={vars}>
      {children}
    </div>
  );
}
