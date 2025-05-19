import { expect } from '@playwright/test';

class DocumentPage {
  constructor(page) {
    this.page = page;
    this.inboxPage = page.getByRole('link', { name: /Inbox/i });
    this.markAllCheckbox = page.locator('[role="checkbox"]');
    this.deleteButton = page.locator('[aria-label="Delete"][role="button"]');
    this.trash = page.locator('a[aria-label="Trash"]');
    this.cleanTrash = page.locator('div.Bn', { hasText: 'Delete forever' });
    this.more = page.locator('span[role="button"][aria-label="More labels"]').first();
    this.messageLocator = page.getByText('No conversations in Trash.');
  }

  async deleteIncomeEmails() {
    await this.inboxPage.click();
    await this.markAllCheckbox.first().click();
    await this.deleteButton.click();
    await this.page.waitForTimeout(2000);
    await expect(this.page.locator('div.aRv').first()).toHaveText('Your Primary tab is empty.');
  }

  async clearTrash(){
    await this.more.click();
    await this.trash.click();
    await this.markAllCheckbox.nth(1).click();
    await this.cleanTrash.click();
    await expect(this.messageLocator).toBeVisible();

  }
}

module.exports = { DocumentPage };