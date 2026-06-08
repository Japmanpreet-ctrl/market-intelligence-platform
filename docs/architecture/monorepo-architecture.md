# Monorepo Architecture

The Market Intelligence Platform uses a pnpm workspace managed by TurboRepo.
The architecture follows the approved research synthesis: thin applications,
shared platform packages, and domain-owned boundaries.

## Repository Structure

```text
apps/
  web/
  admin/
packages/
  ui/
  config/
  types/
  auth/
  database/
  analytics/
  ai/
  learning/
  market-data/
  portfolio/
  notifications/
  billing/
  cms/
  observability/
docs/
  architecture/
  research/
.github/
  workflows/
```

## Applications

`apps/web` is the user-facing Next.js application. It owns routing, page
composition, metadata, and app-specific presentation. It must call domain
packages for feature logic in future phases.

`apps/admin` is the future administrative Next.js application. It owns admin
routes and admin-specific presentation only. No admin business features exist in
the foundation phase.

## Shared Packages

Packages are the ownership boundary for platform capabilities. Applications may
depend on packages, but packages must not depend on applications.

The foundation phase intentionally keeps domain packages as placeholder
contracts. Business behavior will be added only in later approved phases.

## Build Graph

Turbo runs package tasks before dependent app tasks. Every app and package must
provide these scripts:

- `build`
- `lint`
- `test`
- `typecheck`

CI runs the same commands as local development.

## Deployment Target

The deployment target is Vercel. The foundation is prepared for separate web and
admin deployments from the monorepo, with shared packages transpiled by Next.js.
