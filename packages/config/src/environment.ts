import { z } from "zod";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);

export const envSchema = z.object({
  BETTER_AUTH_SECRET: z.preprocess(emptyToUndefined, z.string().min(32).optional()),
  BETTER_AUTH_URL: z.preprocess(emptyToUndefined, z.string().url().optional()),
  DATABASE_URL: z.preprocess(emptyToUndefined, z.string().url().optional()),
  FINNHUB_API_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  NEXT_PUBLIC_ADMIN_URL: z.preprocess(emptyToUndefined, z.string().url().optional()),
  NEXT_PUBLIC_APP_URL: z.preprocess(emptyToUndefined, z.string().url().optional()),
  OPENAI_API_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  PGADMIN_EMAIL: z.preprocess(emptyToUndefined, z.string().email().optional()),
  PGADMIN_PASSWORD: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  POSTGRES_DB: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  POSTGRES_PASSWORD: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  POSTGRES_USER: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  RESEND_API_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  SENTRY_DSN: z.preprocess(emptyToUndefined, z.string().url().optional()),
  STRIPE_SECRET_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  TRADING_ECONOMICS_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional())
});

export type Environment = z.infer<typeof envSchema>;

export function validateEnvironment(
  source: NodeJS.ProcessEnv = process.env
): Environment {
  const parsed = envSchema.safeParse(source);

  if (!parsed.success) {
    throw new Error(`Invalid environment configuration: ${parsed.error.message}`);
  }

  return parsed.data;
}

export function getEnvironment(source: NodeJS.ProcessEnv = process.env): Environment {
  return validateEnvironment(source);
}
