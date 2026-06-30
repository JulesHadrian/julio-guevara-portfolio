"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * Persistent contact CTA pinned to the bottom-right corner. On desktop it's
 * always visible. On mobile it stays hidden over the homepage hero and fades in
 * once the user scrolls to the second section; on every other page it's visible.
 */
export default function ContactButton() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  const [shown, setShown] = useState(!isHome);

  useEffect(() => {
    const compute = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      // Desktop & non-home: always visible. Mobile homepage: reveal after the hero.
      const visible = !isMobile || !isHome || window.scrollY > window.innerHeight * 0.8;
      setShown((prev) => (prev === visible ? prev : visible));
    };
    const raf = requestAnimationFrame(compute);
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [isHome]);

  // Redundant on the contact page itself.
  if (pathname.includes("/contact")) return null;

  return (
    <Link
      href={`/${locale}/contact`}
      className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
      style={{
        backgroundColor: "var(--surface)",
        color: "var(--text-1)",
        border: "1px solid var(--border-strong)",
        boxShadow: "0 6px 24px -8px rgba(23,23,23,0.35)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(10px)",
        pointerEvents: shown ? "auto" : "none",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {t("contactMe")}
      <ArrowUpRight size={15} style={{ color: "var(--accent-s)" }} />
    </Link>
  );
}
