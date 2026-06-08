# Open Source Architecture Research

Research date: 2026-06-08

Scope: mature, active open-source repositories that can inform architecture, folder structure, UX patterns, infrastructure decisions, and implementation approaches for `market-intelligence-platform`.

Important constraint: this document recommends patterns only. It does not recommend copying code, cloning products, or forking repositories.

Metadata source: GitHub repository metadata and public repository pages checked on 2026-06-08. Stars and activity are point-in-time values.

## Category 1 - SaaS Architecture

### 1. next-forge

**Basic Information**
- Project Name: next-forge
- GitHub URL: https://github.com/vercel/next-forge
- Stars: 7,091
- Last Activity: 2026-05-28
- License: MIT

**Architecture Analysis**
- Folder structure: Turborepo monorepo with `apps/`, `packages/`, `docs/`, `scripts/`, shared configuration, and package-level ownership.
- Frontend architecture: Next.js-first application composition with shared design system and app-specific surfaces.
- Backend architecture: provider-oriented packages for auth, database, analytics, observability, payments, and feature flags.
- State management: favors server-rendered data boundaries plus client state where necessary.
- Database strategy: Prisma-oriented package boundary; database concerns isolated from UI apps.
- API strategy: app-local routes and shared service packages; strong fit for Vercel deployment.
- Deployment strategy: Vercel-native, Turborepo-aware build graph, production environment conventions.

**Strengths**
- Very close to the target stack.
- Clean separation between apps and reusable platform packages.
- Strong production posture around observability, auth, billing, and deployment.

**Weaknesses**
- Starter architecture can feel provider-opinionated.
- Requires discipline to avoid over-splitting packages too early.

**Reusable Ideas**
- UI patterns: shared design-system package, app-specific shells, consistent settings surfaces.
- Architecture patterns: `apps/*` plus `packages/*`, provider adapters, environment validation.
- Database patterns: database package as the single schema/client boundary.
- Infrastructure patterns: Vercel-first monorepo, preview deployments, observability package.

**Adoption Recommendation: Adopt**

Use as the strongest reference for repository structure, package boundaries, deployment posture, and production SaaS foundations.

### 2. BoxyHQ SaaS Starter Kit

**Basic Information**
- Project Name: BoxyHQ SaaS Starter Kit
- GitHub URL: https://github.com/boxyhq/saas-starter-kit
- Stars: 4,841
- Last Activity: 2026-05-11
- License: Apache-2.0

**Architecture Analysis**
- Folder structure: Next.js app with `components/`, `hooks/`, `lib/`, `models/`, `pages/`, `prisma/`, tests, middleware, and localization.
- Frontend architecture: page-oriented SaaS UI with teams, settings, auth, account management, and admin flows.
- Backend architecture: Next.js API/page backend with Prisma and auth integrations.
- State management: mostly request-driven state plus React hooks for UI state.
- Database strategy: Prisma schema for teams, users, sessions, roles, audit logs, and payments.
- API strategy: Next.js API handlers, webhooks, auth callbacks, and team-scoped actions.
- Deployment strategy: Docker Compose for local Postgres, platform deploys for app hosting.

**Strengths**
- Practical enterprise SaaS feature coverage: SSO, SCIM, teams, roles, audit logs, payments, email.
- Good reference for B2B account and workspace design.

**Weaknesses**
- Pages Router conventions are less aligned with a fresh Next.js 15 App Router codebase.
- UI and backend boundaries are less modular than a monorepo package approach.

**Reusable Ideas**
- UI patterns: team settings, member invites, audit log views, account security pages.
- Architecture patterns: tenant/team model, RBAC, SAML/SCIM as optional enterprise modules.
- Database patterns: membership, roles, audit logs, webhook events.
- Infrastructure patterns: Docker Compose local dependencies, e2e test setup.

**Adoption Recommendation: Consider**

Adopt enterprise SaaS domain concepts, not its older Next.js routing shape.

### 3. Cal.com

**Basic Information**
- Project Name: Cal.com
- GitHub URL: https://github.com/calcom/cal.com
- Stars: 45,224
- Last Activity: 2026-06-03
- License: MIT

**Architecture Analysis**
- Folder structure: large monorepo with `apps/`, `packages/`, `deploy/`, `docker-compose.yml`, checks, and app-store style modules.
- Frontend architecture: Next.js product surfaces with marketplace, onboarding, scheduling flows, profile pages, and settings.
- Backend architecture: TypeScript backend packages, Prisma, background jobs, integrations, and app marketplace abstractions.
- State management: server data via API boundaries; local UI state per workflow.
- Database strategy: Prisma over PostgreSQL with strong domain modeling for users, teams, bookings, apps, and webhooks.
- API strategy: tRPC/API route mix, webhook-heavy integrations, public API concepts.
- Deployment strategy: Docker and hosted deployment support; mature CI and checks.

**Strengths**
- Excellent reference for marketplace/integration architecture.
- Strong examples of complex onboarding, settings, team ownership, and external app connections.
- MIT license makes pattern study low-friction.

**Weaknesses**
- Product domain is scheduling, so many abstractions are more complex than a market intelligence platform needs.
- Large codebase can encourage overengineering if copied too literally.

**Reusable Ideas**
- UI patterns: app marketplace, integration install flows, availability/settings forms, team admin.
- Architecture patterns: integration registry, feature modules, package-based shared logic.
- Database patterns: installed app records, user/team scoping, webhook subscriptions.
- Infrastructure patterns: Docker Compose, app-store module boundaries, CI checks.

**Adoption Recommendation: Adopt**

Adopt marketplace and integration architecture patterns, especially for the partner ecosystem.

### 4. Twenty

**Basic Information**
- Project Name: Twenty
- GitHub URL: https://github.com/twentyhq/twenty
- Stars: 49,363
- Last Activity: 2026-06-08
- License: repository reports NOASSERTION; check project terms before reuse

