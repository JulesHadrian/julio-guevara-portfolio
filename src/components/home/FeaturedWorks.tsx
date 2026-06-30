import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import WorksCarousel from "@/components/home/WorksCarousel";
import { featuredCaseStudies, toCardData } from "@/lib/caseStudies";
import { loadCaseStudyCopy } from "@/lib/loadCaseStudy";

export default async function FeaturedWorks() {
  const t = await getTranslations("home");
  const locale = await getLocale();

  const cards = await Promise.all(
    featuredCaseStudies.map(async (cs, i) => {
      const copy = await loadCaseStudyCopy(locale, cs);
      return toCardData(cs, copy, i + 1);
    })
  );

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <SectionLabel index="004">{t("worksLabel")}</SectionLabel>
        </Reveal>

        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <Reveal>
            <h2 className="font-display font-semibold tracking-[-0.02em]" style={{ fontSize: "clamp(30px, 4vw, 52px)", color: "var(--text-1)" }}>
              {t("worksTitle")}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <Link
              href={`/${locale}/archive`}
              className="group inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--accent-s)" }}
            >
              {t("worksCta")}
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <WorksCarousel
          cards={cards}
          locale={locale}
          cta={t("projectCta")}
          prevLabel={t("worksPrev")}
          nextLabel={t("worksNext")}
          dragHint={t("worksDrag")}
        />
      </div>
    </section>
  );
}
