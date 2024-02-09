const { test, expect } = require('@playwright/test');

class DocumentPage {
  constructor(page) {
    this.page = page;
    this.timeout = 8000;

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

    // Function to wait for locator
    this.waitForLocatorWithOptions = async (locator, options) => {
      return await locator.waitFor({ state: 'visible', timeout: this.timeout, ...options });
    };
  }

  async clickDocumentTab() {
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
