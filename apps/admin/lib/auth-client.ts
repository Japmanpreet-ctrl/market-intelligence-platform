"use client";

import { createAppAuthClient } from "@repo/auth/client";

const baseURL = process.env.NEXT_PUBLIC_ADMIN_URL ?? "http://localhost:3001";

export const authClient = createAppAuthClient(baseURL);

export const { signIn, signOut, useSession } = authClient;
