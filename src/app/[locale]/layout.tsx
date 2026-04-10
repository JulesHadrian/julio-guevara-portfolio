import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs
    ? `${siteConfig.name} — Desarrollador de Software y Especialista en CRO`
    : `${siteConfig.name} — Software Developer & CRO Specialist`;

  const description = isEs
    ? "Portafolio de Julio Adrián Guevara — Desarrollador de Software y Especialista en CRO con 8+ años de experiencia en Shopify, pruebas A/B y optimización de conversión."
    : "Portfolio of Julio Adrián Guevara — Software Developer & CRO Specialist with 8+ years in Shopify, A/B testing, and conversion optimization. CVR doubled to 1.2%. 4+ experiments/week.";

  return {
    title,
    description,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    metadataBase: new URL(siteConfig.domain),
    alternates: {
      canonical: `${siteConfig.domain}/${locale}`,
      languages: {
        en: `${siteConfig.domain}/en`,
        es: `${siteConfig.domain}/es`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.domain}/${locale}`,
      siteName: siteConfig.name,
      locale: isEs ? "es_MX" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
