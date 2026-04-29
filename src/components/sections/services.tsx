"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ------------------------------------------------------------------ *
 * Services — tedy.app-style scattered card showcase.
 *
 * 200vh wrapper with a sticky 100vh inner stage. A centered headline +
 * CTA sits in the middle while 8 service cards float scattered around
 * it, each with a pastel pill label overhanging a corner. As the user
 * scrolls, the cards animate from the middle outward to their scattered
 * positions (GSAP ScrollTrigger scrub).
 * ------------------------------------------------------------------ */

type CardSpec = {
  service: Service;
  /** Image path for the card visual. */
  image: string;
  /** Final position relative to center: percent of card's own dimensions. */
  x: string;
  y: string;
  /** Size tier — large (~12vw) vs small (~9vw). */
  size: "lg" | "sm";
  /** Pastel pill tone. */
  pill: "cream" | "pink" | "cyan" | "green" | "copper";
  /** Where the pill sits on the card edge. */
  pillSide: "tl" | "tr" | "bl" | "br";
  /** Slight tilt for the lifted feel. */
  rotate: number;
};

const PILL_TONES: Record<CardSpec["pill"], string> = {
  cream: "bg-[#FFF4D9] text-ink",
  pink: "bg-[#FFDCEA] text-ink",
  cyan: "bg-[#D9F4F7] text-ink",
  green: "bg-[#E8F9DD] text-ink",
  copper: "bg-copper-soft text-ink",
};

const PILL_SIDE: Record<CardSpec["pillSide"], string> = {
  tl: "top-0 left-0 -translate-y-1/2 -translate-x-2",
  tr: "top-0 right-0 -translate-y-1/2 translate-x-2",
  bl: "bottom-0 left-0 translate-y-1/2 -translate-x-2",
  br: "bottom-0 right-0 translate-y-1/2 translate-x-2",
};

