import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pageobjects/home.page.js';
import LoginPage from '../pageobjects/login.page.js';
import resetPasswordPage from '../pageobjects/reset.password.page.js';
import { expect } from '@wdio/globals';  

const EXISTING_EMAIL = 'vadym.automation@test.com';
const NEW_PASSWORD = 'Roland_154875';
const SECURITY_ANSWER = 'My brother';

When(/^I press 'forgot password'$/, async () => {
    const resetPasswordLink = await LoginPage.resetPasswordLink;
    await browser.execute((el) => el.click(), resetPasswordLink);
    await browser.pause(1000);
});

When(/^I enter email in forgot email page$/, async () => {
    await resetPasswordPage.fillEmail(EXISTING_EMAIL);
});

When(/^I click on security question field$/, async () => {
    const securityQuestion = await resetPasswordPage.securityQuestionInput;
    await browser.execute((el) => el.click(), securityQuestion);
    await browser.pause(1000);
});

When(/^I see security question$/, async () => {
    const securityQuestion = await resetPasswordPage.securityQuestionInput;
    await expect(securityQuestion).toBeDisplayed();
});

When(/^I enter security question$/, async () => {
    await resetPasswordPage.fillQuestion(SECURITY_ANSWER);
});

When(/^I enter new password and confirm$/, async () => {
    await resetPasswordPage.fillPassword(NEW_PASSWORD);
    const submitButton = await resetPasswordPage.resetPasswordButton;
    await browser.execute((el) => el.click(), submitButton);
    await browser.pause(1000);
});

Then(/^I see message about successfully changed password$/, async () => {
    await resetPasswordPage.successMessage.waitForDisplayed({ timeout: 5000 });
    await expect(resetPasswordPage.successMessage).toBeDisplayed();
});

