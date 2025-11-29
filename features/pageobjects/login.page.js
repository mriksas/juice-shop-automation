class LoginPage {
    // ====== LOGIN INPUT FIELDS ======

    // Email input field (make sure the selector matches the actual id in DevTools)
    get emailInput () {
        return $('#email');
    }

    // Password input field
    get passwordInput () {
        return $('#password');
    }

    // Login button (in Juice Shop it’s usually #loginButton)
    get loginSubmitButton () {
        return $('#loginButton');
    }

    //
    // Methods that we call from step definitions
    //

    // Types email into the Email input
    async fillEmail (email) {
        await (await this.emailInput).setValue(email);
    }

    // Types password into the Password input
    async fillPassword (password) {
        await (await this.passwordInput).setValue(password);
    }

    // Clicks the Login button after waiting for it to be clickable
    async submitLogin () {
        const btn = await this.loginSubmitButton;
        await btn.waitForClickable({ timeout: 5000 });
        await btn.click();
    }

    //
    // Additional login page elements
    //

    // “Not yet a customer?” → link to registration
    get notYetCustomerLink () {
        return $('#newCustomerLink');
    }

    // “Forgot your password?” link (XPath from the login form)
    get resetPasswordLink () {
        return $('//*[@id="login-form"]/a');
    }

    // Navigates to the Registration page
    async goToRegistration () {
        await this.notYetCustomerLink.waitForClickable({ timeout: 5000 });
        await this.notYetCustomerLink.click();
    }
}

export default new LoginPage();
