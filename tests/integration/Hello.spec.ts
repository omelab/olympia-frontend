import { expect, test } from '@playwright/test';

test.describe('Hello', () => {
  test.describe('Basic Hello world API testing', () => {
    test('should return 200 response', async ({ request }) => {
      const helloApiStatus = await request.get('/api/hello');

      expect(helloApiStatus.status()).toBe(200);
    });
  });
});
