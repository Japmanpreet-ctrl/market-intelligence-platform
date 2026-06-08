# RBAC

## Data model

Role-based access control uses the identity schema seeded in Prompt 3:

- `Role`
- `Permission`
- `UserRole`
- `RolePermission`

Default roles:

- `Admin`
- `User`
- `Partner`
- `Support`

New registrations receive the `User` role automatically.

## Resolution helpers

Implemented in `@repo/auth/permissions`:

- `getUserRoles(userId)`
- `getUserPermissions(userId)`
- `hasRole(userId, roleName)`
- `hasPermission(userId, permissionName)`

## Server guards

Implemented in `@repo/auth/guards`:

- `requireAuth()`
- `requireRole(roleName)`
- `requirePermission(permissionName)`

Guards read the current Better Auth session, then query RBAC tables through Prisma.

## Route policy

### Web

Public:

- `/`
- `/markets`
- `/learn`
- `/about`
- `/pricing`
- `/signin`
- `/signup`

Protected:

- `/dashboard` requires authentication

### Admin

- `/admin` requires authentication and the `Admin` role
- non-admin authenticated users are redirected away from admin routes

## Permission model

Permissions are resolved through role assignments. Example seeded permissions:

- `users.read`
- `users.write`
- `content.read`
- `content.write`
- `analytics.read`
- `support.read`
- `support.write`

Prompt 4 wires permission resolution helpers for future feature gates. Dashboard and admin protection currently rely on authentication and role checks.
