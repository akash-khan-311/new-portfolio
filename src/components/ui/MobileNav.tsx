/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React from "react";
type NavItems = {
  name: string;
  link: string;
  icon?: any;
};
type Props = {
  navItems: NavItems[];
};
export default function MobileNav({ navItems }: Props) {
  return (
    <nav className="flex-center fixed right-0 bottom-0 left-0 z-50 w-full sm:hidden">
      <ul className="border-bg-700 bg-backdrop text-text-secondary flex w-full justify-evenly rounded-t-3xl border-t shadow backdrop-blur-md">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <li key={idx} className="p-4">
              <Link
                className="flex flex-col items-center justify-center gap-1 text-text-primary"
                href={item.link}
              >
                {Icon && <Icon />}
                <span className="text-xs">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
