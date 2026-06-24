import { test, expect } from '../fixtures/test-fixtures';

test.describe('Daraz Homepage @smoke', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should load homepage successfully', async ({ homePage }) => {
    await homePage.expectLoaded();
  });

  test('should display Daraz logo link in header', async ({ homePage }) => {
    await homePage.expectLogoVisible();
  });

  test('should have search bar visible', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], #q, .search-box__input').first();
    await expect(searchInput).toBeVisible({ timeout: 20_000 });
  });
});
