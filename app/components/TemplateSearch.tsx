"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type TemplateSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TemplateSearch({ value, onChange }: TemplateSearchProps) {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!expanded) return;

    const timer = window.setTimeout(() => inputRef.current?.focus(), 300);
    return () => window.clearTimeout(timer);
  }, [expanded]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !value.trim()
      ) {
        setExpanded(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && expanded) {
        onChange("");
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded, onChange, value]);

  return (
    <div
      ref={containerRef}
      className={`relative ml-auto box-border h-11 shrink-0 rounded-lg border bg-card transition-[width,border-color,background-color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        expanded
          ? "w-72 border-accent"
          : "w-11 border-border hover:border-foreground/20"
      }`}
    >
      <Search
        className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-500 ${
          expanded ? "text-accent" : "text-muted"
        }`}
        strokeWidth={1.5}
      />

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search templates…"
        tabIndex={expanded ? 0 : -1}
        aria-hidden={!expanded}
        className={`absolute inset-0 h-full w-full rounded-lg bg-transparent pl-10 pr-4 text-sm text-foreground placeholder:text-muted outline-none transition-opacity duration-300 ${
          expanded
            ? "pointer-events-auto opacity-100 delay-200"
            : "pointer-events-none opacity-0"
        }`}
        aria-label="Search templates"
      />

      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="absolute inset-0 cursor-pointer rounded-lg"
          aria-label="Search templates"
        />
      )}
    </div>
  );
}