**Architecture Analysis**
- Folder structure: Nx monorepo with `packages/`, root workspace config, product/design docs, and shared TypeScript config.
- Frontend architecture: CRM-style workspace UI with records, views, kanban/table patterns, filters, and dense business navigation.
- Backend architecture: GraphQL-oriented service architecture with metadata-driven objects and workspace scoping.
- State management: client workspace state, record views, filters, and server-driven object metadata.
- Database strategy: metadata-oriented CRM entities; flexible object model over relational storage.
- API strategy: GraphQL for rich object querying and mutations.
- Deployment strategy: Docker/self-hosted plus cloud-oriented operations.

**Strengths**
- Strong model for admin/workspace UI density.
- Useful for custom object views, filters, saved views, and AI-enabled business workflows.

**Weaknesses**
- CRM metadata model is heavy for initial market intelligence needs.
- License ambiguity means avoid direct code reuse without legal review.

**Reusable Ideas**
- UI patterns: table/kanban switchers, saved views, command/search surfaces, object detail panels.
- Architecture patterns: metadata-driven UI, workspace-scoped modules, activity timelines.
- Database patterns: flexible object metadata, relation fields, audit/activity records.
- Infrastructure patterns: Nx monorepo, self-hosted deployment options.

**Adoption Recommendation: Consider**

Use as inspiration for admin CMS, portfolio workspace, and object management UX.

## Category 2 - Analytics Dashboards

### 5. Grafana

**Basic Information**
- Project Name: Grafana
- GitHub URL: https://github.com/grafana/grafana
- Stars: 74,286
- Last Activity: 2026-06-08
- License: AGPL-3.0

**Architecture Analysis**
- Folder structure: large monorepo with Go backend, TypeScript frontend, packages, plugins, docs, CI, and provisioning.
- Frontend architecture: plugin-driven dashboard canvas, panels, data source configuration, alerting UI, and variable controls.
- Backend architecture: Go services for auth, orgs, dashboards, alerting, queries, permissions, and data source proxying.
- State management: dashboard model state, query state, panel state, and persisted user preferences.
- Database strategy: relational persistence for dashboards, users, organizations, alerts, folders, and permissions.
- API strategy: REST APIs plus plugin extension points and data source contracts.
- Deployment strategy: Docker, packages, Kubernetes-friendly operations, provisioning files.

**Strengths**
- Best-in-class dashboard UX and visualization extension model.
- Mature alerting, dashboard provisioning, folders, permissions, and datasource abstraction.

**Weaknesses**
- AGPL license requires caution.
- Observability domain is broader and more technical than investor-facing analytics.

**Reusable Ideas**
- UI patterns: panel grid, dashboard variables, time-range picker, alert rule builder, foldered dashboards.
- Architecture patterns: plugin contracts, data source abstraction, dashboard-as-JSON model.
- Database patterns: dashboard versions, folder permissions, alert state.
- Infrastructure patterns: provisioning, telemetry, scalable alert evaluation.

**Adoption Recommendation: Adopt**

Adopt UX and architecture concepts only; do not copy implementation.

### 6. Metabase

**Basic Information**
- Project Name: Metabase
- GitHub URL: https://github.com/metabase/metabase
- Stars: 47,608
- Last Activity: 2026-06-08
- License: mixed/open-core; AGPL and commercial components

**Architecture Analysis**
- Folder structure: Clojure backend, React frontend, drivers, enterprise modules, e2e tests, docs, and build tooling.
- Frontend architecture: question builder, dashboard builder, filters, collections, embeds, and admin panels.
- Backend architecture: query processor, database drivers, permissions, collections, metadata sync, and caching.
- State management: question/dashboard state, query results, metadata, and permissions.
- Database strategy: application DB for metadata; external data sources queried through drivers.
- API strategy: REST endpoints for cards, dashboards, collections, users, permissions, and query execution.
- Deployment strategy: JAR, Docker, cloud/self-hosted, embedded analytics support.

**Strengths**
- Excellent model for making analytics approachable to non-technical users.
- Strong collection, saved question, dashboard, and permission concepts.

**Weaknesses**
- Clojure architecture is not directly transferable to the target stack.
- Open-core boundaries require care.

**Reusable Ideas**
- UI patterns: natural-language question builder, saved questions, dashboard filters, collection browser.
- Architecture patterns: semantic metadata layer, query execution pipeline, permission-aware result access.
- Database patterns: cards/questions, collections, dashboard cards, field metadata.
- Infrastructure patterns: query caching, embedding, driver abstractions.

**Adoption Recommendation: Adopt**

Adopt education-first analytics UX patterns and semantic data modeling concepts.

### 7. Apache Superset

**Basic Information**
- Project Name: Apache Superset
- GitHub URL: https://github.com/apache/superset
- Stars: 73,217
- Last Activity: 2026-06-08
- License: Apache-2.0

**Architecture Analysis**
- Folder structure: Python backend, TypeScript frontend, chart plugins, docs, Docker, migrations, tests, and examples.
- Frontend architecture: exploration workspace, dashboard builder, chart controls, SQL Lab, and chart plugin registry.
- Backend architecture: Flask services for datasets, charts, dashboards, security, SQL execution, and async tasks.
- State management: exploration form state, dashboard layout, filters, and async query results.
- Database strategy: metadata DB plus external analytical databases; semantic dataset layer.
- API strategy: REST APIs with security model and chart/query endpoints.
- Deployment strategy: Docker Compose, Kubernetes/Helm ecosystem, Celery for async execution.

**Strengths**
- Strong chart plugin architecture and governed dataset model.
- Apache license is friendly for pattern adoption.

**Weaknesses**
- Heavy BI platform complexity.
- SQL Lab is more analyst-oriented than education-first investor workflows.

**Reusable Ideas**
- UI patterns: chart builder, dataset selector, dashboard native filters, async query feedback.
- Architecture patterns: chart plugin registry, dataset semantic layer, async query jobs.
- Database patterns: saved charts, dashboards, datasets, metrics, ownership.
- Infrastructure patterns: workers for long-running analytics, cache layer.

**Adoption Recommendation: Adopt**

Adopt chart plugin, dataset, and async analytics concepts.

### 8. Lightdash

**Basic Information**
- Project Name: Lightdash
- GitHub URL: https://github.com/lightdash/lightdash
- Stars: 5,874
- Last Activity: 2026-06-08
- License: repository reports NOASSERTION; verify before reuse

