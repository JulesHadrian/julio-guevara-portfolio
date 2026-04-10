"use client";

export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-mono tracking-[0.2em] uppercase mb-4"
      style={{ color: "var(--accent)" }}
    >
      {children}
    </span>
  );
}
