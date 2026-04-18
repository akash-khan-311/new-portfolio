import CurvedLoop from "@/components/CurvedLoop";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";

import HeroSection from "@/components/sections/HeroSection";
import Projects from "@/components/sections/Projects";

const items = [
  { label: "Web Development ✦︎", image: "" },
  { label: "Software Engineer ✦︎", image: "" },
  { label: "Web Design ✦︎", image: "" },
  { label: "Website Maintance ✦", image: "" },
  { label: "Leadership ✦︎", image: "" },
  { label: "Mentoring ✦︎", image: "" },
  { label: "Shopify Development ✦︎", image: "" },
];
export default function Home() {
  return (
    <>
      <div className="container mx-auto md:px-0 px-3 relative">
        <HeroSection />
      </div>
      <div className="mt-24">
        <CurvedLoop
          items={items}
          className="text-[#cbd5e1] dark:text-[#3a3a3a] text-3xl md:text-4xl lg:text-5xl capitalize font-bold  "
        />
      </div>
      <AboutSection />
      <Experience />
      <Projects />
      <ContactSection />
    </>
  );
}
