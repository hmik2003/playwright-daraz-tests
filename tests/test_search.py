import pytest

from fixtures.test_data import SEARCH_TERMS


@pytest.mark.smoke
class TestDarazSearch:
    @pytest.fixture(autouse=True)
    def setup(self, home_page):
        home_page.open()

    def test_should_search_for_phones_and_display_results(
        self, home_page, search_results_page
    ):
        home_page.search(SEARCH_TERMS["phone"])
        search_results_page.expect_results_loaded()
        search_results_page.expect_minimum_results(1)

    def test_should_search_for_laptops_and_display_results(
        self, home_page, search_results_page
    ):
        home_page.search(SEARCH_TERMS["laptop"])
        search_results_page.expect_results_loaded()
        search_results_page.expect_minimum_results(1)

    def test_should_reflect_search_term_in_url(self, home_page, search_results_page):
        home_page.search(SEARCH_TERMS["headphones"])
        search_results_page.expect_results_loaded()
        search_results_page.expect_search_term_in_url("wireless")
