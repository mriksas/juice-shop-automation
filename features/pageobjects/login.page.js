class LoginPage {
    get notYetCustomerLink() {
        return $('#newCustomerLink');
    }

    async goToRegistration() {
        await this.notYetCustomerLink.waitForClickable({ timeout: 5000 });
        await this.notYetCustomerLink.click();
    }
}

export default new LoginPage();
