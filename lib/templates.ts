export type TemplateCategory = "dental" | "wellness" | "real-estate" | "agency";

export type Template = {
  slug: string;
  name: string;
  category: TemplateCategory;
  price: number;
  thumbnail: string;
};

export type FilterCategory = "all" | TemplateCategory;

export const TEMPLATE_CATEGORIES: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "dental", label: "Dental" },
  { id: "wellness", label: "Wellness" },
  { id: "real-estate", label: "Real estate" },
  { id: "agency", label: "Agency" },
];

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  dental: "Dental",
  wellness: "Wellness",
  "real-estate": "Real estate",
  agency: "Agency",
};

export const templates: Template[] = [
  {
    slug: "bright-smile-dental",
    name: "Bright Smile",
    category: "dental",
    price: 149,
    thumbnail: "/templates/bright-smile.jpg",
  },
  {
    slug: "pure-dental",
    name: "Pure Dental",
    category: "dental",
    price: 149,
    thumbnail: "/templates/pure-dental.jpg",
  },
  {
    slug: "serene-wellness",
    name: "Serene Wellness",
    category: "wellness",
    price: 149,
    thumbnail: "/templates/serene-wellness.jpg",
  },
  {
    slug: "vitality-spa",
    name: "Vitality Spa",
    category: "wellness",
    price: 149,
    thumbnail: "/templates/vitality-spa.jpg",
  },
  {
    slug: "cornerstone-realty",
    name: "Cornerstone Realty",
    category: "real-estate",
    price: 149,
    thumbnail: "/templates/cornerstone-realty.jpg",
  },
  {
    slug: "urban-homes",
    name: "Urban Homes",
    category: "real-estate",
    price: 149,
    thumbnail: "/templates/urban-homes.jpg",
  },
  {
    slug: "studio-agency",
    name: "Studio Agency",
    category: "agency",
    price: 149,
    thumbnail: "/templates/studio-agency.jpg",
  },
  {
    slug: "craft-digital",
    name: "Craft Digital",
    category: "agency",
    price: 149,
    thumbnail: "/templates/craft-digital.jpg",
  },
  {
    slug: "harmony-dental",
    name: "Harmony Dental",
    category: "dental",
    price: 149,
    thumbnail: "/templates/harmony-dental.jpg",
  },
];
