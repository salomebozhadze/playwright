// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const config = {

  testDir: './tests',
  timeout: 50 * 10000,
 
  expect:{
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on',
  }

 
};

module.exports = config;

