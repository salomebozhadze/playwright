class HomePage {
  constructor(page) {
    this.page = page;
    this.timeout = 5000; 
  }

    async getEditBox() {
      const editBox = this.page.locator('input[name="name"]:nth-child(2)');
      
      // Wait for the email field to be visible
      await editBox.waitFor();
    }

    async getTwoWayDataBunding() {
      return await this.waitFor(':nth-child(4) > .ng-untouched');
    };

    async getSelect() {
      return await this.waitFor('select');
    };

    async getEnterPrenaun() {
      return await this.waitFor('#inlineRadio3');
    };

    async getShopTab() {
      return await this.waitFor(':nth-child(2) > .nav-link');
    };
}


module.exports = { HomePage };
