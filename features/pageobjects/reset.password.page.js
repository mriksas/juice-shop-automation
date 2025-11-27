class ResetPasswordPage
{
    get emailInput() {
        return $('#email');
    }

    get securityQuestionInput() {
        return $('#securityAnswer');
    }

    get newPasswordInput() {
        return $('#newPassword');
    }

    get repeatNewPasswordInput() {
        return $('#newPasswordRepeat');
    }

    get resetPasswordButton() {
        return $('#resetButton');
    }

    get successMessage() {
        return $('//*[contains(text(),"Your password was successfully changed.")]');
    }

    async fillEmail(email) {
        await this.emailInput.setValue(email);
    }

    async fillPassword(password) {
        await this.newPasswordInput.setValue(password);
        await this.repeatNewPasswordInput.setValue(password);
    }

    async fillQuestion(answer) {
        await this.securityQuestionInput.setValue(answer);
    }
}

export default new ResetPasswordPage();