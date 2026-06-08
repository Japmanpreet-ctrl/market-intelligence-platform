# Layout System

The layout system is composed in application shells while shared primitives live
in `@repo/ui`.

## Public Shell

The public shell includes:

- Sticky header
- Responsive primary navigation
- Mobile horizontal navigation row
- Theme switcher
- Sign In and Get Started placeholders
- Footer navigation
- Main content region

Routes using the public shell:

- `/`
- `/markets`
- `/learn`
- `/analytics`
- `/about`
- `/pricing`
- `/signin`

## Authenticated Shell

The authenticated shell is a dashboard framework only. It includes:

- Desktop sidebar
- Top navigation
- Command menu placeholder
- Notification placeholder
- User menu placeholder
- Content panel

Route using the authenticated shell:

- `/dashboard`

## Admin Shell

The admin shell includes:

- Admin sidebar
- Admin header
- Admin command placeholder
- Admin user menu placeholder
- Admin content panel

Routes using the admin shell:

- admin app `/`
- admin app `/admin`

## Responsive Behavior

Mobile:

- Public navigation becomes horizontally scrollable.
- Sidebars are hidden.
- Content uses compact padding.

Tablet:

- Public navigation keeps readable spacing.
- Dashboard content remains single-column.

Desktop:

- Dashboard and admin shells use fixed sidebars.
- Header tools remain visible.

Wide desktop:

- Containers cap at `max-w-7xl`.
- Content panels preserve readable line length.
