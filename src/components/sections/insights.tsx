"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { insights } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/section-header";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const accentMap = ["copper", "electric", "obsidian"] as const;

export function Insights() {
  return (
    <section
      id="insights"
      className="relative bg-canvas py-28 md:py-36 border-t border-hairline"
    >
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Insights"
              title="What we're writing about."
              subtitle="Operator-grade playbooks. The same notes we share with our portfolio brands every week."
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <Link
              href="/insights"
              className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-ink-soft hover:text-electric transition-colors"
            >
              Read all insights →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {insights.map((post, i) => {
            const accent = accentMap[i % accentMap.length];
            return (
              <motion.a
                key={post.slug}
                href={`/insights/${post.slug}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.1,
                  ease: PREMIUM_EASE,
                }}
                whileHover={{ y: -6 }}
                className="group flex flex-col rounded-3xl bg-surface border border-hairline overflow-hidden transition-shadow hover:shadow-[0_24px_60px_-20px_rgba(15,17,21,0.18)]"
              >
                {/* visual header */}
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    accent === "copper"
                      ? "bg-gradient-to-br from-copper via-copper-soft to-canvas-2"
                      : accent === "electric"
                      ? "bg-gradient-to-br from-electric via-electric-glow to-canvas-2"
                      : "bg-gradient-to-br from-obsidian to-obsidian-soft"
                  }`}
                >
                  <div className="absolute inset-0 paper-grid opacity-15" />
                  <div className="absolute inset-x-0 bottom-0 p-5 flex justify-between items-end">
                    <span
                      className={`font-mono text-[0.65rem] uppercase tracking-[0.16em] ${
                        accent === "obsidian" ? "text-canvas/80" : "text-ink/80"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span
                      className={`font-mono text-[0.65rem] uppercase tracking-[0.16em] ${
                        accent === "obsidian" ? "text-canvas/60" : "text-ink/60"
                      }`}
                    >
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <h3 className="display text-xl md:text-[1.4rem] text-ink leading-tight mb-3">
                    {post.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-hairline">
                    <span className="text-sm font-medium text-ink group-hover:text-electric transition-colors">
                      Read article
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-ink-soft group-hover:text-electric group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
