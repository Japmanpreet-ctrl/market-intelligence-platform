import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { AssetType } from "@repo/database";
import { assetRepository } from "@repo/market-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page") ?? "1");
    const pageSize = Number(searchParams.get("pageSize") ?? "10");
    const search = searchParams.get("search") ?? undefined;
    const assetType = (searchParams.get("assetType") as AssetType) ?? undefined;
    const exchange = searchParams.get("exchange") ?? undefined;

    const result = await assetRepository.getAssets(
      { search, assetType, exchange },
      { page, pageSize }
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/assets error:", error);
    return NextResponse.json({ error: "Failed to fetch assets" }, { status: 500 });
  }
}
