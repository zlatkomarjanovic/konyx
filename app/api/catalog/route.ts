import { NextRequest, NextResponse } from "next/server";
import { getCatalogStatus } from "@/lib/products";

export async function GET(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = request.nextUrl.searchParams.get("secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const status = await getCatalogStatus();
    return NextResponse.json({ ok: true, ...status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Catalog fetch failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
