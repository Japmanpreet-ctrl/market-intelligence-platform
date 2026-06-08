import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AdminHomePage from "../app/page";
import { ThemeProvider } from "../components/shell/theme-provider";

describe("admin home page", () => {
  it("renders the foundation heading", () => {
    render(
      <ThemeProvider>
        <AdminHomePage />
      </ThemeProvider>
    );

    expect(screen.getByRole("heading", { name: "Admin Foundation" })).toBeInTheDocument();
  });
});
