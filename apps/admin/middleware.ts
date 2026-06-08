import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { hasSessionCookie } from "@repo/auth/guards/middleware";
import { isAdminRoute } from "@repo/auth/guards/route-access";

export function middleware(request: NextRequest) {
  if (!isAdminRoute(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!hasSessionCookie(request)) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
