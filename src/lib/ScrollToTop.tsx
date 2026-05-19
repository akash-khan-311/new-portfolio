"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed bottom-6 right-6
        animate-bounce
        z-50
        cursor-pointer
        w-12 h-12
        rounded-full
        bg-black/80 hover:bg-black
        text-white
        flex items-center justify-center
        shadow-lg
        border border-white/10
        transition-all duration-300
      "
    >
      <ArrowUp size={20} />
    </button>
  );
}
