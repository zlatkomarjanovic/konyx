const token = process.env.VERCEL_TOKEN;
const projectId = process.env.VERCEL_PROJECT_ID ?? "prj_7rYTJ3hIn3ibgWoTybuwuuvlKON6";
const teamId = process.env.VERCEL_ORG_ID ?? "team_FOHBoHSLl1WuH0ejOTrB5vfq";

const envVars = {
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID ?? "appVCc0BDAYhPAECj",
  AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME ?? "Products",
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
};

if (!token) {
  console.error("Missing VERCEL_TOKEN");
  process.exit(1);
}

const missing = Object.entries(envVars).filter(([, value]) => !value);
if (missing.length > 0) {
  console.error(`Missing: ${missing.map(([key]) => key).join(", ")}`);
  process.exit(1);
}

async function listEnv() {
  const response = await fetch(
    `https://api.vercel.com/v10/projects/${projectId}/env?teamId=${teamId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data.envs ?? [];
}

async function upsertEnv(key, value) {
  const existing = await listEnv();
  const match = existing.find(
    (item) => item.key === key && item.target?.includes("production"),
  );

  if (match) {
    const response = await fetch(
      `https://api.vercel.com/v10/projects/${projectId}/env/${match.id}?teamId=${teamId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value,
          target: ["production", "preview", "development"],
        }),
      },
    );

    const data = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(data));
    console.log(`Updated ${key}`);
    return;
  }

  const response = await fetch(
    `https://api.vercel.com/v10/projects/${projectId}/env?teamId=${teamId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        value,
        type: "encrypted",
        target: ["production", "preview", "development"],
      }),
    },
  );

  const data = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(data));
  console.log(`Created ${key}`);
}

async function main() {
  for (const [key, value] of Object.entries(envVars)) {
    await upsertEnv(key, value);
  }

  console.log("Vercel environment variables synced.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
