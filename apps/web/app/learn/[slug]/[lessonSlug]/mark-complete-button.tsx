"use client";

import { useState } from "react";
import { Button } from "@repo/ui";

export function MarkCompleteButton({
  courseId,
  lessonId
}: {
  courseId: string;
  lessonId: string;
}) {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/learn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId })
      });
      if (res.ok) {
        setCompleted(true);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return (
      <Button disabled variant="secondary">
        ✓ Completed
      </Button>
    );
  }

  return (
    <Button disabled={loading} onClick={handleClick} variant="primary">
      {loading ? "Saving..." : "Mark as Complete"}
    </Button>
  );
}
