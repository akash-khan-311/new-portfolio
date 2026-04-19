import React from "react";
import SectionMiniTitle from "../SectionMiniTitle";
import BlurText from "../BlurText";
import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";
import CircularText from "../CircularText";
import { ArrowUpRight } from "lucide-react";
import CurvedLoop from "../CurvedLoop";

const items = [
  { label: "HTML", image: "/images/html.png" },
  { label: "CSS", image: "/images/css.png" },
  { label: "Bootstrap", image: "/images/boostrap.png" },
  { label: "Taiwlind CSS", image: "/images/tailwind.png" },
  { label: "JavaScript", image: "/images/javascript.png" },
  { label: "TypeScript", image: "/images/typescript.png" },
  { label: "React.js", image: "/images/react.png" },
  { label: "Next.js", image: "/images/nextjs.png" },
  { label: "Node.js", image: "/images/nodejs.png" },
  { label: "Express.js", image: "/images/express.png" },
  { label: "MongoDB", image: "/images/mongodb.png" },
  { label: "Mongoose", image: "/images/mongoose.png" },
  { label: "Framer Motion", image: "/images/motion.png" },
  { label: "GSAP", image: "/images/gsap.png" },
  { label: "Shopify", image: "/images/shopify.png" },
  { label: "Git", image: "/images/git.png" },
  { label: "Firebase", image: "/images/firebase.png" },
];

export default function AboutSection() {
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
              text="I'm Md Akash Ali, a passionate MERN Stack Developer who helps businesses build fast, responsive, and user-friendly web applications. I work with React, Next.js, Node.js, and MongoDB to deliver clean, optimized, and production-ready solutions tailored to client needs."
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
                  src={"/images/about.png"}
                  width={400}
                  height={600}
                  className="aspect-3/4 h-full w-full object-cover transition duration-300 hover:scale-[1.015]"
                />
                <div className="absolute bottom-0 right-0">
                  <Link className=" relative group  " href={"/contact"}>
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
            <div className="">
              <h2 className="dark:text-white text-5xl md:text-6xl lg:text-7xl font-semibold lg:leading-20 md:leading-18 leading-14 font-clash">
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
        </div>
        <div className="my-20 ">
          <CurvedLoop
            items={items}
            className="rounded-full py-3 px-8 dark:bg-[#141419] bg-white text-sm mx-2 font-satoshi"
          />
        </div>
      </div>
    </>
  );
}
