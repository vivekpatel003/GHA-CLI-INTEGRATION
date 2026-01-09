// spec: specs/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login Suite', () => {
  test('Login - valid credentials', async ({ page }) => {
    // 1. Start from a fresh browser context.
    // 2. Navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');

    // 3. Fill username with `standard_user`.
    await page.fill('#user-name', 'standard_user');
    // 4. Fill password with `secret_sauce`.
    await page.fill('password', 'secret_sauce');

    // 5. Click the Login button.
    await page.click('#login-button');

    // Expected: redirected to /inventory.html and inventory list visible
    await expect(page).toHaveURL(/inventory.html$/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('Login - invalid password', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');

    // 2. Fill username `standard_user`.
    await page.fill('#user-name', 'standard_user');
    // 3. Fill password with `wrong_password`.
    await page.fill('#password', 'wrong_password');

    // 4. Click Login.
    await page.click('#login-button');

    // Expected: error message about credentials
    const error = page.locator('.error-message-container h3');
    await expect(error).toHaveText(/Username and password do not match any user in this service/i);
  });

  test('Login - locked out user', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');

    // 2. Fill username `locked_out_user`.
    await page.fill('#user-name', 'locked_out_user');
    // 3. Fill password `secret_sauce`.
    await page.fill('#password', 'secret_sauce');

    // 4. Click Login.
    await page.click('#login-button');

    // Expected: locked out error message
    const error = page.locator('.error-message-container h3');
    await expect(error).toHaveText(/Sorry, this user has been locked out./i);
  });

  test('Login - empty required fields', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');

    // 2. Click Login with empty fields.
    await page.click('#login-button');

    // Expected: username required error
    const error = page.locator('.error-message-container h3');
    await expect(error).toHaveText(/Username is required/i);

    // Now fill username and leave password empty to validate password required
    await page.fill('#user-name', 'standard_user');
    await page.click('#login-button');
    await expect(error).toHaveText(/Password is required/i);
  });

  test('Login - invalid username', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');

    // 2. Fill username `invalid_user` and password `secret_sauce`.
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'secret_sauce');

    // 3. Click Login.
    await page.click('#login-button');

    // Expected: credentials mismatch message
    const error = page.locator('.error-message-container h3');
    await expect(error).toHaveText(/Username and password do not match any user in this service/i);
  });
});
