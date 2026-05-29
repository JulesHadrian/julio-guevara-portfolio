"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SkillTag from "@/components/ui/SkillTag";
import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

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

const STATUS_PALETTE = {
  testing: {
    dot: "#F59E0B", label: "#D97706",
    impactBg: "rgba(245,158,11,0.06)", impactBorder: "#F59E0B",
    impactLabel: "#B45309", impactText: "#92400E",
  },
  personal: {
    dot: "var(--personal-dot)", label: "var(--personal-label)",
    impactBg: "var(--personal-impact-bg)", impactBorder: "var(--personal-impact-border)",
    impactLabel: "var(--personal-impact-label)", impactText: "var(--personal-impact-text)",
  },
  ready: {
    dot: "var(--ready-dot)", label: "var(--ready-label)",
    impactBg: "var(--ready-impact-bg)", impactBorder: "var(--ready-impact-border)",
    impactLabel: "var(--ready-impact-label)", impactText: "var(--ready-impact-text)",
  },
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
      <div className="flex flex-wrap items-center gap-4 mb-5">
        <StatusBadge status={project.status!} statusLabel={project.statusLabel!} />
        <div className="w-px h-4 self-center" style={{ backgroundColor: "var(--border)" }} />
        <div>
          <AnimatedCounter value={project.stat1} className="block text-xl font-bold font-mono" style={{ color: "var(--text-3)" }} />
          <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>{project.stat1Label}</p>
        </div>
        <div className="w-px h-4 self-center" style={{ backgroundColor: "var(--border)" }} />
        <div>
          <AnimatedCounter value={project.stat2} className="block text-xl font-bold font-mono" style={{ color: p.dot }} />
          <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>{project.stat2Label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 mb-5">
      <div>
        <AnimatedCounter value={project.metric} className="block text-2xl font-bold font-mono" style={{ color: "var(--metric)" }} />
        <p className="text-xs mt-0.5" style={{ color: "var(--metric-l)" }}>{project.metricLabel}</p>
      </div>
      <div className="w-px self-stretch" style={{ backgroundColor: "var(--border)" }} />
      <div>
        <AnimatedCounter value={project.stat1} className="block text-xl font-bold font-mono" style={{ color: "var(--text-3)" }} />
        <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>{project.stat1Label}</p>
      </div>
      <span style={{ color: "var(--border-strong)", display: "flex", alignItems: "center" }}>→</span>
      <div>
        <AnimatedCounter value={project.stat2} className="block text-xl font-bold font-mono" style={{ color: "var(--text-1)" }} />
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
  const accentColor = p ? p.dot : "var(--accent)";
  const topLine = p
    ? `linear-gradient(90deg, ${p.dot}, transparent)`
    : "linear-gradient(90deg, var(--accent), var(--metric), transparent)";

  return (
    <div
      className="card-glow rounded-xl border overflow-hidden"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: expanded ? accentColor : hovered ? "var(--border-strong)" : "var(--border)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div
        className="h-px transition-opacity duration-200"
        style={{ background: topLine, opacity: expanded || hovered ? 1 : 0.4 }}
      />

      <div className="p-7">
        <StatsRow project={project} />

        <h3 className="font-semibold leading-snug mb-4" style={{ fontSize: "1rem", color: "var(--text-1)" }}>
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => <SkillTag key={tag} accent={!p}>{tag}</SkillTag>)}
        </div>

        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-2)", lineHeight: 1.7 }}>
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
              <Stagger
                trigger="mount"
                className="space-y-5 mt-6 pt-6 border-t"
                style={{ borderColor: "var(--border)" }}
                stagger={0.07}
                delayChildren={0.1}
              >
                <StaggerItem distance={10}>
                  <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>{labels.context}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)", lineHeight: 1.75 }}>{project.context}</p>
                </StaggerItem>
                <StaggerItem distance={10}>
                  <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>{labels.actions}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)", lineHeight: 1.75 }}>{project.actions}</p>
                </StaggerItem>
                <StaggerItem distance={10}>
                  <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>{labels.tech}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((item) => <SkillTag key={item}>{item}</SkillTag>)}
                  </div>
                </StaggerItem>
                <StaggerItem
                  distance={10}
                  className="rounded-lg p-5 border-l-2"
                  style={{
                    backgroundColor: p ? p.impactBg : "var(--metric-bg)",
                    borderLeftColor: p ? p.impactBorder : "var(--metric)",
                  }}
                >
                  <p className="text-xs font-mono uppercase tracking-widest mb-2"
                    style={{ color: p ? p.impactLabel : "var(--metric-l)" }}>
                    {labels.impact}
                  </p>
                  <p className="text-sm leading-relaxed"
                    style={{ color: p ? p.impactText : "var(--metric-t)", lineHeight: 1.75 }}>
                    {project.impact}
                  </p>
                </StaggerItem>
              </Stagger>
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
    <section
      id="projects"
      className="px-6 py-28 border-t transition-colors duration-200"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>{t("label")}</SectionLabel>
          <h2
            className="font-bold leading-tight mb-12"
            style={{ fontSize: "clamp(28px, 3.8vw, 52px)", color: "var(--text-1)" }}
          >
            {t("headline")}
            <br />
            <span style={{ color: "var(--text-3)", fontSize: "0.8em", fontWeight: 500 }}>
              {t("headlineSub")}
            </span>
          </h2>
        </Reveal>
        <div className="grid gap-5">
          {items.map((project, i) => (
            <Reveal key={i}>
              <ProjectCard
                project={project}
                labels={labels}
                expandLabel={t("expandLabel")}
                collapseLabel={t("collapseLabel")}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
