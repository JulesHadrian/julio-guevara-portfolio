"use client";

import { useTranslations, useLocale } from "next-intl";
import { siteConfig } from "@/lib/config";

const badges = ["badge1","badge2","badge3","badge4","badge5","badge6"] as const;

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const resumeUrl = locale === "es" ? siteConfig.resumeEs : siteConfig.resumeEn;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-grid) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.35,
        }}
      />
      {/* Accent glow */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Headline */}
        <h1
          className="font-bold leading-none tracking-tight mb-8"
          style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1.05, color: "var(--text-1)" }}
        >
          <span className="block">{t("line1")}</span>
          <span className="block" style={{ color: "var(--accent)" }}>{t("line2")}</span>
          <span className="block">{t("line3")}</span>
        </h1>

        {/* Subheadline */}
        <p
          className="mb-10 max-w-2xl leading-relaxed"
          style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--text-3)" }}
        >
          {t("subheadline")}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-14">
          <a
            href="#impact"
            className="btn-accent inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm"
          >
            {t("ctaPrimary")} →
          </a>
          <a
            href={resumeUrl}
            download
            className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm"
          >
            {t("ctaSecondary")} ↓
          </a>
        </div>

        {/* Badge strip */}
        <div className="flex flex-wrap gap-3">
          {badges.map((key) => (
            <span
              key={key}
              className="inline-flex items-center text-xs font-mono px-3 py-1.5 rounded-full border"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text-3)",
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
