import { NextResponse } from "next/server";
import { prisma } from "@repo/database";

export const dynamic = "force-dynamic";

export async function GET() {
  let dbConnected = false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbConnected = true;
  } catch (error) {
    console.error("Database health check failed", error);
  }

  return NextResponse.json(
    {
      status: dbConnected ? "healthy" : "degraded",
      version: "0.1.0",
      database: dbConnected ? "connected" : "disconnected",
      timestamp: new Date().toISOString()
    },
    {
      status: dbConnected ? 200 : 503
    }
  );
}
