import CurvedLoop from "@/components/CurvedLoop";
import ScrollVelocity from "@/components/ScrollVelocity";
import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const items = [
  "Web Development",
  "Software Engineering",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "Development",
  "Mentoring",
  "Leadership",
  "Collaboration",
  "Full Stack",
  "Node.js",
  "Shopify Development",
];
export default function Home() {
  return (
    <>
      <div className="container mx-auto md:px-0 px-3">
        <HeroSection />
      </div>
      <CurvedLoop items={items} />
      <div className="container mx-auto md:px-0 px-3">
       <AboutSection/>
      </div>
    </>
  );
}
