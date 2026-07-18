import {
  CATEGORY_LABELS,
  type Template,
  type TemplateCategory,
} from "./templates";

const AIRTABLE_API = "https://api.airtable.com/v0";

type AirtableAttachment = {
  url: string;
};

type AirtableRecord = {
  id: string;
  fields: Record<string, unknown>;
};

type AirtableListResponse = {
  records: AirtableRecord[];
  offset?: string;
};

const TEMPLATE_CATEGORIES = new Set<string>(Object.keys(CATEGORY_LABELS));

function isAirtableConfigured() {
  return Boolean(
    process.env.AIRTABLE_API_KEY &&
      process.env.AIRTABLE_BASE_ID &&
      process.env.AIRTABLE_TABLE_NAME,
  );
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function asStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  return [];
}

function parseCategory(value: unknown): TemplateCategory | null {
  const category = asString(value).toLowerCase();
  return TEMPLATE_CATEGORIES.has(category)
    ? (category as TemplateCategory)
    : null;
}

function parseThumbnail(fields: Record<string, unknown>) {
  const thumbnailUrl = asString(fields["Thumbnail URL"]);
  if (thumbnailUrl) return thumbnailUrl;

  const attachments = fields.Thumbnail;
  if (Array.isArray(attachments) && attachments.length > 0) {
    const first = attachments[0] as AirtableAttachment;
    if (first?.url) return first.url;
  }

  return "/templates/placeholder.jpg";
}

function mapRecord(record: AirtableRecord): Template | null {
  const { fields } = record;
  const slug = asString(fields.Slug);
  const name = asString(fields.Name);
  const description = asString(fields.Description);
  const category = parseCategory(fields.Category);

  if (!slug || !name || !description || !category) {
    return null;
  }

  const published = fields.Published;
  if (published === false) {
    return null;
  }

  return {
    slug,
    name,
    description,
    category,
    price: asNumber(fields.Price),
    thumbnail: parseThumbnail(fields),
    polarProductId: asString(fields["Polar Product ID"]) || undefined,
    polarCheckoutUrl: asString(fields["Polar Checkout URL"]) || undefined,
    demoUrl: asString(fields["Demo URL"]) || undefined,
    features: asStringArray(fields.Features),
  };
}

async function fetchAirtablePage(
  baseId: string,
  tableName: string,
  apiKey: string,
  offset?: string,
) {
  const params = new URLSearchParams({
    pageSize: "100",
    "sort[0][field]": "Name",
    "sort[0][direction]": "asc",
  });

  if (offset) {
    params.set("offset", offset);
  }

  const response = await fetch(
    `${AIRTABLE_API}/${baseId}/${encodeURIComponent(tableName)}?${params}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 120, tags: ["products"] },
    },
  );

  if (!response.ok) {
    throw new Error(`Airtable request failed (${response.status})`);
  }

  return (await response.json()) as AirtableListResponse;
}

export async function fetchProductsFromAirtable(): Promise<Template[]> {
  if (!isAirtableConfigured()) {
    return [];
  }

  const apiKey = process.env.AIRTABLE_API_KEY!;
  const baseId = process.env.AIRTABLE_BASE_ID!;
  const tableName = process.env.AIRTABLE_TABLE_NAME!;

  const products: Template[] = [];
  let offset: string | undefined;

  do {
    const page = await fetchAirtablePage(baseId, tableName, apiKey, offset);

    for (const record of page.records) {
      const product = mapRecord(record);
      if (product) {
        products.push(product);
      }
    }

    offset = page.offset;
  } while (offset);

  return products;
}

export { isAirtableConfigured };
