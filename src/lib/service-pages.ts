import {
  ShoppingBag,
  Code2,
  Camera,
  PaintBucket,
  Truck,
  ShieldCheck,
  Search,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

/**
 * Per-service page data — drives the 20-section ServicePageTemplate.
 *
 * Each entry below is a complete page brief: hero copy, 4 stats,
 * approach bullets, includes grid, 4-phase process, tools, deliverable,
 * stat callout, mini case, engagement tiers, 5 FAQ, testimonial,
 * us-vs-them, guarantees, onboarding flow, output preview, related
 * services, and an operator highlight.
 *
 * Keep this file as the single source of truth for service page
 * copy — the route at /services/[slug] reads from it.
 */

export type FeatureModule = {
  title: string;
  body: string;
};

export type ServicePageData = {
  slug: string;
  /** Top of page */
  hero: {
    chapter: string; // e.g. "01 · service"
    title: string;
    italicTail: string; // copper italic accent on the second line
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    /** Background image OR illustration path (optional) */
    image?: string;
  };
  /** 4-number stats bar */
  stats: { value: string; label: string }[];

  /** 03 — challenge */
  problem: {
    eyebrow: string;
    title: string;
    body: string;
  };
  /** 04 — approach bullets */
  approach: { number: string; title: string; body: string }[];
  /** 05 — what's included */
  includes: FeatureModule[];
  /** 06 — process timeline */
  process: { phase: string; body: string }[];
  /** 07 — tools / tech */
  tools: string[];
  /** 08 — sample deliverable card */
  deliverable: { title: string; body: string; image?: string };
  /** 09 — big stat callout */
  bigStat: { value: string; label: string; body: string };
  /** 10 — mini case */
  miniCase: { brand: string; metric: string; body: string; href: string };
  /** 11 — engagement shapes (no public pricing — CTA-driven) */
  engagement: { name: string; body: string; features: string[] }[];
  /** 12 — FAQ */
  faqs: { q: string; a: string }[];
  /** 13 — testimonial */
  quote: { text: string; attribution: string };
  /** 14 — us vs typical agency */
  comparison: { topic: string; us: string; them: string }[];
  /** 15 — quality guarantees */
  guarantees: string[];
  /** 16 — onboarding flow */
  onboarding: { step: string; title: string; body: string }[];
  /** 17 — sample output / report preview */
  output: { title: string; body: string; lines: string[] };
  /** 18 — related services (slugs) */
  related: string[];
  /** 19 — operator */
  operator: { initials: string; role: string; quote: string };
  /** 20 — bottom CTA */
  closeCta: { eyebrow: string; title: string; body: string };
  /** Color tone — drives accent surfaces in the template */
  tone: "electric" | "copper" | "obsidian" | "lime" | "emerald";
  /** Lucide icon for chips / nav */
  icon: LucideIcon;
  /**
   * Optional proof / portfolio gallery shown between Deliverable and
   * Big Stat. Use for: trademark certificates, product shots, A+ block
   * captures — anything that benefits from a visual grid.
   *
   * `fit`: "cover" (default) crops to fill the tile — best for product
   * shots. "contain" letterboxes the asset — use for documents,
   * screenshots, or wide illustrations that need to read fully.
   * `aspect`: tile aspect ratio. Defaults to `4/5` portrait. Use
   * `4/3` for landscape documents.
   */
  gallery?: {
    eyebrow: string;
    title: string;
    body: string;
    fit?: "cover" | "contain";
    aspect?: "4/5" | "4/3" | "1/1" | "16/9";
    images: { src: string; caption?: string }[];
  };
  /**
   * Optional "visual story" — a horizontal sequence of 2–4 large
   * illustrations narrating the service's process. Renders between
   * Approach (04) and Includes (05) when set.
   */
  visualStory?: {
    eyebrow: string;
    title: string;
    body: string;
    steps: { image: string; label: string; caption: string }[];
  };
};

/* ================================================================== *
 * Shared helpers (used to keep stub services compact)
 * ================================================================== */

const baseEngagement = (label: string) => [
  {
    name: "Pilot",
    body: "First 90 days. Audit, plan, and the first cycle of work — designed to compound.",
    features: [
      "Discovery + audit · 5 days",
      "Roadmap locked, milestones agreed",
      "First cycle of " + label,
      "Weekly motion + reporting",
    ],
  },
  {
    name: "Operator",
    body: "Ongoing partnership. We run " + label + " as a dedicated part of your stack.",
    features: [
      "Dedicated lead + specialist",
      "Bi-weekly strategy calls",
      "Quarterly portfolio reviews",
      "Compounding 90-day cycles",
    ],
  },
];

const baseGuarantees = [
  "30-day exit clause after the first 90 — we'd rather lose a contract than a reputation.",
  "Single accountable team — no rotating account managers.",
  "Reporting built around margin and outcome, not hours billed.",
  "All assets we produce are yours. Forever. No license traps.",
];

const baseOnboarding = [
  {
    step: "01",
    title: "Discovery call",
    body: "30-min call. We surface the actual constraints, not the symptoms.",
  },
  {
    step: "02",
    title: "Audit + plan",
    body: "Five-day audit, locked roadmap, milestones agreed in writing.",
  },
  {
    step: "03",
    title: "Cycle one",
    body: "Work starts within a week of sign-off. First cycle inside 30 days.",
  },
];

/* ================================================================== *
 * Per-service data
 * ================================================================== */

export const servicePages: Record<string, ServicePageData> = {
  amazon: {
    slug: "amazon",
    hero: {
      chapter: "01 · Amazon Account Management",
      title: "Vendor, Seller, FBA —",
      italicTail: "all under one roof.",
      body: "End-to-end Amazon operations for brands that have outgrown a freelance solution. Listings, ads, inventory, and brand registry — run by operators who've scaled past 8 figures.",
      primaryCta: { label: "Brief our Amazon team", href: "/contact?service=amazon" },
      secondaryCta: { label: "See case studies", href: "/work" },
      image: "/services/amazon.png",
    },
    stats: [
      { value: "240+", label: "Active accounts managed" },
      { value: "18,000+", label: "ASINs optimized" },
      { value: "3.4×", label: "Avg ROAS lift, 90 days" },
      { value: "$420M", label: "GMV under management" },
    ],
    problem: {
      eyebrow: "The challenge",
      title: "Your account is alive, but it isn't compounding.",
      body: "Listings are stale, ad spend is plateauing, and Brand Registry is half-finished. The team is firefighting, not building. Sound familiar? It's the catalog phase 80% of brands sit in.",
    },
    approach: [
      {
        number: "01",
        title: "Architect the catalog",
        body: "Title hierarchy, bullet density, A+ Premium block flow, Brand Store nav.",
      },
      {
        number: "02",
        title: "Tier the campaigns",
        body: "Manual + smart-auto layered by margin. Defense / discovery / hero ladder.",
      },
      {
        number: "03",
        title: "Wire the lifecycle",
        body: "Reviews, post-purchase, replenishment, and DSP retargeting on one event model.",
      },
      {
        number: "04",
        title: "Compound, then scale",
        body: "International marketplaces, range expansion, brand defense filings.",
      },
    ],
    includes: [
      { title: "Listing optimization", body: "Title / bullets / description / backend / search terms." },
      { title: "A+ Premium content", body: "Up to 7 modules including video and comparison tables." },
      { title: "Brand Store", body: "Homepage + 4 sub-pages with shoppable variations." },
      { title: "PPC management", body: "Sponsored Products / Brands / Display + manual + auto + DSP." },
      { title: "Inventory + cash-flow", body: "Forecasts tied to lead times and FBA fees." },
      { title: "Brand Registry + IP", body: "Filed, defended, with takedowns when needed." },
      { title: "Variation architecture", body: "Parent / child trees that filter the right way." },
      { title: "Account health", body: "Performance notifications handled within 24h." },
    ],
    process: [
      { phase: "01 · Audit", body: "5-day account audit + opportunity stack ranked by lift." },
      { phase: "02 · Listing rebuild", body: "Copy + A+ Premium + Brand Store launched in cycle one." },
      { phase: "03 · PPC restructure", body: "Tiered campaigns by margin, broad-match killed." },
      { phase: "04 · Compound", body: "Quarterly reviews + DSP + range expansion." },
    ],
    tools: [
      "Amazon Seller Central",
      "Amazon Vendor Central",
      "Brand Registry",
      "Sponsored Ads Console",
      "DSP",
      "Amazon Attribution",
      "Helium 10",
      "Klaviyo",
    ],
    deliverable: {
      title: "What you receive in cycle one",
      body: "A rebuilt catalog you can audit yourself — copy, photography, ads, and dashboards all wired together.",
    },
    bigStat: {
      value: "$614,536.70",
      label: "Year-to-date · Gloco",
      body: "From a prototype with no Amazon footprint to a six-figure listing inside a year.",
    },
    miniCase: {
      brand: "Gloco · Calm Carry",
      metric: "0 → $614K YTD",
      body: "Sourced, photographed, listed, and scaled in one continuous cycle.",
      href: "/work/gloco-calm-carry-us",
    },
    engagement: baseEngagement("Amazon operations"),
    faqs: [
      {
        q: "Do you take over the account or work alongside our team?",
        a: "Either. Most engagements run as a fully-managed account. Some clients keep an in-house lead and we slot in as the senior operating bench.",
      },
      {
        q: "Vendor or Seller Central?",
        a: "Both. We run Vendor (1P), Seller (3P), and hybrid. We'll help you decide which channel structure fits your margin profile.",
      },
      {
        q: "How fast can you start?",
        a: "Discovery within 48h, audit in 5 days, work starts in week two.",
      },
      {
        q: "What's a realistic ROAS target?",
        a: "It depends on your category and margin floor. Our 90-day average lift across 240 accounts is 3.4× — but the right number is the one that protects margin, not the one that looks good in a dashboard.",
      },
      {
        q: "Do you handle international marketplaces?",
        a: "Yes — US, UK, EU, JP, AU. We'll sequence them around your supply chain capacity, not the other way around.",
      },
    ],
    quote: {
      text: "We came to Evolut with a prototype and walked out 12 months later with a six-figure Amazon listing. They ran the entire stack — we ran the brand.",
      attribution: "Founder · Gloco",
    },
    comparison: [
      { topic: "Account ownership", us: "One named operator + dedicated specialist", them: "Rotating account manager every quarter" },
      { topic: "Reporting", us: "Margin and outcome, in your inbox", them: "Hours billed, not results delivered" },
      { topic: "PPC", us: "Tiered by margin, smart-auto + manual", them: "Broad match, ACoS-only goal" },
      { topic: "A+ Content", us: "Magazine spread quality, video included", them: "Template repackaged across SKUs" },
      { topic: "IP defense", us: "Brand Registry + active takedowns", them: "\"That's a separate engagement\"" },
    ],
    guarantees: baseGuarantees,
    onboarding: baseOnboarding,
    output: {
      title: "What lands in your inbox every Friday",
      body: "Operator-grade reporting, not a screenshot of a dashboard.",
      lines: [
        "✓  ROAS · ACoS · TACoS by SKU and campaign tier",
        "✓  Inventory cover and re-order recommendations",
        "✓  Listing health score + flagged compliance risks",
        "✓  Top movers and top decliners — with the why, not just the what",
        "✓  Next week's plan, in plain English",
      ],
    },
    related: ["bol", "ppc", "photography", "trademark"],
    operator: {
      initials: "ZK",
      role: "Head of Amazon",
      quote: "Vendor, Seller, FBA — wherever the math works.",
    },
    closeCta: {
      eyebrow: "Ready to compound?",
      title: "Brief our Amazon team",
      body: "30-minute discovery call. We'll tell you on the call whether we can help.",
    },
    tone: "electric",
    icon: ShoppingBag,
  },

  shopify: {
    slug: "shopify",
    hero: {
      chapter: "02 · Shopify & MERN Development",
      title: "Custom storefronts.",
      italicTail: "Built to scale.",
      body: "Custom Shopify themes, headless Hydrogen, MERN-stack apps, and the integrations that hold it all together — Stripe, Klaviyo, HubSpot, and your own APIs.",
      primaryCta: { label: "Brief our build team", href: "/contact?service=shopify" },
      secondaryCta: { label: "See work", href: "/work" },
      image: "/services/shopify.png",
    },
    stats: [
      { value: "6 wks", label: "Avg time to launch" },
      { value: "100%", label: "CWV-green hand-offs" },
      { value: "0 days", label: "Migration downtime" },
      { value: "12", label: "Headless Hydrogen builds" },
    ],
    problem: {
      eyebrow: "The challenge",
      title: "Your storefront is the bottleneck.",
      body: "Theme bloat slowing CWV. Apps stacking on apps. Engineering constraints driving the merch calendar instead of the other way around. Time to talk about a build.",
    },
    approach: [
      { number: "01", title: "Design system first", body: "Tokens, components, brand guidelines — the foundation builds on." },
      { number: "02", title: "Headless or themed", body: "Hydrogen for ambitious brands, custom Shopify themes for the rest." },
      { number: "03", title: "Integration model", body: "Single event bus across Klaviyo, HubSpot, Stripe, and your APIs." },
      { number: "04", title: "Performance budget", body: "All-green Core Web Vitals as a launch criterion, not a nice-to-have." },
    ],
    includes: [
      { title: "Custom theme dev", body: "Liquid + Hydrogen + React + TypeScript." },
      { title: "Design tokens", body: "Color, type, spacing — wired to a Tailwind config you own." },
      { title: "Component library", body: "Typed, documented, story-booked." },
      { title: "Checkout extensions", body: "Custom Shopify Functions where they matter." },
      { title: "Headless apps", body: "Next.js / MERN dashboards on top of Shopify Admin API." },
      { title: "Subscriptions", body: "Recharge, Stay AI, or Bold — wired into Klaviyo lifecycle flows." },
      { title: "CWV optimization", body: "All-green LCP / CLS / INP, monitored." },
      { title: "Migration", body: "Zero-downtime switchovers from BigCommerce / WooCommerce / Magento." },
    ],
    process: [
      { phase: "01 · Design tokens", body: "Brand → tokens → component library inside two weeks." },
      { phase: "02 · Build sprints", body: "Two-week sprints, every demo lives on a staging URL." },
      { phase: "03 · Integrations", body: "Stripe / Klaviyo / Recharge wired into one event model." },
      { phase: "04 · Launch", body: "Cutover scheduled for off-peak. Monitored for 14 days post-go-live." },
    ],
    tools: [
      "Shopify Hydrogen",
      "Shopify Functions",
      "Liquid",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "Klaviyo",
      "Recharge",
      "HubSpot",
      "MongoDB",
      "Vercel",
    ],
    deliverable: {
      title: "What you ship",
      body: "A storefront that loads in under 1.5s, an admin your merch team can drive solo, and an integration layer that doesn't break when you add the next app.",
    },
    bigStat: {
      value: "6 weeks",
      label: "Veltic Tech · zero-downtime",
      body: "Hydrogen migration from BigCommerce, all CWV green at launch.",
    },
    miniCase: {
      brand: "Veltic Tech",
      metric: "6 wks · 0 downtime",
      body: "Headless Shopify Hydrogen build delivered on a tight deadline with no migration outage.",
      href: "/work",
    },
    engagement: baseEngagement("Shopify build + ongoing dev"),
    faqs: [
      { q: "Theme or headless?", a: "Honest answer: themed if your team is small and your stack is standard. Headless if you're shipping bespoke merchandising or you've outgrown app stack performance." },
      { q: "How fast can you migrate?", a: "Six weeks is the sweet spot. We've done four — but quality drops below that." },
      { q: "Do you maintain after launch?", a: "Yes. Most clients keep us on a retainer for ongoing dev + monitoring." },
      { q: "What about checkout?", a: "We extend with Shopify Functions where useful. We don't replace Shopify Checkout — that's a fight you don't want." },
      { q: "Performance budget?", a: "All-green Core Web Vitals at launch is non-negotiable. Below that we don't ship." },
    ],
    quote: {
      text: "Headless Hydrogen build delivered in 6 weeks. Core Web Vitals all green. The team handled migration without a single day of downtime.",
      attribution: "Founder · Veltic Tech",
    },
    comparison: [
      { topic: "Stack opinion", us: "Pragmatic — themed when it fits, headless when it earns it", them: "\"Headless for everyone\"" },
      { topic: "Performance", us: "All-green CWV is a launch criterion", them: "Punt it to the next sprint" },
      { topic: "Design system", us: "Tokens + components shipped first, build second", them: "Pixel-pushing in Liquid as you go" },
      { topic: "Migration", us: "Zero-downtime cutovers, monitored", them: "Maintenance window + crossed fingers" },
      { topic: "Hand-off", us: "Documented, story-booked, your team can drive", them: "Locked-in vendor relationship" },
    ],
    guarantees: baseGuarantees,
    onboarding: baseOnboarding,
    output: {
      title: "What we hand over at launch",
      body: "Documented, typed, monitored, owned by you.",
      lines: [
        "✓  Source repo with CI/CD wired",
        "✓  Component library with Storybook + types",
        "✓  Performance baseline (Lighthouse + CWV)",
        "✓  Integration runbook for every third-party",
        "✓  30-day post-launch support window",
      ],
    },
    related: ["bol", "amazon", "photography", "ppc"],
    operator: {
      initials: "TF",
      role: "Head of Engineering",
      quote: "Web Vitals all-green is the floor, not the ceiling.",
    },
    closeCta: {
      eyebrow: "Ready to ship?",
      title: "Brief our build team",
      body: "Discovery call within 48h. Estimate inside 5 days.",
    },
    tone: "obsidian",
    icon: Code2,
  },

  bol: {
    slug: "bol",
    hero: {
      chapter: "03 · Branding & Listing Optimization",
      title: "Brand identity meets",
      italicTail: "the algorithm.",
      body: "Eye-catching brand systems paired with listings engineered around the way the algorithm and the shopper actually work.",
      primaryCta: { label: "Brief our brand team", href: "/contact?service=bol" },
      secondaryCta: { label: "See work", href: "/work" },
      image: "/services/bol.png",
    },
    stats: [
      { value: "+38%", label: "Avg conversion lift, top SKU" },
      { value: "4.1×", label: "Brand search lift, 6 months" },
      { value: "100%", label: "A+ Premium pass-rate" },
      { value: "240+", label: "Brands shipped" },
    ],
    problem: {
      eyebrow: "The challenge",
      title: "Your listing converts, but the brand doesn't carry.",
      body: "Customers buy once, then forget you. The catalog reads like a feature list. Brand search isn't moving. The shopper experience and the brand identity are out of sync.",
    },
    approach: [
      { number: "01", title: "Brand foundation", body: "Voice, identity, palette, typography — the rules everyone designs against." },
      { number: "02", title: "Listing architecture", body: "Title, bullets, A+ Premium, Brand Store — engineered for the algorithm." },
      { number: "03", title: "Visual system", body: "Photography, infographics, packaging — coherent across every shelf." },
      { number: "04", title: "Measurement", body: "Brand search, repeat-purchase, AOV — tracked weekly." },
    ],
    includes: [
      { title: "Brand identity", body: "Wordmark, palette, type system, voice guidelines." },
      { title: "Packaging design", body: "Print-ready dielines + spec sheets." },
      { title: "Listing copy", body: "Title / bullets / description / search terms / A+." },
      { title: "A+ Premium", body: "Up to 7 modules including video and comparison tables." },
      { title: "Brand Store", body: "Homepage + 4 sub-pages with shoppable variations." },
      { title: "Visual system", body: "Photography direction + infographic templates." },
      { title: "Voice guide", body: "Tone-of-voice doc the whole team writes against." },
      { title: "Audit + recommendations", body: "Quarterly brand health check." },
    ],
    process: [
      { phase: "01 · Audit", body: "Brand + listing audit, gap analysis, opportunity stack." },
      { phase: "02 · Foundation", body: "Identity / voice / system locked in two weeks." },
      { phase: "03 · Rollout", body: "Listings rebuilt SKU-by-SKU on a published timeline." },
      { phase: "04 · Measurement", body: "Brand search + repeat-purchase tracked weekly." },
    ],
    tools: [
      "Figma",
      "Adobe CC",
      "Amazon Brand Registry",
      "A+ Premium",
      "Brand Stores",
      "Helium 10",
      "Notion",
    ],
    deliverable: {
      title: "What you receive",
      body: "A brand book your team can design against, plus listings that convert in the language your shopper actually speaks.",
    },
    bigStat: {
      value: "4.1×",
      label: "Solrise Beauty · brand search",
      body: "Brand search 4.1× in six months after we unified the voice across Amazon, Shopify, and TikTok.",
    },
    miniCase: {
      brand: "Solrise Beauty",
      metric: "4.1× brand search",
      body: "Single accountable team, unified brand system, 90-day roadmap stuck.",
      href: "/work",
    },
    engagement: baseEngagement("BOL services"),
    faqs: [
      { q: "Do you do logo work?", a: "Yes — wordmarks, marks, full identity systems. We don't do logo-only quick-fixes." },
      { q: "Can we use our existing brand?", a: "Of course. We'll audit it, then either translate or rebuild — your call." },
      { q: "How long for A+ Premium?", a: "Two weeks per SKU on average, faster if photography exists." },
      { q: "Do you handle Spanish / French / German listings?", a: "Yes — native copywriters + amazon-specific search-term optimization." },
      { q: "What's the metric for success?", a: "Conversion rate first, brand-search second, repeat-purchase third." },
    ],
    quote: {
      text: "Single accountable team, unified brand system, 90-day roadmap stuck. That's the difference.",
      attribution: "COO · Solrise Beauty",
    },
    comparison: [
      { topic: "Approach", us: "System-led: foundations, then rollout", them: "SKU-by-SKU pixel-pushing" },
      { topic: "A+ Content", us: "Magazine quality, video included", them: "Template across all SKUs" },
      { topic: "Voice", us: "Documented tone-of-voice across channels", them: "Each freelancer writes their own way" },
      { topic: "Measurement", us: "Brand search + repeat tracked weekly", them: "ACoS-only" },
      { topic: "Compounding", us: "Identity → listing → photography → ads", them: "One service line, no compounding" },
    ],
    guarantees: baseGuarantees,
    onboarding: baseOnboarding,
    output: {
      title: "Sample brand book outline",
      body: "What you walk out with after the foundation phase.",
      lines: [
        "✓  Wordmark + mark + favicon (SVG + PNG)",
        "✓  Color palette + accessibility ratios",
        "✓  Type system (display + body + mono)",
        "✓  Voice guide with do / don't examples",
        "✓  Listing template + A+ component spec",
      ],
    },
    related: ["amazon", "photography", "shopify", "trademark"],
    operator: {
      initials: "SH",
      role: "Head of Creative",
      quote: "A+ is a magazine spread. Treat it that way.",
    },
    closeCta: {
      eyebrow: "Ready to brand it right?",
      title: "Brief our brand team",
      body: "Audit + identity workshop in the first two weeks.",
    },
    tone: "copper",
    icon: PaintBucket,
  },

  ppc: {
    slug: "ppc",
    hero: {
      chapter: "04 · PPC & Advertising",
      title: "Sponsored Products.",
      italicTail: "Margin tiers. Real ROAS.",
      body: "Amazon Sponsored Products, Brands, and Display engineered around your real margin profile. Manual layered with smart-auto, never just one or the other.",
      primaryCta: { label: "Brief our PPC team", href: "/contact?service=ppc" },
      secondaryCta: { label: "See work", href: "/work" },
      image: "/services/ppc.png",
    },
    stats: [
      { value: "3.4×", label: "Avg ROAS lift, 90 days" },
      { value: "−39%", label: "Avg ACoS reduction" },
      { value: "+162%", label: "Sessions, 90 days" },
      { value: "$50M", label: "Annual ad spend managed" },
    ],
    problem: {
      eyebrow: "The challenge",
      title: "Your ACoS is fine. Your margin isn't.",
      body: "ACoS targets that ignore margin floors burn cash. Broad match keywords leak intent. Sponsored Brands runs on autopilot. There's no DSP layer to defend the brand.",
    },
    approach: [
      { number: "01", title: "Margin tiering", body: "Campaigns structured by margin floor, not generic ACoS targets." },
      { number: "02", title: "Hero / discovery / defense", body: "Three-tier campaign architecture across Sponsored Products / Brands / Display." },
      { number: "03", title: "Manual + smart-auto", body: "Layered, not either-or. Auto for harvest, manual for hero." },
      { number: "04", title: "DSP overlay", body: "Off-Amazon retargeting + audience expansion for 7-figure brands." },
    ],
    includes: [
      { title: "Campaign architecture", body: "Margin-tiered structure across all ad types." },
      { title: "Keyword research", body: "Manual harvest + competitor mining + search-term sweeps." },
      { title: "Bid management", body: "Daily monitoring, weekly bid adjustments." },
      { title: "Sponsored Brands video", body: "Video ads produced + placed." },
      { title: "Sponsored Display", body: "Audience targeting + competitor ASIN defense." },
      { title: "DSP", body: "Off-Amazon programmatic for advanced retargeting." },
      { title: "Attribution", body: "Amazon Attribution + cross-channel measurement." },
      { title: "Reporting", body: "Margin per click, not just ACoS." },
    ],
    process: [
      { phase: "01 · Audit", body: "Spend audit, wasted-impression analysis, opportunity stack." },
      { phase: "02 · Restructure", body: "Tiered campaigns rebuilt SKU-by-SKU." },
      { phase: "03 · Optimization", body: "Daily bid adjustments, weekly keyword harvest." },
      { phase: "04 · DSP overlay", body: "Once organic + sponsored are stable, DSP kicks in." },
    ],
    tools: [
      "Amazon Sponsored Ads",
      "Amazon DSP",
      "Amazon Attribution",
      "Helium 10",
      "Pacvue",
      "Google Sheets",
      "Looker",
    ],
    deliverable: {
      title: "What you get",
      body: "A live ROAS dashboard, weekly Friday report in margin terms, and an account that doesn't bleed when you turn the lights off for a weekend.",
    },
    bigStat: {
      value: "3.4×",
      label: "Avg ROAS lift across 240 accounts",
      body: "90-day average. Not the best — the average. The best look very different.",
    },
    miniCase: {
      brand: "Squirtz",
      metric: "+412% revenue · 6mo",
      body: "Restructured PPC into margin tiers. ACoS dropped 39 percent in the first quarter.",
      href: "/work/squirtz-water-enhancer-us",
    },
    engagement: baseEngagement("PPC management"),
    faqs: [
      { q: "What's a healthy ACoS?", a: "It depends on your margin floor. Categories with 60% margin support a 25% ACoS. Categories with 30% margin can't. We tier by category, not the other way around." },
      { q: "Manual or auto?", a: "Both, layered. Auto runs as a discovery harvest. Manual runs hero campaigns at locked bids and harvests winners back into manual." },
      { q: "Sponsored Brands worth it?", a: "Almost always — but only with video assets. Static SB underperforms video by 2× in 80% of categories." },
      { q: "When does DSP make sense?", a: "Once you're past about $80K/mo on Sponsored Ads. Below that, the operational overhead doesn't pencil." },
      { q: "How often do you adjust bids?", a: "Daily monitoring, weekly bid sweeps, monthly architecture reviews." },
    ],
    quote: {
      text: "ACoS dropped 39 percent in the first quarter. The new photos didn't hurt either.",
      attribution: "Marketing lead · Squirtz",
    },
    comparison: [
      { topic: "Goal-setting", us: "Margin floor by category", them: "Generic ACoS target across all" },
      { topic: "Campaign tiers", us: "Hero / discovery / defense", them: "All on auto" },
      { topic: "Keyword harvest", us: "Weekly, manual review", them: "Quarterly, if at all" },
      { topic: "Video", us: "SB video produced + placed", them: "Static images only" },
      { topic: "DSP", us: "Layered when math supports it", them: "\"Sponsored Ads only, that's our scope\"" },
    ],
    guarantees: baseGuarantees,
    onboarding: baseOnboarding,
    output: {
      title: "Friday report sample",
      body: "What lands in your inbox every Friday at 9am.",
      lines: [
        "✓  ROAS · ACoS · TACoS by tier and SKU",
        "✓  Wasted-impression report (broad match leakage)",
        "✓  Top winners harvested into manual this week",
        "✓  Bid adjustments + reasoning",
        "✓  Recommended next-week experiments",
      ],
    },
    related: ["amazon", "bol", "photography", "shopify"],
    operator: {
      initials: "MN",
      role: "Head of Performance",
      quote: "ACoS lies. Margin per click is the real signal.",
    },
    closeCta: {
      eyebrow: "Ready to make spend pay?",
      title: "Brief our PPC team",
      body: "Spend audit + opportunity stack inside 5 days.",
    },
    tone: "electric",
    icon: Megaphone,
  },

  photography: {
    slug: "photography",
    hero: {
      chapter: "05 · Product Photography",
      title: "Stunning imagery,",
      italicTail: "designed to convert.",
      body: "Studio-grade product photography optimized for multi-platform use. Don't hire photography separately — get the whole package for coherent aesthetics.",
      primaryCta: { label: "Book a shoot", href: "/contact?service=photography" },
      secondaryCta: { label: "See sample pack", href: "/#photography" },
      image: "/services/prodcut_photography.png",
    },
    stats: [
      { value: "+38%", label: "Avg conversion lift, top SKU" },
      { value: "6", label: "Frames per pack" },
      { value: "2 wks", label: "Studio turnaround" },
      { value: "240+", label: "Brands shot" },
    ],
    problem: {
      eyebrow: "The challenge",
      title: "Your product photo is the first impression — and it isn't great.",
      body: "Phone shots on a window sill. Mismatched white balance across SKUs. A main image cropped wrong for Amazon. The shopper is gone in 0.6 seconds.",
    },
    approach: [
      { number: "01", title: "The full pack", body: "Main / infographic / lifestyle / scale / packaging / 360°." },
      { number: "02", title: "One product, six frames", body: "Same styling across the pack — coherent aesthetics." },
      { number: "03", title: "Channel-aware", body: "Amazon main spec / Shopify lifestyle / paid social cuts." },
      { number: "04", title: "Quarterly refresh", body: "Seasonal lifestyle drops without restarting from scratch." },
    ],
    includes: [
      { title: "Main image (Amazon)", body: "Pure-white BG, ≈85% frame fill, 1:1." },
      { title: "Infographic", body: "Feature callouts, A+ Content ready." },
      { title: "Lifestyle", body: "In-context, real environments, real people." },
      { title: "Scale shot", body: "With a hand, an apple, or a coin — dimension obvious." },
      { title: "Packaging", body: "Product + retail box, paired." },
      { title: "360° spin", body: "36-frame turnaround for storefront viewers." },
      { title: "Video b-roll", body: "Vertical + square cuts for TikTok / Reels." },
      { title: "Channel exports", body: "Amazon / Shopify / Meta / TikTok dimensions." },
    ],
    process: [
      { phase: "01 · Pre-pro", body: "Mood board + shot list + prop sourcing." },
      { phase: "02 · Studio day", body: "1–2 days in-studio, on-set tethered." },
      { phase: "03 · Retouch", body: "Color-matched across the pack, shipped in editable PSDs." },
      { phase: "04 · Channel exports", body: "Per-platform dimensions delivered as a final pack." },
    ],
    tools: [
      "Profoto strobes",
      "Capture One",
      "Phase One",
      "Photoshop",
      "Lightroom",
      "Cinema 4D",
      "DaVinci Resolve",
    ],
    deliverable: {
      title: "What you receive",
      body: "Six frames per SKU, hero-grade, with editable layered files plus channel-ready exports.",
    },
    bigStat: {
      value: "+38%",
      label: "Lumen Wellness · top SKU",
      body: "Conversion lift in 14 days. Same product, new photography pack and A+ Premium content.",
    },
    miniCase: {
      brand: "Lumen Wellness",
      metric: "+38% conversion · 14 days",
      body: "Studio-grade lifestyle photography + new A+ Premium content pack.",
      href: "/work",
    },
    engagement: [
      {
        name: "Single SKU",
        body: "Six-frame pack for one SKU. Studio + retouch + exports.",
        features: [
          "Pre-pro + shot list",
          "Studio day (1 day)",
          "Six finished frames",
          "Channel-ready exports",
        ],
      },
      {
        name: "Catalog refresh",
        body: "5+ SKUs in one studio block. Best per-SKU economics.",
        features: [
          "Multi-day studio block",
          "Coherent styling across SKUs",
          "A+ infographic templates",
          "Quarterly refresh cycle",
        ],
      },
    ],
    faqs: [
      { q: "Do we need to ship product to you?", a: "Yes — we shoot in-studio in Jhelum or our partner studios in the US and EU. Lead time on shipping is part of the schedule we agree on day one." },
      { q: "Can you shoot lifestyle in real environments?", a: "Yes — we have location partnerships in 4 cities. Or we'll build the set in-studio if the location adds risk to the shoot." },
      { q: "Do you do video?", a: "Yes — vertical, square, and 16:9. Sponsored Brands video, TikTok, Reels, and short-form ad cuts." },
      { q: "How fast?", a: "Standard turnaround is 14 days from product receipt. Rush is 7 days." },
      { q: "Do we own the photos?", a: "Yes. Forever. No license traps." },
    ],
    quote: {
      text: "The product photography alone paid for the entire engagement in the first week.",
      attribution: "CMO · Lumen Wellness",
    },
    comparison: [
      { topic: "Pack scope", us: "6 frames + video, channel-aware exports", them: "Main image only, hope you have the rest" },
      { topic: "Coherence", us: "One product, six frames, same lighting + styling", them: "Stitch from 3 different freelancers" },
      { topic: "Retouch", us: "Editable PSDs, color-matched across pack", them: "Flat JPEGs, no edit history" },
      { topic: "Ownership", us: "All assets yours forever", them: "License-limited usage" },
      { topic: "Refresh cadence", us: "Quarterly drops without restarting", them: "Reshoot from scratch" },
    ],
    guarantees: baseGuarantees,
    onboarding: baseOnboarding,
    output: {
      title: "What you get when the shoot wraps",
      body: "Hero-grade pack, channel-ready, shipped on a deadline.",
      lines: [
        "✓  Six frames per SKU (raw + edited)",
        "✓  Editable layered PSDs",
        "✓  Amazon / Shopify / Meta / TikTok exports",
        "✓  Mood board + shot list (final)",
        "✓  Optional 360° spin pack",
      ],
    },
    related: ["amazon", "bol", "shopify", "ppc"],
    operator: {
      initials: "SH",
      role: "Head of Creative",
      quote: "A+ is a magazine spread. Treat it that way.",
    },
    closeCta: {
      eyebrow: "Ready to shoot?",
      title: "Book a shoot",
      body: "Pre-pro starts the day after sign-off.",
    },
    tone: "copper",
    icon: Camera,
    gallery: {
      eyebrow: "Recent work",
      title: "Studio output, not stock photography.",
      body: "A snapshot of recent product shoots — main image, lifestyle, infographic and 360-spin captures shipped to client catalogs.",
      images: [
        { src: "/PHOTOGRAPHY/MAIN.png", caption: "Main · hero white" },
        { src: "/PHOTOGRAPHY/LIFESTYLE.png", caption: "Lifestyle · in-context" },
        { src: "/PHOTOGRAPHY/INFOGRAPHICS.png", caption: "Infographic · feature" },
        { src: "/PHOTOGRAPHY/DETAIL.png", caption: "Detail · macro" },
        { src: "/PHOTOGRAPHY/HERO_SHOT.png", caption: "Hero · brand pack" },
        { src: "/PHOTOGRAPHY/360SPIN.png", caption: "360 · spin frame" },
      ],
    },
  },

  sourcing: {
    slug: "sourcing",
    hero: {
      chapter: "06 · Product Sourcing",
      title: "Find the SKU before",
      italicTail: "your competitors do.",
      body: "Trend mining, manufacturer vetting, sample QC, and FBA prep — your sourcing arm without the supplier dance.",
      primaryCta: { label: "Brief our sourcing team", href: "/contact?service=sourcing" },
      secondaryCta: { label: "See work", href: "/work" },
      image: "/services/prodcut_sourcing.png",
    },
    stats: [
      { value: "60+", label: "Verified factories" },
      { value: "9 days", label: "Avg sample turnaround" },
      { value: "−22%", label: "Avg COGS vs initial quote" },
      { value: "21 days", label: "Sample → FBA shelf" },
    ],
    problem: {
      eyebrow: "The challenge",
      title: "Sourcing is a full-time job. You don't have one.",
      body: "WhatsApp at 2am with a factory in Shenzhen. Sample shipping that takes three weeks. MOQs that don't fit your cash flow. Quality that drifts after the first PO.",
    },
    approach: [
      { number: "01", title: "Spec the brief", body: "We translate your idea into a manufacturer-ready spec sheet." },
      { number: "02", title: "Vendor shortlist", body: "Three vetted factories per SKU, sampled in parallel." },
      { number: "03", title: "QC + scale", body: "On-site inspections, photo QC reports, escalation playbook." },
      { number: "04", title: "Door-to-FBA", body: "Freight + customs + FBA prep handled end-to-end." },
    ],
    includes: [
      { title: "Trend research", body: "Category mining + competitor analysis." },
      { title: "Spec sheet creation", body: "Manufacturer-ready brief in English + Mandarin." },
      { title: "Vendor vetting", body: "60+ verified factories, ranked per SKU." },
      { title: "Sampling", body: "Parallel samples in 7–14 days." },
      { title: "Negotiation", body: "MOQ, pricing, payment terms — all in your interest." },
      { title: "QC inspections", body: "Pre-shipment with photo reports." },
      { title: "FBA prep", body: "Polybag, label, pallet, comply." },
      { title: "Freight + customs", body: "Air / sea / road, fully handled." },
    ],
    process: [
      { phase: "01 · Brief", body: "Spec sheet + budget + timeline locked in 5 days." },
      { phase: "02 · Sample", body: "Three factories, parallel samples, 14 days." },
      { phase: "03 · Mass production", body: "Negotiated terms, on-site QC." },
      { phase: "04 · Door-to-FBA", body: "Freight + customs + Amazon prep." },
    ],
    tools: [
      "Alibaba",
      "Global Sources",
      "Made-in-China",
      "1688",
      "Inspectorio",
      "QIMA",
      "ShipBob",
      "Flexport",
    ],
    deliverable: {
      title: "What you receive",
      body: "A vetted manufacturer, a sample you can hold in your hand, and a shipping schedule that aligns with your cash flow.",
    },
    bigStat: {
      value: "9 days",
      label: "Hearthwood · sample turnaround",
      body: "Found a 22%-cheaper manufacturer with better QC. Sample arrived in 9 days. SKU launched in 6 weeks.",
    },
    miniCase: {
      brand: "Hearthwood",
      metric: "−22% COGS · 9-day sample",
      body: "Original supplier went dark. New manufacturer vetted, sampled, and producing inside 6 weeks.",
      href: "/work",
    },
    engagement: [
      {
        name: "Per project",
        body: "Single SKU sourced from spec to first shipment.",
        features: [
          "Spec sheet + 3-vendor shortlist",
          "Parallel samples within 14 days",
          "Pre-shipment QC + photo reporting",
          "Door-to-FBA handled",
        ],
      },
      {
        name: "Sourcing partner",
        body: "Ongoing sourcing arm — multiple SKUs, continuous sourcing pipeline.",
        features: [
          "Dedicated sourcing lead",
          "60+ verified factory pool",
          "Trend mining + opportunity reports",
          "Quarterly factory health reviews",
        ],
      },
    ],
    faqs: [
      { q: "Do you take a margin on the product?", a: "No. We charge transparently — flat fee + small % of PO. We're sourcing for you, not selling to you." },
      { q: "Where do you source from?", a: "Primarily China and Vietnam, with India and Pakistan for textiles and home goods. Country of origin is part of the brief." },
      { q: "Sample turnaround?", a: "9 days average. 14 days worst case. We pay rush sampling fees out of our retainer when speed matters." },
      { q: "Do you handle quality control?", a: "Yes. Pre-shipment inspections with photo reports. We have boots on the ground in three Chinese provinces." },
      { q: "What about IP / cloning risks?", a: "Spec sheets we share are scrubbed of brand details. We file Brand Registry before mass production. We have a takedown playbook for Amazon." },
    ],
    quote: {
      text: "Sourcing team found us a manufacturer 22% cheaper with better QC. The sample arrived in 9 days. We launched the SKU 6 weeks later.",
      attribution: "CEO · Hearthwood",
    },
    comparison: [
      { topic: "Pricing model", us: "Flat fee + small PO%, transparent", them: "Hidden margin on every unit" },
      { topic: "Sample speed", us: "9 days average", them: "3 weeks worst case" },
      { topic: "Factory pool", us: "60+ verified, ranked per SKU", them: "Whoever responds first on Alibaba" },
      { topic: "QC", us: "On-site, pre-shipment, photo report", them: "Trust-and-pray" },
      { topic: "Shipping", us: "Door-to-FBA, customs handled", them: "Hand off to a freight forwarder you don't know" },
    ],
    guarantees: baseGuarantees,
    onboarding: baseOnboarding,
    output: {
      title: "Sourcing report sample",
      body: "What you receive after the sample phase.",
      lines: [
        "✓  Three-factory comparison matrix",
        "✓  Sample evaluation + photo log",
        "✓  Negotiated price + MOQ + payment terms",
        "✓  Lead time + freight estimate",
        "✓  Recommended factory + reasoning",
      ],
    },
    related: ["amazon", "freight", "trademark", "photography"],
    operator: {
      initials: "RA",
      role: "Head of Sourcing",
      quote: "Sample first. Negotiate twice. Trust the QC.",
    },
    closeCta: {
      eyebrow: "Ready to source?",
      title: "Brief our sourcing team",
      body: "Spec sheet + shortlist within 5 days.",
    },
    tone: "lime",
    icon: Search,
    gallery: {
      eyebrow: "Sourced + shipped",
      title: "Products sourced for active brands.",
      body: "Recent SKUs sourced, sampled, and shipped to client warehouses across four continents.",
      images: [
        { src: "/stats/products/gloco/1.webp", caption: "Gloco · wellness device" },
        { src: "/stats/products/gloco/3.webp", caption: "Gloco · packaging" },
        { src: "/stats/products/shilajit/1.jpg", caption: "Shilajit · supplement" },
        { src: "/stats/products/Squirtz_drink/1.webp", caption: "Squirtz · beverage" },
        { src: "/stats/products/car_detail_brush/1.jpg", caption: "Detailcraft · auto" },
        { src: "/stats/products/Dog_Stand/1.jpg", caption: "PawSteps · pet" },
      ],
    },
  },

  freight: {
    slug: "freight",
    hero: {
      chapter: "07 · Freight Forwarding",
      title: "Door-to-FBA,",
      italicTail: "origin to destination.",
      body: "Air, sea, and road logistics with customs clearance — complete with FBA prep, pallet labeling, and real-time tracking.",
      primaryCta: { label: "Brief our freight team", href: "/contact?service=freight" },
      secondaryCta: { label: "See work", href: "/work" },
      image: "/services/freight_forward.png",
    },
    stats: [
      { value: "4", label: "Continents covered" },
      { value: "−18%", label: "Avg cost vs. solo broker" },
      { value: "21 days", label: "Sea, port-to-FBA" },
      { value: "6 days", label: "Air, port-to-FBA" },
    ],
    problem: {
      eyebrow: "The challenge",
      title: "Freight is where deals go to die.",
      body: "Container delays, customs holds, MIS-labeled pallets. The freight forwarder you hired in 2022 is now ghosting you. Your inventory cover is two weeks. The launch slipped.",
    },
    approach: [
      { number: "01", title: "Mode selection", body: "Air / sea / road / rail — picked against your inventory cover, not just price." },
      { number: "02", title: "Customs ready", body: "HS codes, duty optimization, and broker relationships in 8 markets." },
      { number: "03", title: "FBA-aware", body: "Pallet labels, polybags, ASN — Amazon-spec from origin." },
      { number: "04", title: "Real-time tracking", body: "One dashboard for every shipment, every leg." },
    ],
    includes: [
      { title: "Mode selection", body: "Air / sea / road / rail consolidation." },
      { title: "Customs clearance", body: "HS codes + duty optimization." },
      { title: "FBA prep", body: "Polybag + label + pallet to spec." },
      { title: "Pallet labeling", body: "Amazon ASN + receiving codes." },
      { title: "Insurance", body: "Cargo insurance for sea + air." },
      { title: "Tracking", body: "One dashboard, every leg." },
      { title: "Returns logistics", body: "Reverse flow + refurbishing." },
      { title: "Inventory forecasting", body: "Tied to lead times + sales velocity." },
    ],
    process: [
      { phase: "01 · Booking", body: "Origin pickup + mode + ETA confirmed." },
      { phase: "02 · In transit", body: "Real-time tracking + customs paperwork." },
      { phase: "03 · Customs + last mile", body: "Cleared, prepped to Amazon spec." },
      { phase: "04 · FBA receipt", body: "Confirmed received, inventory cover updated." },
    ],
    tools: [
      "Flexport",
      "ShipBob",
      "Maersk",
      "DHL",
      "FedEx",
      "Amazon Partnered Carrier",
      "ShipStation",
      "Project44",
    ],
    deliverable: {
      title: "What you get",
      body: "One forwarder, one dashboard, one accountable team — for every shipment, every market.",
    },
    bigStat: {
      value: "21 days",
      label: "China sea → US FBA",
      body: "Average port-to-shelf timing, including customs and Amazon receipt. Add 8 days for AU.",
    },
    miniCase: {
      brand: "Hearthwood",
      metric: "21 days · port-to-FBA",
      body: "Switched from a 35-day forwarder to our network. Cash-flow window opened up.",
      href: "/work",
    },
    engagement: [
      {
        name: "Per shipment",
        body: "Standalone freight bookings, no commitment.",
        features: [
          "Mode comparison + recommendation",
          "Customs + duty handled",
          "FBA prep included",
          "Real-time tracking",
        ],
      },
      {
        name: "Logistics partner",
        body: "Ongoing freight pipeline + inventory forecasting.",
        features: [
          "Inventory forecasting tied to PPC",
          "Multi-market logistics",
          "Returns logistics included",
          "Quarterly cost reviews",
        ],
      },
    ],
    faqs: [
      { q: "Air or sea?", a: "Sea for anything where 21-day port-to-shelf works. Air when inventory cover is below 30 days. We'll model the actual cost-per-day-saved." },
      { q: "Customs in which countries?", a: "US, UK, EU, AU, JP, CA, AE — direct relationships. Other markets via partner brokers." },
      { q: "Do you handle returns?", a: "Yes — reverse flow with refurbishing, restocking, or destruction depending on category." },
      { q: "Insurance?", a: "Cargo insurance is standard on every shipment. We work with three underwriters and pick the right one for your category." },
      { q: "Do you do LTL?", a: "Yes — less-than-container-load consolidation is most of what we do for sub-pallet volumes." },
    ],
    quote: {
      text: "We switched from a 35-day forwarder to Evolut's network. Cash-flow window opened up by two weeks.",
      attribution: "Operations · Hearthwood",
    },
    comparison: [
      { topic: "Mode advice", us: "Inventory-cover aware", them: "Whatever's cheapest" },
      { topic: "Customs", us: "Direct broker relationships in 8 markets", them: "Sub-broker chain" },
      { topic: "FBA prep", us: "Done at origin where labour is cheap", them: "Tacked on at destination" },
      { topic: "Tracking", us: "One dashboard, every leg", them: "Three different portals" },
      { topic: "Cost transparency", us: "All-in quote, no surprises", them: "Surcharges revealed at port" },
    ],
    guarantees: baseGuarantees,
    onboarding: baseOnboarding,
    output: {
      title: "Shipment report",
      body: "What you see in the dashboard.",
      lines: [
        "✓  Live ETA + container/AWB tracking",
        "✓  Customs status + paperwork log",
        "✓  Cost breakdown — freight + duty + prep + insurance",
        "✓  FBA receipt confirmation",
        "✓  Inventory cover days remaining",
      ],
    },
    related: ["sourcing", "amazon", "trademark", "ppc"],
    operator: {
      initials: "RA",
      role: "Head of Sourcing",
      quote: "Sample first. Negotiate twice. Trust the QC.",
    },
    closeCta: {
      eyebrow: "Ready to ship?",
      title: "Brief our freight team",
      body: "Quote within 24h. First booking the same week.",
    },
    tone: "obsidian",
    icon: Truck,
  },

  trademark: {
    slug: "trademark",
    hero: {
      chapter: "08 · Trademark & Patent",
      title: "Protect your brand.",
      italicTail: "Scale with confidence.",
      body: "Patent search, trademark filing, and Amazon Brand Registry — full-service IP protection with local + international counsel.",
      primaryCta: { label: "Brief our IP team", href: "/contact?service=trademark" },
      secondaryCta: { label: "See work", href: "/work" },
      image: "/services/trademark.png",
    },
    stats: [
      { value: "100%", label: "Brand Registry pass-rate" },
      { value: "12 wks", label: "Avg trademark approval" },
      { value: "8", label: "Markets covered" },
      { value: "0", label: "Listing-hijack incidents post-filing" },
    ],
    problem: {
      eyebrow: "The challenge",
      title: "The first listing hijack costs more than 5 years of trademark fees.",
      body: "Cease-and-desist drafts that nobody reads. Brand Registry rejected because your USPTO filing has a class mismatch. Counterfeits ranking above your hero SKU.",
    },
    approach: [
      { number: "01", title: "Search first", body: "Trademark + patent search before you file. Saves time and rejection fees." },
      { number: "02", title: "File correctly", body: "Class selection, specimen submission, response strategy — all locked." },
      { number: "03", title: "Brand Registry", body: "Amazon enrollment + IP defense workflow set up." },
      { number: "04", title: "Defend actively", body: "Takedown playbook, listing monitoring, counterfeit tracking." },
    ],
    includes: [
      { title: "Trademark search", body: "USPTO + WIPO + EUIPO + AU + CA + JP." },
      { title: "Trademark filing", body: "Direct + Madrid Protocol where it makes sense." },
      { title: "Office actions", body: "Drafting + counsel-led response strategy." },
      { title: "Patent search", body: "Prior-art + freedom-to-operate analysis." },
      { title: "Patent filing", body: "Provisional + utility + design patents." },
      { title: "Amazon Brand Registry", body: "Enrollment + IP Accelerator routes." },
      { title: "Listing defense", body: "Takedown playbook + counterfeit monitoring." },
      { title: "Renewals", body: "Calendar + counsel relationships." },
    ],
    process: [
      { phase: "01 · Search", body: "Trademark + patent search, 5 days." },
      { phase: "02 · File", body: "Filings submitted within 10 days of approval." },
      { phase: "03 · Brand Registry", body: "Amazon enrollment + IP workflow." },
      { phase: "04 · Defend", body: "Monitoring + takedowns + renewals tracked." },
    ],
    tools: [
      "USPTO TESS",
      "WIPO Madrid",
      "EUIPO",
      "Amazon Brand Registry",
      "IP Accelerator",
      "Trademarkia",
      "PatentsView",
    ],
    deliverable: {
      title: "What you receive",
      body: "A registered mark, an active Brand Registry account, and a defense playbook for when (not if) someone goes after your listing.",
    },
    bigStat: {
      value: "0",
      label: "Listing-hijack incidents · post-filing",
      body: "Across 240 active brands. Filing isn't insurance — it's the deterrent.",
    },
    miniCase: {
      brand: "Shilajit Co.",
      metric: "Brand Registry · approved",
      body: "Single-SKU brand entering AU/NZ. Brand Registry filed and approved before launch.",
      href: "/work/shilajit-resin-au",
    },
    engagement: [
      {
        name: "Per filing",
        body: "Single-class trademark filing in one market.",
        features: [
          "Search + class selection",
          "Application drafting + filing",
          "Office action response",
          "Brand Registry enrollment",
        ],
      },
      {
        name: "IP partner",
        body: "Ongoing IP arm — multi-market filings, monitoring, defense.",
        features: [
          "Multi-class, multi-market filings",
          "Madrid Protocol where applicable",
          "Listing-defense monitoring",
          "Renewals + portfolio reviews",
        ],
      },
    ],
    faqs: [
      { q: "Do I need a trademark before launching on Amazon?", a: "Yes — Brand Registry requires a registered or pending trademark. Filing as a pending application via IP Accelerator is the fastest path." },
      { q: "USPTO or Madrid Protocol?", a: "USPTO first if you're US-only. Madrid Protocol once you're in 3+ markets — cheaper and consolidated renewals." },
      { q: "How long does a trademark take?", a: "12 weeks for the office to respond. 8–14 months for full registration. Brand Registry can use the pending application." },
      { q: "Patent vs trademark?", a: "Different tools. Trademark protects the brand. Patent protects the invention. Most consumer brands need a trademark first; some also need a design patent." },
      { q: "What about counterfeits?", a: "We have a takedown playbook for Amazon and TikTok Shop. We've filed 200+ takedowns across our portfolio. None have been reversed." },
    ],
    quote: {
      text: "They handled the AU launch end-to-end while we focused on supply. We didn't lose a day to vendor coordination.",
      attribution: "Operator · Shilajit Co.",
    },
    comparison: [
      { topic: "Search", us: "Pre-file search across all relevant offices", them: "File first, hope it doesn't get rejected" },
      { topic: "Office actions", us: "Counsel-led response, included in scope", them: "Extra fee per response" },
      { topic: "Markets", us: "8 markets directly, more via partners", them: "US-only" },
      { topic: "Brand Registry", us: "Done as part of the engagement", them: "\"That's separate\"" },
      { topic: "Defense", us: "Takedown playbook + monitoring", them: "Filing only — defense is a different vendor" },
    ],
    guarantees: baseGuarantees,
    onboarding: baseOnboarding,
    output: {
      title: "What you receive when filing closes",
      body: "Documented, calendared, defended.",
      lines: [
        "✓  Registered trademark + serial number",
        "✓  Brand Registry approval",
        "✓  Class + specimen documentation",
        "✓  Renewal calendar + reminders",
        "✓  Listing-defense playbook + takedown templates",
      ],
    },
    related: ["amazon", "bol", "sourcing", "freight"],
    operator: {
      initials: "ZK",
      role: "Head of Amazon",
      quote: "Vendor, Seller, FBA — wherever the math works.",
    },
    closeCta: {
      eyebrow: "Ready to defend?",
      title: "Brief our IP team",
      body: "Search delivered in 5 days. Filing within 10 of go-ahead.",
    },
    tone: "obsidian",
    icon: ShieldCheck,
    visualStory: {
      eyebrow: "The IP journey",
      title: "Search. File. Defend.",
      body: "Three moves, two registries. Each step is owned end-to-end — no handoffs, no lost paperwork between steps.",
      steps: [
        {
          image: "/services/patent_design.png",
          label: "Step 01 · Search",
          caption: "Prior-art + trademark search across USPTO, WIPO, EUIPO, AU, CA, JP — flagged conflicts, not just hits.",
        },
        {
          image: "/services/patent_registration.png",
          label: "Step 02 · File",
          caption: "Drafting and submission with counsel review. Class selection, specimens, office-action playbook ready before filing.",
        },
        {
          image: "/services/trademark_registration.png",
          label: "Step 03 · Register & defend",
          caption: "Registration confirmed, Brand Registry enrolled, takedown calendar live. The mark goes from filed to defended.",
        },
      ],
    },
    gallery: {
      eyebrow: "Filings on the wall",
      title: "Real registrations, not stock screenshots.",
      body: "A glimpse of recent trademark filings completed for client brands. Names redacted out of habit — the documents are real.",
      fit: "contain",
      aspect: "4/3",
      images: [
        { src: "/services/trademark_proof1.jpeg", caption: "Trademark · USPTO" },
        { src: "/services/trademark_proof2.jpeg", caption: "Trademark · USPTO" },
        { src: "/services/trademark_proof3.jpeg", caption: "Trademark · USPTO" },
        { src: "/services/trademark_proof4.jpeg", caption: "Trademark · USPTO" },
      ],
    },
  },
};
