import { expect } from '@playwright/test';

class DocumentPage {
  constructor(page) {
    this.page = page;
    this.inboxPage = page.getByRole('link', { name: /Inbox/i });
    this.markAllCheckbox = page.locator('[role="checkbox"]');
    this.deleteButton = page.locator('[aria-label="Delete"][role="button"]');
  }

  async deleteIncomeEmails() {
    await this.inboxPage.click();
    await this.markAllCheckbox.first().click();
    await this.deleteButton.click();
    await this.page.waitForTimeout(2000);
    await expect(this.page.locator('div.aRv').first()).toHaveText('Your Primary tab is empty.');
  }
}

module.exports = { DocumentPage };