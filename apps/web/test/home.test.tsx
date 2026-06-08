import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";
import { ThemeProvider } from "../components/shell/theme-provider";

describe("web home page", () => {
  it("renders the foundation heading", () => {
    render(
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    );

    expect(
      screen.getByRole("heading", { name: "Market Intelligence Platform" })
    ).toBeInTheDocument();
    expect(screen.getByText("Production MVP Foundation")).toBeInTheDocument();
  });
});
