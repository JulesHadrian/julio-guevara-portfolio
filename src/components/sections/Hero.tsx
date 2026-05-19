"use client";

import { useTranslations, useLocale } from "next-intl";
import { siteConfig } from "@/lib/config";

const badges = ["badge1","badge2","badge3","badge4","badge5","badge6"] as const;

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const resumeUrl = locale === "es" ? siteConfig.resumeEs : siteConfig.resumeEn;

  const kpis = [
    { value: t("kpi1"), label: t("kpi1Label"), color: "var(--metric)" },
    { value: t("kpi2"), label: t("kpi2Label"), color: "var(--text-1)" },
    { value: t("kpi3"), label: t("kpi3Label"), color: "var(--text-1)" },
  ] as const;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 overflow-hidden"
    >
      {/* Dot grid — subtle warm */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-grid) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />

      {/* Amber glow — top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "0",
          left: "-10%",
          width: "70vw",
          height: "70vh",
          background: "radial-gradient(ellipse at top left, var(--accent-glow) 0%, transparent 60%)",
          opacity: 0.6,
        }}
      />

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
        <div
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
        </div>

        {/* ── Headline — dramatic 3-tier hierarchy ────────────────────── */}
        <h1 className="font-bold leading-none tracking-tight mb-8">
          {/* Lead-in: small, muted */}
          <span
            className="block mb-2"
            style={{
              fontSize: "clamp(16px, 2.2vw, 28px)",
              color: "var(--text-3)",
              letterSpacing: "0.05em",
              fontWeight: 500,
            }}
          >
            {t("line1")}
          </span>
          {/* Primary: huge amber */}
          <span
            className="block"
            style={{
              fontSize: "clamp(56px, 9.5vw, 116px)",
              color: "var(--accent)",
              lineHeight: 0.95,
            }}
          >
            {t("line2")}
          </span>
          {/* Secondary: huge cream */}
          <span
            className="block"
            style={{
              fontSize: "clamp(56px, 9.5vw, 116px)",
              color: "var(--text-1)",
              lineHeight: 0.95,
            }}
          >
            {t("line3")}
          </span>
        </h1>

        {/* ── Subheadline ─────────────────────────────────────────────── */}
        <p
          className="mb-0 max-w-2xl leading-relaxed"
          style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: "var(--text-3)", lineHeight: 1.75 }}
        >
          {t("subheadline")}
        </p>

        {/* ── KPI strip ───────────────────────────────────────────────── */}
        <div
          className="flex flex-wrap gap-8 sm:gap-14 py-8 my-8 border-y"
          style={{ borderColor: "var(--border)" }}
        >
          {kpis.map(({ value, label, color }, i) => (
            <div key={i}>
              <p
                className="font-bold font-mono leading-none"
                style={{ fontSize: "clamp(26px, 3.5vw, 40px)", color }}
              >
                {value}
              </p>
              <p
                className="text-xs mt-2 font-mono uppercase tracking-widest"
                style={{ color: "var(--text-4)" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── CTAs ────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-4 mb-12">
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
        </div>

        {/* ── Badge strip ─────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2">
          {badges.map((key) => (
            <span
              key={key}
              className="inline-flex items-center text-xs font-mono px-3 py-1.5 rounded-full border"
              style={{
                backgroundColor: "transparent",
                borderColor: "var(--border)",
                color: "var(--text-4)",
              }}
            >
              {t(key)}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
