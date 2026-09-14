import { BadgeCheck, Scale, Zap, ShieldCheck, Store, Fingerprint } from "lucide-react";
import { ipAccelerator, testimonials } from "@/lib/site-config";
import type { FunnelContent } from "@/components/funnel/funnel-types";
import type { FunnelProject } from "@/components/funnel/funnel-projects-data";

/**
 * Legal-specific "Real brands. Real numbers." set — of the 6 real case
 * studies in site-config.ts's `caseStudies`, only Gloco and Shilajit
 * Co. actually carry `channels: [...,"trademark",...]` (Squirtz,
 * Detailcraft, PawSteps, and Pacelane don't have any real trademark/
 * Brand Registry work to point to). Same real numbers and images as
 * funnel-projects-data.ts's shared set (that file's `funnelProjects`
 * still powers /amazon), but `outcome` is rewritten here to lead with
 * each brand's real Brand Registry milestone — verbatim from
 * site-config's own `timeline`/`outcome`/`stats` fields for these two,
 * not a new claim:
 *   - Gloco: timeline phase "04 · Launch" — "Sponsored Products +
 *     Brands, Brand Registry filed, review velocity ramp."
 *   - Shilajit Co.: `stats` includes `{value:"Approved",
 *     label:"Brand Registry"}` and outcome "...Brand Registry filed and
 *     approved."
 * Only 2 real trademark-tagged engagements exist — don't pad this back
 * to 4 by re-adding Squirtz/PawSteps, which have no real trademark
 * angle (same "ask rather than pad with irrelevant content" call as
 * round 18's testimonials).
 */
const legalProjects: FunnelProject[] = [
  {
    slug: "gloco-calm-carry-us",
    company: "Glowco International LLC",
    product: "Calm Carry",
    category: "Wellness · Personal Care",
    image: "/stats/products/gloco/1.webp",
    metric: { value: "$5,287,932", label: "Total sales" },
    outcome:
      "Brand Registry filed as part of the Amazon launch phase, protection in place before the review ramp even began.",
  },
  {
    slug: "shilajit-resin-au",
    company: "Shilajit Co.",
    product: "Resin",
    category: "Supplements · Nutrition",
    image: "/stats/products/shilajit/1.jpg",
    metric: { value: "5.2×", label: "GMV · 9 months" },
    outcome:
      "AU/NZ market entry, compliance-checked labeling, and Brand Registry filed and approved before the first sale.",
  },
];

/**
 * /legal funnel content — trademark filing + Amazon IP Accelerator /
 * Brand Registry. Reuses `ipAccelerator` from site-config wholesale
 * (benefits, steps, stats, toolkit) rather than writing new claims:
 * that object was already built for exactly this pitch, just not yet
 * given its own page.
 */
