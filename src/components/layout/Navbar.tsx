"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
  const locale = useLocale();
  const resumeUrl = locale === "es" ? siteConfig.resumeEs : siteConfig.resumeEn;
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    if (mobileOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
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
            {navLinks.map(({ key, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <a
                  key={key}
                  href={href}
                  className="nav-link text-sm relative pb-1 transition-colors duration-200"
                  style={{ color: isActive ? "var(--text-1)" : undefined }}
                >
                  {t(key)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-px rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            <a
              href={resumeUrl}
              download
              className="btn-outline hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg"
            >
              {t("downloadResume")}
              <Download size={12} />
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg border transition-colors duration-200 cursor-pointer theme-toggle"
              style={{ borderColor: "var(--border-strong)", backgroundColor: "var(--surface)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 md:hidden flex flex-col px-6 pt-20 pb-10"
            style={{ backgroundColor: "var(--bg)" }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <nav className="flex flex-col mt-4">
              {navLinks.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  className="py-4 text-xl font-semibold border-b transition-colors duration-200"
                  style={{
                    color: activeSection === href.slice(1) ? "var(--accent)" : "var(--text-2)",
                    borderColor: "var(--border)",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {t(key)}
                </a>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <a
                href={resumeUrl}
                download
                className="btn-outline w-full flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {t("downloadResume")}
                <Download size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
