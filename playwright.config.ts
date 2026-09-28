import { defineConfig } from '@playwright/test';
import process from 'node:process';

const base = process.env.BASE_PATH || '/';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: { baseURL: `http://127.0.0.1:4331${base}`, browserName: 'chromium' },
  webServer: {
    command: 'npm run preview -- --port 4331 --ignore-lock',
    url: `http://127.0.0.1:4331${base}`,
    reuseExistingServer: false,
  },
});
