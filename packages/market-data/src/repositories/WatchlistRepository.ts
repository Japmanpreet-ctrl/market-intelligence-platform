import { prisma } from "@repo/database";

export class WatchlistRepository {
  async createWatchlist(userId: string, name: string) {
    return prisma.watchlist.create({
      data: { userId, name },
      include: { items: { include: { asset: true } } }
    });
  }

  async getUserWatchlists(userId: string) {
    return prisma.watchlist.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: {
        items: {
          include: {
            asset: {
              include: {
                priceSnapshots: {
                  orderBy: { timestamp: "desc" },
                  take: 1
                }
              }
            }
          }
        }
      }
    });
  }

  async getWatchlistById(id: string, userId: string) {
    return prisma.watchlist.findFirst({
      where: { id, userId },
      include: {
        items: {
          include: {
            asset: {
              include: {
                priceSnapshots: {
                  orderBy: { timestamp: "desc" },
                  take: 1
                }
              }
            }
          },
          orderBy: { createdAt: "desc" }
        }
      }
    });
  }

  async renameWatchlist(id: string, userId: string, name: string) {
    return prisma.watchlist.updateMany({
      where: { id, userId },
      data: { name }
    });
  }

  async deleteWatchlist(id: string, userId: string) {
    return prisma.watchlist.deleteMany({
      where: { id, userId }
    });
  }

  async addAsset(watchlistId: string, assetId: string) {
    return prisma.watchlistItem.create({
      data: { watchlistId, assetId },
      include: { asset: true }
    });
  }

  async removeAsset(watchlistId: string, assetId: string) {
    return prisma.watchlistItem.deleteMany({
      where: { watchlistId, assetId }
    });
  }

  async getWatchlistCount(userId: string): Promise<number> {
    return prisma.watchlist.count({ where: { userId } });
  }
}

export const watchlistRepository = new WatchlistRepository();
