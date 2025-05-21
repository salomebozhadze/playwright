class MailPage {
  constructor(page) {
    this.page = page;
    this.composeBtn = page.getByRole('button', { name: 'Compose' });
    this.toField = page.locator('input[aria-label="To recipients"]');
    this.subjectField = page.locator('input[name="subjectbox"]');
    this.attachmentInput = page.locator('input[type="file"]:not([disabled])');
    this.sendBtn = page.locator('div[role="button"][aria-label^="Send"]').first();
    this.attachment = page.locator('span.aV3', { hasText: 'example.txt' }).first();
    this.emailRow = this.page.locator('tr[role="row"]', {
      hasText: 'Test Email with Attachment'
    }).first();
    this.downloadedButton = this.page.getByRole('button', { name: 'Download attachment example.txt' })
  }

  async sendMailToSelf(email, filePath) {
    await this.composeBtn.click();
    await this.toField.fill(email);
    await this.subjectField.fill('Test Email with Attachment');
    await this.attachmentInput.setInputFiles(filePath);
    await this.page.waitForTimeout(3000);
    await this.sendBtn.click();
    await this.page.waitForTimeout(3000);

  }

  async openReceivedEmail() {
  await this.emailRow.waitFor({ state: 'visible', timeout: 10000 });
  await this.emailRow.click();
  await this.attachment.hover();   
  await this.downloadedButton.click()
}


  async saveToDocuments() {
        const [download] = await Promise.all([
          await this.page.waitForEvent('download'),
          await this.downloadedButton.click()       
        ]);

        // Save to a specific path (optional)
        const suggestedFilename = download.suggestedFilename();
        await download.saveAs(`downloads/${suggestedFilename}`);

        // Check if the file exists (Node.js fs)
        const fs = require('fs');
        const filePath = `downloads/${suggestedFilename}`;

        if (fs.existsSync(filePath)) {
          console.log('✅ File was downloaded:', filePath);
        } 
  }
}

module.exports = { MailPage };