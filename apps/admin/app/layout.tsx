import type { Metadata } from "next";
import type { ReactNode } from "react";
import { adminMetadata } from "@repo/config";

import { ThemeProvider } from "../components/shell/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: adminMetadata.name,
  description: adminMetadata.description
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
