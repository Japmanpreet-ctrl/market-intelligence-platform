import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { evaluateWebRouteAccess } from "./route-access";

export function hasSessionCookie(request: NextRequest) {
  return Boolean(getSessionCookie(request));
}

export function protectWebRoutes(request: NextRequest) {
  const decision = evaluateWebRouteAccess({
    hasSession: hasSessionCookie(request),
    pathname: request.nextUrl.pathname
  });

  if (!decision.allowed) {
    return NextResponse.redirect(new URL(decision.redirectTo, request.url));
  }

  return null;
}
