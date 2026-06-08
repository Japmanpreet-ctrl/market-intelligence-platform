import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Impact } from "@repo/database";
import { economicCalendarRepository } from "@repo/market-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const country = searchParams.get("country") ?? undefined;
    const impact = (searchParams.get("impact") as Impact) ?? undefined;

    const events = await economicCalendarRepository.getUpcomingEvents({
      country,
      impact
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/calendar error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
