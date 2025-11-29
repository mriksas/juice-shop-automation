class HomePage {
    // Welcome banner “Dismiss” button (shown only on first load)
    get dismissWelcomeButton() {
        return $('//*[@id="mat-mdc-dialog-0"]/div/div/app-welcome-banner/div[2]/button[2]');
    }

    // Top navigation: Account menu
    get accountButton() {
        return $('#navbarAccount');
    }

    // Login option inside the Account menu
    get loginButton() {
        return $('#navbarLoginButton');
    }

    // Logout option inside the Account menu
    get logoutButton() {
        return $('#navbarLogoutButton');
    }

    // Opens Juice Shop, maximizes the window and closes the welcome banner if it appears
    async open() {
        await browser.url('http://juiceshop.tdlbox.com/');
        await browser.maximizeWindow();

        if (await this.dismissWelcomeButton.isExisting()) {
            await this.dismissWelcomeButton.waitForClickable({ timeout: 10000 });
            await this.dismissWelcomeButton.click();
        }
    }

    // Logs user out only if the logout option is available
    async logoutIfLoggedIn() {
        const accountBtn = await this.accountButton;

        // Open account menu
        await accountBtn.waitForDisplayed({ timeout: 10000 });
        await browser.execute((el) => el.click(), accountBtn);

        // If Logout button is present – click it
        if (await this.logoutButton.isExisting()) {
            await this.logoutButton.click();
            await browser.pause(2000);
        }
    }
}

export default new HomePage();
