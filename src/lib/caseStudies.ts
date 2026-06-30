/**
 * Locale-independent index of case studies. The translated copy lives in
 * `src/messages/{en,es}.json` under either `projects.items[index]` or
 * `impact.highlights[index]`; this file only holds the stable structure
 * (slug, category, year, role, ordering) used for routing and filtering.
 *
 * Read a case study's copy in a Server Component with:
 *   const t = await getTranslations({ locale, namespace: cs.source });
 *   const item = t.raw(cs.source === "projects" ? "items" : "highlights")[cs.index];
 */

export type CaseStudyType = "Software" | "CRO" | "Shopify";
export type CaseStudyRole = "lead" | "fullstack" | "cro" | "lead-eng";
export type CaseStudySource = "projects" | "impact";

export interface CaseStudyMeta {
  slug: string;
  source: CaseStudySource;
  /** Index into messages[source].items | messages[source].highlights */
  index: number;
  type: CaseStudyType;
  year: string;
  role: CaseStudyRole;
  featured: boolean;
}

/** Ordered most-impressive first — this is the Archive display order. */
export const caseStudies: CaseStudyMeta[] = [
  { slug: "conversion-rate-doubled", source: "impact",   index: 0, type: "CRO",      year: "2024", role: "cro",      featured: true  },
  { slug: "inventory-sync",          source: "projects", index: 1, type: "Software", year: "2024", role: "fullstack", featured: true  },
  { slug: "custom-search-engine",    source: "projects", index: 2, type: "Software", year: "2025", role: "lead",     featured: true  },
  { slug: "email-capture-popup",     source: "projects", index: 0, type: "Shopify",  year: "2023", role: "lead",     featured: true  },
  { slug: "rebuy-replacement",       source: "projects", index: 4, type: "CRO",      year: "2025", role: "lead",     featured: true  },
  { slug: "experimentation-velocity", source: "impact",  index: 3, type: "CRO",      year: "2024", role: "cro",      featured: false },
  { slug: "shopify-theme-overhaul",  source: "impact",   index: 1, type: "Shopify",  year: "2023", role: "lead",     featured: false },
  { slug: "internal-tools",          source: "impact",   index: 2, type: "Software", year: "2023", role: "fullstack", featured: false },
  { slug: "dignemi-wellness-app",    source: "projects", index: 3, type: "Software", year: "2025", role: "fullstack", featured: false },
  { slug: "team-leadership",         source: "impact",   index: 4, type: "Software", year: "2024", role: "lead-eng", featured: false },
  { slug: "erp-modules",             source: "impact",   index: 5, type: "Software", year: "2021", role: "fullstack", featured: false },
];

export function getCaseStudy(slug: string): CaseStudyMeta | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export const featuredCaseStudies = caseStudies.filter((c) => c.featured);

/** Distinct categories present in the data, in a stable order — drives filters. */
export const caseStudyTypes: CaseStudyType[] = ["Software", "CRO", "Shopify"];

import type { ProjectCardData } from "@/components/ui/ProjectCard";

/** Maps a case study's meta + translated copy into card props for grids. */
export function toCardData(
  cs: CaseStudyMeta,
  copy: CaseStudyCopy,
  position: number
): ProjectCardData {
  return {
    slug: cs.slug,
    number: String(position).padStart(3, "0"),
    title: copy.title,
    type: cs.type,
    year: cs.year,
    summary: copy.summary ?? copy.context,
    tags: copy.tags,
    metric: copy.metric,
    metricLabel: copy.metricLabel,
    statusLabel: copy.statusLabel,
  };
}

/** Shape of a single translated case study record (fields vary by source). */
export interface CaseStudyCopy {
  title: string;
  tags: string[];
  summary?: string;
  context: string;
  actions: string;
  tech: string[];
  impact: string;
  metric: string;
  metricLabel: string;
  status?: string;
  statusLabel?: string;
  stat1?: string;
  stat1Label?: string;
  stat2?: string;
  stat2Label?: string;
}