**Architecture Analysis**
- Folder structure: TypeScript monorepo with docs, examples, Docker, agent harness, and app packages.
- Frontend architecture: metrics explorer, dashboards, semantic fields, chart/table views, and AI-assisted BI concepts.
- Backend architecture: Node services integrating with dbt semantic models and warehouses.
- State management: explorer state, filters, chart configuration, saved queries.
- Database strategy: application metadata plus warehouse-backed analytics.
- API strategy: service APIs around projects, explores, dashboards, metrics, and semantic metadata.
- Deployment strategy: Docker, cloud/self-hosted, dbt-oriented setup.

**Strengths**
- Great reference for metrics-as-code and governed analytics.
- More TypeScript-aligned than many BI tools.

**Weaknesses**
- dbt dependency may be too much for early product architecture.
- License needs verification.

**Reusable Ideas**
- UI patterns: metric explorer, field picker, saved charts, AI-assisted query path.
- Architecture patterns: semantic metric layer, project-based analytics ownership.
- Database patterns: metric definitions, saved explores, dashboard metadata.
- Infrastructure patterns: warehouse integration and local Docker setup.

**Adoption Recommendation: Consider**

Adopt semantic metrics ideas if market intelligence analytics needs governed definitions.

## Category 3 - Financial Platforms

### 9. Actual

**Basic Information**
- Project Name: Actual
- GitHub URL: https://github.com/actualbudget/actual
- Stars: 26,911
- Last Activity: 2026-06-07
- License: MIT

**Architecture Analysis**
- Folder structure: monorepo with `packages/`, `data/`, sync server, Docker, tests, and release notes.
- Frontend architecture: local-first personal finance UI with accounts, budgets, transactions, reports, and import flows.
- Backend architecture: sync server plus local client data model.
- State management: local-first state with sync reconciliation.
- Database strategy: client-local data with sync semantics; strong transaction ledger modeling.
- API strategy: sync APIs and import/export paths.
- Deployment strategy: Docker/self-hosted sync server.

**Strengths**
- Excellent financial data entry, reconciliation, and offline-first thinking.
- MIT license and TypeScript codebase are attractive for pattern study.

**Weaknesses**
- Budgeting is not market research.
- Local-first sync may be unnecessary for the platform MVP.

**Reusable Ideas**
- UI patterns: transaction tables, account summaries, report drilldowns, import review.
- Architecture patterns: local-first cache, sync boundaries, deterministic financial calculations.
- Database patterns: ledger-style transactions, account balances, categories.
- Infrastructure patterns: self-hosted sync service, Docker packaging.

**Adoption Recommendation: Consider**

Adopt financial table UX and ledger discipline; avoid local-first complexity unless offline support is explicit.

### 10. Ghostfolio

**Basic Information**
- Project Name: Ghostfolio
- GitHub URL: https://github.com/ghostfolio/ghostfolio
- Stars: 8,608
- Last Activity: 2026-06-07
- License: AGPL-3.0

**Architecture Analysis**
- Folder structure: Nx monorepo with `apps/`, `libs/`, `prisma/`, Docker, tests, and tools.
- Frontend architecture: Angular portfolio dashboard with holdings, allocations, performance, accounts, and admin.
- Backend architecture: NestJS API with services for market data, portfolio calculations, auth, and subscriptions.
- State management: client state around portfolio views and server-provided aggregates.
- Database strategy: Prisma over relational schema for users, accounts, activities, holdings, and market data.
- API strategy: REST-style NestJS controllers and service layer.
- Deployment strategy: Docker images, self-hosting, scheduled jobs for market data.

**Strengths**
- Very relevant portfolio intelligence domain.
- Good separation of app, library, backend, and Prisma layers.

**Weaknesses**
- Angular/NestJS differs from target frontend stack.
- AGPL limits direct reuse.

**Reusable Ideas**
- UI patterns: holdings table, allocation charts, performance timeline, portfolio summary cards.
- Architecture patterns: portfolio calculation services, market data adapters, scheduled data refresh.
- Database patterns: account, activity, holding, asset, price, benchmark.
- Infrastructure patterns: worker/scheduler for market data updates.

**Adoption Recommendation: Adopt**

Adopt domain modeling and portfolio analytics concepts only.

### 11. OpenBB

**Basic Information**
- Project Name: OpenBB
- GitHub URL: https://github.com/OpenBB-finance/OpenBB
- Stars: 68,768
- Last Activity: 2026-06-07
- License: repository reports NOASSERTION; verify terms before reuse

**Architecture Analysis**
- Folder structure: Python platform with `openbb_platform/`, CLI, desktop app, examples, assets, build tooling, and tests.
- Frontend architecture: desktop/terminal-oriented analyst workflows rather than web SaaS.
- Backend architecture: modular provider extensions for financial data, commands, and analytics.
- State management: command/session state and provider outputs.
- Database strategy: more data-provider orchestration than app persistence.
- API strategy: SDK/CLI command model with typed provider modules.
- Deployment strategy: Python packages, desktop/CLI distribution.

**Strengths**
- Best reference for market data provider abstraction.
- Strong coverage across equities, economics, fixed income, derivatives, crypto, and AI-agent use.

**Weaknesses**
- Not a web app architecture reference.
- Provider licensing and data terms must be handled separately.

**Reusable Ideas**
- UI patterns: analyst command palette concepts, data source selection, research workflows.
- Architecture patterns: provider registry, normalized data outputs, command modules.
- Database patterns: cache normalized provider responses and attribution metadata.
- Infrastructure patterns: provider adapters, rate-limit handling, data provenance.

**Adoption Recommendation: Adopt**

Adopt market-data adapter architecture and data provenance patterns.

### 12. Firefly III

**Basic Information**
- Project Name: Firefly III
- GitHub URL: https://github.com/firefly-iii/firefly-iii
- Stars: 23,655
- Last Activity: 2026-06-08
- License: AGPL-3.0

