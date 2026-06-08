import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    userRole: {
      count: vi.fn(),
      findMany: vi.fn()
    }
  }
}));

vi.mock("@repo/database", () => ({
  prisma: prismaMock
}));

import { getUserPermissions, getUserRoles, hasPermission, hasRole } from "./rbac";

describe("rbac", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("resolves user roles", async () => {
    prismaMock.userRole.findMany.mockResolvedValue([
      { role: { name: "User" } },
      { role: { name: "Partner" } }
    ]);

    await expect(getUserRoles("user-1")).resolves.toEqual(["User", "Partner"]);
  });

  it("resolves user permissions across roles", async () => {
    prismaMock.userRole.findMany.mockResolvedValue([
      {
        role: {
          permissions: [
            { permission: { name: "content.read" } },
            { permission: { name: "analytics.read" } }
          ]
        }
      }
    ]);

    await expect(getUserPermissions("user-1")).resolves.toEqual([
      "content.read",
      "analytics.read"
    ]);
  });

  it("checks role membership", async () => {
    prismaMock.userRole.count.mockResolvedValueOnce(1).mockResolvedValueOnce(0);

    await expect(hasRole("user-1", "Admin")).resolves.toBe(true);
    await expect(hasRole("user-1", "Support")).resolves.toBe(false);
  });

  it("checks permission membership", async () => {
    prismaMock.userRole.count.mockResolvedValueOnce(1).mockResolvedValueOnce(0);

    await expect(hasPermission("user-1", "users.write")).resolves.toBe(true);
    await expect(hasPermission("user-1", "support.write")).resolves.toBe(false);
  });
});
