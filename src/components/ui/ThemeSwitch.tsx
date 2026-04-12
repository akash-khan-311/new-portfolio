"use client";

import {
  ThemeAnimationType,
  useModeAnimation,
} from "react-theme-switch-animation";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function AppThemeSwitch() {
  const [mounted, setMounted] = useState(false);

  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    duration: 500,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode, mounted]);

  //  Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle theme"
      className="cursor-pointer z-50"
      ref={ref}
      onClick={toggleSwitchTheme}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
}