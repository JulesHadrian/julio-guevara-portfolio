import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Impact from "@/components/sections/Impact";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Impact />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
