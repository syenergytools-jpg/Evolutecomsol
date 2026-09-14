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
