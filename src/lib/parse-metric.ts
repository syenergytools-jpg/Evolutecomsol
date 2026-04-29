/**
 * parseMetric — turn a human metric string like "$614,536.70", "+412%",
 * "5.2×", "$1.2M", or "0 → $340K" into props for `<CountUp>`.
 *
 * Returns:
 *   { animatable: true, value, prefix, suffix, decimals }
 *     when the string can be animated as a single number.
 *
 *   { animatable: false, raw } — fall back to the original string when
 *   the metric is a range, contains arrows, or otherwise can't be
 *   reduced to one number.
 */

export type ParsedMetric =
  | {
      animatable: true;
      value: number;
      prefix: string;
      suffix: string;
      decimals: number;
    }
  | {
      animatable: false;
      raw: string;
    };

export function parseMetric(input: string): ParsedMetric {
  const raw = input.trim();

  // Anything containing a literal arrow (→ or ->) or "/" is a range —
  // not animatable as one ticking number.
  if (/[→]|->|\//.test(raw)) {
    return { animatable: false, raw };
  }

  // Capture: optional sign/$, the numeric body, optional unit suffix
  const match = raw.match(
    /^\s*([+\-−]?)\s*(\$)?\s*([\d.,]+)\s*([×xX%]|M|K|B|wks?|yrs?)?\s*$/i
  );
  if (!match) return { animatable: false, raw };

  const [, signRaw, dollar, numRaw, unitRaw] = match;
  const sign = signRaw === "-" || signRaw === "−" ? -1 : 1;

  // Strip commas and parse
  const num = Number(numRaw.replace(/,/g, ""));
  if (!isFinite(num)) return { animatable: false, raw };

  // Decide formatting from the original string
  const hasDecimal = /\./.test(numRaw);
  const decimals = hasDecimal
    ? Math.min(2, (numRaw.split(".")[1] ?? "").length)
    : 0;

  const prefix = (signRaw === "+" ? "+" : "") + (dollar ?? "");
  let suffix = unitRaw ?? "";
  // Normalise multiplication sign to ×
  if (/^[xX]$/.test(suffix)) suffix = "×";

  return {
    animatable: true,
    value: sign * num,
    prefix,
    suffix,
    decimals,
  };
}
