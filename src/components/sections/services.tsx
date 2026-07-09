"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ *
 * Services — asymmetric bento of all 8 service lines.
 *
 * A 12-col bento grid (single column on mobile, 2-col on tablet). Each
 * tile is an editorial image card linking to /services/[slug], with an
 * accent icon chip, index, title, blurb and a hover "explore" cue.
 * Amazon is the flagship feature tile (spans two rows, shows feature
 * pills); a final color-blocked tile routes to the full services index.
 * No scroll-jacking — tiles simply fade up on scroll-in.
 * ------------------------------------------------------------------ */

type TileSpec = {
  slug: Service["slug"];
  /** Editorial image backdrop. */
  image: string;
  /** Grid footprint at sm / lg (base is a single column). */
  span: string;
  /** Min-height fallback before lg auto-rows take over sizing. */
  minH: string;
  /** Flagship tile — larger type + feature pills. */
  feature?: boolean;
};

// Ordered for the bento composition (not the site-config order). The
// spans tile the 12-col grid exactly across four bands — see the row
// math in the layout below.
const TILES: TileSpec[] = [
  { slug: "amazon",      image: "/images/services/amazon.webp",      span: "sm:col-span-2 lg:col-span-6 lg:row-span-2", minH: "min-h-[19rem] lg:min-h-0", feature: true },
  { slug: "photography", image: "/images/services/photography.webp", span: "sm:col-span-2 lg:col-span-6",              minH: "min-h-[15rem] lg:min-h-0" },
  { slug: "ppc",         image: "/images/services/ppc.webp",         span: "lg:col-span-3",                            minH: "min-h-[15rem] lg:min-h-0" },
  { slug: "bol",         image: "/images/services/bol.webp",         span: "lg:col-span-3",                            minH: "min-h-[15rem] lg:min-h-0" },
  { slug: "sourcing",    image: "/images/services/sourcing.webp",    span: "lg:col-span-4",                            minH: "min-h-[15rem] lg:min-h-0" },
  { slug: "shopify",     image: "/images/services/shopify.webp",     span: "lg:col-span-4",                            minH: "min-h-[15rem] lg:min-h-0" },
  { slug: "freight",     image: "/images/services/freight.webp",     span: "lg:col-span-4",                            minH: "min-h-[15rem] lg:min-h-0" },
  { slug: "trademark",   image: "/images/services/trademark.webp",   span: "lg:col-span-8",                            minH: "min-h-[15rem] lg:min-h-0" },
];

// Accent → icon-chip skin. Dark accents flip to a light chip so they
// read against the tile's obsidian scrim.
const ACCENT_CHIP: Record<Service["accent"], string> = {
  electric: "bg-electric text-canvas",
  copper: "bg-copper text-canvas",
  obsidian: "bg-canvas text-ink",
  chrome: "bg-chrome-2 text-ink",
  lime: "bg-lime text-ink",
};

