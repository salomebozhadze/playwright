const { expect } = require('playwright');

class MailPage {
    constructor(page) {
      this.page = page;

      // Define locators
      this.getSuggestEmail = page.locator('.GCSDBRWBCM > a');
      this.getSubjectField = page.locator('#mailSubject');
      this.getAttachment = page.locator('text=example.txt');
      this.getMailSendButton = page.locator('#mailSend');
      this.getRefreshMail = page.locator('[title="Refresh"]');
      this.getMailTitle = page.locator('div.listSubject');
      this.getAttachmentArrow = page.locator('.GCSDBRWBN a b');
      this.getSaveLink = page.locator("xpath=.//span[text()='Save in Documents']");
      this.getDocumentFolder = page.locator("xpath=.//div[text()='My documents']");
      this.getSaveButton = page.locator('#dialBtn_OK');
      this.getMailIcon = page.locator('.icon24-Message');
      this.getDeleteIcon = page.locator('[title="To Trash"]');
      this.getEmptyMailText = page.locator('text=Your inbox is empty');
    }

    async fillEmailField(email) {
      const emailField = this.page.locator('#mailTo > .GCSDBRWBPL');
      
      // Wait for the email field to be visible
      await emailField.waitFor();
      
      // Fill the email field
      await emailField.fill(email);
    }
}

module.exports = { MailPage };
