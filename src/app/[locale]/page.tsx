import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/JsonLd";
import SynapseHero from "@/components/home/SynapseHero";
import KeywordMarquee from "@/components/layout/KeywordMarquee";
import ManifestoTeaser from "@/components/home/ManifestoTeaser";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import Pillars from "@/components/home/Pillars";
import Process from "@/components/home/Process";
import FinalCta from "@/components/home/FinalCta";

export default async function Home() {
  const t = await getTranslations("home");
  const keywords = t.raw("keywords") as string[];

  return (
    <>
      <JsonLd />
      <SynapseHero />
      <KeywordMarquee keywords={keywords} />
      <ManifestoTeaser />
      <FeaturedWorks />
      <Pillars />
      <Process />
      <FinalCta />
    </>
  );
}
