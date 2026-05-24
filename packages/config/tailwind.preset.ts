import type { Config } from "tailwindcss";

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        background: "#F7F5EF",
        "primary-text": "#2B2B2B",
        accent: "#C2A96A",
        "secondary-text": "#8A8375",
        dark: "#111111",
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        body: ["Manrope", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
};

export default preset;
