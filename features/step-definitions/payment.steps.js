// features/step-definitions/payment.steps.js
import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';

import HomePage from '../pageobjects/home.page.js';
import LoginPage from '../pageobjects/login.page.js';
import PaymentPage from '../pageobjects/payment.page.js';

// здесь можешь подставить уже существующего юзера
const NEW_USER_EMAIL = 'new.user@test.com';
const NEW_USER_PASSWORD = 'Test1234!';

Given(/^I have logged with a new user$/, async () => {
    // если юзер уже создан заранее – просто логинимся
    await HomePage.open();
    await HomePage.logoutIfLoggedIn();

    // открыть форму логина
    await browser.pause(2000);
    const accountBtn = await HomePage.accountButton;
    await accountBtn.waitForDisplayed({ timeout: 10000 });
    await accountBtn.scrollIntoView();
    await browser.execute(el => el.click(), accountBtn);

    await browser.execute(el => el.click(), accountBtn);
    await browser.pause(1000);

    const loginBtn = await HomePage.loginButton;
    await browser.execute(el => el.click(), loginBtn);
    await browser.pause(1000);


    // логин
    await LoginPage.fillEmail(NEW_USER_EMAIL);
    await LoginPage.fillPassword(NEW_USER_PASSWORD);

    const submit = await LoginPage.loginSubmitButton;
    await submit.waitForClickable({ timeout: 10000 });
    await submit.click();

    // можно подождать появления корзины/аккаунта как признак успешного логина
    await HomePage.accountButton.waitForDisplayed({ timeout: 10000 });
});

When(/^I press on Orders and Payments$/, async () => {
    await PaymentPage.openOrdersAndPayment();
});

When(/^I press My Payment options$/, async () => {
    await PaymentPage.openMyPaymentOptions();
});



When(/^I am on My Payment options page$/, async () => {
    await (await PaymentPage.myPaymentOptionsTitle)
        .waitForDisplayed({ timeout: 10000 });
    await expect(PaymentPage.myPaymentOptionsTitle).toBeDisplayed();
});

When(/^I press add new card$/, async () => {
    await PaymentPage.openAddNewCardForm();
});

When(/^fill in card details$/, async (dataTable) => {
    const [, row] = dataTable.raw();
    const [name, cardNumber, expiryMonth, expiryYear] = row;

    await PaymentPage.fillCardForm({
        name,
        cardNumber,
        expiryMonth,
        expiryYear,
    });
});

When(/^I submit new card details$/, async () => {
    await PaymentPage.clickSubmitCardButton();
});

Then(/^I see added card$/, async (dataTable) => {
    // Таблица вида:
    // | Name         | Card Number      | Expiry |
    // | John Goodman | ************5678 | 4/2085 |
    const [, row] = dataTable.raw();
    const [expectedName, expectedMaskedNumber, expectedExpiry] = row;

    const cardRow = await PaymentPage.cardRowByName(expectedName);
    await cardRow.waitForDisplayed({ timeout: 10000 });

    const text = await cardRow.getText();

    await expect(text).toContain(expectedName);
    await expect(text).toContain(expectedMaskedNumber);
    await expect(text).toContain(expectedExpiry);
});
