const { generateFakeName } = require('../helper/fakeData');
const name = generateFakeName();

class MailPage {
  constructor(page) {
    this.page = page;
    this.composeBtn = page.getByRole('button', { name: 'Compose' });
    this.toField = page.locator('input[aria-label="To recipients"]');
    this.subjectField = page.locator('input[name="subjectbox"]');
    this.attachmentInput = page.locator('input[type="file"]:not([disabled])');
    this.sendBtn = page.locator('div[role="button"][aria-label^="Send"]').first();
    this.emailRow = this.page.locator('tr[role="row"]', {
      hasText: name
    }).first();
  }

  async sendMailToSelf(email, filePath) {
    await this.composeBtn.click();
    await this.toField.fill(email);
    await this.subjectField.fill(name);
    await this.attachmentInput.setInputFiles(filePath);
    await this.page.waitForTimeout(3000);
    await this.sendBtn.click();
    await this.page.waitForTimeout(3000);
  }

  async openReceivedEmail(filename) {
    await this.emailRow.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailRow.click();
    this.attachment = this.page.locator('span.aV3', { hasText: filename }).first();
    this.downloadedButton = this.page.getByRole('button', {
      name: `Download attachment ${filename}`
    });

    await this.attachment.hover();
    await this.downloadedButton.click();
  }

  async saveToDocuments() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadedButton.click()
    ]);

    const suggestedFilename = download.suggestedFilename();
    const filePath = `downloads/${suggestedFilename}`;
    await download.saveAs(filePath);

    const fs = require('fs');
    if (fs.existsSync(filePath)) {
      console.log('✅ File was downloaded:', filePath);
    }
  }
}

module.exports = { MailPage };