"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";

/** Floating keyword nodes (tech/CRO texture) and their start positions (%). */
const WORDS = [
  "engineering", "cro", "conversion", "analytics", "experiments", "shopify",
  "liquid", "typescript", "react", "performance", "ux", "revenue",
  "optimization", "testing", "automation", "growth",
];
const START: [number, number][] = [
  [13, 17], [26, 39], [39, 13], [51, 11], [62, 19], [74, 15],
  [86, 29], [90, 50], [83, 67], [71, 81], [57, 87], [44, 83],
  [30, 77], [19, 65], [9, 45], [16, 30],
];

// Fallback central box (fraction of container) until the main words are measured.
const RECT_HALF_W = 0.32;
const RECT_HALF_H = 0.15;

// How near (fraction of the smaller viewport side) a word must be to be pulled
// into the constellation.
const NEAR_RADIUS = 0.34;

// Hover attraction: gentle gravity toward the focused word, with capped speed
// so the pull feels floaty (not a snap) and words keep drifting as they orbit.
const GRAVITY = 0.02;      // accel toward focus (px/frame²)
const MAX_SPEED = 0.85;    // speed cap while attracted (px/frame)
const BASE_SPEED = 0.45;   // gentle float speed words ease back to once free

/**
 * Returns the point where the segment from (px,py) toward (cx,cy) first enters
 * the axis-aligned rect — so a radial line can stop at the central text box
 * edge instead of crossing over the big letters. (Liang–Barsky entry param.)
 */
function entryPoint(px: number, py: number, cx: number, cy: number, xmin: number, xmax: number, ymin: number, ymax: number) {
  const dx = cx - px, dy = cy - py;
  const p = [-dx, dx, -dy, dy];
  const q = [px - xmin, xmax - px, py - ymin, ymax - py];
  let u = 0;
  for (let k = 0; k < 4; k++) {
    if (p[k] === 0) {
      if (q[k] < 0) return { x: cx, y: cy };
    } else if (p[k] < 0) {
      const t = q[k] / p[k];
      if (t > u) u = t;
    }
  }
  if (u > 1) u = 1;
  return { x: px + u * dx, y: py + u * dy };
}

