import pytest

from fixtures.test_data import SEARCH_TERMS


class TestDarazProductPage:
    @pytest.fixture(autouse=True)
    def setup(self, home_page, search_results_page):
        home_page.open()
        home_page.search(SEARCH_TERMS["phone"])
        search_results_page.expect_results_loaded()
        search_results_page.open_first_product()

    def test_should_load_product_detail_page(self, product_page):
        product_page.expect_loaded()

    def test_should_display_product_title(self, product_page):
        product_page.expect_loaded()
        product_page.expect_title_not_empty()

    def test_should_display_product_price(self, product_page):
        product_page.expect_loaded()
        product_page.expect_price_visible()

    def test_should_show_add_to_cart_button(self, product_page):
        product_page.expect_loaded()
        product_page.expect_add_to_cart_available()
