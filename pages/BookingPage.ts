// Import the Playwright’s Page and Locator types
import { Page, Locator } from '@playwright/test';

// Create "BookingPage" class
export class BookingPage {
    // Create the following variables and assign the values     
    readonly page: Page;
    readonly page: Page;
    readonly nextBtn: Locator;
    readonly stripeFrame: any;

    // Create a page object
    constructor(page: Page) {
        this.page = page;
        this.nextBtn = page.locator('button:has-text("Next")');
        // Targeted iframe for Stripe security elements
        this.stripeFrame = page.frameLocator('iframe[name^="__privateStripeFrame"]');
    }

    // Open the browser and go to the booking start page
    async navigate() {
        await this.page.goto('/booking/start');
    }

    // Locate "memberId" field, enter the value and click the "Next" button
    async fillMemberData(memberId: string) {
        await this.page.fill('input[name="memberId"]', memberId);
        await this.nextBtn.click();
    }

    // Enter the "Secure Zone" (with Stripe frame) and fills in the credit card information
    async fillPaymentDetails(cardNumber: string, expiry: string, cvc: string) {
        await this.stripeFrame.locator('input[name="cardnumber"]').fill(cardNumber);
        await this.stripeFrame.locator('input[name="exp-date"]').fill(expiry);
        await this.stripeFrame.locator('input[name="cvc"]').fill(cvc);
    }
}
