# Economic Calendar

## Overview

The Economic Calendar displays upcoming macro-economic events, data releases, and central bank decisions that may impact market volatility.

## Data Model

- `EconomicEvent`: Represents a scheduled event with details like country, category, impact level, and date.

## User Flow

1. User navigates to `/calendar`.
2. A list of upcoming events is shown, sorted by date.
3. User can filter events by country and impact level.

## API Contracts

- `GET /api/calendar?country={c}&impact={i}` -> Returns filtered upcoming economic events.

## Future Expansion

- Integration with external macroeconomic APIs.
- Add historical data and forecasts for each event.
- Export to Google/Apple calendar.
