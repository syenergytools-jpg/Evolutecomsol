"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Aurora — soft, drifting color veils inspired by northern lights.
 */
export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
}: {
  className?: string;
  children?: ReactNode;
  showRadialGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-[100vh] items-center justify-center bg-canvas text-ink transition-bg",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `aurora-veil pointer-events-none absolute -inset-[10px] [filter:blur(10px)] invert dark:invert-0 will-change-transform [background-image:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%),repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)] [background-size:300%_200%] [background-position:50%_50%,50%_50%] opacity-50`,
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]"
          )}
        />
        <div
          className={cn(
            `aurora-veil-2 pointer-events-none absolute -inset-[10px] [filter:blur(10px)] invert dark:invert-0 will-change-transform [background-image:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%),repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)] [background-size:200%_100%] opacity-30`
          )}
        />
      </div>
      {children}
      <style jsx>{`
        .aurora-veil {
          animation: aurora 60s linear infinite;
        }
        .aurora-veil-2 {
          animation: aurora 90s linear infinite reverse;
        }
        @keyframes aurora {
          from { background-position: 50% 50%, 50% 50%; }
          to { background-position: 350% 50%, 350% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-veil, .aurora-veil-2 { animation: none !important; }
        }
      `}</style>
    </div>
  );
};
