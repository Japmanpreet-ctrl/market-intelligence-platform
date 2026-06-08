import type { HTMLAttributes, ReactNode } from "react";

import { Button } from "./button";
import { Heading, Text } from "./typography";
import { cn } from "../utils/cn";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "info" | "success" | "warning" | "danger";
}

export function Alert({ className, tone = "info", ...props }: AlertProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 text-sm",
        tone === "info" && "border-border",
        tone === "success" && "border-[hsl(var(--success))]/40",
        tone === "warning" && "border-[hsl(var(--warning))]/50",
        tone === "danger" && "border-[hsl(var(--danger))]/45",
        className
      )}
      role="status"
      {...props}
    />
  );
}

export function Toast({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card px-4 py-3 text-sm shadow-soft",
        className
      )}
      role="status"
      {...props}
    />
  );
}

interface StateProps extends HTMLAttributes<HTMLDivElement> {
  action?: ReactNode;
  description?: string;
  title: string;
}

export function EmptyState({
  action,
  className,
  description,
  title,
  ...props
}: StateProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-border p-8 text-center",
        className
      )}
      {...props}
    >
      <Heading level={2} size="sm">
        {title}
      </Heading>
      {description ? (
        <Text className="mx-auto mt-2 max-w-md" size="sm" tone="muted">
          {description}
        </Text>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function ErrorState({ className, description, title, ...props }: StateProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[hsl(var(--danger))]/40 p-8 text-center",
        className
      )}
      {...props}
    >
      <Heading level={2} size="sm">
        {title}
      </Heading>
      {description ? (
        <Text className="mx-auto mt-2 max-w-md" size="sm" tone="muted">
          {description}
        </Text>
      ) : null}
      <Button className="mt-4" type="button" variant="secondary">
        Retry
      </Button>
    </div>
  );
}

export function LoadingState({
  className,
  label = "Loading",
  ...props
}: HTMLAttributes<HTMLDivElement> & { label?: string }) {
  return (
    <div
      className={cn("flex items-center gap-3 text-sm text-muted-foreground", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      />
      <span>{label}</span>
    </div>
  );
}

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
  );
}
