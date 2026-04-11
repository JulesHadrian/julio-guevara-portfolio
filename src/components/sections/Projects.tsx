"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SkillTag from "@/components/ui/SkillTag";

interface Project {
  title: string;
  tags: string[];
  status?: string;
  statusLabel?: string;
  summary: string;
  context: string;
  actions: string;
  tech: string[];
  impact: string;
  metric: string;
  metricLabel: string;
  stat1: string;
  stat1Label: string;
  stat2: string;
  stat2Label: string;
}

// Status color sets — kept as hardcoded hex because they're semantic
// indicators that should look the same in both light and dark mode
const STATUS_PALETTE = {
  testing: { dot: "#F59E0B", label: "#D97706", accent: "#F59E0B", impactBg: "rgba(245,158,11,0.07)", impactBorder: "#F59E0B", impactLabel: "#B45309", impactText: "#92400E" },
  personal: { dot: "#A78BFA", label: "#7C3AED", accent: "#A78BFA", impactBg: "rgba(167,139,250,0.07)", impactBorder: "#A78BFA", impactLabel: "#6D28D9", impactText: "#4C1D95" },
  ready:    { dot: "#22D3EE", label: "#0E7490", accent: "#22D3EE", impactBg: "rgba(34,211,238,0.06)", impactBorder: "#22D3EE", impactLabel: "#0E7490", impactText: "#164E63" },
} as const;

type StatusKey = keyof typeof STATUS_PALETTE;

function StatusBadge({ status, statusLabel }: { status: string; statusLabel: string }) {
  const p = STATUS_PALETTE[status as StatusKey];
  if (!p) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: p.dot }} />
        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: p.dot }} />
      </span>
      <span className="text-xs font-mono uppercase tracking-widest" style={{ color: p.label }}>{statusLabel}</span>
    </div>
  );
}

function StatsRow({ project }: { project: Project }) {
  const hasStatus = !!project.status && project.status in STATUS_PALETTE;
  const p = project.status ? STATUS_PALETTE[project.status as StatusKey] : null;

  if (hasStatus && p) {
    return (
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <StatusBadge status={project.status!} statusLabel={project.statusLabel!} />
        <div className="w-px h-4 self-center" style={{ backgroundColor: "var(--border)" }} />
        <div>
          <p className="text-2xl font-bold font-mono" style={{ color: "var(--text-3)" }}>{project.stat1}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>{project.stat1Label}</p>
        </div>
        <div className="w-px h-4 self-center" style={{ backgroundColor: "var(--border)" }} />
        <div>
          <p className="text-2xl font-bold font-mono" style={{ color: p.dot }}>{project.stat2}</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>{project.stat2Label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 mb-6">
      <div>
        <p className="text-3xl font-bold font-mono" style={{ color: "var(--metric)" }}>{project.metric}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--metric-l)" }}>{project.metricLabel}</p>
      </div>
      <div className="w-px self-stretch" style={{ backgroundColor: "var(--border)" }} />
      <div>
        <p className="text-2xl font-bold font-mono" style={{ color: "var(--text-3)" }}>{project.stat1}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>{project.stat1Label}</p>
      </div>
      <div className="flex items-center" style={{ color: "var(--border-strong)" }}>→</div>
      <div>
        <p className="text-2xl font-bold font-mono" style={{ color: "var(--text-1)" }}>{project.stat2}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>{project.stat2Label}</p>
      </div>
    </div>
  );
}

function ProjectCard({ project, labels, expandLabel, collapseLabel }: {
  project: Project;
  labels: { context: string; actions: string; tech: string; impact: string };
  expandLabel: string;
  collapseLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered]   = useState(false);

  const p = project.status ? STATUS_PALETTE[project.status as StatusKey] : null;
  const accentColor = p ? p.accent : "var(--accent)";
  const gradientLine = p
    ? `linear-gradient(90deg, ${p.dot}, var(--accent), transparent)`
    : "linear-gradient(90deg, var(--accent), var(--metric), transparent)";

  const borderColor = expanded
    ? accentColor
    : hovered
      ? "var(--border-strong)"
      : "var(--border)";

  return (
    <div
      className="rounded-xl border transition-colors duration-200 overflow-hidden"
      style={{ backgroundColor: "var(--surface)", borderColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 transition-opacity duration-200"
        style={{ background: gradientLine, opacity: expanded ? 1 : 0.45 }}
      />

      <div className="p-8">
        <StatsRow project={project} />

        <h3 className="font-semibold leading-snug mb-4" style={{ fontSize: "1.1rem", color: "var(--text-1)" }}>
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => <SkillTag key={tag} accent={!p}>{tag}</SkillTag>)}
        </div>

        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-2)" }}>
          {project.summary}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-mono uppercase tracking-widest transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
          style={{ color: expanded ? "var(--accent-h)" : accentColor }}
        >
          <ChevronRight
            size={14}
            className="transition-transform duration-200"
            style={{ transform: expanded ? "rotate(90deg)" : "rotate(0)" }}
          />
          {expanded ? collapseLabel : expandLabel}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="space-y-5 mt-6 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>{labels.context}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{project.context}</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>{labels.actions}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{project.actions}</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>{labels.tech}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((item) => <SkillTag key={item}>{item}</SkillTag>)}
                  </div>
                </div>
                <div
                  className="rounded-lg p-4 border-l-2"
                  style={{
                    backgroundColor: p ? p.impactBg : "var(--metric-bg)",
                    borderLeftColor: p ? p.impactBorder : "var(--metric)",
                  }}
                >
                  <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: p ? p.impactLabel : "var(--metric-l)" }}>
                    {labels.impact}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: p ? p.impactText : "var(--metric-t)" }}>
                    {project.impact}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Projects() {
  const t = useTranslations("projects");
  const tImpact = useTranslations("impact");
  const items = t.raw("items") as Project[];

  const labels = {
    context: tImpact("contextLabel"),
    actions: tImpact("actionsLabel"),
    tech:    tImpact("techLabel"),
    impact:  tImpact("impactLabel"),
  };

  return (
    <section id="projects" className="px-6 py-24 border-t transition-colors duration-200" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionLabel>{t("label")}</SectionLabel>
        <h2 className="font-bold leading-tight mb-14" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: "var(--text-1)" }}>
          {t("headline")}
          <br />
          <span style={{ color: "var(--text-3)", fontSize: "0.85em" }}>{t("headlineSub")}</span>
        </h2>
        <div className="grid gap-6">
          {items.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              labels={labels}
              expandLabel={t("expandLabel")}
              collapseLabel={t("collapseLabel")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
