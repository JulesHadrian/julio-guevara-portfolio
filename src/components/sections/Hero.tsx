"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { EASE_OUT } from "@/lib/motion";
import Spotlight from "@/components/ui/Spotlight";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const badges = ["badge1", "badge2", "badge3", "badge4", "badge5", "badge6"] as const;

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const resumeUrl = locale === "es" ? siteConfig.resumeEs : siteConfig.resumeEn;
  const reduce = useReducedMotion();

  const kpis = [
    { value: t("kpi1"), label: t("kpi1Label"), color: "var(--metric)" },
    { value: t("kpi2"), label: t("kpi2Label"), color: "var(--text-1)" },
    { value: t("kpi3"), label: t("kpi3Label"), color: "var(--text-1)" },
  ] as const;

  // Predictable, ordered entrance: each block rises in on a small incremental delay.
  // `initial` is reduce-independent so the server render (reduce=false) matches the
  // client's first render for reduced-motion users; reduce only zeroes the timing.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.55, ease: EASE_OUT, delay: reduce ? 0 : delay },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 overflow-hidden"
    >
      {/* Ambient spotlight + aurora + dot grid */}
      <Spotlight />

      {/* Watermark — editorial decorative text, desktop only */}
      <div
        className="absolute pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
        style={{
          right: "-1%",
          top: "50%",
          transform: "translateY(-52%)",
          fontSize: "clamp(200px, 26vw, 380px)",
          fontWeight: 900,
          lineHeight: 1,
          color: "var(--accent)",
          opacity: 0.04,
          letterSpacing: "-0.06em",
          fontFamily: "var(--font-geist-sans), sans-serif",
        }}
      >
        CRO
      </div>

      <div className="relative max-w-6xl mx-auto w-full">

        {/* ── Availability pill ───────────────────────────────────────── */}
        <motion.div
          {...rise(0)}
          className="inline-flex items-center gap-2.5 mb-12 px-4 py-2 rounded-full border"
          style={{
            backgroundColor: "var(--metric-bg)",
            borderColor: "var(--metric-border)",
            color: "var(--metric-l)",
          }}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
              style={{ backgroundColor: "var(--metric)" }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: "var(--metric)" }}
            />
          </span>
          <span className="text-xs font-mono tracking-wide">{t("available")}</span>
        </motion.div>

        {/* ── Headline — dramatic 3-tier hierarchy, line-by-line reveal ── */}
        <h1 className="font-bold leading-none tracking-tight mb-8">
          <motion.span
            {...rise(0.08)}
            className="block mb-2"
            style={{
              fontSize: "clamp(16px, 2.2vw, 28px)",
              color: "var(--text-3)",
              letterSpacing: "0.05em",
              fontWeight: 500,
            }}
          >
            {t("line1")}
          </motion.span>
          <motion.span
            {...rise(0.16)}
            className="block"
            style={{ fontSize: "clamp(56px, 9.5vw, 116px)", color: "var(--accent)", lineHeight: 0.95 }}
          >
            {t("line2")}
          </motion.span>
          <motion.span
            {...rise(0.24)}
            className="block"
            style={{ fontSize: "clamp(56px, 9.5vw, 116px)", color: "var(--text-1)", lineHeight: 0.95 }}
          >
            {t("line3")}
          </motion.span>
        </h1>

        {/* ── Subheadline ─────────────────────────────────────────────── */}
        <motion.p
          {...rise(0.34)}
          className="mb-0 max-w-2xl"
          style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: "var(--text-3)", lineHeight: 1.75 }}
        >
          {t("subheadline")}
        </motion.p>

        {/* ── KPI strip — animated count-up ───────────────────────────── */}
        <motion.div
          {...rise(0.42)}
          className="flex flex-wrap gap-8 sm:gap-14 py-8 my-8 border-y"
          style={{ borderColor: "var(--border)" }}
        >
          {kpis.map(({ value, label, color }, i) => (
            <div key={i}>
              <AnimatedCounter
                value={value}
                className="block font-bold font-mono leading-none"
                style={{ fontSize: "clamp(26px, 3.5vw, 40px)", color }}
              />
              <p
                className="text-xs mt-2 font-mono uppercase tracking-widest"
                style={{ color: "var(--text-4)" }}
              >
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── CTAs ────────────────────────────────────────────────────── */}
        <motion.div {...rise(0.5)} className="flex flex-wrap gap-4 mb-12">
          <a
            href="#impact"
            className="btn-accent inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm"
          >
            {t("ctaPrimary")} →
          </a>
          <a
            href={resumeUrl}
            download
            className="btn-outline inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold"
          >
            {t("ctaSecondary")} ↓
          </a>
        </motion.div>

        {/* ── Badge strip ─────────────────────────────────────────────── */}
        <motion.div {...rise(0.58)} className="flex flex-wrap gap-2">
          {badges.map((key) => (
            <span
              key={key}
              className="inline-flex items-center text-xs font-mono px-3 py-1.5 rounded-full border"
              style={{ backgroundColor: "transparent", borderColor: "var(--border)", color: "var(--text-4)" }}
            >
              {t(key)}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
