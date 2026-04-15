import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import ThemeGuard from "./Provider/ThemeGuard";

import ClientWraper from "./Wraper/ClientWrapper";




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
    <html
      lang="en"
      className={`${space.variable} dark:bg-[#111111] bg-gray-200  h-full overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeGuard />
        <ClientWraper>{children}</ClientWraper>
      </body>
    </html>
  );
}
