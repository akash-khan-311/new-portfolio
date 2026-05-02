import React from "react";
import SectionTitle from "@/components/SectionTitle";
import SectionMiniTitle from "@/components/SectionMiniTitle";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  return (
    <div className="container mx-auto px-3 md:px-0 lg:pb-36 md:pb-24 pb-20">
      <div className="flex flex-col lg:flex-row justify-center ">
        <div className="w-full lg:w-1/2">
          <div className="max-w-xl text-center lg:text-left sticky top-10">
            <SectionMiniTitle
              text="My Work"
              speed={2}
              delay={0}
              className="text-center md:text-left flex lg:justify-start justify-center lg:items-center "
              color="#57ea61"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
            <SectionTitle
              text="Projects"
              className="text-3xl md:text-4xl lg:text-5xl font-semibold  my-3 font-clash"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
            <p className="text-balance">
              I have worked with some of the most innovative industry leaders to
              help build their top-notch products.
            </p>
          </div>
        </div>
        {/* Project lists */}
        <div className="">
          <div className="flex flex-col gap-6">
            {projects.slice(0, 4).map((project, index) => (
              <div
                id={`sticky-card-${index + 1}`}
                key={index}
                className="sticky-card w-full mx-auto  sticky"
              >
                <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-500">
                  <ProjectCard project={project} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
