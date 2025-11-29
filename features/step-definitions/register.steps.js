import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pageobjects/home.page.js';
import LoginPage from '../pageobjects/login.page.js';
import RegisterPage from '../pageobjects/register.page.js';
import { expect } from '@wdio/globals';    

const EXISTING_EMAIL = 'vadym.automation@test.com';
const PASSWORD = 'Test1234!';
const SECURITY_ANSWER = 'My brother';

When(/^I press not yet a customer$/, async () => {
    await LoginPage.goToRegistration();
});

When(/^I enter email address$/, async () => {
    await RegisterPage.fillEmail(EXISTING_EMAIL);
});

When(/^I enter password$/, async () => {
    await RegisterPage.passwordInput.setValue(PASSWORD);
});

When(/^I enter password repeatedly$/, async () => {
    await RegisterPage.repeatPasswordInput.setValue(PASSWORD);
});

When(/^I select security question about elder sibling$/, async () => {
    await RegisterPage.selectElderSiblingQuestion();
});

When(/^I enter answer$/, async () => {
    await RegisterPage.fillAnswer(SECURITY_ANSWER);
});

When(/^I press register button$/, async () => {
    await RegisterPage.submit();
});

Then(/^I see message about email must be unique$/, async () => {
    await RegisterPage.emailUniqueError.waitForDisplayed({ timeout: 5000 });
    await expect(RegisterPage.emailUniqueError).toBeDisplayed();
});

Then(/^I am on register page$/, async () => {
    const url = await browser.getUrl();
    await expect(url).toContain('register');
});
