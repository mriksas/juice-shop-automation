import { Given, When, Then } from '@wdio/cucumber-framework';
import HomePage from '../pageobjects/home.page.js';
import LoginPage from '../pageobjects/login.page.js';
import resetPasswordPage from '../pageobjects/reset.password.page.js';
import { expect } from '@wdio/globals';  

const EXISTING_EMAIL = 'vadym.automation@test.com';
const NEW_PASSWORD = 'Roland_154875';
const SECURITY_ANSWER = 'My brother';
/*
Given(/^I open landing page$/, async () => {
    await HomePage.open();
});

Given(/^I have registered account$/, async () => {
    // предусловие: аккаунт уже создан вручную
});

Given(/^I have logged out$/, async () => {
    await HomePage.logoutIfLoggedIn();
});

When(/^I press on Account button$/, async () => {
    // небольшой запас времени после логаута / загрузки
    await browser.pause(2000);

    const accountBtn = await HomePage.accountButton;

    // ждём, пока он хотя бы отобразится
    await accountBtn.waitForDisplayed({ timeout: 10000 });

    // скроллим к элементу на всякий случай
    await accountBtn.scrollIntoView();

    // жмём через JS, чтобы обойти "not clickable"
    await browser.execute((el) => el.click(), accountBtn);
});

When(/^I press log in$/, async () => {
    // на всякий случай ещё раз убедимся, что меню аккаунта открыто
    const accountBtn = await HomePage.accountButton;
    await browser.execute((el) => el.click(), accountBtn);
    await browser.pause(1000);

    const loginBtn = await HomePage.loginButton;

    // не ждём, что он "displayed", просто насильно кликаем по DOM-элементу
    await browser.execute((el) => el.click(), loginBtn);
    await browser.pause(1000);
});
*/
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

