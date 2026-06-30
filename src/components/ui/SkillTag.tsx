interface SkillTagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "tech" | "data";
}

const styles: Record<NonNullable<SkillTagProps["variant"]>, React.CSSProperties> = {
  default: { backgroundColor: "var(--tag-bg)",       borderColor: "var(--tag-border)",        color: "var(--tag-text)" },
  accent:  { backgroundColor: "var(--accent-bg-s)",  borderColor: "var(--accent-bg-m)",       color: "var(--accent-s)" },
  tech:    { backgroundColor: "var(--secondary-bg)", borderColor: "var(--secondary-border)",  color: "var(--secondary-s)" },
  data:    { backgroundColor: "var(--metric-bg)",    borderColor: "var(--metric-border)",     color: "var(--metric)" },
};

export default function SkillTag({ children, variant = "default" }: SkillTagProps) {
  return (
    <span
      className="inline-block text-xs font-mono px-2.5 py-1 rounded-md border"
      style={styles[variant]}
    >
      {children}
    </span>
  );
}
