import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { protectWebRoutes } from "@repo/auth/guards/middleware";

export function middleware(request: NextRequest) {
  const response = protectWebRoutes(request);

  if (response) {
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/watchlists/:path*",
    "/analytics/:path*",
    "/assistant/:path*",
    "/notifications/:path*",
    "/portfolio/:path*"
  ]
};
