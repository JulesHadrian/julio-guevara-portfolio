"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SkillTag from "@/components/ui/SkillTag";

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

function ImpactCard({ highlight, labels }: {
  highlight: Highlight;
  labels: { context: string; actions: string; tech: string; impact: string };
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered]   = useState(false);

  const borderColor = expanded
    ? "var(--accent)"
    : hovered
      ? "var(--border-strong)"
      : "var(--border)";

  return (
    <div
      className="rounded-xl border p-8 transition-colors duration-200 cursor-pointer relative overflow-hidden"
      style={{ backgroundColor: "var(--surface)", borderColor }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-200"
        style={{
          background: "linear-gradient(90deg, var(--accent), transparent)",
          opacity: expanded ? 1 : 0,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-bold font-mono" style={{ color: "var(--metric)" }}>
              {highlight.metric}
            </span>
            <span className="text-xs" style={{ color: "var(--metric-l)" }}>
              {highlight.metricLabel}
            </span>
          </div>
          <h3 className="font-semibold leading-snug mb-3" style={{ fontSize: "1.05rem", color: "var(--text-1)" }}>
            {highlight.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {highlight.tags.map((tag) => <SkillTag key={tag} accent>{tag}</SkillTag>)}
          </div>
        </div>
        <span
          className="mt-1 shrink-0 transition-transform duration-200"
          style={{
            color: "var(--text-4)",
            display: "inline-flex",
            transform: expanded ? "rotate(45deg)" : "rotate(0)",
          }}
        >
          <Plus size={18} />
        </span>
      </div>

      {/* Expandable */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="space-y-5 pt-5 border-t" style={{ borderColor: "var(--border)" }}>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>
                  {labels.context}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                  {highlight.context}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>
                  {labels.actions}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                  {highlight.actions}
                </p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>
                  {labels.tech}
                </p>
                <div className="flex flex-wrap gap-2">
                  {highlight.tech.map((item) => <SkillTag key={item}>{item}</SkillTag>)}
                </div>
              </div>
              <div
                className="rounded-lg p-4 border-l-2"
                style={{ backgroundColor: "var(--metric-bg)", borderLeftColor: "var(--metric)" }}
              >
                <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--metric-l)" }}>
                  {labels.impact}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--metric-t)" }}>
                  {highlight.impact}
                </p>
              </div>
            </div>
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

  return (
    <section id="impact" className="px-6 py-24 border-t transition-colors duration-200" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <SectionLabel>{t("label")}</SectionLabel>
          <h2 className="font-bold leading-tight mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: "var(--text-1)" }}>
            {t("headline")}
          </h2>
          <p className="max-w-2xl leading-relaxed" style={{ color: "var(--text-3)", fontSize: "1rem" }}>
            {t("intro")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {highlights.map((h, i) => (
            <ImpactCard key={i} highlight={h} labels={labels} />
          ))}
        </div>
      </div>
    </section>
  );
}
