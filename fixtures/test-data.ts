export const BASE_URL = 'https://www.daraz.pk';

export const SEARCH_TERMS = {
  phone: 'samsung galaxy',
  laptop: 'laptop',
  headphones: 'wireless headphones',
} as const;

export const SELECTORS = {
  searchInput: 'input[type="search"], #q, .search-box__input',
  searchButton: 'button[type="submit"], .search-box__button, .search-box__button--1',
  productCard: '[data-qa-locator="product-item"], .Bm3ON, .gridItem--Yd0sa, a[href*="/products/"]',
  productTitle: 'h1.pdp-mod-product-badge-title, h1[class*="Title"], h1[class*="title"], h1',
  addToCart:
    'button:has-text("Add to Cart"), button:has-text("ADD TO CART"), [class*="pdp-button_theme_orange"], [data-qa-locator="add-to-cart"]',
  cartIcon: '.cart-icon, [class*="cart"], a[href*="cart"]',
  loginLink: 'a[href*="login"], .login-link, :text("Login")',
} as const;

export const TIMEOUTS = {
  navigation: 45_000,
  element: 20_000,
} as const;
