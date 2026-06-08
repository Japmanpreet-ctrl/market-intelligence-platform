# Local Database Infrastructure

This directory documents the local Docker-backed database infrastructure for the
Market Intelligence Platform.

The root `docker-compose.yml` owns the runnable services:

- `postgres`: PostgreSQL 17 on `localhost:5432`.
- `pgadmin`: pgAdmin on `localhost:5050` with `admin@example.com`.

This infrastructure is for local development only. Production database hosting
and connection management are intentionally deferred to a future deployment
phase.