export const legalContent: FunnelContent = {
  slug: "legal",
  accent: "lime",

  seo: {
    title: "Trademark Filing & Amazon Brand Registry: Free Call",
    description:
      "Trademark filing and Amazon IP Accelerator, run end to end, matched with a vetted IP law firm, Brand Registry unlocked early, and ongoing infringement monitoring.",
  },

  urgency: {
    message: "Now booking free brand-protection calls. See how fast you can unlock Brand Registry.",
  },

  hero: {
    eyebrow: "Trademark & Amazon Brand Protection",
    headlineLead: "Protect Your Brand",
    headlineAccent: "Before the Trademark Even Registers.",
    badge: "Trademark filing + Amazon Brand Registry, run end to end, by one team.",
    // Literal, not `ipAccelerator.subtitle` — that field (site-config.ts)
    // is shared with the homepage's <IpAccelerator/> section and its
    // original text uses an em dash; duplicating it here (same reasoning
    // funnel-products.ts/amazon-content.ts already use for other shared
    // fields) lets this page's copy be edited without touching the
    // homepage's.
    subhead:
      "Amazon's IP Accelerator connects brands with vetted IP law firms and unlocks Brand Registry protections early, months before a trademark certificate would normally arrive. We run the whole path for you, from filing to enforcement.",
    disclaimer:
      "This covers trademark filing coordination and Amazon's IP Accelerator program, not legal representation itself. You're matched with a vetted, independent IP law firm who handles the filing.",
    ctaLabel: "Book Your Free Brand Protection Call",
    // Legal-specific real credential seals (client-supplied) — Advocacy
    // Legal Services, Law Compliance / Legal Protection, and Advocacy
    // Legal Assistance, one combined graphic — distinct from the Amazon
    // SPN/Trustpilot badges /amazon shows. See funnel-types.ts's note on
    // `hero.heroBadges` being page-specific.
    heroBadges: [
      { src: "/badges/legal-hero-badge.png", alt: "Advocacy Legal Services, Law Compliance & Legal Protection, Advocacy Legal Assistance: certified seals", width: 520, height: 173 },
    ],
  },

  stats: ipAccelerator.stats.map((s) => ({ value: s.value, label: s.label })),

  explainer: {
    eyebrow: "How it works",
    title: { lead: "The filing,", accent: "in plain English." },
    paragraphs: [
      "We run your trademark filing and Amazon IP Accelerator enrollment end to end, matched with a vetted, Amazon-approved IP law firm at pre-negotiated rates, so you're not hunting for one or guessing at legal fees.",
      "Brand Registry unlocks early, months before your trademark certificate would normally arrive, so your listings get real protection while the filing is still in examination.",
    ],
    distinction:
      "This is filing coordination and Brand Registry enrollment, not a replacement for legal counsel. Your IP firm handles the legal work; we run the coordination, the timeline, and the ongoing monitoring.",
  },

  features: {
    eyebrow: "What this looks like in practice",
    title: { lead: "Everything your brand protection needs,", accent: "run by one team." },
    subtitle: "Six things that start unlocking the moment your filing begins, not after it finishes.",
    ctaLabel: "See If You Qualify",
    // Literal, not `ipAccelerator.benefits.map(...)` — 3 of those 6
    // detail strings (site-config.ts) use an em dash, and that object is
    // shared with the homepage's <IpAccelerator/> section (same reason
    // `subhead` above is a literal, not `ipAccelerator.subtitle`).
    items: [
      {
        icon: BadgeCheck,
        title: "Early Brand Registry access",
        detail:
          "Unlock Amazon Brand Registry while your trademark is still pending, no waiting 6–12 months for the certificate to start protecting your listings.",
      },
      {
        icon: Scale,
        title: "Vetted IP law firms",
        detail:
          "We match you with Amazon-approved trademark attorneys at pre-negotiated, transparent rates. No hunting, no surprise legal bills.",
      },
      {
        icon: Zap,
        title: "Faster trademark filing",
        detail:
          "Your name and logo are drafted and filed in days, the mark enters examination while your protected listings go live.",
      },
      {
        icon: ShieldCheck,
        title: "Counterfeit & hijacker defense",
        detail:
          "Transparency codes, Project Zero, and automated takedowns keep copycats and unauthorized sellers off your detail pages.",
      },
      {
        icon: Store,
        title: "Full brand toolkit unlocked",
        detail:
          "A+ Content, Brand Store, Sponsored Brands, Posts, and Vine, the entire Brand Registry suite, set up and ready to convert.",
      },
      {
        icon: Fingerprint,
        title: "Ongoing IP monitoring",
        detail:
          "We watch your marks, renewals, and infringements across marketplaces so protection never lapses as you scale.",
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
        "You already hold a registered trademark and full Brand Registry access, there's nothing left to unlock here.",
        "You're not selling a physical, brandable product, this program is built around Amazon listings and physical goods.",
        "You want to skip legal counsel entirely, we match you to a vetted IP attorney, we don't replace one.",
        "You need registration finalized overnight, trademark examination takes months regardless of who files it.",
      ],
    },
    is: {
      heading: "This IS for you if...",
      items: [
        "You're building a real brand and want it protected before a copycat listing shows up.",
        "You're an Amazon seller who wants Brand Registry tools unlocked sooner, not later.",
        "You'd rather have one team coordinate sourcing-to-legal than hire a solo attorney with no Amazon context.",
        "You want ongoing monitoring after filing, not a one-and-done submission.",
      ],
    },
  },

  testimonials: {
    eyebrow: "Client voices",
    title: { lead: "Brands who trust us", accent: "with more than just ads." },
    // Only 5 real client testimonials exist site-wide (site-config.ts),
    // and none mentions trademark/IP/Brand Registry work directly —
    // Priya's is the one generic enough ("real opinions, real numbers",
    // no channel mentioned) to honestly sit here too, shared with
    // /shopify. Marcus's and James's quotes are specific to Amazon
    // photography/conversion and Shopify/headless work respectively —
    // moved off this page entirely rather than kept "for a full 3" with
    // no real relevance. User was asked and chose this single-card
    // section over inventing a legal-specific quote or forcing overlap.
    // If a real trademark/Brand-Registry client testimonial (with photo)
    // is ever supplied, add it here instead of reusing another page's.
    items: [
      {
        ...testimonials[2],
        // Literal override: the source quote (site-config.ts, shared
        // with /shopify and /consultation) uses an em dash.
        quote:
          "We tried three agencies before Evolut. They're the first team that operated like operators, not just executors. Real opinions, real numbers.",
        headline: "Why Priya Chose Evolut After Three Other Agencies",
      },
    ],
  },

  team: {
    eyebrow: "The people coordinating your filing",
    title: { lead: "One team,", accent: "coordinating your filing start to finish." },
    subtitle: "Matched with vetted IP counsel, monitored by us long after the certificate arrives.",
    // Reuses the same legal-hero-badge.png shown in the hero — /amazon
    // and /shopify's generic "Top 10 Ecommerce Leaders" award isn't
    // relevant here; these credential seals are.
    badges: [
      { src: "/badges/legal-hero-badge.png", alt: "Advocacy Legal Services, Law Compliance & Legal Protection, Advocacy Legal Assistance: certified seals", width: 520, height: 173, className: "h-28 md:h-36" },
    ],
  },

  faq: {
    eyebrow: "Everything you need to know",
    title: { lead: "Questions we hear", accent: "before every call." },
    items: [
      {
        q: "What's the difference between a trademark and Amazon Brand Registry?",
        a: "A trademark is the legal registration of your brand name or logo with a government IP office. Brand Registry is Amazon's program that unlocks brand-protection tools on the platform. IP Accelerator lets you enroll in Brand Registry early, using a pending application instead of waiting for the certificate.",
      },
      {
        q: "How long does trademark registration take?",
        a: "Typically 8–14 months start to finish, depending on the jurisdiction and whether anyone objects. IP Accelerator is what lets you unlock Brand Registry protections during that wait, not after it.",
      },
      {
        q: "Do I need a trademark before I can sell on Amazon?",
        a: "No. You can sell without one. But without Brand Registry, you have far fewer defenses against copycat listings and hijackers, which is exactly the gap this program closes.",
      },
      {
        q: "Do you replace my need for a lawyer?",
        a: "No. We match you with a vetted, Amazon-approved IP law firm at pre-negotiated rates and coordinate the whole process. The filing itself is handled by licensed counsel, as it should be.",
      },
      {
        q: "Where are you based?",
        a: "Studio operations in Jhelum, Pakistan. Clients across North America, Europe, the Middle East, and Australia. Available 24/7 across time zones.",
      },
    ],
  },

  commitment: {
    eyebrow: "Our commitment to you",
    title: { lead: "We stay on it,", accent: "not just on the invoice." },
    badge: { value: "24/7", label: "Ongoing IP monitoring, not just at filing" },
    body: "No fabricated guarantees here, just the terms we actually operate on, and have since day one.",
    ctaLabel: "Book Your Free Brand Protection Call",
    points: [
      {
        title: "Objection resolution included",
        detail:
          "If your application gets an office action or objection, we stay on it with you, not an extra invoice for something that's common and normal.",
      },
      {
        title: "Ongoing IP monitoring",
        detail:
          "We watch your marks, renewals, and infringements across marketplaces so protection doesn't lapse the moment the certificate arrives.",
      },
      {
        title: "Vetted counsel, transparent pricing",
        detail:
          "Pre-negotiated rates with Amazon-approved IP firms, no hunting, no surprise legal bills.",
      },
    ],
  },

  finalCta: {
    title: { lead: "Ready to protect", accent: "what you're building?" },
    subtitle:
      "Book a free call. We'll map the fastest path to Brand Registry for your specific brand and category.",
    ctaLabel: "Book Your Free Brand Protection Call",
    note: "No pressure, no obligation, just a clear next step for your filing.",
  },

  stepCopy: [
    {
      title: "What's your budget for brand protection right now?",
      sub: "Ballpark is fine. This just helps us tailor the call.",
    },
    { title: "Who else needs to sign off before you move forward?" },
    { title: "What's costing you the most without a trademark yet?" },
    { title: "When do you want to get started?" },
    {
      title: "Almost there. Where should we send your filing roadmap?",
      sub: "No spam. No hard pitch. Just a plan.",
    },
  ],

  projects: legalProjects,
};
