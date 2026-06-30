"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Decorative trailing cursor for fine pointers. It augments — never replaces —
 * the native cursor (kept visible for accessibility). On elements with a
 * `data-cursor="view|drag"` attribute it grows into a labelled disc. Fully
 * inert under touch input and prefers-reduced-motion (no listeners attached),
 * and only ever renders on the client to avoid SSR hydration mismatches from
 * its spring-driven transforms.
 */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 });

  const [mounted, setMounted] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const active = useRef(false);

  // Client-only: defer the flag out of the synchronous effect body.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!active.current) {
        active.current = true;
        setVisible(true);
      }
      const el = (e.target as Element)?.closest?.("[data-cursor]");
      const next = el?.getAttribute("data-cursor") ?? null;
      setLabel((prev) => (prev === next ? prev : next));
    };
    const onLeave = () => { active.current = false; setVisible(false); };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!mounted) return null;

  const labelled = !!label;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden md:flex items-center justify-center rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: "difference",
      }}
      initial={false}
      animate={{
        width: labelled ? 76 : 10,
        height: labelled ? 76 : 10,
        opacity: visible ? 1 : 0,
        backgroundColor: labelled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)",
      }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      {labelled && (
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "#0F1115" }}>
          {label}
        </span>
      )}
    </motion.div>
  );
}
