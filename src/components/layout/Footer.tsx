"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const locale = useLocale();
  const base = `/${locale}`;

  const navLinks = [
    { label: tn("home"), href: base },
    { label: tn("manifesto"), href: `${base}/manifesto` },
    { label: tn("archive"), href: `${base}/archive` },
    { label: tn("contact"), href: `${base}/contact` },
  ];

  const contactLinks = [
    { label: siteConfig.email, href: `mailto:${siteConfig.email}`, external: false },
    { label: "LinkedIn", href: siteConfig.linkedin, external: true },
    { label: "GitHub", href: siteConfig.github, external: true },
  ];

  return (
    <footer style={{ backgroundColor: "var(--dark-bg)", color: "var(--dark-text-2)" }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* CTA */}
        <div className="border-b pb-14 mb-14" style={{ borderColor: "var(--dark-border)" }}>
          <p className="text-xs font-mono uppercase tracking-[0.2em] mb-5" style={{ color: "var(--dark-text-3)" }}>
            {t("ctaLabel")}
          </p>
          <Link
            href={`${base}/contact`}
            className="group inline-flex items-start gap-3 font-display font-semibold leading-[0.95]"
            style={{ fontSize: "clamp(34px, 6vw, 72px)", color: "var(--dark-text-1)" }}
          >
            {t("ctaHeadline")}
            <ArrowUpRight
              className="mt-2 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ color: "var(--dark-accent)", width: "clamp(28px,4vw,52px)", height: "clamp(28px,4vw,52px)" }}
            />
          </Link>
        </div>

        {/* Columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="lg:col-span-1">
            <p className="font-display text-lg font-semibold mb-2" style={{ color: "var(--dark-text-1)" }}>
              {siteConfig.name}
            </p>
            <p className="text-sm" style={{ color: "var(--dark-text-3)" }}>{siteConfig.role}</p>
          </div>

          <FooterCol title={t("colNavigate")}>
            {navLinks.map((l) => (
              <Link key={l.label} href={l.href} className="footer-link block py-1 text-sm">{l.label}</Link>
            ))}
          </FooterCol>

          <FooterCol title={t("colContact")}>
            {contactLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="footer-link block py-1 text-sm"
              >
                {l.label}
              </a>
            ))}
          </FooterCol>

          <FooterCol title={t("colAvailability")}>
            <p className="text-sm leading-relaxed" style={{ color: "var(--dark-text-2)" }}>
              {t("availability")}
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--dark-text-3)" }}>{siteConfig.location}</p>
          </FooterCol>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: "var(--dark-border)" }}>
          <p className="text-xs font-mono" style={{ color: "var(--dark-text-3)" }}>
            © {new Date().getFullYear()} {siteConfig.name}. {t("built")}
          </p>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--dark-text-3)" }}>
            {locale === "es" ? "Español" : "English"}
          </p>
        </div>
      </div>

      <style>{`.footer-link{color:var(--dark-text-3);transition:color .2s}.footer-link:hover{color:var(--dark-text-1)}`}</style>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-mono uppercase tracking-[0.18em] mb-4" style={{ color: "var(--dark-text-3)" }}>
        {title}
      </p>
      <div className="-my-1">{children}</div>
    </div>
  );
}
