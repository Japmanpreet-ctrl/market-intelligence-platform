# Package Boundaries

Package boundaries are mandatory. They keep future feature work modular,
testable, and deployable.

## Ownership

`@repo/ui` owns reusable design-system primitives and design tokens.

`@repo/config` owns shared app metadata, constants, and environment validation.

`@repo/types` owns shared cross-cutting TypeScript contracts only.

`@repo/auth` will own authentication contracts and implementation.

`@repo/database` will own database schema, migrations, and database client access.

`@repo/analytics` will own dashboard, metric, report, and analytics contracts.

`@repo/ai` will own ARIA contracts, model provider abstractions, prompts,
retrieval interfaces, and AI tool contracts.

`@repo/learning` will own learning path, lesson, quiz, and progress contracts.

`@repo/market-data` will own market data provider adapters and normalization.

`@repo/portfolio` will own portfolio accounts, holdings, transactions, and
calculation contracts.

`@repo/notifications` will own event, workflow, channel, preference, and delivery
contracts.

`@repo/billing` will own subscriptions, entitlements, invoices, and billing
webhook contracts.

`@repo/cms` will own content, publishing, versioning, and editor contracts.

`@repo/observability` will own logging, tracing, metrics, and monitoring
contracts.

## Dependency Rules

Applications may import from packages.

Packages must not import from `apps/*`.

Feature packages should not import UI components unless a future phase explicitly
creates package-owned feature UI.

Domain packages should depend on `@repo/types` only when a type is genuinely
cross-cutting.

Provider SDKs must be hidden behind internal adapter interfaces. Applications
must not import provider SDKs directly.

## Import Rules

Use package imports:

```ts
import { Button } from "@repo/ui";
import { validateEnvironment } from "@repo/config";
```

Do not import across package internals:

```ts
// Not allowed
import { cn } from "../../packages/ui/src/utils/cn";
```

## Future Feature Module Strategy

Future features should add contracts first, then services, then UI. Route
handlers and pages should remain thin orchestration layers.

Recommended order:

1. Define domain contract in the owning package.
2. Add validation schemas and service interfaces.
3. Add tests around domain behavior.
4. Add app-level presentation.
5. Add integration tests for route or workflow behavior.
