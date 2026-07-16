import type { ReactNode } from "react";

type SectionTagProps = {
  children: ReactNode;
  className?: string;
};

export function SectionTag({ children, className = "" }: SectionTagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground ${className}`}
    >
      {children}
    </span>
  );
}
