import { test, expect } from '@playwright/test';
import { BookingPage } from '../pages/BookingPage';

test.describe('Ezra Core Booking & Security Suite', () => {
    let bookingPage: BookingPage;

    test.beforeEach(async ({ page }) => {
        bookingPage = new BookingPage(page);
        await bookingPage.navigate();
    });

    /**
     * TC-01: E2E Happy Path (Revenue Path)
     * Validates the core business flow from details to successful payment[cite: 1043].
     */
    test('TC-01: Full flow from questionnaire to payment success', async ({ page }) => {
        await bookingPage.fillMemberData('MEMBER_123');
        await page.click('text=Confirm Plan');
        
        // Use Stripe test card from requirements
        await bookingPage.fillPaymentDetails('4242424242424242', '12/26', '123');
        await page.click('#submit-payment');

        await expect(page).toHaveURL(/.*confirmation/);
        await expect(page.locator('text=Success')).toBeVisible();
    });

    /**
     * TC-02: Security/Privacy (IDOR Prevention)
     * Requirement: Prevent members from accessing others' data[cite: 802, 1048].
     */
    test('TC-02: Backend must reject unauthorized memberId access', async ({ request }) => {
        const response = await request.post('/api/medical-questionnaire/begin', {
            data: { memberId: 'TARGET_OTHER_USER' },
            headers: { 'Authorization': `Bearer ${process.env.VALID_TOKEN}` }
        });
        // Asserting 403 Forbidden ensures the server enforces privacy[cite: 786, 804].
        expect(response.status()).toBe(403);
    });

    /**
     * TC-03: Data Integrity (Webhook Confirmation)
     * Verifies the database actually updates after the Stripe webhook[cite: 1053].
     */
    test('TC-03: Verify database state after successful webhook sync', async ({ request }) => {
        const response = await request.get('/api/internal/booking-status/MEMBER_123');
        const data = await response.json();
        expect(data.isPaid).toBe(true);
        expect(data.status).toBe('confirmed');
    });
});