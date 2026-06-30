"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { siteConfig } from "@/lib/config";

const inputClass = "w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors duration-200";
const inputStyle: React.CSSProperties = {
  backgroundColor: "var(--surface)",
  borderColor: "var(--border)",
  color: "var(--text-1)",
};

function Field({
  as, label, id, ...props
}: {
  as?: "textarea";
  label: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const onFocus = (e: React.FocusEvent<HTMLElement>) => { e.target.style.borderColor = "var(--accent)"; };
  const onBlur = (e: React.FocusEvent<HTMLElement>) => { e.target.style.borderColor = "var(--border)"; };

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-3)" }}>
        {label}
      </label>
      {as === "textarea"
        ? <textarea id={id} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} className={`${inputClass} resize-none`} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        : <input id={id} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} className={inputClass} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />}
    </div>
  );
}

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(form.message);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("success");
    } catch { setStatus("error"); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field id="contact-name" label={t("nameLabel")} type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: (e.target as HTMLInputElement).value })} placeholder={t("namePlaceholder")} />
      <Field id="contact-email" label={t("emailLabel")} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: (e.target as HTMLInputElement).value })} placeholder={t("emailPlaceholder")} />
      <Field id="contact-message" label={t("messageLabel")} as="textarea" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: (e.target as HTMLTextAreaElement).value })} placeholder={t("messagePlaceholder")} />

      {status === "success" && <p className="text-sm" style={{ color: "var(--metric)" }}>{t("successMsg")}</p>}
      {status === "error" && <p className="text-sm" style={{ color: "var(--destructive)" }}>{t("errorMsg")}</p>}

      <button type="submit" disabled={status === "sending"} className="btn-accent w-full py-3.5 px-6 rounded-lg text-sm disabled:opacity-50 cursor-pointer">
        {status === "sending" ? t("sending") : t("submitBtn")} →
      </button>
    </form>
  );
}
