import { describe, expect, it } from "vitest";

import { appMetadata, validateEnvironment } from ".";

describe("@repo/config", () => {
  it("exposes app metadata", () => {
    expect(appMetadata.name).toBe("Market Intelligence Platform");
  });

  it("validates empty foundation environment placeholders", () => {
    expect(validateEnvironment({})).toEqual({});
  });
});
