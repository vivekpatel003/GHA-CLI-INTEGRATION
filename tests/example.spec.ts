import { test, expect } from '@playwright/test';

test('homepage has Playwright in title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
});

test('failing test - intentional failure', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    // This will fail intentionally
    await expect(page).toHaveTitle(/This Title Does Not Exist/);
});
