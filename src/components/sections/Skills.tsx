"use client";

import { useTranslations } from "next-intl";
import SectionLabel from "@/components/ui/SectionLabel";
import SkillTag from "@/components/ui/SkillTag";

interface SkillCategory { name: string; items: string[]; }

const PRIMARY_CATEGORIES = 2;

export default function Skills() {
  const t = useTranslations("skills");
  const categories = t.raw("categories") as SkillCategory[];

  return (
    <section
      id="skills"
      className="px-6 py-28 border-t transition-colors duration-200"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel>{t("label")}</SectionLabel>
        <h2
          className="font-bold leading-tight mb-12"
          style={{ fontSize: "clamp(28px, 3.8vw, 52px)", color: "var(--text-1)" }}
        >
          {t("headline")}
          <br />
          <span style={{ color: "var(--text-3)", fontSize: "0.8em", fontWeight: 500 }}>
            {t("headlineSub")}
          </span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => {
            const isPrimary = i < PRIMARY_CATEGORIES;
            return (
              <div
                key={i}
                className="rounded-xl border p-6 transition-colors duration-200"
                style={{
                  backgroundColor: isPrimary ? "var(--surface-2)" : "var(--surface)",
                  borderColor: isPrimary ? "var(--border-strong)" : "var(--border)",
                }}
              >
                <p
                  className="text-xs font-mono uppercase tracking-widest mb-4"
                  style={{ color: isPrimary ? "var(--accent)" : "var(--text-4)" }}
                >
                  {cat.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <SkillTag key={item} accent={isPrimary}>{item}</SkillTag>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
