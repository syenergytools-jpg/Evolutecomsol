"use client";

import {
  Package,
  Star,
  Bell,
  Truck,
  MessageSquare,
  RotateCcw,
  CreditCard,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { Avatar, AvatarStack } from "@/components/ui/avatar";
import { AnimatedList } from "@/components/ui/animated-list";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * OperatorFeed
 *
 * Two-column section: copy on the left, an auto-cycling "live
 * activity" feed on the right showing recent shopper activity — order
 * placed, review posted, restock alert, etc. Generic and ecommerce-
 * shaped so it reads as a real storefront stream rather than internal
 * dashboard chatter.
 * ------------------------------------------------------------------ */

type FeedTone = "ink" | "copper" | "electric" | "lime" | "emerald";

type FeedEntry = {
  /** Customer photo */
  photo: string;
  name: string;
  /** Initials fallback for the photo avatar */
  initials: string;
  /** What the customer did — short noun-phrase */
  action: string;
  /** Small chip label next to the action */
  chip: string;
  Icon: LucideIcon;
  /** Body line — kept brief, no internal jargon */
  body: string;
  ago: string;
  tone: FeedTone;
};

const FEED: FeedEntry[] = [
  {
    photo: "/testimonals_images/sarah.png",
    name: "Sarah K.",
    initials: "SK",
    action: "Order placed",
    chip: "Express",
    Icon: Package,
    body: "Two items · ships from the nearest warehouse",
    ago: "2m ago",
    tone: "lime",
  },
  {
    photo: "/testimonals_images/marcust.png",
    name: "Marcus T.",
    initials: "MT",
    action: "Review posted",
    chip: "5 stars",
    Icon: Star,
    body: "“Arrived faster than expected — packaging was lovely.”",
    ago: "12m ago",
    tone: "electric",
  },
  {
    photo: "/testimonals_images/priya.png",
    name: "Priya R.",
    initials: "PR",
    action: "Restock alert",
    chip: "Notify me",
    Icon: Bell,
    body: "Back-in-stock alert set on the hero product",
    ago: "31m ago",
    tone: "copper",
  },
  {
    photo: "/testimonals_images/jamesl.png",
    name: "James L.",
    initials: "JL",
    action: "Order delivered",
    chip: "Tracked",
    Icon: Truck,
    body: "Marked as received · feedback request queued",
    ago: "47m ago",
    tone: "ink",
  },
  {
    photo: "/testimonals_images/olivia.png",
    name: "Olivia D.",
    initials: "OD",
    action: "Question asked",
    chip: "PDP",
    Icon: MessageSquare,
    body: "Asked about international shipping options",
    ago: "1h ago",
    tone: "emerald",
  },
  {
    photo: "/testimonals_images/sarah.png",
    name: "Sarah K.",
    initials: "SK",
    action: "Subscription renewed",
    chip: "Auto",
    Icon: RotateCcw,
    body: "Monthly box · auto-renews on the 28th",
    ago: "2h ago",
    tone: "ink",
  },
  {
    photo: "/testimonals_images/marcust.png",
    name: "Marcus T.",
    initials: "MT",
    action: "Payment received",
    chip: "Card",
    Icon: CreditCard,
    body: "Settled · funds available next business day",
    ago: "3h ago",
    tone: "copper",
  },
  {
    photo: "/testimonals_images/priya.png",
    name: "Priya R.",
    initials: "PR",
    action: "Wishlist saved",
    chip: "Saved",
    Icon: Heart,
    body: "Three items added · price-drop alerts on",
    ago: "4h ago",
    tone: "lime",
  },
];

const accentDot: Record<FeedTone, string> = {
  ink: "bg-ink",
  copper: "bg-copper",
  electric: "bg-electric",
  lime: "bg-lime",
  emerald: "bg-emerald",
};

const accentChip: Record<FeedTone, string> = {
  ink: "bg-ink/8 text-ink",
  copper: "bg-copper/12 text-copper",
  electric: "bg-electric/10 text-electric",
  lime: "bg-lime/30 text-ink",
  emerald: "bg-emerald/15 text-emerald",
};

export function OperatorFeed() {
  const items = FEED.map((entry, i) => (
    <FeedCard key={`${entry.name}-${i}`} entry={entry} />
  ));

  // Avatar stack data — first 5 customer photos
  const stackAvatars = FEED.slice(0, 5).map((e) => ({
    src: e.photo,
    initials: e.initials,
    alt: e.name,
    tone: e.tone,
  }));

  return (
    <section className="relative bg-canvas py-24 md:py-32 border-y border-hairline overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-grid opacity-30 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 50% at 100% 0%, rgba(232,112,74,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12 items-start">
          {/* LEFT — copy + avatar stack + meta */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center gap-2.5 mb-7 text-mute">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald animate-ping opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
                </span>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em]">
                  · Live · shopper activity ·
                </p>
              </div>
            </Reveal>

            <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] text-ink leading-[1.04] mb-7">
              <StaggerWords text="Stores stay quiet." />
              <br />
              <StaggerWords
                text="The feed never does."
                delayStart={0.18}
                wordClassName="italic font-normal text-copper"
              />
            </h2>

            <Reveal delay={0.4}>
              <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md mb-9">
                A live trickle of the things that matter to a brand —
                orders placed, reviews posted, questions asked, alerts
                set. The signal a storefront sends when it&rsquo;s
                actually working.
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <div className="flex items-center gap-5">
                <AvatarStack avatars={stackAvatars} size="md" max={5} />
                <div className="leading-tight">
                  <p className="text-sm font-medium text-ink">
                    Real shoppers, real signals
                  </p>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute mt-0.5">
                    Sample stream · paused on hover
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.65}>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { v: "8", l: "Event types" },
                  { v: "240+", l: "Brands streaming" },
                  { v: "<24h", l: "Brief response" },
                ].map((s) => (
                  <div key={s.l} className="border-t border-hairline-strong pt-3">
                    <p className="display text-[1.4rem] leading-none text-ink mb-1 tabular-nums">
                      {s.v}
                    </p>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mute">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT — the auto-cycling feed */}
          <div className="lg:col-span-6">
            <Reveal delay={0.3}>
              <div className="rounded-[1.75rem] border border-hairline-strong bg-surface p-5 md:p-6 shadow-[0_30px_70px_-30px_rgba(15,17,21,0.18)]">
                {/* Feed header */}
                <div className="flex items-center justify-between border-b border-hairline pb-3 mb-5">
                  <div className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute">
                    <span className="h-1 w-1 rounded-full bg-emerald" />
                    Storefront activity · last 4h
                  </div>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-mute/65">
                    Auto · pauses on hover
                  </span>
                </div>

                {/* The feed — fixed min-height stops the layout from
                    bouncing when items enter / exit */}
                <div className="min-h-[26rem] overflow-hidden">
                  <AnimatedList
                    items={items}
                    visibleCount={4}
                    intervalMs={2600}
                  />
                </div>
              </div>

              {/* Tiny caption beneath */}
              <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute/65 text-center">
                Sample feed · entries are illustrative
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== *
 * Single feed card — avatar + action chip + body + timestamp
 * ============================================================== */
function FeedCard({ entry }: { entry: FeedEntry }) {
  const Icon = entry.Icon;
  return (
    <div className="rounded-2xl border border-hairline-strong bg-canvas p-4 md:p-5 transition-shadow hover:shadow-[0_18px_40px_-18px_rgba(15,17,21,0.18)]">
      <div className="flex items-start gap-3.5">
        <Avatar
          src={entry.photo}
          alt={entry.name}
          initials={entry.initials}
          tone={entry.tone}
          size="md"
          variant="ring"
        />
        <div className="flex-1 min-w-0">
          {/* Top row — name + action chip + ago */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <p className="text-sm font-semibold text-ink truncate">
              {entry.name}
            </p>
            <span className="text-mute text-[0.78rem]">·</span>
            <p className="text-sm text-ink-soft truncate">
              {entry.action}
            </p>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.16em]",
                accentChip[entry.tone]
              )}
            >
              <Icon className="h-2.5 w-2.5" strokeWidth={2.4} />
              {entry.chip}
            </span>
            <span className="ml-auto font-mono text-[0.55rem] uppercase tracking-[0.16em] text-mute shrink-0">
              {entry.ago}
            </span>
          </div>

          {/* Body */}
          <p className="text-[0.85rem] text-ink-soft leading-[1.55]">
            {entry.body}
          </p>
        </div>

        {/* Accent dot — far right, signals the tone */}
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 rounded-full mt-2 shrink-0",
            accentDot[entry.tone]
          )}
        />
      </div>
    </div>
  );
}
