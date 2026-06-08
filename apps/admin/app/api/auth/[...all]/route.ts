import { createAuthRouteHandlers } from "@repo/auth/server";

const baseURL =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_ADMIN_URL ??
  "http://localhost:3001";

export const { GET, POST } = createAuthRouteHandlers(baseURL);
