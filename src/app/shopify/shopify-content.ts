import { Palette, Code2, Zap, Plug, Gauge, LifeBuoy } from "lucide-react";
import { testimonials } from "@/lib/site-config";
import type { FunnelContent } from "@/components/funnel/funnel-types";
import type { FunnelProject } from "@/components/funnel/funnel-projects-data";

/**
 * Shopify-specific "Real brands. Real numbers." set — real Shopify
 * stores, not the Amazon/FBA case studies /amazon and /legal share (see
 * funnel-projects-data.ts). Each card links straight to the live store
 * (no /work/<slug> case-study page exists for these) and each metric is
 * the store's OWN publicly-published stat, pulled from its live
 * homepage — never a number invented for this page:
 *   - Glowco: reuses the existing, already-verified "$5,287,932 Total
 *     sales" figure shown elsewhere on this site for the same real
 *     brand (CalmCarry) — this is its Shopify DTC storefront.
 *   - ReviewBoost: "+26,987 customers", stated on reviewboostcard.com's
 *     own homepage.
 *   - TinyCraft: "4.9/5 from 1,000+ builders", stated on tinycraft.co's
 *     own homepage.
 * Hero images are real homepage screenshots supplied directly (client
 * assets, same as the badges — see funnel-hero.tsx's heroBadges note).
 * A 4th store (repulabs.com.au) was scoped but dropped per explicit
 * request — don't re-add it without asking again.
 */
const shopifyProjects: FunnelProject[] = [
  {
    slug: "glowco-shopify",
    company: "Glowco",
    product: "CalmCarry",
    category: "Wellness · Personal Care",
    image: "/glowco-hero.png",
    metric: { value: "$5,287,932", label: "Total sales" },
    outcome:
      "CalmCarry's direct-to-consumer storefront — the same brand behind the six-figure Amazon listing, its own home on Shopify.",
    href: "https://www.theglowcompany.co/",
  },
  {
    slug: "reviewboost-shopify",
    company: "ReviewBoost",
    product: "NFC & QR Review Cards",
    category: "Local Business · Reputation Tech",
    image: "/reviewboost-hero.png",
    metric: { value: "+26,987", label: "Customers" },
    outcome:
      "Tap-to-review cards, plaques, and stands for local businesses — storefront, catalog, and checkout, built on Shopify.",
    href: "https://reviewboostcard.com/",
  },
  {
    slug: "tinycraft-shopify",
    company: "TinyCraft",
    product: "Miniature Build Kits",
    category: "Hobby · DIY Kits",
    image: "/tinycraft-hero.png",
    metric: { value: "4.9★", label: "From 1,000+ builders" },
    outcome:
      "80+ book-nook, tiny-room, and paint-by-numbers kits, organized into one fast, browsable Shopify catalog.",
    href: "https://tinycraft.co/",
  },
];

/**
 * /shopify funnel content. The "6 wks" build-time stat traces to the
 * James L. testimonial in site-config ("Headless Shopify build
 * delivered in 6 weeks") — kept as a literal here for the same reason
 * src/app/consultation/funnel-products.ts gives: this page needs its
 * own presentation rules and must never silently drift from what's
 * shown elsewhere.
 */
