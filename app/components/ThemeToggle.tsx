"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const OUTER_W = 48;
const OUTER_H = 26;
const INSET = 1;
const INNER_W = OUTER_W - INSET * 2;
const INNER_H = OUTER_H - INSET * 2;
const KNOB = INNER_H - INSET * 2;
const TRAVEL = INNER_W - INSET * 2 - KNOB;

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  if (!mounted) {
    return (
      <div
        className="rounded-full bg-surface"
        style={{ width: OUTER_W, height: OUTER_H }}
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative shrink-0 rounded-full transition-[background-color,transform] duration-500 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
      style={{
        width: OUTER_W,
        height: OUTER_H,
        padding: INSET,
        backgroundColor: isDark ? "#27272a" : "#eef1f5",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          inset: INSET,
          background: isDark
            ? "radial-gradient(circle at 72% 35%, rgba(147,197,253,0.12), transparent 72%)"
            : "radial-gradient(circle at 28% 35%, rgba(251,191,36,0.14), transparent 72%)",
        }}
      />

      <span
        className="relative block"
        style={{ width: INNER_W, height: INNER_H }}
      >
        <span className="absolute inset-0 grid grid-cols-2">
          <span className="flex items-center justify-center">
            <Sun
              style={{
                width: 10,
                height: 10,
                opacity: isDark ? 0.5 : 0,
                color: "#fbbf24",
              }}
              strokeWidth={2.25}
            />
          </span>
          <span className="flex items-center justify-center">
            <Moon
              style={{
                width: 10,
                height: 10,
                opacity: isDark ? 0 : 0.5,
                color: "#94a3b8",
              }}
              strokeWidth={2.25}
            />
          </span>
        </span>

        <span
          aria-hidden
          className="absolute flex items-center justify-center rounded-full transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            top: INSET,
            left: INSET,
            width: KNOB,
            height: KNOB,
            transform: isDark ? `translateX(${TRAVEL}px)` : "translateX(0)",
            background: isDark
              ? "linear-gradient(to bottom, #5b6470, #52525b)"
              : "linear-gradient(to bottom, #ffffff, #f4f4f5)",
          }}
        >
          {isDark ? (
            <Moon style={{ width: 10, height: 10, color: "#e0f2fe" }} strokeWidth={2.5} />
          ) : (
            <Sun style={{ width: 10, height: 10, color: "#f59e0b" }} strokeWidth={2.5} />
          )}
        </span>
      </span>
    </button>
  );
}
