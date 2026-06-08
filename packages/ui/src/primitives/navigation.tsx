import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import { cn } from "../utils/cn";

export function Navbar({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center justify-between gap-4", className)}
      aria-label={props["aria-label"] ?? "Primary"}
      {...props}
    />
  );
}

export function Sidebar({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <aside
      className={cn("flex h-full flex-col border-r border-border bg-card", className)}
      {...props}
    />
  );
}

export function SidebarItem({
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "flex min-h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
      {...props}
    />
  );
}

interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: Array<{ href?: string; label: string }>;
}

export function Breadcrumb({ className, items, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className} {...props}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li className="flex items-center gap-2" key={`${item.label}-${index}`}>
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <a className="hover:text-foreground" href={item.href}>
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Array<{ label: string; selected?: boolean }>;
}

export function Tabs({ className, tabs, ...props }: TabsProps) {
  return (
    <div
      className={cn("flex gap-1 rounded-lg bg-muted p-1", className)}
      role="tablist"
      {...props}
    >
      {tabs.map((tab) => (
        <button
          aria-selected={tab.selected}
          className={cn(
            "min-h-8 rounded-md px-3 text-sm font-medium text-muted-foreground",
            tab.selected && "bg-background text-foreground shadow-sm"
          )}
          key={tab.label}
          role="tab"
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

interface PaginationProps extends HTMLAttributes<HTMLElement> {
  currentPage?: number;
  pageCount?: number;
}

export function Pagination({
  className,
  currentPage = 1,
  pageCount = 1,
  ...props
}: PaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      <button className="rounded-md border border-border px-3 py-2 text-sm" type="button">
        Previous
      </button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {pageCount}
      </span>
      <button className="rounded-md border border-border px-3 py-2 text-sm" type="button">
        Next
      </button>
    </nav>
  );
}

export function NavGroup({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="space-y-1">
      <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}
