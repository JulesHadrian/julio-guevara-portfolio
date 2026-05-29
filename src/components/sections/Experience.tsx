"use client";

import { useTranslations } from "next-intl";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";

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
    <section
      id="experience"
      className="px-6 py-28 border-t transition-colors duration-200"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
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
        </Reveal>

        <div>
          {roles.map((role, i) => (
            <Reveal
              key={i}
              className="border-t py-10 md:grid md:gap-10"
              style={{
                borderColor: "var(--border)",
                gridTemplateColumns: "200px 1fr",
              }}
            >
              {/* Period + location */}
              <div className="mb-4 md:mb-0 pt-0.5">
                <p
                  className="text-xs font-mono leading-relaxed"
                  style={{ color: "var(--text-3)" }}
                >
                  {role.period}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-4)" }}
                >
                  {role.location}
                </p>
              </div>

              {/* Role content */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3
                    className="font-semibold"
                    style={{ fontSize: "1rem", color: "var(--text-1)" }}
                  >
                    {role.title}
                  </h3>
                  {i === 0 && (
                    <span
                      className="text-xs font-mono px-2.5 py-0.5 rounded-full border"
                      style={{
                        color: "var(--accent)",
                        borderColor: "var(--accent-bg-m)",
                        backgroundColor: "var(--accent-bg)",
                      }}
                    >
                      {t("currentTag")}
                    </span>
                  )}
                </div>
                <p
                  className="text-sm font-semibold mb-5"
                  style={{ color: "var(--accent)" }}
                >
                  {role.company}
                </p>
                <ul className="space-y-2.5">
                  {role.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-sm"
                      style={{ color: "var(--text-2)", lineHeight: 1.7 }}
                    >
                      <span
                        className="shrink-0 mt-[7px]"
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "1px",
                          backgroundColor: i === 0 ? "var(--accent)" : "var(--border-strong)",
                          display: "block",
                          transform: "rotate(45deg)",
                          flexShrink: 0,
                        }}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          {/* Bottom border */}
          <div className="border-t" style={{ borderColor: "var(--border)" }} />
        </div>
      </div>
    </section>
  );
}
