import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../utils/cn";

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  title?: string;
}

export function Modal({
  children,
  className,
  open = false,
  title,
  ...props
}: OverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/20 p-4"
      role="presentation"
    >
      <div
        aria-modal="true"
        className={cn(
          "w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-soft",
          className
        )}
        role="dialog"
        {...props}
      >
        {title ? <h2 className="text-lg font-semibold">{title}</h2> : null}
        {children}
      </div>
    </div>
  );
}

export function Drawer({
  children,
  className,
  open = false,
  title,
  ...props
}: OverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-foreground/20"
      role="presentation"
    >
      <aside
        aria-label={title}
        className={cn(
          "h-full w-full max-w-md border-l border-border bg-card p-6 shadow-soft",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    </div>
  );
}

export function Popover({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-3 text-sm shadow-soft",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Tooltip({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md bg-foreground px-2 py-1 text-xs text-background",
        className
      )}
      role="tooltip"
      {...props}
    >
      {children}
    </div>
  );
}

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  trigger?: ReactNode;
}

export function Dropdown({ children, className, trigger, ...props }: DropdownProps) {
  return (
    <div className={cn("relative inline-flex", className)} {...props}>
      {trigger}
      <div className="absolute right-0 top-full z-40 mt-2 min-w-44 rounded-lg border border-border bg-card p-1 shadow-soft">
        {children}
      </div>
    </div>
  );
}
