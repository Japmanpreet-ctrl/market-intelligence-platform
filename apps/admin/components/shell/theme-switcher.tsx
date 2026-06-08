"use client";

import { Button } from "@repo/ui";

import { useTheme } from "./theme-provider";

const themes = ["light", "dark", "system"] as const;

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <div
      aria-label="Theme preference"
      className="flex rounded-lg border border-border p-1"
      role="group"
    >
      {themes.map((item) => (
        <Button
          aria-pressed={theme === item}
          className="min-h-8 px-3 capitalize"
          key={item}
          onClick={() => setTheme(item)}
          type="button"
          variant={theme === item ? "secondary" : "ghost"}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
