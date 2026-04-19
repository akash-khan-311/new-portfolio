"use client";

import useLenis from "@/hooks/useLenis";
import AOSWrapper from "./AOSWrapper";
import MainNavbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import MobileNav from "@/components/ui/MobileNav";
import { navItems } from "@/data/navItems";

const ClientWraper = ({ children }: { children: React.ReactNode }) => {
  useLenis();
  return (
    <AOSWrapper>
      <header>
        <MainNavbar navItems={navItems} />
        <MobileNav navItems={navItems} />
      </header>
      <main>{children}</main>
      {/* <Footer /> */}
      <Footer />
    </AOSWrapper>
  );
};

export default ClientWraper;