export const shopifyContent: FunnelContent = {
  slug: "shopify",
  accent: "emerald",

  seo: {
    title: "Shopify & Headless Development — Free Scope Call",
    description:
      "Custom Shopify themes, MERN-stack apps, and headless Hydrogen storefronts — built to convert and to survive launch-day traffic, by one engineering team from wireframe to post-launch support.",
  },

  urgency: {
    message: "Now booking Shopify & headless build consultations — get a free scope and quote.",
  },

  hero: {
    eyebrow: "Shopify & Headless Development",
    headlineLead: "We Build Shopify Stores",
    headlineAccent: "That Actually Convert.",
    badge: "Custom themes, headless Hydrogen builds, and the integrations that make a store run.",
    subhead:
      "From startup to enterprise — we build Shopify stores and MERN-stack apps engineered to convert, and to survive launch-day traffic, not just look good in a portfolio screenshot.",
    disclaimer:
      "This is a project-based build engagement. Timelines vary by scope — a firm quote and delivery date are confirmed on the call, not promised here.",
    ctaLabel: "Book Your Free Build Consultation",
    // Shopify-specific real credentials (client-supplied), distinct from
    // the Amazon SPN/Trustpilot badges /amazon and /legal show — see
    // funnel-types.ts's note on `hero.heroBadges` being page-specific.
    // Sized larger than the shared default: these are square seals, not
    // wide wordmarks, so they read small at the default badge height.
    heroBadges: [
      { src: "/badges/shopify-hero-badge.png", alt: "Shopify Certified", width: 516, height: 490, className: "h-24 md:h-32" },
      { src: "/badges/shopify-hero-badge-2.png", alt: "Software Development certification", width: 447, height: 447, className: "h-24 md:h-32" },
    ],
  },

  stats: [
    { value: "240+", label: "Brands scaled" },
    { value: "$420M+", label: "GMV across catalogs supported" },
    // "~" prefix (rather than "6 wks") keeps this out of CountUp's
    // animatable path on purpose — that component concatenates
    // prefix+number+suffix with no separator, so a space-containing
    // suffix like "wks" would render as "6wks". Non-animated text
    // preserves the space, and "~" is also the more honest framing
    // for an average.
    { value: "~6 wks", label: "Avg headless build time" },
    { value: "All green", label: "Core Web Vitals target" },
  ],

  explainer: {
    eyebrow: "How it works",
    title: { lead: "The build,", accent: "in plain English." },
    paragraphs: [
      "We design, build, and integrate your Shopify or headless Hydrogen storefront — theme, apps, payments, and CRM — as one team from first wireframe to launch day.",
      "You own the store, the code, and the Shopify account. We're the build team behind it, then the team you call when something needs to change.",
    ],
    distinction:
      "This is a real engineering engagement. Not a templated theme install. Not a five-day drag-and-drop site that breaks under real traffic.",
  },

  features: {
    eyebrow: "What this looks like in practice",
    title: { lead: "Everything your store needs,", accent: "built by one team." },
    subtitle:
      "Six disciplines that normally mean stitching together freelancers, under one accountable roof.",
    ctaLabel: "See If You Qualify",
    items: [
      {
        icon: Palette,
        title: "Custom Shopify theme development",
        detail:
          "A theme built around your brand and your catalog, not a stock template with a logo dropped in.",
      },
      {
        icon: Code2,
        title: "MERN-stack web applications",
        detail:
          "MongoDB, Express, React, Node — for the custom apps and internal tools a stock theme can't do.",
      },
      {
        icon: Zap,
        title: "Headless storefronts (Hydrogen)",
        detail:
          "Full front-end control and faster load times for brands that have outgrown a standard theme.",
      },
      {
        icon: Plug,
        title: "Payment, CRM & email integrations",
        detail:
          "Stripe, HubSpot, Salesforce, Mailchimp — wired in properly, not bolted on after launch.",
      },
      {
        icon: Gauge,
        title: "Core Web Vitals tuning",
        detail:
          "Load speed and responsiveness tuned so Google — and your actual customers — don't bounce before checkout.",
      },
      {
        icon: LifeBuoy,
        title: "Post-launch support & iteration",
        detail:
          "The team that built it stays reachable after launch — for fixes, new features, and the next migration.",
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
        "You want a same-day drag-and-drop site with zero engineering behind it.",
        "You need it live tomorrow, with no scoping call first.",
        "You're not planning to integrate real payments, CRM, or email — just a static brochure page.",
        "You want the cheapest theme install, not a store built to handle real traffic.",
      ],
    },
    is: {
      heading: "This IS for you if...",
      items: [
        "You want a store engineered to survive launch-day and sale-day traffic spikes.",
        "You need real integrations — Stripe, HubSpot, Mailchimp — done right the first time.",
        "You care about Core Web Vitals, SEO, and load speed, not just how it looks in a screenshot.",
        "You want one team from first wireframe to post-launch support.",
      ],
    },
  },

  testimonials: {
    eyebrow: "Client voices",
    title: { lead: "Real stores.", accent: "Real builds." },
    // Headlines extract a number already stated verbatim in each real
    // quote — see amazon-content.ts's testimonials for the same note.
    // Only 5 real client testimonials exist site-wide (site-config.ts) —
    // James's is the only one actually about a Shopify/headless build;
    // Priya's is the one generic enough to also honestly sit here.
    // Sarah/Marcus/Olivia's quotes are all Amazon-specific and belong to
    // /amazon only — don't re-add one here "to make it 3" without a real
    // new Shopify testimonial to back it (user was asked, chose this
    // 2-card split over inventing overlap or fabricating a 3rd).
    items: [
      { ...testimonials[3], headline: "How James Shipped a Headless Store in 6 Weeks" },
      { ...testimonials[2], headline: "Why Priya Chose Evolut After Three Other Agencies" },
    ],
  },

  team: {
    eyebrow: "The people behind your build",
    title: { lead: "A dedicated engineering team,", accent: "not a freelancer roulette." },
    subtitle: "Design, development, integrations, and post-launch support — the same team throughout.",
    badges: [
      { src: "/badges/trust-badge-1.avif", alt: "Top 10 Ecommerce Leaders 2024 — Honored by Retail Business Review", width: 300, height: 300 },
      { src: "/badges/trust-badge-2.avif", alt: "Top 10 Ecommerce Leaders 2025 — Honored by Retail Business Review", width: 300, height: 300 },
    ],
  },

  faq: {
    eyebrow: "Everything you need to know",
    title: { lead: "Questions we hear", accent: "before every scope call." },
    items: [
      {
        q: "Do you build themes, headless (Hydrogen), or both?",
        a: "Both — we scope the right approach for your catalog size and growth plan on the call, then build exactly that.",
      },
      {
        q: "Can you migrate our existing store without downtime?",
        a: "Yes. Migrations are planned and staged so your store stays live and orders keep flowing through the cutover.",
      },
      {
        q: "How long does a build take?",
        a: "Most theme builds run 4–8 weeks; headless Hydrogen builds run 6–10. You'll get a firm timeline after the scope call, not a guess.",
      },
      {
        q: "What happens after launch?",
        a: "You're not on your own. Post-launch support and iteration is part of the engagement, not a paid add-on for the first stretch after go-live.",
      },
      {
        q: "How fast can you start?",
        a: "Discovery call within 48 hours. A scoped quote within 5 business days. Build starts as soon as scope is signed.",
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
    badge: { value: "~6 WKS", label: "Average build time, start to launch" },
    body: "No fabricated guarantees here — just the terms we actually operate on, and have since day one.",
    ctaLabel: "Book Your Free Build Consultation",
    points: [
      {
        title: "Fixed scope, fixed price",
        detail:
          "You get a firm quote and timeline after the scope call — no open-ended hourly billing that creeps.",
      },
      {
        title: "One accountable team",
        detail:
          "Design, development, and integrations under one roof — no handoff between five different freelancers.",
      },
      {
        title: "Post-launch support included",
        detail:
          "We stay reachable after go-live for fixes and iteration, not just until the invoice clears.",
      },
    ],
  },

  finalCta: {
    title: { lead: "Ready for a Shopify store", accent: "that actually holds up?" },
    subtitle:
      "Book a free build consultation. We'll scope your project honestly — including what it should cost and how long it should take.",
    ctaLabel: "Book Your Free Build Consultation",
    note: "No pressure, no obligation — just a real engineer walking through your project.",
  },

  stepCopy: [
    {
      title: "What's your budget for this build right now?",
      sub: "Ballpark is fine. This just helps us scope the right approach.",
    },
    { title: "Who else needs to sign off before you move forward?" },
    { title: "What's costing you the most with your current store?" },
    { title: "When do you want to get started?" },
    {
      title: "Almost there. Where should we send your scope estimate?",
      sub: "No spam. No hard pitch. Just a plan.",
    },
  ],

  projects: shopifyProjects,
};
