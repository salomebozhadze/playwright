const {test, expect} = require('@playwright/test');

class DocumentPage {

    constructor(page) {
      this.page = page;
      this.timeout = 5000; 
      this.getDocument = page.locator("text=example.txt");
    }

    
    getDocument() {
        return this.page.locator("text=example.txt");
    }

  
    async clickDocumentTab() {
      const getDocumentTab = this.page.locator('.icon24-Documents', { state: 'visible', timeout: 5000 });
      await getDocumentTab.click();
    }

    async clickUploadDocumentCheckBox() {
      const getUploadDocumentCheckBox = this.page.locator('.checkIcon', { state: 'visible', timeout: 5000 });
      await getUploadDocumentCheckBox.click();
    }


    async clickCheckBoxAll() {
      const getCheckBoxAll = this.page.locator(".icon.icon-checkb");
      await getCheckBoxAll.click();
  }

  async clickMoreLinks() {
    const getMoreLinks = this.page.locator('#toolbar_more div', { state: 'visible', timeout: 5000 });
    await getMoreLinks.click();
  }

  async getSendLinkover() {
    const getSendLink = this.page.locator('text=Send', { state: 'visible', timeout: 5000 });
    await getSendLink.hover();
  }

  async clickSendEmailLink() {
    const getSendEmailLink = this.page.locator('text=Send by e-mail', { state: 'visible', timeout: 5000 });
    await getSendEmailLink.click();
  }

  async clickTrash() {
    const getTrash = this.page.locator('#doc_tree_trash', { state: 'visible', timeout: 5000 });
    await getTrash.click();
  }

  async clickDeleteLink() {
    const getDeleteLink = this.page.locator("xpath=.//div[text()='Delete']", { state: 'visible', timeout: 5000 });
    await getDeleteLink.click();
  }

  async clickConfirmDeleteBtn() {
    const getConfirmDeleteBtn = this.page.locator('#dialBtn_YES > .btnCtn', { state: 'visible', timeout: 5000 });
    await getConfirmDeleteBtn.click();
  }

  
    async visibleDocument() {
      const getDocument = this.page.locator("text=example.txt", { state: 'visible', timeout: 8000 });
      expect(await getDocument).toBeVisible();
    }

    async visibleSavedDocument() {
      const getSavedDocument = this.page.locator("text=example_1.txt", { state: 'visible', timeout: 8000 });
      expect(await getSavedDocument).toBeVisible();
    }

    async visibleEmptyDocumentText() {
      const getEmptyDocumentText = this.page.locator('text=There are no documents in this folder yet', { state: 'visible', timeout: 8000 });
      expect(await getEmptyDocumentText).toBeVisible();
    }
  
    async dragAndDrop() {
      const getSavedDocument = this.page.locator("text=example_1.txt", { state: 'visible', timeout: 8000 });
      const trash = this.page.locator('#doc_tree_trash');
      await getSavedDocument.dragTo(trash);
    }
  
    async dragAndDropDocument() {
      const getDocument = this.page.locator("text=example.txt", { state: 'visible', timeout: 8000 });
      const trash = this.page.locator('#doc_tree_trash');
      await getDocument.dragTo(trash);
    }
  
    async dragAndDropSavedDocument() {
      const getSavedDocument = this.page.locator("text=example_1.txt", { state: 'visible', timeout: 8000 });
      const trash = this.page.locator('#doc_tree_trash');
      await getSavedDocument.dragTo(trash);
    }
  }
  
  module.exports = {DocumentPage};
  