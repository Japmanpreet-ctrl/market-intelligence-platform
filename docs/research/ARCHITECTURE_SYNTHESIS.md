# Architecture Synthesis

Research date: 2026-06-08

This synthesis converts the open-source research into recommended architecture direction for `market-intelligence-platform`.

## 1. Architecture Patterns To Adopt

Adopt a production SaaS monorepo:

```text
apps/
  web/
  admin/
packages/
  ui/
  database/
  auth/
  analytics/
  ai/
  notifications/
  market-data/
  portfolio/
  learning/
  cms/
  billing/
  observability/
```

Use `next-forge` as the strongest pattern source: applications should be thin product shells, while reusable domain logic lives in package boundaries.

Adopt domain modules rather than technical dumping grounds:
- `market-data`: provider adapters, normalized instruments, economic events, source attribution.
- `portfolio`: accounts, holdings, transactions, performance, allocations.
- `analytics`: dashboards, widgets, saved views, semantic metrics.
- `ai`: conversations, prompts, retrieval, tools, model providers, run logs.
- `learning`: lessons, paths, quizzes, progress.
- `notifications`: events, preferences, templates, deliveries.
- `cms`: content collections, publishing workflow, rich editor config.
- `billing`: plans, subscriptions, entitlements, invoices, webhooks.

Adopt provider abstraction from OpenBB, Dify, Novu, and Cal.com:
- Every external service should sit behind an internal adapter.
- Store provider, source, timestamp, and confidence/provenance metadata with imported data.
- Keep provider-specific response shapes out of product UI.

Adopt event-driven workflows:
- Use domain events for market data updates, calendar reminders, portfolio threshold alerts, onboarding milestones, billing changes, and ARIA runs.
- Use durable background jobs for retries, schedules, digests, data refresh, and AI workflows.

Adopt metadata-driven dashboard composition:
- Dashboards should be persisted as layout plus widget configuration.
- Widgets should read from typed data contracts, not arbitrary component state.
- Saved views, filters, and time ranges should be first-class records.

Adopt education-first UX:
- Follow Metabase and freeCodeCamp: guide users through concepts progressively.
- Pair every advanced analytics workflow with glossary, examples, and suggested next actions.
- Treat onboarding as a learning path, not a form wizard.

## 2. Architecture Patterns To Avoid

Avoid copying BI platforms wholesale:
- Grafana, Metabase, and Superset are too large to reproduce.
- Adopt dashboard, semantic layer, and query ideas without inheriting plugin sprawl.

Avoid a generic chatbot architecture:
- ARIA should be a market intelligence assistant with tools, citations, user context, and portfolio awareness.
- Do not ship a floating chat box disconnected from workflows.

Avoid exposing raw database concepts to editors:
- Directus-style database-first admin can be powerful, but education and CMS users need curated content models.

Avoid premature multi-tenant enterprise complexity:
- SSO, SCIM, and complex RBAC should be modular.
- Start with organizations, memberships, roles, audit logs, and entitlements.

Avoid direct dependency on one market data provider:
- Financial data terms, rate limits, coverage, and reliability vary.
- Normalize provider outputs through a market data adapter layer.

Avoid weak affiliate/referral OSS as architectural foundation:
- Mature open-source affiliate systems are rare.
- Use Dub and Cal.com for attribution and partner marketplace patterns; design internal commission rules carefully.

Avoid putting all business logic in Next.js route handlers:
- Route handlers should call services in package boundaries.
- This keeps jobs, admin, web, and tests using the same domain logic.

## 3. Recommended Repository Structure

```text
market-intelligence-platform/
  apps/
    web/
      app/
      components/
      features/
      public/
      tests/
    admin/
      app/
      components/
      features/
      tests/
  packages/
    ui/
    database/
      prisma/
      src/
    auth/
    billing/
    cms/
    learning/
    market-data/
      providers/
      normalizers/
      jobs/
    portfolio/
      calculators/
      importers/
    analytics/
      widgets/
      metrics/
      queries/
    ai/
      providers/
      prompts/
      retrieval/
      tools/
      evals/
    notifications/
      channels/
      templates/
      workflows/
    observability/
    config/
  docs/
    research/
    architecture/
  tooling/
    scripts/
```

