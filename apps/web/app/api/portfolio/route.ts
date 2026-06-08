import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "@repo/auth/server";
import { portfolioRepository, assetRepository } from "@repo/market-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const portfolios = await portfolioRepository.getUserPortfolios(session.user.id);
    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("GET /api/portfolio error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolios" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await request.json()) as {
      action: "create" | "addHolding" | "removeHolding";
      name?: string;
      portfolioId?: string;
      symbol?: string;
      quantity?: number;
      averageCost?: number;
      holdingId?: string;
    };

    if (body.action === "create") {
      if (!body.name?.trim())
        return NextResponse.json({ error: "Name required" }, { status: 400 });
      const portfolio = await portfolioRepository.createPortfolio(
        session.user.id,
        body.name.trim()
      );
      return NextResponse.json(portfolio, { status: 201 });
    }

    if (body.action === "addHolding") {
      if (!body.portfolioId || !body.symbol || !body.quantity || !body.averageCost) {
        return NextResponse.json({ error: "Missing holding fields" }, { status: 400 });
      }

      const portfolio = await portfolioRepository.getPortfolioById(
        body.portfolioId,
        session.user.id
      );
      if (!portfolio)
        return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });

      // Verify asset exists
      const asset = await assetRepository.getAssetBySymbol(body.symbol);
      if (!asset)
        return NextResponse.json({ error: "Invalid asset symbol" }, { status: 400 });

      const holding = await portfolioRepository.addHolding(
        body.portfolioId,
        body.symbol,
        body.quantity,
        body.averageCost
      );
      return NextResponse.json(holding, { status: 201 });
    }

    if (body.action === "removeHolding") {
      if (!body.holdingId || !body.portfolioId) {
        return NextResponse.json(
          { error: "holdingId and portfolioId required" },
          { status: 400 }
        );
      }

      const portfolio = await portfolioRepository.getPortfolioById(
        body.portfolioId,
        session.user.id
      );
      if (!portfolio)
        return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });

      await portfolioRepository.removeHolding(body.holdingId, body.portfolioId);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("POST /api/portfolio error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
