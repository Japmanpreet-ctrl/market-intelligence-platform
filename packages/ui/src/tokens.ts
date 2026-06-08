export interface DesignTokens {
  colors: {
    background: string;
    foreground: string;
    surface: string;
    surfaceElevated: string;
    primary: string;
    danger: string;
    success: string;
    warning: string;
    muted: string;
    border: string;
  };
  spacing: Record<string, string>;
  typography: {
    fontSans: string;
    fontMono: string;
    baseSize: string;
    lineHeight: string;
  };
  radius: Record<string, string>;
  elevation: Record<string, string>;
  motion: Record<string, string>;
  zIndex: Record<string, number>;
  breakpoints: Record<string, string>;
}

export const designTokens: DesignTokens = {
  colors: {
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    surface: "hsl(var(--card))",
    surfaceElevated: "hsl(var(--surface-elevated))",
    primary: "hsl(var(--primary))",
    danger: "hsl(var(--danger))",
    success: "hsl(var(--success))",
    warning: "hsl(var(--warning))",
    muted: "hsl(var(--muted))",
    border: "hsl(var(--border))"
  },
  spacing: {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    6: "1.5rem",
    8: "2rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem"
  },
  typography: {
    fontSans: "Inter, ui-sans-serif, system-ui, sans-serif",
    fontMono: "ui-monospace, SFMono-Regular, Menlo, monospace",
    baseSize: "16px",
    lineHeight: "1.5"
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px"
  },
  elevation: {
    0: "none",
    1: "0 1px 2px hsl(220 30% 5% / 0.06)",
    2: "0 10px 30px hsl(220 30% 5% / 0.08)",
    3: "0 22px 70px hsl(220 30% 5% / 0.12)"
  },
  motion: {
    fast: "120ms ease",
    base: "180ms ease",
    slow: "260ms ease"
  },
  zIndex: {
    base: 0,
    sticky: 20,
    overlay: 40,
    modal: 50,
    toast: 60
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  }
};
