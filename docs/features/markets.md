# Markets Directory

## Overview

The Markets directory is the primary public-facing feature that lists all available financial assets across various classes (Stocks, ETFs, Indices, Crypto, Forex, Commodities).

## Data Model

- `Asset`: Core entity representing a financial instrument.
- `AssetPriceSnapshot`: Historical and current price data for an asset.

## User Flow

1. User navigates to `/markets`.
2. A paginated table of assets is displayed.
3. User can search by symbol or name.
4. User can filter by asset type or exchange.
5. User clicks an asset to view its detail page (`/markets/[symbol]`).

## API Contracts

- `GET /api/assets?page={n}&search={str}&assetType={type}&exchange={ex}` -> Returns paginated assets.
- `GET /api/assets/[symbol]` -> Returns a single asset with price snapshots.

## Future Expansion

- Add real-time price updates via WebSockets.
- Integrate external APIs (e.g., Finnhub) for live market data.
- Add advanced charting to the asset detail page.
