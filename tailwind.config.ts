import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#2563eb",
          dark: "#1d4ed8",
          foreground: "#ffffff",
        },
        surface: {
          DEFAULT: "#f4f6f9",
          secondary: "#eef1f5",
        },
        muted: {
          DEFAULT: "#71717a",
          foreground: "#52525b",
        },
        card: {
          DEFAULT: "var(--card)",
        },
        border: {
          DEFAULT: "var(--border)",
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
