import { prisma, type Prisma } from "@repo/database";

import { AUDIT_ACTIONS } from "../types";

type AuditMetadata = Prisma.InputJsonValue;

export async function recordAuditLog(input: {
  actorUserId?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: AuditMetadata;
}) {
  await prisma.auditLog.create({
    data: {
      action: input.action,
      actorUserId: input.actorUserId ?? null,
      entityId: input.entityId,
      entityType: input.entityType,
      metadata: input.metadata ?? {}
    }
  });
}

export async function recordUserRegistered(userId: string, metadata?: AuditMetadata) {
  await recordAuditLog({
    action: AUDIT_ACTIONS.registered,
    actorUserId: userId,
    entityId: userId,
    entityType: "User",
    metadata
  });
}

export async function recordUserLoggedIn(userId: string, metadata?: AuditMetadata) {
  await recordAuditLog({
    action: AUDIT_ACTIONS.loggedIn,
    actorUserId: userId,
    entityId: userId,
    entityType: "User",
    metadata
  });
}

export async function recordUserLoggedOut(userId: string, metadata?: AuditMetadata) {
  await recordAuditLog({
    action: AUDIT_ACTIONS.loggedOut,
    actorUserId: userId,
    entityId: userId,
    entityType: "User",
    metadata
  });
}
