"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = () => {
    const nextLocale = locale === "en" ? "es" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLocale", nextLocale);
    }
    startTransition(() => router.push(newPath));
  };

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      className="text-xs font-mono tracking-widest uppercase transition-colors duration-200 disabled:opacity-50 cursor-pointer theme-toggle"
      aria-label={`Switch to ${locale === "en" ? "Spanish" : "English"}`}
    >
      {t("switchLang")}
    </button>
  );
}
