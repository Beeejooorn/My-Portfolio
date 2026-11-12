import { defineConfig } from "@playwright/test";
import base from "./playwright.config";
export default defineConfig({
  ...base,
  testMatch: [
    "**/homepage.spec.ts",
    "**/selected-work.spec.ts",
    "**/foundation.spec.ts",
    "**/shared-ui.spec.ts",
  ],
  use: {
    ...base.use,
    baseURL: "http://127.0.0.1:4174",
    ...(process.env.M4_BROWSER_PATH
      ? {
          channel: undefined,
          launchOptions: { executablePath: process.env.M4_BROWSER_PATH },
        }
      : {}),
  },
  webServer: {
    command: "npm run preview",
    url: "http://127.0.0.1:4174",
    env: { PORTFOLIO_PREVIEW_PORT: "4174" },
    reuseExistingServer: false,
  },
});
