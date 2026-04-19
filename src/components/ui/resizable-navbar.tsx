"use client";

import { navItems } from "@/data/navItems";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";

import React, { useState, useMemo } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
}

//////////////////////////////////////////////////
// 🔥 NAVBAR
//////////////////////////////////////////////////

export const Navbar = ({ children, className }: NavbarProps) => {
  const [visible, setVisible] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 10);
  });

  return (
    <motion.div className={cn("fixed top-1 z-90 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

//////////////////////////////////////////////////
// 🔥 NAV BODY
//////////////////////////////////////////////////

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible ? "0 0 24px rgba(0,0,0,0.1)" : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
        border: visible ? "1px solid #b5ff6d" : "none",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 40,
      }}
      className={cn(
        "relative z-50 mx-auto hidden w-full container items-center justify-between rounded-full px-4 py-2 lg:flex",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

//////////////////////////////////////////////////
//  NAV ITEMS
//////////////////////////////////////////////////

export const NavItems = ({ items, className }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const sectionIds = useMemo(
    () => navItems.map((link) => link.link.replace("#", "")),
    [],
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
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 items-center justify-center gap-5 text-sm font-medium lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => {
        const id = item.link.replace("#", "");

        return (
          <button
            key={idx}
            onMouseEnter={() => setHovered(idx)}
            onClick={() => handleNavClick(item.link)}
            className={`relative flex items-center gap-2 px-4 py-1 text-sm cursor-pointer ${activeId === id && "bg-gray-100 dark:bg-neutral-800"} text-black dark:text-white rounded-full`}
          >
            {/* Hover BG */}
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 rounded-full bg-gray-100 dark:bg-neutral-800"
              />
            )}

            {/* Active dot */}
            {activeId === id && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b5ff6d] opacity-75" />
                <span className="relative inline-flex h-full w-full rounded-full bg-[#b5ff6d]" />
              </span>
            )}

            <span className="relative z-20">{item.name}</span>
          </button>
        );
      })}
    </motion.div>
  );
};

//////////////////////////////////////////////////
//  LOGO
//////////////////////////////////////////////////

export const NavbarLogo = () => {
  return (
    <Link
      href="#"
      className="relative z-20 mr-4 flex items-center px-2 py-1 font-bold"
    >
      <span className="text-xl uppercase text-black dark:text-primary">
        Akash
      </span>
    </Link>
  );
};
