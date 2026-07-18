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
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-18";

const query = encodeURIComponent(`
{
  "categories": *[_type == "category" && defined(slug.current)] | order(sortOrder asc, title asc) { title, "slug": slug.current },
  "products": *[_type == "product" && published != false && defined(slug.current)] | order(name asc) {
    name,
    "slug": slug.current,
    "categories": categories[]->title
  }
}
`);

const response = await fetch(
  `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`,
);

if (!response.ok) {
  console.error(`Sanity query failed (${response.status})`);
  process.exit(1);
}

const data = await response.json();
const categories = data.result?.categories ?? [];
const products = data.result?.products ?? [];

console.log(`Sanity catalog OK (${projectId}/${dataset})`);
console.log(`Categories: ${categories.length}`);
categories.forEach((category) => {
  console.log(`- ${category.title} (${category.slug})`);
});

console.log(`Published products: ${products.length}`);
products.forEach((product) => {
  const labels = product.categories?.join(", ") || "Uncategorized";
  console.log(`- ${product.name} (${product.slug}) → ${labels}`);
});

if (categories.length === 0 || products.length === 0) {
  console.error("Missing categories or published products.");
  process.exit(1);
}
