import { prisma } from "@repo/database";
import type { Impact } from "@repo/database";

export interface EventFilters {
  country?: string;
  impact?: Impact;
  fromDate?: Date;
  toDate?: Date;
}

export class EconomicCalendarRepository {
  async getUpcomingEvents(filters: EventFilters = {}, limit = 50) {
    const where: Record<string, unknown> = {};

    if (filters.country) {
      where.country = filters.country;
    }

    if (filters.impact) {
      where.impact = filters.impact;
    }

    if (filters.fromDate || filters.toDate) {
      const dateFilter: Record<string, Date> = {};
      if (filters.fromDate) dateFilter.gte = filters.fromDate;
      if (filters.toDate) dateFilter.lte = filters.toDate;
      where.eventDate = dateFilter;
    }

    return prisma.economicEvent.findMany({
      where,
      orderBy: { eventDate: "asc" },
      take: limit
    });
  }

  async getEventsByCountry(country: string) {
    return prisma.economicEvent.findMany({
      where: { country },
      orderBy: { eventDate: "asc" }
    });
  }

  async getDistinctCountries(): Promise<string[]> {
    const results = await prisma.economicEvent.findMany({
      where: { country: { not: null } },
      select: { country: true },
      distinct: ["country"],
      orderBy: { country: "asc" }
    });

    return results.map((r) => r.country).filter(Boolean) as string[];
  }

  async getUpcomingCount(): Promise<number> {
    return prisma.economicEvent.count({
      where: { eventDate: { gte: new Date() } }
    });
  }
}

export const economicCalendarRepository = new EconomicCalendarRepository();
