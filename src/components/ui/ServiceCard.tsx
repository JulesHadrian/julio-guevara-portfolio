import SkillTag from "@/components/ui/SkillTag";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  tags: string[];
  tagVariant?: "accent" | "tech" | "data";
}

export default function ServiceCard({
  number,
  title,
  description,
  deliverables,
  tags,
  tagVariant = "accent",
}: ServiceCardProps) {
  return (
    <div
      className="flex flex-col rounded-2xl border p-7 h-full"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
    >
      <span className="text-xs font-mono tracking-[0.2em] mb-6" style={{ color: "var(--text-4)" }}>
        {number}
      </span>
      <h3 className="font-display font-semibold mb-3" style={{ fontSize: "26px", color: "var(--text-1)" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-3)" }}>
        {description}
      </p>

      <ul className="space-y-2.5 mb-7">
        {deliverables.map((d) => (
          <li key={d} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-2)" }}>
            <span
              className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-[1px] rotate-45"
              style={{ backgroundColor: "var(--accent)" }}
            />
            {d}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-2">
        {tags.map((tag) => (
          <SkillTag key={tag} variant={tagVariant}>
            {tag}
          </SkillTag>
        ))}
      </div>
    </div>
  );
}
