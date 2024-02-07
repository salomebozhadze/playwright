// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const config = {

  testDir: './tests',
  /**
   * if you'd like to remain long test timeout - better to bind on
   * some environmental variable like DEBUG, if DEBUG=1 (for example) - 
   * you're going to have 500 seconds timeout but not 50.
   * 
   * Example: `timeout: process.env.DEBUG ? 50 * 10000 : 50 * 1000`
   */
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

