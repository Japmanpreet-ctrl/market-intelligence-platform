# Watchlists

## Overview

Watchlists allow authenticated users to track the performance of their favorite assets.

## Data Model

- `Watchlist`: A user-owned list with a name.
- `WatchlistItem`: A junction table linking a Watchlist to an Asset.

## User Flow

1. User authenticates and navigates to `/watchlists`.
2. User views their existing watchlists or creates a new one.
3. User navigates to a specific watchlist (`/watchlists/[id]`).
4. User searches for assets and adds them to the watchlist.
5. User can remove assets or delete the entire watchlist.

## API Contracts

- `GET /api/watchlists` -> Returns user's watchlists.
- `POST /api/watchlists` -> Creates a new watchlist.
- `GET /api/watchlists/[id]` -> Returns details of a specific watchlist.
- `PATCH /api/watchlists/[id]` -> Renames a watchlist.
- `DELETE /api/watchlists/[id]` -> Deletes a watchlist.
- `POST /api/watchlists/[id]/items` -> Adds an asset to the watchlist.
- `DELETE /api/watchlists/[id]/items` -> Removes an asset.

## Future Expansion

- Shareable public watchlists.
- Alerting based on price movements of watchlisted assets.
