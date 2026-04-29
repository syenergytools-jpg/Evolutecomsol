"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type MovingCard = {
  quote: string;
  name: string;
  title: string;
};

/**
 * Infinite horizontal marquee. Two cloned tracks slide continuously.
 * GPU-accelerated, pauses on hover.
 */
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: MovingCard[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const dup = item.cloneNode(true) as HTMLElement;
      dup.setAttribute("aria-hidden", "true");
      scrollerRef.current?.appendChild(dup);
    });
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
    containerRef.current.style.setProperty(
      "--animation-duration",
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
    );
    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "moving-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="w-[360px] max-w-full flex-shrink-0 rounded-2xl border border-hairline bg-surface px-7 py-6 md:w-[460px]"
          >
            <blockquote>
              <span className="relative z-20 text-[0.95rem] leading-[1.6] text-ink-soft">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.4] font-medium text-ink">
                    {item.name}
                  </span>
                  <span className="text-xs leading-[1.4] text-mute font-mono uppercase tracking-widest">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .moving-scroll {
          animation: scroll var(--animation-duration, 40s)
            var(--animation-direction, forwards) linear infinite;
        }
        @keyframes scroll {
          to { transform: translateX(calc(-50% - 0.75rem)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .moving-scroll { animation: none !important; }
        }
      `}</style>
    </div>
  );
};
