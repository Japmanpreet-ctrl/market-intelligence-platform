export const dynamic = "force-dynamic";

import { requireAuth } from "@repo/auth/guards";
import { AuthenticatedShell } from "../../components/shell/authenticated-shell";
import NotificationsClient from "./notifications-client";

export default async function NotificationsPage() {
  const session = await requireAuth();
  const displayName =
    session.user.name || session.user.username || session.user.email || "User";

  return (
    <AuthenticatedShell userLabel={displayName}>
      <NotificationsClient />
    </AuthenticatedShell>
  );
}
