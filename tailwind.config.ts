import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#2563eb",
          foreground: "#ffffff",
        },
        surface: {
          DEFAULT: "#f9f9f8",
          secondary: "#f4f4f2",
        },
        muted: {
          DEFAULT: "#71717a",
          foreground: "#52525b",
        },
        border: {
          DEFAULT: "#e8e8e6",
        },
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
      },
      maxWidth: {
        container: "90rem",
      },
    },
  },
};

export default config;