**Architecture Analysis**
- Folder structure: Laravel/PHP app with domain controllers, jobs, import/export, Docker, and docs.
- Frontend architecture: personal finance management UI for accounts, budgets, categories, reports, and rules.
- Backend architecture: Laravel MVC with jobs, events, import pipelines, and account logic.
- State management: server-rendered/application state with persistent financial entities.
- Database strategy: relational model for accounts, transactions, budgets, rules, categories, tags.
- API strategy: REST API and import integrations.
- Deployment strategy: Docker/self-hosted.

**Strengths**
- Mature financial data import, categorization, and rule engine patterns.
- Strong accounting discipline.

**Weaknesses**
- Stack differs significantly from Next.js/TypeScript.
- Personal finance workflows differ from market intelligence.

**Reusable Ideas**
- UI patterns: rule builders, category filters, account history, cash-flow reports.
- Architecture patterns: import pipeline, classification rules, auditability.
- Database patterns: transaction splits, categories, tags, attachments.
- Infrastructure patterns: background jobs for imports and recurring actions.

**Adoption Recommendation: Consider**

Adopt import/rule concepts for portfolio intelligence and notification triggers.

## Category 4 - AI Applications

### 13. Dify

**Basic Information**
- Project Name: Dify
- GitHub URL: https://github.com/langgenius/dify
- Stars: 144,353
- Last Activity: 2026-06-08
- License: repository reports NOASSERTION; verify terms before reuse

**Architecture Analysis**
- Folder structure: `api/`, `web/`-style app areas, `docker/`, `sdks/`, `packages/`, `docs/`, `e2e/`, and agent modules.
- Frontend architecture: AI app builder, workflow editor, knowledge base management, evaluation, and operational dashboards.
- Backend architecture: Python API, workflow orchestration, model provider adapters, vector/RAG services, queues, and tool integrations.
- State management: workflow graph state, chat state, knowledge state, and execution traces.
- Database strategy: relational app metadata plus vector stores and object/file storage.
- API strategy: REST APIs, streaming chat, workflow execution endpoints, provider abstraction.
- Deployment strategy: Docker Compose, self-hosting, workers, external vector/database dependencies.

**Strengths**
- Excellent production AI orchestration reference.
- Strong separation of model providers, tools, knowledge bases, workflows, and app runtime.

**Weaknesses**
- Platform scope is much larger than ARIA needs.
- License must be reviewed before direct adoption.

**Reusable Ideas**
- UI patterns: prompt/workflow editor, knowledge source management, execution trace, model settings.
- Architecture patterns: provider abstraction, workflow graph, RAG pipeline, tool registry.
- Database patterns: conversations, messages, prompts, datasets, embeddings, run logs.
- Infrastructure patterns: queues, vector DB, worker separation, streaming responses.

**Adoption Recommendation: Adopt**

Adopt high-level AI architecture: provider layer, RAG layer, tool layer, and run observability.

### 14. Lobe Chat / LobeHub

**Basic Information**
- Project Name: Lobe Chat / LobeHub
- GitHub URL: https://github.com/lobehub/lobe-chat
- Stars: 78,339
- Last Activity: 2026-06-08
- License: repository reports NOASSERTION; verify terms before reuse

**Architecture Analysis**
- Folder structure: Next.js/TypeScript app with Docker, docs, i18n, env examples, and extensive config.
- Frontend architecture: polished chat UI, agents, model selection, settings, plugin/tool concepts, and multi-provider support.
- Backend architecture: provider adapters, server actions/API routes, storage, auth, and tool calls.
- State management: chat sessions, message branches, agent config, model config, and user preferences.
- Database strategy: supports persisted conversations, users, settings, files, and knowledge.
- API strategy: streaming model APIs and provider-specific adapters behind common interfaces.
- Deployment strategy: Docker and platform deploys.

**Strengths**
- Strong AI chat UX reference.
- Great model/provider selection and agent-persona patterns.

**Weaknesses**
- General assistant product differs from finance-specific guidance.
- Large feature surface may distract ARIA from opinionated market workflows.

**Reusable Ideas**
- UI patterns: chat sidebar, model picker, agent settings, file attachments, streaming message states.
- Architecture patterns: model provider adapter, assistant presets, conversation persistence.
- Database patterns: sessions, messages, user preferences, tool call records.
- Infrastructure patterns: Docker deployment, env-driven provider configuration.

**Adoption Recommendation: Adopt**

Adopt chat UX and provider abstraction patterns for ARIA.

### 15. Vercel AI Chatbot

**Basic Information**
- Project Name: Vercel AI Chatbot
- GitHub URL: https://github.com/vercel/ai-chatbot
- Stars: 20,451
- Last Activity: 2026-05-18
- License: repository reports NOASSERTION; verify before reuse

**Architecture Analysis**
- Folder structure: App Router app with `app/`, `components/`, `lib/`, `hooks/`, `artifacts/`, Drizzle config, tests, and Vercel config.
- Frontend architecture: shadcn/ui chat interface, artifacts, streaming messages, auth-aware flows.
- Backend architecture: Next.js route handlers, AI SDK integration, database persistence, and artifact tools.
- State management: AI SDK message state, server-persisted chats, optimistic UI.
- Database strategy: Drizzle/Postgres style persistence for chats, messages, votes, documents.
- API strategy: streaming route handlers for chat; typed server actions/utilities.
- Deployment strategy: Vercel template with platform-first defaults.

**Strengths**
- Closest AI reference for Next.js, React, shadcn/ui, and Vercel.
- Good example of streaming and persisted chat in a modern App Router app.

**Weaknesses**
- Uses Drizzle rather than Prisma.
- Generic chatbot rather than domain-guided assistant.

**Reusable Ideas**
- UI patterns: streaming chat, artifact panel, message actions, empty states.
- Architecture patterns: chat route handler, AI SDK integration, tool-call rendering.
- Database patterns: chat, message, document/artifact, vote/feedback.
- Infrastructure patterns: Vercel deployment, Playwright tests, typed env.

**Adoption Recommendation: Adopt**

Adopt as the primary Next.js AI implementation reference, adapting persistence to Prisma.

### 16. Flowise

