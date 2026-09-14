"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { FunnelContent } from "./funnel-types";

/**
 * FunnelTrustMarquee — the reference site's auto-sliding "Recently
 * Featured On" logo strip, structurally, but honestly: Evolut has no
 * verified press mentions or media features to show (checked
 * site-config and the rest of the codebase — nothing there), so this
 * shows the REAL platforms/tools each page's service actually touches
 * instead of fabricated outlet logos.
 *
 * Self-contained rather than reusing @/components/ui/logo-marquee (the
 * one the homepage's <TrustedBy/> uses) — this needed its own size,
 * speed, and a uniform full-opacity treatment (no grayscale-until-hover
 * dimming), and building that here keeps every change scoped to the
 * funnel pages instead of touching the shared component and rippling
 * into the main site.
 *
 * Every entry below traces to site-config: `trustedLogos` (Amazon,
 * Shopify, Walmart, Google) or `techStack` (Next.js, React, Node,
 * Express, MongoDB, Shopify, Hydrogen, Stripe, PayPal, HubSpot,
 * Salesforce, Mailchimp). Generic dev logos NOT in either array
 * (Java/PHP/Python/Docker/GitHub/etc. — present in public/logos/ from
 * an unrelated upload) are deliberately left out, since using them
 * would imply a capability Evolut doesn't actually advertise.
 *
 * `invert` marks logos whose native color is black or near-black
 * (Amazon icon, React's dark teal-blue in this particular SVG, Next.js,
 * Express, Mailchimp's outline) — rendered as a clean white silhouette
 * via `brightness-0 invert` instead of near-invisibly on the obsidian
 * background. Unlike the shared LogoMarquee, nothing here is dimmed by
 * default: an inverted (now pure white) mark next to a still-desaturated
 * color mark read as wildly different "sizes" even at identical pixel
 * dimensions, which is what made one logo look oversized before.
 */
type LogoEntry = { src: string; alt: string; invert?: boolean };

const LOGO: Record<string, LogoEntry> = {
  amazon: { src: "/logos/amazon-icon-logo-svgrepo-com.svg", alt: "Amazon", invert: true },
  walmart: { src: "/logos/walmart-logo-svgrepo-com.svg", alt: "Walmart" },
  google: { src: "/logos/google-2015-logo-svgrepo-com.svg", alt: "Google" },
  shopify: { src: "/logos/shopify-logo-svgrepo-com.svg", alt: "Shopify" },
  hydrogen: { src: "/logos/hydrogen.svg", alt: "Shopify Hydrogen" },
  react: { src: "/logos/React.svg", alt: "React", invert: true },
  nextjs: { src: "/logos/nextjs-icon.svg", alt: "Next.js", invert: true },
  node: { src: "/logos/nodejs-1-logo-svgrepo-com.svg", alt: "Node.js" },
  express: { src: "/logos/express-svgrepo-com.svg", alt: "Express", invert: true },
  mongodb: { src: "/logos/mongodb.svg", alt: "MongoDB" },
  stripe: { src: "/logos/stripe-svgrepo-com.svg", alt: "Stripe" },
  paypal: { src: "/logos/paypal-3-svgrepo-com.svg", alt: "PayPal" },
  hubspot: { src: "/logos/hubspot.svg", alt: "HubSpot" },
  salesforce: { src: "/logos/saleforce.svg", alt: "Salesforce" },
  mailchimp: { src: "/logos/mailchimp-svgrepo-com.svg", alt: "Mailchimp", invert: true },
};

const LOGOS_BY_PAGE: Record<FunnelContent["slug"], LogoEntry[]> = {
  amazon: [LOGO.amazon, LOGO.walmart, LOGO.google, LOGO.stripe, LOGO.paypal],
  shopify: [
    LOGO.shopify,
    LOGO.hydrogen,
    LOGO.react,
    LOGO.nextjs,
    LOGO.node,
    LOGO.express,
    LOGO.mongodb,
    LOGO.stripe,
    LOGO.paypal,
    LOGO.hubspot,
    LOGO.salesforce,
    LOGO.mailchimp,
  ],
  legal: [
    LOGO.amazon,
    LOGO.google,
    LOGO.walmart,
    LOGO.stripe,
    LOGO.paypal,
    LOGO.hubspot,
    LOGO.salesforce,
    LOGO.mailchimp,
  ],
};

// Repeat the base list enough times that the strip always feels full and
// continuous — a 5-logo page (Amazon) duplicated only once would show
// a long empty-feeling gap between cycles at this speed/size.
const MIN_RENDERED = 16;

export function FunnelTrustMarquee({ content }: { content: FunnelContent }) {
  const logos = LOGOS_BY_PAGE[content.slug];
  const repeatCount = Math.max(1, Math.ceil(MIN_RENDERED / logos.length));
  const base = Array.from({ length: repeatCount }, () => logos).flat();
  // Duplicated once more so translateX(-50%) lands exactly on the seam —
  // the classic seamless-marquee trick.
  const items = [...base, ...base];

  return (
    <section className="relative bg-obsidian border-y border-canvas/10 py-9 md:py-12">
      <style>{`
        @keyframes funnel-trust-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div className="container-x mb-6">
        <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.22em] text-canvas/45">
          Platforms and tools our team works in daily
        </p>
      </div>

      <div className="fade-edges relative overflow-hidden">
        <div
          className="flex w-max items-center gap-16 md:gap-24"
          style={{ animation: "funnel-trust-scroll 26s linear infinite" }}
        >
          {items.map((logo, i) => (
            <span
              key={`${logo.alt}-${i}`}
              title={logo.alt}
              className="shrink-0 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={64}
                className={cn(
                  "h-11 md:h-14 w-auto object-contain",
                  logo.invert && "brightness-0 invert"
                )}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
