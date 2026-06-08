export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { assetRepository } from "@repo/market-data";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Heading,
  Section,
  StatCard,
  Text
} from "@repo/ui";

import { PublicShell } from "../../../components/shell/public-shell";

interface AssetDetailPageProps {
  params: Promise<{ symbol: string }>;
}

export default async function AssetDetailPage({ params }: AssetDetailPageProps) {
  const { symbol } = await params;
  const asset = await assetRepository.getAssetBySymbol(symbol);

  if (!asset) {
    notFound();
  }

  const snapshot = asset.priceSnapshots[0];
  const changePercent = snapshot?.dailyChangePercent ?? 0;
  const isPositive = changePercent >= 0;

  const relatedAssets = await assetRepository.getRelatedAssets(asset.symbol, 5);

  return (
    <PublicShell>
      <main>
        <Section>
          <Container>
            <div className="space-y-8">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
                <Link className="hover:text-foreground" href="/markets">
                  Markets
                </Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">{asset.symbol}</span>
              </nav>

              {/* Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <Heading level={1} size="xl">
                      {asset.name}
                    </Heading>
                    <Badge>{asset.assetType}</Badge>
                  </div>
                  <Text className="mt-1" tone="muted">
                    {asset.symbol}
                    {asset.exchange ? ` · ${asset.exchange}` : ""}
                  </Text>
                </div>
              </div>

              {/* Price Card */}
              {snapshot && (
                <Card>
                  <CardHeader>
                    <Text size="sm" tone="muted">
                      Latest Price
                    </Text>
                    <div className="flex items-baseline gap-4">
                      <CardTitle className="text-3xl font-bold tabular-nums">
                        {asset.currency === "USD" ? "$" : ""}
                        {snapshot.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </CardTitle>
                      <span
                        className={`flex items-center gap-1 text-lg font-semibold ${
                          isPositive
                            ? "text-[hsl(var(--success))]"
                            : "text-[hsl(var(--danger))]"
                        }`}
                      >
                        {isPositive ? "▲" : "▼"}{" "}
                        {snapshot.dailyChange != null
                          ? Math.abs(snapshot.dailyChange).toFixed(2)
                          : "0.00"}{" "}
                        ({Math.abs(changePercent).toFixed(2)}%)
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Mock sparkline */}
                    <div
                      aria-label="Price trend sparkline placeholder"
                      className={`flex h-16 items-end gap-px ${
                        isPositive
                          ? "text-[hsl(var(--success))]"
                          : "text-[hsl(var(--danger))]"
                      }`}
                    >
                      {Array.from({ length: 24 }, (_, i) => {
                        const baseHeight = 40;
                        const variance = Math.sin(i * 0.8 + (isPositive ? 0 : 3)) * 20;
                        const trend = isPositive ? i * 0.5 : -i * 0.3;
                        const height = Math.max(
                          8,
                          Math.min(64, baseHeight + variance + trend)
                        );
                        return (
                          <div
                            className="flex-1 rounded-t bg-current opacity-60"
                            key={i}
                            style={{ height: `${height}px` }}
                          />
                        );
                      })}
                    </div>
                    <Text className="mt-2" size="sm" tone="muted">
                      24-point simulated trend
                    </Text>
                  </CardContent>
                </Card>
              )}

              {/* Stats Row */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {asset.sector && <StatCard label="Sector" value={asset.sector} />}
                {asset.industry && <StatCard label="Industry" value={asset.industry} />}
                {asset.exchange && <StatCard label="Exchange" value={asset.exchange} />}
                {asset.marketCap && (
                  <StatCard label="Market Cap" value={formatMarketCap(asset.marketCap)} />
                )}
                {snapshot?.volume != null && snapshot.volume > 0 && (
                  <StatCard
                    label="Volume"
                    value={snapshot.volume.toLocaleString("en-US")}
                  />
                )}
                {asset.country && <StatCard label="Country" value={asset.country} />}
              </div>

              {/* Description */}
              {asset.description && (
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text tone="muted">{asset.description}</Text>
                  </CardContent>
                </Card>
              )}

              {/* Related Assets */}
              {relatedAssets.length > 0 && (
                <div>
                  <Heading className="mb-4" level={2} size="lg">
                    Related Assets
                  </Heading>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedAssets.map((related) => {
                      const relSnap = related.priceSnapshots[0];
                      const relChange = relSnap?.dailyChangePercent ?? 0;
                      const relPositive = relChange >= 0;

                      return (
                        <Link href={`/markets/${related.symbol}`} key={related.id}>
                          <Card className="transition-colors hover:border-primary/40">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div>
                                  <CardTitle className="text-base">
                                    {related.symbol}
                                  </CardTitle>
                                  <Text size="sm" tone="muted">
                                    {related.name}
                                  </Text>
                                </div>
                                {relSnap && (
                                  <span
                                    className={`font-mono text-sm font-medium ${
                                      relPositive
                                        ? "text-[hsl(var(--success))]"
                                        : "text-[hsl(var(--danger))]"
                                    }`}
                                  >
                                    {relPositive ? "+" : ""}
                                    {relChange.toFixed(2)}%
                                  </span>
                                )}
                              </div>
                            </CardHeader>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>
      </main>
    </PublicShell>
  );
}

function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  return `$${value.toLocaleString()}`;
}
