const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    headless: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
  fullyParallel: true,
  workers: 2,
});
