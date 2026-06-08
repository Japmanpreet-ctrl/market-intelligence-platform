import Link from "next/link";
import type { ReactNode } from "react";
import {
  Avatar,
  Heading,
  NavGroup,
  Panel,
  SearchInput,
  Sidebar,
  SidebarItem
} from "@repo/ui";

import { ThemeSwitcher } from "./theme-switcher";

const adminItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin", label: "Content" },
  { href: "/admin", label: "Users" },
  { href: "/admin", label: "Settings" }
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[260px_1fr]">
      <Sidebar className="hidden lg:flex">
        <div className="border-b border-border p-4">
          <Link className="text-sm font-semibold" href="/admin">
            Admin Foundation
          </Link>
        </div>
        <div className="flex-1 space-y-6 p-3">
          <NavGroup title="Admin">
            {adminItems.map((item) => (
              <SidebarItem href={item.href} key={item.label}>
                {item.label}
              </SidebarItem>
            ))}
          </NavGroup>
        </div>
      </Sidebar>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
          <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6">
            <Heading className="hidden flex-1 sm:block" level={1} size="sm">
              Admin Shell
            </Heading>
            <div className="flex-1 sm:max-w-sm">
              <SearchInput
                aria-label="Admin command placeholder"
                placeholder="Admin command placeholder"
              />
            </div>
            <ThemeSwitcher />
            <Avatar aria-label="Admin user menu placeholder">A</Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Panel className="min-h-[calc(100vh-7rem)]">{children}</Panel>
        </main>
      </div>
    </div>
  );
}
