import Link from "next/link";
import React from "react";

const socials: { label: string; href: string }[] = [
  { label: "LINKEDIN", href: "#" },
  { label: "GITHUB", href: "#" },
  { label: "INSTAGRAM", href: "#" },
  { label: "GMAIL", href: "#" },
];
export default function HeroSection() {
  return (
    <section className=" min-h-[90vh] flex flex-col justify-between  font-sans antialiased">
      <div className="flex flex-1 flex-col justify-center pb-10">
        {/* Top: Greeting */}
        <div className="flex items-center gap-2">
          <span className="text-lg select-none">👋</span>
          <span className="text-primary text-sm tracking-wide">
            Hey! It&apos;s me Akash.
          </span>
        </div>
        <h1 className=" text-white text-5xl md:text-6xl lg:text-7xl font-semibold lg:leading-20 md:leading-18 leading-14 ">
          Building{" "}
          <span className="text-[#87e63b]">
            web apps
            <br className="hidden sm:block" />
            that are fast
          </span>{" "}
          on the server,
          <br />
          beautiful on the screen.
        </h1>
        <div className="border-t border-[#2a2a2a] py-6 mt-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          {/* Social Links */}
          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
            aria-label="Social links"
          >
            {socials.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="group flex items-center gap-1 text-[#aaaaaa] hover:text-white transition-colors duration-200 text-[0.7rem] font-bold tracking-[0.12em]"
              >
                {label}
                <span className="inline-block -rotate-45 opacity-60 group-hover:opacity-100 transition-opacity duration-200 text-[0.65rem]">
                  ↗
                </span>
              </Link>
            ))}
          </nav>

          {/* Tagline + CTA */}
          <div className="flex flex-col items-start sm:items-end gap-4 sm:max-w-sm">
            <p className="text-[#aaaaaa] text-sm leading-relaxed sm:text-right">
              I work with brands globally to build pixel-perfect, engaging, and
              accessible digital experiences that drive results and achieve
              business goals.
            </p>
            <a
              href="#"
              className="inline-block px-8 py-3 border border-white rounded-full text-white text-sm font-semibold tracking-wide hover:bg-white hover:text-[#111111] transition-all duration-200 whitespace-nowrap"
            >
              Know me better
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
