class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('input[type="email"]');
    this.passwordField = page.locator('input[type="password"]');
    this.nextBtn = page.locator('button[type="button"]');
  }

  async login(username, password) {
    await this.page.goto('/');
    await this.emailField.fill(username);
    await this.nextBtn.nth(2).click();
    await this.passwordField.nth(0).waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordField.nth(0).fill(password);
    await this.nextBtn.nth(1).click();
  }
}

module.exports = { LoginPage };