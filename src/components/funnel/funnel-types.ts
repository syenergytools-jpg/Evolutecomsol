import type { LucideIcon } from "lucide-react";
import type { FunnelAccent } from "./funnel-theme";
import type { FunnelHeadingText } from "./funnel-heading";
import type { FunnelProject } from "./funnel-projects-data";

export type FunnelFeature = {
  icon: LucideIcon;
  title: string;
  detail: string;
};

export type FunnelStat = {
  value: string;
  label: string;
};

export type FunnelTestimonial = {
  quote: string;
  name: string;
  role: string;
  photo: string;
  /**
   * Short "How X did Y" headline, styled like the reference site's
   * "How Shannon Made $123,000 With Amazon Automation" — must be a
   * number/outcome already stated in `quote` verbatim, not a new claim.
   */
  headline: string;
};

export type FunnelQualifyList = {
  heading: string;
  items: string[];
};

export type FunnelFaqItem = {
  q: string;
  a: string;
};

export type FunnelStepCopy = {
  title: string;
  sub?: string;
};

export type FunnelBadge = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Overrides the shared default rendered size — omit to keep it. */
  className?: string;
};

/**
 * One Seller Central "Sales Dashboard" screenshot, shown as a card in the
 * fanned stack in funnel-sales-proof.tsx. Any figure quoted in `alt` is
 * typed exactly as the screenshot shows it, with Amazon's own metric
 * labels — nothing rounded or renamed.
 */
export type FunnelSalesSnapshot = {
  /** Short card title, e.g. "12 months". */
  label: string;
  /** Exact date range the dashboard was filtered to, e.g. "Oct 1, 2025 – Sep 30, 2026". */
  range: string;
  image: { src: string; alt: string; width: number; height: number };
};

/**
 * Optional "sales dashboard proof" block — screenshots + a screen
 * recording of a real Seller Central account. Only /amazon sets it; it
 * can stand in for the testimonial card stack in the same slot (see the
 * SHOW_REVIEWS switch in src/app/amazon/amazon-funnel.tsx).
 */
export type FunnelSalesProof = {
  eyebrow: string;
  title: FunnelHeadingText;
  subtitle: string;
  /** Account + marketplace the screenshots belong to, e.g. "CalmCarry · United States". */
  account: string;
  snapshots: FunnelSalesSnapshot[];
  video: {
    src: string;
    eyebrow: string;
    title: FunnelHeadingText;
    /** Plain description of what the recording shows. */
    caption: string;
    /** Display string, e.g. "1:10 · No audio". */
    meta: string;
    /** Intrinsic size of the file — sets the player's aspect ratio. */
    width: number;
    height: number;
  };
};

/**
 * Full content contract for one funnel page. Every /legal, /amazon,
 * /shopify page is the SAME set of section components
 * (funnel-hero.tsx, funnel-qualify.tsx, etc.) rendered against a
 * different one of these — the structure/pattern stays identical
 * across all three, only the words and one accent color change.
 */
export type FunnelContent = {
  slug: "legal" | "amazon" | "shopify";
  accent: FunnelAccent;
  seo: {
    title: string;
    description: string;
  };
  urgency: {
    message: string;
  };
  hero: {
    eyebrow: string;
    headlineLead: string;
    headlineAccent: string;
    badge: string;
    subhead: string;
    disclaimer: string;
    ctaLabel: string;
    /** Trust badges shown below the CTA — real credentials only, and
     *  page-specific (e.g. Shopify's own "Shopify Certified" seal isn't
     *  relevant on /amazon or /legal). See funnel-hero.tsx.
     *  `className` optionally overrides the default rendered height
     *  (e.g. Shopify's seals read better larger than the Amazon
     *  SPN/Trustpilot wordmarks) — omit to keep the shared default. */
    heroBadges: FunnelBadge[];
  };
  stats: FunnelStat[];
  explainer: {
    eyebrow: string;
    title: FunnelHeadingText;
    paragraphs: string[];
    distinction: string;
  };
  features: {
    eyebrow: string;
    title: FunnelHeadingText;
    subtitle: string;
    items: FunnelFeature[];
    ctaLabel: string;
  };
  qualify: {
    eyebrow: string;
    title: FunnelHeadingText;
    not: FunnelQualifyList;
    is: FunnelQualifyList;
    ctaLabel: string;
  };
  testimonials: {
    eyebrow: string;
    title: FunnelHeadingText;
    items: FunnelTestimonial[];
  };
  /** Seller Central sales-dashboard proof — /amazon only; see FunnelSalesProof. */
  salesProof?: FunnelSalesProof;
  team: {
    eyebrow: string;
    title: FunnelHeadingText;
    subtitle: string;
    /** Credential/trust badges shown below the team photo —
     *  page-specific (e.g. legal's own credential seals aren't relevant
     *  on /amazon or /shopify's "Top 10 Ecommerce Leaders" award, and
     *  vice versa). See funnel-team.tsx. */
    badges: FunnelBadge[];
  };
  faq: {
    eyebrow: string;
    title: FunnelHeadingText;
    items: FunnelFaqItem[];
  };
  commitment: {
    eyebrow: string;
    title: FunnelHeadingText;
    /** Big number inside the reference-style ring badge — must already
     *  appear elsewhere on the page (the stats bar, or a point below);
     *  never a new figure invented just for the badge. */
    badge: { value: string; label: string };
    body: string;
    points: { title: string; detail: string }[];
    ctaLabel: string;
  };
  finalCta: {
    title: FunnelHeadingText;
    subtitle: string;
    ctaLabel: string;
    note: string;
  };
  stepCopy: FunnelStepCopy[];
  /** "Real brands. Real numbers." project cards — page-specific (see
   *  funnel-projects-data.ts's note: /amazon and /legal share the same
   *  4 Amazon/FBA case studies, /shopify shows its own real Shopify
   *  builds instead). */
  projects: FunnelProject[];
};
