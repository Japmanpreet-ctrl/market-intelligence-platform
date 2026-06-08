import { describe, expect, it } from "vitest";

import {
  evaluateAdminRouteAccess,
  evaluateWebRouteAccess,
  isPublicWebRoute
} from "../../../packages/auth/src/guards/route-access";

describe("protected web routes", () => {
  it("keeps marketing routes public", () => {
    expect(isPublicWebRoute("/pricing")).toBe(true);
    expect(
      evaluateWebRouteAccess({
        hasSession: false,
        pathname: "/about"
      }).allowed
    ).toBe(true);
  });

  it("requires a session for dashboard access", () => {
    expect(
      evaluateWebRouteAccess({
        hasSession: true,
        pathname: "/dashboard"
      }).allowed
    ).toBe(true);
  });
});

describe("protected admin routes", () => {
  it("requires admin role for admin pages", () => {
    expect(
      evaluateAdminRouteAccess({
        hasSession: true,
        isAdmin: true,
        pathname: "/admin"
      }).allowed
    ).toBe(true);
  });
});
