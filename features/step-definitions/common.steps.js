// features/step-definitions/common.steps.js
import { Given, When } from '@wdio/cucumber-framework';
import HomePage from '../pageobjects/home.page.js';
import LoginPage from '../pageobjects/login.page.js';

Given(/^I open landing page$/, async () => {
    await HomePage.open();
});

Given(/^I have registered account$/, async () => {
    // account was created manually
});

Given(/^I have logged out$/, async () => {
    await HomePage.logoutIfLoggedIn();
});

When(/^I press on Account button$/, async () => {
    await browser.pause(2000);
    const accountBtn = await HomePage.accountButton;
    await accountBtn.waitForDisplayed({ timeout: 10000 });
    await accountBtn.scrollIntoView();
    await browser.execute(el => el.click(), accountBtn);
});

When(/^I press log in$/, async () => {
    const accountBtn = await HomePage.accountButton;
    await browser.execute(el => el.click(), accountBtn);
    await browser.pause(1000);

    const loginBtn = await HomePage.loginButton;
    await browser.execute(el => el.click(), loginBtn);
    await browser.pause(1000);
});
