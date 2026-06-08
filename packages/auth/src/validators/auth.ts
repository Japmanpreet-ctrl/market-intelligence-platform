import { z } from "zod";

const usernamePattern = /^[a-zA-Z0-9_]+$/;

export const signUpSchema = z
  .object({
    confirmPassword: z.string().min(8, "Confirm your password."),
    email: z.email("Enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password must be 128 characters or fewer."),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(30, "Username must be 30 characters or fewer.")
      .regex(
        usernamePattern,
        "Username can only contain letters, numbers, and underscores."
      )
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, "Enter your email or username.")
    .max(255, "Identifier is too long."),
  password: z.string().min(1, "Enter your password.")
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;

export function isEmailIdentifier(identifier: string) {
  return z.email().safeParse(identifier).success;
}
