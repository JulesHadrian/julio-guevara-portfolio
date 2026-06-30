"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface MetricCardProps {
  value: string;
  label: string;
  /** Optional context line: period, project or disclaimer. */
  context?: string;
  /** Render on a dark contrast surface. */
  dark?: boolean;
}

/**
 * KPI surface — animated value, label and optional context. Used in the hero,
 * impact strip and final CTA. Honors reduced-motion via AnimatedCounter.
 */
export default function MetricCard({ value, label, context, dark = false }: MetricCardProps) {
  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{
        backgroundColor: dark ? "var(--dark-surface)" : "var(--card)",
        borderColor: dark ? "var(--dark-border)" : "var(--border)",
      }}
    >
      <AnimatedCounter
        value={value}
        className="block font-display font-semibold leading-none"
        style={{ fontSize: "clamp(32px, 4vw, 44px)", color: "var(--metric)" }}
      />
      <p
        className="mt-3 text-sm font-medium"
        style={{ color: dark ? "var(--dark-text-1)" : "var(--text-1)" }}
      >
        {label}
      </p>
      {context && (
        <p
          className="mt-1 text-xs font-mono tracking-wide"
          style={{ color: dark ? "var(--dark-text-3)" : "var(--text-4)" }}
        >
          {context}
        </p>
      )}
    </div>
  );
}
