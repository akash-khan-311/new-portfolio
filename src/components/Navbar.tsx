"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";

import AppThemeSwitch from "@/components/ui/ThemeSwitch";
import { usePathname } from "next/navigation";

type NavItems = {
  name: string;
  link: string;
};
type Props = {
  navItems: NavItems[];
};

export default function MainNavbar({ navItems }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/login");
  return (
    <div
      className={`${(isAdmin || isLogin) && "hidden md:hidden"} relative w-full hidden md:block`}
    >
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
