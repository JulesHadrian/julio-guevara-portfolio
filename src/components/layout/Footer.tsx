"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/config";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer
      className="border-t py-10 px-6 transition-colors duration-200"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: "var(--text-3)" }}>
          {siteConfig.name} · {siteConfig.location} ·{" "}
          <span style={{ color: "var(--text-4)" }}>{t("built")}</span>
        </p>
        <div className="flex items-center gap-5">
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 theme-toggle"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 theme-toggle"
          >
            GitHub
          </a>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}
