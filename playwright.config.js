// @ts-check
const { defineConfig, devices } = require('@playwright/test');
import 'dotenv/config';

const config = {

  testDir: './tests',
  timeout: process.env.DEBUG ? 50 * 10000 : 100 * 1000,
 
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

