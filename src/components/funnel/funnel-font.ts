import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * Reference site (amzwealthautomation.com) loads Plus Jakarta Sans as
 * its primary type family (confirmed from its raw HTML's Google Fonts
 * link: `family=Plus+Jakarta+Sans:...|Inter:...|Barlow:...`, Plus
 * Jakarta Sans listed first/primary). Scoped to these 3 funnel pages
 * only — applied as a className + CSS-variable override on each
 * `{slug}-funnel.tsx` wrapper, so the rest of the site keeps Geist Sans
 * untouched. See that wrapper for how the override reaches `.display`/
 * `.eyebrow` (both reference `var(--font-geist-sans)` /
 * `var(--font-geist-mono)` directly, so redefining those two custom
 * properties within the wrapper's scope is what actually retargets
 * them — a plain `font-family` on the wrapper div would be overridden
 * right back by those two classes' own explicit declarations).
 */
export const funnelFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});
