"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ProjectCard, { type ProjectCardData } from "@/components/ui/ProjectCard";
import { EASE_OUT } from "@/lib/motion";

export interface ArchiveItem {
  type: string;
  data: ProjectCardData;
}

interface ArchiveGridProps {
  items: ArchiveItem[];
  types: string[];
  locale: string;
  cta: string;
  allLabel: string;
  viewLabel: string;
}

export default function ArchiveGrid({ items, types, locale, cta, allLabel, viewLabel }: ArchiveGridProps) {
  const [active, setActive] = useState<string>("all");
  const reduce = useReducedMotion();

  const chips = [{ key: "all", label: allLabel }, ...types.map((t) => ({ key: t, label: t }))];
  const visible = active === "all" ? items : items.filter((i) => i.type === active);

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label={allLabel}>
        {chips.map((chip) => {
          const isActive = active === chip.key;
          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => setActive(chip.key)}
              aria-pressed={isActive}
              className="text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border transition-colors duration-200 cursor-pointer min-h-[40px]"
              style={{
                backgroundColor: isActive ? "var(--text-1)" : "transparent",
                borderColor: isActive ? "var(--text-1)" : "var(--border-strong)",
                color: isActive ? "var(--bg)" : "var(--text-3)",
              }}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {visible.map((item) => (
            <motion.div
              key={item.data.slug}
              data-cursor={viewLabel}
              layout={!reduce}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: EASE_OUT }}
            >
              <ProjectCard data={item.data} locale={locale} cta={cta} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
