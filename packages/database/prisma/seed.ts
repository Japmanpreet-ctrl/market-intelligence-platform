import { PrismaClient } from "../src/generated/client";

const prisma = new PrismaClient();

const roles = [
  { name: "Admin", description: "Platform administration role." },
  { name: "User", description: "Default platform user role." },
  { name: "Partner", description: "Partner ecosystem access role." },
  { name: "Support", description: "Customer support operations role." }
];

const permissions = [
  { name: "users.read", description: "Read user identity records." },
  { name: "users.write", description: "Manage user identity records." },
  { name: "content.read", description: "Read managed content." },
  { name: "content.write", description: "Manage content drafts and publishing." },
  { name: "analytics.read", description: "Read analytics workspace data." },
  { name: "support.read", description: "Read support context." },
  { name: "support.write", description: "Manage support workflows." }
];

const rolePermissionNames: Record<string, string[]> = {
  Admin: permissions.map((permission) => permission.name),
  Partner: ["content.read", "analytics.read"],
  Support: ["users.read", "support.read", "support.write"],
  User: ["content.read", "analytics.read"]
};

// ─── Market Data Seed ──────────────────────────────────────────────────────

const assets = [
  // Stocks
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    assetType: "STOCK" as const,
    exchange: "NASDAQ",
    sector: "Technology",
    industry: "Consumer Electronics",
    country: "US",
    description:
      "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
    marketCap: 3450000000000,
    currency: "USD"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    assetType: "STOCK" as const,
    exchange: "NASDAQ",
    sector: "Technology",
    industry: "Software—Infrastructure",
    country: "US",
    description:
      "Microsoft Corporation develops and supports software, services, devices, and solutions worldwide.",
    marketCap: 3200000000000,
    currency: "USD"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    assetType: "STOCK" as const,
    exchange: "NASDAQ",
    sector: "Technology",
    industry: "Semiconductors",
    country: "US",
    description:
      "NVIDIA Corporation provides graphics, computing, and networking solutions worldwide.",
    marketCap: 3100000000000,
    currency: "USD"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    assetType: "STOCK" as const,
    exchange: "NASDAQ",
    sector: "Technology",
    industry: "Internet Content & Information",
    country: "US",
    description:
      "Alphabet Inc. offers various products and platforms worldwide, including search, advertising, and cloud computing.",
    marketCap: 2100000000000,
    currency: "USD"
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    assetType: "STOCK" as const,
    exchange: "NASDAQ",
    sector: "Consumer Cyclical",
    industry: "Internet Retail",
    country: "US",
    description:
      "Amazon.com, Inc. engages in the retail sale of consumer products, advertising, and subscription services.",
    marketCap: 2000000000000,
    currency: "USD"
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    assetType: "STOCK" as const,
    exchange: "NASDAQ",
    sector: "Technology",
    industry: "Internet Content & Information",
    country: "US",
    description:
      "Meta Platforms, Inc. engages in the development of products that enable people to connect and share.",
    marketCap: 1500000000000,
    currency: "USD"
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    assetType: "STOCK" as const,
    exchange: "NASDAQ",
    sector: "Consumer Cyclical",
    industry: "Auto Manufacturers",
    country: "US",
    description:
      "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles and energy generation and storage systems.",
    marketCap: 800000000000,
    currency: "USD"
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    assetType: "STOCK" as const,
    exchange: "NYSE",
    sector: "Financial Services",
    industry: "Banks—Diversified",
    country: "US",
    description:
      "JPMorgan Chase & Co. operates as a financial services company worldwide.",
    marketCap: 680000000000,
    currency: "USD"
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    assetType: "STOCK" as const,
    exchange: "NYSE",
    sector: "Financial Services",
    industry: "Credit Services",
    country: "US",
    description: "Visa Inc. operates as a payments technology company worldwide.",
    marketCap: 580000000000,
    currency: "USD"
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    assetType: "STOCK" as const,
    exchange: "NYSE",
    sector: "Healthcare",
    industry: "Drug Manufacturers—General",
    country: "US",
    description:
      "Johnson & Johnson researches, develops, manufactures, and sells various products in the healthcare field.",
    marketCap: 400000000000,
    currency: "USD"
  },
  {
    symbol: "WMT",
    name: "Walmart Inc.",
    assetType: "STOCK" as const,
    exchange: "NYSE",
    sector: "Consumer Defensive",
    industry: "Discount Stores",
    country: "US",
    description:
      "Walmart Inc. engages in the operation of retail, wholesale, and other units worldwide.",
    marketCap: 620000000000,
    currency: "USD"
  },
  {
    symbol: "UNH",
    name: "UnitedHealth Group",
    assetType: "STOCK" as const,
    exchange: "NYSE",
    sector: "Healthcare",
    industry: "Healthcare Plans",
    country: "US",
    description:
      "UnitedHealth Group Incorporated operates as a diversified health care company in the United States.",
    marketCap: 450000000000,
    currency: "USD"
  },
  {
    symbol: "HD",
    name: "The Home Depot, Inc.",
    assetType: "STOCK" as const,
    exchange: "NYSE",
    sector: "Consumer Cyclical",
    industry: "Home Improvement Retail",
    country: "US",
    description: "The Home Depot, Inc. operates as a home improvement retailer.",
    marketCap: 380000000000,
    currency: "USD"
  },
  {
    symbol: "PG",
    name: "Procter & Gamble Co.",
    assetType: "STOCK" as const,
    exchange: "NYSE",
    sector: "Consumer Defensive",
    industry: "Household & Personal Products",
    country: "US",
    description:
      "The Procter & Gamble Company provides branded consumer packaged goods worldwide.",
    marketCap: 370000000000,
    currency: "USD"
  },
  {
    symbol: "BAC",
    name: "Bank of America Corp.",
    assetType: "STOCK" as const,
    exchange: "NYSE",
    sector: "Financial Services",
    industry: "Banks—Diversified",
    country: "US",
    description:
      "Bank of America Corporation, through its subsidiaries, provides banking and financial products and services.",
    marketCap: 340000000000,
    currency: "USD"
  },
  {
    symbol: "XOM",
    name: "Exxon Mobil Corporation",
    assetType: "STOCK" as const,
    exchange: "NYSE",
    sector: "Energy",
    industry: "Oil & Gas Integrated",
    country: "US",
    description:
      "Exxon Mobil Corporation explores for and produces crude oil and natural gas.",
    marketCap: 500000000000,
    currency: "USD"
  },
  {
    symbol: "DIS",
    name: "The Walt Disney Company",
    assetType: "STOCK" as const,
    exchange: "NYSE",
    sector: "Communication Services",
    industry: "Entertainment",
    country: "US",
    description:
      "The Walt Disney Company operates as an entertainment company worldwide.",
    marketCap: 200000000000,
    currency: "USD"
  },
  {
    symbol: "NFLX",
    name: "Netflix, Inc.",
    assetType: "STOCK" as const,
    exchange: "NASDAQ",
    sector: "Communication Services",
    industry: "Entertainment",
    country: "US",
    description: "Netflix, Inc. provides entertainment services worldwide.",
    marketCap: 310000000000,
    currency: "USD"
  },
  {
    symbol: "CRM",
    name: "Salesforce, Inc.",
    assetType: "STOCK" as const,
    exchange: "NYSE",
    sector: "Technology",
    industry: "Software—Application",
    country: "US",
    description: "Salesforce, Inc. provides customer relationship management technology.",
    marketCap: 270000000000,
    currency: "USD"
  },
  {
    symbol: "INTC",
    name: "Intel Corporation",
    assetType: "STOCK" as const,
    exchange: "NASDAQ",
    sector: "Technology",
    industry: "Semiconductors",
    country: "US",
    description:
      "Intel Corporation designs, develops, manufactures, and sells computing and related products.",
    marketCap: 120000000000,
    currency: "USD"
  },

  // ETFs
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    assetType: "ETF" as const,
    exchange: "NYSE",
    sector: null,
    industry: null,
    country: "US",
    description:
      "Tracks the S&P 500 Index, one of the most widely followed benchmarks for U.S. large-cap equities.",
    marketCap: null,
    currency: "USD"
  },
  {
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    assetType: "ETF" as const,
    exchange: "NASDAQ",
    sector: null,
    industry: null,
    country: "US",
    description:
      "Tracks the Nasdaq-100 Index, which includes 100 of the largest non-financial companies listed on the Nasdaq.",
    marketCap: null,
    currency: "USD"
  },
  {
    symbol: "IWM",
    name: "iShares Russell 2000 ETF",
    assetType: "ETF" as const,
    exchange: "NYSE",
    sector: null,
    industry: null,
    country: "US",
    description:
      "Tracks the Russell 2000 Index, measuring U.S. small-cap stock market performance.",
    marketCap: null,
    currency: "USD"
  },
  {
    symbol: "VTI",
    name: "Vanguard Total Stock Market ETF",
    assetType: "ETF" as const,
    exchange: "NYSE",
    sector: null,
    industry: null,
    country: "US",
    description: "Seeks to track the performance of the CRSP US Total Market Index.",
    marketCap: null,
    currency: "USD"
  },

  // Indices
  {
    symbol: "DJI",
    name: "Dow Jones Industrial Average",
    assetType: "INDEX" as const,
    exchange: "NYSE",
    sector: null,
    industry: null,
    country: "US",
    description: "Price-weighted index of 30 prominent U.S. companies.",
    marketCap: null,
    currency: "USD"
  },

  // Crypto
  {
    symbol: "BTCUSD",
    name: "Bitcoin",
    assetType: "CRYPTO" as const,
    exchange: "CRYPTO",
    sector: null,
    industry: "Cryptocurrency",
    country: null,
    description:
      "Bitcoin is a decentralized digital currency operating on a peer-to-peer network.",
    marketCap: 1300000000000,
    currency: "USD"
  },
  {
    symbol: "ETHUSD",
    name: "Ethereum",
    assetType: "CRYPTO" as const,
    exchange: "CRYPTO",
    sector: null,
    industry: "Cryptocurrency",
    country: null,
    description:
      "Ethereum is a decentralized platform that enables smart contracts and decentralized applications.",
    marketCap: 420000000000,
    currency: "USD"
  },
  {
    symbol: "SOLUSD",
    name: "Solana",
    assetType: "CRYPTO" as const,
    exchange: "CRYPTO",
    sector: null,
    industry: "Cryptocurrency",
    country: null,
    description:
      "Solana is a high-performance blockchain supporting decentralized apps and crypto-currencies.",
    marketCap: 80000000000,
    currency: "USD"
  },

  // Forex
  {
    symbol: "EURUSD",
    name: "EUR/USD",
    assetType: "FOREX" as const,
    exchange: "FOREX",
    sector: null,
    industry: null,
    country: null,
    description: "Euro to US Dollar exchange rate.",
    marketCap: null,
    currency: "USD"
  },
  {
    symbol: "GBPUSD",
    name: "GBP/USD",
    assetType: "FOREX" as const,
    exchange: "FOREX",
    sector: null,
    industry: null,
    country: null,
    description: "British Pound to US Dollar exchange rate.",
    marketCap: null,
    currency: "USD"
  },

  // Commodities
  {
    symbol: "XAUUSD",
    name: "Gold",
    assetType: "COMMODITY" as const,
    exchange: "COMEX",
    sector: null,
    industry: "Precious Metals",
    country: null,
    description: "Gold spot price in US Dollars per troy ounce.",
    marketCap: null,
    currency: "USD"
  },
  {
    symbol: "WTIUSD",
    name: "Crude Oil WTI",
    assetType: "COMMODITY" as const,
    exchange: "NYMEX",
    sector: null,
    industry: "Energy",
    country: null,
    description: "West Texas Intermediate crude oil futures price.",
    marketCap: null,
    currency: "USD"
  }
];

