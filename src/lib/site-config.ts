import type { LucideIcon } from "lucide-react";
import {
  ShoppingBag,
  Code2,
  Camera,
  PaintBucket,
  Truck,
  ShieldCheck,
  Search,
  Megaphone,
  FileSearch,
  CircuitBoard,
  BadgeCheck,
  Scale,
  Zap,
  Store,
  Fingerprint,
} from "lucide-react";

export const site = {
  name: "Evolut",
  fullName: "Evolut Ecommerce Solutions",
  tagline: "Ecommerce Solutions, Engineered for Scale",
  promise:
    "When your ideas take shape, our expertise takes over. Your ecommerce business won't just survive — it will thrive, grow, and reach new heights.",
  description:
    "Evolut Ecommerce Solutions is a full-stack ecommerce agency for Amazon sellers, Shopify brands, and DTC operators. We run sourcing, listings, photography, ads, trademark registration, freight forwarding, and Shopify/MERN development under one accountable team — with $420M+ GMV under management across 240+ active brands and 4 continents.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://evolutecomsolutions.com",
  contact: {
    email: "support@evolutecomsolutions.com",
    phone: "+92 301 5574 531",
    address: "Citi Housing Society, Jhelum, Pakistan",
    availability: "Available 24/7 — email, phone, WhatsApp, live chat",
  },
  socials: {
    linkedin: "https://linkedin.com/company/evolut",
    instagram: "https://instagram.com/evolut",
    twitter: "https://x.com/evolut",
  },
};

