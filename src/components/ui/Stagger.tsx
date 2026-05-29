"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

interface StaggerProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "variants" | "animate"> {
  /** Delay between each child in seconds (default 0.08). */
  stagger?: number;
  /** Delay before the first child reveals (default 0.05). */
  delayChildren?: number;
  /**
   * What kicks off the cascade:
   * - "view"  (default) — when the container scrolls into view.
   * - "mount" — as soon as it mounts (use inside expand/collapse panels, which
   *   only render once opened).
   */
  trigger?: "view" | "mount";
}

/**
 * Container that reveals its <StaggerItem> children one after another. Children
 * only need to be <StaggerItem>; orchestration is driven from here.
 */
export function Stagger({ children, stagger = 0.08, delayChildren = 0.05, trigger = "view", ...rest }: StaggerProps) {
  const reduce = useReducedMotion();

  const activation =
    trigger === "mount"
      ? { animate: "visible" as const }
      : { whileInView: "visible" as const, viewport: VIEWPORT };

  return (
    <motion.div
      initial="hidden"
      {...activation}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : delayChildren,
          },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  distance?: number;
}

export function StaggerItem({ children, distance = 20, ...rest }: StaggerItemProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={{
        // `initial` (hidden) stays reduce-independent to keep SSR and the first
        // client render identical; reduced motion only zeroes the duration.
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.45, ease: EASE_OUT } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
