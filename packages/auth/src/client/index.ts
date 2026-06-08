import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export function createAppAuthClient(baseURL: string) {
  return createAuthClient({
    baseURL,
    plugins: [usernameClient()]
  });
}
