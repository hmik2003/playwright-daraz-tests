from fixtures.test_data import SEARCH_TERMS


class TestDarazCart:
    def test_should_access_cart_page(self, cart_page):
        cart_page.navigate_to_cart()
        cart_page.expect_cart_page_loaded()

    def test_should_add_product_to_cart_from_product_page(
        self, home_page, search_results_page, product_page
    ):
        home_page.open()
        home_page.search(SEARCH_TERMS["laptop"])
        search_results_page.expect_results_loaded()
        search_results_page.open_first_product()
        product_page.expect_loaded()
        product_page.add_to_cart()
