# Session Management

## Session storage

Better Auth stores sessions in the `Session` table:

- session token
- expiry timestamp
- user relation
- optional IP address and user agent metadata

Credentials are stored in the `Account` table. Password hashes never leave Better Auth's credential handling path.

## Cookie model

Better Auth issues secure HTTP-only session cookies through the Next.js integration (`nextCookies()` plugin).

Middleware uses `getSessionCookie()` for lightweight presence checks on protected routes. Server components and layouts use `getServerSession()` for full session validation through `auth.api.getSession()`.

## Reusable helpers

| Helper                  | Location            | Purpose                                   |
| ----------------------- | ------------------- | ----------------------------------------- |
| `getServerSession()`    | `@repo/auth/server` | Read session in server components/actions |
| `getRequestSession()`   | `@repo/auth/server` | Read session from `NextRequest`           |
| `isSessionActive()`     | `@repo/auth/server` | Validate session expiry                   |
| `hasSessionCookie()`    | `@repo/auth/guards` | Middleware cookie presence check          |
| `requireAuth()`         | `@repo/auth/guards` | Redirect unauthenticated users            |
| `createAppAuthClient()` | `@repo/auth/client` | Type-safe client API                      |

## Protection layers

1. **Middleware** blocks obviously unauthenticated access to protected paths.
2. **Server guards** validate the session and RBAC state before rendering protected UI.
3. **Client hooks** (`useSession`) provide live session state in interactive components.

## Multi-app note

`@repo/web` and `@repo/admin` each mount `/api/auth/[...all]` and must use the matching app origin in `BETTER_AUTH_URL`. Sessions created on one origin are not automatically available on another origin during local development.
