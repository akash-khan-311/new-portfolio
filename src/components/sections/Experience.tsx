"use client";
import React from "react";
import SectionMiniTitle from "@/components/SectionMiniTitle";

import AccordionSection from "@/components/ui/Accordion";
import SectionTitle from "@/components/SectionTitle";
import { useFetcher } from "@/hooks/useFetcher";
import ExperienceSkeleton from "../ui/Skeleton/ExperienceSkeleton";

export default function Experience() {
  const { data: experiences, isLoading } = useFetcher("experience");
  return (
    <div className="container mx-auto px-3 md:px-0 lg:pb-36 md:pb-24 pb-20">
      <div className="flex flex-col lg:flex-row justify-between ">
        <div className="max-w-xl text-center lg:text-left">
          <SectionMiniTitle
            text="work history"
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
            text="Experience"
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
        {isLoading ? (
          <ExperienceSkeleton />
        ) : (
          <AccordionSection items={experiences} />
        )}
      </div>
    </div>
  );
}
