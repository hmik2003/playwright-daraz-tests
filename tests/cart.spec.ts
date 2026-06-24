import { test } from '../fixtures/test-fixtures';
import { SEARCH_TERMS } from '../fixtures/test-data';

test.describe('Daraz Cart', () => {
  test('should access cart page', async ({ cartPage }) => {
    await cartPage.navigateToCart();
    await cartPage.expectCartPageLoaded();
  });

  test('should add product to cart from product page', async ({
    homePage,
    searchResultsPage,
    productPage,
  }) => {
    await homePage.open();
    await homePage.search(SEARCH_TERMS.laptop);
    await searchResultsPage.expectResultsLoaded();
    await searchResultsPage.openFirstProduct();
    await productPage.expectLoaded();
    await productPage.addToCart();
  });
});
