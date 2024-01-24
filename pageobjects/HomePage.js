class HomePage {
    constructor(page) {
      this.page = page;
    }
  
    async getEditBox() {
      return await this.page.locator('input[name="name"]:nth-child(2)');
    }
  
    async getTwoWayDataBunding() {
      return await this.page.locator(':nth-child(4) > .ng-untouched');
    }
  
    async getSelect() {
      return await this.page.locator('select');
    }
  
    async getEnterPrenaun() {
      return await this.page.locator('#inlineRadio3');
    }
  
    async getShopTab() {
      return await this.page.locator(':nth-child(2) > .nav-link');
    }
  }
  
  module.exports = {HomePage};
  