import { prisma } from "@repo/database";

export class PortfolioRepository {
  async getUserPortfolios(userId: string) {
    return prisma.portfolio.findMany({
      where: { userId },
      include: { holdings: true },
      orderBy: { createdAt: "asc" }
    });
  }

  async createPortfolio(userId: string, name: string) {
    return prisma.portfolio.create({
      data: { userId, name },
      include: { holdings: true }
    });
  }

  async getPortfolioById(id: string, userId: string) {
    return prisma.portfolio.findFirst({
      where: { id, userId },
      include: { holdings: true }
    });
  }

  async addHolding(
    portfolioId: string,
    symbol: string,
    quantity: number,
    averageCost: number
  ) {
    return prisma.holding.create({
      data: {
        portfolioId,
        symbol: symbol.toUpperCase(),
        quantity,
        averageCost
      }
    });
  }

  async removeHolding(id: string, portfolioId: string) {
    return prisma.holding.deleteMany({
      where: { id, portfolioId }
    });
  }
}

export const portfolioRepository = new PortfolioRepository();
