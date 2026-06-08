import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "@repo/auth/server";
import { watchlistRepository } from "@repo/market-data";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as { assetId?: string };

    if (!body.assetId) {
      return NextResponse.json({ error: "assetId is required" }, { status: 400 });
    }

    const item = await watchlistRepository.addAsset(id, body.assetId);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("POST /api/watchlists/[id]/items error:", error);
    return NextResponse.json({ error: "Failed to add asset" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as { assetId?: string };

    if (!body.assetId) {
      return NextResponse.json({ error: "assetId is required" }, { status: 400 });
    }

    await watchlistRepository.removeAsset(id, body.assetId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/watchlists/[id]/items error:", error);
    return NextResponse.json({ error: "Failed to remove asset" }, { status: 500 });
  }
}
