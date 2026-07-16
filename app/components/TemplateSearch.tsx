"use client";

import { Search } from "lucide-react";

type TemplateSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TemplateSearch({ value, onChange }: TemplateSearchProps) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        strokeWidth={1.5}
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search templates…"
        className="h-12 w-full rounded-lg border border-border bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-foreground/30"
        aria-label="Search templates"
      />
    </div>
  );
}
