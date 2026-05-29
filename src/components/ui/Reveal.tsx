"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "variants"> {
  /** Stagger delay in seconds before this block reveals. */
  delay?: number;
  /** Vertical travel distance in px (default 24). */
  distance?: number;
}

/**
 * Reveals its children with a fade + upward rise when scrolled into view.
 * Fires once. Honors prefers-reduced-motion (no travel, instant).
 */
export default function Reveal({ children, delay = 0, distance = 24, ...rest }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        // `initial` must NOT depend on `reduce` — it's rendered on the server
        // (where reduce is always false) and would mismatch the client's first
        // render for users who prefer reduced motion. Reduced motion is applied
        // only to the transition timing, which runs after hydration.
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0 : 0.5, ease: EASE_OUT, delay: reduce ? 0 : delay },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
