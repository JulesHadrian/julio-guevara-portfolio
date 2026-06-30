import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/motion/RevealText";
import SectionLabel from "@/components/ui/SectionLabel";
import ArchiveGrid, { type ArchiveItem } from "@/components/archive/ArchiveGrid";
import { caseStudies, caseStudyTypes, toCardData } from "@/lib/caseStudies";
import { loadCaseStudyCopy } from "@/lib/loadCaseStudy";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("archive");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ArchivePage() {
  const t = await getTranslations("archive");
  const locale = await getLocale();

  const items: ArchiveItem[] = await Promise.all(
    caseStudies.map(async (cs, i) => {
      const copy = await loadCaseStudyCopy(locale, cs);
      return { type: cs.type, data: toCardData(cs, copy, i + 1) };
    })
  );

  return (
    <section className="px-6 lg:px-10 pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <SectionLabel index="003">{t("label")}</SectionLabel>
        </Reveal>
        <h1 className="font-display font-semibold tracking-[-0.03em] mb-5" style={{ fontSize: "clamp(40px, 7vw, 84px)", lineHeight: 0.98, color: "var(--text-1)" }}>
          <RevealText text={t("title")} by="word" delay={0.05} />
        </h1>
        <Reveal delay={0.05}>
          <p className="max-w-2xl leading-relaxed mb-3" style={{ fontSize: "clamp(16px, 1.4vw, 19px)", color: "var(--text-3)" }}>
            {t("intro")}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-xs font-mono uppercase tracking-widest mb-14" style={{ color: "var(--text-4)" }}>
            {t("count", { count: items.length })}
          </p>
        </Reveal>

        <ArchiveGrid
          items={items}
          types={caseStudyTypes}
          locale={locale}
          cta={t("projectCta")}
          allLabel={t("allFilter")}
          viewLabel={t("viewCursor")}
        />
      </div>
    </section>
  );
}
