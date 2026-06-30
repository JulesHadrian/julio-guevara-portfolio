"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const navItems = [
  { key: "home",      num: "001", path: "" },
  { key: "manifesto", num: "002", path: "/manifesto" },
  { key: "archive",   num: "003", path: "/archive" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const base = `/${locale}`;
  const isActive = (path: string) => {
    const full = `${base}${path}`;
    return path === "" ? pathname === base || pathname === `${base}/` : pathname.startsWith(full);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          backdropFilter: scrolled ? "blur(14px)" : "none",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href={base} className="font-display text-sm font-semibold tracking-tight" style={{ color: "var(--text-1)" }}>
            Julio Guevara<span style={{ color: "var(--accent-s)" }}>.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(({ key, num, path }) => {
              const active = isActive(path);
              return (
                <Link
                  key={key}
                  href={`${base}${path}`}
                  className="group relative flex items-baseline gap-1.5 text-sm"
                  style={{ color: active ? "var(--text-1)" : "var(--text-3)" }}
                >
                  <span className="text-[10px] font-mono" style={{ color: "var(--text-4)" }}>{num}</span>
                  <span className="transition-colors duration-200 group-hover:text-[var(--text-1)]">{t(key)}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-1.5 h-px"
                      style={{ backgroundColor: "var(--accent)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg border link-muted cursor-pointer"
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

      {/* Mobile drawer */}
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
              {navItems.map(({ key, num, path }) => (
                <Link
                  key={key}
                  href={`${base}${path}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-baseline gap-3 py-4 text-2xl font-display font-semibold border-b"
                  style={{
                    color: isActive(path) ? "var(--accent-s)" : "var(--text-1)",
                    borderColor: "var(--border)",
                  }}
                >
                  <span className="text-xs font-mono" style={{ color: "var(--text-4)" }}>{num}</span>
                  {t(key)}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <Link
                href={`${base}/contact`}
                onClick={() => setMobileOpen(false)}
                className="btn-outline w-full flex items-center justify-center gap-2 text-sm px-4 py-3.5 rounded-lg"
              >
                {t("contactMe")}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
