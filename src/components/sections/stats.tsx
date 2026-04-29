"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Activity, Layers, Award } from "lucide-react";
import { stats } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";
import { fmt, cn } from "@/lib/utils";

const ACCENTS = [
  { Icon: Activity, dot: "bg-electric", text: "text-electric", trend: [0.3, 0.4, 0.5, 0.6, 0.7, 0.85, 1] },
  { Icon: TrendingUp, dot: "bg-copper", text: "text-copper", trend: [0.4, 0.5, 0.55, 0.7, 0.85, 0.95, 1] },
  { Icon: Layers, dot: "bg-ink", text: "text-ink", trend: [0.2, 0.4, 0.5, 0.7, 0.8, 0.9, 1] },
  { Icon: Award, dot: "bg-emerald", text: "text-emerald", trend: [0.5, 0.6, 0.65, 0.75, 0.85, 0.92, 1] },
];

function CountUp({
  to,
  isFloat = false,
  suffix = "",
}: {
  to: number;
  isFloat?: boolean;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return controls.stop;
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {isFloat ? val.toFixed(1) : fmt(Math.round(val))}
      <span aria-hidden="true">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative bg-canvas py-24 md:py-32 border-y border-hairline">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow eyebrow-line text-center mb-14 mx-auto w-fit">
            Numbers we operate by
          </p>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {stats.map((s, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            const Icon = accent.Icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative overflow-hidden text-center md:text-left px-1 md:px-0"
              >
                {/* tiny header */}
                <div className="flex items-center gap-2 justify-center md:justify-start mb-4 md:mb-5">
                  <span className={cn("h-7 w-7 rounded-lg border border-hairline grid place-items-center", accent.text)}>
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  {/* mini sparkline */}
                  <div className="hidden sm:flex items-end h-3.5 gap-[2px]">
                    {accent.trend.map((v, j) => (
                      <span
                        key={j}
                        className={cn("w-[2px] rounded-sm", accent.dot, "opacity-70")}
                        style={{ height: `${v * 14}px` }}
                      />
                    ))}
                  </div>
                </div>

                {/* the big number — clamped tighter so 18,000+ doesn't overflow into next col */}
                <p className="display text-[clamp(2.25rem,4.6vw,4.5rem)] text-ink leading-[0.95] mb-3 font-mono tracking-tight whitespace-nowrap">
                  <CountUp
                    to={s.value}
                    isFloat={s.isFloat}
                    suffix={s.suffix}
                  />
                </p>
                <p className="text-sm text-mute leading-snug max-w-[200px] mx-auto md:mx-0">
                  {s.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
