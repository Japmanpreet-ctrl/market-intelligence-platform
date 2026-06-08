import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    auditLog: {
      create: vi.fn()
    }
  }
}));

vi.mock("@repo/database", () => ({
  prisma: prismaMock
}));

import { recordUserLoggedIn, recordUserLoggedOut, recordUserRegistered } from "./audit";

describe("audit logging", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("records registration events", async () => {
    await recordUserRegistered("user-1", { email: "user@example.com" });

    expect(prismaMock.auditLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        action: "User Registered",
        actorUserId: "user-1",
        entityId: "user-1",
        entityType: "User"
      })
    });
  });

  it("records login events", async () => {
    await recordUserLoggedIn("user-1", { sessionId: "session-1" });

    expect(prismaMock.auditLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        action: "User Logged In",
        actorUserId: "user-1"
      })
    });
  });

  it("records logout events", async () => {
    await recordUserLoggedOut("user-1", { sessionId: "session-1" });

    expect(prismaMock.auditLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        action: "User Logged Out",
        actorUserId: "user-1"
      })
    });
  });
});
