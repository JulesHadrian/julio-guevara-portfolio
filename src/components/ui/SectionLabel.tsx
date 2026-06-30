interface SectionLabelProps {
  children: React.ReactNode;
  /** Optional editorial index, e.g. "002" → renders "002 /". */
  index?: string;
}

export default function SectionLabel({ children, index }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-7">
      {index ? (
        <span
          className="shrink-0 text-xs font-mono tracking-[0.2em]"
          style={{ color: "var(--text-4)" }}
        >
          {index} /
        </span>
      ) : (
        <span
          className="shrink-0 w-1.5 h-1.5 rounded-[1px] rotate-45"
          style={{ backgroundColor: "var(--accent)" }}
        />
      )}
      <span
        className="shrink-0 text-xs font-mono tracking-[0.22em] uppercase"
        style={{ color: "var(--accent-s)" }}
      >
        {children}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
    </div>
  );
}
