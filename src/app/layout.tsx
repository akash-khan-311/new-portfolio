import type { Metadata } from "next";
import "./globals.css";

import ThemeGuard from "./Provider/ThemeGuard";

import ClientWraper from "./Wraper/ClientWrapper";

import localFont from "next/font/local";

const clashDisplay = localFont({
  src: [
    {
      path: "../fonts/ClashDisplay-Medium.woff2",
      weight: "600",
    },
  ],
  variable: "--font-clash",
});

const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Regular.woff2",
      weight: "400",
    },
  ],
  variable: "--font-satoshi",
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
      className={`${clashDisplay.className} ${satoshi.className}  dark:bg-[#111111] bg-gray-200  h-full overflow-x-hidden`}
    >
      <body className="relative">
        <ThemeGuard />
        <ClientWraper>{children}</ClientWraper>
      </body>
    </html>
  );
}
