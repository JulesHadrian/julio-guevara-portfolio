import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/motion/RevealText";
import SkillTag from "@/components/ui/SkillTag";
import MetricCard from "@/components/ui/MetricCard";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import { loadCaseStudyCopy } from "@/lib/loadCaseStudy";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const copy = await loadCaseStudyCopy(locale, cs);
  return {
    title: copy.title,
    description: copy.summary ?? copy.context.slice(0, 160),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const locale = await getLocale();
  const t = await getTranslations("caseStudy");
  const tn = await getTranslations("nav");
  const copy = await loadCaseStudyCopy(locale, cs);

  // Next case study (wraps around the archive order)
  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const nextCopy = await loadCaseStudyCopy(locale, next);

  const base = `/${locale}`;
  const meta = [
    { label: t("metaType"), value: cs.type },
    { label: t("metaYear"), value: cs.year },
    { label: t("metaRole"), value: t(`roles.${cs.role}`) },
  ];

  const stats = [
    copy.stat1 ? { value: copy.stat1, label: copy.stat1Label ?? "" } : null,
    copy.stat2 ? { value: copy.stat2, label: copy.stat2Label ?? "" } : null,
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <article className="px-6 lg:px-10 pt-32 pb-24 lg:pt-40">
      <div className="max-w-[900px] mx-auto">
        {/* Breadcrumbs: the Archive crumb is the way back */}
        <Reveal>
          <nav aria-label={t("breadcrumb")} className="mb-12">
            <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm font-mono">
              <li>
                <Link href={base} className="link-muted">{tn("home")}</Link>
              </li>
              <li aria-hidden="true" style={{ color: "var(--border-strong)" }}>/</li>
              <li>
                <Link href={`${base}/archive`} className="link-muted">{tn("archive")}</Link>
              </li>
              <li aria-hidden="true" style={{ color: "var(--border-strong)" }}>/</li>
              <li aria-current="page" className="truncate max-w-[34ch]" style={{ color: "var(--text-2)" }}>
                {copy.title}
              </li>
            </ol>
          </nav>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.04}>
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest mb-6" style={{ color: "var(--text-3)" }}>
            <span style={{ color: "var(--accent-s)" }}>{cs.type}</span>
            <span style={{ color: "var(--border-strong)" }}>/</span>
            <span>{cs.year}</span>
            {copy.statusLabel && (
              <>
                <span style={{ color: "var(--border-strong)" }}>/</span>
                <span style={{ color: "var(--status-testing)" }}>{copy.statusLabel}</span>
              </>
            )}
          </div>
        </Reveal>
        <h1 className="font-display font-semibold tracking-[-0.03em] mb-6" style={{ fontSize: "clamp(34px, 5.5vw, 64px)", lineHeight: 1.0, color: "var(--text-1)" }}>
          <RevealText text={copy.title} by="word" delay={0.06} />
        </h1>
        <Reveal delay={0.1}>
          <p className="leading-relaxed mb-10" style={{ fontSize: "clamp(17px, 1.5vw, 21px)", color: "var(--text-2)" }}>
            {copy.summary ?? copy.context}
          </p>
        </Reveal>

        {/* Meta grid */}
        <Reveal delay={0.12}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border mb-16" style={{ borderColor: "var(--border)", backgroundColor: "var(--border)" }}>
            {meta.map((m) => (
              <div key={m.label} className="p-5" style={{ backgroundColor: "var(--card)" }}>
                <p className="text-[11px] font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>{m.label}</p>
                <p className="text-sm font-medium" style={{ color: "var(--text-1)" }}>{m.value}</p>
              </div>
            ))}
            <div className="p-5" style={{ backgroundColor: "var(--card)" }}>
              <p className="text-[11px] font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>{t("metaResult")}</p>
              <p className="text-sm font-semibold" style={{ color: "var(--metric)" }}>{copy.metric}</p>
            </div>
          </div>
        </Reveal>

        {/* Body */}
        <div className="space-y-14">
          <Block index="01" label={t("contextLabel")} text={copy.context} />
          <Block index="02" label={t("actionsLabel")} text={copy.actions} />

          {/* Stack */}
          <Reveal>
            <BlockLabel index="03" label={t("techLabel")} />
            <div className="flex flex-wrap gap-2">
              {copy.tech.map((tech) => (
                <SkillTag key={tech} variant="tech">{tech}</SkillTag>
              ))}
            </div>
          </Reveal>

          {/* Result */}
          <Block index="04" label={t("impactLabel")} text={copy.impact} accent />

          {stats.length > 0 && (
            <Reveal>
              <div className="grid sm:grid-cols-2 gap-4">
                {stats.map((s) => (
                  <MetricCard key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {/* Next project */}
      <div className="max-w-[900px] mx-auto mt-24 pt-12 border-t" style={{ borderColor: "var(--border)" }}>
        <Link href={`${base}/archive/${next.slug}`} className="group block" data-cursor={t("viewCursor")}>
          <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-4)" }}>
            {t("nextProject")}
          </p>
          <div className="flex items-center justify-between gap-6">
            <span className="font-display font-semibold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent-s)]" style={{ fontSize: "clamp(24px, 3.4vw, 42px)", lineHeight: 1.05, color: "var(--text-1)" }}>
              {nextCopy.title}
            </span>
            <ArrowUpRight className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "var(--accent-s)", width: 32, height: 32 }} />
          </div>
        </Link>
      </div>
    </article>
  );
}

/**
 * Body block header: "01 / CONTEXT ————". The index carries the reading order
 * of the four blocks, which is why it replaced the decorative marker.
 */
function BlockLabel({ index, label, accent = false }: { index: string; label: string; accent?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="shrink-0 text-xs font-mono tracking-[0.2em]" style={{ color: "var(--text-4)" }}>
        {index} /
      </span>
      <span className="shrink-0 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: accent ? "var(--accent-s)" : "var(--text-3)" }}>
        {label}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: accent ? "var(--border-strong)" : "var(--border)" }} />
    </div>
  );
}

function Block({ index, label, text, accent = false }: { index: string; label: string; text: string; accent?: boolean }) {
  return (
    <Reveal>
      <BlockLabel index={index} label={label} accent={accent} />
      <p className="leading-relaxed" style={{ fontSize: "17px", color: "var(--text-2)" }}>
        {text}
      </p>
    </Reveal>
  );
}
