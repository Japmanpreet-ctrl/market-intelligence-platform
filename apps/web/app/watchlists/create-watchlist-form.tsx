"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@repo/ui";

export function CreateWatchlistForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/watchlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });

      if (res.ok) {
        setName("");
        router.refresh();
      } else {
        console.error("Failed to create watchlist");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="flex items-center gap-2" onSubmit={onSubmit}>
      <Input
        disabled={loading}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Watchlist Name"
        value={name}
      />
      <Button disabled={loading || !name.trim()} type="submit">
        {loading ? "Creating..." : "Create"}
      </Button>
    </form>
  );
}