// Realistic price data for each asset
const priceData: Record<
  string,
  { price: number; dailyChange: number; dailyChangePercent: number; volume: number }
> = {
  AAPL: { price: 198.45, dailyChange: 3.21, dailyChangePercent: 1.64, volume: 54320000 },
  MSFT: {
    price: 442.57,
    dailyChange: -2.18,
    dailyChangePercent: -0.49,
    volume: 22180000
  },
  NVDA: { price: 135.72, dailyChange: 5.89, dailyChangePercent: 4.54, volume: 312500000 },
  GOOGL: { price: 178.34, dailyChange: 1.45, dailyChangePercent: 0.82, volume: 25670000 },
  AMZN: {
    price: 195.83,
    dailyChange: -0.67,
    dailyChangePercent: -0.34,
    volume: 42310000
  },
  META: { price: 512.9, dailyChange: 8.34, dailyChangePercent: 1.65, volume: 18920000 },
  TSLA: {
    price: 248.42,
    dailyChange: -12.56,
    dailyChangePercent: -4.81,
    volume: 98450000
  },
  JPM: { price: 218.73, dailyChange: 1.89, dailyChangePercent: 0.87, volume: 8340000 },
  V: { price: 289.12, dailyChange: 0.45, dailyChangePercent: 0.16, volume: 5670000 },
  JNJ: { price: 155.28, dailyChange: -0.92, dailyChangePercent: -0.59, volume: 6780000 },
  WMT: { price: 87.65, dailyChange: 1.12, dailyChangePercent: 1.29, volume: 12340000 },
  UNH: { price: 512.34, dailyChange: -5.67, dailyChangePercent: -1.09, volume: 3450000 },
  HD: { price: 378.9, dailyChange: 2.34, dailyChangePercent: 0.62, volume: 4560000 },
  PG: { price: 168.45, dailyChange: 0.78, dailyChangePercent: 0.47, volume: 5890000 },
  BAC: { price: 42.18, dailyChange: 0.56, dailyChangePercent: 1.35, volume: 34560000 },
  XOM: { price: 112.34, dailyChange: -1.23, dailyChangePercent: -1.08, volume: 15670000 },
  DIS: { price: 102.56, dailyChange: 1.78, dailyChangePercent: 1.77, volume: 9870000 },
  NFLX: { price: 721.45, dailyChange: 15.23, dailyChangePercent: 2.16, volume: 7890000 },
  CRM: { price: 268.9, dailyChange: -3.45, dailyChangePercent: -1.27, volume: 4560000 },
  INTC: { price: 31.24, dailyChange: -0.89, dailyChangePercent: -2.77, volume: 45670000 },
  SPY: { price: 543.21, dailyChange: 2.34, dailyChangePercent: 0.43, volume: 67890000 },
  QQQ: { price: 478.56, dailyChange: 4.12, dailyChangePercent: 0.87, volume: 45670000 },
  IWM: { price: 205.34, dailyChange: -1.23, dailyChangePercent: -0.6, volume: 23450000 },
  VTI: { price: 268.9, dailyChange: 1.56, dailyChangePercent: 0.58, volume: 3450000 },
  DJI: { price: 39245.78, dailyChange: 125.45, dailyChangePercent: 0.32, volume: 0 },
  BTCUSD: {
    price: 68432.5,
    dailyChange: 1245.3,
    dailyChangePercent: 1.85,
    volume: 28500000000
  },
  ETHUSD: {
    price: 3845.2,
    dailyChange: -56.8,
    dailyChangePercent: -1.46,
    volume: 15200000000
  },
  SOLUSD: {
    price: 172.34,
    dailyChange: 8.9,
    dailyChangePercent: 5.45,
    volume: 3200000000
  },
  EURUSD: { price: 1.0892, dailyChange: 0.0023, dailyChangePercent: 0.21, volume: 0 },
  GBPUSD: { price: 1.2734, dailyChange: -0.0015, dailyChangePercent: -0.12, volume: 0 },
  XAUUSD: { price: 2342.5, dailyChange: 18.3, dailyChangePercent: 0.79, volume: 0 },
  WTIUSD: { price: 78.45, dailyChange: -1.23, dailyChangePercent: -1.54, volume: 0 }
};

