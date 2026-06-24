import re

from playwright.sync_api import Page, expect

from fixtures.test_data import SELECTORS
from pages.base_page import BasePage


class ProductPage(BasePage):
    def __init__(self, page: Page):
        super().__init__(page)
        self.product_title = page.locator(SELECTORS["product_title"]).first
        self.add_to_cart_button = page.locator(SELECTORS["add_to_cart"]).first
        self.price_label = page.locator('[class*="price"], .pdp-price').first

    def expect_loaded(self) -> None:
        self.page.wait_for_url(re.compile(r"products|-i\d+", re.I), timeout=45_000)
        self.dismiss_overlays()
        expect(self.product_title).to_be_visible(timeout=30_000)

    def expect_title_not_empty(self) -> None:
        title = self.product_title.text_content()
        assert title and title.strip()

    def expect_price_visible(self) -> None:
        expect(self.price_label).to_be_visible(timeout=20_000)

    def add_to_cart(self) -> None:
        self.dismiss_overlays()
        self.add_to_cart_button.scroll_into_view_if_needed()
        self.add_to_cart_button.click(timeout=20_000)

    def expect_add_to_cart_available(self) -> None:
        expect(self.add_to_cart_button).to_be_visible(timeout=25_000)
