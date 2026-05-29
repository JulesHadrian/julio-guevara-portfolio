"use client";

export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="shrink-0 w-1.5 h-1.5 rounded-[1px] rotate-45"
        style={{ backgroundColor: "var(--accent)" }}
      />
      <span
        className="shrink-0 text-xs font-mono tracking-[0.25em] uppercase"
        style={{ color: "var(--accent)" }}
      >
        {children}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
    </div>
  );
}
