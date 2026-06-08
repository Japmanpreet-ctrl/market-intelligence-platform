"use client";

import { isEmailIdentifier, signInSchema } from "@repo/auth/validators";
import { Alert, Button, Input, Label, Text } from "@repo/ui";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { signIn } from "../../lib/auth-client";

type SignInValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = handleSubmit(async (values) => {
    setErrorMessage(null);

    const callbackURL = searchParams?.get("next") ?? "/dashboard";
    const result = isEmailIdentifier(values.identifier)
      ? await signIn.email({
          callbackURL,
          email: values.identifier,
          password: values.password
        })
      : await signIn.username({
          callbackURL,
          password: values.password,
          username: values.identifier
        });

    if (result.error) {
      setErrorMessage(result.error.message ?? "Unable to sign in.");
      return;
    }

    router.push(callbackURL);
    router.refresh();
  });

  return (
    <form className="space-y-4" noValidate onSubmit={onSubmit}>
      {errorMessage ? <Alert tone="danger">{errorMessage}</Alert> : null}
      <div className="space-y-2">
        <Label htmlFor="identifier">Email or username</Label>
        <Input autoComplete="username" id="identifier" {...register("identifier")} />
        {errors.identifier ? (
          <Text className="text-[hsl(var(--danger))]" size="sm">
            {errors.identifier.message}
          </Text>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          autoComplete="current-password"
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
      <Button className="w-full" isLoading={isSubmitting} type="submit">
        Sign in
      </Button>
      <Text tone="muted">
        Need an account?{" "}
        <Link className="text-primary hover:underline" href="/signup">
          Sign up
        </Link>
      </Text>
    </form>
  );
}
