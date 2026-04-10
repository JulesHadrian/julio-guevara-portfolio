"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { key: "about",      href: "#about" },
  { key: "impact",     href: "#impact" },
  { key: "projects",   href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "skills",     href: "#skills" },
  { key: "contact",    href: "#contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <a
          href="#hero"
          className="text-sm font-semibold tracking-tight transition-colors duration-200"
          style={{ color: "var(--text-1)" }}
        >
          {siteConfig.nameShort}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-sm transition-colors duration-200"
              style={{
                color: activeSection === href.slice(1)
                  ? "var(--text-1)"
                  : "var(--text-3)",
              }}
            >
              {t(key)}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <a
            href={siteConfig.resumeEn}
            download
            className="btn-outline hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg"
          >
            {t("downloadResume")} ↓
          </a>
        </div>
      </div>
    </header>
  );
}
