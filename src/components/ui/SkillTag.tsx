interface SkillTagProps {
  children: React.ReactNode;
  accent?: boolean;
}

export default function SkillTag({ children, accent = false }: SkillTagProps) {
  return (
    <span
      className="inline-block text-xs font-mono px-3 py-1 rounded-md border transition-colors duration-200"
      style={{
        backgroundColor: accent ? "var(--accent-bg-s)" : "var(--tag-bg)",
        borderColor:     accent ? "var(--accent-bg-m)" : "var(--tag-border)",
        color:           accent ? "var(--accent-h)"    : "var(--tag-text)",
      }}
    >
      {children}
    </span>
  );
}
