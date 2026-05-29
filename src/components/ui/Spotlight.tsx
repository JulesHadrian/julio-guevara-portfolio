"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * Ambient background layer for the hero: a soft amber spotlight that eases
 * toward the pointer, layered over a slow-drifting aurora and a faint dot grid.
 * Pointer-events-none and decorative. Honors prefers-reduced-motion (the
 * spotlight stays put; the aurora's CSS animation is disabled globally).
 */
export default function Spotlight() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Pointer position as a percentage of the host section.
  const mx = useMotionValue(50);
  const my = useMotionValue(18);
  const sx = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const host = ref.current?.parentElement;
      if (!host) return;
      const r = host.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${sx}% ${sy}%, var(--accent-glow), transparent 62%)`;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Dot grid — subtle warm texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-grid) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />

      {/* Aurora — slow-drifting amber wash, top-left anchored */}
      <div className="aurora-layer absolute -top-1/3 -left-1/4 w-[80vw] h-[80vh]" />

      {/* Pointer spotlight */}
      <motion.div className="absolute inset-0" style={{ background: spotlight, opacity: 0.85 }} />
    </div>
  );
}
