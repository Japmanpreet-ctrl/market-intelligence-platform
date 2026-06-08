# Coding Rules

## General Rules

Use TypeScript in strict mode.

Prefer explicit package boundaries over relative cross-package imports.

Keep application pages thin. Pages compose UI and call package APIs; they should
not own domain logic.

Do not add business features during foundation work.

Do not add authentication, database schema, APIs, market pages, AI features,
portfolio features, billing features, CMS features, or admin features until a
future prompt explicitly authorizes them.

## UI Rules

Use `@repo/ui` primitives for shared interface elements.

Keep components accessible by default:

- Use semantic HTML.
- Preserve visible focus states.
- Maintain heading hierarchy.
- Use real buttons and links for interactive controls.

## Type Rules

Domain-specific types belong in their domain package.

Cross-cutting platform types belong in `@repo/types`.

Avoid `any`. If an unknown value crosses a boundary, validate it first.

## Environment Rules

Environment variables must be accessed through `@repo/config`.

New environment variables must be added to:

- `.env.example`
- `@repo/config` environment schema
- relevant architecture documentation when needed

## Testing Rules

Every package and app must keep `lint`, `typecheck`, `test`, and `build` scripts
green.

Domain logic requires unit tests before app integration.

Data provider integrations must be tested through mocked adapters.

## Formatting Rules

Prettier owns formatting.

ESLint owns code correctness rules.

Pre-commit hooks run formatting, linting, and typechecking.
