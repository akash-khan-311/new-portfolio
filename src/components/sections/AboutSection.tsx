import React from "react";
import SectionMiniTitle from "../SectionMiniTitle";
import BlurText from "../BlurText";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import CircularText from "../CircularText";
import { ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  return (
    <>
      <section>
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
            text="I'm Md Akash Ali, a passionate MERN Stack Developer who helps businesses build fast, responsive, and user-friendly web applications. I work with React, Next.js, Node.js, and MongoDB to deliver clean, optimized, and production-ready solutions tailored to client needs."
            delay={220}
            animateBy="words"
            direction="top"
            className="text-3xl mb-8 max-w-6xl mx-auto text-center flex justify-center items-center leading-relaxed"
          />
        </span>
        <div className="flex justify-center items-center gap-10">
          {/* Image */}
          <div className="relative w-full sm:w-1/2">
            <div className="h-full w-full overflow-hidden rounded-b-full ">
              <Image
                alt="Akash Ali"
                src={"/images/about.png"}
                width={400}
                height={600}
                className="aspect-3/4 h-full w-full object-cover transition duration-300 hover:scale-[1.015]"
              />
              <Link href={"/contact"}>
                <div className="group bg-white dark:bg-[#111116] absolute right-0 bottom-0 grid aspect-square h-fit w-[40%] place-content-center rounded-full p-3 shadow">
                  {" "}
                  <CircularText
                    text="let's talk•let's talk•let's talk•"
                    onHover="slowDown"
                    spinDuration={10}
                    className="relative leading-relaxed font-normal uppercase text-gray-700 text-sm dark:text-gray-400 "
                  />
                  <div className="w-20 h-20 border border-gray-400 rounded-full absolute top-[50%] left-[50%] bottom-[50%] translate-y-[-50%] translate-x-[-50%]">
                    <ArrowUpRight className="absolute top-[50%] left-[50%] bottom-[50%] translate-y-[-50%] translate-x-[-50%] z-100 text-gray-500  transition-all duration-300 group-hover:rotate-45" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* title and descriptions*/}
          <div>
            <h2 className="dark:text-white text-5xl md:text-6xl lg:text-7xl font-semibold lg:leading-20 md:leading-18 leading-14">
              A Creative <br className="hidden sm:block" />{" "}
              <span className="text-[#87e63b]">MERN Developer</span> & UI
              Experience Builder
            </h2>
            <p className="text-balance py-10">
              I build fast, scalable, and user-focused web applications using
              React, Next.js, Node.js, and MongoDB. My focus is on clean
              architecture, performance optimization, and creating seamless
              digital experiences that deliver real value.
            </p>
            <div>
              <Button text="Resume" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