// Map: service slug → image, position, size, pill tone
const CARDS: CardSpec[] = [
  {
    service: services.find((s) => s.slug === "sourcing")!,
    image: "/images/capability-source.jpg",
    x: "-300%",
    y: "-220%",
    size: "lg",
    pill: "cream",
    pillSide: "tr",
    rotate: -3,
  },
  {
    service: services.find((s) => s.slug === "amazon")!,
    image: "/images/capability-scale.jpg",
    x: "60%",
    y: "-280%",
    size: "sm",
    pill: "pink",
    pillSide: "br",
    rotate: 4,
  },
  {
    service: services.find((s) => s.slug === "photography")!,
    image: "/images/process-photography.jpg",
    x: "330%",
    y: "-180%",
    size: "lg",
    pill: "cyan",
    pillSide: "bl",
    rotate: -2,
  },
  {
    service: services.find((s) => s.slug === "ppc")!,
    image: "/images/capability-build.jpg",
    x: "380%",
    y: "60%",
    size: "sm",
    pill: "green",
    pillSide: "tl",
    rotate: 3,
  },
  {
    service: services.find((s) => s.slug === "freight")!,
    image: "/images/process-source.jpg",
    x: "290%",
    y: "230%",
    size: "lg",
    pill: "cream",
    pillSide: "tl",
    rotate: -4,
  },
  {
    service: services.find((s) => s.slug === "trademark")!,
    image: "/images/capability-defend.jpg",
    x: "-40%",
    y: "300%",
    size: "sm",
    pill: "copper",
    pillSide: "tr",
    rotate: 2,
  },
  {
    service: services.find((s) => s.slug === "bol")!,
    image: "/images/process-listing.jpg",
    x: "-310%",
    y: "200%",
    size: "lg",
    pill: "green",
    pillSide: "tr",
    rotate: 3,
  },
  {
    service: services.find((s) => s.slug === "shopify")!,
    image: "/images/about-laptop.jpg",
    x: "-380%",
    y: "0%",
    size: "sm",
    pill: "pink",
    pillSide: "br",
    rotate: -3,
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;
      const cards = gsap.utils.toArray<HTMLElement>(".scatter-card");
      if (!cards.length) return;

      // Initial — all cards collapsed near center, scaled down, hidden
      gsap.set(cards, {
        x: 0,
        y: 0,
        scale: 0.5,
        opacity: 0,
        rotate: 0,
      });

      // Scroll-driven scatter
      gsap.to(cards, {
        x: (_, target) => target.dataset.fx ?? "0%",
        y: (_, target) => target.dataset.fy ?? "0%",
        scale: 1,
        opacity: 1,
        rotate: (_, target) => Number(target.dataset.fr ?? 0),
        ease: "power2.out",
        stagger: { amount: 0.5, from: "center" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [reduce] }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-canvas"
      style={{ height: reduce ? "auto" : "200vh" }}
    >
      <div
        ref={stageRef}
        className={cn(
          "relative w-full overflow-hidden",
          reduce
            ? "py-24 md:py-32"
            : "sticky top-0 h-screen flex items-center justify-center"
        )}
      >
        {/* Quiet paper grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 paper-grid opacity-40 pointer-events-none"
        />

        {/* CENTERED CONTENT */}
        <div className="relative z-10 max-w-2xl text-center px-6">
          <Reveal>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-mute mb-6">
              · what we do ·
            </p>
          </Reveal>
          <h2 className="display text-[clamp(2.25rem,5.4vw,5rem)] text-ink leading-[1.02] mb-6 max-w-[18ch] mx-auto">
            <StaggerWords text="Eight services," />{" "}
            <StaggerWords
              text="one stack."
              delayStart={0.18}
              wordClassName="italic font-normal text-copper"
            />
          </h2>
          <Reveal delay={0.4}>
            <p className="text-base md:text-lg text-ink-soft leading-[1.6] max-w-md mx-auto mb-10">
              Each service runs as part of one accountable team — sourcing,
              listings, photography, ads, freight, trademark. Compounding,
              not handing off.
            </p>
          </Reveal>
          <Reveal delay={0.55}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-3 text-[0.95rem] font-medium hover:bg-ink-soft transition-all hover:-translate-y-0.5 shadow-[0_18px_40px_-18px_rgba(15,17,21,0.3)]"
            >
              Explore all services
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          </Reveal>
        </div>

        {/* SCATTERED CARDS — absolutely positioned, animated by GSAP */}
        {CARDS.map((c, i) => (
          <ScatterCard key={c.service.slug} card={c} index={i} reduce={Boolean(reduce)} />
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- CARD ----------------------------- */
function ScatterCard({
  card,
  index,
  reduce,
}: {
  card: CardSpec;
  index: number;
  reduce: boolean;
}) {
  // Sizing — bigger on desktop, smaller on tablet, hide some on mobile
  const sizeClass =
    card.size === "lg"
      ? "w-[14vw] max-w-[180px] min-w-[110px] md:w-[12vw]"
      : "w-[10.5vw] max-w-[140px] min-w-[88px] md:w-[9vw]";

  // Hide some cards on mobile to keep it readable
  const mobileHide = index >= 4 ? "hidden md:block" : "block";

  return (
    <Link
      href={`/services/${card.service.slug}`}
      data-fx={card.x}
      data-fy={card.y}
      data-fr={card.rotate}
      className={cn(
        "scatter-card group absolute z-20",
        "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        sizeClass,
        mobileHide,
        // Reduced-motion: fall back to a static spread (use the
        // data-fx/fy via inline style)
        reduce && "opacity-100"
      )}
      style={
        reduce
          ? {
              transform: `translate(-50%, -50%) translate(${card.x}, ${card.y}) rotate(${card.rotate}deg)`,
            }
          : undefined
      }
      aria-label={card.service.title}
    >
      <div
        className={cn(
          "relative aspect-square rounded-[1.25rem] overflow-hidden bg-canvas-2 border border-hairline-strong transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "group-hover:scale-[1.04] group-hover:shadow-[0_24px_60px_-20px_rgba(15,17,21,0.25)]"
        )}
      >
        <Image
          src={card.image}
          alt={card.service.title}
          fill
          sizes="(max-width: 768px) 30vw, 12vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Subtle dark overlay on hover */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500 pointer-events-none" />
      </div>

      {/* Pastel pill label — overhangs a corner */}
      <span
        className={cn(
          "absolute z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.15em] whitespace-nowrap shadow-[0_8px_20px_-8px_rgba(15,17,21,0.25)]",
          PILL_TONES[card.pill],
          PILL_SIDE[card.pillSide]
        )}
      >
        {card.service.slug}
      </span>
    </Link>
  );
}
