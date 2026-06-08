# Database Architecture

The database foundation uses PostgreSQL 17 locally through Docker Compose and
Prisma as the ORM. This phase is development-only infrastructure; production
hosting and connection pooling are deferred to a later deployment phase.

## Package Ownership

`@repo/database` is the only package that owns:

- `packages/database/prisma/schema.prisma`
- Prisma migrations
- Prisma Client generation
- Database seed logic
- Database type exports
- The Prisma client singleton

Applications and packages must import from the package entrypoint:

```ts
import { prisma } from "@repo/database";
```

No application or feature package should instantiate `PrismaClient` directly.

## Current Domain Scope

The schema includes only identity foundation tables:

- `User`
- `Profile`
- `Role`
- `Permission`
- `UserRole`
- `RolePermission`
- `Session`
- `AuditLog`

No authentication flow, API route, protected route, or business-domain model is
implemented in this phase.

## Relationship Decisions

- `User` to `Profile` is one-to-one. Deleting a user deletes the profile.
- `User` to `Role` is many-to-many through `UserRole`.
- `Role` to `Permission` is many-to-many through `RolePermission`.
- `Session` belongs to `User` and is removed when the user is removed.
- `AuditLog.actorUserId` is nullable and uses `SetNull` on user deletion so
  historical compliance records can remain without a live actor record.

## Indexing Decisions

The schema includes targeted indexes for expected identity operations:

- User lookup by status and creation date.
- Session cleanup by expiration date.
- Join-table reverse lookups for role and permission checks.
- Audit filtering by actor, entity, and creation date.

Indexes are intentionally narrow to avoid premature tuning before real query
patterns exist.

## Future Expansion Strategy

Future domains should extend the Prisma schema only when the owning package and
prompt phase require persistent data. Domain ownership remains at the package
level, but physical schema ownership remains centralized in `@repo/database`.

Recommended order for future database work:

1. Define the domain contract in the owning package.
2. Add Prisma models in `@repo/database`.
3. Create a migration.
4. Export only necessary database types.
5. Add seed data only for baseline local development needs.
