"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

interface RevealTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Stagger unit: whole words (default) or the full line as one token. */
  by?: "word" | "line";
  /** Delay before the cascade starts (s). */
  delay?: number;
  /** Per-token stagger (s). */
  stagger?: number;
}

/**
 * Editorial heading reveal — each word rises from a clipped baseline with a
 * staggered cascade when scrolled into view. Honors reduced motion (the words
 * simply fade in place). The structure is identical on server and client so
 * reduced-motion users don't hit a hydration mismatch.
 */
export default function RevealText({
  text,
  className,
  style,
  by = "word",
  delay = 0,
  stagger = 0.045,
}: RevealTextProps) {
  const reduce = useReducedMotion();
  const tokens = by === "line" ? [text] : text.split(" ");

  return (
    <motion.span
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay } },
      }}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <span key={i} aria-hidden="true">
          <span
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: { y: "0%", opacity: 1, transition: { duration: reduce ? 0 : 0.7, ease: EASE_OUT } },
              }}
            >
              {token}
            </motion.span>
          </span>
          {by === "word" && i < tokens.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}
