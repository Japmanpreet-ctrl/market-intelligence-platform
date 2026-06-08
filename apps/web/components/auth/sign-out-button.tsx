"use client";

import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signOut } from "../../lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      isLoading={isLoading}
      onClick={async () => {
        setIsLoading(true);
        await signOut();
        router.push("/signin");
        router.refresh();
      }}
      type="button"
      variant="secondary"
    >
      Sign out
    </Button>
  );
}
