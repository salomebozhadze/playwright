const path = require('path');
const { test, expect } = require('@playwright/test');
const { generateTestFile, deleteFile } = require('../utils/fileGenerator');

const { LoginPage } = require('../pageobjects/LoginPage');
const getCredentials = require('../helper/environment');
const { MailPage } = require('../pageobjects/MailPage');
const { DocumentPage } = require('../pageobjects/DocumentPage');

let loginPage, mailPage, documentPage;
let username, password;

test.beforeEach(async ({ page }) => {
  ({ username, password } = getCredentials());

  loginPage = new LoginPage(page);
  mailPage = new MailPage(page);
  documentPage = new DocumentPage(page);

  await loginPage.login(username, password);
});

test('Send generated .exe file and verify download', async ({ page }) => {
  const { filename, filePath } = generateTestFile();

  await mailPage.sendMailToSelf(username, filePath);
  await mailPage.openReceivedEmail(filename);
  await mailPage.saveToDocuments();

  await documentPage.deleteIncomeEmails();

  deleteFile(filePath);
  deleteFile(`downloads/${filename}`);
});