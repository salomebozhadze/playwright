const { test, expect } = require('playwright/test');
const getCredentials = require('../utils/environment');
const { LoginPage } = require('../pageobjects/LoginPage');
const { MailPage } = require('../pageobjects/MailPage');
const { DocumentPage } = require('../pageobjects/DocumentPage');

let loginPage, mailPage, documentPage, data;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  mailPage = new MailPage(page);
  documentPage = new DocumentPage(page);

  console.log('Before hook started');
  data = await import('../utils/example.json');
  console.log('Fixture loaded:', JSON.stringify(data, null, " "));
  console.log('Before hook completed');

  const { username, password } = getCredentials();
  await loginPage.validLogin(username, password);

  if (!(await mailPage.getEmptyMailText.isVisible())) {
    await documentPage.clickCheckBoxAll();
    await mailPage.getDeleteIcon.click();
    await page.waitForTimeout(3000);
    await expect(mailPage.getEmptyMailText, 'Empty Mail Text should be Visible').toBeVisible();
  } else {
    console.log("No mail to delete, inbox is empty.");
  }


});

test('Login To Mail', async ({ page }) => {
  await test.step('Navigate to the document page', async () => 
  {
    await documentPage.clickDocumentTab();
    if (await documentPage.getDocument.isVisible()) {
      await documentPage.clickCheckBoxAll();
      await documentPage.clickDeleteLink();
      await page.waitForTimeout(3000);
      await documentPage.visibleEmptyDocumentText();
    } else {
      console.log("No mail to delete, inbox is empty.");
    }
  
  
    await page.setInputFiles('#blank_new_doc input', {
      name: data.fileName,
      mimeType: 'text/plain',
      buffer: Buffer.from(data.fileContent),
    }); 
  });
  
  await test.step('Send file by mail', async () => 
  {
    await documentPage.clickUploadDocumentCheckBox();
    await documentPage.clickMoreLinks();
    await documentPage.getSendLinkover();
    await documentPage.clickSendEmailLink();
  });

  await test.step('Fill email field and send mail', async () => 
  {
    await mailPage.fillEmailField(data.email);
    await mailPage.getSubjectField.type(data.mailtext);
    await expect(mailPage.getAttachment, 'Attachment should be Visible').toBeVisible();
    await mailPage.getMailSendButton.click();
  });


  await test.step('Check mail is received', async () => 
  {
    await page.waitForTimeout(6000);
    await mailPage.getRefreshMail.click();
    await mailPage.getRefreshMail.click();
    await mailPage.getMailTitle.click();
    await page.waitForTimeout(3000);
    await expect(mailPage.getAttachment, 'Attachment should be Visible').toBeVisible();
    await mailPage.getAttachment.hover();
    await mailPage.getAttachmentArrow.click();
    await mailPage.getSaveLink.click();
    await mailPage.getDocumentFolder.click();
    await page.waitForTimeout(2000);
    await mailPage.getSaveButton.click();
  });

  await test.step('Check mail is saved in documents', async () => 
  {
    await documentPage.clickDocumentTab();
    await page.waitForTimeout(2000);
    await documentPage.visibleSavedDocument();
    await page.waitForTimeout(5000);
  });

  await test.step('Drag and drop document', async () => 
  {
    await documentPage.dragAndDropDocument();
    await documentPage.clickCheckBoxAll();
    await page.waitForTimeout(5000);
    await documentPage.dragAndDrop();
    await page.waitForTimeout(2000);
    await documentPage.visibleEmptyDocumentText();
  });

  await test.step('Check document is in trash', async () => 
  {
    await page.waitForTimeout(2000);
    await documentPage.clickTrash();
    await page.waitForTimeout(3000);
    await documentPage.visibleDocument();
    await documentPage.visibleSavedDocument();
    await documentPage.clickCheckBoxAll();
    await documentPage.clickDeleteLink();
    await documentPage.clickConfirmDeleteBtn();
    await page.waitForTimeout(3000);
    await documentPage.visibleEmptyDocumentText();
  });

  await test.step('Delete received mail in mailbox', async () => 
  {
    await mailPage.getMailIcon.click();
  await mailPage.getDeleteIcon.click();
  await page.waitForTimeout(3000);

  await expect(mailPage.getEmptyMailText, 'Empty Mail Text should be Visible').toBeVisible();

  });

});