export const navItems = [
  { label: "Services", href: "/services" },
  { label: "IP Accelerator", href: "/ip-accelerator" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  detail: string;
  features: string[];
  icon: LucideIcon;
  accent: "electric" | "copper" | "obsidian" | "chrome" | "lime";
};

export const services: Service[] = [
  {
    slug: "amazon",
    title: "Amazon Account Management",
    blurb: "End-to-end seller, vendor, and FBA operations.",
    detail:
      "Vendor Central, Vendor Express, Seller Central, FBA — we run them all. Diverse category expertise across business sizes, with playbooks built from 8-figure brand operations.",
    features: [
      "Channel optimization (Vendor / Seller / FBA)",
      "Listing SEO — titles, bullets, descriptions, keywords",
      "Inventory & stock availability tracking",
      "Sponsored Products & PPC management",
      "Pricing & profit maximization",
      "Brand presence & competitive SWOT",
    ],
    icon: ShoppingBag,
    accent: "electric",
  },
  {
    slug: "shopify",
    title: "Shopify & MERN Development",
    blurb: "Custom design to seamless integration.",
    detail:
      "From startup to enterprise — we build Shopify stores and MERN-stack apps that convert. Custom themes, third-party integrations, and the scaling architecture to handle launch-day spikes.",
    features: [
      "Custom Shopify theme development",
      "MERN-stack web applications (MongoDB, Express, React, Node)",
      "Headless storefronts (Hydrogen)",
      "Payment, CRM, email integrations (Stripe, HubSpot, Mailchimp)",
      "Core Web Vitals tuning",
    ],
    icon: Code2,
    accent: "obsidian",
  },
  {
    slug: "bol",
    title: "Branding & Listing Optimization",
    blurb: "BOL — creative design to enhanced visibility.",
    detail:
      "Eye-catching branding paired with compelling, data-driven listings. We analyze shopper behavior to optimize every element — from A+ content to enhanced brand content.",
    features: [
      "Brand identity systems",
      "A+ Content & Brand Stores",
      "Listing copy that converts",
      "Variation & catalog architecture",
    ],
    icon: PaintBucket,
    accent: "copper",
  },
  {
    slug: "ppc",
    title: "PPC & Advertising",
    blurb: "Sponsored Products. Smart automation. Real ROAS.",
    detail:
      "Amazon Sponsored Products, Brands, Display campaigns engineered around your real margin profile. Manual layered with automation — never just one or the other.",
    features: [
      "Keyword research & match-type strategy",
      "Bid management & budget pacing",
      "Sponsored Brands & Display campaigns",
      "DSP (Demand-Side Platform) for advanced retargeting",
    ],
    icon: Megaphone,
    accent: "electric",
  },
  {
    slug: "photography",
    title: "Product Photography",
    blurb: "Stunning imagery, designed to convert.",
    detail:
      "Studio-grade product photography optimized for multi-platform use. Don't hire photography separately — get the whole package for coherent aesthetics.",
    features: [
      "Studio & lifestyle photography",
      "Amazon-compliant main images",
      "Multi-platform crop & retouch",
      "360° spin & video b-roll",
    ],
    icon: Camera,
    accent: "copper",
  },
  {
    slug: "sourcing",
    title: "Product Sourcing",
    blurb: "Be your Amazon sourcing agent — end to end.",
    detail:
      "When you source with us, you don't worry about anything. Quotation, sampling, mass production oversight, QC inspections, FBA prep, and shipping — handled.",
    features: [
      "Trend & demand research",
      "Manufacturer vetting & sampling",
      "MOQ & price negotiation",
      "Quality control inspections",
      "FBA prep & pallet labeling",
    ],
    icon: Search,
    accent: "obsidian",
  },
  {
    slug: "freight",
    title: "Freight Forwarding",
    blurb: "Door-to-FBA, origin to destination.",
    detail:
      "Air, sea, and road logistics with customs clearance. We understand the complexities of international shipping and run it all — extensive partner and carrier network for safe, timely delivery.",
    features: [
      "Air, sea, road consolidation",
      "FBA prep & pallet labeling",
      "Customs clearance & duty optimization",
      "Real-time shipment tracking",
    ],
    icon: Truck,
    accent: "chrome",
  },
  {
    slug: "trademark",
    title: "Trademark & Patent Registration",
    blurb: "Protect your ideas. Secure your brand. Scale with confidence.",
    detail:
      "Patent search, patent registration, and trademark registration — full-service IP protection for local and international clients with fast execution and dedicated support.",
    features: [
      "In-depth patent searches & risk analysis",
      "Patent eligibility, documentation & filing",
      "Trademark availability checks & filing",
      "Amazon Brand Registry enrollment",
      "Objection resolution support",
    ],
    icon: ShieldCheck,
    accent: "chrome",
  },
];

export const stats = [
  { label: "Active brands managed", value: 240, suffix: "+" },
  { label: "Avg ROAS lift in 90 days", value: 3.4, suffix: "×", isFloat: true },
  { label: "ASINs optimized", value: 18000, suffix: "+" },
  { label: "Years of operator experience", value: 9, suffix: "" },
];

export const deepStats = [
  { label: "Average conversion lift", value: "+38%", note: "Top SKU, 14 days" },
  { label: "PPC efficiency improvement", value: "2.7×", note: "ACoS reduction" },
  { label: "Sessions growth", value: "+162%", note: "90 days post-launch" },
  { label: "Brand search increase", value: "4.1×", note: "Within 6 months" },
  { label: "Time-to-FBA", value: "21 days", note: "From sample to shelf" },
  { label: "Catalogs managed", value: "$420M", note: "Total GMV under mgmt" },
];

export const testimonials = [
  {
    quote:
      "Evolut took our Amazon presence from \"we have listings\" to \"we own the category.\" 4× revenue in 11 months without raising more capital.",
    name: "Sarah K.",
    role: "Founder, DTC Outdoor Brand",
    photo: "/testimonals_images/sarah.png",
  },
  {
    quote:
      "The product photography alone paid for the entire engagement in the first week. Conversion on our top SKU jumped 38% overnight.",
    name: "Marcus T.",
    role: "CMO, Wellness 7-figure Brand",
    photo: "/testimonals_images/marcust.png",
  },
  {
    quote:
      "We tried three agencies before Evolut. They're the first team that operated like operators — not just executors. Real opinions, real numbers.",
    name: "Priya R.",
    role: "COO, Beauty DTC",
    photo: "/testimonals_images/priya.png",
  },
  {
    quote:
      "Headless Shopify build delivered in 6 weeks, Core Web Vitals all green, and the team handled migration without a single day of downtime.",
    name: "James L.",
    role: "Founder, Tech Accessories",
    photo: "/testimonals_images/jamesl.png",
  },
  {
    quote:
      "Sourcing team found us a manufacturer 22% cheaper with better QC. The sample arrived in 9 days. We launched the SKU 6 weeks later.",
    name: "Olivia D.",
    role: "CEO, Home & Kitchen Brand",
    photo: "/testimonals_images/olivia.png",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Sourcing",
    blurb:
      "Find the SKU before your competitors do. Trend mining, manufacturer vetting, sample QC.",
    detail:
      "We act as your Amazon sourcing agent. Quotation, sample evaluation, mass production oversight, QC inspections, FBA packaging, and shipping logistics — all under one roof.",
    accent: "copper" as const,
  },
  {
    n: "02",
    title: "Listing",
    blurb:
      "Architect the catalog. Title, bullets, A+ content, variations — engineered for the algorithm.",
    detail:
      "Comprehensive product information, high-performance keywords, top search rankings. SEO-optimized titles, bullets, descriptions — all designed for Amazon's algorithm and the human shopper.",
    accent: "lime" as const,
  },
  {
    n: "03",
    title: "Photography",
    blurb:
      "Studio-grade visuals built for conversion. Main image, lifestyle, infographic, video b-roll.",
    detail:
      "Your listing image is the first impression. We deliver the full package — main image, gallery, lifestyle, infographics, 360° spin, and video — for coherent aesthetics across every channel.",
    accent: "obsidian" as const,
  },
  {
    n: "04",
    title: "Ads",
    blurb:
      "Sponsored Products, Brands, Display. Manual campaigns layered with smart automation.",
    detail:
      "We identify the right keywords, create the perfect ad copy, and structure campaigns to drive targeted traffic and improve product discoverability — without burning budget.",
    accent: "electric" as const,
  },
  {
    n: "05",
    title: "Scale",
    blurb:
      "Inventory forecasting, international expansion, brand protection. Compounding growth.",
    detail:
      "Once the engine is running, we scale it. Inventory forecasting, international marketplace expansion, brand protection via trademark, and the operational rhythm to compound growth.",
    accent: "emerald" as const,
  },
];

export const trustedLogos = [
  "Amazon",
  "Shopify",
  "Walmart",
  "TikTok Shop",
  "Meta",
  "Google",
  "Etsy",
  "eBay",
];

export const whyUs = [
  {
    title: "Operators, not executors",
    detail:
      "Our team has scaled brands past 8 figures. We don't just run playbooks — we wrote them.",
  },
  {
    title: "Single accountable team",
    detail:
      "Sourcing, listings, photography, and ads compound when one team owns them. No agency tag-outs.",
  },
  {
    title: "Algorithm + shopper expertise",
    detail:
      "We know what Amazon shoppers are searching for and can optimize content and ads to match intent.",
  },
  {
    title: "Available 24/7",
    detail:
      "Email, phone, WhatsApp, live chat. Time zones are not your problem to solve.",
  },
  {
    title: "Results-driven, not retainer-driven",
    detail:
      "Engagements scoped by outcomes — not hours. We win when you win.",
  },
  {
    title: "Pakistan-based, globally trusted",
    detail:
      "Studio operations in Jhelum, clients across 4 continents. Premium quality at competitive cost.",
  },
];

export const sourcingProcess = [
  { n: "01", title: "Initial Request", blurb: "Submit via form or email — expect contact within 48 hours." },
  { n: "02", title: "Quotation", blurb: "Receive transparent pricing for desired products." },
  { n: "03", title: "Sampling", blurb: "Review samples before committing to mass production." },
  { n: "04", title: "Quality Inspection", blurb: "Detailed QC with photographic reporting." },
  { n: "05", title: "FBA Preparation", blurb: "Package and label per Amazon's exact requirements." },
  { n: "06", title: "Shipping", blurb: "Verify costs and arrange door-to-FBA delivery." },
];

export const trademarkPillars = [
  {
    title: "Patent Search",
    detail:
      "In-depth patent searches to verify if your invention or concept already exists. Comprehensive database research and risk analysis reports.",
    icon: FileSearch,
  },
  {
    title: "Patent Registration",
    detail:
      "Full-service patent protection — eligibility assessment, documentation support, application filing, and legal guidance throughout.",
    icon: ShieldCheck,
  },
  {
    title: "Trademark Registration",
    detail:
      "Brand protection covering trademark availability searches, application filing, documentation handling, and objection resolution.",
    icon: CircuitBoard,
  },
];

/* ------------------------------------------------------------------ *
 * Amazon IP Accelerator — brand-protection program offering.
 * Powers the homepage <IpAccelerator /> section + the /ip-accelerator page.
 * ------------------------------------------------------------------ */
export const ipAccelerator = {
  eyebrow: "Amazon IP Accelerator",
  badge: "Brand-protection program",
  title: "Protect your brand before the trademark even registers.",
  subtitle:
    "Amazon's IP Accelerator connects brands with vetted IP law firms and unlocks Brand Registry protections early — months before a trademark certificate would normally arrive. We run the whole path for you, from filing to enforcement.",
  benefits: [
    {
      title: "Early Brand Registry access",
      detail:
        "Unlock Amazon Brand Registry while your trademark is still pending — no waiting 6–12 months for the certificate to start protecting your listings.",
      icon: BadgeCheck,
    },
    {
      title: "Vetted IP law firms",
      detail:
        "We match you with Amazon-approved trademark attorneys at pre-negotiated, transparent rates. No hunting, no surprise legal bills.",
      icon: Scale,
    },
    {
      title: "Faster trademark filing",
      detail:
        "Your name and logo are drafted and filed in days — the mark enters examination while your protected listings go live.",
      icon: Zap,
    },
    {
      title: "Counterfeit & hijacker defense",
      detail:
        "Transparency codes, Project Zero, and automated takedowns keep copycats and unauthorized sellers off your detail pages.",
      icon: ShieldCheck,
    },
    {
      title: "Full brand toolkit unlocked",
      detail:
        "A+ Content, Brand Store, Sponsored Brands, Posts, and Vine — the entire Brand Registry suite, set up and ready to convert.",
      icon: Store,
    },
    {
      title: "Ongoing IP monitoring",
      detail:
        "We watch your marks, renewals, and infringements across marketplaces so protection never lapses as you scale.",
      icon: Fingerprint,
    },
  ],
  steps: [
    {
      n: "01",
      title: "Eligibility & strategy",
      blurb:
        "We assess your brand, mark, and category, then map the fastest route to registered protection.",
    },
    {
      n: "02",
      title: "IP firm match",
      blurb:
        "You're introduced to a vetted, Amazon-approved trademark attorney at pre-negotiated pricing.",
    },
    {
      n: "03",
      title: "Trademark filing",
      blurb:
        "Your name and logo are drafted and filed for registration — the clock on protection starts.",
    },
    {
      n: "04",
      title: "Brand Registry enrollment",
      blurb:
        "We enroll you early and switch on the full suite of protection tools immediately.",
    },
    {
      n: "05",
      title: "Protect & scale",
      blurb:
        "Transparency, takedowns, A+ content, and monitoring run continuously as your catalog grows.",
    },
  ],
  stats: [
    { value: "Weeks", label: "To Brand Registry, not months" },
    { value: "Approved", label: "Amazon-vetted IP firms" },
    { value: "24/7", label: "Infringement monitoring" },
    { value: "End-to-end", label: "Filing to enforcement" },
  ],
  toolkit: [
    "A+ Content",
    "Brand Store",
    "Sponsored Brands",
    "Transparency",
    "Project Zero",
    "Brand Analytics",
    "Amazon Vine",
    "Posts",
  ],
} as const;

export const techStack = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "UI" },
  { name: "Node.js", category: "Runtime" },
  { name: "Express", category: "API" },
  { name: "MongoDB", category: "Database" },
  { name: "Shopify", category: "Commerce" },
  { name: "Hydrogen", category: "Headless" },
  { name: "Stripe", category: "Payments" },
  { name: "PayPal", category: "Payments" },
  { name: "HubSpot", category: "CRM" },
  { name: "Salesforce", category: "CRM" },
  { name: "Mailchimp", category: "Email" },
];

