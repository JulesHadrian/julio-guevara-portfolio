"use client";

import { useTranslations } from "next-intl";
import { GraduationCap } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Education() {
  const t = useTranslations("education");

  return (
    <section
      id="education"
      className="px-6 py-20 border-t transition-colors duration-200"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionLabel>{t("label")}</SectionLabel>
        <div
          className="rounded-xl border p-8 max-w-xl transition-colors duration-200"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-start gap-5">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border"
              style={{ backgroundColor: "var(--accent-bg-s)", borderColor: "var(--border-strong)" }}
            >
              <GraduationCap size={22} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <h3 className="font-semibold mb-1" style={{ fontSize: "1rem", color: "var(--text-1)" }}>
                {t("degree")}
              </h3>
              <p className="text-sm mb-2.5" style={{ color: "var(--accent)" }}>
                {t("institution")}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="text-xs font-mono" style={{ color: "var(--text-3)" }}>{t("period")}</span>
                <span className="text-xs" style={{ color: "var(--text-4)" }}>{t("location")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
