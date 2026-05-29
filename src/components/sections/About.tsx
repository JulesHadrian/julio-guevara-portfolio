"use client";

import { useTranslations } from "next-intl";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const facts = ["fact1", "fact2", "fact3", "fact4", "fact5", "fact6"] as const;

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { value: t("statValue1"), label: t("statLabel1") },
    { value: t("statValue2"), label: t("statLabel2") },
    { value: t("statValue3"), label: t("statLabel3") },
    { value: t("statValue4"), label: t("statLabel4") },
  ];

  return (
    <section
      id="about"
      className="px-6 py-28 border-t transition-colors duration-200"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>{t("label")}</SectionLabel>
        </Reveal>

        <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-16 items-start">

          {/* ── Left: headline + stats wall ───────────────────────────── */}
          <div>
            <Reveal>
              <h2
                className="font-bold leading-tight mb-12"
                style={{ fontSize: "clamp(26px, 3.2vw, 44px)", color: "var(--text-1)" }}
              >
                {t("headline1")}
                <br />
                <span style={{ color: "var(--accent)" }}>{t("headline2")}</span>
              </h2>
            </Reveal>

            {/* Stats wall — proof before the paragraphs */}
            <Stagger className="grid grid-cols-2 gap-x-8 gap-y-8">
              {stats.map(({ value, label }) => (
                <StaggerItem key={value}>
                  <AnimatedCounter
                    value={value}
                    className="block font-bold font-mono leading-none"
                    style={{ fontSize: "clamp(28px, 3vw, 40px)", color: "var(--accent)" }}
                  />
                  <p
                    className="text-xs font-mono uppercase tracking-widest mt-2 whitespace-pre-line"
                    style={{ color: "var(--text-3)", lineHeight: 1.6 }}
                  >
                    {label}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* ── Right: bio paragraphs + fact chips ────────────────────── */}
          <div className="pt-0 md:pt-2">
            <Stagger className="space-y-6">
              {(["p1", "p2", "p3"] as const).map((key) => (
                <StaggerItem key={key}>
                  <p style={{ color: "var(--text-2)", lineHeight: 1.8, fontSize: "0.9375rem" }}>
                    {t(key)}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>

            <Stagger className="flex flex-wrap gap-2 mt-8" stagger={0.05}>
              {facts.map((key) => (
                <StaggerItem key={key}>
                  <span
                    className="inline-flex items-center text-xs font-mono px-3 py-1.5 rounded-full border"
                    style={{
                      backgroundColor: "var(--surface)",
                      borderColor: "var(--border)",
                      color: "var(--text-3)",
                    }}
                  >
                    {t(key)}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

        </div>
      </div>
    </section>
  );
}
