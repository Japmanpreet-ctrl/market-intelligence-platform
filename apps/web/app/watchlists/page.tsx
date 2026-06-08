export const dynamic = "force-dynamic";

import Link from "next/link";
import { requireAuth } from "@repo/auth/guards";
import { watchlistRepository } from "@repo/market-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  EmptyState,
  Heading,
  Section,
  Text
} from "@repo/ui";

import { AuthenticatedShell } from "../../components/shell/authenticated-shell";
import { CreateWatchlistForm } from "./create-watchlist-form";

export default async function WatchlistsPage() {
  const session = await requireAuth();
  const watchlists = await watchlistRepository.getUserWatchlists(session.user.id);

  const displayName =
    session.user.name || session.user.username || session.user.email || "User";

  return (
    <AuthenticatedShell userLabel={displayName}>
      <Section>
        <Container>
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Heading level={1} size="xl">
                  Watchlists
                </Heading>
                <Text className="mt-2" tone="muted">
                  Manage your customized asset tracking lists.
                </Text>
              </div>
              <CreateWatchlistForm />
            </div>

            {watchlists.length === 0 ? (
              <EmptyState
                description="You haven't created any watchlists yet."
                title="No watchlists"
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {watchlists.map((wl) => (
                  <Link href={`/watchlists/${wl.id}`} key={wl.id}>
                    <Card className="h-full transition-colors hover:border-primary/40">
                      <CardHeader>
                        <CardTitle className="text-lg">{wl.name}</CardTitle>
                        <Text size="sm" tone="muted">
                          {wl.items.length} {wl.items.length === 1 ? "asset" : "assets"}
                        </Text>
                      </CardHeader>
                      <CardContent>
                        {wl.items.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {wl.items.slice(0, 5).map((item) => (
                              <span
                                key={item.id}
                                className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                              >
                                {item.asset.symbol}
                              </span>
                            ))}
                            {wl.items.length > 5 && (
                              <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                                +{wl.items.length - 5} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <Text size="sm" tone="muted">
                            Empty watchlist
                          </Text>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </AuthenticatedShell>
  );
}
