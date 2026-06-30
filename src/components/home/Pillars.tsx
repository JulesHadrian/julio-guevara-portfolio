import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ServiceCard from "@/components/ui/ServiceCard";

interface Pillar {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  tags: string[];
}

const variants = ["tech", "accent", "data"] as const;

export default async function Pillars() {
  const t = await getTranslations("home");
  const pillars = t.raw("pillars") as Pillar[];

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32" style={{ backgroundColor: "var(--surface-2)" }}>
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <SectionLabel index="005">{t("pillarsLabel")}</SectionLabel>
        </Reveal>
        <Reveal>
          <h2 className="font-display font-semibold tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(30px, 4vw, 52px)", color: "var(--text-1)" }}>
            {t("pillarsTitle")}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="max-w-2xl leading-relaxed mb-12" style={{ color: "var(--text-3)" }}>
            {t("pillarsIntro")}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <ServiceCard
                number={p.number}
                title={p.title}
                description={p.description}
                deliverables={p.deliverables}
                tags={p.tags}
                tagVariant={variants[i % variants.length]}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
