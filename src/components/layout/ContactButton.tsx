"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

/** Persistent contact CTA pinned to the bottom-right corner of the viewport. */
export default function ContactButton() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  // Redundant on the contact page itself.
  if (pathname.includes("/contact")) return null;

  return (
    <Link
      href={`/${locale}/contact`}
      className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        backgroundColor: "var(--surface)",
        color: "var(--text-1)",
        border: "1px solid var(--border-strong)",
        boxShadow: "0 6px 24px -8px rgba(23,23,23,0.35)",
      }}
    >
      {t("contactMe")}
      <ArrowUpRight size={15} style={{ color: "var(--accent-s)" }} />
    </Link>
  );
}
