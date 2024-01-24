require('dotenv').config();
const {test, expect} = require('playwright/test');

const {HomePage} = require('../pageobjects/HomePage');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DocumentPage} = require('../pageobjects/DocumentPage');
const {MailPage} = require('../pageobjects/MailPage');

  test.only('Login To Mail', async ({browser}) => 
  {
    
    let data;

    console.log('Before hook started');
    data = await import('../utils/example.json');
    console.log('Fixture loaded:', data);
    console.log('Before hook completed');

    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const mailPage = new MailPage(page);
    const documentPage = new DocumentPage(page);

    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

   

    // Open site and login
   
    await loginPage.validLogin(username, password);
  
    await page.waitForTimeout(2000); 
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
    await page.waitForTimeout(9000)

    await mailPage.fillEmailField(data.email);
    await mailPage.getSubjectField.type(data.mailtext);
    await page.waitForTimeout(3000)
    expect(await mailPage.getAttachment.isVisible()).toBe(true);
    await mailPage.getMailSendButton.click();

    // Check mail is received
    await page.waitForTimeout(9000)
    await mailPage.getRefreshMail.click();
    await mailPage.getRefreshMail.click();
    await mailPage.getMailTitle.click();
    await page.waitForTimeout(3000)
    expect(await mailPage.getAttachment.isVisible()).toBe(true);
    await page.waitForTimeout(5000)
    await mailPage.getAttachment.hover();
    await mailPage.getAttachmentArrow.click();
    await mailPage.getSaveLink.click();
    await mailPage.getDocumentFolder.click();
    await page.waitForTimeout(2000);
    await mailPage.getSaveButton.click();

    // Check mail is saved in documents
    await page.waitForTimeout(2000);
    await documentPage.getDocumentTab.click();
    await page.waitForTimeout(2000);
    expect(await documentPage.getSavedDocument.isVisible()).toBe(true);
    await page.waitForTimeout(5000);

    await documentPage.dragAndDropDocument();
    await documentPage.getCheckBoxAll.click();
    await page.waitForTimeout(5000);
    await documentPage.dragAndDrop();
    await page.waitForTimeout(2000);
    expect(await documentPage.getEmptyDocumentText.isVisible()).toBe(true);

    // Check document is in trash
    await page.waitForTimeout(2000);
    await documentPage.getTrash.click();
    await page.waitForTimeout(3000);
    expect(await documentPage.getDocument.isVisible()).toBe(true);
    expect(await documentPage.getSavedDocument.isVisible()).toBe(true);
    await documentPage.getCheckBoxAll.click();
    await documentPage.getDeleteLink.click();
    await documentPage.getConfirmDeleteBtn.click();
    await page.waitForTimeout(3000)
    expect(await documentPage.getEmptyDocumentText.isVisible()).toBe(true);

    // Delete received mail in mailbox
    await mailPage.getMailIcon.click();
    await mailPage.getDeleteIcon.click();
    await page.waitForTimeout(3000)

    expect(await mailPage.getEmptyMailText.isVisible()).toBe(true);

    // Close the browser
    await browser.close();
  });

