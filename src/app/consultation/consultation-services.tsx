"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { PillButton } from "@/components/ui/pill-button";
import { services } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { useBookingModal } from "./consultation-booking-modal";

/**
 * ConsultationServices — section 3. Breadth is the argument here: eight
 * disciplines that normally mean eight invoices, under one roof.
 *
 * Copy is funnel-specific on purpose. The homepage's `blurb` field
 * describes each service ("End-to-end seller, vendor, and FBA
 * operations"); this page instead names the problem the reader already
 * has, so they self-identify a line and think "that's me." Icons and
 * titles still come from site-config so this never drifts out of sync
 * with the real service list.
 */
const PITCH: Record<string, string> = {
  amazon:
    "Vendor Central, Seller Central, FBA, run by someone who's owned the P&L on all three, not just watched a dashboard.",
  shopify:
    "A store built to convert and survive launch-day traffic, not just look good in a portfolio screenshot.",
  bol: "Listings rebuilt around what shoppers actually type into the search bar, not what sounds good in a deck.",
  ppc: "Sponsored Products, Brands, and Display structured around your real margin, not a flat ACoS target that ignores it.",
  photography:
    "The image that stops the scroll and the one that closes the sale, shot by the same team in the same week.",
  sourcing:
    "We vet the factory and run the QC, so a bad batch doesn't become your problem three months from now.",
  freight:
    "Door-to-FBA on air, sea, or road, with one accountable party if it doesn't land on time.",
  trademark:
    "Brand Registry and IP protection filed before a copycat listing goes live, not scrambled together after.",
};

const ACCENT_FG: Record<string, string> = {
  electric: "text-electric",
  copper: "text-copper",
  obsidian: "text-canvas",
  chrome: "text-canvas/70",
  lime: "text-emerald",
};

/**
 * Amazon first, everything else after — this page runs on Amazon ad
 * traffic, and a reader scanning for "do they actually do my channel"
 * should not have to pick Amazon lines out of a mixed list of eight.
 *
 * `trademark` sits in the Amazon group deliberately: the title says
 * "Trademark & Patent Registration", which is broader than Amazon, but
 * the reason an Amazon seller files one is Brand Registry, and that is
 * what its pitch line leads with. Move it if the page ever stops being
 * Amazon-targeted.
 *
 * Between them these cover all eight slugs in site-config — there is a
 * dev-only assertion below that fails loudly if a service is ever added
 * and not placed in a group.
 */
const GROUPS = [
  {
    key: "amazon",
    eyebrow: "On Amazon",
    title: "Your Amazon channel, run end to end.",
    blurb:
      "Everything that lives inside Seller Central, Vendor Central and Brand Registry.",
    slugs: ["amazon", "bol", "ppc", "trademark"],
    dense: false,
  },
  {
    key: "beyond",
    eyebrow: "Beyond Amazon",
    title: "Everything upstream, and everywhere else you sell.",
    blurb:
      "Where the product comes from, how it looks, how it lands. Plus the channel that isn't Amazon.",
    slugs: ["sourcing", "photography", "freight", "shopify"],
    dense: true,
  },
] as const;

function servicesFor(slugs: readonly string[]) {
  return slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
}

if (process.env.NODE_ENV !== "production") {
  const grouped: string[] = GROUPS.flatMap((g) => [...g.slugs]);
  const missing = services.map((s) => s.slug).filter((s) => !grouped.includes(s));
  if (missing.length) {
    console.warn(
      `[consultation] services not shown on the funnel page: ${missing.join(", ")}. ` +
        "Add them to a group in consultation-services.tsx."
    );
  }
}

