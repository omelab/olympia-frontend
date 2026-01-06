import assert from 'node:assert';

import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test.describe('Find the company name in homepage', () => {
    test('should display the company name', async ({ page }) => {
      const testText = 'Need Consultancy?';

      await page.goto('/');

      const text = page.getByText(testText);
      const textContentWebsite = await text.textContent();

      assert(
        textContentWebsite !== null,
        `${testText} text should not be null`,
      );

      await expect(page.getByText(testText)).toBeVisible();
      await expect(page.getByText(testText)).toHaveText(textContentWebsite);
    });
  });
});
