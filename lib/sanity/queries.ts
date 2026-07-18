import { defineQuery } from "next-sanity";

const categoryProjection = `{
  _id,
  title,
  "slug": slug.current,
  sortOrder,
  previewKey
}`;

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)] | order(sortOrder asc, title asc) ${categoryProjection}
`);

export const PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && published != false && defined(slug.current)]
    | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      polarProductId,
      polarCheckoutUrl,
      demoUrl,
      features,
      "thumbnail": coalesce(thumbnail.asset->url, ""),
      "categories": categories[]->${categoryProjection}
    }
`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug && published != false][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    polarProductId,
    polarCheckoutUrl,
    demoUrl,
    features,
    "thumbnail": coalesce(thumbnail.asset->url, ""),
    "categories": categories[]->${categoryProjection}
  }
`);

export const PRODUCT_SLUGS_QUERY = defineQuery(`
  *[_type == "product" && published != false && defined(slug.current)]{
    "slug": slug.current
  }
`);
