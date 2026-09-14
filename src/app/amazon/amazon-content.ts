import { Layers, Search, Package, Megaphone, TrendingUp, Target } from "lucide-react";
import { testimonials } from "@/lib/site-config";
import { funnelProjects } from "@/components/funnel/funnel-projects-data";
import type { FunnelContent } from "@/components/funnel/funnel-types";

/**
 * /amazon funnel content.
 *
 * Numbers below mirror `stats` in src/lib/site-config.ts (240+ active
 * brands, 3.4x ROAS lift, 18,000+ ASINs, 9 years) — kept as literals
 * here rather than computed from that array, same reasoning as
 * src/app/consultation/funnel-products.ts: this page needs its own
 * presentation rules (a bare $-suffix vs. a label), and editing it must
 * never silently move a number shown anywhere else on the site.
 */
export const amazonContent: FunnelContent = {
  slug: "amazon",
  accent: "copper",

  seo: {
    title: "Amazon Account Management: Free Audit",
    description:
      "Done-for-you Amazon Seller Central, Vendor Central, and FBA management: listings, PPC, inventory, and brand protection, run by an operator team that has scaled 240+ Amazon brands.",
  },

  urgency: {
    message:
      "Now booking free Amazon account audits. See exactly what's costing you sales.",
  },

  hero: {
    eyebrow: "Amazon Account Management",
    headlineLead: "We Run Your Amazon Business.",
    headlineAccent: "You Keep the Upside.",
    badge: "Built for Seller Central, Vendor Central & FBA, new or existing accounts.",
    subhead:
      "Listings, PPC, inventory, and brand protection, run end to end by an operator team that's scaled 240+ Amazon brands, not a rep reading a dashboard.",
    disclaimer:
      "This is a hands-on account management engagement, not a passive investment. Results depend on product, budget, and category. Full terms are covered on the call.",
    ctaLabel: "Book Your Free Amazon Audit",
    // Smaller pre-`sm:`: at the shared default h-16, this wide SPN
    // wordmark + the Trustpilot mark together overflowed a 375px row
    // and wrapped to 2 lines.
    heroBadges: [
      { src: "/badges/hero-badge-1.avif", alt: "Amazon SPN Certified: Service Provider Network", width: 1282, height: 297, className: "h-12 sm:h-16 md:h-20" },
      { src: "/badges/hero-badge-2.avif", alt: "Trustpilot: 5 star rating", width: 1400, height: 700, className: "h-12 sm:h-16 md:h-20" },
    ],
  },

  stats: [
    { value: "240+", label: "Active brands managed" },
    { value: "3.4×", label: "Avg ROAS lift in 90 days" },
    { value: "18,000+", label: "ASINs optimized" },
    { value: "9", label: "Years of operator experience" },
  ],

  explainer: {
    eyebrow: "How it works",
    title: { lead: "The engagement,", accent: "in plain English." },
    paragraphs: [
      "We plug into your Amazon account as your operator team, running listings, PPC, inventory, and pricing the way we'd run our own.",
      "You keep full ownership of your Seller Central or Vendor Central account and your brand. We're the team behind it, reporting to you every month in plain numbers.",
    ],
    distinction:
      "This is hands-on account management. Not a course. Not a done-with-you template. Not equity in your business. It stays 100% yours.",
  },

  features: {
    eyebrow: "What this looks like in practice",
    title: { lead: "Everything your Amazon account needs,", accent: "run by one team." },
    subtitle:
      "Six disciplines that normally mean six different vendors, under one accountable roof.",
    ctaLabel: "See If You Qualify",
    items: [
      {
        icon: Layers,
        title: "Channel optimization",
        detail:
          "Vendor Central, Seller Central, and FBA, structured and run by people who've owned the P&L on all three, not just watched a dashboard.",
      },
      {
        icon: Search,
        title: "Listing SEO that ranks",
        detail:
          "Titles, bullets, descriptions, and backend keywords rebuilt around what shoppers actually type into the search bar.",
      },
      {
        icon: Package,
        title: "Inventory & stock tracking",
        detail:
          "Real-time visibility into availability, so you're never caught out-of-stock during a spike or over-ordering into storage fees.",
      },
      {
        icon: Megaphone,
        title: "Sponsored Products & PPC",
        detail:
          "Manual campaigns layered with smart automation, structured around your real margin, not a flat ACoS target that ignores it.",
      },
      {
        icon: TrendingUp,
        title: "Pricing & profit maximization",
        detail:
          "Continuous price and margin tuning, so growth in sales actually shows up as growth in profit.",
      },
      {
        icon: Target,
        title: "Brand presence & SWOT",
        detail:
          "A running read on where you stand against the competition, and what to fix first.",
      },
    ],
  },

  qualify: {
    eyebrow: "Is this for you?",
    title: { lead: "Let's see if", accent: "we're the right fit." },
    ctaLabel: "See If You Qualify",
    not: {
      heading: "This is NOT for you if...",
      items: [
        "You want a “set it and forget it” listing fix with zero ongoing ad budget.",
        "You're not open to an operator team having real access to run the account, not just advise on it.",
        "You expect page-one rank in week one. Real ACoS improvement takes a real testing cycle.",
        "You're looking for a one-time gig, not an ongoing management relationship.",
      ],
    },
    is: {
      heading: "This IS for you if...",
      items: [
        "You already have, or are ready to launch, a Seller Central or Vendor Central account.",
        "You want an accountable team running PPC, listings, and inventory day to day.",
        "You think in 90-day cycles, not 90-hour hacks.",
        "You want full visibility into ad spend, ACoS, and profit, not a black box.",
      ],
    },
  },

  testimonials: {
    eyebrow: "Client voices",
    title: { lead: "Real accounts.", accent: "Real operators." },
    // Headlines below extract a number already stated verbatim in each
    // real quote — nothing new claimed, just restyled to lead with the
    // outcome (matches the reference site's "How Shannon Made
    // $123,000..." pattern).
    items: [
      { ...testimonials[0], headline: "How Sarah 4×'d Revenue in 11 Months" },
      { ...testimonials[1], headline: "How Marcus Lifted Conversion 38% Overnight" },
      { ...testimonials[4], headline: "How Olivia Sourced 22% Cheaper and Launched in 6 Weeks" },
    ],
  },

  team: {
    eyebrow: "The people behind your account",
    title: { lead: "A dedicated team running", accent: "your Amazon business every day." },
    subtitle: "Sourcing, listings, PPC, and account health. Specialists, not generalists.",
    badges: [
      { src: "/badges/trust-badge-1.avif", alt: "Top 10 Ecommerce Leaders 2024: Honored by Retail Business Review", width: 300, height: 300 },
      { src: "/badges/trust-badge-2.avif", alt: "Top 10 Ecommerce Leaders 2025: Honored by Retail Business Review", width: 300, height: 300 },
    ],
  },

  faq: {
    eyebrow: "Everything you need to know",
    title: { lead: "Questions we hear", accent: "before every audit call." },
    items: [
      {
        q: "Do I need my own Seller Central or Vendor Central account already?",
        a: "Either works. If you already sell on Amazon, we plug straight into your existing account. If you're launching fresh, we help you set one up correctly from day one.",
      },
      {
        q: "Which Amazon programs do you support?",
        a: "Seller Central, Vendor Central, Vendor Express, and FBA, plus Sponsored Products, Sponsored Brands, Sponsored Display, and DSP for retargeting.",
      },
      {
        q: "How fast can you start?",
        a: "Discovery call within 48 hours. Audit delivered within 5 business days. Engagement starts as soon as scope is signed, typically week two.",
      },
      {
        q: "What's the minimum engagement?",
        a: "90 days. Less than that and we can't show you a real result, and we'd rather decline than over-promise.",
      },
      {
        q: "What if it's not working?",
        a: "30-day exit clause after the first 90. We'd rather lose a contract than a reputation.",
      },
      {
        q: "Where are you based?",
        a: "Studio operations in Jhelum, Pakistan. Clients across North America, Europe, the Middle East, and Australia. Available 24/7 across time zones.",
      },
    ],
  },

  commitment: {
    eyebrow: "Our commitment to you",
    title: { lead: "We stay accountable,", accent: "not just busy." },
    badge: { value: "30-DAY", label: "Exit clause after the first 90 days" },
    body: "No fabricated guarantees here, just the terms we actually operate on, and have since day one.",
    ctaLabel: "Book Your Free Amazon Audit",
    points: [
      {
        title: "30-day exit clause",
        detail:
          "If it's not working after the first 90 days, you can walk with 30 days' notice. We'd rather lose a contract than a reputation.",
      },
      {
        title: "One accountable team",
        detail:
          "Sourcing, listings, photography, and PPC compound when one team owns them. No agency tag-outs, no pointing fingers.",
      },
      {
        title: "Full transparency",
        detail:
          "A monthly review of spend, ACoS, and inventory, walked through together, not buried in a dashboard you never open.",
      },
    ],
  },

  finalCta: {
    title: { lead: "Ready to turn your Amazon account", accent: "into a real asset?" },
    subtitle:
      "Book a free audit. We'll review your listings, ads, and inventory honestly, and tell you what's actually costing you sales.",
    ctaLabel: "Book Your Free Amazon Audit",
    note: "No pressure, no obligation, just a real operator walking through your account.",
  },

  stepCopy: [
    {
      title: "What's your monthly budget for Amazon ads and management right now?",
      sub: "Ballpark is fine. This just helps us tailor the audit.",
    },
    { title: "Who else needs to sign off before you move forward?" },
    { title: "What's costing you the most on Amazon right now?" },
    { title: "When do you want to get started?" },
    {
      title: "Almost there. Where should we send your audit?",
      sub: "No spam. No hard pitch. Just a plan.",
    },
  ],

  projects: funnelProjects,
};
