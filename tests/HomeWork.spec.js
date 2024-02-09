const { test, expect } = require('playwright/test');
const getCredentials = require('../utils/environment');
const { LoginPage } = require('../pageobjects/LoginPage');
const { MailPage } = require('../pageobjects/MailPage');
const { DocumentPage } = require('../pageobjects/DocumentPage');

let loginPage, mailPage, documentPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  mailPage = new MailPage(page);
  documentPage = new DocumentPage(page);
});

test('Login To Mail', async ({ page }) => {
  let data;

  console.log('Before hook started');
  data = await import('../utils/example.json');
  console.log('Fixture loaded:', JSON.stringify(data, null, " "));
  console.log('Before hook completed');

  const { username, password } = getCredentials();
  
  // Open site and login using page objects
  await loginPage.validLogin(username, password);

  // Navigate to the document page
  await documentPage.clickDocumentTab();

  // Attach the file to the file input element
  await page.setInputFiles('#blank_new_doc input', {
    name: data.fileName,
    mimeType: 'text/plain',
    buffer: Buffer.from(data.fileContent),
  });

  // Send file by mail
  await documentPage.getUploadDocumentCheckBox.click();
  await documentPage.getMoreLinks.click();
  await documentPage.getSendLink.hover();
  await documentPage.getSendEmailLink.click();

  // Fill email field and send mail
  await mailPage.fillEmailField(data.email);
  await mailPage.getSubjectField.type(data.mailtext);
  await expect(mailPage.getAttachment, 'Attachment should be Visible').toBeVisible();
  await mailPage.getMailSendButton.click();

  // Check mail is received
  await page.waitForTimeout(9000);
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

  // Check mail is saved in documents
  await documentPage.getDocumentTab.click();
  await page.waitForTimeout(2000);
  await expect(documentPage.getSavedDocument, 'SavedDocument should be Visible').toBeVisible();
  await page.waitForTimeout(5000);

  // Drag and drop document
  await documentPage.dragAndDropDocument();
  await documentPage.getCheckBoxAll.click();
  await page.waitForTimeout(5000);
  await documentPage.dragAndDrop();
  await page.waitForTimeout(2000);
  await expect(documentPage.getEmptyDocumentText, 'Empty Document Text should be Visible').toBeVisible();

  // Check document is in trash
  await page.waitForTimeout(2000);
  await documentPage.getTrash.click();
  await page.waitForTimeout(3000);
  await expect(documentPage.getDocument, 'Document should be Visible').toBeVisible();
  await expect(documentPage.getSavedDocument, 'Saved Document should be Visible').toBeVisible();
  await documentPage.getCheckBoxAll.click();
  await documentPage.getDeleteLink.click();
  await documentPage.getConfirmDeleteBtn.click();
  await page.waitForTimeout(3000);
  await expect(documentPage.getEmptyDocumentText, 'Empty Document Text should be Visible').toBeVisible();

  // Delete received mail in mailbox
  await mailPage.getMailIcon.click();
  await mailPage.getDeleteIcon.click();
  await page.waitForTimeout(3000);

  await expect(mailPage.getEmptyMailText, 'Empty Mail Text should be Visible').toBeVisible();
});
