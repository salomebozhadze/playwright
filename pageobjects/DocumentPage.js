const { test, expect } = require('@playwright/test');

class DocumentPage {
  constructor(page) {
    this.page = page;
    this.timeout = 8000;

    /**
     * It's good that you put initialization of locators in constructor, 
     * but sometimes there can be too much to initialize (4 and more properties).
     * 
     * I suggest you to use [Page Element](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/#page-component-objects) 
     * pattern in order to extract some of the parts of complex page.
     */
    // Define locators
    this.getDocumentTab = page.locator('.icon24-Documents');
    this.getUploadDocumentCheckBox = page.locator('.checkIcon');
    this.getMoreLinks = page.locator('#toolbar_more div');
    this.getSendLink = page.locator('text=Send');
    this.getSendEmailLink = page.locator('text=Send by e-mail');
    this.getDocument = page.locator("text=example.txt");
    this.getTrash = page.locator('#doc_tree_trash');
    this.getSavedDocument = page.locator("text=example_1.txt");
    this.getEmptyDocumentText = page.locator('text=There are no documents in this folder yet');
    this.getCheckBoxAll = page.locator('.icon.icon-checkb');
    this.getDeleteLink = page.locator("xpath=.//div[text()='Delete']");
    this.getConfirmDeleteBtn = page.locator('#dialBtn_YES > .btnCtn');
    this.trash = page.locator('#doc_tree_trash');
    this.table = page.locator("xpath=//table[contains(@class, 'GCSDBRWBBU')]");

    // note: if this method used only in `DocumentPage` - you can make it private in this class
    // Function to wait for locator
    this.waitForLocatorWithOptions = async (locator, options) => {
      return await locator.waitFor({ state: 'visible', timeout: this.timeout, ...options });
    };
  }

  async clickDocumentTab() {
    // note: Playwright has a nice API for indicating test steps  - https://playwright.dev/docs/api/class-test#test-step
    // So you can wrap all the comments into latter method which will be revealed in test report. 

    // Wait for the document tab to be visible
    await this.waitForLocatorWithOptions(this.getDocumentTab);

    // Click on the document tab
    await this.getDocumentTab.click();
  }

  async visibleDocument() {
    // Wait for the document to be visible
    await this.waitForLocatorWithOptions(this.getDocument);
    
    // Assert the document is visible
    expect(await this.getDocument.isVisible()).toBe(true);
  }

  async dragAndDrop() {
    // Perform drag and drop action
    await this.getSavedDocument.dragTo(this.trash);
  }

  async dragAndDropDocument() {
    // Perform drag and drop action
    await this.getDocument.dragTo(this.trash);
  }

  async dragAndDropSavedDocument() {
    // Perform drag and drop action
    await this.getSavedDocument.dragTo(this.trash);
  }
}

module.exports = { DocumentPage };
