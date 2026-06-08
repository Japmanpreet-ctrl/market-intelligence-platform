import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { assetRepository } from "@repo/market-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q") ?? "";

    if (q.length < 1) {
      return NextResponse.json([]);
    }

    const results = await assetRepository.searchAssets(q, 10);
    return NextResponse.json(results);
  } catch (error) {
    console.error("GET /api/assets/search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
