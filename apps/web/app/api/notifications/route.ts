import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "@repo/auth/server";
import { notificationRepository } from "@repo/market-data";

export const dynamic = "force-dynamic";

// GET /api/notifications — list all notifications
export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await notificationRepository.getNotificationsByUser(
      session.user.id
    );
    const unreadCount = await notificationRepository.getUnreadCount(session.user.id);
    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    console.error("GET /api/notifications error:", error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

// POST /api/notifications — mark one or all as read
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      action: "markRead" | "markAllRead";
      id?: string;
    };

    if (body.action === "markAllRead") {
      await notificationRepository.markAllAsRead(session.user.id);
      return NextResponse.json({ success: true });
    }

    if (body.action === "markRead" && body.id) {
      await notificationRepository.markAsRead(body.id, session.user.id);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("POST /api/notifications error:", error);
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }
}
