import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hospital: {
          primary: "#D94F70",
          primaryHover: "#C43C5E",
          primaryActive: "#B02E4E",
          light: "#FCECEF",
          bg: "#FFF7F8",
          dark: "#252525",
          secondary: "#6B6B6B",
          border: "#F0DDE1",
          subtle: "#F9ECEF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(217, 79, 112, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        card: "0 10px 30px -4px rgba(217, 79, 112, 0.06), 0 4px 12px -2px rgba(0, 0, 0, 0.03)",
        focus: "0 0 0 3px rgba(217, 79, 112, 0.25)",
      },
      animation: {
        fadeIn: "fadeIn 200ms ease-out forwards",
        scaleIn: "scaleIn 180ms ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
