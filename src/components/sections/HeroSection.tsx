"use client";
import Button from "@/components/ui/CustomButton";
import Badge from "../ui/Badge";
import { motion } from "framer-motion";

import { useFetcher } from "@/hooks/useHero";
import Social from "../ui/Social";
import HeroSkeleton from "../ui/Skeleton/HeroSkeleton";

export default function HeroSection() {
  const { data, isLoading } = useFetcher("hero");
  const { heading, gradientTitle, description } = data || {};
  const splittedHeading = heading ? heading.split(" ") : [];
  const firstWord = splittedHeading[0];
  const remainingWords = splittedHeading.slice(1).join(" ");

  return (
    <>
      <div className="absolute inset-0 grid-bg opacity-40" />

      {isLoading ? (
        <HeroSkeleton />
      ) : (
        <div className="lg:pt-48 md:pt-32 pt-20 container mx-auto md:px-0 px-3 relative flex flex-col justify-between  font-sans antialiased ">
          <div className="flex flex-1 flex-col justify-center">
            {/* Top: Greeting */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 "
            >
              <Badge text="Available for new opportunities" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className=" dark:text-white lg:w-2/3 text-5xl md:text-6xl lg:text-7xl font-semibold lg:leading-20 md:leading-18 leading-14 font-clash "
            >
              {firstWord} <span className="gradient-text">{gradientTitle}</span>{" "}
              {remainingWords}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className=" w-full py-6 lg:mt-20 md:mt-14  flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
            >
              {/* Tagline + CTA */}

              <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10">
                {/* Line */}
                <div className="dark:bg-[#191920] bg-[#e5e7eb] h-px w-full md:mx-w-1/2"></div>
                {/* Text */}
                <div className="w-full md:w-1/2 text-pretty lg:text-right">
                  <p className=" text-[#aaaaaa] text-sm leading-relaxed sm:text-right">
                    {description}
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex  justify-between gap-2"
            >
              <nav
                className="md:flex hidden flex-wrap items-center gap-x-6 gap-y-3"
                aria-label="Social links"
              >
                <Social />
              </nav>
              <Button className="" href="#contact">
                Know Me better
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}
