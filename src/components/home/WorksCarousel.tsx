"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectCard, { type ProjectCardData } from "@/components/ui/ProjectCard";
import { EASE_OUT } from "@/lib/motion";

interface WorksCarouselProps {
  cards: ProjectCardData[];
  locale: string;
  cta: string;
  prevLabel: string;
  nextLabel: string;
  dragHint: string;
}

const STEP = 380; // px per button nudge (card + gap)

export default function WorksCarousel({ cards, locale, cta, prevLabel, nextLabel, dragHint }: WorksCarouselProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);

  const measure = useCallback(() => {
    if (!viewport.current || !track.current) return;
    const overflow = track.current.scrollWidth - viewport.current.offsetWidth;
    setMaxDrag(Math.max(0, overflow));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const move = useCallback(
    (dir: -1 | 1) => {
      const target = Math.min(0, Math.max(-maxDrag, x.get() - dir * STEP));
      animate(x, target, { duration: 0.5, ease: EASE_OUT });
    },
    [maxDrag, x]
  );

  return (
    <div
      role="group"
      aria-label={dragHint}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
      }}
      className="relative outline-none"
    >
      <div ref={viewport} className="overflow-hidden">
        <motion.div
          ref={track}
          className="flex gap-5 cursor-grab active:cursor-grabbing"
          data-cursor={dragHint}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          onDragEnd={measure}
        >
          {cards.map((data) => (
            <div key={data.slug} className="w-[290px] sm:w-[360px] shrink-0">
              <ProjectCard data={data} locale={locale} cta={cta} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-8">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label={prevLabel}
          className="w-11 h-11 flex items-center justify-center rounded-full border link-muted cursor-pointer"
          style={{ borderColor: "var(--border-strong)" }}
        >
          <ArrowLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label={nextLabel}
          className="w-11 h-11 flex items-center justify-center rounded-full border link-muted cursor-pointer"
          style={{ borderColor: "var(--border-strong)" }}
        >
          <ArrowRight size={16} />
        </button>
        <span className="ml-2 text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-4)" }}>
          {dragHint}
        </span>
      </div>
    </div>
  );
}
