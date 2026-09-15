import { Shell } from "@/components/layout/shell";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Ticker } from "@/components/sections/ticker";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Architecture } from "@/components/sections/architecture";
import { ExperienceSection } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Shell>
        <Hero />
        <Ticker />
        <About />
        <Work />
        <Architecture />
        <ExperienceSection />
        <Skills />
        <Contact />
      </Shell>
      <Footer />
    </>
  );
}