export function ConsultationServices() {
  const { open } = useBookingModal();

  return (
    <section id="services" className="relative bg-obsidian py-28 md:py-36 overflow-hidden scroll-mt-20">
      {/* soft warm wash top-left, cool bottom-right — same backdrop
          language as the hero, inverted for the dark ground */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 40% at 12% 0%, rgba(232,112,74,0.15) 0%, transparent 62%), " +
            "radial-gradient(45% 40% at 100% 100%, rgba(0,102,255,0.12) 0%, transparent 62%)",
        }}
      />

      <div className="container-x relative">
        <SectionHeader
          align="center"
          invert
          eyebrow="What we run"
          title="Everything your catalog needs. One team runs all of it."
          subtitle="Amazon first, then everything that feeds it. Eight disciplines that usually mean eight invoices, under one accountable roof."
          size="md"
        />

        {/* Editorial rail layout: the group's name and promise sit in a
            narrow left column, its services in a wider one on the right.
            Two stacked full-width lists (the previous shape) read as one
            long undifferentiated column; splitting label from content
            gives the section structure without adding a single new
            colour. The second group is rendered denser than the first,
            so Amazon stays visually primary on an Amazon funnel. */}
        <div className="mt-16 md:mt-24 max-w-5xl mx-auto">
          {GROUPS.map((group, gi) => (
            <div
              key={group.key}
              className={cn(
                "grid gap-x-12 lg:gap-x-16 md:grid-cols-[minmax(0,15rem)_1fr]",
                gi > 0 && "mt-16 md:mt-20 pt-16 md:pt-20 border-t border-canvas/10"
              )}
            >
              <Reveal>
                {/* No `sticky` here even though the layout invites it:
                    both this section and <body> carry overflow:hidden,
                    and an overflow-hidden ancestor makes itself the
                    sticky element's scroll container, so it never
                    activates. Measured — the rail scrolled straight past
                    with the page. */}
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-copper mb-3">
                    {group.eyebrow}
                  </p>
                  <h3 className="display text-[clamp(1.4rem,2.6vw,1.95rem)] text-canvas leading-[1.15] mb-3.5">
                    {group.title}
                  </h3>
                  <p className="text-canvas/55 text-[0.95rem] leading-relaxed">
                    {group.blurb}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-canvas/40">
                    <span aria-hidden="true" className="h-px w-6 bg-canvas/20" />
                    {group.slugs.length} disciplines
                  </p>
                </div>
              </Reveal>

              <div className="mt-9 md:mt-0">
                {servicesFor(group.slugs).map((service, i) => {
                  const Icon = service.icon;
                  return (
                    <Reveal key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className={cn(
                          "group relative flex items-start gap-5 border-t border-canvas/10 transition-colors duration-300",
                          // No negative-margin bleed on the hover surface:
                          // it pushed the row rules wider than the heading
                          // above them on mobile, and the tint reads fine
                          // sitting flush inside the column. Flush also
                          // keeps each row's content aligned with the rule
                          // that separates it.
                          "hover:bg-canvas/[0.03]",
                          group.dense ? "py-5" : "py-6 md:py-7",
                          i === 0 && "border-t-0"
                        )}
                      >
                        <span
                          className={cn(
                            "shrink-0 mt-0.5 grid place-items-center rounded-full bg-canvas/[0.06] transition-colors duration-500 group-hover:bg-canvas/[0.12]",
                            group.dense ? "h-10 w-10" : "h-11 w-11",
                            ACCENT_FG[service.accent] ?? "text-copper"
                          )}
                        >
                          <Icon
                            className={group.dense ? "h-[1.1rem] w-[1.1rem]" : "h-5 w-5"}
                            strokeWidth={1.7}
                          />
                        </span>

                        <div className="min-w-0">
                          <h4
                            className={cn(
                              "flex items-start gap-1.5 text-canvas font-medium leading-snug tracking-[-0.01em] transition-colors duration-300 group-hover:text-copper",
                              group.dense ? "text-base md:text-lg" : "text-lg md:text-xl"
                            )}
                          >
                            {service.title}
                            <ArrowUpRight
                              className="mt-1 h-3.5 w-3.5 shrink-0 text-canvas/40 transition-all duration-300 group-hover:text-copper group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              strokeWidth={2.2}
                            />
                          </h4>
                          <p
                            className={cn(
                              "mt-2 text-canvas/60 leading-relaxed",
                              group.dense ? "text-[0.9rem]" : "text-[0.95rem]"
                            )}
                          >
                            {PITCH[service.slug] ?? service.blurb}
                          </p>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 md:mt-20 text-center">
            <p className="text-canvas/70 text-base md:text-lg mb-7 max-w-xl mx-auto">
              Need one of these or all eight? Book a call and we&apos;ll tell you
              honestly which.
            </p>
            <PillButton onClick={open} variant="ivory" size="lg">
              Book your consultation
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
