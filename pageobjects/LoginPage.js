class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('input[type="email"]');
    this.passwordField = page.getByLabel('Enter your password');;
    this.nextBtn = page.getByRole('button', { name: 'Next' });
  }

  async login(username, password) {
    await this.page.goto('https://mail.google.com/');
    await this.emailField.fill(username);
    await this.nextBtn.click();
    await this.passwordField.waitFor();
    await this.passwordField.fill(password);
    await this.nextBtn.click();
  }
}

module.exports = { LoginPage };