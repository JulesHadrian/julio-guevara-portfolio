import type { Variants } from "framer-motion";

/**
 * Shared Framer Motion language for the portfolio.
 * Snappy, "instant" easing — short durations, decisive ease-out curve.
 * Components consume these so motion stays consistent across all sections.
 */

// Decisive ease-out (a.k.a. easeOutQuint-ish) — feels immediate but smooth.
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Default viewport for whileInView reveals: fire once, slightly before fully in view.
export const VIEWPORT = { once: true, margin: "-80px" } as const;

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_OUT } },
};
