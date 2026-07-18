import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookPayload = {
  tags?: string[];
};

function revalidateCatalog() {
  revalidateTag("products", "max");
  revalidateTag("categories", "max");
  revalidatePath("/", "layout");
  revalidatePath("/templates", "layout");
}

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const querySecret = request.nextUrl.searchParams.get("secret");
  const authHeader = request.headers.get("authorization");
  const provided = authHeader?.replace(/^Bearer\s+/i, "") ?? querySecret;

  if (secret && provided === secret) {
    revalidateCatalog();
    return NextResponse.json({ ok: true, revalidated: true, source: "manual" });
  }

  const sanitySecret =
    process.env.SANITY_REVALIDATE_SECRET ?? process.env.REVALIDATE_SECRET;

  if (sanitySecret) {
    try {
      const { isValidSignature } = await parseBody<SanityWebhookPayload>(
        request,
        sanitySecret,
        true,
      );

      if (isValidSignature) {
        revalidateCatalog();
        return NextResponse.json({ ok: true, revalidated: true, source: "sanity" });
      }
    } catch {
      // Invalid Sanity webhook payload.
    }
  }

  return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
}
