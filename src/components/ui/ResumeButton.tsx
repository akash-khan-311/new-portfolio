"use client";
import { useFetcher } from "@/hooks/useFetcher";
import Link from "next/link";
import React from "react";

export default function ResumeButton() {
  const { data: resume, isLoading } = useFetcher("resume/published");
  if (isLoading) {
    return (
      <div className="relative overflow-hidden px-8 py-2 rounded-full w-35 h-10 bg-gray-200 dark:bg-gray-800 animate-pulse">
        {/* shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
      </div>
    );
  }

  return (
    <Link
      className="cursor-pointer dark:text-white font-semibold overflow-hidden relative z-1 gradient-border hover:bg-[#b5ff6d] duration-300 transition-all group px-8 py-2 rounded-full "
      href={resume?.resumeUrl || "#"}
      target="_blank"
    >
      Resume
    </Link>
  );
}
