"use client";

import { Button } from "@repo/ui";

interface GlobalErrorProps {
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
          <h1 className="text-3xl font-semibold tracking-normal">Application error</h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            The web foundation recovered to a safe error boundary.
          </p>
          <Button className="mt-6" type="button" onClick={reset}>
            Try again
          </Button>
        </main>
      </body>
    </html>
  );
}