const economicEvents = [
  {
    title: "US Consumer Price Index (CPI)",
    country: "US",
    category: "Inflation",
    impact: "HIGH" as const,
    eventDate: futureDate(2)
  },
  {
    title: "US Non-Farm Payrolls",
    country: "US",
    category: "Employment",
    impact: "HIGH" as const,
    eventDate: futureDate(5)
  },
  {
    title: "Federal Reserve Interest Rate Decision",
    country: "US",
    category: "Interest Rate",
    impact: "HIGH" as const,
    eventDate: futureDate(8)
  },
  {
    title: "US GDP Growth Rate (Q2)",
    country: "US",
    category: "GDP",
    impact: "HIGH" as const,
    eventDate: futureDate(12)
  },
  {
    title: "US Retail Sales",
    country: "US",
    category: "Consumer",
    impact: "MEDIUM" as const,
    eventDate: futureDate(3)
  },
  {
    title: "US Unemployment Rate",
    country: "US",
    category: "Employment",
    impact: "HIGH" as const,
    eventDate: futureDate(5)
  },
  {
    title: "US Producer Price Index (PPI)",
    country: "US",
    category: "Inflation",
    impact: "MEDIUM" as const,
    eventDate: futureDate(4)
  },
  {
    title: "US Initial Jobless Claims",
    country: "US",
    category: "Employment",
    impact: "MEDIUM" as const,
    eventDate: futureDate(1)
  },
  {
    title: "US ISM Manufacturing PMI",
    country: "US",
    category: "Manufacturing",
    impact: "MEDIUM" as const,
    eventDate: futureDate(6)
  },
  {
    title: "US Consumer Confidence",
    country: "US",
    category: "Consumer",
    impact: "MEDIUM" as const,
    eventDate: futureDate(7)
  },
  {
    title: "ECB Interest Rate Decision",
    country: "EU",
    category: "Interest Rate",
    impact: "HIGH" as const,
    eventDate: futureDate(10)
  },
  {
    title: "Eurozone CPI",
    country: "EU",
    category: "Inflation",
    impact: "HIGH" as const,
    eventDate: futureDate(9)
  },
  {
    title: "Eurozone GDP Growth Rate",
    country: "EU",
    category: "GDP",
    impact: "MEDIUM" as const,
    eventDate: futureDate(14)
  },
  {
    title: "UK CPI",
    country: "UK",
    category: "Inflation",
    impact: "HIGH" as const,
    eventDate: futureDate(4)
  },
  {
    title: "Bank of England Interest Rate Decision",
    country: "UK",
    category: "Interest Rate",
    impact: "HIGH" as const,
    eventDate: futureDate(11)
  },
  {
    title: "UK GDP Growth Rate",
    country: "UK",
    category: "GDP",
    impact: "MEDIUM" as const,
    eventDate: futureDate(15)
  },
  {
    title: "Japan GDP Growth Rate",
    country: "JP",
    category: "GDP",
    impact: "MEDIUM" as const,
    eventDate: futureDate(13)
  },
  {
    title: "Bank of Japan Interest Rate Decision",
    country: "JP",
    category: "Interest Rate",
    impact: "HIGH" as const,
    eventDate: futureDate(16)
  },
  {
    title: "China GDP Growth Rate",
    country: "CN",
    category: "GDP",
    impact: "HIGH" as const,
    eventDate: futureDate(18)
  },
  {
    title: "China Manufacturing PMI",
    country: "CN",
    category: "Manufacturing",
    impact: "MEDIUM" as const,
    eventDate: futureDate(7)
  },
  {
    title: "Australia Interest Rate Decision",
    country: "AU",
    category: "Interest Rate",
    impact: "MEDIUM" as const,
    eventDate: futureDate(9)
  },
  {
    title: "Canada Employment Change",
    country: "CA",
    category: "Employment",
    impact: "MEDIUM" as const,
    eventDate: futureDate(6)
  },
  {
    title: "US Housing Starts",
    country: "US",
    category: "Housing",
    impact: "LOW" as const,
    eventDate: futureDate(3)
  },
  {
    title: "US Durable Goods Orders",
    country: "US",
    category: "Manufacturing",
    impact: "LOW" as const,
    eventDate: futureDate(10)
  },
  {
    title: "Germany IFO Business Climate",
    country: "DE",
    category: "Business Sentiment",
    impact: "LOW" as const,
    eventDate: futureDate(8)
  }
];