export const faqs = [
  {
    q: "What does Evolut actually do?",
    a: "We're a full-stack ecommerce services team. We run sourcing, Amazon and Shopify operations, listings, photography, ads, and trademark — for brands that don't want to stitch together five different vendors.",
  },
  {
    q: "Who is this for?",
    a: "Founders and operators selling on Amazon, Shopify, Walmart, TikTok Shop, and DTC. From first-SKU launches to 8-figure portfolios. If your ecommerce ops feel reactive instead of compounding, we're the right call.",
  },
  {
    q: "How fast can you start?",
    a: "Discovery call within 48 hours. Audit delivered within 5 business days. Engagement starts as soon as scope is signed — typically week two.",
  },
  {
    q: "Do you take equity or revenue share?",
    a: "Default engagements are monthly retainer. We've structured rev-share or equity for the right brand at the right stage — not the default.",
  },
  {
    q: "What's the minimum engagement?",
    a: "90 days. Less than that and we can't show you a real result — and we'd rather decline than over-promise.",
  },
  {
    q: "Where are you based?",
    a: "Studio operations in Jhelum, Pakistan. Clients across North America, Europe, the Middle East, and Australia. Available 24/7 across time zones.",
  },
  {
    q: "Can we just hire you for one service?",
    a: "Yes. Photography, trademark, sourcing, or ads can be standalone engagements. The compounding only happens when they're paired — but we don't gate-keep.",
  },
  {
    q: "What if it's not working?",
    a: "30-day exit clause after the first 90. We'd rather lose a contract than a reputation.",
  },
];

