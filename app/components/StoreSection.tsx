"use client";

import { useMemo, useState } from "react";
import { CATEGORY_LABELS, templates, type FilterCategory } from "@/lib/templates";
import { Container } from "./Container";
import { FilterChips } from "./FilterChips";
import { Hero } from "./Hero";
import { TemplateCard } from "./TemplateCard";
import { TemplateSearch } from "./TemplateSearch";

export function StoreSection() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return templates.filter((template) => {
      const matchesCategory =
        activeCategory === "all" || template.category === activeCategory;

      if (!normalizedQuery) return matchesCategory;

      const haystack = [
        template.name,
        CATEGORY_LABELS[template.category],
        template.category,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && haystack.includes(normalizedQuery);
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="templates" className="pb-section-sm pt-10 md:pb-section md:pt-14">
      <Container>
        <Hero />

        <div
          className="mt-12 flex flex-wrap items-center gap-3"
          data-reveal="blur-in"
        >
          <FilterChips
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <TemplateSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="mt-8">
          {filteredTemplates.length > 0 ? (
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              data-reveal="scale-stagger"
            >
              {filteredTemplates.map((template) => (
                <div key={template.slug} data-reveal-item>
                  <TemplateCard template={template} />
                </div>
              ))}
            </div>
          ) : (
            <p className="py-12 text-sm text-muted">
              No templates match your search. Try a different keyword or category.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