Key rules:
- `apps/web` owns user-facing product routes.
- `apps/admin` owns admin CMS, operations, partner management, and moderation.
- `packages/ui` owns shadcn/ui composition and product primitives.
- `packages/database` owns Prisma schema, migrations, and database client exports.
- Domain packages own business logic and expose typed service functions.
- Background jobs import domain services; they do not duplicate business logic.

## 4. Recommended Dashboard Architecture

Adopt a Metabase/Superset/Grafana-inspired but smaller dashboard model.

Core concepts:
- Dashboard: owner, visibility, layout, default time range, filters.
- Widget: type, title, data source, query config, visualization config.
- Saved view: filters, sort, columns, segment, user/workspace scope.
- Metric: canonical definition, unit, source, calculation method.
- Dataset: typed data contract for market, portfolio, learning, or subscription data.

Architecture:
- `packages/analytics/metrics`: canonical metrics and calculation definitions.
- `packages/analytics/widgets`: widget registry and config schemas.
- `packages/analytics/queries`: safe query builders or service-level query functions.
- `apps/web/features/analytics`: dashboard UI, widget grid, filters, drilldowns.

Adopt:
- Dashboard grid from Grafana.
- Saved questions/collections from Metabase.
- Dataset/metric governance from Superset and Lightdash.
- Async query/job feedback for expensive calculations.

Avoid:
- Arbitrary SQL editing in the first product version.
- Unlimited plugin execution.
- Hard-coding dashboard cards directly in page components.

## 5. Recommended AI Architecture

ARIA should be a domain assistant, not a generic chatbot.

Core layers:
- Chat layer: conversations, messages, streaming responses, feedback, citations.
- Model provider layer: OpenAI and future providers behind a common interface.
- Retrieval layer: education content, market notes, user portfolio summaries, glossary.
- Tool layer: market lookup, economic calendar lookup, portfolio summary, risk explanation, subscription entitlement check.
- Prompt layer: versioned system prompts, task prompts, safety instructions, output schemas.
- Run observability layer: tool calls, latency, token usage, retrieved documents, errors.

Recommended structure:

```text
packages/ai/
  providers/
  prompts/
  retrieval/
  tools/
  conversations/
  evals/
  telemetry/
```

Adopt:
- Streaming and persistence from Vercel AI Chatbot.
- Provider/tool abstractions from Dify and Lobe Chat.
- Workflow/run traces from Dify and Trigger.dev.

Avoid:
- Hidden financial recommendations without citations.
- Prompt text scattered across components.
- AI tools that bypass entitlement, audit, or user permission checks.

## 6. Recommended Learning Architecture

Model learning as content plus progress.

Core concepts:
- Learning path: ordered sequence of modules.
- Module: themed collection of lessons and quizzes.
- Lesson: rich CMS content plus optional interactive exercise.
- Quiz: questions, attempts, scoring, explanations.
- Progress: per-user/path/module/lesson state.
- Certificate/badge: optional completion artifact.

Recommended structure:

```text
packages/learning/
  content/
  progress/
  quizzes/
  recommendations/
```

Adopt:
- Curriculum separation from freeCodeCamp.
- Course lifecycle and draft/publish ideas from Open edX.
- Completion/activity concepts from Moodle, without Moodle's plugin weight.

Avoid:
- Hard-coding onboarding steps in React components.
- Treating education as static blog posts.
- Complex grading until assessments need it.

## 7. Recommended Notification Architecture

Use event-driven notifications with user preferences and delivery logs.

Core concepts:
- Event: normalized domain occurrence, e.g. `economic_event.upcoming`, `portfolio.allocation_drifted`, `lesson.completed`.
- Workflow: rules mapping events to channels, templates, timing, and digest behavior.
- Subscriber: user plus workspace context.
- Preference: per-user/per-channel/per-topic settings.
- Delivery: every send attempt with provider, status, error, and retry metadata.

Recommended structure:

```text
packages/notifications/
  events/
  workflows/
  channels/
  templates/
  preferences/
  deliveries/
```

Adopt:
- Event trigger and channel abstraction from Novu.
- Retry/run logging from Trigger.dev.
- Alert lifecycle concepts from Grafana.

Channels:
- In-app inbox first.
- Email second.
- Push/SMS only when product need and compliance posture are clear.

