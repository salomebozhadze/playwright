require('dotenv').config();
const {test, expect} = require('playwright/test');

const {HomePage} = require('../pageobjects/HomePage');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DocumentPage} = require('../pageobjects/DocumentPage');
const {MailPage} = require('../pageobjects/MailPage');

  /**
   * There is no need to use `only` when you have a single test. 
   * 
   * This would make sense if you would have several tests in file.
   * But take into consideration next [option](https://playwright.dev/docs/api/class-testconfig#test-config-forbid-only) in config.
   * This helps to avoid situation when you forget to remove `only`
   */
  test.only('Login To Mail', async ({browser}) => 
  {
    
    let data;

    console.log('Before hook started');
    data = await import('../utils/example.json');
    /**
     * Its better to use `JSON.stringify(data,null," ")` instead simple `data`,
     * since you're having `[Object null: prototype]...` in logs
     */
    console.log('Fixture loaded:', JSON.stringify(data,null," "));
    console.log('Before hook completed');

    /**
     * `context` and `browser` usually no need to invoke and create,
     * since you can get `page` from destructing `test` variable.
     * See example [here](https://playwright.dev/docs/writing-tests#first-test)
     */
    const context = await browser.newContext();
    const page = await context.newPage();

    /**
     * creation of page object can be setup in [hooks](https://playwright.dev/docs/writing-tests#using-test-hooks)
     * this will make tests more clear since we're going to have logic of test only
     */
    const loginPage = new LoginPage(page);
    const mailPage = new MailPage(page);
    const documentPage = new DocumentPage(page);


    /**
     * Invocation of environmental variables better to move to [test-use-option](https://playwright.dev/docs/test-use-options) 
     * or in separate function in `utils`. 
     */
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

   

    // Open site and login
   
    await loginPage.validLogin(username, password);
    
    /**
     * It's better not use `waitForTimeout` without urgent need. Sometimes, it can be useful to emulate delay,
     * but overall if you'd like to wait for some element state - use `page.waitForLocator` method
     */
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
    /**
     * In async assertions - it's better to "await" `expect` rather 
     * than await for some state inside `expect`.
     * See example here - https://playwright.dev/docs/test-assertions#introduction
     */
    expect(await mailPage.getAttachment.isVisible()).toBe(true);
    await mailPage.getMailSendButton.click();

    // Check mail is received
    await page.waitForTimeout(9000)
    await mailPage.getRefreshMail.click();
    await mailPage.getRefreshMail.click();
    await mailPage.getMailTitle.click();
    await page.waitForTimeout(3000)
    /**
     * It's usually nice to have custom assertion message in `expect`, 
     * which will indicate more concise error message.
     * See example here https://playwright.dev/docs/test-assertions#custom-expect-message 
     */
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

    /**
     * There is no need at all to use `browser` instance at all inside `test` object
     * since Playwright Test handles browser termination  automatically 
     */
    // Close the browser
    await browser.close();
  });

