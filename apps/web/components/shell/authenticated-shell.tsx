import Link from "next/link";
import type { ReactNode } from "react";
import { NavGroup, Panel, SearchInput, Sidebar, SidebarItem } from "@repo/ui";

import { ThemeSwitcher } from "./theme-switcher";
import { NotificationDropdown } from "./notification-dropdown";
import { UserDropdown } from "./user-dropdown";

const workspaceItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/markets", label: "Markets" },
  { href: "/watchlists", label: "Watchlists" },
  { href: "/calendar", label: "Calendar" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/analytics", label: "Analytics" },
  { href: "/learn", label: "Learn" },
  { href: "/assistant", label: "Assistant" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" }
];

export function AuthenticatedShell({
  children,
  userLabel = "User"
}: {
  children: ReactNode;
  userLabel?: string;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[260px_1fr]">
      <Sidebar className="hidden lg:flex">
        <div className="border-b border-border p-4">
          <Link className="text-sm font-semibold" href="/dashboard">
            Market Intelligence
          </Link>
        </div>
        <div className="flex-1 space-y-6 p-3">
          <NavGroup title="Workspace">
            {workspaceItems.map((item) => (
              <SidebarItem href={item.href} key={item.href}>
                {item.label}
              </SidebarItem>
            ))}
          </NavGroup>
        </div>
      </Sidebar>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6">
            <div className="flex-1">
              <SearchInput
                aria-label="Command menu placeholder"
                placeholder="Command menu placeholder"
              />
            </div>
            <ThemeSwitcher />
            <NotificationDropdown />
            <UserDropdown userLabel={userLabel} />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Panel className="min-h-[calc(100vh-7rem)]">{children}</Panel>
        </main>
      </div>
    </div>
  );
}
