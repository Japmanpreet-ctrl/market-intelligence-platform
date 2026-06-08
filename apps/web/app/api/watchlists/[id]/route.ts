import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "@repo/auth/server";
import { watchlistRepository } from "@repo/market-data";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const watchlist = await watchlistRepository.getWatchlistById(id, session.user.id);

    if (!watchlist) {
      return NextResponse.json({ error: "Watchlist not found" }, { status: 404 });
    }

    return NextResponse.json(watchlist);
  } catch (error) {
    console.error("GET /api/watchlists/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch watchlist" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = (await request.json()) as { name?: string };
    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await watchlistRepository.renameWatchlist(id, session.user.id, name);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/watchlists/[id] error:", error);
    return NextResponse.json({ error: "Failed to rename watchlist" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await watchlistRepository.deleteWatchlist(id, session.user.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/watchlists/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete watchlist" }, { status: 500 });
  }
}