**Basic Information**
- Project Name: Flowise
- GitHub URL: https://github.com/FlowiseAI/Flowise
- Stars: 53,415
- Last Activity: 2026-06-05
- License: repository reports NOASSERTION; verify terms before reuse

**Architecture Analysis**
- Folder structure: pnpm/Turbo monorepo with `packages/`, Docker, assets, metrics, i18n, and tests.
- Frontend architecture: visual graph builder for AI chains, agents, tools, credentials, and templates.
- Backend architecture: Node services for executing graph nodes, managing credentials, and integrating model/tool providers.
- State management: graph canvas state, node configuration, execution state.
- Database strategy: persisted flows, credentials, chat sessions, executions.
- API strategy: REST APIs around flows, executions, tools, and chat.
- Deployment strategy: Docker/self-hosted, metrics-aware.

**Strengths**
- Great model for visual workflow orchestration and tool composition.
- Strong node abstraction ideas.

**Weaknesses**
- Visual AI builder is too broad for an investor guidance assistant.
- Security around arbitrary tools/credentials is complex.

**Reusable Ideas**
- UI patterns: workflow graph, node settings drawer, execution trace.
- Architecture patterns: node registry, credential vault, flow executor.
- Database patterns: flow definitions, node configs, execution logs.
- Infrastructure patterns: containerized worker/service deployment.

**Adoption Recommendation: Consider**

Use for ARIA workflow inspiration only if guidance becomes multi-step and inspectable.

## Category 5 - Learning Platforms

### 17. freeCodeCamp

**Basic Information**
- Project Name: freeCodeCamp
- GitHub URL: https://github.com/freeCodeCamp/freeCodeCamp
- Stars: 446,383
- Last Activity: 2026-06-06
- License: BSD-3-Clause

**Architecture Analysis**
- Folder structure: monorepo with `api/`, `client/`, `curriculum/`, `e2e/`, `packages/`, `tools/`, Docker, and workspace config.
- Frontend architecture: curriculum-first learning UI with lessons, projects, tests, certifications, profiles, and progress.
- Backend architecture: API services for users, progress, certifications, profiles, and challenge data.
- State management: learner progress, challenge state, validation state, profile state.
- Database strategy: user progress, completed challenges, certifications, curriculum metadata.
- API strategy: APIs around progress, authentication, profiles, and learning content.
- Deployment strategy: containerized services, CI, e2e tests.

**Strengths**
- Excellent curriculum-as-content and progress tracking reference.
- Strong separation of curriculum content from platform logic.

**Weaknesses**
- Coding challenge model differs from financial education.
- Large community platform complexity is unnecessary for MVP.

**Reusable Ideas**
- UI patterns: lesson path, progress map, challenge completion, certification/profile.
- Architecture patterns: content-driven lessons, validation engine, progress service.
- Database patterns: user progress, lesson completion, assessments, certificates.
- Infrastructure patterns: e2e tests for learning flows, content tooling.

**Adoption Recommendation: Adopt**

Adopt learning path, curriculum structure, and progress modeling concepts.

### 18. Open edX

**Basic Information**
- Project Name: Open edX Platform
- GitHub URL: https://github.com/openedx/edx-platform
- Stars: 8,116
- Last Activity: 2026-06-08
- License: AGPL-3.0

**Architecture Analysis**
- Folder structure: mature LMS monolith with LMS, Studio, backend services, tests, and deployment tooling.
- Frontend architecture: learner LMS and course authoring Studio surfaces.
- Backend architecture: course blocks, enrollments, grading, discussion integrations, content publishing.
- State management: enrollment state, course progress, grading state, authoring drafts.
- Database strategy: course structure, users, enrollments, attempts, grades, content versions.
- API strategy: REST APIs and plugin/lti style integrations.
- Deployment strategy: Tutor/Kubernetes-style ecosystem, production LMS operations.

**Strengths**
- Very mature course authoring and learner lifecycle model.
- Strong publishing workflow and assessment concepts.

**Weaknesses**
- AGPL and Python/Django monolith are poor direct fit for this stack.
- Heavy enterprise LMS scope.

**Reusable Ideas**
- UI patterns: course outline, lesson unit, authoring studio, learner progress.
- Architecture patterns: draft/published course content, enrollment lifecycle, assessments.
- Database patterns: course blocks, enrollments, attempts, grades.
- Infrastructure patterns: content publishing pipeline and background tasks.

**Adoption Recommendation: Consider**

Adopt course lifecycle concepts; avoid architectural weight.

### 19. Moodle

**Basic Information**
- Project Name: Moodle
- GitHub URL: https://github.com/moodle/moodle
- Stars: 7,143
- Last Activity: 2026-06-05
- License: GPL-3.0

**Architecture Analysis**
- Folder structure: plugin-heavy PHP LMS with modules, blocks, themes, admin, gradebook, and activity plugins.
- Frontend architecture: course pages, activity modules, quizzes, gradebook, forums, and administration.
- Backend architecture: modular LMS plugin system with course, user, role, and grading subsystems.
- State management: server-managed learning state and plugin state.
- Database strategy: extensive relational schema for courses, users, roles, grades, activities, attempts.
- API strategy: web services and plugin APIs.
- Deployment strategy: traditional PHP hosting, self-hosted enterprise deployments.

**Strengths**
- Battle-tested roles, activities, quizzes, and gradebook patterns.
- Huge plugin ecosystem.

**Weaknesses**
- GPL and legacy PHP architecture are not suitable for direct adoption.
- UX can feel dated compared with modern SaaS.

**Reusable Ideas**
- UI patterns: activity completion, quiz attempts, gradebook summary, course admin.
- Architecture patterns: activity plugin interface, role capabilities, completion tracking.
- Database patterns: attempts, grades, course modules, role assignments.
- Infrastructure patterns: plugin lifecycle and admin configuration.

**Adoption Recommendation: Avoid**

Use only as conceptual reference for LMS edge cases; avoid as architecture inspiration for the main platform.

## Category 6 - CMS Systems

### 20. Payload

**Basic Information**
- Project Name: Payload
- GitHub URL: https://github.com/payloadcms/payload
- Stars: 42,857
- Last Activity: 2026-06-07
- License: MIT