Avoid:
- Sending directly from route handlers.
- Noisy default alerts.
- Notification records without delivery logs.

## 8. Recommended Deployment Architecture

Use Vercel for web/admin apps, with managed services for durable backing systems.

Recommended baseline:
- Next.js 15 apps on Vercel.
- PostgreSQL managed database.
- Prisma migrations through controlled release process.
- Queue/background job service for scheduled ingestion, notifications, and AI runs.
- Object storage for uploads and generated artifacts.
- Observability for logs, traces, errors, and product analytics.

Environment model:
- Local: Docker Compose or managed dev services.
- Preview: Vercel preview deployments with isolated env vars.
- Staging: production-like database and queues.
- Production: locked env vars, backups, monitoring, and alerting.

Adopt:
- Vercel/Turborepo deployment posture from next-forge.
- Docker local dependencies from BoxyHQ, Cal.com, Novu, and Trigger.dev.
- Worker separation from Superset, Novu, Trigger.dev, and Ghostfolio.

Avoid:
- Long-running jobs inside request handlers.
- Manual market-data refresh scripts as production workflow.
- Untracked environment variables.

## 9. Recommended Testing Strategy

Testing should match product risk.

Unit tests:
- Financial calculations.
- Portfolio performance.
- Market data normalization.
- Entitlement checks.
- Notification workflow routing.
- AI prompt/tool schema validation.

Integration tests:
- Prisma repositories and service functions.
- Auth and role checks.
- Billing webhook handling.
- Market data provider adapters with mocked providers.
- Notification delivery workflows.

E2E tests:
- Onboarding and learning path completion.
- Portfolio import and dashboard view.
- ARIA chat with tool calls and cited response.
- Subscription upgrade/downgrade flow.
- Admin content publish flow.

Visual/UI tests:
- Dashboard widgets at desktop and mobile sizes.
- Data-heavy tables.
- Notification center.
- Learning lesson pages.
- ARIA chat states.

Adopt:
- Playwright from BoxyHQ and Vercel AI Chatbot.
- Package-level tests from monorepo projects.
- Calculation-focused tests from financial platforms.

Avoid:
- Snapshot-heavy tests for data-rich UI.
- Mocking away all provider behavior.
- Untested financial calculations.

## 10. Recommended Monitoring Strategy

Monitor both platform health and market intelligence correctness.

Technical monitoring:
- Request latency and error rate.
- Background job success/failure/retry counts.
- Queue depth.
- Database query latency.
- AI provider latency, token use, and error rates.
- Notification delivery success by channel/provider.
- Market data ingestion freshness by provider.

Product monitoring:
- Onboarding completion.
- Lesson completion and quiz pass rates.
- Dashboard creation and reuse.
- ARIA engagement and feedback.
- Portfolio connection/import success.
- Notification opt-out and engagement rates.

Data quality monitoring:
- Missing prices or stale prices.
- Provider mismatch.
- Economic calendar duplicates.
- Failed normalization.
- Outlier portfolio calculations.

AI monitoring:
- Tool call failures.
- Retrieval empty-result rate.
- Citation coverage.
- User negative feedback.
- Cost per conversation.

Adopt:
- Observability package pattern from next-forge.
- Run logs from Trigger.dev.
- Delivery logs from Novu.
- Alerting concepts from Grafana.

Avoid:
- Monitoring only server uptime.
- AI responses without run traces.
- Market data ingestion without freshness checks.

## Final Architecture Direction

The recommended architecture is a modular Next.js/Vercel SaaS monorepo with strict domain packages, PostgreSQL/Prisma persistence, event-driven background workflows, a governed analytics layer, a domain-specific AI assistant, content-driven learning, and a notification system modeled around events, preferences, and delivery logs.

The strongest pattern sources are:
- next-forge for repo and deployment structure.
- Vercel AI Chatbot for AI implementation shape.
- Payload for CMS/admin content.
- Novu and Trigger.dev for notifications and jobs.
- Grafana, Metabase, and Superset for dashboards.
- OpenBB, Ghostfolio, and Actual for financial data and portfolio intelligence.
- freeCodeCamp for learning paths.
- Cal.com and Dub for partner ecosystem and attribution.
