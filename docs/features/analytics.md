# Analytics Workspace

## Overview

The Analytics workspace provides an authenticated user with a high-level overview of the market and their tracked assets through a dashboard interface.

## User Flow

1. User authenticates and navigates to `/analytics`.
2. A dashboard is presented with top-level stats (total assets, watchlists, upcoming events).
3. Visual indicators (like asset distribution) and lists (top movers, upcoming events) are shown.

## API Contracts

Currently, the Analytics page operates entirely via server-side rendering using repository methods (`getAssetCountByType`, `getTopMovers`, `getUpcomingEvents`, `getUserWatchlists`).

## Future Expansion

- Include chart libraries (e.g., Recharts) for visual data representation.
- Personalized analytics based on user's watchlist performance.
- Portfolio integration.
