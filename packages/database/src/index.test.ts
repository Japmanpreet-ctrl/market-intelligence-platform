import { describe, expect, it } from "vitest";

import { prisma } from "./index";

describe("@repo/database", () => {
  it("exports the Prisma client boundary", () => {
    expect(prisma).toBeDefined();
  });
});
