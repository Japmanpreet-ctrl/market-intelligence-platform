import { redirect } from "next/navigation";

import { hasPermission, hasRole } from "../permissions";
import type { AuthSession } from "../types";
import { getServerSession } from "../server/session";

type GuardOptions = {
  baseURL?: string;
  redirectTo?: string;
};

export async function requireAuth(options: GuardOptions = {}): Promise<AuthSession> {
  const session = await getServerSession(options.baseURL);

  if (!session) {
    redirect(options.redirectTo ?? "/signin");
  }

  return session;
}

export async function requireRole(roleName: string, options: GuardOptions = {}) {
  const session = await requireAuth(options);
  const allowed = await hasRole(session.user.id, roleName);

  if (!allowed) {
    redirect(options.redirectTo ?? "/dashboard");
  }

  return session;
}

export async function requirePermission(
  permissionName: string,
  options: GuardOptions = {}
) {
  const session = await requireAuth(options);
  const allowed = await hasPermission(session.user.id, permissionName);

  if (!allowed) {
    redirect(options.redirectTo ?? "/dashboard");
  }

  return session;
}
