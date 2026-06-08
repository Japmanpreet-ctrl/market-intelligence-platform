import { z } from "zod";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);

export const envSchema = z.object({
  DATABASE_URL: z.preprocess(emptyToUndefined, z.string().url().optional()),
  FINNHUB_API_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  NEXT_PUBLIC_APP_URL: z.preprocess(emptyToUndefined, z.string().url().optional()),
  OPENAI_API_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
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
