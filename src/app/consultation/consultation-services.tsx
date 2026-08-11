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
    "Vendor Central, Seller Central, FBA — run by someone who's owned the P&L on all three, not just watched a dashboard.",
  shopify:
    "A store built to convert and survive launch-day traffic, not just look good in a portfolio screenshot.",
  bol: "Listings rebuilt around what shoppers actually type into the search bar — not what sounds good in a deck.",
  ppc: "Sponsored Products, Brands, and Display structured around your real margin, not a flat ACoS target that ignores it.",
  photography:
    "The image that stops the scroll and the one that closes the sale, shot by the same team in the same week.",
  sourcing:
    "We vet the factory and run the QC, so a bad batch doesn't become your problem three months from now.",
  freight:
    "Door-to-FBA on air, sea, or road — with one accountable party if it doesn't land on time.",
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
          subtitle="Eight disciplines that usually mean eight invoices — under one accountable roof."
          size="md"
        />

        <div className="mt-16 md:mt-20 max-w-5xl mx-auto grid md:grid-cols-2 md:gap-x-14">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className={cn(
                    "group flex items-start gap-5 py-7 border-t border-canvas/10",
                    // first row on each column loses its rule on desktop
                    i === 0 && "border-t-0",
                    i === 1 && "md:border-t-0"
                  )}
                >
                  <span
                    className={cn(
                      "shrink-0 mt-0.5 grid place-items-center h-11 w-11 rounded-full bg-canvas/[0.06] transition-colors duration-500 group-hover:bg-canvas/[0.12]",
                      ACCENT_FG[service.accent] ?? "text-copper"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>

                  <div className="min-w-0">
                    <h3 className="flex items-start gap-1.5 text-lg md:text-xl text-canvas font-medium leading-snug tracking-[-0.01em]">
                      {service.title}
                      <ArrowUpRight
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-canvas/40 transition-all duration-300 group-hover:text-copper group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={2.2}
                      />
                    </h3>
                    <p className="mt-2 text-[0.95rem] text-canvas/60 leading-relaxed">
                      {PITCH[service.slug] ?? service.blurb}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
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
