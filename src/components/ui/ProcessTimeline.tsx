interface ProcessStep {
  title: string;
  result: string;
}

export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)", backgroundColor: "var(--border)" }}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="flex flex-col p-6"
          style={{ backgroundColor: "var(--card)" }}
        >
          <span className="text-xs font-mono tracking-[0.2em] mb-4" style={{ color: "var(--accent-s)" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display font-semibold mb-2" style={{ fontSize: "18px", color: "var(--text-1)" }}>
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
            {step.result}
          </p>
        </li>
      ))}
    </ol>
  );
}
