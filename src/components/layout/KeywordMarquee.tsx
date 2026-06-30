/**
 * Slow horizontal marquee of keywords. Pure CSS animation (.marquee-track),
 * which pauses on hover and is disabled under prefers-reduced-motion via
 * globals.css. The content is duplicated inside one track so the -50%
 * translate loops seamlessly.
 */
export default function KeywordMarquee({ keywords }: { keywords: string[] }) {
  const items = [...keywords, ...keywords];

  return (
    <div
      className="marquee-paused relative overflow-hidden py-6 border-y select-none"
      style={{ borderColor: "var(--border)" }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {items.map((kw, i) => (
          <span key={i} className="flex items-center">
            <span
              className="font-display font-medium px-6"
              style={{ fontSize: "clamp(20px, 2.4vw, 32px)", color: "var(--text-2)" }}
            >
              {kw}
            </span>
            <span className="w-1.5 h-1.5 rounded-[1px] rotate-45 shrink-0" style={{ backgroundColor: "var(--accent)" }} />
          </span>
        ))}
      </div>
    </div>
  );
}
