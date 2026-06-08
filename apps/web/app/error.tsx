"use client";

import { Button, Container, Section } from "@repo/ui";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <html lang="en">
      <body>
        <main>
          <Section>
            <Container className="flex min-h-screen flex-col items-center justify-center text-center">
              <h1 className="text-3xl font-semibold tracking-normal">
                Something went wrong
              </h1>
              <p className="mt-3 max-w-md text-muted-foreground">
                The application foundation caught an unexpected error.
              </p>
              <Button className="mt-6" type="button" onClick={reset}>
                Try again
              </Button>
              {error.digest ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Error ID: {error.digest}
                </p>
              ) : null}
            </Container>
          </Section>
        </main>
      </body>
    </html>
  );
}
