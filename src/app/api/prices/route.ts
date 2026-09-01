import { NextResponse } from "next/server";
import { getPricesPayload } from "@/lib/contentful";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/prices — parity with the old Express endpoint. */
export async function GET() {
  try {
    const payload = await getPricesPayload();
    return NextResponse.json(payload);
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
