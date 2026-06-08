"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Heading,
  Section,
  Table,
  Text
} from "@repo/ui";

interface Holding {
  id: string;
  symbol: string;
  quantity: number;
  averageCost: number;
}

interface Portfolio {
  id: string;
  name: string;
  holdings: Holding[];
  createdAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PortfolioClient({ assets }: { assets: any[] }) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const [activePortfolioId, setActivePortfolioId] = useState<string | null>(null);

  // New Holding form state
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [averageCost, setAverageCost] = useState("");

  const loadPortfolios = useCallback(async () => {
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const data = await res.json();
        setPortfolios(data);
        if (data.length > 0 && !activePortfolioId) {
          setActivePortfolioId(data[0].id);
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [activePortfolioId]);

  useEffect(() => {
    loadPortfolios();
  }, [loadPortfolios]);

  const createPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioName.trim()) return;
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", name: newPortfolioName })
      });
      if (res.ok) {
        setNewPortfolioName("");
        loadPortfolios();
      }
    } catch {
      // ignore
    }
  };

  const addHolding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePortfolioId || !symbol || !quantity || !averageCost) return;
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addHolding",
          portfolioId: activePortfolioId,
          symbol: symbol.toUpperCase(),
          quantity: parseFloat(quantity),
          averageCost: parseFloat(averageCost)
        })
      });
      if (res.ok) {
        setSymbol("");
        setQuantity("");
        setAverageCost("");
        loadPortfolios();
      }
    } catch {
      // ignore
    }
  };

  const removeHolding = async (holdingId: string) => {
    if (!activePortfolioId) return;
    try {
      await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "removeHolding",
          portfolioId: activePortfolioId,
          holdingId
        })
      });
      loadPortfolios();
    } catch {
      // ignore
    }
  };

  const activePortfolio = portfolios.find((p) => p.id === activePortfolioId);

  // Calculate totals based on seeded current prices or average cost fallback
  const getAssetCurrentPrice = (sym: string) => {
    const asset = assets.find((a) => a.symbol === sym);
    return asset ? Number(asset.currentPrice) : 0;
  };

  const totalValue =
    activePortfolio?.holdings.reduce((sum, h) => {
      const price = getAssetCurrentPrice(h.symbol) || h.averageCost;
      return sum + price * h.quantity;
    }, 0) || 0;

  const totalCost =
    activePortfolio?.holdings.reduce((sum, h) => sum + h.averageCost * h.quantity, 0) ||
    0;
  const totalReturn = totalValue - totalCost;
  const returnPercentage = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;

  return (
    <Section>
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div>
            <Heading level={1} size="xl">
              Portfolio Tracker
            </Heading>
            <Text tone="muted">Manage your investments and track performance.</Text>
          </div>
        </div>

        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <Text tone="muted">Loading portfolios...</Text>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <Heading level={3} size="sm" className="mb-4">
                    Your Portfolios
                  </Heading>
                  {portfolios.length === 0 ? (
                    <Text tone="muted" className="text-sm">
                      No portfolios yet.
                    </Text>
                  ) : (
                    <div className="space-y-2">
                      {portfolios.map((p) => (
                        <button
                          key={p.id}
                          className={`w-full text-left rounded-md px-3 py-2 text-sm transition-colors ${
                            activePortfolioId === p.id
                              ? "bg-primary text-primary-foreground font-medium"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => setActivePortfolioId(p.id)}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  )}
                  <form
                    onSubmit={createPortfolio}
                    className="mt-4 border-t border-border pt-4 space-y-2"
                  >
                    <input
                      type="text"
                      placeholder="New portfolio name"
                      className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={newPortfolioName}
                      onChange={(e) => setNewPortfolioName(e.target.value)}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      variant="secondary"
                      className="w-full"
                    >
                      Create
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Add Holding Form */}
              {activePortfolioId && (
                <Card>
                  <CardContent className="p-4">
                    <Heading level={3} size="sm" className="mb-4">
                      Add Holding
                    </Heading>
                    <form onSubmit={addHolding} className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                          Asset Symbol
                        </label>
                        <select
                          required
                          className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          value={symbol}
                          onChange={(e) => setSymbol(e.target.value)}
                        >
                          <option value="">Select Asset...</option>
                          {assets.map((a) => (
                            <option key={a.symbol} value={a.symbol}>
                              {a.symbol} - {a.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                          Quantity
                        </label>
                        <input
                          type="number"
                          step="any"
                          required
                          min="0.0001"
                          placeholder="0.00"
                          className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                          Average Cost ($)
                        </label>
                        <input
                          type="number"
                          step="any"
                          required
                          min="0.01"
                          placeholder="0.00"
                          className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          value={averageCost}
                          onChange={(e) => setAverageCost(e.target.value)}
                        />
                      </div>
                      <Button type="submit" size="sm" className="w-full">
                        Add to Portfolio
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              {!activePortfolio ? (
                <Card className="h-full min-h-64 flex items-center justify-center">
                  <Text tone="muted">Select or create a portfolio to view holdings.</Text>
                </Card>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Text tone="muted" className="text-sm">
                          Total Value
                        </Text>
                        <div className="text-2xl font-bold">
                          $
                          {totalValue.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Text tone="muted" className="text-sm">
                          Total Return
                        </Text>
                        <div
                          className={`text-2xl font-bold ${totalReturn >= 0 ? "text-green-500" : "text-danger"}`}
                        >
                          {totalReturn >= 0 ? "+" : ""}$
                          {totalReturn.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Text tone="muted" className="text-sm">
                          Return %
                        </Text>
                        <div
                          className={`text-2xl font-bold ${returnPercentage >= 0 ? "text-green-500" : "text-danger"}`}
                        >
                          {returnPercentage >= 0 ? "+" : ""}
                          {returnPercentage.toFixed(2)}%
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <div className="overflow-x-auto p-1">
                      <Table className="w-full text-left">
                        <thead className="border-b border-border text-sm text-muted-foreground">
                          <tr>
                            <th className="p-4 font-medium">Asset</th>
                            <th className="p-4 font-medium text-right">Quantity</th>
                            <th className="p-4 font-medium text-right">Avg Cost</th>
                            <th className="p-4 font-medium text-right">Current Price</th>
                            <th className="p-4 font-medium text-right">Total Value</th>
                            <th className="p-4 font-medium text-right">Return</th>
                            <th className="p-4 font-medium text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {activePortfolio.holdings.length === 0 ? (
                            <tr>
                              <td
                                colSpan={7}
                                className="p-8 text-center text-muted-foreground"
                              >
                                No holdings yet. Add one from the sidebar.
                              </td>
                            </tr>
                          ) : (
                            activePortfolio.holdings.map((h) => {
                              const currentPrice =
                                getAssetCurrentPrice(h.symbol) || h.averageCost;
                              const value = currentPrice * h.quantity;
                              const cost = h.averageCost * h.quantity;
                              const ret = value - cost;
                              const retPct = (ret / cost) * 100;
                              return (
                                <tr key={h.id} className="hover:bg-muted/30">
                                  <td className="p-4 font-medium">{h.symbol}</td>
                                  <td className="p-4 text-right">{h.quantity}</td>
                                  <td className="p-4 text-right">
                                    $
                                    {h.averageCost.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}
                                  </td>
                                  <td className="p-4 text-right">
                                    $
                                    {currentPrice.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}
                                  </td>
                                  <td className="p-4 text-right font-medium">
                                    $
                                    {value.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}
                                  </td>
                                  <td
                                    className={`p-4 text-right font-medium ${ret >= 0 ? "text-green-500" : "text-danger"}`}
                                  >
                                    {ret >= 0 ? "+" : ""}
                                    {retPct.toFixed(2)}%
                                  </td>
                                  <td className="p-4 text-center">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-danger hover:bg-danger/10 hover:text-danger"
                                      onClick={() => removeHolding(h.id)}
                                    >
                                      Remove
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
