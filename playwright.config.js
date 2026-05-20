const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  fullyParallel: true,
  workers: '50%',
});
