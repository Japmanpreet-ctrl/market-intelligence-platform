# Local Database Development

The local database stack uses Docker Compose and runs only on the developer
machine.

## Services

### PostgreSQL

- Image: `postgres:17`
- Host: `localhost`
- Port: `5432`
- Default database: `market_intelligence`
- Default user: `market_user`

### pgAdmin

- Image: `dpage/pgadmin4:latest`
- URL: `http://localhost:5050`
- Default email: `admin@example.com`
- Default password: `admin_password`

## Environment Variables

Copy `.env.example` to `.env` for local development and adjust values if needed.

Required local database values:

```env
DATABASE_URL=postgresql://market_user:market_password@localhost:5432/market_intelligence?schema=public
POSTGRES_USER=market_user
POSTGRES_PASSWORD=market_password
POSTGRES_DB=market_intelligence
PGADMIN_EMAIL=admin@example.com
PGADMIN_PASSWORD=admin_password
```

## Start Docker Services

```bash
docker compose up -d
```

Check service health:

```bash
docker compose ps
```

## Prisma Workflow

Generate Prisma Client:

```bash
pnpm prisma generate
```

Create and apply a migration:

```bash
pnpm prisma migrate dev --name init_identity
```

Apply existing migrations:

```bash
pnpm prisma migrate dev
```

Seed baseline identity data:

```bash
pnpm prisma db seed
```

Reset the local database:

```bash
pnpm prisma migrate reset
```

## Migration Policy

- Migrations are created from `packages/database/prisma/schema.prisma`.
- Migration files belong to `packages/database/prisma/migrations`.
- Every schema change must be represented by a migration.
- Other packages may consume exported database types but must not own migrations.
