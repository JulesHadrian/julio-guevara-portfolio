import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SkillTag from "@/components/ui/SkillTag";

export interface ProjectCardData {
  slug: string;
  number: string;        // "001"
  title: string;
  type: string;          // Software | CRO | Shopify
  year: string;
  summary: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  statusLabel?: string;
}

export default function ProjectCard({
  data,
  locale,
  cta,
}: {
  data: ProjectCardData;
  locale: string;
  cta: string;
}) {
  const { slug, number, title, type, year, summary, tags, metric, metricLabel, statusLabel } = data;

  return (
    <Link
      href={`/${locale}/archive/${slug}`}
      className="card-hover group flex flex-col rounded-2xl border p-6 sm:p-7 h-full"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Meta row */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <span className="text-xs font-mono tracking-[0.2em]" style={{ color: "var(--text-4)" }}>
          {number}
        </span>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
          <span style={{ color: "var(--accent-s)" }}>{type}</span>
          <span style={{ color: "var(--border-strong)" }}>·</span>
          <span>{year}</span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-display font-semibold leading-tight mb-3"
        style={{ fontSize: "clamp(20px, 2vw, 26px)", color: "var(--text-1)" }}
      >
        {title}
      </h3>

      {/* Summary */}
      <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: "var(--text-3)" }}>
        {summary}
      </p>

      {/* Metric */}
      <div className="mt-auto">
        <div className="flex items-baseline gap-2 mb-5">
          <span className="font-display font-semibold" style={{ fontSize: "28px", color: "var(--metric)" }}>
            {metric}
          </span>
          <span className="text-xs font-mono uppercase tracking-wide" style={{ color: "var(--text-4)" }}>
            {metricLabel}
          </span>
        </div>

        {/* Tags + status */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {tags.slice(0, 3).map((tag) => (
            <SkillTag key={tag}>{tag}</SkillTag>
          ))}
          {statusLabel && (
            <span
              className="text-[11px] font-mono uppercase tracking-wide px-2.5 py-1 rounded-md"
              style={{ backgroundColor: "var(--status-testing-bg)", color: "var(--status-testing)" }}
            >
              {statusLabel}
            </span>
          )}
        </div>

        <span
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: "var(--text-1)" }}
        >
          <span className="link-muted group-hover:text-[var(--accent-s)]">{cta}</span>
          <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: "var(--accent-s)" }} />
        </span>
      </div>
    </Link>
  );
}
