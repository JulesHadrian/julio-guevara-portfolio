"use client";

import { useEffect, useState } from "react";
import { animate, AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

export default function Preloader({ tagline }: { tagline: string }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Only on first visit of the session, and never with reduced motion.
    if (reduce) return;
    try {
      if (sessionStorage.getItem("preloaded")) return;
    } catch { /* private mode — show once */ }

    let controls: ReturnType<typeof animate> | undefined;
    let holdTimer: number | undefined;

    // Defer state + animation out of the synchronous effect body.
    const raf = requestAnimationFrame(() => {
      setShow(true);
      document.body.style.overflow = "hidden";

      controls = animate(0, 100, {
        duration: 1.1,
        ease: EASE_OUT,
        onUpdate: (v) => setCount(Math.round(v)),
        onComplete: () => {
          try { sessionStorage.setItem("preloaded", "1"); } catch { /* ignore */ }
          holdTimer = window.setTimeout(() => {
            setShow(false);
            document.body.style.overflow = "";
          }, 180);
        },
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      controls?.stop();
      if (holdTimer) window.clearTimeout(holdTimer);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--bg)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <motion.span
            className="font-mono text-xs uppercase tracking-[0.3em] mb-6"
            style={{ color: "var(--text-4)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            {tagline}
          </motion.span>
          <span
            className="font-display font-semibold leading-none tabular-nums"
            style={{ fontSize: "clamp(64px, 14vw, 160px)", color: "var(--text-1)" }}
          >
            {String(count).padStart(3, "0")}
            <span style={{ color: "var(--accent-s)" }}>%</span>
          </span>
          <div className="mt-8 h-px w-48 overflow-hidden" style={{ backgroundColor: "var(--border)" }}>
            <div className="h-full" style={{ width: `${count}%`, backgroundColor: "var(--accent)" }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
