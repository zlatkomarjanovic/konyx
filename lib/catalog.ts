import type { TemplateCategory } from "./templates";

export type ProductCategory = {
  id: string;
  slug: string;
  title: string;
  sortOrder: number;
  previewKey: TemplateCategory;
};

export type Template = {
  slug: string;
  name: string;
  description: string;
  categories: ProductCategory[];
  price: number;
  thumbnail: string;
  polarProductId?: string;
  polarCheckoutUrl?: string;
  features?: string[];
  demoUrl?: string;
};

export type FilterCategory = string;

export const DEFAULT_FILTER_CATEGORY = "templates";

export type CatalogFilter = {
  id: FilterCategory;
  label: string;
};

export function getPrimaryCategory(template: Template): ProductCategory | undefined {
  return template.categories[0];
}

export function getPreviewCategory(template: Template): TemplateCategory {
  return getPrimaryCategory(template)?.previewKey ?? "templates";
}

export function productMatchesCategory(template: Template, activeCategory: FilterCategory) {
  return template.categories.some((category) => category.slug === activeCategory);
}

export function buildCatalogFilters(categories: ProductCategory[]): CatalogFilter[] {
  return categories.map((category) => ({
    id: category.slug,
    label: category.title,
  }));
}
