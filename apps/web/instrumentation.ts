import { validateEnvironment } from "@repo/config";

export async function register() {
  validateEnvironment();
}
