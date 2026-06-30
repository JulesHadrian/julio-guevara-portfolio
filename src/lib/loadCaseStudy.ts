import "server-only";
import { getTranslations } from "next-intl/server";
import type { CaseStudyMeta, CaseStudyCopy } from "./caseStudies";

/**
 * Server-only: resolves the translated copy for a case study from the i18n
 * messages, given its locale-independent meta. Returns a plain object safe to
 * pass to Client Components.
 */
export async function loadCaseStudyCopy(
  locale: string,
  cs: CaseStudyMeta
): Promise<CaseStudyCopy> {
  const t = await getTranslations({ locale, namespace: cs.source });
  const key = cs.source === "projects" ? "items" : "highlights";
  const arr = t.raw(key) as CaseStudyCopy[];
  return arr[cs.index];
}
