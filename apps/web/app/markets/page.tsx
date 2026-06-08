export const dynamic = "force-dynamic";

import Link from "next/link";
import type { AssetType } from "@repo/database";
import { assetRepository } from "@repo/market-data";
import { Badge, Container, Heading, Section, Text, Table, EmptyState } from "@repo/ui";

import { PublicShell } from "../../components/shell/public-shell";

interface MarketsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    assetType?: string;
    exchange?: string;
  }>;
}

export default async function MarketsPage({ searchParams }: MarketsPageProps) {
  const sp = await searchParams;
  const page = Number(sp.page ?? "1");
  const search = sp.search ?? undefined;
  const assetType = (sp.assetType as AssetType) ?? undefined;
  const exchange = sp.exchange ?? undefined;

  const result = await assetRepository.getAssets(
    { search, assetType, exchange },
    { page, pageSize: 10 }
  );

  const exchanges = await assetRepository.getDistinctExchanges();

  const assetTypes: AssetType[] = [
    "STOCK",
    "ETF",
    "INDEX",
    "FOREX",
    "CRYPTO",
    "COMMODITY"
  ];

  return (
    <PublicShell>
      <main>
        <Section>
          <Container>
            <div className="space-y-6">
              {/* Header */}
              <div>
                <Heading level={1} size="xl">
                  Markets
                </Heading>
                <Text className="mt-2" tone="muted">
                  Explore assets across global markets.
                </Text>
              </div>

              {/* Filters */}
              <form className="flex flex-wrap gap-3" method="GET">
                <input
                  aria-label="Search assets"
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary sm:w-64"
                  defaultValue={search ?? ""}
                  id="market-search"
                  name="search"
                  placeholder="Search by name or symbol…"
                  type="text"
                />
                <select
                  aria-label="Filter by asset type"
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue={assetType ?? ""}
                  id="asset-type-filter"
                  name="assetType"
                >
                  <option value="">All Types</option>
                  {assetTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Filter by exchange"
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue={exchange ?? ""}
                  id="exchange-filter"
                  name="exchange"
                >
                  <option value="">All Exchanges</option>
                  {exchanges.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                <button
                  className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                  id="apply-filters-btn"
                  type="submit"
                >
                  Apply
                </button>
                {(search || assetType || exchange) && (
                  <Link
                    className="flex h-10 items-center rounded-md border border-border px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
                    href="/markets"
                  >
                    Clear
                  </Link>
                )}
              </form>

              {/* Results */}
              {result.data.length === 0 ? (
                <EmptyState
                  description="Try adjusting your search or filter criteria."
                  title="No assets found"
                />
              ) : (
                <>
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
                        <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">
                          Exchange
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Price
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Change
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.data.map((asset) => {
                        const snapshot = asset.priceSnapshots[0];
                        const changePercent = snapshot?.dailyChangePercent ?? 0;
                        const isPositive = changePercent >= 0;

                        return (
                          <tr
                            className="border-b border-border transition-colors hover:bg-muted/30"
                            key={asset.id}
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
                            <td className="hidden px-4 py-3 text-sm text-muted-foreground md:table-cell">
                              {asset.exchange ?? "—"}
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
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>

                  {/* Pagination */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      Showing {(result.page - 1) * result.pageSize + 1}–
                      {Math.min(result.page * result.pageSize, result.totalCount)} of{" "}
                      {result.totalCount}
                    </span>
                    <div className="flex gap-2">
                      {result.page > 1 && (
                        <Link
                          className="rounded-md border border-border px-3 py-1.5 transition-colors hover:bg-muted"
                          href={`/markets?page=${result.page - 1}${search ? `&search=${search}` : ""}${assetType ? `&assetType=${assetType}` : ""}${exchange ? `&exchange=${exchange}` : ""}`}
                        >
                          Previous
                        </Link>
                      )}
                      {result.page < result.totalPages && (
                        <Link
                          className="rounded-md border border-border px-3 py-1.5 transition-colors hover:bg-muted"
                          href={`/markets?page=${result.page + 1}${search ? `&search=${search}` : ""}${assetType ? `&assetType=${assetType}` : ""}${exchange ? `&exchange=${exchange}` : ""}`}
                        >
                          Next
                        </Link>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </Container>
        </Section>
      </main>
    </PublicShell>
  );
}
