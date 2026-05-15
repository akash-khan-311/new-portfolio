import { useFetcher } from "@/hooks/useHero";

import Link from "next/link";
import React from "react";
import { FiGithub, FiFacebook, FiLinkedin, FiInstagram } from "react-icons/fi";

export default function Social({ size = "lg" }: { size?: string }) {
  const { data, isLoading } = useFetcher("social");
  const socials = data?.socials || [];
  console.log("SOCIAL LINKS:", socials);

  return (
    <div
      className="flex flex-wrap items-center gap-x-6 gap-y-3"
      aria-label="Social links"
    >
      {socials.map(({ name, url }: { name: string; url: string }) => (
        <Link
          key={name}
          href={url}
          className="group  uppercase flex items-center gap-1 text-[#aaaaaa] dark:hover:text-white hover:text-black transition-colors duration-200 text-[0.7rem] font-bold tracking-[0.12em]"
        >
          {name.toLowerCase() === "facebook" ? (
            <FiFacebook className={`text-${size}`} />
          ) : name.toLowerCase() === "github" ? (
            <FiGithub className={`text-${size}`} />
          ) : name.toLowerCase() === "linkedin" ? (
            <FiLinkedin className={`text-${size}`} />
          ) : name.toLowerCase() === "instagram" ? (
            <FiInstagram className={`text-${size}`} />
          ) : null}
        </Link>
      ))}
    </div>
  );
}
