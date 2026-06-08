"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";

export function WatchlistActions({
  watchlistId,
  watchlistName
}: {
  watchlistId: string;
  watchlistName: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onDelete() {
    if (!confirm(`Are you sure you want to delete ${watchlistName}?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/watchlists/${watchlistId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        router.push("/watchlists");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button disabled={loading} onClick={onDelete} variant="danger">
      {loading ? "Deleting..." : "Delete Watchlist"}
    </Button>
  );
}

WatchlistActions.RemoveAsset = function RemoveAsset({
  watchlistId,
  assetId
}: {
  watchlistId: string;
  assetId: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onRemove() {
    setLoading(true);
    try {
      const res = await fetch(`/api/watchlists/${watchlistId}/items`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId })
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button disabled={loading} onClick={onRemove} size="sm" variant="ghost">
      Remove
    </Button>
  );
};
