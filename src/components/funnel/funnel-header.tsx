"use client";

import { Phone } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { funnelAccent } from "./funnel-theme";
import { useFunnelBookingModal } from "./funnel-booking-modal";
import type { FunnelAccent } from "./funnel-theme";

/**
 * Funnel-only number, deliberately NOT `site.contact.phone` — same
 * reasoning and same number as /consultation's own header
 * (consultation-header.tsx's `FUNNEL_PHONE`): these pages run their own
 * ad campaigns, and changing the line they advertise must not change
 * the number on the rest of the site (or vice versa).
 */
const FUNNEL_PHONE = "+34 657 217 536";

/**
 * FunnelHeader — minimal, dark-mode sticky bar: mark-only logo + a
 * direct call link. No nav links, no menu — every one of these pages
 * runs on paid/direct traffic where every extra exit is a lost
 * conversion, same reasoning as /consultation's header. Sits below
 * <FunnelUrgencyBar>, so together they replace the reference site's
 * single announcement strip with one that also carries the brand mark.
 */
export function FunnelHeader({ accent }: { accent: FunnelAccent }) {
  const { open } = useFunnelBookingModal();
  const accentClasses = funnelAccent[accent];
  // Keep the leading "+" — stripping it leaves a tel: URI with no
  // international prefix, which a phone dials as a local number.
  const phoneHref = FUNNEL_PHONE.replace(/[^\d+]/g, "");

  return (
    <header className="sticky top-0 z-50 bg-obsidian/90 backdrop-blur-xl border-b border-canvas/10">
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <div className="shrink-0 -ml-1 rounded-xl bg-canvas p-1.5">
          <Logo variant="mark" size="md" alt="Evolut" />
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${phoneHref}`}
            className="group hidden sm:inline-flex items-center gap-2.5 rounded-full border border-canvas/15 px-3.5 py-2 text-canvas/80 hover:text-canvas hover:border-canvas/30 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={2.2} />
            <span className="text-sm font-medium">{FUNNEL_PHONE}</span>
          </a>

          <button
            type="button"
            onClick={open}
            className={`btn-pill ${accentClasses.solid} px-4 py-2 md:px-5 md:py-2.5 text-sm`}
          >
            Book a call
          </button>
        </div>
      </div>
    </header>
  );
}
