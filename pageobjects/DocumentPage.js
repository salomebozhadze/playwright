const {test, expect} = require('@playwright/test');

class DocumentPage {

  /**
     * Creates an instance of DocumentPage.
     * @param {import('@playwright/test').Page} page - The Playwright page object.
     */

    constructor(page) {
      this.page = page;
      this.timeout = 9000; 
      this.document = page.locator("text=example.txt");
      this.emptyDocumenttext = page.locator('text=There are no documents in this folder yet');
    }

    
       /**
     * Get a document title.
     * @returns {Promise<void>}
     */
    async getDocument() {
        return this.page.locator("text=example.txt").waitFor();
    }



       /**
     * click Document tab at header
     * @returns {Promise<void>}
     */
    async clickDocumentTab() {
      const getDocumentTab = this.page.locator('.icon24-Documents');
      await getDocumentTab.click();
    }

     /**
     * Click upload document checkbox
     * @returns {Promise<void>}
     */
    async clickUploadDocumentCheckBox() {
      const getUploadDocumentCheckBox = this.page.locator('.checkIcon');
      await getUploadDocumentCheckBox.click();
    }


 /**
     * Check all Checkbox
     * @returns {Promise<void>}
     */
    async clickCheckBoxAll() {
      const getCheckBoxAll = this.page.locator(".icon.icon-checkb");
      await getCheckBoxAll.click();
  }

   /**
     * Click more link
     * @returns {Promise<void>}
     */
  async clickMoreLinks() {
    const getMoreLinks = this.page.locator('#toolbar_more div');
    await getMoreLinks.click();
  }

   /**
     * get send link hover
     * @returns {Promise<void>}
     */
  async getSendLinkover() {
    const getSendLink = this.page.locator('text=Send');
    await getSendLink.hover();
  }

  /**
     * Click send email link
     * @returns {Promise<void>}
     */
  async clickSendEmailLink() {
    const getSendEmailLink = this.page.locator('text=Send by e-mail');
    await getSendEmailLink.click();
  }

  /**
     * Click trash link
     * @returns {Promise<void>}
     */
  async clickTrash() {
    const getTrash = this.page.locator('#doc_tree_trash');
    await getTrash.waitFor({ state: 'visible', timeout: this.timeout });
    await getTrash.click();
  }

  /**
     * Click confirm delete link
     * @returns {Promise<void>}
     */
  async clickDeleteLink() {
    const getDeleteLink = this.page.locator("xpath=.//div[text()='Delete']");
    await getDeleteLink.waitFor({ state: 'visible', timeout: this.timeout });
    await getDeleteLink.click();
  }

  /**
     * Click confirm delete button
     * @returns {Promise<void>}
     */
  async clickConfirmDeleteBtn() {
    const getConfirmDeleteBtn = this.page.locator('#dialBtn_YES > .btnCtn');
    await getConfirmDeleteBtn.waitFor({ state: 'visible', timeout: this.timeout });
    await getConfirmDeleteBtn.click();
  }

  /**
     * Checks if a document is visible.
     * @returns {Promise<void>}
     */
    async visibleDocument() {
      const getDocument = this.page.locator("text=example.txt");
      getDocument.waitFor({ state: 'visible', timeout: this.timeout });

      await expect(getDocument).toBeVisible();
    }

    /**
     * Checks if a saved document is visible.
     * @returns {Promise<void>}
     */
    async visibleSavedDocument() {
      const getSavedDocument = this.page.locator("text=example_1.txt");
      getSavedDocument.waitFor({ state: 'visible', timeout: this.timeout });
      await expect(getSavedDocument).toBeVisible();
    }

    /**
     * Checks if an empty document text is visible.
     * @returns {Promise<void>}
     */
    async visibleEmptyDocumentText() {
      const getEmptyDocumentText = this.page.locator('text=There are no documents in this folder yet');
      await getEmptyDocumentText.waitFor({ state: 'visible', timeout: this.timeout });
      await expect(getEmptyDocumentText).toBeVisible();
    }
  
     /**
     * Drag and drop document
     * @returns {Promise<void>}
     */
    async dragAndDrop() {
      const getSavedDocument = this.page.locator("text=example_1.txt");
      await getSavedDocument.waitFor({ state: 'visible', timeout: this.timeout });
      const trash = this.page.locator('#doc_tree_trash');
      await getSavedDocument.dragTo(trash);
    }
  
     /**
     * Drag and drop document
     * @returns {Promise<void>}
     */
    async dragAndDropDocument() {
      const getDocument = this.page.locator("text=example.txt");
      await getDocument.waitFor({ state: 'visible', timeout: this.timeout });

      const trash = this.page.locator('#doc_tree_trash');
      await getDocument.dragTo(trash);
    }
  
     /**
     * Drag and drop saved document
     * @returns {Promise<void>}
     */
    async dragAndDropSavedDocument() {
      const getSavedDocument = this.page.locator("text=example_1.txt");
      const trash = this.page.locator('#doc_tree_trash');
      await getSavedDocument.dragTo(trash);
    }
  }
  
  module.exports = {DocumentPage};
  