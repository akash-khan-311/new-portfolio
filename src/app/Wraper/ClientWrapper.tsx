"use client";

import useLenis from "@/hooks/useLenis";

import { IoHomeOutline } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { PiTelegramLogo } from "react-icons/pi";
import AOSWrapper from "./AOSWrapper";
import MainNavbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import MobileNav from "@/components/ui/MobileNav";
import { navItems } from "@/data/navItems";

// const Footer = dynamic(() => import("@/components/modules/Footer/Footer"), {
//   ssr: false,
// });

// const AOSWrapper = dynamic(() => import("@/components/ui/Wraper/AOSWraper"), {
//   ssr: false,
// });


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
