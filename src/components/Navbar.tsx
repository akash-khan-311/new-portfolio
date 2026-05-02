"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";

import AppThemeSwitch from "@/components/ui/ThemeSwitch";

type NavItems = {
  name: string;
  link: string;
};
type Props = {
  navItems: NavItems[];
};

export default function MainNavbar({ navItems }: Props) {
  return (
    <div className=" relative w-full hidden md:block">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4 relative">
            <AppThemeSwitch />
          </div>
        </NavBody>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
