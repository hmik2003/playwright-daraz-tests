import re

from playwright.sync_api import Page, expect

from fixtures.test_data import SELECTORS
from pages.base_page import BasePage


class SearchResultsPage(BasePage):
    def __init__(self, page: Page):
        super().__init__(page)
        self.product_cards = page.locator(SELECTORS["product_card"])

    def _product_links(self):
        return self.page.locator('a[href*="/products/"], a[href*="-i"]')

    def expect_results_loaded(self) -> None:
        product_link = self._product_links().first
        expect(product_link).to_be_visible(timeout=45_000)

    def expect_minimum_results(self, min_count: int) -> None:
        product_links = self._product_links()
        expect(product_links.first).to_be_visible(timeout=45_000)
        count = product_links.count()
        assert count >= min_count

    def open_first_product(self) -> None:
        product_link = self._product_links().first
        expect(product_link).to_be_visible(timeout=45_000)
        product_link.click()

    def get_result_count(self) -> int:
        return self.product_cards.count()

    def expect_search_term_in_url(self, term: str) -> None:
        normalized = term.replace(" ", "+").lower()
        pattern = re.compile(normalized.split("+")[0], re.IGNORECASE)
        expect(self.page).to_have_url(pattern, timeout=15_000)
