"use client";

import { cn } from "@/lib/utils";

/**
 * SVG grid background — pure decoration, depth-0 layer.
 */
export const GridPattern = ({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  ...props
}: {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string;
  squares?: number[][];
  className?: string;
} & React.SVGProps<SVGSVGElement>) => {
  const id = "grid-pattern-" + Math.random().toString(36).slice(2, 8);
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-mute/20 stroke-mute/20",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], i) => (
            <rect
              strokeWidth="0"
              key={`sq-${i}`}
              width={width - 1}
              height={height - 1}
              x={sx * width + 1}
              y={sy * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  );
};

export const DotPattern = ({
  className,
  cx = 1,
  cy = 1,
  cr = 1,
  size = 24,
}: {
  className?: string;
  cx?: number;
  cy?: number;
  cr?: number;
  size?: number;
}) => {
  const id = "dot-pattern-" + Math.random().toString(36).slice(2, 8);
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-mute/30",
        className
      )}
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <circle cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};