const bySlug = (slug: string): Service =>
  services.find((s) => s.slug === slug)!;

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section
      id="services"
      className="relative bg-canvas py-24 md:py-32 overflow-hidden"
    >
      {/* Quiet paper grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-grid opacity-40 pointer-events-none"
      />

      <div className="container-x relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6">What we do</p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5.2vw,4.75rem)] text-ink leading-[1.03]">
              <StaggerWords text="Eight services," />{" "}
              <StaggerWords
                text="one stack."
                delayStart={0.18}
                wordClassName="italic font-normal text-copper"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.25}>
              <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md lg:ml-auto">
                Each service runs as part of one accountable team — sourcing,
                listings, photography, ads, freight, trademark. Compounding,
                not handing off.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Bento — spans tile the 12-col grid exactly:
            band 1: amazon(6, rows 1-2) + photography(6)
            band 2: amazon(cont) + ppc(3) + bol(3)
            band 3: sourcing(4) + shopify(4) + freight(4)
            band 4: trademark(8) + cta(4)                         */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[clamp(11rem,14vw,13.5rem)] gap-3 md:gap-4">
          {TILES.map((tile, i) => (
            <ServiceTile
              key={tile.slug}
              tile={tile}
              service={bySlug(tile.slug)}
              index={i}
              reduce={Boolean(reduce)}
            />
          ))}
          <CtaTile reduce={Boolean(reduce)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- TILE ------------------------------- */
function ServiceTile({
  tile,
  service,
  index,
  reduce,
}: {
  tile: TileSpec;
  service: Service;
  index: number;
  reduce: boolean;
}) {
  const Icon = service.icon;
  const n = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.06,
        ease: PREMIUM_EASE,
      }}
      whileHover={reduce ? undefined : { y: -4 }}
      className={cn("group", tile.span, tile.minH)}
    >
      <Link
        href={`/services/${service.slug}`}
        aria-label={service.title}
        className="relative flex h-full flex-col justify-end rounded-2xl overflow-hidden border border-hairline-strong/50 transition-shadow duration-500 hover:shadow-[0_26px_55px_-24px_rgba(15,17,21,0.4)]"
      >
        <Image
          src={tile.image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />

        {/* Legibility scrim + hover darken */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/15 transition-colors duration-500"
        />

        {/* Top row — accent icon chip + index */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span
            className={cn(
              "grid place-items-center h-9 w-9 rounded-xl shadow-sm",
              ACCENT_CHIP[service.accent]
            )}
          >
            <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} />
          </span>
          <span className="font-mono text-[0.62rem] tracking-[0.18em] text-canvas/60">
            {n}
          </span>
        </div>

        {/* Bottom — title + blurb + explore */}
        <div className="relative p-5 md:p-6 text-canvas">
          <h3
            className={cn(
              "display leading-[1.1]",
              tile.feature
                ? "text-[clamp(1.6rem,2.4vw,2.4rem)]"
                : "text-[clamp(1.15rem,1.5vw,1.45rem)]"
            )}
          >
            {service.title}
          </h3>
          <p
            className={cn(
              "mt-2 text-canvas/70 leading-snug",
              tile.feature
                ? "text-sm md:text-base max-w-[42ch]"
                : "text-[0.85rem] max-w-[34ch]"
            )}
          >
            {service.blurb}
          </p>

          {tile.feature && (
            <div className="mt-4 hidden sm:flex flex-wrap gap-2">
              {service.features.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-canvas/25 bg-canvas/5 backdrop-blur-sm px-3 py-1 text-[0.68rem] text-canvas/80"
                >
                  {f.split(" — ")[0].split(" (")[0]}
                </span>
              ))}
            </div>
          )}

          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-canvas/65 group-hover:text-canvas transition-colors">
            Explore
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ------------------------------- CTA -------------------------------- *
 * Color-blocked closer tile — routes to the full services index.
 * ------------------------------------------------------------------- */
function CtaTile({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay: 0.12, ease: PREMIUM_EASE }}
      whileHover={reduce ? undefined : { y: -4 }}
      className="group sm:col-span-2 lg:col-span-4 min-h-[13rem] lg:min-h-0"
    >
      <Link
        href="/services"
        className="relative flex h-full flex-col justify-between rounded-2xl overflow-hidden bg-ink text-canvas p-6 md:p-7 transition-shadow duration-500 hover:shadow-[0_26px_55px_-24px_rgba(15,17,21,0.5)]"
      >
        {/* Warm accent glow */}
        <div
          aria-hidden="true"
          className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(232,112,74,0.35), transparent 70%)",
          }}
        />
        <p className="relative font-mono text-[0.6rem] uppercase tracking-[0.2em] text-canvas/55">
          The full stack
        </p>
        <div className="relative">
          <p className="display text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[1.05] mb-4">
            Explore all
            <br />
            eight services
          </p>
          <span className="inline-flex items-center gap-2 rounded-full bg-canvas text-ink px-5 py-2.5 text-sm font-medium transition-all group-hover:gap-3">
            See services
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
