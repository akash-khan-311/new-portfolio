"use client";
import React, { useState } from "react";
import SectionMiniTitle from "../SectionMiniTitle";
import SectionTitle from "../SectionTitle";
import Image from "next/image";

// Social Icons as inline SVGs
const LinkedInIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
    />
    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth={1.8} />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      ry="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    />
    <polyline
      points="22,6 12,13 2,6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
    />
  </svg>
);

const MailInputIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    />
    <polyline
      points="22,6 12,13 2,6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const socialLinks = [
  { icon: <LinkedInIcon />, href: "#", label: "LinkedIn" },
  { icon: <GitHubIcon />, href: "#", label: "GitHub" },
  { icon: <InstagramIcon />, href: "#", label: "Instagram" },
  { icon: <MailIcon />, href: "#", label: "Email" },
  { icon: <TwitterIcon />, href: "#", label: "Twitter" },
];

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container mx-auto px-3 md:px-0 lg:pb-36 md:pb-24 pb-20">
      <div className="flex flex-col lg:flex-row justify-center ">
        <div className="">
          <SectionMiniTitle
            text="Connect With Me"
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
            text="Let's start a project together"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold  my-3 font-clash "
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* LEFT — Form */}
            <div className="flex flex-col gap-6">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className=" dark:text-white text-gray-900 text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full  border bg-white dark:bg-transparent dark:border-[#2e2e2e] border-gray-300 rounded-xl px-4 py-3  dark:text-white text-gray-900 text-sm outline-none focus:border-[#87e63b] transition-colors duration-200 placeholder-[#555]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className=" dark:text-white text-gray-900 text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full bg-white dark:bg-transparent border  dark:border-[#2e2e2e] border-gray-300 rounded-xl px-4 py-3 pr-12  dark:text-white text-gray-900 text-sm outline-none focus:border-[#87e63b] transition-colors duration-200 placeholder-[#555]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555]">
                    <MailInputIcon />
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className=" dark:text-white text-gray-900 text-sm font-medium">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder=""
                    className="w-full bg-white dark:bg-transparent border  dark:border-[#2e2e2e] border-gray-300 rounded-xl px-4 py-3 dark:text-white text-gray-900 text-sm outline-none focus:border-[#87e63b] transition-colors duration-200 placeholder-[#555] resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <div>
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-white dark:bg-white text-[#111111] font-semibold text-sm rounded-full hover:bg-[#87e63b] transition-colors duration-200 whitespace-nowrap"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* RIGHT — Card */}
            <div className="bg-white dark:bg-[#111116]  rounded-2xl p-8 flex flex-col gap-6">
              {/* Available badge */}
              <div className="flex">
                <span className="flex items-center mb-4 gap-2 rounded-full bg-[#B5FF6D]/10 px-4 py-2">
                  <span className="relative flex h-1.5 w-1.5 ">
                    <span className="bg-[#b5ff6d] absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                    <span className="bg-[#b5ff6d] relative inline-flex h-full w-full rounded-full" />
                  </span>

                  <p className="text-sm">Availabel for Work</p>
                </span>
              </div>

              {/* Avatar */}
              <div className="w-20 h-20 rounded-full p-2 overflow-hidden border-2 dark:border-[#2e2e2e] border-gray-300">
                <Image
                  width={100}
                  height={100}
                  src="/images/contact.png"
                  alt="Akash"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Bio text */}
              <p className=" dark:text-[#aaaaaa] text-gray-600 text-sm leading-relaxed">
                My inbox is always open. Whether you have a project or just want
                to say Hi. I would love to hear from you. Feel free to contact
                me and I&apos;ll get back to you.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-5 flex-wrap">
                {socialLinks.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className=" dark:text-[#aaaaaa] text-gray-500 hover:text-white dark:hover:text-white transition-colors duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