export const philosophy = [
  {
    n: "01",
    title: "Compounding over hustle",
    detail:
      "One careful 1% lift on the right lever beats ten frantic experiments. We make moves that stack.",
  },
  {
    n: "02",
    title: "Data is a flashlight, not a verdict",
    detail:
      "We use data to surface options. We use judgment to choose between them.",
  },
  {
    n: "03",
    title: "Speed without panic",
    detail:
      "Move fast on reversible decisions. Move deliberately on the ones that aren't.",
  },
  {
    n: "04",
    title: "The brand is the moat",
    detail:
      "Channels change, algorithms shift, ad costs climb. The brand is the only durable asset — we build for that horizon.",
  },
];

export type Insight = {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  /** Markdown-ish body — paragraphs separated by blank lines, ## for h2 */
  body: string;
  publishedAt: string;
  author: string;
};

export const insights: Insight[] = [
  {
    slug: "ppc-ladder-2026",
    category: "Amazon Strategy",
    readTime: "6 min",
    title: "The 2026 PPC ladder: how to climb without burning ACOS",
    excerpt:
      "Manual layered with smart automation, structured around margin tiers. Here's the playbook we use across 240+ brands.",
    publishedAt: "2026-04-21",
    author: "MN · Head of Performance",
    body: `
Most ad accounts we audit have the same problem — every campaign reports back to one ACoS number, and that number tells you nothing about which dollar is profitable.

## The ladder, top to bottom

We tier campaigns by margin contribution, not by intent type. The top of the ladder is brand-defense and post-purchase retargeting (lowest ACoS, highest margin recapture). The middle is hero-SKU expansion. The bottom is pure discovery — broad-match, sponsored display, and the only place where a 50% ACoS is acceptable, because it's funding tomorrow's branded searches.

## Manual + smart-auto, never one or the other

Auto campaigns are research tools, not revenue tools. Run them on the bottom rung with tight budgets, mine the search terms weekly, and graduate winners up to manual phrase + exact in the middle rung. The mistake we see brands make is leaving auto on with $300 daily caps — that's not a strategy, that's a tax.

## What the weekly review looks like

Every Friday: harvest, prune, scale. Harvest = winners promoted up the ladder. Prune = anything below break-even ACoS for two consecutive weeks. Scale = budget added to the rungs above their target ACoS, never below. The whole review is 45 minutes when the ladder is wired correctly.
    `.trim(),
  },
  {
    slug: "a-plus-magazine-spread",
    category: "Brand Building",
    readTime: "8 min",
    title: "Why your A+ content is invisible (and the 4-block fix)",
    excerpt:
      "Most A+ pages are rearranged feature lists. The brands winning right now treat A+ like a magazine spread.",
    publishedAt: "2026-04-14",
    author: "SH · Head of Creative",
    body: `
Open any Amazon detail page that converts above category average and the A+ section reads like a magazine spread — three big visual moments, one comparison, and a brand-story closer. That's it. Four blocks, in that order.

## Block 1 — the editorial hero

Stop with the "key features" grid as block one. The first thing below the buy box should be a single hero image — the product in its most aspirational context — paired with a one-line headline. Not a paragraph. A line.

## Block 2 — the proof gauntlet

This is where most brands skip ahead. The second block has to earn the rest of the page. Use it for the trust signal: certifications, the founder, the manufacturing standard, the user-generated testimonial. Not bullet points.

## Block 3 — the comparison

This is the only block where dense information works. A 3-column comparison vs. the alternatives — including doing nothing — that ends with the obvious choice circled. Comparison tables read at a glance, which is what shoppers do.

## Block 4 — the brand close

The last block is brand. Not features. Not specs. Brand. Tagline, logo, a footer-style line about why you exist. This is the block that gets the next product in the catalog purchased — the one Amazon doesn't credit to your A+ but absolutely should.
    `.trim(),
  },
  {
    slug: "vet-a-manufacturer",
    category: "Sourcing",
    readTime: "5 min",
    title: "How to vet a manufacturer in 3 emails or less",
    excerpt:
      "Most factories pass the first email. The real signal is in the second and third — here's what to ask.",
    publishedAt: "2026-04-07",
    author: "RA · Head of Sourcing",
    body: `
Sourcing audits are won and lost in the first week of email correspondence. Anyone can pass a polite first reply. The signal is in how quickly things degrade — or don't — by the third exchange.

## Email one — the spec test

Send a tight RFQ with three specs intentionally mis-stated (wrong material, wrong MOQ, wrong tolerance). The factories that copy-paste your spec into a quote without questioning anything are the ones who'll ship you the wrong thing six months from now. The factories that flag all three are your shortlist.

## Email two — the timeline test

Once you've shortlisted, ask for a sample within 14 days at your spec. Watch what they propose. A real factory has a calendar — they'll come back with a date, a tracking number plan, and a Q&A list. A trading company will say "no problem, very fast" without a single specific.

## Email three — the QC test

Ask for the full QC checklist they'll run on your specific SKU. Not their generic ISO doc. Your SKU. Factories with real QA capability send you a one-page checklist by Tuesday. The rest go quiet, then send a vague PDF on Friday. That's your answer.

## The shortcut

If a factory passes all three emails, the sample is usually right too. Sample failures correlate almost perfectly with sloppy email replies. We've yet to find an exception across 60+ verified factories in our network.
    `.trim(),
  },
];

