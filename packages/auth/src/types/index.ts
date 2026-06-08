import type { Session, User } from "better-auth/types";

export type AuthSession = {
  session: Session;
  user: User & {
    username?: string | null;
    displayUsername?: string | null;
    status?: string | null;
  };
};

export type RouteAccessDecision =
  | { allowed: true }
  | { allowed: false; redirectTo: string };

export const PUBLIC_WEB_ROUTES = [
  "/",
  "/markets",
  "/learn",
  "/about",
  "/pricing",
  "/signin",
  "/signup",
  "/calendar"
] as const;

export const PROTECTED_WEB_ROUTES = [
  "/dashboard",
  "/watchlists",
  "/analytics",
  "/assistant",
  "/notifications",
  "/portfolio"
] as const;

export const ADMIN_ROUTES = ["/admin"] as const;

export const DEFAULT_USER_ROLE = "User";
export const ADMIN_ROLE = "Admin";

export const AUDIT_ACTIONS = {
  registered: "User Registered",
  loggedIn: "User Logged In",
  loggedOut: "User Logged Out"
} as const;
