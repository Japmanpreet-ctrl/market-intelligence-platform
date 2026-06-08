"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@repo/ui";

interface SearchResult {
  id: string;
  symbol: string;
  name: string;
}

export function AddAssetForm({ watchlistId }: { watchlistId: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);

    if (q.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/assets/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      }
    } catch (error) {
      console.error("Search failed", error);
    }
  }

  async function handleAdd(assetId: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/watchlists/${watchlistId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId })
      });

      if (res.ok) {
        setQuery("");
        setResults([]);
        router.refresh();
      } else {
        alert("Failed to add asset. It might already be in the watchlist.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <Input
        disabled={loading}
        onChange={handleSearch}
        placeholder="Search to add asset..."
        value={query}
      />
      {results.length > 0 && (
        <div className="absolute top-full z-10 mt-1 w-full rounded-md border border-border bg-card p-1 shadow-md">
          {results.map((asset) => (
            <button
              className="flex w-full items-center justify-between rounded px-3 py-2 text-sm transition-colors hover:bg-muted"
              key={asset.id}
              onClick={() => handleAdd(asset.id)}
            >
              <div className="flex flex-col text-left">
                <span className="font-medium">{asset.symbol}</span>
                <span className="text-xs text-muted-foreground">{asset.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
