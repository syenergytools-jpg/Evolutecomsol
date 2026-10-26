"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { partners, type Partner } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const TILE_EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/* ------------------------------------------------------------------ *
 * PartnerBrands — "Affiliated partners" logo band.
 *
 * Sits straight under the hero, so it reads as the next beat of the
 * hero's own "Trusted by 240+ brands" strip: the strip gives the
 * numbers, this names some of who is behind them.
 *
 * White tiles on a slightly darker canvas, because partner logos arrive
 * in unknown colours and often with a white background of their own.
 * A tile is a link only when the partner has an `href`. Below lg the
 * rows wrap and centre, so an odd count never strands a tile on the
 * left (2 per row on a phone, 3 on a tablet). From lg up every partner
 * shares a single row, one equal column each, however many there are.
 *
 * Data lives in `partners` (src/lib/site-config.ts).
 * ------------------------------------------------------------------ */

export function PartnerBrands() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="relative bg-canvas-2/60 border-b border-hairline py-14 md:py-20"
    >
      <div className="container-x relative">
        {/* Header — the same two-column rhythm as the Services section
            below it, at a smaller type scale so the band stays supporting. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 gap-x-12 items-end mb-8 md:mb-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-4">Affiliated partners</p>
            </Reveal>
            <h2
              id="partners-heading"
              className="display text-balance text-[clamp(1.6rem,3.4vw,2.75rem)] text-ink"
            >
              <StaggerWords text="Partners and brands" />{" "}
              <StaggerWords
                text="we grow with."
                delayStart={0.18}
                wordClassName="italic font-normal text-copper"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md lg:ml-auto">
                A selection of the brands and institutions affiliated with
                Evolut.
              </p>
            </Reveal>
          </div>
        </div>

        <ul
          role="list"
          className="flex flex-wrap justify-center gap-3 md:gap-4 lg:grid lg:grid-cols-[repeat(var(--partner-count),minmax(0,1fr))]"
          style={{ "--partner-count": partners.length } as CSSProperties}
        >
          {partners.map((partner, i) => (
            <li
              key={partner.name}
              className="basis-[calc(50%-0.375rem)] md:basis-[calc((100%-2rem)/3)]"
            >
              <Reveal delay={0.08 * i} className="h-full">
                <PartnerTile partner={partner} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * PartnerTile — one logo on a white card. If the logo file is missing
 * or fails to load, the partner's name stands in as a text wordmark.
 * ------------------------------------------------------------------ */
function PartnerTile({ partner }: { partner: Partner }) {
  const { name, logo, href, logoSize, darken } = partner;
  const [logoFailed, setLogoFailed] = useState(false);

  const tileClass = cn(
    "group relative flex h-24 w-full items-center justify-center border bg-surface px-4 md:h-28 xl:px-5",
    "shadow-[0_1px_2px_rgba(15,17,21,0.04)] transition-[transform,box-shadow] duration-500",
    TILE_EASE,
    "hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(232,112,74,0.3),0_22px_44px_-24px_rgba(15,17,21,0.35)]"
  );
  // Inline rather than `rounded-3xl`: globals.css gives every
  // :focus-visible element a 4px radius, unlayered, which would square
  // the tile off under keyboard focus. An inline style outranks it.
  const tileProps = { className: tileClass, style: { borderRadius: "1.5rem" } };

  const inner = (
    <>
      {/* Warm wash that fades in on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(90% 120% at 50% 130%, rgba(232,112,74,0.10), transparent 62%)",
        }}
      />

      {logoFailed ? (
        <span className="relative text-center text-[1.05rem] font-semibold leading-tight tracking-tight text-ink md:text-[1.2rem]">
          {name}
        </span>
      ) : (
        <Image
          src={logo}
          alt={`${name} logo`}
          width={200}
          height={80}
          // Inside a Reveal the tile starts invisible, and native lazy
          // loading can sit on the fetch indefinitely behind it.
          loading="eager"
          // These are small files that get swapped by hand. Next 16's
          // image optimizer caches for 4 hours, so a replaced logo kept
          // showing its old version; serve the file as it is instead.
          unoptimized
          onError={() => setLogoFailed(true)}
          className={cn(
            "relative w-full max-w-[9.5rem] object-contain transition-transform duration-500 group-hover:scale-[1.04] md:max-w-[11rem]",
            TILE_EASE,
            logoSize === "large" ? "h-12 md:h-16" : "h-10 md:h-14",
            darken && "brightness-50"
          )}
        />
      )}

      {href && (
        <ArrowUpRight
          aria-hidden="true"
          className="absolute right-3 top-3 h-3.5 w-3.5 text-mute opacity-40 transition-opacity duration-300 group-hover:opacity-100"
          strokeWidth={2}
        />
      )}
    </>
  );

  if (!href) return <div {...tileProps}>{inner}</div>;

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...tileProps}>
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} {...tileProps}>
      {inner}
    </Link>
  );
}