**Architecture Analysis**
- Folder structure: TypeScript monorepo with packages, examples, admin UI, adapters, tests, and docs.
- Frontend architecture: generated/admin CMS UI integrated with Next.js, rich fields, collections, and access control.
- Backend architecture: config-driven collections, hooks, access control, REST/GraphQL APIs, file uploads.
- State management: admin form state, collection list state, draft/publish workflows.
- Database strategy: collection schemas mapped to databases via adapters.
- API strategy: generated REST and GraphQL APIs plus local server APIs.
- Deployment strategy: Next.js-compatible, self-hosted or managed database/storage.

**Strengths**
- Very aligned with Next.js and TypeScript.
- Excellent config-driven admin CMS model.

**Weaknesses**
- Could become a second app framework if not isolated carefully.
- Admin customization may pull product logic into CMS config if boundaries are weak.

**Reusable Ideas**
- UI patterns: collection list, rich editor, draft/publish, relationship fields.
- Architecture patterns: config-driven admin, hooks, access control per collection.
- Database patterns: content collections, versions, uploads, localized fields.
- Infrastructure patterns: storage adapters, generated APIs.

**Adoption Recommendation: Adopt**

Strong candidate for CMS inspiration, and potentially for actual CMS use after legal/fit review.

### 21. Strapi

**Basic Information**
- Project Name: Strapi
- GitHub URL: https://github.com/strapi/strapi
- Stars: 72,334
- Last Activity: 2026-06-07
- License: repository reports NOASSERTION; verify current terms

**Architecture Analysis**
- Folder structure: TypeScript CMS platform with packages, admin UI, plugins, providers, examples, and docs.
- Frontend architecture: admin dashboard for content types, entries, media, roles, and plugins.
- Backend architecture: plugin system, content type builder, policies, controllers, services, and providers.
- State management: admin form/list state and plugin state.
- Database strategy: generated content types with relational persistence.
- API strategy: REST/GraphQL content APIs with permissions.
- Deployment strategy: Node hosting, Docker, managed DB/storage providers.

**Strengths**
- Mature content type builder, role system, and plugin architecture.
- Good reference for admin extensibility.

**Weaknesses**
- Separate CMS runtime can complicate a Next.js-first product.
- Open-core/licensing details require review.

**Reusable Ideas**
- UI patterns: content type builder, media library, role permissions, entry drafts.
- Architecture patterns: plugin registry, controller/service boundaries, policy middleware.
- Database patterns: dynamic content schema and relations.
- Infrastructure patterns: provider adapters for upload/email/database.

**Adoption Recommendation: Consider**

Adopt plugin/admin ideas; prefer a lighter integrated CMS path unless content needs justify Strapi.

### 22. Directus

**Basic Information**
- Project Name: Directus
- GitHub URL: https://github.com/directus/directus
- Stars: 36,002
- Last Activity: 2026-06-05
- License: repository reports NOASSERTION; verify current terms

**Architecture Analysis**
- Folder structure: TypeScript monorepo with API, app/admin UI, packages, extensions, and docs.
- Frontend architecture: data studio over existing databases with collections, dashboards, roles, flows, and extensions.
- Backend architecture: database introspection, generated APIs, permissions, automation flows, and extension system.
- State management: admin data browsing, schema state, permissions, dashboards.
- Database strategy: database-first; existing schema becomes CMS/admin surface.
- API strategy: REST/GraphQL generated over tables with permission filters.
- Deployment strategy: Docker/self-hosted with database backends.

**Strengths**
- Strong admin-over-database model.
- Useful for internal admin CMS and data operations.

**Weaknesses**
- Database-first model can expose too much schema complexity to editors.
- Licensing must be checked.

**Reusable Ideas**
- UI patterns: collection explorer, role matrix, automation builder, internal dashboards.
- Architecture patterns: schema introspection, generated admin, extension hooks.
- Database patterns: permission-filtered collections, activity tracking.
- Infrastructure patterns: Docker, extension lifecycle, automated flows.

**Adoption Recommendation: Consider**

Use as inspiration for admin CMS and operations dashboards, not as the main product architecture.

## Category 7 - Notification Systems

### 23. Novu

**Basic Information**
- Project Name: Novu
- GitHub URL: https://github.com/novuhq/novu
- Stars: 39,082
- Last Activity: 2026-06-08
- License: repository reports NOASSERTION; verify current terms

**Architecture Analysis**
- Folder structure: TypeScript monorepo with apps/packages for API, worker, web, widgets, providers, and shared libraries.
- Frontend architecture: notification center, workflow editor, template management, subscriber preferences, and admin UI.
- Backend architecture: event ingestion, workflow engine, channel providers, workers, digesting, preferences, and delivery logs.
- State management: inbox state, workflow builder state, subscriber preferences, delivery status.
- Database strategy: subscribers, topics, workflows, messages, templates, preferences, executions.
- API strategy: event trigger API, subscriber API, admin APIs, realtime/inbox APIs.
- Deployment strategy: Docker/self-hosted, worker separation, external email/SMS/push providers.

**Strengths**
- Best direct reference for notifications.
- Covers in-app inbox, email, digest, preferences, templates, and provider abstraction.

**Weaknesses**
- Full notification platform may be too large to embed directly.
- License must be reviewed before direct adoption.

**Reusable Ideas**
- UI patterns: notification inbox, preferences center, workflow editor, delivery logs.
- Architecture patterns: event trigger, channel provider abstraction, template registry, digest jobs.
- Database patterns: notification event, subscriber, preference, message, delivery attempt.
- Infrastructure patterns: queue-backed workers, provider retries, realtime updates.

**Adoption Recommendation: Adopt**

Adopt notification domain model and workflow architecture patterns.

### 24. Trigger.dev

**Basic Information**
- Project Name: Trigger.dev
- GitHub URL: https://github.com/triggerdotdev/trigger.dev
- Stars: 15,246
- Last Activity: 2026-06-07
- License: Apache-2.0

