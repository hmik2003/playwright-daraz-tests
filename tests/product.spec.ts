import { test } from '../fixtures/test-fixtures';
import { SEARCH_TERMS } from '../fixtures/test-data';

test.describe('Daraz Product Page', () => {
  test.beforeEach(async ({ homePage, searchResultsPage }) => {
    await homePage.open();
    await homePage.search(SEARCH_TERMS.phone);
    await searchResultsPage.expectResultsLoaded();
    await searchResultsPage.openFirstProduct();
  });

  test('should load product detail page', async ({ productPage }) => {
    await productPage.expectLoaded();
  });

  test('should display product title', async ({ productPage }) => {
    await productPage.expectLoaded();
    await productPage.expectTitleNotEmpty();
  });

  test('should display product price', async ({ productPage }) => {
    await productPage.expectLoaded();
    await productPage.expectPriceVisible();
  });

  test('should show add to cart button', async ({ productPage }) => {
    await productPage.expectLoaded();
    await productPage.expectAddToCartAvailable();
  });
});
