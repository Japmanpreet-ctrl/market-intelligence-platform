# @repo/auth

Authentication and RBAC boundary for the platform.

## Exports

- `@repo/auth` — shared contracts and re-exports
- `@repo/auth/server` — Better Auth instance, session helpers, audit hooks
- `@repo/auth/client` — typed Better Auth React client factory
- `@repo/auth/guards` — middleware and server route guards
- `@repo/auth/permissions` — role and permission resolution
- `@repo/auth/validators` — sign-up and sign-in schemas

## Usage

### Server route handler

```ts
import { auth } from "@repo/auth/server";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

### Protect a page

```ts
import { requireAuth } from "@repo/auth/guards";

const session = await requireAuth();
```

### Client

```ts
import { createAppAuthClient } from "@repo/auth/client";

export const authClient = createAppAuthClient("http://localhost:3000");
```
