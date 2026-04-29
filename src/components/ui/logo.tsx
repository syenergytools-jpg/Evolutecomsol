import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Evolut wordmark.
 *
 * Variants:
 *   • default — full lockup (icon + "Evolut Ecommerce Solutions"
 *     wordmark) using /public/logo.png. Designed for the warm
 *     canvas (#f4f1ea) background; uses mix-blend-multiply so the
 *     paper-texture PNG melts into the canvas.
 *   • mark — icon only, /public/logo_1.png inside a tight square. Use
 *     anywhere the wordmark is too wide (compass hub, footer plate,
 *     mobile nav). Renders as-is (no blend) so it stays crisp on any
 *     background.
 *   • invert — same as default but for dark sections. Renders inside a
 *     small canvas-colored plate so the paper-texture logo stays
 *     legible on obsidian.
 */
export function Logo({
  className,
  size = "md",
  variant = "default",
  alt = "Evolut Ecommerce Solutions",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "mark" | "invert";
  alt?: string;
}) {
  // Mark mode — icon only, square aspect
  if (variant === "mark") {
    const dim = size === "lg" ? 56 : size === "sm" ? 32 : 44;
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center select-none",
          className
        )}
        style={{ width: dim, height: dim }}
      >
        <Image
          src="/logo_1.png"
          alt={alt}
          width={dim}
          height={dim}
          priority
          className="object-contain"
        />
      </span>
    );
  }

  // Invert — full lockup on a small canvas plate (for dark backgrounds)
  if (variant === "invert") {
    const dims =
      size === "lg"
        ? { w: 220, h: 76, plate: "p-2" }
        : size === "sm"
        ? { w: 120, h: 42, plate: "p-1.5" }
        : { w: 160, h: 56, plate: "p-2" };
    return (
      <span
        className={cn(
          "inline-flex items-center select-none rounded-xl bg-canvas",
          dims.plate,
          className
        )}
      >
        <Image
          src="/logo.png"
          alt={alt}
          width={dims.w}
          height={dims.h}
          priority
          className="object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </span>
    );
  }

  // Default — full lockup on canvas
  const dims =
    size === "lg"
      ? { w: 220, h: 76 }
      : size === "sm"
      ? { w: 120, h: 42 }
      : { w: 160, h: 56 };

  return (
    <span
      className={cn("inline-flex items-center select-none", className)}
      style={{ mixBlendMode: "multiply" }}
    >
      <Image
        src="/logo.png"
        alt={alt}
        width={dims.w}
        height={dims.h}
        priority
        className="object-contain"
      />
    </span>
  );
}
