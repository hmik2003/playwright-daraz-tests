export const BASE_URL = 'https://www.daraz.pk';

export const SEARCH_TERMS = {
  phone: 'samsung galaxy',
  laptop: 'laptop',
  headphones: 'wireless headphones',
} as const;

export const SELECTORS = {
  searchInput: 'input[type="search"], #q, .search-box__input',
  searchButton: 'button[type="submit"], .search-box__button',
  productCard: '[data-qa-locator="product-item"], .Bm3ON, .gridItem--Yd0sa',
  productTitle: '[data-qa-locator="product-title"], .RfADt, .title--wrap',
  addToCart: '[data-qa-locator="add-to-cart"], .pdp-button_theme_orange, button:has-text("Add to Cart")',
  cartIcon: '.cart-icon, [class*="cart"], a[href*="cart"]',
  loginLink: 'a[href*="login"], .login-link, :text("Login")',
} as const;

export const TIMEOUTS = {
  navigation: 30_000,
  element: 15_000,
} as const;
