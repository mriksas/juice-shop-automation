class HomePage {
    get dismissWelcomeButton() {
        return $('//*[@id="mat-mdc-dialog-0"]/div/div/app-welcome-banner/div[2]/button[2]');
    }

    get accountButton() {
        return $('#navbarAccount');
    }

    get loginButton() {
        return $('#navbarLoginButton');
    }

    get logoutButton() {
        return $('#navbarLogoutButton');
    }

    async open() {
        await browser.url('http://juiceshop.tdlbox.com/');
        await browser.maximizeWindow();

        if (await this.dismissWelcomeButton.isExisting()) {
            await this.dismissWelcomeButton.waitForClickable({ timeout: 10000 });
            await this.dismissWelcomeButton.click();
        }
    }

    async logoutIfLoggedIn() {
    const accountBtn = await this.accountButton;

    await accountBtn.waitForDisplayed({ timeout: 10000 });
    await browser.execute((el) => el.click(), accountBtn);

    if (await this.logoutButton.isExisting()) {
        await this.logoutButton.click();
        await browser.pause(2000);
    }
}

}

export default new HomePage();
