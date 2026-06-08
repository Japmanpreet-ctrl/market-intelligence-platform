import { describe, expect, it } from "vitest";

import { isEmailIdentifier, signInSchema, signUpSchema } from "./auth";

describe("signUpSchema", () => {
  it("accepts valid registration input", () => {
    const result = signUpSchema.safeParse({
      confirmPassword: "password123",
      email: "user@example.com",
      password: "password123",
      username: "market_user"
    });

    expect(result.success).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = signUpSchema.safeParse({
      confirmPassword: "different",
      email: "user@example.com",
      password: "password123",
      username: "market_user"
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid usernames", () => {
    const result = signUpSchema.safeParse({
      confirmPassword: "password123",
      email: "user@example.com",
      password: "password123",
      username: "bad username"
    });

    expect(result.success).toBe(false);
  });
});

describe("signInSchema", () => {
  it("accepts email or username identifiers", () => {
    expect(
      signInSchema.safeParse({
        identifier: "user@example.com",
        password: "password123"
      }).success
    ).toBe(true);

    expect(
      signInSchema.safeParse({
        identifier: "market_user",
        password: "password123"
      }).success
    ).toBe(true);
  });
});

describe("isEmailIdentifier", () => {
  it("detects email identifiers", () => {
    expect(isEmailIdentifier("user@example.com")).toBe(true);
    expect(isEmailIdentifier("market_user")).toBe(false);
  });
});
