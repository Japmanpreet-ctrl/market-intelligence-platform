export { auth, createAuth, getAuth } from "./auth";
// auth is a lazy accessor function
export type { Auth } from "./auth";
export { createAuthRouteHandlers } from "./handlers";
export {
  recordAuditLog,
  recordUserLoggedIn,
  recordUserLoggedOut,
  recordUserRegistered
} from "./audit";
export {
  assignDefaultUserRole,
  ensureUserProfile,
  handleUserLoggedIn,
  handleUserLoggedOut,
  handleUserRegistered
} from "./lifecycle";
export { getRequestSession, getServerSession, isSessionActive } from "./session";
