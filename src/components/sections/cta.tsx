"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Deco } from "@/components/ui/decorations";
import { site } from "@/lib/site-config";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * CTA v2 — clean canvas, minimal layout. Bencelinski DNA.
 *
 * Left: tiny dot marker + massive 2-line headline + one short paragraph + 2 CTAs.
 * Right: ultra-light contact list (no card frame). Live indicator below.
 * Decorative shapes scattered; no big conic gradients or meteors.
 */
export function CTA() {
  return (
    <section
      id="contact"
      className="relative bg-canvas py-28 md:py-36 overflow-hidden"
    >
      {/* faint paper grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.30] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--ink) 5%, transparent) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* decorative scatter — same vocabulary as the rest of the page */}
      <span className="absolute top-16 left-12 opacity-50 hidden md:block">
        <Deco name="asterisk" className="h-6 w-6 text-lime" spin />
      </span>
      <span className="absolute top-24 right-16 opacity-50 hidden md:block">
        <Deco name="spark" className="h-6 w-6 text-copper" pulse />
      </span>
      <span className="absolute bottom-20 left-1/3 opacity-40 hidden md:block">
        <Deco name="ring-dashed" className="h-12 w-12 text-electric/60" spin />
      </span>
      <span className="absolute bottom-28 right-12 opacity-50 hidden md:block">
        <Deco name="plus" className="h-5 w-5 text-ink/50" drift />
      </span>

      <div className="container-x relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-y-14 gap-x-16 items-center">
        {/* LEFT — headline + sub + CTAs */}
        <div className="lg:col-span-7">
          {/* Tiny dot marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: PREMIUM_EASE }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="relative">
              <span className="block h-2 w-2 rounded-full bg-ink" />
              <span className="absolute inset-0 rounded-full bg-emerald/40 animate-ping" />
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute">
              Ready when you are
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="display text-[clamp(2.25rem,5vw,5rem)] text-ink leading-[0.98] tracking-[-0.03em] mb-8 font-medium">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: PREMIUM_EASE, delay: 0.1 }}
              className="block"
            >
              Take your store to
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: PREMIUM_EASE, delay: 0.22 }}
              className="block"
            >
              the next{" "}
              <span className="italic font-normal text-copper">level.</span>
            </motion.span>
          </h2>

          {/* Sub */}
          <Reveal delay={0.3}>
            <p className="text-base md:text-[1.05rem] text-ink-soft leading-[1.6] max-w-lg mb-9">
              Tell us where you are and where you want to be. We&apos;ll send
              a 30-minute audit with three things to fix this week — free,
              regardless of fit.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.45}>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-7 py-4 text-[0.95rem] font-medium hover:bg-ink-soft transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_-8px_rgba(15,17,21,0.4)]"
              >
                Get started now
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
              <a
                href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                className="group inline-flex items-center gap-1.5 px-2 py-4 text-[0.95rem] font-medium text-ink relative"
              >
                Talk to us
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
                <span className="absolute left-2 right-7 -bottom-px h-px bg-ink" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — contact list, no card frame, just type */}
        <div className="lg:col-span-5">
          <Reveal delay={0.2}>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute mb-7">
              Contact
            </p>
          </Reveal>

          <ul className="space-y-7 mb-10">
            <Reveal delay={0.3}>
              <ContactRow
                Icon={Mail}
                label="Email"
                value={site.contact.email}
                href={`mailto:${site.contact.email}`}
              />
            </Reveal>
            <Reveal delay={0.4}>
              <ContactRow
                Icon={Phone}
                label="Phone · WhatsApp"
                value={site.contact.phone}
                href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              />
            </Reveal>
            <Reveal delay={0.5}>
              <ContactRow
                Icon={MapPin}
                label="Studio"
                value={site.contact.address}
              />
            </Reveal>
          </ul>

          {/* Live availability — single thin row, no card */}
          <Reveal delay={0.6}>
            <div className="flex items-center gap-2.5 pt-7 border-t border-hairline">
              <span className="relative">
                <span className="block h-2 w-2 rounded-full bg-emerald" />
                <span className="absolute inset-0 rounded-full bg-emerald animate-ping" />
              </span>
              <p className="text-sm text-ink-soft">
                Available 24 / 7 — email, phone, WhatsApp, live chat
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
}: {
  Icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <li className="group flex items-start gap-4">
      <span className="mt-1 h-9 w-9 rounded-xl border border-hairline grid place-items-center text-ink-soft transition-colors group-hover:border-ink/40 group-hover:text-ink">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-mute mb-1">
          {label}
        </p>
        <p className="text-base md:text-lg font-medium text-ink leading-snug break-words">
          {value}
        </p>
      </div>
      {href && (
        <ArrowUpRight
          className="h-4 w-4 text-mute mt-2 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-ink"
          strokeWidth={2}
        />
      )}
    </li>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {inner}
      </a>
    );
  }
  return inner;
}
