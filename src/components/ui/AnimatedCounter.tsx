"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface Parsed {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  grouped: boolean;
}

/**
 * Splits a metric string into an animatable number plus its surrounding text.
 * Examples:
 *   "+140%"   -> prefix "+",  number 140,   suffix "%"
 *   "4+"      -> prefix "",   number 4,     suffix "+"
 *   "6,000"   -> prefix "",   number 6000,  suffix ""        (grouped)
 *   "< 8KB"   -> prefix "< ", number 8,     suffix "KB"
 *   "< 5 min" -> prefix "< ", number 5,     suffix " min"
 * Returns null for values with no leading number ("Core Web Vitals", "Zero", "A/B").
 */
function parseValue(raw: string): Parsed | null {
  const m = raw.match(/^(\D*?)(\d[\d.,]*)(.*)$/s);
  if (!m) return null;
  const [, prefix, numStr, suffix] = m;
  const grouped = numStr.includes(",");
  const clean = numStr.replace(/,/g, "");
  const dotIdx = clean.indexOf(".");
  const decimals = dotIdx === -1 ? 0 : clean.length - dotIdx - 1;
  const target = parseFloat(clean);
  if (Number.isNaN(target)) return null;
  return { prefix, suffix, target, decimals, grouped };
}

function format(n: number, decimals: number, grouped: boolean): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });
}

interface AnimatedCounterProps {
  value: string;
  className?: string;
  style?: React.CSSProperties;
  /** Count-up duration in seconds (default 1.4). */
  duration?: number;
}

/**
 * Counts a numeric metric up from zero when it scrolls into view — on-brand for
 * a CRO portfolio. Non-numeric values render statically. Honors reduced-motion.
 */
export default function AnimatedCounter({ value, className, style, duration = 1.4 }: AnimatedCounterProps) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  // Holds the count-up value while animating; null means "not yet animating".
  const [animated, setAnimated] = useState<string | null>(null);

  useEffect(() => {
    if (!parsed || !inView) return;
    // Reduced motion snaps straight to the target (duration 0) via onUpdate —
    // no synchronous setState in the effect body, and no count-up animation.
    const controls = animate(0, parsed.target, {
      duration: reduce ? 0 : duration,
      ease: EASE_OUT,
      onUpdate: (v) => setAnimated(format(v, parsed.decimals, parsed.grouped)),
    });
    return () => controls.stop();
  }, [inView, reduce, parsed, duration]);

  if (!parsed) {
    return (
      <span ref={ref} className={className} style={style}>
        {value}
      </span>
    );
  }

  // Render zero until the animation begins. `display` does NOT branch on
  // `reduce` — SSR (reduce=false) and the first client render must agree, or
  // reduced-motion users hit a hydration mismatch. The effect above handles
  // the reduced case after mount.
  const display = animated ?? format(0, parsed.decimals, parsed.grouped);

  return (
    <span ref={ref} className={className} style={style}>
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  );
}
