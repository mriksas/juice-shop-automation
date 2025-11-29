// features/pageobjects/payment.page.js

class PaymentPage {
    //
    // ---------- МЕНЮ ACCOUNT ----------
    //

    // Шаг: And I press on Orders and Payments
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

    // Шаг: And I press My Payment options
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
    // ---------- ЭЛЕМЕНТЫ СТРАНИЦЫ "My Payment Options" ----------
    //

    get myPaymentOptionsTitle () {
        return $('//h1[contains(.,"My Payment Options")]');
    }

    // sam mat-expansion-panel с заголовком "Add new card"
    get addCardPanel () {
        return $('//mat-expansion-panel[contains(.,"Add new card")]');
    }

    // Name*
    get nameInput () {
        return $(
            '//mat-expansion-panel[contains(.,"Add new card")]' +
            '//mat-form-field[.//mat-label[contains(normalize-space(.),"Name")]]//input'
        );
    }

    // Card Number*
    get cardNumberInput () {
        return $(
            '//mat-expansion-panel[contains(.,"Add new card")]' +
            '//mat-form-field[.//mat-label[contains(normalize-space(.),"Card Number")]]//input'
        );
    }

    // Expiry Month* — первый <select> в панели
    // Expiry Month* — первый select на странице
    get expiryMonthSelect () {
        return $('(//select)[1]');
    }

    // Expiry Year* — последний select на странице
    get expiryYearSelect () {
        return $('(//select)[last()]');
    }


    // Кнопка Submit внутри панели
    get submitCardButton () {
        return $('#submitButton');
    }

    // Карточка по имени владельца
    cardRowByName (name) {
        return $(`//mat-card//*[contains(text(),"${name}")]/ancestor::mat-card`);
    }

    //
    // ---------- ВСПОМОГАТЕЛЬНОЕ ----------
    //
    async clickSubmitCardButton () {
        const btn = await this.submitCardButton;

        // на всякий случай скроллим к ней
        await btn.scrollIntoView();
        await browser.pause(200);

        // жмём через JS, чтобы обойти любые "not clickable"
        await browser.execute(el => {
            if (el instanceof HTMLElement) {
                el.click();
            }
        }, btn);

        await browser.pause(500);
    }
    // Шаг: When I press add new card
    async openAddNewCardForm () {
        const panel = await this.addCardPanel;
        await panel.waitForExist({ timeout: 10000 });

        const classes = await panel.getAttribute('class');
        const isExpanded = classes && classes.includes('mat-expanded');

        if (!isExpanded) {
            const header = await panel.$('mat-expansion-panel-header');
            await header.waitForExist({ timeout: 5000 });

            // кликаем header через JS, чтобы не ловить "not clickable"
            await browser.execute(el => {
                if (el instanceof HTMLElement) el.click();
            }, header);

            await browser.pause(700);
        }

        const name = await this.nameInput;
        await name.waitForDisplayed({ timeout: 10000 });
        await name.waitForEnabled({ timeout: 10000 });
    }

    // универсальный helper для native <select>
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
    // ---------- ЗАПОЛНЕНИЕ ФОРМЫ КАРТЫ ----------
    //

    async fillCardForm ({ name, cardNumber, expiryMonth, expiryYear }) {
        // на всякий случай убеждаемся, что панель раскрыта
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
