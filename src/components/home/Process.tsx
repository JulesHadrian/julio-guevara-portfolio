import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ProcessTimeline from "@/components/ui/ProcessTimeline";

interface Step { title: string; result: string; }

export default async function Process() {
  const t = await getTranslations("home");
  const steps = t.raw("process") as Step[];

  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <SectionLabel index="006">{t("processLabel")}</SectionLabel>
        </Reveal>
        <Reveal>
          <h2 className="font-display font-semibold tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(30px, 4vw, 52px)", color: "var(--text-1)" }}>
            {t("processTitle")}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="max-w-2xl leading-relaxed mb-12" style={{ color: "var(--text-3)" }}>
            {t("processIntro")}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ProcessTimeline steps={steps} />
        </Reveal>
      </div>
    </section>
  );
}
