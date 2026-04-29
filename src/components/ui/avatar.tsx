"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Avatar — small, composable identity chip.
 *
 * Variants:
 *   - basic        : just the image / initials
 *   - ring         : gradient brand ring around the avatar
 *   - status       : with a status dot in the bottom-right corner
 *
 * Stack: <AvatarStack> renders multiple avatars overlapping with a
 * "+N" overflow chip. The component falls back to initials when no
 * image is provided, so it's safe to use without portraits.
 */

type AvatarTone = "ink" | "copper" | "electric" | "lime" | "emerald";

const toneBg: Record<AvatarTone, string> = {
  ink: "bg-ink text-canvas",
  copper: "bg-copper text-canvas",
  electric: "bg-electric text-canvas",
  lime: "bg-lime text-ink",
  emerald: "bg-emerald text-canvas",
};

const ringFrom: Record<AvatarTone, string> = {
  ink: "from-ink/40",
  copper: "from-copper/60",
  electric: "from-electric/55",
  lime: "from-lime/60",
  emerald: "from-emerald/55",
};

const ringTo: Record<AvatarTone, string> = {
  ink: "to-ink-soft/0",
  copper: "to-copper-soft/0",
  electric: "to-electric-glow/0",
  lime: "to-lime/0",
  emerald: "to-emerald/0",
};

const sizeMap = {
  xs: { box: "h-7 w-7", text: "text-[0.62rem]", ring: "ring-1", dot: "h-1.5 w-1.5" },
  sm: { box: "h-9 w-9", text: "text-[0.7rem]", ring: "ring-1", dot: "h-2 w-2" },
  md: { box: "h-12 w-12", text: "text-[0.85rem]", ring: "ring-1.5", dot: "h-2.5 w-2.5" },
  lg: { box: "h-16 w-16", text: "text-[1rem]", ring: "ring-2", dot: "h-3 w-3" },
  xl: { box: "h-24 w-24", text: "text-[1.4rem]", ring: "ring-2", dot: "h-3.5 w-3.5" },
} as const;

export type AvatarSize = keyof typeof sizeMap;

export function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  tone = "ink",
  variant = "basic",
  status = "offline",
  className,
}: {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  tone?: AvatarTone;
  variant?: "basic" | "ring" | "status";
  status?: "online" | "busy" | "offline";
  className?: string;
}) {
  const s = sizeMap[size];
  const dotColor =
    status === "online"
      ? "bg-emerald"
      : status === "busy"
      ? "bg-copper"
      : "bg-mute";

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full",
        s.box,
        className
      )}
    >
      {/* Gradient ring (variant="ring") */}
      {variant === "ring" && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-[-3px] rounded-full bg-gradient-to-br",
            ringFrom[tone],
            ringTo[tone]
          )}
        />
      )}

      {/* Inner circle */}
      <span
        className={cn(
          "relative grid place-items-center overflow-hidden rounded-full",
          s.box,
          // Inner stroke so the avatar reads on both canvas + dark
          "ring-1 ring-canvas/0 group-hover:ring-canvas/15"
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="48px"
            className="object-cover"
          />
        ) : (
          <span
            className={cn(
              "grid place-items-center w-full h-full font-mono font-semibold tracking-tight",
              s.text,
              toneBg[tone]
            )}
            aria-label={alt}
          >
            {initials ?? "··"}
          </span>
        )}
      </span>

      {/* Status dot */}
      {variant === "status" && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-canvas",
            s.dot,
            dotColor
          )}
        />
      )}
    </span>
  );
}

/* ---------------------------------------------------------------- *
 * AvatarStack — overlapping avatars with optional "+N" overflow chip.
 * ---------------------------------------------------------------- */
export function AvatarStack({
  avatars,
  size = "md",
  max = 4,
  className,
}: {
  avatars: Array<{
    src?: string;
    alt?: string;
    initials?: string;
    tone?: AvatarTone;
  }>;
  size?: AvatarSize;
  max?: number;
  className?: string;
}) {
  const visible = avatars.slice(0, max);
  const overflow = Math.max(0, avatars.length - max);
  const s = sizeMap[size];

  return (
    <div className={cn("flex -space-x-2.5", className)}>
      {visible.map((a, i) => (
        <span
          key={i}
          className="rounded-full ring-2 ring-canvas"
          style={{ zIndex: visible.length - i }}
        >
          <Avatar
            src={a.src}
            alt={a.alt}
            initials={a.initials}
            tone={a.tone}
            size={size}
            variant="basic"
          />
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            "relative grid place-items-center rounded-full bg-canvas-2 text-ink ring-2 ring-canvas font-mono font-semibold",
            s.box,
            s.text
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
