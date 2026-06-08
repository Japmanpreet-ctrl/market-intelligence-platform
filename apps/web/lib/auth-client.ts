"use client";

import { createAppAuthClient } from "@repo/auth/client";

const baseURL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const authClient = createAppAuthClient(baseURL);

export const { signIn, signOut, signUp, useSession } = authClient;
