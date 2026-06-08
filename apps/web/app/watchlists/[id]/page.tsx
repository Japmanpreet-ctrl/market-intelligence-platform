export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAuth } from "@repo/auth/guards";
import { watchlistRepository } from "@repo/market-data";
import { Badge, Container, EmptyState, Heading, Section, Table, Text } from "@repo/ui";

import { AuthenticatedShell } from "../../../components/shell/authenticated-shell";
import { WatchlistActions } from "./watchlist-actions";
import { AddAssetForm } from "./add-asset-form";

export default async function WatchlistDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAuth();
  const { id } = await params;

  const watchlist = await watchlistRepository.getWatchlistById(id, session.user.id);

  if (!watchlist) {
    notFound();
  }

  const displayName =
    session.user.name || session.user.username || session.user.email || "User";

  return (
    <AuthenticatedShell userLabel={displayName}>
      <Section>
        <Container>
          <div className="space-y-6">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link className="hover:text-foreground" href="/watchlists">
                Watchlists
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{watchlist.name}</span>
            </nav>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Heading level={1} size="xl">
                  {watchlist.name}
                </Heading>
                <Text className="mt-1" tone="muted">
                  {watchlist.items.length}{" "}
                  {watchlist.items.length === 1 ? "asset" : "assets"} tracked
                </Text>
              </div>
              <div className="flex items-center gap-2">
                <AddAssetForm watchlistId={watchlist.id} />
                <WatchlistActions
                  watchlistId={watchlist.id}
                  watchlistName={watchlist.name}
                />
              </div>
            </div>

            {watchlist.items.length === 0 ? (
              <EmptyState
                description="Search and add assets to track their performance."
                title="This watchlist is empty"
              />
            ) : (
              <Table>
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Symbol
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Name
                    </th>
                    <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                      Type
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Price
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Change
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.items.map((item) => {
                    const asset = item.asset;
                    const snapshot = asset.priceSnapshots[0];
                    const changePercent = snapshot?.dailyChangePercent ?? 0;
                    const isPositive = changePercent >= 0;

                    return (
                      <tr
                        className="border-b border-border transition-colors hover:bg-muted/30"
                        key={item.id}
                      >
                        <td className="px-4 py-3">
                          <Link
                            className="font-semibold text-primary hover:underline"
                            href={`/markets/${asset.symbol}`}
                          >
                            {asset.symbol}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">
                          {asset.name}
                        </td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          <Badge>{asset.assetType}</Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-sm">
                          {snapshot
                            ? snapshot.price.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })
                            : "—"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {snapshot ? (
                            <span
                              className={`inline-flex items-center gap-1 font-mono text-sm font-medium ${
                                isPositive
                                  ? "text-[hsl(var(--success))]"
                                  : "text-[hsl(var(--danger))]"
                              }`}
                            >
                              {isPositive ? "▲" : "▼"}{" "}
                              {Math.abs(changePercent).toFixed(2)}%
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <WatchlistActions.RemoveAsset
                            assetId={asset.id}
                            watchlistId={watchlist.id}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </Container>
      </Section>
    </AuthenticatedShell>
  );
}
