"use client";
import SectionMiniTitle from "@/components/SectionMiniTitle";
import BlurText from "@/components/BlurText";
import Image from "next/image";
import Link from "next/link";
import CircularText from "@/components/CircularText";
import { ArrowUpRight } from "lucide-react";
import CurvedLoop from "@/components/CurvedLoop";
import { useFetcher } from "@/hooks/useFetcher";
import { highlightWord } from "@/helpers/highlightWord";
import ResumeButton from "../ui/ResumeButton";
export default function AboutSection() {
  const { data } = useFetcher("about");
  const { data: skills } = useFetcher("skill");

  const { heading, title, image } = data || {};

  return (
    <>
      <div className="my-36">
        <div className="container mx-auto md:px-0 px-3">
          <>
            <SectionMiniTitle
              text=" About Me"
              speed={2}
              delay={0}
              className="w-full text-center flex justify-center items-center my-14"
              color="#57ea61"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
          </>
          <span
            data-aos="fade"
            data-aos-offset="0"
            data-aos-duration="300"
            data-aos-easing="ease-in-out-sine"
            data-aos-delay="200"
            data-aos-once="true"
          >
            <BlurText
              text={
                heading ||
                "I'm Md Akash Ali, a passionate MERN Stack Developer who helps businesses build fast, responsive, and user-friendly web applications. I work with React, Next.js, Node.js, and MongoDB to deliver clean, optimized, and production-ready solutions tailored to client needs."
              }
              delay={220}
              animateBy="words"
              direction="top"
              className="text-lg md:text-lg lg:text-xl font-light mb-8 max-w-6xl mx-auto text-center flex justify-center items-center leading-relaxed"
            />
          </span>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-10 ">
            {/* Image */}
            <div className="relative  ">
              <div className="h-full  overflow-hidden rounded-b-full ">
                <Image
                  alt="Akash Ali"
                  src={image || "/images/about.png"}
                  width={400}
                  height={600}
                  className="aspect-3/4 h-full w-full object-cover transition duration-300 hover:scale-[1.015]"
                />
                <div className="absolute bottom-0 right-0">
                  <Link
                    className=" relative group  "
                    href={
                      "https://wa.me/8801719681150?text=Hello%20Akash,%20I%20am%20interested%20in%20your%20services."
                    }
                    target="_blank"
                  >
                    {" "}
                    <CircularText
                      text="let's talk•let's talk•let's talk•"
                      onHover="slowDown"
                      spinDuration={10}
                      className="relative leading-relaxed font-normal uppercase text-gray-700 text-sm dark:text-gray-400 "
                    />
                    <div className="w-12 h-12 border border-gray-400 z-50 rounded-full absolute top-[50%] left-[50%] bottom-[50%] translate-y-[-50%] translate-x-[-50%]">
                      <ArrowUpRight className="absolute top-[50%] left-[50%] bottom-[50%] translate-y-[-50%] translate-x-[-50%] z-100 text-gray-500  transition-all duration-300 group-hover:rotate-45" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {/* title and descriptions*/}
            <div className="lg:w-3/4">
              <h2 className="lg:w-3/4 dark:text-white text-5xl md:text-6xl lg:text-7xl font-semibold lg:leading-20 md:leading-18 leading-14 font-clash">
                {title
                  ? highlightWord(title, "MERN Developer", "gradient-text")
                  : "Passionate MERN Stack Developer"}
              </h2>
              <p className="text-balance py-10">
                I build fast, scalable, and user-focused web applications using
                React, Next.js, Node.js, and MongoDB. My focus is on clean
                architecture, performance optimization, and creating seamless
                digital experiences that deliver real value.
              </p>
              <ResumeButton />
            </div>
          </div>
        </div>
        <div className="my-20 ">
          <CurvedLoop
            items={skills}
            className="rounded-full py-3 px-8 dark:bg-[#141419] bg-white text-sm mx-2 font-satoshi"
          />
        </div>
      </div>
    </>
  );
}
