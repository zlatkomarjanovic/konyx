export type TemplateCategory =
  | "templates"
  | "shaders"
  | "components"
  | "prompts"
  | "skills"
  | "images"
  | "gradients";

export type Template = {
  slug: string;
  name: string;
  description: string;
  category: TemplateCategory;
  price: number;
  thumbnail: string;
};

export type FilterCategory = "all" | TemplateCategory;

export const TEMPLATE_CATEGORIES: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "templates", label: "Templates" },
  { id: "shaders", label: "Shaders" },
  { id: "components", label: "Components" },
  { id: "prompts", label: "Prompts" },
  { id: "skills", label: "Skills" },
  { id: "images", label: "Images" },
  { id: "gradients", label: "Gradients" },
];

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  templates: "Templates",
  shaders: "Shaders",
  components: "Components",
  prompts: "Prompts",
  skills: "Skills",
  images: "Images",
  gradients: "Gradients",
};

export const templates: Template[] = [
  {
    slug: "bright-smile-dental",
    name: "Bright Smile",
    description:
      "A calm dental landing page with trust-first layout, services, and booking sections ready to reskin.",
    category: "templates",
    price: 149,
    thumbnail: "/templates/bright-smile.jpg",
  },
  {
    slug: "serene-wellness",
    name: "Serene Wellness",
    description:
      "Soft wellness studio template with programs, testimonials, and a polished multi-page flow.",
    category: "templates",
    price: 149,
    thumbnail: "/templates/serene-wellness.jpg",
  },
  {
    slug: "studio-agency",
    name: "Studio Agency",
    description:
      "Creative agency site with case studies, services, and a portfolio grid built for fast client delivery.",
    category: "templates",
    price: 149,
    thumbnail: "/templates/studio-agency.jpg",
  },
  {
    slug: "aurora-mesh",
    name: "Aurora Mesh",
    description:
      "Animated aurora gradient mesh for hero backgrounds and landing page atmosphere.",
    category: "shaders",
    price: 49,
    thumbnail: "/templates/aurora-mesh.jpg",
  },
  {
    slug: "glass-noise",
    name: "Glass Noise",
    description:
      "Subtle grain and glass blur shader pairing for cards, navbars, and overlay panels.",
    category: "shaders",
    price: 49,
    thumbnail: "/templates/glass-noise.jpg",
  },
  {
    slug: "pricing-toggle",
    name: "Pricing Toggle",
    description:
      "Monthly and annual pricing toggle with animated state and accessible keyboard support.",
    category: "components",
    price: 29,
    thumbnail: "/templates/pricing-toggle.jpg",
  },
  {
    slug: "testimonial-stack",
    name: "Testimonial Stack",
    description:
      "Stacked testimonial cards with avatar, quote, and name layout you can drop into any section.",
    category: "components",
    price: 29,
    thumbnail: "/templates/testimonial-stack.jpg",
  },
  {
    slug: "reskin-kit-dental",
    name: "Dental Reskin Kit",
    description:
      "Cursor prompts tuned for dental sites: copy, palette swaps, and section rewrites without layout drift.",
    category: "prompts",
    price: 39,
    thumbnail: "/templates/reskin-kit-dental.jpg",
  },
  {
    slug: "section-swap-kit",
    name: "Section Swap Kit",
    description:
      "Prompt workflows for swapping hero, pricing, and FAQ blocks while keeping spacing intact.",
    category: "prompts",
    price: 39,
    thumbnail: "/templates/section-swap-kit.jpg",
  },
  {
    slug: "nextjs-architect",
    name: "Next.js Architect",
    description:
      "Agent skill for structuring App Router pages, components, and Tailwind tokens the right way.",
    category: "skills",
    price: 59,
    thumbnail: "/templates/nextjs-architect.jpg",
  },
  {
    slug: "brand-reskin",
    name: "Brand Reskin",
    description:
      "Skill for applying client brand colors, typography, and voice across a template without slop.",
    category: "skills",
    price: 59,
    thumbnail: "/templates/brand-reskin.jpg",
  },
  {
    slug: "hero-photo-pack",
    name: "Hero Photo Pack",
    description:
      "Curated hero imagery for local business, wellness, and studio sites with consistent crop ratios.",
    category: "images",
    price: 35,
    thumbnail: "/templates/hero-photo-pack.jpg",
  },
  {
    slug: "texture-grain-set",
    name: "Texture Grain Set",
    description:
      "Light grain overlays and paper textures for backgrounds that feel designed, not generated.",
    category: "images",
    price: 35,
    thumbnail: "/templates/texture-grain-set.jpg",
  },
  {
    slug: "dusk-gradient-set",
    name: "Dusk Gradient Set",
    description:
      "Warm dusk gradients for heroes, CTAs, and card accents across light and dark layouts.",
    category: "gradients",
    price: 19,
    thumbnail: "/templates/dusk-gradient-set.jpg",
  },
  {
    slug: "clinical-gradient-set",
    name: "Clinical Gradient Set",
    description:
      "Clean blue and mint gradients for healthcare, dental, and professional service brands.",
    category: "gradients",
    price: 19,
    thumbnail: "/templates/clinical-gradient-set.jpg",
  },
];
