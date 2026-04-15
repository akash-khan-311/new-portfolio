import React from "react";
import SectionMiniTitle from "../SectionMiniTitle";
import SectionTitle from "../ui/SectionTitle";
import AccordionSection from "../ui/Accordion";

const experienceData = [
  {
    image: "/images/codernest.jpg",
    title: "Frontend Developer",
    company: "CoderNest It Foundation",
    startDate: "Jun 2025",
    endDate: "Jun 2025",
    descriptions:
      "Working on building and maintaining scalable web applications using React.js/Next.js, focusing on clean code, performance, and modern user experiences.",
  },
  {
    image: "/images/matrimony.png",
    title: "Backend Develoepr",
    company: "Matrimony Ltd",
    startDate: "Jun 2025",
    endDate: "Jul 2025",
    descriptions:
      "Fixed backend errors and improved performance.Built and integrated multiple REST APIs.",
  },
  {
    image: "/images/techjpg.jpg",
    title: "Full Stack Software Engineer (MERN)",
    company: "TechOrbit IT",
    startDate: "Sept 2025",
    endDate: "Feb 2026",
    descriptions:
      "Working on building and maintaining scalable web applications using MERN/Next.js stack, focusing on clean code, performance, and modern user experiences.",
  },
];

export default function Experience() {
  return (
    <section className="container mx-auto px-3 md:px-0">
      <div className="flex flex-col md:flex-row justify-center ">
        <div className="max-w-xl">
          <SectionMiniTitle
            text="work history"
            speed={2}
            delay={0}
            className=""
            color="#57ea61"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
          <SectionTitle text="Experience" />
          <p className="text-balance">
            I have worked with some of the most innovative industry leaders to
            help build their top-notch products.
          </p>
        </div>
        <AccordionSection items={experienceData} />
      </div>
    </section>
  );
}
