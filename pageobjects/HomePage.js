class HomePage {
  constructor(page) {
    this.page = page;
    this.timeout = 5000; // Timeout value for waiting
    
    // Define locators
    this.getEditBox = async () => {
      return await this.waitForSelectorWithOptions('input[name="name"]:nth-child(2)');
    };

    this.getTwoWayDataBunding = async () => {
      return await this.waitForSelectorWithOptions(':nth-child(4) > .ng-untouched');
    };

    this.getSelect = async () => {
      return await this.waitForSelectorWithOptions('select');
    };

    this.getEnterPrenaun = async () => {
      return await this.waitForSelectorWithOptions('#inlineRadio3');
    };

    this.getShopTab = async () => {
      return await this.waitForSelectorWithOptions(':nth-child(2) > .nav-link');
    };
  }

  // Function to wait for selector with options
  async waitForSelectorWithOptions(selector) {
    return await this.page.waitForSelector(selector, { state: 'visible', timeout: this.timeout });
  }
}

module.exports = { HomePage };
