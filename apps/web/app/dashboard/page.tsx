export const dynamic = "force-dynamic";

import { getUserRoles } from "@repo/auth/permissions";
import { requireAuth } from "@repo/auth/guards";
import { isSessionActive } from "@repo/auth/server";
import { Badge, Heading, MetricCard, Text } from "@repo/ui";

import { SignOutButton } from "../../components/auth/sign-out-button";
import { AuthenticatedShell } from "../../components/shell/authenticated-shell";

export default async function DashboardPage() {
  const session = await requireAuth();
  const roles = await getUserRoles(session.user.id);
  const displayName =
    session.user.name || session.user.username || session.user.email || "User";

  return (
    <AuthenticatedShell userLabel={displayName}>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Heading level={1} size="xl">
              Dashboard
            </Heading>
            <Text className="mt-2" tone="muted">
              Authentication status for your current session.
            </Text>
          </div>
          <SignOutButton />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="User Name" value={displayName} />
          <MetricCard label="User Email" value={session.user.email} />
          <MetricCard
            label="Session Status"
            value={isSessionActive(session) ? "Active" : "Expired"}
          />
          <MetricCard
            label="Roles"
            value={roles.length > 0 ? roles.join(", ") : "None"}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <Badge key={role}>{role}</Badge>
          ))}
        </div>
      </div>
    </AuthenticatedShell>
  );
}
