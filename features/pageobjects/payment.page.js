// features/pageobjects/payment.page.js

class PaymentPage {
    //
    // ---------- ACCOUNT MENU ----------
    //

    // Step: And I press on Orders and Payments
    // Opens the "Orders & Payment" menu item by clicking it through JS.
    async openOrdersAndPayment () {
        await browser.execute(() => {
            const buttons = Array.from(
                document.querySelectorAll('button, [role="menuitem"]')
            );
            const target = buttons.find(b =>
                b.textContent && b.textContent.includes('Orders & Payment')
            );
            if (target instanceof HTMLElement) target.click();
        });
        await browser.pause(400);
    }

    // Step: And I press My Payment options
    // Same logic as above – finds and clicks “My Payment Options”.
    async openMyPaymentOptions () {
        await browser.execute(() => {
            const buttons = Array.from(
                document.querySelectorAll('button, [role="menuitem"]')
            );
            const target = buttons.find(b =>
                b.textContent && b.textContent.includes('My Payment Options')
            );
            if (target instanceof HTMLElement) target.click();
        });
        await browser.pause(600);
    }

    //
    // ---------- ELEMENTS ON "MY PAYMENT OPTIONS" PAGE ----------
    //

    // Page title “My Payment Options”
    get myPaymentOptionsTitle () {
        return $('//h1[contains(.,"My Payment Options")]');
    }

    // Expansion panel that contains the “Add new card” form
    get addCardPanel () {
        return $('//mat-expansion-panel[contains(.,"Add new card")]');
    }

    // Input field: Name*
    get nameInput () {
        return $(
            '//mat-expansion-panel[contains(.,"Add new card")]' +
            '//mat-form-field[.//mat-label[contains(normalize-space(.),"Name")]]//input'
        );
    }

    // Input field: Card Number*
    get cardNumberInput () {
        return $(
            '//mat-expansion-panel[contains(.,"Add new card")]' +
            '//mat-form-field[.//mat-label[contains(normalize-space(.),"Card Number")]]//input'
        );
    }

    // Expiry Month* — the first <select> on the page
    get expiryMonthSelect () {
        return $('(//select)[1]');
    }

    // Expiry Year* — the last <select> on the page
    get expiryYearSelect () {
        return $('(//select)[last()]');
    }

    // Submit button inside the Add Card panel
    get submitCardButton () {
        return $('#submitButton');
    }

    // Locates saved card by cardholder name
    cardRowByName (name) {
        return $(`//mat-card//*[contains(text(),"${name}")]/ancestor::mat-card`);
    }

    //
    // ---------- HELPERS ----------
    //

    // Clicks the Submit button through JS to avoid “element not clickable” issues
    async clickSubmitCardButton () {
        const btn = await this.submitCardButton;

        await btn.scrollIntoView();
        await browser.pause(200);

        await browser.execute(el => {
            if (el instanceof HTMLElement) {
                el.click();
            }
        }, btn);

        await browser.pause(500);
    }

    // Step: When I press add new card
    // Expands the “Add new card” panel if it's collapsed, then waits for the form to load.
    async openAddNewCardForm () {
        const panel = await this.addCardPanel;
        await panel.waitForExist({ timeout: 10000 });

        const classes = await panel.getAttribute('class');
        const isExpanded = classes && classes.includes('mat-expanded');

        // If panel is closed — expand it
        if (!isExpanded) {
            const header = await panel.$('mat-expansion-panel-header');
            await header.waitForExist({ timeout: 5000 });

            // Click header through JS to avoid click interception
            await browser.execute(el => {
                if (el instanceof HTMLElement) el.click();
            }, header);

            await browser.pause(700);
        }

        // Wait until “Name” input is visible and enabled (form fully loaded)
        const name = await this.nameInput;
        await name.waitForDisplayed({ timeout: 10000 });
        await name.waitForEnabled({ timeout: 10000 });
    }

    // Helper to set a value in a native <select> by visible text
    async setNativeSelect(selectElem, visibleText) {
        const el = await selectElem;
        await el.waitForExist({ timeout: 10000 });

        await browser.execute((select, text) => {
            if (!select) return;
            const options = Array.from(select.options);
            const opt = options.find(o => o.text.trim() === String(text).trim());
            if (!opt) return;

            select.value = opt.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            select.dispatchEvent(new Event('input', { bubbles: true }));
        }, el, visibleText);

        await browser.pause(300);
    }

    async setExpiryMonth (month) {
        await this.setNativeSelect(this.expiryMonthSelect, month);
    }

    async setExpiryYear (year) {
        await this.setNativeSelect(this.expiryYearSelect, year);
    }

    //
    // ---------- FILLING THE CARD FORM ----------
    //

    // Fills all fields in the Add Card form with provided data
    async fillCardForm ({ name, cardNumber, expiryMonth, expiryYear }) {
        // Make sure the panel is expanded before interacting with fields
        await this.openAddNewCardForm();

        const nameInput = await this.nameInput;
        await nameInput.scrollIntoView();
        await nameInput.setValue(name);

        const cardNumberInput = await this.cardNumberInput;
        await cardNumberInput.scrollIntoView();
        await cardNumberInput.setValue(cardNumber);

        await this.setExpiryMonth(expiryMonth);
        await this.setExpiryYear(expiryYear);
    }
}

export default new PaymentPage();
