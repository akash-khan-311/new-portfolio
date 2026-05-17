"use client";
import React, { useState } from "react";
import SectionMiniTitle from "@/components/SectionMiniTitle";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import Social from "../ui/Social";

// Social Icons as inline SVGs

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
                  className="px-8 py-3 gradient-border cursor-pointer font-semibold text-sm rounded-full whitespace-nowrap"
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
                <Social />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
