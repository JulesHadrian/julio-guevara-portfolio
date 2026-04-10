import { siteConfig } from "@/lib/config";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Software Developer & CRO Specialist",
    url: siteConfig.domain,
    email: siteConfig.email,
    sameAs: [siteConfig.linkedin, siteConfig.github],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guadalajara",
      addressRegion: "Jalisco",
      addressCountry: "MX",
    },
    knowsAbout: [
      "Shopify",
      "CRO",
      "A/B Testing",
      "JavaScript",
      "TypeScript",
      "React",
      "Laravel",
      "MySQL",
      "Intelligems",
      "Conversion Rate Optimization",
    ],
    knowsLanguage: ["Spanish", "English"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
