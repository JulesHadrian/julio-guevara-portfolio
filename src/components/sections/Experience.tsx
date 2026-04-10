"use client";

import { useTranslations } from "next-intl";
import SectionLabel from "@/components/ui/SectionLabel";

interface Role {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export default function Experience() {
  const t = useTranslations("experience");
  const roles = t.raw("roles") as Role[];

  return (
    <section id="experience" className="px-6 py-24 border-t transition-colors duration-200" style={{ borderColor: "var(--border)" }}>
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

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px hidden md:block" style={{ backgroundColor: "var(--border)" }} />

          <div className="space-y-12">
            {roles.map((role, i) => (
              <div key={i} className="md:pl-12 relative">
                {/* Dot */}
                <div
                  className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 hidden md:flex items-center justify-center"
                  style={{
                    backgroundColor: i === 0 ? "var(--accent)" : "var(--surface)",
                    borderColor:     i === 0 ? "var(--accent)" : "var(--border-strong)",
                  }}
                >
                  {i === 0 && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#fff" }} />}
                </div>

                <div
                  className="rounded-xl border p-7 transition-colors duration-200"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: i === 0 ? "var(--border-strong)" : "var(--border)",
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold" style={{ fontSize: "1rem", color: "var(--text-1)" }}>
                          {role.title}
                        </h3>
                        {i === 0 && (
                          <span
                            className="text-xs font-mono px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: "var(--accent-bg-s)", color: "var(--accent-h)" }}
                          >
                            {t("currentTag")}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>{role.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono" style={{ color: "var(--text-3)" }}>{role.period}</p>
                      <p className="text-xs" style={{ color: "var(--text-4)" }}>{role.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {role.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                        <span className="mt-2 shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
