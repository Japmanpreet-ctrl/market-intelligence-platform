# Authentication Architecture

## Overview

Authentication is implemented with Better Auth inside `@repo/auth` and persisted in PostgreSQL through Prisma (`@repo/database`).

Applications (`@repo/web`, `@repo/admin`) mount Better Auth API routes and use shared guards, validators, and RBAC helpers. Application routes must not implement authentication logic directly.

## Stack

- **Better Auth** for session-based email/password authentication
- **Prisma adapter** for PostgreSQL persistence
- **Username plugin** for username sign-up and username sign-in
- **Next.js route handlers** at `/api/auth/[...all]`
- **Middleware + server guards** for route protection

## Sign-up flow

1. User submits email, username, password, and confirm password on `/signup`.
2. Client-side validation runs through `signUpSchema` in `@repo/auth/validators`.
3. Better Auth creates the user, account credentials, and session.
4. Database hooks in `@repo/auth/server/auth.ts`:
   - reject duplicate email or username
   - assign the default `User` role
   - create a `Profile` record
   - set user status to `ACTIVE`
   - write a `User Registered` audit log entry

## Sign-in flow

1. User submits email or username plus password on `/signin`.
2. Client chooses `signIn.email` or `signIn.username`.
3. Better Auth validates credentials and creates a session cookie.
4. Session creation writes a `User Logged In` audit log entry.
5. User is redirected to `/dashboard`.

## Sign-out flow

1. Client calls `signOut()`.
2. Better Auth invalidates the session.
3. Session deletion writes a `User Logged Out` audit log entry.

## Package boundaries

| Package          | Responsibility                                                               |
| ---------------- | ---------------------------------------------------------------------------- |
| `@repo/database` | Prisma schema, migrations, seed data, Prisma client                          |
| `@repo/auth`     | Better Auth config, session helpers, RBAC, guards, validators, audit helpers |
| `@repo/web`      | Public auth pages, dashboard, web middleware                                 |
| `@repo/admin`    | Admin sign-in, admin middleware, admin-only layout guard                     |

## Environment

| Variable                | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| `DATABASE_URL`          | PostgreSQL connection string             |
| `BETTER_AUTH_SECRET`    | Session signing secret                   |
| `BETTER_AUTH_URL`       | Auth server base URL for the current app |
| `NEXT_PUBLIC_APP_URL`   | Web app origin                           |
| `NEXT_PUBLIC_ADMIN_URL` | Admin app origin                         |

Each Next.js app must use its own `BETTER_AUTH_URL` origin in local development because session cookies are origin-scoped.
