# @repo/database

`@repo/database` owns the database foundation for the Market Intelligence
Platform.

## Responsibility

This package owns:

- Prisma schema and migrations.
- Prisma client generation and singleton access.
- Seed workflows.
- Database-owned TypeScript types.

No other package should define Prisma models, instantiate its own Prisma client,
or own database migrations.

## Boundaries

Applications and future feature packages may import database contracts through:

```ts
import { prisma } from "@repo/database";
import type { User } from "@repo/database";
```

Imports from `packages/database/prisma/*` or `packages/database/src/client/*`
outside this package should be avoided. The package entrypoint is the stable
boundary.

## Local Workflow

Start the local database:

```bash
docker compose up -d
```

Generate Prisma Client:

```bash
pnpm prisma generate
```

Create and apply a migration:

```bash
pnpm prisma migrate dev --name describe_change
```

Apply existing migrations:

```bash
pnpm prisma migrate dev
```

Seed baseline identity data:

```bash
pnpm prisma db seed
```

Reset the local database:

```bash
pnpm prisma migrate reset
```

## Current Schema Scope

Prompt 3 includes only the identity domain:

- Users and profiles.
- Roles and permissions.
- User-role and role-permission mappings.
- Future session records.
- Audit logs for security and compliance events.

Authentication, APIs, market data, portfolio data, learning data, billing, CMS,
AI, and notification domains are intentionally not implemented here.
