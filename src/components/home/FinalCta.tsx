import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import MetricCard from "@/components/ui/MetricCard";
import { siteConfig } from "@/lib/config";

export default async function FinalCta() {
  const t = await getTranslations("home");
  const ti = await getTranslations("impact");
  const locale = await getLocale();
  const base = `/${locale}`;

  const stats = [
    { value: ti("aggrStat1"), label: ti("aggrStat1Label") },
    { value: ti("aggrStat2"), label: ti("aggrStat2Label") },
    { value: ti("aggrStat3"), label: ti("aggrStat3Label") },
  ];

  return (
    <section className="px-6 lg:px-10 pb-24 lg:pb-32">
      <div className="max-w-[1200px] mx-auto">
        <div className="rounded-3xl border p-8 sm:p-12 lg:p-16" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <p className="text-xs font-mono uppercase tracking-[0.2em] mb-6" style={{ color: "var(--accent-s)" }}>
                  {t("finalCtaLabel")}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-display font-semibold tracking-[-0.02em] mb-5" style={{ fontSize: "clamp(28px, 3.6vw, 46px)", lineHeight: 1.05, color: "var(--text-1)" }}>
                  {t("finalCtaTitle")}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="leading-relaxed mb-8 max-w-md" style={{ color: "var(--text-3)" }}>
                  {t("finalCtaText")}
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="flex flex-wrap gap-3">
                  <Link href={`${base}/contact`} className="btn-accent inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm">
                    {t("finalCtaPrimary")}
                    <ArrowUpRight size={16} />
                  </Link>
                  <a href={`mailto:${siteConfig.email}`} className="btn-outline inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm">
                    <Mail size={15} />
                    {siteConfig.email}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
                {stats.map((s) => (
                  <MetricCard key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
