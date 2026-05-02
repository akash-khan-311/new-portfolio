import Link from "next/link";
import Button from "@/components/ui/Button";

const socials: { label: string; href: string }[] = [
  { label: "LINKEDIN", href: "#" },
  { label: "GITHUB", href: "#" },
  { label: "INSTAGRAM", href: "#" },
  { label: "GMAIL", href: "#" },
];
export default function HeroSection() {
  return (
    <div className="lg:pt-48 md:pt-32 pt-20 container mx-auto md:px-0 px-3 relative flex flex-col justify-between  font-sans antialiased ">
      <div className="flex flex-1 flex-col justify-center">
        {/* Top: Greeting */}
        <div
          data-aos="fade"
          data-aos-offset="0"
          data-aos-duration="300"
          data-aos-easing="ease-in-out-sine"
          data-aos-delay="0"
          data-aos-once="true"
          className="flex items-center gap-2 "
        >
          <span className="text-lg select-none">👋</span>
          <span className=" text-sm tracking-wide ">
            Hey! It&apos;s me Akash.
          </span>
        </div>
        <h1
          data-aos="fade"
          data-aos-offset="0"
          data-aos-duration="300"
          data-aos-easing="ease-in-out-sine"
          data-aos-delay="200"
          data-aos-once="true"
          className=" dark:text-white text-5xl md:text-6xl lg:text-7xl font-semibold lg:leading-20 md:leading-18 leading-14 font-clash "
        >
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
        <div
          data-aos="fade"
          data-aos-offset="0"
          data-aos-duration="300"
          data-aos-easing="ease-in-out-sine"
          data-aos-delay="400"
          data-aos-once="true"
          className=" w-full py-6 lg:mt-20 md:mt-14  flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          {/* Tagline + CTA */}

          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10">
            {/* Line */}
            <div className="dark:bg-[#191920] bg-[#e5e7eb] h-px w-full md:mx-w-1/2"></div>
            {/* Text */}
            <div className="w-full md:w-1/2 text-pretty lg:text-right">
              <p className=" text-[#aaaaaa] text-sm leading-relaxed sm:text-right">
                I work with brands globally to build pixel-perfect, engaging,
                and accessible digital experiences that drive results and
                achieve business goals.
              </p>
            </div>
          </div>
        </div>
        <div
          data-aos="fade"
          data-aos-offset="0"
          data-aos-duration="300"
          data-aos-easing="ease-in-out-sine"
          data-aos-delay="600"
          data-aos-once="true"
          className="flex  justify-between gap-2"
        >
          <nav
            className="md:flex hidden flex-wrap items-center gap-x-6 gap-y-3"
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
          <Button className="" href="#contact">
            Know Me better
          </Button>
        </div>
      </div>
    </div>
  );
}
