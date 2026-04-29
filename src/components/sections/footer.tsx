"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { site, navItems, services } from "@/lib/site-config";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ *
 * Footer — cinematic editorial close.
 *
 * Three vertical beats, no scattered memphis shapes:
 *   1. CLOSING CTA — eyebrow + huge closing headline + two buttons
 *   2. LINK GRID — 4 columns (Services / Studio / Work / Connect)
 *   3. WORDMARK — giant "EVOLUT" typographic anchor + thin legal row
 *
 * Background: obsidian + a single soft copper gradient sweep at the
 * top edge for warmth. One scrollable accent line at the very top
 * (slow auto-marquee of "let's build" tags) for movement.
 * ------------------------------------------------------------------ */

const TOP_TICKER = [
  "Let's build",
  "Brief us",
  "Source · Build · Scale",
  "Studio in Jhelum",
  "240+ brands",
  "$420M GMV",
  "Available 24/7",
  "Let's build",
  "Brief us",
  "Source · Build · Scale",
];

export function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-obsidian text-canvas overflow-hidden">
      {/* Single subtle copper gradient sweep at the top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(232,112,74,0.12) 0%, transparent 70%)",
        }}
      />

      {/* TOP TICKER — slow auto-scroll, hairline-bordered */}
      <div className="relative border-b border-canvas/10 fade-edges overflow-hidden">
        <div
          className={
            reduce
              ? "flex gap-12 py-4 whitespace-nowrap"
              : "marquee-track flex gap-12 py-4 whitespace-nowrap"
          }
        >
          {[...TOP_TICKER, ...TOP_TICKER].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-canvas/55"
            >
              <span className="h-1 w-1 rounded-full bg-copper" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* === BEAT 1 — CLOSING CTA === */}
      <div className="relative container-x pt-20 md:pt-28 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: PREMIUM_EASE }}
          className="flex items-center gap-2.5 mb-9 text-canvas/60"
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-copper animate-ping opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-copper" />
          </span>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em]">
            · Let&apos;s build something good ·
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-12 items-end">
          <motion.h2
            className="lg:col-span-8 display text-[clamp(2.75rem,8vw,7rem)] leading-[0.96] tracking-[-0.025em]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.95, ease: PREMIUM_EASE, delay: 0.1 }}
          >
            Let&apos;s run your stack
            <br />
            <span className="italic font-normal text-copper-soft">
              with operators.
            </span>
          </motion.h2>

          <motion.div
            className="lg:col-span-4 flex flex-col gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: PREMIUM_EASE, delay: 0.3 }}
          >
            <p className="text-base md:text-lg text-canvas/65 leading-[1.6] mb-2 max-w-md">
              Sourcing, listings, photography, ads, freight — eight
              services compounding inside your catalog. Run as one
              team.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-canvas text-ink pl-3 pr-6 py-2.5 text-[0.95rem] font-medium hover:bg-canvas/90 transition-all hover:-translate-y-0.5 self-start"
            >
              <span className="grid place-items-center h-9 w-9 rounded-full bg-canvas/30 backdrop-blur">
                <Play className="h-3.5 w-3.5 fill-ink text-ink" strokeWidth={0} />
              </span>
              Talk to a strategist
            </Link>

            <Link
              href={`mailto:${site.contact.email}`}
              className="group inline-flex items-center gap-1.5 text-[0.9rem] text-canvas/70 hover:text-copper transition-colors self-start"
            >
              {site.contact.email}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* hairline */}
      <div className="relative">
        <span className="absolute inset-x-0 top-0 h-px bg-canvas/12" />
      </div>

      {/* === BEAT 2 — LINK GRID === */}
      <div className="relative container-x py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 lg:gap-x-12">
          <FooterColumn
            label="Services"
            items={services.slice(0, 6).map((s) => ({
              label: s.title,
              href: `/services/${s.slug}`,
            }))}
          />
          <FooterColumn
            label="Work"
            items={[
              { label: "Case studies", href: "/work" },
              { label: "Photography pack", href: "/services/photography" },
              { label: "Insights", href: "/insights" },
              { label: "Talk to us", href: "/contact" },
            ]}
          />
          <FooterColumn
            label="Studio"
            items={[
              { label: "About Evolut", href: "/about" },
              { label: "The team", href: "/about#operators" },
              { label: site.contact.address, href: "/contact" },
              { label: site.contact.availability, href: "/contact" },
            ]}
          />
          <FooterColumn
            label="Connect"
            items={[
              { label: site.contact.email, href: `mailto:${site.contact.email}` },
              { label: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, "")}` },
              { label: "LinkedIn", href: site.socials.linkedin, external: true },
              { label: "Instagram", href: site.socials.instagram, external: true },
              { label: "X / Twitter", href: site.socials.twitter, external: true },
            ]}
          />
        </div>
      </div>

      {/* === BEAT 3 — WORDMARK + LEGAL === */}
      <div className="relative">
        {/* Hairline above the wordmark */}
        <span className="absolute inset-x-0 top-0 h-px bg-canvas/10" />

        {/* Giant wordmark — clipped at the bottom for a "stamp" feel */}
        <div className="container-x relative pt-12 md:pt-16 pb-8 overflow-hidden">
          <motion.p
            aria-hidden="true"
            className="display text-canvas/8 leading-[0.85] tracking-[-0.06em] select-none whitespace-nowrap"
            style={{
              fontSize: "clamp(6rem, 22vw, 22rem)",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 1.1, ease: PREMIUM_EASE }}
          >
            EVOLUT
          </motion.p>
        </div>

        {/* Hairline above legal row */}
        <span className="absolute inset-x-0 bottom-[3.5rem] h-px bg-canvas/10" />

        {/* LEGAL ROW */}
        <div className="container-x py-5 md:py-6 relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-5 gap-x-8">
            {/* Left: brand mark + © */}
            <div className="flex items-center gap-3">
              <Logo variant="mark" size="sm" alt="Evolut" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-canvas/55">
                © {year} {site.fullName}
              </span>
            </div>

            {/* Center: primary nav */}
            <nav className="flex items-center justify-center gap-5 md:gap-7 flex-wrap">
              {navItems.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-canvas/55 hover:text-canvas transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            {/* Right: social icons + legal */}
            <div className="flex items-center gap-4 md:gap-5 justify-end">
              <Link
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-canvas/55 hover:text-canvas transition-colors"
              >
                <SocialGlyph name="linkedin" />
              </Link>
              <Link
                href={site.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="text-canvas/55 hover:text-canvas transition-colors"
              >
                <SocialGlyph name="x" />
              </Link>
              <Link
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-canvas/55 hover:text-canvas transition-colors"
              >
                <SocialGlyph name="instagram" />
              </Link>
              <span aria-hidden="true" className="h-3 w-px bg-canvas/15" />
              <Link
                href="/privacy"
                className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-canvas/55 hover:text-canvas transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-canvas/55 hover:text-canvas transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------- *
 * SocialGlyph — tiny inline SVG marks for the legal-row icons.
 * Hand-drawn so we don't depend on the lucide brand-icon set, which
 * isn't shipped in the version pinned to this project.
 * ---------------------------------------------------------------- */
function SocialGlyph({ name }: { name: "linkedin" | "x" | "instagram" }) {
  if (name === "linkedin") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h3v12H3V9Zm6 0h2.85v1.6h.04c.4-.74 1.36-1.6 2.81-1.6 3 0 3.55 1.97 3.55 4.54V21h-3v-5.97c0-1.42-.03-3.25-1.98-3.25-1.98 0-2.28 1.55-2.28 3.15V21H9V9Z" />
      </svg>
    );
  }
  if (name === "x") {
    // Plain "X" wordmark — not the official Twitter/X logo, just a
    // typographic stand-in so we don't ship a third-party brand mark.
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M3 3h4.6l4.5 6.2L17 3h3.6l-7.4 9.7L21 21h-4.6l-5-6.8L5.6 21H2l8-10.5L3 3Z" />
      </svg>
    );
  }
  // instagram — three primitives (rounded square + circle + dot)
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

/* ---------------------------------------------------------------- *
 * FooterColumn — uniform link list with mono-caps eyebrow.
 * ---------------------------------------------------------------- */
function FooterColumn({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-canvas/45 mb-5">
        {label}
      </p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={`${label}-${item.label}`}>
            <Link
              href={item.href}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group inline-flex items-baseline gap-1.5 text-[0.88rem] text-canvas/75 hover:text-canvas transition-colors leading-snug"
            >
              <span className="border-b border-transparent group-hover:border-copper transition-colors">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
