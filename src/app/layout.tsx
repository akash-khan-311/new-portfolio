import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MainNavbar from "@/components/Navbar";
import ThemeGuard from "./Provider/ThemeGuard";
import AOSProvider from "./Provider/AOSProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const space = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Md Akash Ali",
  description: "Software Engineer (MERN)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${space.variable}  dark:bg-[#111111] h-full`}>
      <body className="min-h-full flex flex-col">
        <ThemeGuard />
        <AOSProvider>
          <header>
            <MainNavbar />
          </header>
          <main className="">{children}</main>
        </AOSProvider>
      </body>
    </html>
  );
}
