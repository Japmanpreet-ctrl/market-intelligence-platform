import type { HTMLAttributes } from "react";

import { cn } from "../utils/cn";

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-card p-4 shadow-sm", className)}
      {...props}
    />
  );
}
