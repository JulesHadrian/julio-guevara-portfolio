import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/motion/RevealText";
import SectionLabel from "@/components/ui/SectionLabel";
import SkillTag from "@/components/ui/SkillTag";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("manifesto");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

interface Principle { title: string; text: string; }
interface Role { title: string; company: string; period: string; location: string; bullets: string[]; }
interface SkillCat { name: string; items: string[]; }

export default async function ManifestoPage() {
  const t = await getTranslations("manifesto");
  const ta = await getTranslations("about");
  const te = await getTranslations("experience");
  const ts = await getTranslations("skills");
  const ted = await getTranslations("education");

  const principles = t.raw("principles") as Principle[];
  const roles = te.raw("roles") as Role[];
  const categories = ts.raw("categories") as SkillCat[];

  return (
    <div className="px-6 lg:px-10 pt-36 pb-24 lg:pt-44">
      <div className="max-w-[1000px] mx-auto">
        {/* Hero / story */}
        <Reveal>
          <SectionLabel index="002">{t("label")}</SectionLabel>
        </Reveal>
        <h1 className="font-display font-semibold tracking-[-0.03em] mb-10" style={{ fontSize: "clamp(38px, 6vw, 76px)", lineHeight: 1.0, color: "var(--text-1)" }}>
          <RevealText text={ta("headline1")} by="word" className="block" />
          <RevealText text={ta("headline2")} by="word" className="block" style={{ color: "var(--accent-s)" }} delay={0.15} />
        </h1>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-5 max-w-4xl">
          {["p1", "p2", "p3"].map((p, i) => (
            <Reveal key={p} delay={i * 0.05} className={i === 0 ? "md:col-span-2" : ""}>
              <p className="leading-relaxed" style={{ fontSize: i === 0 ? "clamp(18px, 1.6vw, 22px)" : "16px", color: i === 0 ? "var(--text-1)" : "var(--text-3)" }}>
                {ta(p)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Principles */}
      <div className="max-w-[1000px] mx-auto mt-28">
        <Reveal>
          <SectionLabel>{t("principlesLabel")}</SectionLabel>
        </Reveal>
        <h2 className="font-display font-semibold tracking-[-0.02em] mb-12" style={{ fontSize: "clamp(28px, 3.6vw, 46px)", color: "var(--text-1)" }}>
          <RevealText text={t("principlesTitle")} by="word" />
        </h2>
        <div className="grid sm:grid-cols-2 gap-px rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)", backgroundColor: "var(--border)" }}>
          {principles.map((pr, i) => (
            <Reveal key={pr.title} delay={i * 0.04}>
              <div className="p-7 h-full" style={{ backgroundColor: "var(--card)" }}>
                <span className="text-xs font-mono tracking-[0.2em] mb-4 block" style={{ color: "var(--accent-s)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-semibold mb-2" style={{ fontSize: "20px", color: "var(--text-1)" }}>{pr.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>{pr.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="max-w-[1000px] mx-auto mt-28">
        <Reveal>
          <SectionLabel>{te("label")}</SectionLabel>
        </Reveal>
        <h2 className="font-display font-semibold tracking-[-0.02em] mb-12" style={{ fontSize: "clamp(28px, 3.6vw, 46px)", color: "var(--text-1)" }}>
          <RevealText text={te("headline")} by="word" />{" "}
          <RevealText text={te("headlineSub")} by="word" style={{ color: "var(--text-4)" }} delay={0.15} />
        </h2>
        <div className="space-y-px rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)", backgroundColor: "var(--border)" }}>
          {roles.map((role, i) => (
            <Reveal key={role.company} delay={i * 0.04}>
              <div className="p-7 grid md:grid-cols-3 gap-6" style={{ backgroundColor: "var(--card)" }}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display font-semibold" style={{ fontSize: "18px", color: "var(--text-1)" }}>{role.company}</h3>
                    {i === 0 && (
                      <span className="text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded" style={{ backgroundColor: "var(--metric-bg)", color: "var(--metric)" }}>
                        {te("currentTag")}
                      </span>
                    )}
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-2)" }}>{role.title}</p>
                  <p className="text-xs font-mono mt-2" style={{ color: "var(--text-4)" }}>{role.period}</p>
                  <p className="text-xs font-mono" style={{ color: "var(--text-4)" }}>{role.location}</p>
                </div>
                <ul className="md:col-span-2 space-y-2.5">
                  {role.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                      <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="max-w-[1000px] mx-auto mt-28">
        <Reveal>
          <SectionLabel>{t("capabilitiesLabel")}</SectionLabel>
        </Reveal>
        <h2 className="font-display font-semibold tracking-[-0.02em] mb-12" style={{ fontSize: "clamp(28px, 3.6vw, 46px)", color: "var(--text-1)" }}>
          <RevealText text={ts("headline")} by="word" />{" "}
          <RevealText text={ts("headlineSub")} by="word" style={{ color: "var(--text-4)" }} delay={0.15} />
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 0.03}>
              <div className="rounded-2xl border p-6 h-full" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--accent-s)" }}>{cat.name}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <SkillTag key={item}>{item}</SkillTag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="max-w-[1000px] mx-auto mt-28">
        <Reveal>
          <SectionLabel>{ted("label")}</SectionLabel>
        </Reveal>
        <Reveal>
          <div className="rounded-2xl border p-7" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <h3 className="font-display font-semibold mb-1" style={{ fontSize: "22px", color: "var(--text-1)" }}>{ted("degree")}</h3>
            <p className="text-sm mb-3" style={{ color: "var(--text-2)" }}>{ted("institution")}</p>
            <p className="text-xs font-mono" style={{ color: "var(--text-4)" }}>{ted("period")} · {ted("location")}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
