import { describe, expect, it } from "vitest";

import { designTokens } from ".";

describe("@repo/ui", () => {
  it("exposes foundation design tokens", () => {
    expect(designTokens.breakpoints.lg).toBe("1024px");
  });
});
