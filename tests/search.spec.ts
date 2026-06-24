import { test } from '../fixtures/test-fixtures';
import { SEARCH_TERMS } from '../fixtures/test-data';

test.describe('Daraz Search @smoke', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('should search for phones and display results', async ({
    homePage,
    searchResultsPage,
  }) => {
    await homePage.search(SEARCH_TERMS.phone);
    await searchResultsPage.expectResultsLoaded();
    await searchResultsPage.expectMinimumResults(1);
  });

  test('should search for laptops and display results', async ({
    homePage,
    searchResultsPage,
  }) => {
    await homePage.search(SEARCH_TERMS.laptop);
    await searchResultsPage.expectResultsLoaded();
    await searchResultsPage.expectMinimumResults(1);
  });

  test('should reflect search term in URL', async ({ homePage, searchResultsPage }) => {
    await homePage.search(SEARCH_TERMS.headphones);
    await searchResultsPage.expectResultsLoaded();
    await searchResultsPage.expectSearchTermInUrl('wireless');
  });
});
