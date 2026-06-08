export const dynamic = "force-dynamic";

import { getUserRoles } from "@repo/auth/permissions";
import { requireAuth } from "@repo/auth/guards";
import { isSessionActive } from "@repo/auth/server";
import { Badge, Heading, MetricCard, Text, Card, CardContent } from "@repo/ui";
import { prisma } from "@repo/database";

import { SignOutButton } from "../../components/auth/sign-out-button";
import { AuthenticatedShell } from "../../components/shell/authenticated-shell";

export default async function DashboardPage() {
  const session = await requireAuth();
  const roles = await getUserRoles(session.user.id);
  const displayName =
    session.user.name || session.user.username || session.user.email || "User";

  const [assetsCount, watchlistsCount, upcomingEvents, unreadNotifications] =
    await Promise.all([
      prisma.asset.count(),
      prisma.watchlist.count({ where: { userId: session.user.id } }),
      prisma.economicEvent.count({ where: { eventDate: { gte: new Date() } } }),
      prisma.notification.count({ where: { userId: session.user.id, isRead: false } })
    ]);

  return (
    <AuthenticatedShell userLabel={displayName}>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Heading level={1} size="xl">
              Overview
            </Heading>
            <Text className="mt-2" tone="muted">
              Welcome back, {displayName}. Here is your market intelligence summary.
            </Text>
          </div>
          <SignOutButton />
        </div>

        {/* Overview Cards */}
        <div>
          <Heading level={2} size="lg" className="mb-4">
            Platform Stats
          </Heading>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Total Tracked Assets"
              value={assetsCount.toLocaleString()}
            />
            <MetricCard label="Your Watchlists" value={watchlistsCount.toString()} />
            <MetricCard label="Upcoming Events" value={upcomingEvents.toString()} />
            <MetricCard
              label="Unread Notifications"
              value={unreadNotifications.toString()}
            />
          </div>
        </div>

        {/* Authentication State */}
        <Card>
          <CardContent className="p-6">
            <Heading level={2} size="md" className="mb-4">
              Session Details
            </Heading>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Text tone="muted" size="sm" className="mb-1">
                  Email
                </Text>
                <div className="font-medium truncate">{session.user.email}</div>
              </div>
              <div>
                <Text tone="muted" size="sm" className="mb-1">
                  Status
                </Text>
                <div className="font-medium">
                  {isSessionActive(session) ? "Active" : "Expired"}
                </div>
              </div>
              <div>
                <Text tone="muted" size="sm" className="mb-1">
                  Roles
                </Text>
                <div className="flex flex-wrap gap-2">
                  {roles.length > 0 ? (
                    roles.map((role) => <Badge key={role}>{role}</Badge>)
                  ) : (
                    <Text>None</Text>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedShell>
  );
}