export const operators = [
  { initials: "AM", role: "Founder & Head of Ops", focus: "Strategy, P&L" },
  { initials: "ZK", role: "Head of Amazon", focus: "Vendor / Seller / FBA" },
  { initials: "SH", role: "Head of Creative", focus: "Brand, photo, A+" },
  { initials: "RA", role: "Head of Sourcing", focus: "Manufacturing, QC" },
  { initials: "TF", role: "Head of Engineering", focus: "Shopify, MERN" },
  { initials: "MN", role: "Head of Performance", focus: "PPC, DSP, attribution" },
];

export type CaseStudy = {
  slug: string;
  brand: string;
  productName: string;
  category: string;
  /** Bento card size — drives grid layout on home + work index */
  bento: "wide" | "tall" | "regular";
  /** Surface tone */
  accent: "electric" | "copper" | "obsidian" | "chrome" | "lime";
  /** Hero / cover image */
  image: string;
  /** Optional brand logo (circular chip on the cover) */
  logo?: string;
  /** Real Amazon Sales-Snapshot image, when available */
  salesChart?: string;
  /** Headline metric for cards */
  metric: { label: string; value: string };
  /** 4 supporting numbers for the at-a-glance stats bar */
  stats: { value: string; label: string }[];
  /** Short narrative */
  challenge: string;
  outcome: string;
  duration: string;
  /** Services applied (slugs from `services` array) */
  channels: string[];
  /** Pull quote for the testimonial slot */
  quote?: { text: string; attribution: string };
  /** Timeline of execution — 4-6 phases */
  timeline?: { phase: string; body: string }[];
  /** 6-shot photography pack to show in the creative section */
  shots?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "gloco-calm-carry-us",
    brand: "Gloco",
    productName: "Calm Carry · personal wellness device",
    category: "Wellness · Personal Care",
    bento: "wide",
    accent: "obsidian",
    image: "/stats/products/gloco/1.webp",
    logo: "/gloco_logo.avif",
    salesChart: "/stats/results/gloco_stats.png",
    metric: { label: "Sales · YTD", value: "$614,536.70" },
    stats: [
      { value: "16,957", label: "Orders" },
      { value: "17,334", label: "Units sold" },
      { value: "$36.24", label: "AOV" },
      { value: "1.02", label: "Units / order" },
    ],
    challenge:
      "A new device entering a wellness category dominated by lookalikes, with no Amazon footprint and zero organic search share.",
    outcome:
      "Sourced, photographed, listed, and scaled in one continuous loop. From first sample to a six-figure listing inside the year.",
    duration: "12 months",
    channels: ["sourcing", "photography", "bol", "amazon", "ppc", "trademark"],
    quote: {
      text: "We came to Evolut with a prototype and walked out 12 months later with a six-figure Amazon listing. They ran the entire stack — we ran the brand.",
      attribution: "Founder, Gloco",
    },
    timeline: [
      { phase: "01 · Sourcing", body: "Manufacturer vetted in CN, samples shipped in 12 days, packaging spec locked." },
      { phase: "02 · Photography", body: "Studio + lifestyle pack, infographic-led main image, 360° spin." },
      { phase: "03 · Listing", body: "Title / bullets / A+ Premium / Brand Store across 8 SKUs." },
      { phase: "04 · Launch", body: "Sponsored Products + Brands, Brand Registry filed, review velocity ramp." },
      { phase: "05 · Scale", body: "DSP retargeting, ACoS pulled to <14%, scaled to $50K+ / month." },
    ],
    shots: [
      "/stats/products/gloco/1.webp",
      "/stats/products/gloco/2.webp",
      "/stats/products/gloco/3.webp",
      "/stats/products/gloco/4.webp",
      "/stats/products/gloco/5.webp",
      "/stats/products/gloco/6.webp",
    ],
  },
  {
    slug: "squirtz-water-enhancer-us",
    brand: "Squirtz",
    productName: "Water Enhancer · CPG beverage",
    category: "Beverage · CPG",
    bento: "tall",
    accent: "copper",
    image: "/stats/products/Squirtz_drink/1.webp",
    salesChart: "/stats/results/squirtz-sales.jpeg",
    metric: { label: "Revenue · 6 months", value: "+412%" },
    stats: [
      { value: "0 → 4.7★", label: "Review score" },
      { value: "−39%", label: "ACoS" },
      { value: "8 SKUs", label: "Catalog scaled" },
      { value: "12 wks", label: "Time to lift" },
    ],
    challenge:
      "Stale catalog, weak listing photography, and PPC bleeding budget on broad-match keywords with no margin tiers.",
    outcome:
      "Re-shot every SKU in studio, restructured campaigns into margin tiers, and rebuilt the brand store as a single shoppable experience.",
    duration: "6 months",
    channels: ["photography", "bol", "amazon", "ppc"],
    quote: {
      text: "ACoS dropped 39 percent in the first quarter. The new photos didn't hurt either.",
      attribution: "Marketing lead, Squirtz",
    },
    timeline: [
      { phase: "01 · Audit", body: "Listing audit + PPC structure rebuild plan locked in 5 days." },
      { phase: "02 · Photography", body: "Studio + lifestyle re-shoot across all 8 SKUs in two weeks." },
      { phase: "03 · Listings", body: "Copy rewrites, A+ Premium, Brand Store overhaul." },
      { phase: "04 · PPC", body: "Manual + smart-auto tiers by margin, broad-match killed." },
    ],
    shots: [
      "/stats/products/Squirtz_drink/1.webp",
      "/stats/products/Squirtz_drink/2.jpg",
      "/stats/products/Squirtz_drink/3.jpg",
      "/stats/products/Squirtz_drink/4.jpg",
      "/stats/products/Squirtz_drink/5.jpg",
      "/stats/products/Squirtz_drink/6.jpg",
    ],
  },
  {
    slug: "shilajit-resin-au",
    brand: "Shilajit Co.",
    productName: "Resin · Australia launch",
    category: "Supplements · Nutrition",
    bento: "regular",
    accent: "electric",
    image: "/stats/products/shilajit/1.jpg",
    salesChart: "/stats/results/shilajit-au-sales.jpeg",
    metric: { label: "GMV · 9 months", value: "5.2×" },
    stats: [
      { value: "$182K", label: "MRR · last quarter" },
      { value: "3.8★ → 4.6★", label: "Avg review" },
      { value: "AU + NZ", label: "Markets opened" },
      { value: "Approved", label: "Brand Registry" },
    ],
    challenge:
      "Single-SKU brand entering AU/NZ with no infrastructure and a category full of compliance traps and copycat sellers.",
    outcome:
      "Sourcing partner vetted, packaging redesigned, listing copy rewritten for the AU shopper. Brand Registry filed and approved.",
    duration: "9 months",
    channels: ["sourcing", "bol", "amazon", "trademark", "freight"],
    quote: {
      text: "They handled the AU launch end-to-end while we focused on supply. We didn't lose a day to vendor coordination.",
      attribution: "Operator, Shilajit Co.",
    },
    timeline: [
      { phase: "01 · Sourcing", body: "Manufacturer vetting + sample QC pipeline." },
      { phase: "02 · Compliance", body: "TGA-aware copy, ingredient claims pass." },
      { phase: "03 · Photography", body: "Studio + lifestyle pack tuned to AU shopper." },
      { phase: "04 · Launch", body: "Brand Registry + Sponsored Products day-one campaigns." },
    ],
    shots: [
      "/stats/products/shilajit/1.jpg",
      "/stats/products/shilajit/2.jpg",
      "/stats/products/shilajit/3.jpg",
      "/stats/products/shilajit/4.jpg",
      "/stats/products/shilajit/5.jpg",
      "/stats/products/shilajit/6.jpg",
    ],
  },
  {
    slug: "detailcraft-car-brush-us",
    brand: "Detailcraft",
    productName: "Pro-Detail Brush Kit",
    category: "Auto · DIY",
    bento: "regular",
    accent: "lime",
    image: "/stats/products/car_detail_brush/1.jpg",
    salesChart: "/stats/results/car-detailing-sales.jpeg",
    metric: { label: "Sessions · 90 days", value: "+218%" },
    stats: [
      { value: "$96K", label: "Top SKU MRR" },
      { value: "2.1×", label: "ROAS lift" },
      { value: "+47%", label: "Conversion rate" },
      { value: "5 → 3", label: "ACoS halved" },
    ],
    challenge:
      "Commodity product fighting on price in a saturated subcategory with no differentiation in listing presentation.",
    outcome:
      "Repositioned around 'pro-grade detail' with infographic-led listings, bundled SKUs, and lifestyle photography.",
    duration: "5 months",
    channels: ["photography", "bol", "amazon", "ppc"],
    timeline: [
      { phase: "01 · Positioning", body: "Brand language reset to 'pro-grade detail'." },
      { phase: "02 · Photography", body: "Infographic-led main + lifestyle pack." },
      { phase: "03 · Bundles", body: "3 SKU bundles created to lift AOV." },
      { phase: "04 · PPC", body: "Sponsored Brands + Display retargeting." },
    ],
    shots: [
      "/stats/products/car_detail_brush/1.jpg",
      "/stats/products/car_detail_brush/2.jpg",
      "/stats/products/car_detail_brush/3.jpg",
      "/stats/products/car_detail_brush/4.jpg",
      "/stats/products/car_detail_brush/5.jpg",
    ],
  },
  {
    slug: "pawsteps-dog-ramp-us",
    brand: "PawSteps",
    productName: "Foldable Dog Ramp",
    category: "Pets · Mobility",
    bento: "tall",
    accent: "obsidian",
    image: "/stats/products/Dog_Stand/1.jpg",
    salesChart: "/stats/results/dog-ramp-sales.jpeg",
    metric: { label: "GMV · 12 months", value: "$1.2M" },
    stats: [
      { value: "+74%", label: "Conversion lift" },
      { value: "Top 50", label: "Category rank" },
      { value: "4 SKUs", label: "Range expanded" },
      { value: "4.7★", label: "Avg review" },
    ],
    challenge:
      "Single hero SKU with strong but seasonal demand and weak post-purchase retention.",
    outcome:
      "Lifestyle photography pack + email/SMS lifecycle wired into Klaviyo. Range expanded from 1 SKU to 4.",
    duration: "12 months",
    channels: ["photography", "bol", "amazon", "ppc"],
    quote: {
      text: "We were a one-SKU brand. We're now a four-SKU brand with a lifecycle engine. Same team, every step.",
      attribution: "Founder, PawSteps",
    },
    timeline: [
      { phase: "01 · Photography", body: "Lifestyle pack with real dogs, real owners." },
      { phase: "02 · Lifecycle", body: "Klaviyo flows for post-purchase + winback." },
      { phase: "03 · Range", body: "3 new SKUs sourced + launched in 8 weeks." },
      { phase: "04 · Scale", body: "Sponsored Display retargeting + DSP audiences." },
    ],
    shots: [
      "/stats/products/Dog_Stand/1.jpg",
      "/stats/products/Dog_Stand/2.jpg",
      "/stats/products/Dog_Stand/3.jpg",
      "/stats/products/Dog_Stand/4.jpg",
      "/stats/products/Dog_Stand/5.jpg",
    ],
  },
  {
    slug: "pacelane-hydration-vest-us",
    brand: "Pacelane",
    productName: "Hydration Vest",
    category: "Outdoor · Athletic",
    bento: "regular",
    accent: "copper",
    image: "/stats/products/Running_vest/1.jpg",
    metric: { label: "First 8 months", value: "0 → $340K" },
    stats: [
      { value: "+38%", label: "AOV after bundle" },
      { value: "4.8★", label: "Review score" },
      { value: "0 → 7", label: "SKUs in range" },
      { value: "Day 1", label: "Sponsored Brands" },
    ],
    challenge:
      "Brand-new entry against established outdoor names with no organic share and a complex multi-size SKU matrix.",
    outcome:
      "Studio + lifestyle photo pack, A+ Premium build, Sponsored Brands campaigns from day one. From zero to a 7-SKU performance line.",
    duration: "8 months",
    channels: ["sourcing", "photography", "bol", "amazon", "ppc"],
    timeline: [
      { phase: "01 · Sourcing", body: "Multi-size SKU matrix locked with QC." },
      { phase: "02 · Photography", body: "Athletic lifestyle pack on real runners." },
      { phase: "03 · A+ Premium", body: "Performance-line storefront." },
      { phase: "04 · Day-1 Launch", body: "Sponsored Brands + reviews velocity." },
    ],
    shots: [
      "/stats/products/Running_vest/1.jpg",
      "/stats/products/Running_vest/2.jpg",
      "/stats/products/Running_vest/3.jpg",
      "/stats/products/Running_vest/4.jpg",
      "/stats/products/Running_vest/5.jpg",
    ],
  },
];

