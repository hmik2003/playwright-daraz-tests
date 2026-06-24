import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SearchResultsPage } from '../pages/search-results.page';
import { ProductPage } from '../pages/product.page';
import { LoginPage } from '../pages/login.page';
import { CartPage } from '../pages/cart.page';

type DarazFixtures = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  productPage: ProductPage;
  loginPage: LoginPage;
  cartPage: CartPage;
};

export const test = base.extend<DarazFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';
