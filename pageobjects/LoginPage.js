const { test, expect } = require('@playwright/test');

class LoginPage {

  /**
     * Creates an instance of DocumentPage.
     * @param {import('@playwright/test').Page} page - The Playwright page object.
     */

    constructor(page) {
      this.page = page;
      this.timeout = 5000;
      this.signInButton = this.page.locator('#signin');
      this.emailField = this.page.locator('#UserID');
      this.passwordField = this.page.locator('#Password');
      this.loginButton = this.page.locator('.btn');
    }
  
     /**
     * Login on site
     * @returns {Promise<void>}
     */
    async validLogin(username, password) {
      // Navigate to the login page
      await this.page.goto('https://mailfence.com/');
      
      // Wait for the sign-in button to be visible
      await this.signInButton.waitFor({ state: 'visible', timeout: this.timeout });
      
      // Click on the sign-in button
      await this.signInButton.click();
      
      // Wait for the email field to be visible
      await this.emailField.waitFor({ state: 'visible', timeout: this.timeout });
      
      // Fill the email field
      await this.emailField.fill(username);
            
      await this.passwordField.focus();
      // Fill the password field
      await this.passwordField.fill(password);
      
      // Wait for the login button to be visible
      await this.loginButton.waitFor({ state: 'visible', timeout: this.timeout });
      
      // Click on the login button
      await this.loginButton.click();
    }
  
}

module.exports = { LoginPage };
