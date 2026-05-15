import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        satoshi: ["var(--font-satoshi)"],
        clash: ["var(--font-clash)"],
      },
      colors: {
        primary: {
          DEFAULT: "#7C3AED", // Vibrant Purple
          dark: "#5B21B6",
          light: "#A78BFA",
        },
        secondary: {
          DEFAULT: "#06B6D4", // Cyan
          dark: "#0891B2",
        },
        accent: {
          DEFAULT: "#F59E0B", // Amber
          pink: "#EC4899",
        },
        dark: {
          DEFAULT: "#0F0F1E",
          light: "#1A1A2E",
          card: "#16213E",
        },
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { "box-shadow": "0 0 20px rgba(124, 58, 237, 0.5)" },
          "100%": { "box-shadow": "0 0 40px rgba(124, 58, 237, 0.8)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(135deg, #7C3AED 0%, #06B6D4 50%, #EC4899 100%)",
      },
    },
  },
};
export default config;
