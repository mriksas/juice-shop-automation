class RegisterPage {
    get emailInput() {
        return $('#emailControl');
    }

    get passwordInput() {
        return $('#passwordControl');
    }

    get repeatPasswordInput() {
        return $('#repeatPasswordControl');
    }

    get securityQuestionDropdown() {
        return $('//*[@id="registration-form"]/div[1]/mat-form-field[1]/div[1]');
    }

    get securityQuestionOptionElderSibling() {
        return $('//*[@id="mat-option-3"]');
    }

    get securityAnswerInput() {
        return $('#securityAnswerControl');
    }

    get registerButton() {
        return $('#registerButton');
    }

    get emailUniqueError() {
        return $('//*[contains(text(),"Email must be unique")]');
    }

    async fillEmail(email) {
        await this.emailInput.setValue(email);
    }

    async fillPassword(password) {
        await this.passwordInput.setValue(password);
        await this.repeatPasswordInput.setValue(password);
    }

    async selectElderSiblingQuestion() {
        await this.securityQuestionDropdown.click();
        await this.securityQuestionOptionElderSibling.click();
    }

    async fillAnswer(answer) {
        await this.securityAnswerInput.setValue(answer);
    }

    async submit() {
        await this.registerButton.click();
    }
}

export default new RegisterPage();
