import {
  buildCatalogFilters,
  type CatalogFilter,
  type ProductCategory,
  type Template,
} from "./catalog";
import { fetchCategoriesFromSanity, fetchProductsFromSanity } from "./sanity/products";
import { isSanityConfigured } from "./sanity/client";
import { STATIC_CATEGORIES, templates } from "./templates";

export type CatalogSource = "sanity" | "static-fallback";

export type Catalog = {
  products: Template[];
  categories: ProductCategory[];
  filters: CatalogFilter[];
};

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function buildStaticCatalog(): Catalog {
  return {
    products: templates,
    categories: STATIC_CATEGORIES,
    filters: buildCatalogFilters(STATIC_CATEGORIES),
  };
}

export function getConfiguredCatalogSource(): CatalogSource {
  return isSanityConfigured() ? "sanity" : "static-fallback";
}

export async function getCatalog(): Promise<Catalog> {
  if (!isSanityConfigured()) {
    if (isProduction()) {
      console.error(
        "[catalog] Sanity env vars missing in production. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
      );
    }
    return buildStaticCatalog();
  }

  try {
    const [products, categories] = await Promise.all([
      fetchProductsFromSanity(),
      fetchCategoriesFromSanity(),
    ]);

    if (products.length > 0 && categories.length > 0) {
      return {
        products,
        categories,
        filters: buildCatalogFilters(categories),
      };
    }

    const message =
      "[catalog] Sanity returned no published products or categories. Check Studio content.";

    if (isProduction()) {
      throw new Error(message);
    }

    console.warn(`${message} Using static catalog in development.`);
  } catch (error) {
    if (isProduction()) {
      throw error;
    }

    console.error("[catalog] Sanity fetch failed, using static catalog:", error);
  }

  return buildStaticCatalog();
}

export async function getProducts(): Promise<Template[]> {
  const catalog = await getCatalog();
  return catalog.products;
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export async function getCatalogStatus() {
  const configured = isSanityConfigured();

  if (!configured) {
    return {
      source: "static-fallback" as const,
      configured: false,
      productCount: templates.length,
      categoryCount: STATIC_CATEGORIES.length,
    };
  }

  const [products, categories] = await Promise.all([
    fetchProductsFromSanity(),
    fetchCategoriesFromSanity(),
  ]);

  return {
    source: "sanity" as const,
    configured: true,
    productCount: products.length,
    categoryCount: categories.length,
  };
}
