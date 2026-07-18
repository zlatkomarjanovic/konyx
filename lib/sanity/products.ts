import type { ProductCategory, Template } from "../catalog";
import type { TemplateCategory } from "../templates";
import { client } from "./client";
import { CATEGORIES_QUERY, PRODUCTS_QUERY } from "./queries";

type SanityCategory = {
  _id: string;
  title: string;
  slug: string;
  sortOrder?: number;
  previewKey: string;
};

type SanityProduct = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  polarProductId?: string;
  polarCheckoutUrl?: string;
  demoUrl?: string;
  features?: string[];
  thumbnail?: string;
  categories?: SanityCategory[];
};

const PREVIEW_KEYS = new Set<string>([
  "templates",
  "shaders",
  "components",
  "prompts",
  "skills",
  "images",
  "gradients",
]);

function parsePreviewKey(value: string): TemplateCategory {
  return PREVIEW_KEYS.has(value) ? (value as TemplateCategory) : "templates";
}

function mapCategory(category: SanityCategory): ProductCategory | null {
  if (!category.slug || !category.title) {
    return null;
  }

  return {
    id: category._id,
    slug: category.slug,
    title: category.title,
    sortOrder: category.sortOrder ?? 0,
    previewKey: parsePreviewKey(category.previewKey),
  };
}

function resolveThumbnail(product: SanityProduct, slug: string) {
  if (product.thumbnail) {
    return product.thumbnail;
  }

  return `/templates/${slug}.jpg`;
}

function mapProduct(product: SanityProduct): Template | null {
  const categories = (product.categories ?? [])
    .map(mapCategory)
    .filter((category): category is ProductCategory => category !== null);

  if (!product.slug || !product.name || !product.description || categories.length === 0) {
    return null;
  }

  return {
    slug: product.slug,
    name: product.name,
    description: product.description,
    categories,
    price: product.price ?? 0,
    thumbnail: resolveThumbnail(product, product.slug),
    polarProductId: product.polarProductId || undefined,
    polarCheckoutUrl: product.polarCheckoutUrl || undefined,
    demoUrl: product.demoUrl || undefined,
    features: product.features?.filter(Boolean),
  };
}

export async function fetchCategoriesFromSanity(): Promise<ProductCategory[]> {
  const records = await client.withConfig({ useCdn: false }).fetch<SanityCategory[]>(
    CATEGORIES_QUERY,
    {},
    { next: { revalidate: 120, tags: ["categories", "products"] } },
  );

  return records
    .map(mapCategory)
    .filter((category): category is ProductCategory => category !== null);
}

export async function fetchProductsFromSanity(): Promise<Template[]> {
  const records = await client.withConfig({ useCdn: false }).fetch<SanityProduct[]>(
    PRODUCTS_QUERY,
    {},
    { next: { revalidate: 120, tags: ["products", "categories"] } },
  );

  return records
    .map(mapProduct)
    .filter((product): product is Template => product !== null);
}
