// Import Playwright config helper and built-in device settings
import { defineConfig, devices } from '@playwright/test';
// Import dotenv to read values from a .env file
import dotenv from 'dotenv';
// Import path to help build file paths safely
import path from 'path';

// Load environment variables from the .env file in the current folder
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Export Playwright configuration so Playwright can use it
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    // Scalability: baseURL allows switching between staging/prod easily
    baseURL: 'https://staging-hub.ezra.com/sign-in/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  // Define which browser and device setup to use
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
