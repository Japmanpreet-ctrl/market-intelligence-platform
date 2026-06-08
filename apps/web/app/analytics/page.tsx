export const dynamic = "force-dynamic";

import Link from "next/link";
import { requireAuth } from "@repo/auth/guards";
import {
  assetRepository,
  economicCalendarRepository,
  watchlistRepository
} from "@repo/market-data";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Heading,
  MetricCard,
  Section,
  Table,
  Text
} from "@repo/ui";

import { AuthenticatedShell } from "../../components/shell/authenticated-shell";

export default async function AnalyticsPage() {
  const session = await requireAuth();
  const displayName =
    session.user.name || session.user.username || session.user.email || "User";

  // Compute analytics from seeded data
  const [assetCounts, topMovers, upcomingEvents, watchlists] = await Promise.all([
    assetRepository.getAssetCountByType(),
    assetRepository.getTopMovers(5),
    economicCalendarRepository.getUpcomingEvents({}, 5),
    watchlistRepository.getUserWatchlists(session.user.id)
  ]);

  const totalAssets = Object.values(assetCounts).reduce((sum, count) => sum + count, 0);
  const totalWatchlistedAssets = watchlists.reduce((sum, wl) => sum + wl.items.length, 0);

  return (
    <AuthenticatedShell userLabel={displayName}>
      <Section>
        <Container>
          <div className="space-y-6">
            <div>
              <Heading level={1} size="xl">
                Analytics Workspace
              </Heading>
              <Text className="mt-2" tone="muted">
                Market overview and insights based on your data.
              </Text>
            </div>

            {/* Top Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                description="Total trackable assets in database"
                label="Total Assets"
                value={totalAssets.toString()}
              />
              <MetricCard
                description="Your custom watchlists"
                label="Watchlists"
                value={watchlists.length.toString()}
              />
              <MetricCard
                description="Assets across your watchlists"
                label="Tracked Assets"
                value={totalWatchlistedAssets.toString()}
              />
              <MetricCard
                description="Upcoming scheduled events"
                label="Upcoming Events"
                value={upcomingEvents.length.toString()}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Asset Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Asset Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(assetCounts).map(([type, count]) => (
                      <div className="flex items-center justify-between" key={type}>
                        <Text>{type}</Text>
                        <div className="flex items-center gap-3">
                          <Text tone="muted">{count}</Text>
                          <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${(count / totalAssets) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Watchlist Snapshot */}
              <Card>
                <CardHeader>
                  <CardTitle>Watchlist Snapshot</CardTitle>
                </CardHeader>
                <CardContent>
                  {watchlists.length === 0 ? (
                    <Text tone="muted">No watchlists created yet.</Text>
                  ) : (
                    <div className="space-y-4">
                      {watchlists.slice(0, 5).map((wl) => (
                        <div className="flex items-center justify-between" key={wl.id}>
                          <Link
                            className="font-medium hover:underline"
                            href={`/watchlists/${wl.id}`}
                          >
                            {wl.name}
                          </Link>
                          <Badge>{wl.items.length} items</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Top Movers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Movers</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table className="border-0">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                          Asset
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">
                          Price
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">
                          Change
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {topMovers.map((snapshot) => {
                        const isPositive = (snapshot.dailyChangePercent ?? 0) >= 0;
                        return (
                          <tr
                            className="border-b border-border last:border-0"
                            key={snapshot.id}
                          >
                            <td className="px-4 py-3">
                              <Link
                                className="font-medium hover:underline"
                                href={`/markets/${snapshot.asset.symbol}`}
                              >
                                {snapshot.asset.symbol}
                              </Link>
                            </td>
                            <td className="px-4 py-3 text-right tabular-nums">
                              {snapshot.price.toLocaleString("en-US", {
                                minimumFractionDigits: 2
                              })}
                            </td>
                            <td
                              className={`px-4 py-3 text-right font-medium tabular-nums ${isPositive ? "text-[hsl(var(--success))]" : "text-[hsl(var(--danger))]"}`}
                            >
                              {isPositive ? "+" : ""}
                              {(snapshot.dailyChangePercent ?? 0).toFixed(2)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Events</CardTitle>
                    <Link
                      className="text-sm font-medium text-primary hover:underline"
                      href="/calendar"
                    >
                      View all
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table className="border-0">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                          Date
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                          Event
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">
                          Impact
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingEvents.map((event) => {
                        let impactColor = "text-muted-foreground";
                        if (event.impact === "HIGH")
                          impactColor = "text-[hsl(var(--danger))]";
                        else if (event.impact === "MEDIUM")
                          impactColor = "text-[hsl(var(--warning))]";

                        return (
                          <tr
                            className="border-b border-border last:border-0"
                            key={event.id}
                          >
                            <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">
                              {new Date(event.eventDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric"
                              })}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              {event.title}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Badge className={impactColor}>{event.impact}</Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </AuthenticatedShell>
  );
}
