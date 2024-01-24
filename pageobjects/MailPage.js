const {expect} = require('playwright');

class MailPage {
    constructor(page) {
      this.page = page;

      this.getSuggestEmail = page.locator('.GCSDBRWBCM > a');
      this.getSubjectField = page.locator('#mailSubject');
      this.getAttachment = page.locator('text=example.txt');
      this.getMailSendButton = page.locator('#mailSend', { state: 'visible', timeout: 5000 });
      this.getRefreshMail = page.locator('[title="Refresh"]', { state: 'visible', timeout: 5000 });
      this.getMailTitle = page.locator('div.listSubject');
      this.getAttachmentArrow = page.locator('.GCSDBRWBN a b');
      this.getSaveLink = page.locator("xpath=.//span[text()='Save in Documents']");
      this.getDocumentFolder = page.locator("xpath=.//div[text()='My documents']");
      this.getSaveButton = page.locator('#dialBtn_OK', { timeout: 5000 });
      this.getMailIcon = page.locator('.icon24-Message');
      this.getDeleteIcon = page.locator('[title="To Trash"]');
      this.getEmptyMailText = page.locator('text=Your inbox is empty');


    }

    async fillEmailField(email) {
      const emailField = await this.page.locator('#mailTo > .GCSDBRWBPL');

      await emailField.fill(email);
    
    }


  }
  
  module.exports = {MailPage};
  