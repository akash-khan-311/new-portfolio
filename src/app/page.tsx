import CurvedLoop from "@/components/CurvedLoop";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import HeroSection from "@/components/sections/HeroSection";
import Projects from "@/components/sections/Projects";
const items = [
  { name: "Web Development ✦︎", icon: "" },
  { name: "Software Engineer ✦︎", icon: "" },
  { name: "Web Design ✦︎", icon: "" },
  { name: "Website Maintance ✦", icon: "" },
  { name: "Leadership ✦︎", icon: "" },
  { name: "Mentoring ✦︎", icon: "" },
  { name: "Shopify Development ✦︎", icon: "" },
];

export default async function Home() {
  return (
    <>
      <section id="home" className="relative">
        <HeroSection />
        <div className="mt-24">
          <CurvedLoop
            items={items}
            className="text-[#cbd5e1] dark:text-[#3a3a3a] text-3xl md:text-4xl lg:text-5xl capitalize font-bold  "
          />
        </div>
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </>
  );
}