export default function SynapseHero() {
  const t = useTranslations("hero");
  const th = useTranslations("home");

  const trackRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const radialRefs = useRef<(SVGLineElement | null)[]>([]);
  const relRefs = useRef<(SVGLineElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  const coarseRef = useRef(false);
  useEffect(() => { activeRef.current = active; }, [active]);

  // Intro sequence: 1 = main words fade, 2 = keywords fade, 3 = lines connect.
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase(1), 120);   // title
    const t2 = window.setTimeout(() => setPhase(2), 1150);  // lines connect
    const t3 = window.setTimeout(() => setPhase(3), 1550);  // keywords (soon after)
    const t4 = window.setTimeout(() => setPhase(4), 2700);  // scroll cue (last)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // The floating constellation is this hero's signature identity, so it runs
    // regardless of prefers-reduced-motion (gentle, non-flashing drift).
    coarseRef.current = window.matchMedia("(pointer: coarse)").matches;
    const headerH = (document.querySelector("header") as HTMLElement | null)?.offsetHeight ?? 64;

    const setLine = (line: SVGLineElement | null, x1: number, y1: number, x2: number, y2: number) => {
      if (!line) return;
      line.setAttribute("x1", x1.toFixed(1));
      line.setAttribute("y1", y1.toFixed(1));
      line.setAttribute("x2", x2.toFixed(1));
      line.setAttribute("y2", y2.toFixed(1));
    };

    const P = START.map(() => ({ x: 0, y: 0 }));
    const V = START.map((_, i) => {
      const ang = (i * 2.39996) % (Math.PI * 2);
      const sp = 0.2 + (i % 5) * 0.035;
      return { x: Math.cos(ang) * sp, y: Math.sin(ang) * sp };
    });
    let seeded = false;
    let lastActive: number | null = -999;
    let cluster: number[] = [];
    let raf = 0;
    // Intro fade/connect progress (0→1), advanced per phase.
    let titleIntro = 0, wordsIntro = 0, lineIntro = 0, cueIntro = 0;

    const frame = () => {
      const W = container.offsetWidth;
      const H = container.offsetHeight;

      if (W > 0 && H > 0) {
        if (!seeded) {
          START.forEach(([px, py], i) => { P[i].x = (px / 100) * W; P[i].y = (py / 100) * H; });
          seeded = true;
        }

        // Intro ramps
        if (phaseRef.current >= 1) titleIntro = Math.min(1, titleIntro + 0.012);
        if (phaseRef.current >= 2) lineIntro = Math.min(1, lineIntro + 0.02);
        if (phaseRef.current >= 3) wordsIntro = Math.min(1, wordsIntro + 0.014);
        if (phaseRef.current >= 4) cueIntro = Math.min(1, cueIntro + 0.018);

        // Scroll-linked fade while the hero is pinned: keywords + lines fade
        // out first, big words last. Progress = how far we've scrolled through
        // the sticky track. Reverses on scroll up (reads live scroll position).
        const scrollPos = window.scrollY || 0;
        const track = trackRef.current;
        const pin = track ? Math.max(1, track.offsetHeight - H) : H;
        const prog = Math.min(1, scrollPos / pin);
        const fadeWords = Math.max(0, 1 - prog / 0.6);
        const fadeTitle = Math.max(0, 1 - Math.max(0, prog - 0.45) / 0.55);

        const h1el = h1Ref.current;
        if (h1el) h1el.style.opacity = (titleIntro * fadeTitle).toFixed(3);
        const cueEl = cueRef.current;
        if (cueEl) cueEl.style.opacity = (cueIntro * fadeWords).toFixed(3);

        const cx = W / 2, cy = H / 2, pad = 30;
        const topPad = headerH + 10;
        const h1 = h1Ref.current;
        const hw = h1 ? h1.offsetWidth / 2 : RECT_HALF_W * W;
        const hh = h1 ? h1.offsetHeight / 2 : RECT_HALF_H * H;
        const colRhw = hw + 38, colRhh = hh + 30;
        const lineXmin = cx - (hw + 6), lineXmax = cx + (hw + 6);
        const lineYmin = cy - (hh + 6), lineYmax = cy + (hh + 6);
        const a = activeRef.current;

        // Reset the constellation when the focus changes.
        if (a !== lastActive) { cluster = []; lastActive = a; }
        // While focused, any word that drifts within range joins the cluster
        // (it stays joined until the hover is released).
        if (a !== null) {
          const r2 = (Math.min(W, H) * NEAR_RADIUS) ** 2;
          for (let j = 0; j < P.length; j++) {
            if (j === a || cluster.includes(j)) continue;
            const ddx = P[j].x - P[a].x, ddy = P[j].y - P[a].y;
            if (ddx * ddx + ddy * ddy < r2) cluster.push(j);
          }
        }

        for (let i = 0; i < P.length; i++) {
          const isActive = a === i;
          const clustered = a !== null && cluster.includes(i);

          if (!isActive) {
            if (clustered) {
              // gentle gravity toward the focused word — words keep their float
              // velocity and are pulled in; speed is capped so it never snaps.
              const dx = P[a!].x - P[i].x, dy = P[a!].y - P[i].y;
              const d = Math.hypot(dx, dy) || 1;
              V[i].x += (dx / d) * GRAVITY;
              V[i].y += (dy / d) * GRAVITY;
              const sp = Math.hypot(V[i].x, V[i].y);
              if (sp > MAX_SPEED) { V[i].x = (V[i].x / sp) * MAX_SPEED; V[i].y = (V[i].y / sp) * MAX_SPEED; }
            } else {
              // ease back to a gentle drift after being released
              const sp = Math.hypot(V[i].x, V[i].y);
              if (sp > BASE_SPEED) { V[i].x *= 0.98; V[i].y *= 0.98; }
            }

            P[i].x += V[i].x;
            P[i].y += V[i].y;

            if (P[i].x < pad) { P[i].x = pad; V[i].x = Math.abs(V[i].x); }
            else if (P[i].x > W - pad) { P[i].x = W - pad; V[i].x = -Math.abs(V[i].x); }
            if (P[i].y < topPad) { P[i].y = topPad; V[i].y = Math.abs(V[i].y); }
            else if (P[i].y > H - pad) { P[i].y = H - pad; V[i].y = -Math.abs(V[i].y); }

            const dx = P[i].x - cx, dy = P[i].y - cy;
            if (Math.abs(dx) < colRhw && Math.abs(dy) < colRhh) {
              const penX = colRhw - Math.abs(dx);
              const penY = colRhh - Math.abs(dy);
              if (penX < penY) {
                P[i].x += dx >= 0 ? penX : -penX;
                V[i].x = dx >= 0 ? Math.abs(V[i].x) : -Math.abs(V[i].x);
              } else {
                P[i].y += dy >= 0 ? penY : -penY;
                V[i].y = dy >= 0 ? Math.abs(V[i].y) : -Math.abs(V[i].y);
              }
            }
          }

          const el = wordRefs.current[i];
          if (el) {
            const scale = isActive ? 1.22 : clustered ? 1.08 : 1;
            el.style.transform = `translate(${P[i].x.toFixed(1)}px, ${P[i].y.toFixed(1)}px) translate(-50%, -50%) scale(${scale})`;
            el.style.color = isActive ? "var(--accent-s)" : clustered ? "var(--text-1)" : "var(--text-3)";
            // staggered fade-in, then scroll-linked fade-out
            el.style.opacity = (Math.min(1, Math.max(0, (wordsIntro - i * 0.03) * 3)) * fadeWords).toFixed(3);
          }

          // radial line grows out from the central words toward the keyword
          const line = radialRefs.current[i];
          const end = entryPoint(P[i].x, P[i].y, cx, cy, lineXmin, lineXmax, lineYmin, lineYmax);
          setLine(line, end.x + (P[i].x - end.x) * lineIntro, end.y + (P[i].y - end.y) * lineIntro, end.x, end.y);
          if (line) {
            const base = isActive ? 0.8 : clustered ? 0.5 : 0.35;
            line.style.opacity = (base * Math.min(1, lineIntro * 4) * fadeWords).toFixed(3);
            line.style.stroke = isActive || clustered ? "var(--accent)" : "var(--text-4)";
          }
        }

        // threads from the focused word to every clustered word
        for (let k = 0; k < relRefs.current.length; k++) {
          const line = relRefs.current[k];
          if (!line) continue;
          if (a !== null && k < cluster.length) {
            const j = cluster[k];
            setLine(line, P[a].x, P[a].y, P[j].x, P[j].y);
            line.style.opacity = (0.65 * Math.min(1, lineIntro) * fadeWords).toFixed(3);
          } else {
            line.style.opacity = "0";
          }
        }
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={trackRef} className="relative" style={{ height: "180svh" }}>
      <div
        ref={containerRef}
        onClick={() => setActive(null)}
        className="sticky top-0 overflow-hidden flex flex-col items-center justify-center px-6"
        style={{ height: "100svh" }}
      >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          opacity: 0.6,
          maskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, black 35%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, black 35%, transparent 100%)",
        }}
      />

      {/* Synapse / thread lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }} aria-hidden="true">
        {WORDS.map((_, i) => (
          <line key={`r${i}`} ref={(el) => { radialRefs.current[i] = el; }} stroke="var(--text-4)" strokeWidth="1" style={{ opacity: 0.35 }} />
        ))}
        {WORDS.map((_, k) => (
          <line key={`rel${k}`} ref={(el) => { relRefs.current[k] = el; }} stroke="var(--accent)" strokeWidth="1" style={{ opacity: 0 }} />
        ))}
      </svg>

      {/* Center — the two main words */}
      <h1
        ref={h1Ref}
        className="relative z-10 pointer-events-none font-display font-bold tracking-[-0.035em] text-center uppercase"
        style={{ fontSize: "clamp(28px, 6vw, 84px)", lineHeight: 0.95, color: "var(--text-1)", opacity: 0 }}
      >
        <span className="block">{t("line1").replace(/\.$/, "")}</span>
        <span className="block">{t("line2").replace(/\.$/, "")}</span>
      </h1>

      {/* Floating keywords — above the main words so they never hide behind them */}
      {WORDS.map((word, i) => (
        <span
          key={word}
          ref={(el) => { wordRefs.current[i] = el; }}
          onPointerEnter={() => { if (!coarseRef.current) setActive(i); }}
          onPointerLeave={() => { if (!coarseRef.current) setActive((a) => (a === i ? null : a)); }}
          onClick={(e) => { e.stopPropagation(); setActive((a) => (a === i ? null : i)); }}
          className="absolute left-0 top-0 z-20 font-serif italic cursor-pointer select-none whitespace-nowrap transition-colors duration-300"
          style={{
            // Initial position (pre-hydration) in viewport units; the RAF loop
            // overrides this with measured px on the first frame.
            transform: `translate(${START[i][0]}vw, ${START[i][1]}svh) translate(-50%, -50%)`,
            fontSize: "clamp(13px, 1.3vw, 19px)",
            color: "var(--text-3)",
            opacity: 0,
            willChange: "transform",
          }}
        >
          {word}
        </span>
      ))}

      {/* Scroll cue */}
      <div ref={cueRef} className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none" style={{ zIndex: 25, opacity: 0 }}>
        <span className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: "var(--text-4)" }}>
          <ArrowDown size={13} className="animate-bounce" />
          {th("scrollCue")}
        </span>
      </div>
      </div>
    </section>
  );
}
