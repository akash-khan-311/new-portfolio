"use client";

import AOSWrapper from "./AOSWrapper";
import MainNavbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import MobileNav from "@/components/ui/MobileNav";
import { navItems } from "@/data/navItems";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

const ClientWraper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AOSWrapper>
        <header>
          <MainNavbar navItems={navItems} />
          <MobileNav navItems={navItems} />
        </header>
        <main>{children}</main>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1A1A2E",
              color: "#fff",
              border: "1px solid #7C3AED",
            },
          }}
        />
        {/* <Footer /> */}
        <Footer />
      </AOSWrapper>
    </ThemeProvider>
  );
};

export default ClientWraper;