**Architecture Analysis**
- Folder structure: TypeScript monorepo with app/services/packages, background job runtime, docs, and deployment tooling.
- Frontend architecture: job dashboard, run history, logs, environment views, and developer settings.
- Backend architecture: durable task execution, queues, retries, schedules, webhooks, and run observability.
- State management: job/run state, logs, retry state, environment config.
- Database strategy: jobs, runs, attempts, events, schedules, logs.
- API strategy: SDK-triggered jobs, webhooks, management APIs.
- Deployment strategy: managed/self-hosted worker runtime with durable execution concerns.

**Strengths**
- Strong reference for background jobs and event-driven workflows.
- Apache-2.0 license is friendly for architecture study.

**Weaknesses**
- More developer-platform oriented than end-user product.
- Durable execution architecture can be overkill for simple notifications.

**Reusable Ideas**
- UI patterns: run log, retry status, schedule dashboard, event inspector.
- Architecture patterns: durable jobs, idempotency, retries, scheduled tasks.
- Database patterns: run status, attempt logs, event payloads, schedules.
- Infrastructure patterns: worker separation, queue/retry, observability.

**Adoption Recommendation: Adopt**

Adopt for notification jobs, AI jobs, ingestion jobs, and scheduled market data refresh.

## Category 8 - Partner / Affiliate Systems

### 25. Dub

**Basic Information**
- Project Name: Dub
- GitHub URL: https://github.com/dubinc/dub
- Stars: about 22.7k to 23.5k from public repository/index pages
- Last Activity: public activity page showed pushes within hours on 2026-06-08
- License: AGPL-3.0 / custom reporting varies by index; verify before reuse

**Architecture Analysis**
- Folder structure: modern TypeScript/Next.js platform with app, API, analytics, partner, SDK, and docs surfaces.
- Frontend architecture: link management, analytics dashboards, partner/referral program management, workspace settings.
- Backend architecture: link routing, attribution, conversion tracking, partner program workflows, API keys, and billing.
- State management: workspace state, link tables, analytics filters, partner program state.
- Database strategy: links, domains, workspaces, events, conversions, partners, commissions.
- API strategy: public APIs and SDKs for links, analytics, conversions, and partners.
- Deployment strategy: Vercel-aligned, event/analytics stores, edge-aware link routing.

**Strengths**
- Best mature reference for attribution, partner links, and conversion analytics.
- Strong fit for partner ecosystem and affiliate/referral tracking.

**Weaknesses**
- License requires caution.
- Marketing link attribution differs from investment partner governance.

**Reusable Ideas**
- UI patterns: partner marketplace, link analytics, conversion funnel, payout/commission views.
- Architecture patterns: attribution events, public tracking script, partner program workflow.
- Database patterns: click, lead, conversion, partner, commission, payout.
- Infrastructure patterns: edge redirects, analytics event ingestion, SDK generation.

**Adoption Recommendation: Adopt**

Adopt attribution and partner analytics patterns only.

### 26. Refferq / RefRef-class Projects

**Basic Information**
- Project Name: Refferq / RefRef-class affiliate platforms
- GitHub URL: https://github.com/Refferq/Refferq and https://github.com/refrefhq/refref
- Stars: Refferq not clearly above threshold in public snippets; RefRef about 179
- Last Activity: Refferq updated 2026-05-12 in topic listing; RefRef crawled recently
- License: AGPL-3.0 for RefRef; verify each project

**Architecture Analysis**
- Folder structure: modern Next.js/PostgreSQL referral apps with admin, affiliate portal, tracking, and docs.
- Frontend architecture: affiliate dashboard, admin control panel, referral status, earnings, and program settings.
- Backend architecture: referral attribution, commission calculations, payout workflows, and email notifications.
- State management: affiliate performance state, program settings, referral status.
- Database strategy: affiliates, referrals, leads, conversions, commissions, payouts.
- API strategy: tracking endpoints, admin APIs, affiliate APIs.
- Deployment strategy: self-hosted SaaS style.

**Strengths**
- Direct domain match for referrals and commissions.
- Simpler than Dub for pure affiliate workflows.

**Weaknesses**
- Does not meet the preferred 1,000+ star maturity threshold.
- Smaller community and less proven operational scale.

**Reusable Ideas**
- UI patterns: affiliate portal, earnings table, referral approval queue, payout status.
- Architecture patterns: referral lifecycle, commission rules, fraud checks.
- Database patterns: referral status machine, commission ledger, payout batch.
- Infrastructure patterns: tracking script, webhook conversion reporting.

**Adoption Recommendation: Avoid**

Do not use as a core architecture reference due to maturity gap; use only to validate domain vocabulary.

### 27. Ever Gauzy

**Basic Information**
- Project Name: Ever Gauzy
- GitHub URL: https://github.com/ever-co/ever-gauzy
- Stars: 3,724
- Last Activity: 2026-06-07
- License: AGPL-3.0

**Architecture Analysis**
- Folder structure: large TypeScript business management monorepo with ERP/CRM/HRM/ATS/PM modules.
- Frontend architecture: enterprise admin UI for organizations, teams, billing, accounting, projects, and CRM.
- Backend architecture: modular business services with organization scoping, accounting, expenses, invoices, and CRM entities.
- State management: admin/business workflow state across modules.
- Database strategy: broad relational model for organizations, users, accounting, invoices, projects, CRM.
- API strategy: service-oriented APIs for business modules.
- Deployment strategy: self-hosted enterprise app model.

**Strengths**
- Useful for partner operations, organization management, invoices, expenses, and back-office workflows.
- Active and modular.

**Weaknesses**
- AGPL and broad ERP scope make direct adoption unattractive.
- Affiliate tracking is indirect, not the core product.

**Reusable Ideas**
- UI patterns: enterprise admin navigation, organization settings, invoice/payment tables.
- Architecture patterns: modular business domains, organization scoping, accounting workflows.
- Database patterns: organization, invoice, expense, payment, contact, project.
- Infrastructure patterns: self-hosted enterprise deployment and modular services.

**Adoption Recommendation: Consider**

Use only for back-office partner/admin workflow inspiration.

## Top 20 Recommended Projects

