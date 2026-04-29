"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Image as ImageIcon, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark" | "accent" | "obsidian" | "copper" | "lime";

const variantStyles: Record<Variant, { bg: string; border: string; text: string; accent: string }> = {
  light: {
    bg: "bg-canvas-2",
    border: "border-hairline-strong",
    text: "text-ink-soft",
    accent: "text-electric",
  },
  dark: {
    bg: "bg-obsidian-soft",
    border: "border-hairline-dark",
    text: "text-canvas/70",
    accent: "text-electric-glow",
  },
  accent: {
    bg: "bg-gradient-to-br from-electric/[0.10] via-canvas-2 to-copper/[0.08]",
    border: "border-hairline-strong",
    text: "text-ink-soft",
    accent: "text-electric",
  },
  obsidian: {
    bg: "bg-obsidian",
    border: "border-hairline-dark",
    text: "text-canvas/60",
    accent: "text-electric-glow",
  },
  copper: {
    bg: "bg-copper",
    border: "border-canvas/20",
    text: "text-canvas/80",
    accent: "text-canvas",
  },
  lime: {
    bg: "bg-lime",
    border: "border-ink/20",
    text: "text-ink/80",
    accent: "text-ink",
  },
};

/**
 * Smart image slot. Shows a styled placeholder with the AI prompt
 * visible + copy-to-clipboard button. Pass `src` to swap it for the
 * real image — no other changes needed at the call site.
 */
export function ImagePlaceholder({
  src,
  alt,
  prompt,
  aspectRatio = "4/3",
  className,
  variant = "light",
  caption,
  showPrompt = true,
}: {
  src?: string;
  alt: string;
  prompt: string;
  aspectRatio?: string;
  className?: string;
  variant?: Variant;
  caption?: string;
  showPrompt?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const styles = variantStyles[variant];

  const copyPrompt = () => {
    if (typeof navigator === "undefined") return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Real image mode — no placeholder UI
  if (src) {
    return (
      <div
        className={cn("relative overflow-hidden rounded-3xl", className)}
        style={{ aspectRatio }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-6 md:p-8",
        styles.bg,
        styles.border,
        styles.text,
        className
      )}
      style={{ aspectRatio }}
    >
      {/* Dot grid backdrop */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Glow accent */}
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-electric/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-copper/10 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        <div className={cn("mb-4 h-12 w-12 rounded-2xl border border-current/30 flex items-center justify-center", styles.accent)}>
          <ImageIcon className="h-5 w-5" strokeWidth={1.8} />
        </div>

        <p className="text-[0.65rem] font-mono uppercase tracking-[0.18em] opacity-60 mb-1.5">
          Image slot · {aspectRatio.replace("/", " : ")}
        </p>
        <p className="text-sm md:text-base font-semibold leading-snug mb-2">
          {alt}
        </p>
        {caption && (
          <p className="text-xs opacity-60 leading-relaxed mb-4">{caption}</p>
        )}

        {showPrompt && (
          <>
            <button
              onClick={copyPrompt}
              className={cn(
                "mt-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.7rem] font-mono uppercase tracking-wider border transition-all",
                "border-current/40 hover:border-current",
                "opacity-70 hover:opacity-100"
              )}
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                  Copied to clipboard
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3" strokeWidth={2} />
                  Copy AI prompt
                  <Copy className="h-3 w-3 opacity-50" strokeWidth={2} />
                </>
              )}
            </button>

            {/* Prompt preview — compact, hides on smaller cards */}
            <p className={cn("mt-4 text-[0.65rem] leading-relaxed opacity-50 max-w-xs italic line-clamp-3 hidden sm:block", styles.text)}>
              {prompt.length > 140 ? `"${prompt.slice(0, 140)}…"` : `"${prompt}"`}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
