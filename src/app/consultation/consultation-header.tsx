import { Phone } from "lucide-react";
import { FunnelLogo } from "@/components/ui/funnel-logo";

/**
 * ConsultationHeader — deliberately minimal. No nav links, no dropdown,
 * no "Menu" drawer, and the logo is NOT a link. This page is a paid-ad
 * landing page — every exit is a lost conversion, so the only thing in
 * the header besides the brand mark is a direct call channel.
 */

/**
 * Funnel-only number, deliberately NOT `site.contact.phone`. This page
 * runs its own ad campaign; changing the line it advertises must not
 * change the number on the rest of the site.
 */
const FUNNEL_PHONE = "+34 657 217 536";

export function ConsultationHeader() {
  // Keep the leading "+" — stripping it (the previous behaviour) leaves
  // a tel: URI with no international prefix, which a phone dials as a
  // local number.
  const phoneHref = FUNNEL_PHONE.replace(/[^\d+]/g, "");

  return (
    <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-xl border-b border-hairline">
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <div className="shrink-0 -ml-1">
          <FunnelLogo />
        </div>

        <a
          href={`tel:${phoneHref}`}
          className="group inline-flex items-center gap-2.5 rounded-full border border-hairline-strong bg-canvas px-3.5 py-2 md:px-4 md:py-2.5 text-ink hover:border-ink transition-colors"
        >
          <span className="grid place-items-center h-7 w-7 rounded-full bg-emerald/10 text-emerald shrink-0">
            <Phone className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
          <span className="text-sm font-medium hidden sm:inline">
            {FUNNEL_PHONE}
          </span>
          <span className="text-sm font-medium sm:hidden">Call us</span>
        </a>
      </div>
    </header>
  );
}
