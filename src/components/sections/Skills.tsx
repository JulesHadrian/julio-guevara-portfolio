"use client";

import { useTranslations } from "next-intl";
import SectionLabel from "@/components/ui/SectionLabel";
import SkillTag from "@/components/ui/SkillTag";

interface SkillCategory { name: string; items: string[]; }

const categoryAccents = [false, false, true, false, false, false, true, false];

export default function Skills() {
  const t = useTranslations("skills");
  const categories = t.raw("categories") as SkillCategory[];

  return (
    <section id="skills" className="px-6 py-24 border-t transition-colors duration-200" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel>{t("label")}</SectionLabel>
        <h2
          className="font-bold leading-tight mb-14"
          style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: "var(--text-1)" }}
        >
          {t("headline")}
          <br />
          <span style={{ color: "var(--text-3)", fontSize: "0.85em" }}>{t("headlineSub")}</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="rounded-xl border p-6 transition-colors duration-200"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: categoryAccents[i] ? "var(--border-strong)" : "var(--border)",
              }}
            >
              <p
                className="text-xs font-mono uppercase tracking-widest mb-4"
                style={{ color: categoryAccents[i] ? "var(--accent)" : "var(--text-4)" }}
              >
                {cat.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <SkillTag key={item} accent={categoryAccents[i]}>{item}</SkillTag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
