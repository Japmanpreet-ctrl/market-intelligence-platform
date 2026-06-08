import type { HTMLAttributes, TableHTMLAttributes } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Caption, Text } from "./typography";
import { cn } from "../utils/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center rounded-full border border-border bg-muted px-2 text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function Avatar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid size-9 place-items-center rounded-full bg-muted text-sm font-semibold text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border">
      <table
        className={cn("w-full border-collapse text-left text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function StatCard({
  className,
  label,
  value,
  ...props
}: HTMLAttributes<HTMLDivElement> & { label: string; value: string }) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <Caption>{label}</Caption>
        <CardTitle>{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}

export function MetricCard({
  className,
  description,
  label,
  value,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  description?: string;
  label: string;
  value: string;
}) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <Caption>{label}</Caption>
        <CardTitle>{value}</CardTitle>
      </CardHeader>
      {description ? (
        <CardContent>
          <Text size="sm" tone="muted">
            {description}
          </Text>
        </CardContent>
      ) : null}
    </Card>
  );
}
