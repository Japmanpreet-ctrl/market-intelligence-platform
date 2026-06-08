import Link from "next/link";
import type { ReactNode } from "react";
import { Button, Container, Navbar } from "@repo/ui";

import { ThemeSwitcher } from "./theme-switcher";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/markets", label: "Markets" },
  { href: "/learn", label: "Learn" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" }
];

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <Container>
          <Navbar className="min-h-16">
            <Link className="text-sm font-semibold" href="/">
              Market Intelligence Platform
            </Link>
            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden lg:block">
                <ThemeSwitcher />
              </div>
              <Button asChild variant="ghost">
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </Navbar>
          <nav aria-label="Mobile" className="flex gap-1 overflow-x-auto pb-3 md:hidden">
            {navItems.map((item) => (
              <Link
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </header>
      {children}
      <footer className="border-t border-border">
        <Container className="flex flex-col gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Market Intelligence Platform</p>
          <div className="lg:hidden">
            <ThemeSwitcher />
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-4">
            {navItems.map((item) => (
              <Link className="hover:text-foreground" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </footer>
    </div>
  );
}
