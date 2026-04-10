"use client";

import { useTranslations } from "next-intl";
import SectionLabel from "@/components/ui/SectionLabel";

const facts = [
  { key: "fact1", icon: "📍" },
  { key: "fact2", icon: "🌐" },
  { key: "fact3", icon: "⚡" },
  { key: "fact4", icon: "🛍️" },
  { key: "fact5", icon: "🔬" },
  { key: "fact6", icon: "👨‍💻" },
] as const;

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="px-6 py-24 border-t transition-colors duration-200" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionLabel>{t("label")}</SectionLabel>
            <h2
              className="font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: "var(--text-1)" }}
            >
              {t("headline1")}
              <br />
              <span style={{ color: "var(--accent)" }}>{t("headline2")}</span>
            </h2>
            <div className="flex flex-wrap gap-2 mt-8">
              {facts.map(({ key, icon }) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text-3)",
                  }}
                >
                  <span>{icon}</span>
                  {t(key)}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            {(["p1", "p2", "p3"] as const).map((key) => (
              <p key={key} className="leading-relaxed text-base" style={{ color: "var(--text-2)" }}>
                {t(key)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
