import JsonLd from "@/components/JsonLd";
import SynapseHero from "@/components/home/SynapseHero";
import ManifestoTeaser from "@/components/home/ManifestoTeaser";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import Pillars from "@/components/home/Pillars";
import Process from "@/components/home/Process";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <JsonLd />
      <SynapseHero />
      <ManifestoTeaser />
      <FeaturedWorks />
      <Pillars />
      <Process />
      <FinalCta />
    </>
  );
}
