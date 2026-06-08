import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import HomePage from "../app/page";
import { ThemeProvider } from "../components/shell/theme-provider";

vi.mock("@repo/market-data", () => ({
  assetRepository: {
    getAssetCountByType: vi.fn().mockResolvedValue({ stock: 50, crypto: 50 })
  },
  courseRepository: {
    getCourses: vi
      .fn()
      .mockResolvedValue([{ id: 1, title: "Course", description: "", modules: [] }])
  },
  economicCalendarRepository: {
    getUpcomingEvents: vi.fn().mockResolvedValue([])
  }
}));

describe("web home page", () => {
  it("renders the foundation heading", async () => {
    // Next.js async server component testing workaround
    const ResolvedHome = await HomePage();

    render(<ThemeProvider>{ResolvedHome}</ThemeProvider>);

    expect(
      screen.getByRole("heading", { name: "AI-Powered Market Intelligence Platform" })
    ).toBeInTheDocument();
    expect(screen.getByText("Everything you need to succeed")).toBeInTheDocument();
  });
});
