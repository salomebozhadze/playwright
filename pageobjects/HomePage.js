class HomePage {
  constructor(page) {
    this.page = page;
    this.timeout = 5000; 
  }

    async getEditBox() {
      const editBox = this.page.locator('input[name="name"]:nth-child(2)');
      await editBox.waitFor();
    }

    async getTwoWayDataBunding() {
      return await this.page.locator(':nth-child(4) > .ng-untouched').waitFor();
    };

    async getSelect() {
      return await this.page.locator('select').waitFor();
    };

    async getEnterPrenaun() {
      return await this.page.locator('#inlineRadio3').waitFor();
    };

    async getShopTab() {
      return await this.page.locator(':nth-child(2) > .nav-link').waitFor();
    };
}


module.exports = { HomePage };
