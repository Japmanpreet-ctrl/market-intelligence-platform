import "dotenv/config";
import { prisma } from "@repo/database";
import { APIError } from "better-auth/api";
import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";

import {
  handleUserLoggedIn,
  handleUserLoggedOut,
  handleUserRegistered
} from "./lifecycle";

function getAuthSecret() {
  const secret = process.env.BETTER_AUTH_SECRET;

  if (!secret) {
    throw new Error(
      "BETTER_AUTH_SECRET missing. Create .env from .env.example and define BETTER_AUTH_SECRET."
    );
  }

  return secret;
}

function getTrustedOrigins() {
  const origins = new Set<string>();

  if (process.env.BETTER_AUTH_URL) {
    origins.add(process.env.BETTER_AUTH_URL);
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    origins.add(process.env.NEXT_PUBLIC_APP_URL);
  }

  if (process.env.NEXT_PUBLIC_ADMIN_URL) {
    origins.add(process.env.NEXT_PUBLIC_ADMIN_URL);
  }

  origins.add("http://localhost:3000");
  origins.add("http://localhost:3001");

  return [...origins];
}

export function createAuth(baseURL: string) {
  return betterAuth({
    account: {
      modelName: "Account"
    },
    advanced: {
      database: {
        generateId: false
      }
    },
    baseURL,
    database: prismaAdapter(prisma, {
      provider: "postgresql"
    }),
    databaseHooks: {
      session: {
        create: {
          after: async (session) => {
            await handleUserLoggedIn(session.userId, session.id);
          }
        },
        delete: {
          after: async (session) => {
            await handleUserLoggedOut(session.userId, session.id);
          }
        }
      },
      user: {
        create: {
          before: async (user) => {
            const existingByEmail = await prisma.user.findUnique({
              where: { email: user.email }
            });

            if (existingByEmail) {
              throw new APIError("BAD_REQUEST", {
                message: "Email is already registered."
              });
            }

            const usernameValue =
              typeof user.username === "string" ? user.username : undefined;

            if (usernameValue) {
              const existingByUsername = await prisma.user.findUnique({
                where: { username: usernameValue }
              });

              if (existingByUsername) {
                throw new APIError("BAD_REQUEST", {
                  message: "Username is already taken."
                });
              }
            }

            return {
              data: {
                ...user,
                name: user.name || usernameValue || user.email.split("@")[0] || user.email
              }
            };
          },
          after: async (user) => {
            await handleUserRegistered({
              email: user.email,
              id: user.id,
              name: user.name,
              username: typeof user.username === "string" ? user.username : user.name
            });
          }
        }
      }
    },
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8
    },
    plugins: [username(), nextCookies()],
    secret: getAuthSecret(),
    session: {
      modelName: "Session"
    },
    trustedOrigins: getTrustedOrigins(),
    user: {
      additionalFields: {
        status: {
          defaultValue: "ACTIVE",
          input: false,
          required: false,
          type: "string"
        }
      },
      modelName: "User"
    },
    verification: {
      modelName: "Verification"
    }
  });
}

const authInstances = new Map<string, ReturnType<typeof createAuth>>();

export function getAuth(
  baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000"
) {
  const existing = authInstances.get(baseURL);

  if (existing) {
    return existing;
  }

  const instance = createAuth(baseURL);
  authInstances.set(baseURL, instance);
  return instance;
}

export type Auth = ReturnType<typeof createAuth>;

export function auth() {
  return getAuth();
}
