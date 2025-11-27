class LoginPage {
    get notYetCustomerLink() {
        return $('#newCustomerLink');
    }

    get resetPasswordLink() {
        return $('//*[@id="login-form"]/a');
    }

    async goToRegistration() {
        await this.notYetCustomerLink.waitForClickable({ timeout: 5000 });
        await this.notYetCustomerLink.click();
    }
}

export default new LoginPage();
