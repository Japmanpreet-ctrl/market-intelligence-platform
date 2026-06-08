# Development Workflow

## Setup

Install dependencies:

```bash
pnpm install
```

Run all verification tasks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Local Development

Run all apps:

```bash
pnpm dev
```

Run the web app only:

```bash
pnpm --filter @repo/web dev
```

Run the admin app only:

```bash
pnpm --filter @repo/admin dev
```

## Quality Gates

Before merging, the following must pass:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The CI workflow runs the same sequence.

## Adding A Future Feature

Future feature work should follow the package ownership model:

1. Add contracts to the owning package.
2. Add validation and service boundaries.
3. Add tests.
4. Add app-level UI.
5. Add integration coverage.

## Adding A Dependency

Add dependencies to the package or app that uses them. Do not add feature-specific
dependencies at the root unless they are shared tooling.

## Environment Changes

Environment validation is centralized in `@repo/config`. Future prompts that add
new runtime integrations must update the schema and `.env.example` together.
