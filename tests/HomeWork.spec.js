import dotenv from 'dotenv';
dotenv.config(); // Load .env immediately and FIRST

import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pageobjects/LoginPage');
const getCredentials = require('../utils/environment');
const { MailPage } = require('../pageobjects/MailPage');
const { DocumentPage } = require('../pageobjects/DocumentPage');
import data from '../utils/example.json' assert { type: 'json' };


let loginPage, mailPage, documentPage;
let username, password; 


test.beforeEach(async ({ page }) => {
  ({ username, password } = getCredentials());

  loginPage = new LoginPage(page);
  mailPage = new MailPage(page);
  documentPage = new DocumentPage(page);

  console.log('Before hook started');
  console.log('Fixture loaded:', JSON.stringify(data, null, " "));
  console.log('Before hook completed');

  await loginPage.login(username, password);

});

test('Send file to self and move to Trash', async ({ page }) => {

  await mailPage.sendMailToSelf(username, './utils/example.txt');
  await mailPage.openReceivedEmail('Test Email with Attachment');
  await mailPage.saveToDocuments();

  await documentPage.deleteIncomeEmails();

});

test.afterEach(async ({page}) => {
  await documentPage.clearTrash();

})