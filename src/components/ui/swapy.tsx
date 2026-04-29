"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties,
} from "react";
import { createSwapy, type Swapy, type SwapEndEventHandler } from "swapy";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Swapy primitives — thin React wrappers over the vanilla `swapy`
 * library. Mirrors the conceptual API of `<SwapyLayout>`,
 * `<SwapySlot>`, `<SwapyItem>` and `<DragHandle>`.
 *
 *   <SwapyLayout className={GRID_CLASSES}>
 *     <SwapySlot slotId="a" className="col-span-4">
 *       <SwapyItem itemId="a">
 *         <DragHandle />
 *         <Card />
 *       </SwapyItem>
 *     </SwapySlot>
 *     ...
 *   </SwapyLayout>
 *
 * Swapy is initialised on mount against the layout's container ref.
 * Slots and items are emitted as plain divs carrying the
 * `data-swapy-*` attributes the library needs.
 * ------------------------------------------------------------------ */

type SwapyConfig = {
  animation?: "dynamic" | "spring" | "none";
  swapMode?: "hover" | "drop";
  autoScrollOnDrag?: boolean;
  enabled?: boolean;
};

export function SwapyLayout({
  id,
  className,
  style,
  config,
  onSwapEnd,
  children,
}: {
  id?: string;
  className?: string;
  style?: CSSProperties;
  config?: SwapyConfig;
  onSwapEnd?: SwapEndEventHandler;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const swapyRef = useRef<Swapy | null>(null);

  // Stash latest callback in a ref so we don't re-init swapy when it
  // changes — swapy's listener API only sets one handler at a time.
  const onSwapEndRef = useRef(onSwapEnd);
  useEffect(() => {
    onSwapEndRef.current = onSwapEnd;
  }, [onSwapEnd]);

  useEffect(() => {
    if (!ref.current) return;
    const swapy = createSwapy(ref.current, {
      animation: config?.animation ?? "dynamic",
      swapMode: config?.swapMode ?? "hover",
      autoScrollOnDrag: config?.autoScrollOnDrag ?? true,
      enabled: config?.enabled ?? true,
    });
    swapy.onSwapEnd((event) => {
      onSwapEndRef.current?.(event);
    });
    swapyRef.current = swapy;
    return () => {
      swapy.destroy();
      swapyRef.current = null;
    };
    // Init once per mount — config changes don't re-init by design.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} id={id} className={className} style={style}>
      {children}
    </div>
  );
}

export function SwapySlot({
  slotId,
  className,
  children,
}: {
  slotId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div data-swapy-slot={slotId} className={className}>
      {children}
    </div>
  );
}

export function SwapyItem({
  itemId,
  className,
  children,
}: {
  itemId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div data-swapy-item={itemId} className={cn("h-full", className)}>
      {children}
    </div>
  );
}

/**
 * DragHandle — the only spot a SwapyItem will accept a drag from.
 * Without it, swapy would let you grab the entire card, which fights
 * with hover effects, links and other interactions inside the card.
 *
 * Default style is a small pill in the top-right with a grip icon.
 * Pass `className` to reposition or restyle.
 */
export function DragHandle({
  className,
  label = "Drag to reorder",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      data-swapy-handle
      aria-label={label}
      className={cn(
        "absolute top-3 right-3 z-20 inline-flex h-7 w-7 items-center justify-center rounded-full",
        "bg-canvas/85 text-ink/70 backdrop-blur ring-1 ring-ink/10 shadow-sm",
        "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
        "transition-opacity duration-200",
        "cursor-grab active:cursor-grabbing",
        className
      )}
    >
      <GripVertical className="h-3.5 w-3.5" strokeWidth={2.2} />
    </button>
  );
}
