export { createAppAuthClient } from "./client";
export {
  evaluateAdminRouteAccess,
  evaluateWebRouteAccess,
  hasSessionCookie,
  isAdminRoute,
  isProtectedWebRoute,
  isPublicWebRoute,
  protectWebRoutes,
  requireAuth,
  requirePermission,
  requireRole
} from "./guards";
export { getUserPermissions, getUserRoles, hasPermission, hasRole } from "./permissions";
export {
  auth,
  createAuth,
  createAuthRouteHandlers,
  getAuth,
  getRequestSession,
  getServerSession,
  isSessionActive,
  recordAuditLog,
  recordUserLoggedIn,
  recordUserLoggedOut,
  recordUserRegistered
} from "./server";
export type { Auth } from "./server";
export {
  ADMIN_ROLE,
  ADMIN_ROUTES,
  AUDIT_ACTIONS,
  DEFAULT_USER_ROLE,
  PROTECTED_WEB_ROUTES,
  PUBLIC_WEB_ROUTES,
  type AuthSession,
  type RouteAccessDecision
} from "./types";
export {
  isEmailIdentifier,
  signInSchema,
  signUpSchema,
  type SignInInput,
  type SignUpInput
} from "./validators";
