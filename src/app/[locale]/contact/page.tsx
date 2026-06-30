import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Mail, ExternalLink, Download } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/motion/RevealText";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return { title: t("headline"), description: t("subheadline") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const locale = await getLocale();
  const resumeUrl = locale === "es" ? siteConfig.resumeEs : siteConfig.resumeEn;

  const links = [
    { Icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}`, external: false },
    { Icon: ExternalLink, label: siteConfig.linkedin.replace("https://www.", ""), href: siteConfig.linkedin, external: true },
    { Icon: ExternalLink, label: siteConfig.github.replace("https://", ""), href: siteConfig.github, external: true },
  ];

  return (
    <section className="px-6 lg:px-10 pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <SectionLabel index="005">{t("label")}</SectionLabel>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Left */}
          <div>
            <h1 className="font-display font-semibold tracking-[-0.03em] mb-6" style={{ fontSize: "clamp(34px, 5vw, 60px)", lineHeight: 1.0, color: "var(--text-1)" }}>
              <RevealText text={t("headline")} by="word" delay={0.05} />
            </h1>
            <Reveal delay={0.05}>
              <p className="leading-relaxed mb-10" style={{ fontSize: "clamp(16px, 1.4vw, 19px)", color: "var(--text-3)" }}>
                {t("subheadline")}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-4)" }}>
                {t("orDivider")}
              </p>
              <div className="space-y-3">
                {links.map(({ Icon, label, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="link-muted flex items-center gap-3 text-sm"
                  >
                    <span className="w-9 h-9 rounded-lg flex items-center justify-center border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                      <Icon size={15} />
                    </span>
                    {label}
                  </a>
                ))}
                <a href={resumeUrl} download className="flex items-center gap-3 text-sm" style={{ color: "var(--accent-s)" }}>
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center border" style={{ backgroundColor: "var(--accent-bg)", borderColor: "var(--border-strong)" }}>
                    <Download size={15} />
                  </span>
                  {t("downloadResume")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.08}>
            <div className="rounded-2xl border p-7 sm:p-8" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
