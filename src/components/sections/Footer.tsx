import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";
import SectionTitle from "../SectionTitle";
import Button from "../ui/Button";

const socialLinks = [
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  {
    icon: IoMdMail,
    href: "mailto:mdakashkhanbdinto@gmail.com",
    label: "Email",
  },
];

const fullYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full ">
      <div className="container mx-auto px-3 md:px-0  ">
        <div className="dark:bg-[#111116] bg-white py-20 rounded-2xl">
          <div className="flex flex-col items-center max-w-lg mx-auto ">
            <div className="flex items-center mb-4 gap-2 rounded-full bg-[#B5FF6D]/10 px-4 py-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="bg-[#b5ff6d] absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-[#b5ff6d] relative inline-flex h-full w-full rounded-full" />
              </span>

              <p className="text-sm">Availabel for Work</p>
            </div>
            <div className="space-y-5">
              <SectionTitle
                text="Let's create your next big idea."
                className="text-3xl md:text-4xl lg:text-5xl font-semibold my-3 py-3 font.clash"
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
              <div className="flex justify-center">
                <Button href="#contact">Contact Me</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Side - Copyright Text */}
          <p className="text-sm md:text-base text-gray-400 dark:text-gray-500 text-center md:text-left order-2 md:order-1">
            © {fullYear} Akash Ali. All rights reserved.
          </p>

          {/* Right Side - Social Icons */}
          <div className="flex items-center gap-5 order-1 md:order-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-500 hover:text-white dark:hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
