/* ------------------------------------------------------------------ *
 * Funnel-only product list
 *
 * The four case studies shown on /consultation, with their own naming
 * and number formatting. Deliberately SELF-CONTAINED rather than
 * derived from `caseStudies` in site-config: this page runs on paid
 * traffic and needs its own presentation rules, and editing it must
 * never move a number or a name anywhere else on the site (or the
 * reverse). Nothing outside src/app/consultation/ should import this.
 *
 * Two rules this page applies that the main site does not:
 *
 * 1. FULL PRODUCT NAMES. The main site's cards show the brand alone
 *    ("Gloco"); ad traffic has no prior context, so the funnel shows
 *    brand + product ("Gloco Calm Carry").
 *
 * 2. NO ABBREVIATED MONEY. No "$1.2M" — write the whole number, with
 *    thousands separators and nothing after the decimal point. An
 *    abbreviation reads as an estimate; $1,200,000 reads as a figure
 *    someone actually counted. `parseMetric` + `<CountUp>` handle
 *    these strings unchanged (commas stripped for the animation, then
 *    re-inserted by CountUp's default thousands formatting).
 *
 * `slug` still points at the real /work/<slug> case study, so the
 * "View case study" link keeps working.
 * ------------------------------------------------------------------ */

export type FunnelProduct = {
  /** Links to /work/<slug> — must match a real case study slug. */
  slug: string;
  /**
   * Client company, as they trade. Split from `product` on purpose: the
   * portfolio card renders them on separate lines, and the hero stat
   * label uses the company alone.
   *
   * Only Glowco's full legal name has been confirmed by the client —
   * don't append "LLC"/"Inc" to the others on a guess.
   */
  company: string;
  /** The product itself, shown on its own line under the company. */
  product: string;
  category: string;
  image: string;
  metric: { value: string; label: string };
  outcome: string;
};

export const funnelProducts: FunnelProduct[] = [
  {
    slug: "gloco-calm-carry-us",
    company: "Glowco International LLC",
    product: "Calm Carry",
    category: "Wellness · Personal Care",
    image: "/stats/products/gloco/1.webp",
    // Client-supplied figure, whole dollars only. Note this is the
    // funnel's number: /work/gloco-calm-carry-us still shows the
    // $614,536.70 YTD snapshot from site-config.
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

export function funnelProduct(slug: string): FunnelProduct | undefined {
  return funnelProducts.find((p) => p.slug === slug);
}
