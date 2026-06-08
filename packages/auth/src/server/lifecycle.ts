import { prisma } from "@repo/database";

import { DEFAULT_USER_ROLE } from "../types";
import { recordUserLoggedIn, recordUserLoggedOut, recordUserRegistered } from "./audit";

export async function assignDefaultUserRole(userId: string) {
  const role = await prisma.role.findUnique({
    where: { name: DEFAULT_USER_ROLE }
  });

  if (!role) {
    return;
  }

  await prisma.userRole.upsert({
    create: {
      roleId: role.id,
      userId
    },
    update: {},
    where: {
      userId_roleId: {
        roleId: role.id,
        userId
      }
    }
  });
}

export async function ensureUserProfile(userId: string, username: string) {
  await prisma.profile.upsert({
    create: {
      userId
    },
    update: {},
    where: { userId }
  });

  await prisma.user.update({
    data: {
      name: username,
      status: "ACTIVE"
    },
    where: { id: userId }
  });
}

export async function handleUserRegistered(user: {
  id: string;
  email: string;
  username?: string | null;
  name?: string | null;
}) {
  const username = user.username ?? user.name ?? user.email;

  await assignDefaultUserRole(user.id);
  await ensureUserProfile(user.id, username);
  await recordUserRegistered(user.id, {
    email: user.email,
    username
  });
}

export async function handleUserLoggedIn(userId: string, sessionId: string) {
  await recordUserLoggedIn(userId, { sessionId });
}

export async function handleUserLoggedOut(userId: string, sessionId: string) {
  await recordUserLoggedOut(userId, { sessionId });
}
