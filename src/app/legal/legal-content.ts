import { ipAccelerator, testimonials } from "@/lib/site-config";
import { funnelProjects } from "@/components/funnel/funnel-projects-data";
import type { FunnelContent } from "@/components/funnel/funnel-types";

/**
 * /legal funnel content — trademark filing + Amazon IP Accelerator /
 * Brand Registry. Reuses `ipAccelerator` from site-config wholesale
 * (benefits, steps, stats, toolkit) rather than writing new claims:
 * that object was already built for exactly this pitch, just not yet
 * given its own page.
 */
export const legalContent: FunnelContent = {
  slug: "legal",
  accent: "electric",

  seo: {
    title: "Trademark Filing & Amazon Brand Registry — Free Call",
    description:
      "Trademark filing and Amazon IP Accelerator, run end to end — matched with a vetted IP law firm, Brand Registry unlocked early, and ongoing infringement monitoring.",
  },

  urgency: {
    message: "Now booking free brand-protection calls — see how fast you can unlock Brand Registry.",
  },

  hero: {
    eyebrow: "Trademark & Amazon Brand Protection",
    headlineLead: "Protect Your Brand",
    headlineAccent: "Before the Trademark Even Registers.",
    badge: "Trademark filing + Amazon Brand Registry — run end to end, by one team.",
    subhead: ipAccelerator.subtitle,
    disclaimer:
      "This covers trademark filing coordination and Amazon's IP Accelerator program, not legal representation itself. You're matched with a vetted, independent IP law firm who handles the filing.",
    ctaLabel: "Book Your Free Brand Protection Call",
    heroBadges: [
      { src: "/badges/hero-badge-1.avif", alt: "Amazon SPN Certified — Service Provider Network", width: 1282, height: 297 },
      { src: "/badges/hero-badge-2.avif", alt: "Trustpilot — 5 star rating", width: 1400, height: 700 },
    ],
  },

  stats: ipAccelerator.stats.map((s) => ({ value: s.value, label: s.label })),

  explainer: {
    eyebrow: "How it works",
    title: { lead: "The filing,", accent: "in plain English." },
    paragraphs: [
      "We run your trademark filing and Amazon IP Accelerator enrollment end to end — matched with a vetted, Amazon-approved IP law firm at pre-negotiated rates, so you're not hunting for one or guessing at legal fees.",
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
    items: ipAccelerator.benefits.map((b) => ({
      icon: b.icon,
      title: b.title,
      detail: b.detail,
    })),
  },

  qualify: {
    eyebrow: "Is this for you?",
    title: { lead: "Let's see if", accent: "we're the right fit." },
    ctaLabel: "See If You Qualify",
    not: {
      heading: "This is NOT for you if...",
      items: [
        "You already hold a registered trademark and full Brand Registry access — there's nothing left to unlock here.",
        "You're not selling a physical, brandable product — this program is built around Amazon listings and physical goods.",
        "You want to skip legal counsel entirely — we match you to a vetted IP attorney, we don't replace one.",
        "You need registration finalized overnight — trademark examination takes months regardless of who files it.",
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
    // Headlines extract a number already stated verbatim in each real
    // quote — see amazon-content.ts's testimonials for the same note.
    // None of the 5 site-config testimonials mention trademark/IP work
    // directly, so these lean on general trust rather than a specific
    // (and unverifiable) filing outcome.
    items: [
      { ...testimonials[2], headline: "Why Priya Chose Evolut After Three Other Agencies" },
      { ...testimonials[1], headline: "How Marcus Lifted Conversion 38% Overnight" },
      { ...testimonials[3], headline: "How James Shipped a Headless Store in 6 Weeks" },
    ],
  },

  team: {
    eyebrow: "The people coordinating your filing",
    title: { lead: "One team,", accent: "coordinating your filing start to finish." },
    subtitle: "Matched with vetted IP counsel, monitored by us long after the certificate arrives.",
  },

  faq: {
    eyebrow: "Everything you need to know",
    title: { lead: "Questions we hear", accent: "before every call." },
    items: [
      {
        q: "What's the difference between a trademark and Amazon Brand Registry?",
        a: "A trademark is the legal registration of your brand name or logo with a government IP office. Brand Registry is Amazon's program that unlocks brand-protection tools on the platform — IP Accelerator lets you enroll in Brand Registry early, using a pending application instead of waiting for the certificate.",
      },
      {
        q: "How long does trademark registration take?",
        a: "Typically 8–14 months start to finish, depending on the jurisdiction and whether anyone objects. IP Accelerator is what lets you unlock Brand Registry protections during that wait, not after it.",
      },
      {
        q: "Do I need a trademark before I can sell on Amazon?",
        a: "No — you can sell without one. But without Brand Registry, you have far fewer defenses against copycat listings and hijackers, which is exactly the gap this program closes.",
      },
      {
        q: "Do you replace my need for a lawyer?",
        a: "No. We match you with a vetted, Amazon-approved IP law firm at pre-negotiated rates and coordinate the whole process — the filing itself is handled by licensed counsel, as it should be.",
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
    body: "No fabricated guarantees here — just the terms we actually operate on, and have since day one.",
    ctaLabel: "Book Your Free Brand Protection Call",
    points: [
      {
        title: "Objection resolution included",
        detail:
          "If your application gets an office action or objection, we stay on it with you — not an extra invoice for something that's common and normal.",
      },
      {
        title: "Ongoing IP monitoring",
        detail:
          "We watch your marks, renewals, and infringements across marketplaces so protection doesn't lapse the moment the certificate arrives.",
      },
      {
        title: "Vetted counsel, transparent pricing",
        detail:
          "Pre-negotiated rates with Amazon-approved IP firms — no hunting, no surprise legal bills.",
      },
    ],
  },

  finalCta: {
    title: { lead: "Ready to protect", accent: "what you're building?" },
    subtitle:
      "Book a free call. We'll map the fastest path to Brand Registry for your specific brand and category.",
    ctaLabel: "Book Your Free Brand Protection Call",
    note: "No pressure, no obligation — just a clear next step for your filing.",
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

  projects: funnelProjects,
};
