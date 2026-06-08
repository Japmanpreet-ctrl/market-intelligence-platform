import {
  ADMIN_ROLE,
  ADMIN_ROUTES,
  PROTECTED_WEB_ROUTES,
  PUBLIC_WEB_ROUTES,
  type RouteAccessDecision
} from "../types";

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function matchesRoute(pathname: string, routes: readonly string[]) {
  const normalized = normalizePathname(pathname);

  return routes.some(
    (route) => normalized === route || normalized.startsWith(`${route}/`)
  );
}

export function isPublicWebRoute(pathname: string) {
  return matchesRoute(pathname, PUBLIC_WEB_ROUTES);
}

export function isProtectedWebRoute(pathname: string) {
  return matchesRoute(pathname, PROTECTED_WEB_ROUTES);
}

export function isAdminRoute(pathname: string) {
  return matchesRoute(pathname, ADMIN_ROUTES);
}

export function evaluateWebRouteAccess(input: {
  pathname: string;
  hasSession: boolean;
}): RouteAccessDecision {
  if (isPublicWebRoute(input.pathname)) {
    return { allowed: true };
  }

  if (isProtectedWebRoute(input.pathname) && !input.hasSession) {
    return {
      allowed: false,
      redirectTo: `/signin?next=${encodeURIComponent(input.pathname)}`
    };
  }

  return { allowed: true };
}

export function evaluateAdminRouteAccess(input: {
  pathname: string;
  hasSession: boolean;
  isAdmin: boolean;
}): RouteAccessDecision {
  if (!isAdminRoute(input.pathname)) {
    return { allowed: true };
  }

  if (!input.hasSession) {
    return {
      allowed: false,
      redirectTo: `/signin?next=${encodeURIComponent(input.pathname)}`
    };
  }

  if (!input.isAdmin) {
    return {
      allowed: false,
      redirectTo: "/"
    };
  }

  return { allowed: true };
}

export { ADMIN_ROLE };
