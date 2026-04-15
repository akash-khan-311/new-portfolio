"use client";

import useLenis from "@/hooks/useLenis";

import dynamic from "next/dynamic";
import AOSWrapper from "./AOSWrapper";
import MainNavbar from "@/components/Navbar";

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
            <MainNavbar />
          </header>
      <main>{children}</main>
      {/* <Footer /> */}
    </AOSWrapper>
  );
};

export default ClientWraper;
