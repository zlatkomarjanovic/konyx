import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  try {
    const contents = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of contents.split(/\r?\n/)) {
      if (!line || line.startsWith("#") || !line.includes("=")) continue;
      const index = line.indexOf("=");
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();
      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env.local is optional when vars are already exported
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "bnw13vog";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-18";

if (!token) {
  console.error("Missing SANITY_API_TOKEN");
  process.exit(1);
}

const categories = [
  { slug: "templates", title: "Templates", sortOrder: 1, previewKey: "templates" },
  { slug: "shaders", title: "Shaders", sortOrder: 2, previewKey: "shaders" },
  { slug: "components", title: "Components", sortOrder: 3, previewKey: "components" },
  { slug: "prompts", title: "Prompts", sortOrder: 4, previewKey: "prompts" },
  { slug: "skills", title: "Skills", sortOrder: 5, previewKey: "skills" },
  { slug: "images", title: "Images", sortOrder: 6, previewKey: "images" },
  { slug: "gradients", title: "Gradients", sortOrder: 7, previewKey: "gradients" },
];

const products = [
  {
    slug: "bright-smile-dental",
    name: "Bright Smile",
    description:
      "A calm dental landing page with trust-first layout, services, and booking sections ready to reskin.",
    categories: ["templates"],
    price: 149,
  },
  {
    slug: "serene-wellness",
    name: "Serene Wellness",
    description:
      "Soft wellness studio template with programs, testimonials, and a polished multi-page flow.",
    categories: ["templates"],
    price: 149,
  },
  {
    slug: "studio-agency",
    name: "Studio Agency",
    description:
      "Creative agency site with case studies, services, and a portfolio grid built for fast client delivery.",
    categories: ["templates"],
    price: 149,
  },
  {
    slug: "aurora-mesh",
    name: "Aurora Mesh",
    description:
      "Animated aurora gradient mesh for hero backgrounds and landing page atmosphere.",
    categories: ["shaders"],
    price: 49,
  },
  {
    slug: "glass-noise",
    name: "Glass Noise",
    description:
      "Subtle grain and glass blur shader pairing for cards, navbars, and overlay panels.",
    categories: ["shaders"],
    price: 49,
  },
  {
    slug: "pricing-toggle",
    name: "Pricing Toggle",
    description:
      "Monthly and annual pricing toggle with animated state and accessible keyboard support.",
    categories: ["components"],
    price: 29,
  },
  {
    slug: "testimonial-stack",
    name: "Testimonial Stack",
    description:
      "Stacked testimonial cards with avatar, quote, and name layout you can drop into any section.",
    categories: ["components"],
    price: 29,
  },
  {
    slug: "reskin-kit-dental",
    name: "Dental Reskin Kit",
    description:
      "Cursor prompts tuned for dental sites: copy, palette swaps, and section rewrites without layout drift.",
    categories: ["prompts"],
    price: 39,
  },
  {
    slug: "section-swap-kit",
    name: "Section Swap Kit",
    description:
      "Prompt workflows for swapping hero, pricing, and FAQ blocks while keeping spacing intact.",
    categories: ["prompts"],
    price: 39,
  },
  {
    slug: "nextjs-architect",
    name: "Next.js Architect",
    description:
      "Agent skill for structuring App Router pages, components, and Tailwind tokens the right way.",
    categories: ["skills"],
    price: 59,
  },
  {
    slug: "brand-reskin",
    name: "Brand Reskin",
    description:
      "Skill for applying client brand colors, typography, and voice across a template without slop.",
    categories: ["skills"],
    price: 59,
  },
  {
    slug: "hero-photo-pack",
    name: "Hero Photo Pack",
    description:
      "Curated hero imagery for local business, wellness, and studio sites with consistent crop ratios.",
    categories: ["images"],
    price: 35,
  },
  {
    slug: "texture-grain-set",
    name: "Texture Grain Set",
    description:
      "Light grain overlays and paper textures for backgrounds that feel designed, not generated.",
    categories: ["images"],
    price: 35,
  },
  {
    slug: "dusk-gradient-set",
    name: "Dusk Gradient Set",
    description:
      "Warm dusk gradients for heroes, CTAs, and card accents across light and dark layouts.",
    categories: ["gradients"],
    price: 19,
  },
  {
    slug: "clinical-gradient-set",
    name: "Clinical Gradient Set",
    description:
      "Clean blue and mint gradients for healthcare, dental, and professional service brands.",
    categories: ["gradients"],
    price: 19,
  },
];

function categoryRef(slug) {
  return {
    _type: "reference",
    _ref: `category-${slug}`,
    _key: slug,
  };
}

const mutations = [
  ...categories.map((category) => ({
    createOrReplace: {
      _id: `category-${category.slug}`,
      _type: "category",
      title: category.title,
      slug: { _type: "slug", current: category.slug },
      sortOrder: category.sortOrder,
      previewKey: category.previewKey,
    },
  })),
  ...products.map((product) => ({
    createOrReplace: {
      _id: `product-${product.slug}`,
      _type: "product",
      name: product.name,
      slug: { _type: "slug", current: product.slug },
      description: product.description,
      categories: product.categories.map(categoryRef),
      price: product.price,
      published: true,
    },
  })),
];

const response = await fetch(
  `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mutations }),
  },
);

if (!response.ok) {
  const text = await response.text();
  console.error(`Sanity seed failed (${response.status}): ${text}`);
  process.exit(1);
}

const result = await response.json();
console.log(
  `Seeded ${categories.length} categories and ${products.length} products to Sanity (${projectId}/${dataset}).`,
);
console.log(JSON.stringify(result, null, 2));
