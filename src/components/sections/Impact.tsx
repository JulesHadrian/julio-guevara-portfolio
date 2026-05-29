"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SkillTag from "@/components/ui/SkillTag";
import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

interface Highlight {
  title: string;
  tags: string[];
  context: string;
  actions: string;
  tech: string[];
  impact: string;
  metric: string;
  metricLabel: string;
}

function ImpactItem({
  highlight,
  labels,
  index,
}: {
  highlight: Highlight;
  labels: { context: string; actions: string; tech: string; impact: string };
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="border-t py-8 transition-colors duration-200"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Metric row — siempre ancho completo, sin columna lateral fija */}
      <div className="flex items-baseline gap-2.5 mb-5">
        <span
          className="text-xs font-mono shrink-0"
          style={{ color: "var(--text-4)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <AnimatedCounter
          value={highlight.metric}
          className="font-bold font-mono leading-none shrink-0"
          style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--accent)" }}
        />
        <span
          className="text-xs font-mono leading-snug"
          style={{ color: "var(--metric-l)" }}
        >
          {highlight.metricLabel}
        </span>
      </div>

      {/* Título + tags + botón expandir */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold leading-snug mb-3"
            style={{ fontSize: "1.05rem", color: "var(--text-1)" }}
          >
            {highlight.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {highlight.tags.map((tag) => (
              <SkillTag key={tag} accent>{tag}</SkillTag>
            ))}
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="shrink-0 mt-0.5 transition-all duration-200 cursor-pointer"
          style={{
            color: expanded ? "var(--accent)" : "var(--text-4)",
            transform: expanded ? "rotate(45deg)" : "rotate(0)",
          }}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Detalle expandible */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Stagger
              trigger="mount"
              className="space-y-5 mt-6 pt-6 border-t"
              style={{ borderColor: "var(--border)" }}
              stagger={0.07}
              delayChildren={0.1}
            >
              <StaggerItem distance={10}>
                <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>
                  {labels.context}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)", lineHeight: 1.75 }}>
                  {highlight.context}
                </p>
              </StaggerItem>
              <StaggerItem distance={10}>
                <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>
                  {labels.actions}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)", lineHeight: 1.75 }}>
                  {highlight.actions}
                </p>
              </StaggerItem>
              <StaggerItem distance={10}>
                <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>
                  {labels.tech}
                </p>
                <div className="flex flex-wrap gap-2">
                  {highlight.tech.map((item) => <SkillTag key={item}>{item}</SkillTag>)}
                </div>
              </StaggerItem>
              <StaggerItem
                distance={10}
                className="rounded-lg p-5 border-l-2"
                style={{ backgroundColor: "var(--metric-bg)", borderLeftColor: "var(--metric)" }}
              >
                <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--metric-l)" }}>
                  {labels.impact}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--metric-t)", lineHeight: 1.75 }}>
                  {highlight.impact}
                </p>
              </StaggerItem>
            </Stagger>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Impact() {
  const t = useTranslations("impact");
  const highlights = t.raw("highlights") as Highlight[];
  const labels = {
    context: t("contextLabel"),
    actions: t("actionsLabel"),
    tech:    t("techLabel"),
    impact:  t("impactLabel"),
  };

  const aggrStats = [
    { value: t("aggrStat1"), label: t("aggrStat1Label") },
    { value: t("aggrStat2"), label: t("aggrStat2Label") },
    { value: t("aggrStat3"), label: t("aggrStat3Label") },
  ];

  return (
    <section
      id="impact"
      className="px-6 py-28 border-t transition-colors duration-200"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ───────────────────────────────────────────── */}
        <Reveal>
          <SectionLabel>{t("label")}</SectionLabel>

          <div className="md:flex md:items-end md:justify-between gap-10 mb-4">
            <div>
              <h2
                className="font-bold leading-tight"
                style={{ fontSize: "clamp(28px, 3.8vw, 52px)", color: "var(--text-1)" }}
              >
                {t("headline")}
              </h2>
              <p
                className="max-w-2xl mt-4"
                style={{ color: "var(--text-3)", fontSize: "0.9375rem", lineHeight: 1.75 }}
              >
                {t("intro")}
              </p>
            </div>

            {/* Aggregate proof numbers */}
            <div className="flex flex-wrap gap-6 sm:gap-10 mt-8 md:mt-0 shrink-0">
              {aggrStats.map(({ value, label }, i) => (
                <div key={i}>
                  <AnimatedCounter
                    value={value}
                    className="block font-bold font-mono leading-none"
                    style={{ fontSize: "clamp(22px, 2.5vw, 32px)", color: "var(--metric)" }}
                  />
                  <p
                    className="text-xs mt-2 font-mono uppercase tracking-widest"
                    style={{ color: "var(--text-4)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Editorial numbered list ───────────────────────────────────── */}
        <div>
          {highlights.map((h, i) => (
            <Reveal key={i}>
              <ImpactItem highlight={h} labels={labels} index={i} />
            </Reveal>
          ))}
          {/* Bottom border */}
          <div className="border-t" style={{ borderColor: "var(--border)" }} />
        </div>

      </div>
    </section>
  );
}
