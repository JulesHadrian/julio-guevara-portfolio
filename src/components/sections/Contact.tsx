"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { siteConfig } from "@/lib/config";

const inputStyle: React.CSSProperties = {
  backgroundColor: "var(--surface)",
  borderColor: "var(--border)",
  color: "var(--text-1)",
};

function Field({ as, label, ...props }: { as?: "textarea"; label: string } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const baseClass = "w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors duration-200";

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.target as HTMLElement).style.borderColor = "var(--accent)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.target as HTMLElement).style.borderColor = "var(--border)";
  };

  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-4)" }}>
        {label}
      </label>
      {as === "textarea"
        ? <textarea {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} className={`${baseClass} resize-none`} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
        : <input    {...(props as React.InputHTMLAttributes<HTMLInputElement>)}       className={baseClass}                  style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
      }
    </div>
  );
}

export default function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body    = encodeURIComponent(form.message);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("success");
    } catch { setStatus("error"); }
  };

  const linkStyle: React.CSSProperties = { color: "var(--text-3)" };
  const iconStyle: React.CSSProperties = { backgroundColor: "var(--surface)", borderColor: "var(--border)" };

  return (
    <section id="contact" className="px-6 py-24 border-t transition-colors duration-200" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <SectionLabel>{t("label")}</SectionLabel>
            <h2 className="font-bold leading-tight mb-5" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: "var(--text-1)" }}>
              {t("headline")}
            </h2>
            <p className="leading-relaxed mb-10 text-base" style={{ color: "var(--text-3)" }}>
              {t("subheadline")}
            </p>

            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "var(--text-4)" }}>
              {t("orDivider")}
            </p>

            <div className="space-y-4">
              {[
                { href: `mailto:${siteConfig.email}`,   icon: "✉",  label: siteConfig.email },
                { href: siteConfig.linkedin, icon: "in", label: siteConfig.linkedin.replace("https://www.", "") },
                { href: siteConfig.github,   icon: "GH", label: siteConfig.github.replace("https://", "") },
              ].map(({ href, icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors duration-200 theme-toggle group"
                  style={linkStyle}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center border text-xs font-mono transition-colors duration-200" style={iconStyle}>
                    {icon}
                  </span>
                  {label}
                </a>
              ))}

              <a
                href={siteConfig.resumeEn}
                download
                className="flex items-center gap-3 text-sm transition-colors duration-200 group"
                style={{ color: "var(--accent-s)" }}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors duration-200"
                  style={{ backgroundColor: "var(--accent-bg)", borderColor: "var(--border-strong)" }}
                >
                  ↓
                </span>
                {t("downloadResume")}
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label={t("nameLabel")} type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: (e.target as HTMLInputElement).value })} placeholder={t("namePlaceholder")} />
              <Field label={t("emailLabel")} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: (e.target as HTMLInputElement).value })} placeholder={t("emailPlaceholder")} />
              <Field as="textarea" label={t("messageLabel")} required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: (e.target as HTMLTextAreaElement).value })} placeholder={t("messagePlaceholder")} />

              {status === "success" && <p className="text-sm" style={{ color: "var(--metric)" }}>{t("successMsg")}</p>}
              {status === "error"   && <p className="text-sm" style={{ color: "#F87171" }}>{t("errorMsg")}</p>}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-accent w-full py-3 px-6 rounded-lg text-sm font-semibold disabled:opacity-50"
              >
                {status === "sending" ? t("sending") : t("submitBtn")} →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
