/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import Link from "next/link";
import React, { useMemo, useState } from "react";
type NavItems = {
  name: string;
  link: string;
  icon?: any;
};
type Props = {
  navItems: NavItems[];
};
export default function MobileNav({ navItems }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  const sectionIds = useMemo(
    () => navItems.map((link) => link.link.replace("#", "")),
    [navItems],
  );

  const activeId = useScrollSpy(sectionIds, 120);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <nav className="flex-center fixed right-0 bottom-0 left-0 z-90 w-full sm:hidden">
      <ul className="border-bg-700 bg-backdrop text-text-secondary flex w-full justify-evenly rounded-t-3xl border-t shadow backdrop-blur-md">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const id = item.link.replace("#", "");
          return (
            <li key={idx}>
              <button
                onMouseEnter={() => setHovered(idx)}
                onClick={() => handleNavClick(item.link)}
                className={`${activeId === id ? "text-[#b5ff6d]" : ""} p-4 cursor-pointer`}
              >
                <span className="flex flex-col items-center justify-center gap-1 text-text-primary">
                  {Icon && <Icon className="text-2xl" />}
                  <span className="text-xs">{item.name}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
