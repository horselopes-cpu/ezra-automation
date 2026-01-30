import { test, expect } from '@playwright/test';

/**
 * SCALABILITY: This uses request context for direct API validation.
 * It ensures the backend—the "Source of Truth"—enforces security[cite: 290, 340].
 */
test('TC-02: Security - Backend must reject unauthorized memberId access', async ({ request }) => {
  const response = await request.post('/api/medical-questionnaire/begin', {
    data: { memberId: 'TARGET_MEMBER_ID' },
    headers: { 'Authorization': 'Bearer ATTACKER_TOKEN' }
  });

  // Rationale: Expect 403 Forbidden to protect patient privacy[cite: 583].
  expect(response.status()).toBe(403);
});