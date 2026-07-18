"use client";

import type { CatalogFilter, FilterCategory } from "@/lib/catalog";

type FilterChipsProps = {
  filters: CatalogFilter[];
  activeCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
};

export function FilterChips({
  filters,
  activeCategory,
  onCategoryChange,
}: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((category) => {
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "border border-border bg-card text-muted hover:border-foreground/20 hover:text-foreground"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
