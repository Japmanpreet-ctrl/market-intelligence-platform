import { prisma } from "@repo/database";
import type { AssetType } from "@repo/database";

export interface AssetFilters {
  assetType?: AssetType;
  exchange?: string;
  search?: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export class AssetRepository {
  async getAssets(filters: AssetFilters = {}, pagination: PaginationParams = {}) {
    const page = pagination.page ?? 1;
    const pageSize = pagination.pageSize ?? 10;
    const skip = (page - 1) * pageSize;

    const where: Record<string, unknown> = {};

    if (filters.assetType) {
      where.assetType = filters.assetType;
    }

    if (filters.exchange) {
      where.exchange = filters.exchange;
    }

    if (filters.search) {
      where.OR = [
        { symbol: { contains: filters.search, mode: "insensitive" } },
        { name: { contains: filters.search, mode: "insensitive" } }
      ];
    }

    const [data, totalCount] = await Promise.all([
      prisma.asset.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { symbol: "asc" },
        include: {
          priceSnapshots: {
            orderBy: { timestamp: "desc" },
            take: 1
          }
        }
      }),
      prisma.asset.count({ where })
    ]);

    return {
      data,
      page,
      pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize)
    };
  }

  async getAssetBySymbol(symbol: string) {
    return prisma.asset.findUnique({
      where: { symbol: symbol.toUpperCase() },
      include: {
        priceSnapshots: {
          orderBy: { timestamp: "desc" },
          take: 1
        }
      }
    });
  }

  async searchAssets(query: string, limit = 10) {
    return prisma.asset.findMany({
      where: {
        OR: [
          { symbol: { contains: query, mode: "insensitive" } },
          { name: { contains: query, mode: "insensitive" } }
        ]
      },
      take: limit,
      orderBy: { symbol: "asc" },
      include: {
        priceSnapshots: {
          orderBy: { timestamp: "desc" },
          take: 1
        }
      }
    });
  }

  async getTopMovers(limit = 5) {
    const snapshots = await prisma.assetPriceSnapshot.findMany({
      orderBy: { dailyChangePercent: "desc" },
      take: limit,
      include: { asset: true },
      distinct: ["assetId"]
    });

    return snapshots;
  }

  async getDistinctExchanges(): Promise<string[]> {
    const results = await prisma.asset.findMany({
      where: { exchange: { not: null } },
      select: { exchange: true },
      distinct: ["exchange"],
      orderBy: { exchange: "asc" }
    });

    return results.map((r) => r.exchange).filter(Boolean) as string[];
  }

  async getAssetCountByType(): Promise<Record<string, number>> {
    const counts = await prisma.asset.groupBy({
      by: ["assetType"],
      _count: { _all: true }
    });

    const result: Record<string, number> = {};
    for (const c of counts) {
      result[c.assetType] = c._count._all;
    }

    return result;
  }

  async getRelatedAssets(symbol: string, limit = 5) {
    const asset = await prisma.asset.findUnique({
      where: { symbol: symbol.toUpperCase() }
    });

    if (!asset) return [];

    return prisma.asset.findMany({
      where: {
        id: { not: asset.id },
        OR: [
          ...(asset.sector ? [{ sector: asset.sector }] : []),
          { assetType: asset.assetType }
        ]
      },
      take: limit,
      include: {
        priceSnapshots: {
          orderBy: { timestamp: "desc" },
          take: 1
        }
      }
    });
  }
}

export const assetRepository = new AssetRepository();