function futureDate(daysFromNow: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(14, 30, 0, 0);
  return d;
}

async function main() {
  // ─── Seed Roles & Permissions (existing) ───────────────────────────────
  for (const role of roles) {
    await prisma.role.upsert({
      create: role,
      update: { description: role.description },
      where: { name: role.name }
    });
  }

  for (const permission of permissions) {
    await prisma.permission.upsert({
      create: permission,
      update: { description: permission.description },
      where: { name: permission.name }
    });
  }

  for (const [roleName, permissionNames] of Object.entries(rolePermissionNames)) {
    const role = await prisma.role.findUniqueOrThrow({ where: { name: roleName } });

    for (const permissionName of permissionNames) {
      const permission = await prisma.permission.findUniqueOrThrow({
        where: { name: permissionName }
      });

      await prisma.rolePermission.upsert({
        create: {
          permissionId: permission.id,
          roleId: role.id
        },
        update: {},
        where: {
          roleId_permissionId: {
            permissionId: permission.id,
            roleId: role.id
          }
        }
      });
    }
  }

  console.log("✓ Roles & permissions seeded");

  // ─── Seed Assets ───────────────────────────────────────────────────────
  for (const assetData of assets) {
    const asset = await prisma.asset.upsert({
      create: assetData,
      update: {
        name: assetData.name,
        assetType: assetData.assetType,
        exchange: assetData.exchange,
        sector: assetData.sector,
        industry: assetData.industry,
        country: assetData.country,
        description: assetData.description,
        marketCap: assetData.marketCap,
        currency: assetData.currency
      },
      where: { symbol: assetData.symbol }
    });

    // Seed price snapshot for this asset
    const price = priceData[assetData.symbol];
    if (price) {
      // Delete old snapshots first to avoid duplicates on re-seed
      await prisma.assetPriceSnapshot.deleteMany({ where: { assetId: asset.id } });
      await prisma.assetPriceSnapshot.create({
        data: {
          assetId: asset.id,
          price: price.price,
          dailyChange: price.dailyChange,
          dailyChangePercent: price.dailyChangePercent,
          volume: price.volume
        }
      });
    }
  }

  console.log(`✓ ${assets.length} assets seeded with price snapshots`);

  // ─── Seed Economic Events ─────────────────────────────────────────────
  // Clear existing events to avoid duplicates on re-seed
  await prisma.economicEvent.deleteMany({});
  for (const event of economicEvents) {
    await prisma.economicEvent.create({ data: event });
  }

  console.log(`✓ ${economicEvents.length} economic events seeded`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
