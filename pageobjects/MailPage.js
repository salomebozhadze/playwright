const {test, expect} = require('@playwright/test');

class MailPage {
  /**
     * Creates an instance of DocumentPage.
     * @param {import('@playwright/test').Page} page - The Playwright page object.
     */


    constructor(page) {
      this.page = page;
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

     /**
     * Fill email field
     * @returns {Promise<void>}
     */
    async fillEmailField(email) {
      const emailField = this.page.locator('#mailTo > .GCSDBRWBPL');
      
      // Wait for the email field to be visible
      await emailField.waitFor();
      
      // Fill the email field
      await emailField.fill(email);
    }

    /**
     * Check Attachment is visible
     * @returns {Promise<void>}
     */
    async visibleAttachment() {
      const attachment = this.page.locator('text=example.txt');
      // await attachment.waitFor({ state: 'visible', timeout: this.timeout });
      await expect(attachment, 'Attachment should be Visible').toBeVisible();
  
    }

    /**
     * Click save button
     * @returns {Promise<void>}
     */
    async clickSaveButton() {
      const saveButton = this.page.locator('#dialBtn_OK');
      await saveButton.waitFor({ state: 'visible', timeout: 5000 });
      await expect(saveButton, 'button should be Visible').toBeVisible();
      await saveButton.click();
  
    }

}

module.exports = { MailPage };