export const contactReasons = [
  { label: "New project", description: "Tell us what you're building or scaling.", value: "project" },
  { label: "Strategy audit", description: "Let us assess your current ops in 5 days.", value: "audit" },
  { label: "Sourcing request", description: "We'll quote products in 48 hours.", value: "sourcing" },
  { label: "General question", description: "Anything else? We'll route you correctly.", value: "general" },
] as const;

export const valueDeck = [
  { n: "01", title: "Operators, not executors", body: "Our team has scaled brands past 8 figures. We don't just run playbooks — we wrote them." },
  { n: "02", title: "Single accountable team", body: "Sourcing, listings, photography, and ads compound when one team owns them." },
  { n: "03", title: "Algorithm + shopper expertise", body: "We know what Amazon shoppers are searching for and can optimize content and ads to match intent." },
  { n: "04", title: "Available 24/7", body: "Email, phone, WhatsApp, live chat. Time zones are not your problem to solve." },
];

export const milestones = [
  { year: "2018", title: "Studio launches", body: "Started in Jhelum with two operators and a photo studio." },
  { year: "2019", title: "First 100 brands", body: "Built the playbooks during the FBA gold rush." },
  { year: "2021", title: "Sourcing arm spins up", body: "Manufacturer network scales to 60+ verified factories." },
  { year: "2023", title: "Engineering team forms", body: "Shopify Hydrogen + MERN apps become a first-class service line." },
  { year: "2025", title: "$420M GMV under management", body: "Across 240+ active brands and 4 continents." },
  { year: "2026", title: "Evolut today", body: "Full-stack ecommerce ops as a single accountable team." },
];
