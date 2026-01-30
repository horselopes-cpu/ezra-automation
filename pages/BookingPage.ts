import { Page, Locator } from '@playwright/test';

export class BookingPage {
    readonly page: Page;
    readonly nextBtn: Locator;
    readonly stripeFrame: any;

    constructor(page: Page) {
        this.page = page;
        this.nextBtn = page.locator('button:has-text("Next")');
        // Targeted iframe for Stripe security elements [cite: 42, 801]
        this.stripeFrame = page.frameLocator('iframe[name^="__privateStripeFrame"]');
    }

    async navigate() {
        await this.page.goto('/booking/start');
    }

    async fillMemberData(memberId: string) {
        await this.page.fill('input[name="memberId"]', memberId);
        await this.nextBtn.click();
    }

    async fillPaymentDetails(cardNumber: string, expiry: string, cvc: string) {
        await this.stripeFrame.locator('input[name="cardnumber"]').fill(cardNumber);
        await this.stripeFrame.locator('input[name="exp-date"]').fill(expiry);
        await this.stripeFrame.locator('input[name="cvc"]').fill(cvc);
    }
}