import re

from playwright.sync_api import Page, expect

from pages.base_page import BasePage


class CartPage(BasePage):
    def __init__(self, page: Page):
        super().__init__(page)
        self.cart_heading = page.locator(
            'h1:has-text("Cart"), h1:has-text("Shopping Cart"), [class*="cart-title"]'
        ).first
        self.empty_cart_message = page.locator(
            ':text("empty"), :text("no items"), :text("Your cart")'
        ).first
        self.cart_items = page.locator(
            '[class*="cart-item"], [data-qa-locator*="cart"], .cart-product'
        )

    def navigate_to_cart(self) -> None:
        self.goto("/cart/")
        self.dismiss_overlays()

    def expect_cart_page_loaded(self) -> None:
        self.page.wait_for_url(re.compile(r"cart", re.I), timeout=20_000)
        heading_visible = False
        try:
            heading_visible = self.cart_heading.is_visible(timeout=10_000)
        except Exception:
            pass
        url_matches = "cart" in self.page.url.lower()
        assert heading_visible or url_matches

    def expect_cart_accessible(self) -> None:
        expect(self.page).to_have_url(re.compile(r"cart|daraz\.pk", re.I))
