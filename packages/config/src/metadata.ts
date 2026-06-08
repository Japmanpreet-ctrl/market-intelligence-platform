export interface AppMetadata {
  name: string;
  description: string;
}

export interface AppConstants {
  repositoryName: string;
  productionTarget: "vercel";
  supportEmail: string;
}

export const appMetadata: AppMetadata = {
  name: "Market Intelligence Platform",
  description: "Production MVP Foundation"
};

export const adminMetadata: AppMetadata = {
  name: "Admin Foundation",
  description: "Market Intelligence Platform admin foundation"
};

export const appConstants: AppConstants = {
  repositoryName: "market-intelligence-platform",
  productionTarget: "vercel",
  supportEmail: "support@example.com"
};
