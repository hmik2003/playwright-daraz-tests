import { test } from '../fixtures/test-fixtures';

test.describe('Daraz Login Page', () => {
  test('should navigate to login and display form', async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.openLogin();
    await loginPage.expectLoginFormVisible();
    await loginPage.expectSubmitButtonVisible();
  });

  test('should show password field when applicable', async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.openLogin();
    await loginPage.expectLoginFormVisible();
    await loginPage.expectPasswordFieldWhenApplicable();
  });
});
