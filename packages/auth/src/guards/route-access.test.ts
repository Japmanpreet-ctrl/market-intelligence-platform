import { describe, expect, it } from "vitest";

import {
  evaluateAdminRouteAccess,
  evaluateWebRouteAccess,
  isProtectedWebRoute,
  isPublicWebRoute
} from "./route-access";

describe("web route access", () => {
  it("allows public routes without a session", () => {
    expect(
      evaluateWebRouteAccess({
        hasSession: false,
        pathname: "/markets"
      })
    ).toEqual({ allowed: true });
  });

  it("redirects unauthenticated users away from protected routes", () => {
    expect(
      evaluateWebRouteAccess({
        hasSession: false,
        pathname: "/dashboard"
      })
    ).toEqual({
      allowed: false,
      redirectTo: "/signin?next=%2Fdashboard"
    });
  });

  it("classifies public and protected routes", () => {
    expect(isPublicWebRoute("/signup")).toBe(true);
    expect(isProtectedWebRoute("/dashboard")).toBe(true);
  });
});

describe("admin route access", () => {
  it("redirects unauthenticated users to sign in", () => {
    expect(
      evaluateAdminRouteAccess({
        hasSession: false,
        isAdmin: false,
        pathname: "/admin"
      })
    ).toEqual({
      allowed: false,
      redirectTo: "/signin?next=%2Fadmin"
    });
  });

  it("blocks authenticated non-admin users", () => {
    expect(
      evaluateAdminRouteAccess({
        hasSession: true,
        isAdmin: false,
        pathname: "/admin/users"
      })
    ).toEqual({
      allowed: false,
      redirectTo: "/"
    });
  });

  it("allows admin users into admin routes", () => {
    expect(
      evaluateAdminRouteAccess({
        hasSession: true,
        isAdmin: true,
        pathname: "/admin"
      })
    ).toEqual({ allowed: true });
  });
});
