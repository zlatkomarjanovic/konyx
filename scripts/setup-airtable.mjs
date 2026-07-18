const token = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID ?? "appVCc0BDAYhPAECj";

if (!token) {
  console.error("Missing AIRTABLE_API_KEY");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const categories = [
  "templates",
  "shaders",
  "components",
  "prompts",
  "skills",
  "images",
  "gradients",
];

const products = [
  {
    slug: "bright-smile-dental",
    name: "Bright Smile",
    description:
      "A calm dental landing page with trust-first layout, services, and booking sections ready to reskin.",
    category: "templates",
    price: 149,
  },
  {
    slug: "serene-wellness",
    name: "Serene Wellness",
    description:
      "Soft wellness studio template with programs, testimonials, and a polished multi-page flow.",
    category: "templates",
    price: 149,
  },
  {
    slug: "studio-agency",
    name: "Studio Agency",
    description:
      "Creative agency site with case studies, services, and a portfolio grid built for fast client delivery.",
    category: "templates",
    price: 149,
  },
  {
    slug: "aurora-mesh",
    name: "Aurora Mesh",
    description:
      "Animated aurora gradient mesh for hero backgrounds and landing page atmosphere.",
    category: "shaders",
    price: 49,
  },
  {
    slug: "glass-noise",
    name: "Glass Noise",
    description:
      "Subtle grain and glass blur shader pairing for cards, navbars, and overlay panels.",
    category: "shaders",
    price: 49,
  },
  {
    slug: "pricing-toggle",
    name: "Pricing Toggle",
    description:
      "Monthly and annual pricing toggle with animated state and accessible keyboard support.",
    category: "components",
    price: 29,
  },
  {
    slug: "testimonial-stack",
    name: "Testimonial Stack",
    description:
      "Stacked testimonial cards with avatar, quote, and name layout you can drop into any section.",
    category: "components",
    price: 29,
  },
  {
    slug: "reskin-kit-dental",
    name: "Dental Reskin Kit",
    description:
      "Cursor prompts tuned for dental sites: copy, palette swaps, and section rewrites without layout drift.",
    category: "prompts",
    price: 39,
  },
  {
    slug: "section-swap-kit",
    name: "Section Swap Kit",
    description:
      "Prompt workflows for swapping hero, pricing, and FAQ blocks while keeping spacing intact.",
    category: "prompts",
    price: 39,
  },
  {
    slug: "nextjs-architect",
    name: "Next.js Architect",
    description:
      "Agent skill for structuring App Router pages, components, and Tailwind tokens the right way.",
    category: "skills",
    price: 59,
  },
  {
    slug: "brand-reskin",
    name: "Brand Reskin",
    description:
      "Skill for applying client brand colors, typography, and voice across a template without slop.",
    category: "skills",
    price: 59,
  },
  {
    slug: "hero-photo-pack",
    name: "Hero Photo Pack",
    description:
      "Curated hero imagery for local business, wellness, and studio sites with consistent crop ratios.",
    category: "images",
    price: 35,
  },
  {
    slug: "texture-grain-set",
    name: "Texture Grain Set",
    description:
      "Light grain overlays and paper textures for backgrounds that feel designed, not generated.",
    category: "images",
    price: 35,
  },
  {
    slug: "dusk-gradient-set",
    name: "Dusk Gradient Set",
    description:
      "Warm dusk gradients for heroes, CTAs, and card accents across light and dark layouts.",
    category: "gradients",
    price: 19,
  },
  {
    slug: "clinical-gradient-set",
    name: "Clinical Gradient Set",
    description:
      "Clean blue and mint gradients for healthcare, dental, and professional service brands.",
    category: "gradients",
    price: 19,
  },
];

async function api(path, options = {}) {
  const response = await fetch(`https://api.airtable.com/v0${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`${response.status} ${path}: ${JSON.stringify(data)}`);
  }

  return data;
}

async function getProductsTableId() {
  const data = await api(`/meta/bases/${baseId}/tables`);
  const table = data.tables.find((item) => item.name === "Products");
  return table?.id ?? null;
}

async function createProductsTable() {
  return api(`/meta/bases/${baseId}/tables`, {
    method: "POST",
    body: JSON.stringify({
      name: "Products",
      description: "Konyx storefront catalog synced to konyx.com",
      fields: [
        { name: "Name", type: "singleLineText" },
        { name: "Slug", type: "singleLineText" },
        { name: "Description", type: "multilineText" },
        {
          name: "Category",
          type: "singleSelect",
          options: {
            choices: categories.map((name) => ({ name })),
          },
        },
        {
          name: "Price",
          type: "number",
          options: { precision: 0 },
        },
        {
          name: "Published",
          type: "checkbox",
          options: { icon: "check", color: "greenBright" },
        },
        { name: "Thumbnail URL", type: "url" },
        {
          name: "Thumbnail",
          type: "multipleAttachments",
        },
        { name: "Polar Product ID", type: "singleLineText" },
        { name: "Polar Checkout URL", type: "url" },
        { name: "Demo URL", type: "url" },
        { name: "Features", type: "multilineText" },
      ],
    }),
  });
}

async function listExistingSlugs(tableName) {
  const slugs = new Set();
  let offset;

  do {
    const params = new URLSearchParams({ pageSize: "100" });
    params.append("fields[]", "Slug");
    if (offset) params.set("offset", offset);

    const data = await api(
      `/${baseId}/${encodeURIComponent(tableName)}?${params}`,
    );

    for (const record of data.records) {
      const slug = record.fields?.Slug;
      if (typeof slug === "string") slugs.add(slug);
    }

    offset = data.offset;
  } while (offset);

  return slugs;
}

async function seedProducts(tableName) {
  const existingSlugs = await listExistingSlugs(tableName);
  const missing = products.filter((product) => !existingSlugs.has(product.slug));

  if (missing.length === 0) {
    console.log("All products already exist in Airtable.");
    return;
  }

  for (let index = 0; index < missing.length; index += 10) {
    const batch = missing.slice(index, index + 10);
    await api(`/${baseId}/${encodeURIComponent(tableName)}`, {
      method: "POST",
      body: JSON.stringify({
        records: batch.map((product) => ({
          fields: {
            Name: product.name,
            Slug: product.slug,
            Description: product.description,
            Category: product.category,
            Price: product.price,
            Published: true,
          },
        })),
      }),
    });
  }

  console.log(`Seeded ${missing.length} products.`);
}

async function main() {
  let tableId = await getProductsTableId();

  if (!tableId) {
    const created = await createProductsTable();
    tableId = created.id;
    console.log(`Created Products table (${tableId}).`);
  } else {
    console.log(`Products table already exists (${tableId}).`);
  }

  await seedProducts("Products");
  console.log("Airtable setup complete.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
