# Theme System

The platform supports light, dark, and system theme preferences.

## Storage

Theme preference is persisted in `localStorage` using the `theme` key.

Allowed values:

- `light`
- `dark`
- `system`

## Application

Theme providers live in each app shell boundary and toggle the `dark` class on
the document element.

When `system` is selected, the provider follows
`prefers-color-scheme: dark`.

## Tokens

Theme colors are exposed as CSS variables from `@repo/ui/styles.css`.

Core variables:

- `--background`
- `--foreground`
- `--card`
- `--card-foreground`
- `--surface-elevated`
- `--border`
- `--muted`
- `--muted-foreground`
- `--primary`
- `--primary-foreground`
- `--danger`
- `--danger-foreground`
- `--success`
- `--warning`

## Accessibility

Focus states use visible outlines. Theme controls use `aria-pressed` and grouped
button semantics.
