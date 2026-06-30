import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/motion/RevealText";

export default async function ManifestoTeaser() {
  const t = await getTranslations("home");
  const locale = await getLocale();
  const lines = t.raw("manifestoLines") as string[];

  return (
    <section style={{ backgroundColor: "var(--dark-bg)" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.2em] mb-10" style={{ color: "var(--dark-text-3)" }}>
            {t("manifestoLabel")}
          </p>
        </Reveal>

        <div className="space-y-1">
          {lines.map((line, i) => (
            <p
              key={i}
              className="font-display font-medium tracking-[-0.02em]"
              style={{
                fontSize: "clamp(24px, 3.6vw, 46px)",
                lineHeight: 1.18,
                color: i % 2 === 0 ? "var(--dark-text-1)" : "var(--dark-text-3)",
              }}
            >
              <RevealText text={line} by="word" className="block" delay={i * 0.1} stagger={0.03} />
            </p>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Link
            href={`/${locale}/manifesto`}
            className="group inline-flex items-center gap-2 mt-12 text-sm font-medium"
            style={{ color: "var(--dark-accent)" }}
          >
            {t("manifestoCta")}
            <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
