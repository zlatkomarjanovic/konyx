const token = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID ?? "appVCc0BDAYhPAECj";
const tableId = process.env.AIRTABLE_PRODUCTS_TABLE_ID ?? "tblhh6lr3XoQdukfc";
const siteUrl = (process.env.SITE_URL ?? "https://konyx.vercel.app").replace(/\/$/, "");
const revalidateSecret = process.env.REVALIDATE_SECRET;

if (!token) {
  console.error("Missing AIRTABLE_API_KEY");
  process.exit(1);
}

if (!revalidateSecret) {
  console.error("Missing REVALIDATE_SECRET");
  process.exit(1);
}

const notificationUrl = `${siteUrl}/api/revalidate?secret=${encodeURIComponent(revalidateSecret)}`;

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

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

async function main() {
  const existing = await api(`/bases/${baseId}/webhooks`);
  const match = existing.webhooks?.find(
    (webhook) => webhook.notificationUrl === notificationUrl,
  );

  if (match) {
    console.log(`Webhook already configured (${match.id}).`);
    return;
  }

  const created = await api(`/bases/${baseId}/webhooks`, {
    method: "POST",
    body: JSON.stringify({
      notificationUrl,
      specification: {
        options: {
          filters: {
            dataTypes: ["tableData"],
            recordChangeScope: tableId,
          },
        },
      },
    }),
  });

  console.log(`Created Airtable webhook (${created.id}).`);
  console.log(`Notifications -> ${notificationUrl}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
