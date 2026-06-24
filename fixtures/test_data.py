BASE_URL = "https://www.daraz.pk"

SEARCH_TERMS = {
    "phone": "samsung galaxy",
    "laptop": "laptop",
    "headphones": "wireless headphones",
}

SELECTORS = {
    "search_input": 'input[type="search"], #q, .search-box__input',
    "search_button": 'button[type="submit"], .search-box__button, .search-box__button--1',
    "product_card": '[data-qa-locator="product-item"], .Bm3ON, .gridItem--Yd0sa, a[href*="/products/"]',
    "product_title": 'h1.pdp-mod-product-badge-title, h1[class*="Title"], h1[class*="title"], h1',
    "add_to_cart": 'button:has-text("Add to Cart"), button:has-text("ADD TO CART"), [class*="pdp-button_theme_orange"], [data-qa-locator="add-to-cart"]',
    "cart_icon": '.cart-icon, [class*="cart"], a[href*="cart"]',
    "login_link": 'a[href*="login"], .login-link, :text("Login")',
    "logo_link": 'a:has(img[alt*="Daraz"]), img[alt*="Daraz.PK Logo"]',
}

TIMEOUTS = {
    "navigation": 45_000,
    "element": 20_000,
}
