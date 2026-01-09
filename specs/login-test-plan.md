# Login Test Plan

## Application Overview

End-to-end Playwright test plan covering login functionality for the application. Includes happy path, negative cases, input validation, and session persistence scenarios. Assumes a fresh application state for each scenario.

## Test Scenarios

### 1. Login Suite

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login - valid credentials

**File:** `tests/login.spec.ts`

**Steps:**
  1. Start from a fresh browser context.
  2. Navigate to the application root (`/`).
  3. Open the login page by clicking the 'Login' link or navigating to `/login`.
  4. Fill the email field with a valid registered email (e.g., user@example.com).
  5. Fill the password field with the correct password.
  6. (Optional) Ensure the 'Remember me' checkbox is unchecked for this scenario.
  7. Click the 'Sign in' / 'Login' button.
  8. Wait for navigation or a success indicator (e.g., dashboard loads).

**Expected Results:**
  - User is redirected to dashboard or home page (URL contains `/dashboard` or `/home`).
  - A user-specific element is visible (e.g., avatar, username, or 'Logout' link).
  - No error message is shown.
  - Success criteria: page shows authenticated content and logout option. Failure condition: user remains on login page or sees an authentication error.

#### 1.2. Login - invalid password

**File:** `tests/login.spec.ts`

**Steps:**
  1. Start from a fresh browser context.
  2. Navigate to `/login`.
  3. Fill the email field with a valid registered email.
  4. Fill the password field with an incorrect password.
  5. Click the 'Sign in' button.

**Expected Results:**
  - An inline or toast error message is displayed (e.g., 'Invalid credentials' or 'Incorrect password').
  - User remains on the login page and is not authenticated (no dashboard access).
  - Success criteria: error message present and no authenticated UI visible. Failure condition: user gains access or no error shown.

#### 1.3. Login - invalid email format

**File:** `tests/login.spec.ts`

**Steps:**
  1. Start from a fresh browser context.
  2. Navigate to `/login`.
  3. Fill the email field with an invalid email string (e.g., 'not-an-email').
  4. Fill the password field with any value.
  5. Attempt to submit the form.

**Expected Results:**
  - Client-side validation prevents submission or an inline validation message is displayed (e.g., 'Enter a valid email').
  - No authentication request should proceed if client validation blocks submit.
  - Success criteria: validation message shown and user not authenticated. Failure condition: form submits with invalid email or server error without validation feedback.

#### 1.4. Login - empty required fields

**File:** `tests/login.spec.ts`

**Steps:**
  1. Start from a fresh browser context.
  2. Navigate to `/login`.
  3. Leave email and password empty.
  4. Click the 'Sign in' button.

**Expected Results:**
  - Validation messages appear for required fields (e.g., 'Email is required', 'Password is required').
  - No authentication request is made.
  - Success criteria: required-field messages shown and user remains unauthenticated. Failure condition: form submits or no validation shown.

#### 1.5. Login - remember me persists session

**File:** `tests/login.spec.ts`

**Steps:**
  1. Start from a fresh browser context.
  2. Navigate to `/login`.
  3. Fill the email and password with valid credentials.
  4. Check the 'Remember me' checkbox.
  5. Click 'Sign in' and wait for successful authentication.
  6. Reload the page or open a new tab in the same browser context.
  7. Verify that the user remains authenticated (dashboard or authenticated UI visible).

**Expected Results:**
  - After reload, the user remains logged in (authenticated UI present).
  - A persistent cookie or localStorage token is set (if inspectable).
  - Success criteria: session persists across reloads. Failure condition: user is logged out after reload or no persistence mechanism present.
