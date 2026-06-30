"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * Per-navigation enter transition. `template.tsx` remounts on every route
 * change, so each page fades + rises into view. Reduced motion collapses this
 * to a plain fade with no travel.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      // Deterministic initial so SSR and the first client render agree;
      // reduced motion only shortens the transition.
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.5, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
