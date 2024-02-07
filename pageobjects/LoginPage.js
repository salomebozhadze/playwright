const {test, expect} = require('@playwright/test');


class LoginPage {

    constructor(page) {
      this.page = page;
    }
  
    async validLogin(username, password) {
      /**
       * There is no need to use `await` for page.locator invocations.
       * See this article regarding usage of locators: https://playwright.dev/docs/handles#locator-vs-elementhandle
       */
      const signInButton = await this.page.locator('#signin');
      const emailField = await this.page.locator('#UserID');
      const passwordField = await this.page.locator('#Password');
      const loginButton = await this.page.locator('.btn');
  
      await this.page.goto('https://mailfence.com/');
      await signInButton.click();
      await emailField.fill(username);
      await passwordField.fill(password);
      await loginButton.click();
    }
  
  }
  
  module.exports = {LoginPage};
  