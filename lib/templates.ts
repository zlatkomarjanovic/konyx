import type { ProductCategory, Template } from "./catalog";

export type TemplateCategory =
  | "templates"
  | "shaders"
  | "components"
  | "prompts"
  | "skills"
  | "images"
  | "gradients";

export type { Template };

export const STATIC_CATEGORIES: ProductCategory[] = [
  { id: "templates", slug: "templates", title: "Templates", sortOrder: 1, previewKey: "templates" },
  { id: "shaders", slug: "shaders", title: "Shaders", sortOrder: 2, previewKey: "shaders" },
  { id: "components", slug: "components", title: "Components", sortOrder: 3, previewKey: "components" },
  { id: "prompts", slug: "prompts", title: "Prompts", sortOrder: 4, previewKey: "prompts" },
  { id: "skills", slug: "skills", title: "Skills", sortOrder: 5, previewKey: "skills" },
  { id: "images", slug: "images", title: "Images", sortOrder: 6, previewKey: "images" },
  { id: "gradients", slug: "gradients", title: "Gradients", sortOrder: 7, previewKey: "gradients" },
];

export function staticCategory(slug: TemplateCategory): ProductCategory {
  const category = STATIC_CATEGORIES.find((item) => item.slug === slug);
  if (!category) {
    throw new Error(`Unknown static category: ${slug}`);
  }
  return category;
}

/** Dev/fallback catalog only. Production should load from Sanity via getCatalog(). */
export const templates: Template[] = [
  {
    slug: "bright-smile-dental",
    name: "Bright Smile",
    description:
      "A calm dental landing page with trust-first layout, services, and booking sections ready to reskin.",
    categories: [staticCategory("templates")],
    price: 149,
    thumbnail: "/templates/bright-smile.jpg",
  },
  {
    slug: "serene-wellness",
    name: "Serene Wellness",
    description:
      "Soft wellness studio template with programs, testimonials, and a polished multi-page flow.",
    categories: [staticCategory("templates")],
    price: 149,
    thumbnail: "/templates/serene-wellness.jpg",
  },
  {
    slug: "studio-agency",
    name: "Studio Agency",
    description:
      "Creative agency site with case studies, services, and a portfolio grid built for fast client delivery.",
    categories: [staticCategory("templates")],
    price: 149,
    thumbnail: "/templates/studio-agency.jpg",
  },
  {
    slug: "aurora-mesh",
    name: "Aurora Mesh",
    description:
      "Animated aurora gradient mesh for hero backgrounds and landing page atmosphere.",
    categories: [staticCategory("shaders")],
    price: 49,
    thumbnail: "/templates/aurora-mesh.jpg",
  },
  {
    slug: "glass-noise",
    name: "Glass Noise",
    description:
      "Subtle grain and glass blur shader pairing for cards, navbars, and overlay panels.",
    categories: [staticCategory("shaders")],
    price: 49,
    thumbnail: "/templates/glass-noise.jpg",
  },
  {
    slug: "pricing-toggle",
    name: "Pricing Toggle",
    description:
      "Monthly and annual pricing toggle with animated state and accessible keyboard support.",
    categories: [staticCategory("components")],
    price: 29,
    thumbnail: "/templates/pricing-toggle.jpg",
  },
  {
    slug: "testimonial-stack",
    name: "Testimonial Stack",
    description:
      "Stacked testimonial cards with avatar, quote, and name layout you can drop into any section.",
    categories: [staticCategory("components")],
    price: 29,
    thumbnail: "/templates/testimonial-stack.jpg",
  },
  {
    slug: "reskin-kit-dental",
    name: "Dental Reskin Kit",
    description:
      "Cursor prompts tuned for dental sites: copy, palette swaps, and section rewrites without layout drift.",
    categories: [staticCategory("prompts")],
    price: 39,
    thumbnail: "/templates/reskin-kit-dental.jpg",
  },
  {
    slug: "section-swap-kit",
    name: "Section Swap Kit",
    description:
      "Prompt workflows for swapping hero, pricing, and FAQ blocks while keeping spacing intact.",
    categories: [staticCategory("prompts")],
    price: 39,
    thumbnail: "/templates/section-swap-kit.jpg",
  },
  {
    slug: "nextjs-architect",
    name: "Next.js Architect",
    description:
      "Agent skill for structuring App Router pages, components, and Tailwind tokens the right way.",
    categories: [staticCategory("skills")],
    price: 59,
    thumbnail: "/templates/nextjs-architect.jpg",
  },
  {
    slug: "brand-reskin",
    name: "Brand Reskin",
    description:
      "Skill for applying client brand colors, typography, and voice across a template without slop.",
    categories: [staticCategory("skills")],
    price: 59,
    thumbnail: "/templates/brand-reskin.jpg",
  },
  {
    slug: "hero-photo-pack",
    name: "Hero Photo Pack",
    description:
      "Curated hero imagery for local business, wellness, and studio sites with consistent crop ratios.",
    categories: [staticCategory("images")],
    price: 35,
    thumbnail: "/templates/hero-photo-pack.jpg",
  },
  {
    slug: "texture-grain-set",
    name: "Texture Grain Set",
    description:
      "Light grain overlays and paper textures for backgrounds that feel designed, not generated.",
    categories: [staticCategory("images")],
    price: 35,
    thumbnail: "/templates/texture-grain-set.jpg",
  },
  {
    slug: "dusk-gradient-set",
    name: "Dusk Gradient Set",
    description:
      "Warm dusk gradients for heroes, CTAs, and card accents across light and dark layouts.",
    categories: [staticCategory("gradients")],
    price: 19,
    thumbnail: "/templates/dusk-gradient-set.jpg",
  },
  {
    slug: "clinical-gradient-set",
    name: "Clinical Gradient Set",
    description:
      "Clean blue and mint gradients for healthcare, dental, and professional service brands.",
    categories: [staticCategory("gradients")],
    price: 19,
    thumbnail: "/templates/clinical-gradient-set.jpg",
  },
];
