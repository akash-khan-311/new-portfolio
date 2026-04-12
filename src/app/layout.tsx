import type { Metadata } from "next";
import {   Geist, Geist_Mono,Space_Grotesk } from "next/font/google";
import "./globals.css";
import MainNavbar from "@/components/Navbar";
import ThemeGuard from "./Provider/ThemeGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const space = Space_Grotesk({
  variable: "--font-space_grotesk",
  subsets: ["latin"],
})



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
    <html
      lang="en"
      className={`${space.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <ThemeGuard />
        <header>
          <MainNavbar/>
        </header>
        <main className="max-w-7xl mx-auto md:px-0 px-3">
        {children}
        </main>
        </body>
    </html>
  );
}
