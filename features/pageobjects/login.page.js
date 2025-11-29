class LoginPage {
    // ====== ПОЛЯ ЛОГИНА ======
    get emailInput () {
        // проверь в DevTools id у поля email (обычно #email или #emailControl)
        return $('#email');
    }

    get passwordInput () {
        // аналогично: id="password" или "passwordControl"
        return $('#password');
    }

    get loginSubmitButton () {
        // в Juice Shop у кнопки логина id="loginButton"
        return $('#loginButton');
    }

    // методы, которые мы зовём из степов
    async fillEmail (email) {
        await (await this.emailInput).setValue(email);
    }

    async fillPassword (password) {
        await (await this.passwordInput).setValue(password);
    }

    async submitLogin () {
        const btn = await this.loginSubmitButton;
        await btn.waitForClickable({ timeout: 5000 });
        await btn.click();
    }

    
    get notYetCustomerLink () {
        return $('#newCustomerLink');
    }

    get resetPasswordLink () {
        return $('//*[@id="login-form"]/a');
    }

    async goToRegistration () {
        await this.notYetCustomerLink.waitForClickable({ timeout: 5000 });
        await this.notYetCustomerLink.click();
    }
}

export default new LoginPage();
