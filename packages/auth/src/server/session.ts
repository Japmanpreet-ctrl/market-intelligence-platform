import { headers } from "next/headers";
import type { NextRequest } from "next/server";

import type { AuthSession } from "../types";
import { getAuth } from "./auth";

export async function getServerSession(baseURL?: string): Promise<AuthSession | null> {
  const auth = getAuth(baseURL);
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders
  });

  return session;
}

export async function getRequestSession(
  request: NextRequest,
  baseURL?: string
): Promise<AuthSession | null> {
  const auth = getAuth(baseURL);

  const session = await auth.api.getSession({
    headers: request.headers
  });

  return session;
}

export function isSessionActive(session: AuthSession | null): boolean {
  if (!session?.session) {
    return false;
  }

  return new Date(session.session.expiresAt).getTime() > Date.now();
}
