import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "@repo/auth/server";
import { watchlistRepository } from "@repo/market-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const watchlists = await watchlistRepository.getUserWatchlists(session.user.id);
    return NextResponse.json(watchlists);
  } catch (error) {
    console.error("GET /api/watchlists error:", error);
    return NextResponse.json({ error: "Failed to fetch watchlists" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { name?: string };
    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const watchlist = await watchlistRepository.createWatchlist(session.user.id, name);
    return NextResponse.json(watchlist, { status: 201 });
  } catch (error) {
    console.error("POST /api/watchlists error:", error);
    return NextResponse.json({ error: "Failed to create watchlist" }, { status: 500 });
  }
}
