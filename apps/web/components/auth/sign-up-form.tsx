"use client";

import { signUpSchema } from "@repo/auth/validators";
import { Alert, Button, Input, Label, Text } from "@repo/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { signUp } from "../../lib/auth-client";

type SignUpValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = handleSubmit(async (values) => {
    setErrorMessage(null);

    const result = await signUp.email({
      email: values.email,
      name: values.username,
      password: values.password,
      username: values.username
    });

    if (result.error) {
      setErrorMessage(result.error.message ?? "Unable to create your account.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  });

  return (
    <form className="space-y-4" noValidate onSubmit={onSubmit}>
      {errorMessage ? <Alert tone="danger">{errorMessage}</Alert> : null}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input autoComplete="email" id="email" type="email" {...register("email")} />
        {errors.email ? (
          <Text className="text-[hsl(var(--danger))]" size="sm">
            {errors.email.message}
          </Text>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input autoComplete="username" id="username" {...register("username")} />
        {errors.username ? (
          <Text className="text-[hsl(var(--danger))]" size="sm">
            {errors.username.message}
          </Text>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          autoComplete="new-password"
          id="password"
          type="password"
          {...register("password")}
        />
        {errors.password ? (
          <Text className="text-[hsl(var(--danger))]" size="sm">
            {errors.password.message}
          </Text>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          autoComplete="new-password"
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <Text className="text-[hsl(var(--danger))]" size="sm">
            {errors.confirmPassword.message}
          </Text>
        ) : null}
      </div>
      <Button className="w-full" isLoading={isSubmitting} type="submit">
        Create account
      </Button>
      <Text tone="muted">
        Already have an account?{" "}
        <Link className="text-primary hover:underline" href="/signin">
          Sign in
        </Link>
      </Text>
    </form>
  );
}
