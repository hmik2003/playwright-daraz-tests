import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  timeout: 90_000,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['github'],
  ],
  use: {
    baseURL: 'https://www.daraz.pk',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: 'en-PK',
    timezoneId: 'Asia/Karachi',
    extraHTTPHeaders: {
      'Accept-Language': 'en-PK,en;q=0.9',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
