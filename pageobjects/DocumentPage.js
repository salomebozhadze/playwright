const {test, expect} = require('@playwright/test');

class DocumentPage {

    constructor(page) {
      this.page = page;
      this.getDocumentTab = page.locator('.icon24-Documents', { state: 'visible', timeout: 5000 });
      this.getUploadDocumentCheckBox = page.locator('.checkIcon', { state: 'visible', timeout: 5000 });
      this.getMoreLinks = page.locator('#toolbar_more div', { state: 'visible', timeout: 5000 });
      this.getSendLink = page.locator('text=Send', { state: 'visible', timeout: 5000 });
      this.getSendEmailLink = page.locator('text=Send by e-mail', { state: 'visible', timeout: 5000 });
      this.getDocument = page.locator("text=example.txt", { state: 'visible', timeout: 8000 });
      this.getTrash = page.locator('#doc_tree_trash', { state: 'visible', timeout: 5000 });
      this.getSavedDocument = page.locator("text=example_1.txt", { state: 'visible', timeout: 8000 });
      this.getEmptyDocumentText = page.locator('text=There are no documents in this folder yet', { state: 'visible', timeout: 5000 });
      this.getCheckBoxAll = page.locator('.icon.icon-checkb', { state: 'visible', timeout: 5000 });
      this.getDeleteLink = page.locator("xpath=.//div[text()='Delete']", { state: 'visible', timeout: 5000 });
      this.getConfirmDeleteBtn = page.locator('#dialBtn_YES > .btnCtn', { state: 'visible', timeout: 5000 });
      this.trash = page.locator('#doc_tree_trash');
      this.table =  page.locator("xpath=//table[contains(@class, 'GCSDBRWBBU')]", { state: 'visible', timeout: 5000 })

    }
  
  
    async clickDocumentTab() {
      await this.getDocumentTab.click();
    }

    async visibleDocument(){
     expect(await this.getDocument).toBeVisible({timeout:10000});
    }

  //   async dragAndDropDocument(page) {
  //     const sourceElement = this.getDocument;
  //     const targetElement = this.trash;
  
  //     // Ensure both elements are valid before proceeding
  //     if (!sourceElement || !targetElement) {
  //         console.error("Invalid source or target element");
  //         return;
  //     }
  
  //     // Hover over the source element
  //     await sourceElement.hover();
  
  //     // Trigger mouse down event
  //     await page.mouse.down();
  
  //     // Hover over the target element
  //     await targetElement.hover();
  
  //     // Trigger mouse up event
  //     await page.mouse.up();
  // }

  //   async dragAndDropSavedDocument(page) {
  //     await this.getSavedDocument.hover();
  //     await page.mouse.down();
  //     await this.trash.hover();
  //     await page.mouse.up();
  //   }


  async dragAndDrop(){
    await this.getSavedDocument.dragTo(this.trash);

  }

    async dragAndDropDocument(){
      await this.getDocument.dragTo(this.trash);

    }

    async dragAndDropSavedDocument(){
      await this.getSavedDocument.dragTo(this.trash);
    }
  
   
  }
  
  module.exports = {DocumentPage};
  