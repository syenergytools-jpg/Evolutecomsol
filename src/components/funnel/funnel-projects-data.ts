/* ------------------------------------------------------------------ *
 * Funnel project/case-study data — the same 4 real engagements shown
 * on /consultation ("Real brands. Real numbers.", see
 * src/app/consultation/funnel-products.ts), duplicated here rather than
 * imported so this funnel component family stays fully independent of
 * consultation's files (same reasoning as funnel-stats-hooks.ts /
 * funnel-form.tsx) — editing one can never silently change the other.
 *
 * Numbers, names, and outcome copy are verbatim from that file — do NOT
 * "fix" a figure here against site-config's own case-study numbers if
 * they ever look like they disagree; that divergence is intentional and
 * already flagged in this project's memory (funnel-only figures use
 * full unabbreviated dollar amounts, not the same rounding as the main
 * site's /work pages).
 *
 * Shown identically across all three funnel pages (Amazon/Shopify/
 * Legal) rather than filtered per page — none of these 4 case studies
 * is tagged "shopify" in site-config's real `channels` data, so a
 * Shopify-specific subset would have nothing honest to show; these are
 * the company's flagship proof points regardless of which page a
 * visitor entered through.
 * ------------------------------------------------------------------ */

export type FunnelProject = {
  /** Links to the real /work/<slug> case study page. */
  slug: string;
  company: string;
  product: string;
  category: string;
  image: string;
  metric: { value: string; label: string };
  outcome: string;
};

export const funnelProjects: FunnelProject[] = [
  {
    slug: "gloco-calm-carry-us",
    company: "Glowco International LLC",
    product: "Calm Carry",
    category: "Wellness · Personal Care",
    image: "/stats/products/gloco/1.webp",
    metric: { value: "$5,287,932", label: "Total sales" },
    outcome:
      "Sourced, photographed, listed, and scaled in one continuous loop. From first sample to a category-leading listing inside the year.",
  },
  {
    slug: "squirtz-water-enhancer-us",
    company: "Squirtz",
    product: "Water Enhancer",
    category: "Beverage · CPG",
    image: "/stats/products/Squirtz_drink/1.webp",
    metric: { value: "+412%", label: "Revenue · 6 months" },
    outcome:
      "Re-shot every SKU in studio, restructured campaigns into margin tiers, and rebuilt the brand store as a single shoppable experience.",
  },
  {
    slug: "pawsteps-dog-ramp-us",
    company: "PawSteps",
    product: "Foldable Dog Ramp",
    category: "Pets · Mobility",
    image: "/stats/products/Dog_Stand/1.jpg",
    metric: { value: "$1,298,588", label: "GMV · 12 months" },
    outcome:
      "Lifestyle photography pack + email/SMS lifecycle wired into Klaviyo. Range expanded from 1 SKU to 4.",
  },
  {
    slug: "shilajit-resin-au",
    company: "Shilajit Co.",
    product: "Resin",
    category: "Supplements · Nutrition",
    image: "/stats/products/shilajit/1.jpg",
    metric: { value: "5.2×", label: "GMV · 9 months" },
    outcome:
      "Sourcing partner vetted, packaging redesigned, listing copy rewritten for the AU shopper. Brand Registry filed and approved.",
  },
];
