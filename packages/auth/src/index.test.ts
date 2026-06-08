import { describe, expect, it } from "vitest";

import { AUDIT_ACTIONS, DEFAULT_USER_ROLE, PUBLIC_WEB_ROUTES } from "./types";

describe("@repo/auth", () => {
  it("exports auth contracts used by apps", () => {
    expect(PUBLIC_WEB_ROUTES).toContain("/signin");
    expect(DEFAULT_USER_ROLE).toBe("User");
    expect(AUDIT_ACTIONS.registered).toBe("User Registered");
  });
});
