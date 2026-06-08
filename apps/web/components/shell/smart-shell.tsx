import type { ReactNode } from "react";
import { getServerSession } from "@repo/auth/server";

import { AuthenticatedShell } from "./authenticated-shell";
import { PublicShell } from "./public-shell";

/**
 * SmartShell automatically detects whether the user is authenticated
 * and renders the appropriate layout shell. This ensures pages like
 * /markets, /learn, /about, /pricing render consistently.
 */
export async function SmartShell({ children }: { children: ReactNode }) {
  const session = await getServerSession();

  if (session) {
    const userLabel =
      session.user.name || session.user.username || session.user.email || "User";
    return <AuthenticatedShell userLabel={userLabel}>{children}</AuthenticatedShell>;
  }

  return <PublicShell>{children}</PublicShell>;
}
