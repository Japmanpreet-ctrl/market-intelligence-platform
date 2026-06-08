# Design Tokens

Design tokens are centralized in `@repo/ui`.

## Colors

Colors are implemented with HSL CSS variables and exposed through Tailwind
aliases.

- Background
- Foreground
- Card
- Surface elevated
- Border
- Muted
- Primary
- Danger
- Success
- Warning

## Spacing

The spacing scale uses predictable rem values:

- `1`: `0.25rem`
- `2`: `0.5rem`
- `3`: `0.75rem`
- `4`: `1rem`
- `6`: `1.5rem`
- `8`: `2rem`
- `12`: `3rem`
- `16`: `4rem`
- `20`: `5rem`
- `24`: `6rem`

## Typography

Typography uses a system sans stack and deliberate UI sizes:

- Display headings
- Page headings
- Section headings
- Body text
- Small text
- Labels
- Captions

## Elevation

Elevation tokens:

- `0`: no shadow
- `1`: small interface shadow
- `2`: soft panel shadow
- `3`: modal/overlay shadow

## Radius

Radius tokens:

- `sm`
- `md`
- `lg`
- `xl`
- `full`

## Motion

Motion tokens:

- `fast`: `120ms ease`
- `base`: `180ms ease`
- `slow`: `260ms ease`

Motion should respect reduced-motion preferences in future animated components.

## Z-Index

Z-index tokens:

- `base`
- `sticky`
- `overlay`
- `modal`
- `toast`

## Breakpoints

Breakpoints follow Tailwind defaults:

- `sm`: `640px`
- `md`: `768px`
- `lg`: `1024px`
- `xl`: `1280px`
- `2xl`: `1536px`