### 1. next-forge
- Why it matters: Closest production-grade match for Next.js, TypeScript, Vercel, SaaS packaging, and shared packages.
- Influences: Repository structure, SaaS foundation, deployment, observability.
- Recommendation: Adopt architecture patterns.

### 2. Vercel AI Chatbot
- Why it matters: Best Next.js-native reference for streaming AI, persisted chats, shadcn/ui, and Vercel deployment.
- Influences: ARIA assistant, chat persistence, AI UI.
- Recommendation: Adopt implementation architecture concepts, adapt to Prisma.

### 3. Payload
- Why it matters: TypeScript/Next.js-aligned admin CMS and content modeling.
- Influences: Admin CMS, education content, publishing workflows.
- Recommendation: Adopt CMS patterns; evaluate actual integration separately.

### 4. Novu
- Why it matters: Most complete notification infrastructure reference.
- Influences: Notification center, email workflows, preferences, delivery logs.
- Recommendation: Adopt domain model and workflow concepts.

### 5. Grafana
- Why it matters: Mature dashboard and alerting UX.
- Influences: Analytics workspace, visualization layer, alerting.
- Recommendation: Adopt UX and plugin patterns only.

### 6. Metabase
- Why it matters: Makes analytics understandable to non-technical users.
- Influences: Education-first analytics, saved questions, collections.
- Recommendation: Adopt UX and semantic analytics patterns.

### 7. Apache Superset
- Why it matters: Mature chart exploration and dataset governance.
- Influences: Analytics builder, dashboard filters, async query execution.
- Recommendation: Adopt chart/dataset architecture concepts.

### 8. Dify
- Why it matters: Production-grade AI workflow, RAG, tool, and provider architecture.
- Influences: ARIA orchestration, knowledge base, AI observability.
- Recommendation: Adopt high-level architecture only.

### 9. Cal.com
- Why it matters: Mature marketplace/integration architecture in a TypeScript SaaS.
- Influences: Partner ecosystem, integrations, team settings.
- Recommendation: Adopt marketplace and integration patterns.

### 10. Ghostfolio
- Why it matters: Directly relevant portfolio intelligence domain model.
- Influences: Portfolio analytics, holdings, allocations, performance.
- Recommendation: Adopt domain modeling concepts only.

### 11. OpenBB
- Why it matters: Strongest open reference for financial data provider abstraction.
- Influences: Market data layer, research tools, data provenance.
- Recommendation: Adopt provider architecture concepts.

### 12. Dub
- Why it matters: Mature link attribution, conversion tracking, and partner program reference.
- Influences: Partner/affiliate system, attribution, conversion analytics.
- Recommendation: Adopt attribution patterns only.

### 13. Trigger.dev
- Why it matters: Durable jobs, schedules, retries, and run observability.
- Influences: Notifications, market data refresh, AI background jobs.
- Recommendation: Adopt background job patterns.

### 14. freeCodeCamp
- Why it matters: Proven curriculum structure and learner progress model.
- Influences: Education-first onboarding, learning paths, quizzes.
- Recommendation: Adopt learning content/progress concepts.

### 15. BoxyHQ SaaS Starter Kit
- Why it matters: Enterprise SaaS workflows: teams, roles, SSO, audit logs, payments.
- Influences: Authentication, subscriptions, user management, admin.
- Recommendation: Consider; use domain concepts, not routing structure.

### 16. Lobe Chat
- Why it matters: Polished chat UX, provider selection, and agent settings.
- Influences: ARIA chat UX, model settings, assistant preferences.
- Recommendation: Adopt UX/provider concepts.

### 17. Lightdash
- Why it matters: TypeScript-oriented semantic BI and metrics-as-code.
- Influences: Analytics metrics layer, governed definitions.
- Recommendation: Consider for semantic layer.

### 18. Twenty
- Why it matters: Modern workspace UX for records, views, and CRM-style admin surfaces.
- Influences: Portfolio workspace, admin CMS, partner management.
- Recommendation: Consider for UI patterns and metadata concepts.

### 19. Actual
- Why it matters: Strong financial ledger UX and local-first data discipline.
- Influences: Portfolio transaction imports, account views, reconciliation.
- Recommendation: Consider financial UX and ledger patterns.

### 20. Directus
- Why it matters: Flexible admin-over-database and automation concepts.
- Influences: Internal admin CMS, data operations, role matrix.
- Recommendation: Consider admin/data-studio patterns.

## Research Takeaways By Subsystem

**Education-first onboarding**
- Primary references: freeCodeCamp, Open edX, Payload.
- Adopt content-driven learning paths, progress tracking, quizzes, and draft/publish workflows.

**Market discovery**
- Primary references: OpenBB, Metabase, Superset.
- Adopt provider abstraction, semantic datasets, and guided exploration.

**Analytics workspace**
- Primary references: Grafana, Metabase, Superset, Lightdash.
- Adopt dashboard grid, saved questions, chart plugins, dataset governance, and async query jobs.

**Economic calendar**
- Primary references: OpenBB, Trigger.dev, Novu.
- Adopt provider adapters, scheduled ingestion, normalized event model, and notification triggers.

**Portfolio intelligence**
- Primary references: Ghostfolio, Actual, Firefly III.
- Adopt holdings, activities, ledger-style transactions, allocation charts, and calculation services.

**AI-powered guidance (ARIA)**
- Primary references: Vercel AI Chatbot, Dify, Lobe Chat.
- Adopt streaming chat, provider abstraction, RAG, tool registry, run logs, and feedback.

**Notification system**
- Primary references: Novu, Trigger.dev, Grafana alerting.
- Adopt event triggers, notification preferences, channel providers, retries, and delivery logs.

**Partner ecosystem**
- Primary references: Cal.com, Dub, Ever Gauzy.
- Adopt integration registry, partner marketplace, attribution events, and partner admin workflows.

**Subscription system**
- Primary references: next-forge, BoxyHQ SaaS Starter Kit, Cal.com.
- Adopt workspace subscriptions, entitlement checks, billing webhooks, and audit logs.

**Admin CMS**
- Primary references: Payload, Strapi, Directus, Twenty.
- Adopt collection-based content, drafts, versions, roles, media, and internal admin views.
