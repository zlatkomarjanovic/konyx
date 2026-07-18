import { fetchProductsFromAirtable, isAirtableConfigured } from "./airtable";
import { templates, type Template } from "./templates";

export async function getProducts(): Promise<Template[]> {
  if (!isAirtableConfigured()) {
    return templates;
  }

  try {
    const fromAirtable = await fetchProductsFromAirtable();
    if (fromAirtable.length > 0) {
      return fromAirtable;
    }
  } catch (error) {
    console.error("Airtable fetch failed, using static catalog:", error);
  }

  return templates;
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}
