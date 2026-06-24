import pytest
from playwright.sync_api import Page, expect

from fixtures.test_data import SELECTORS


@pytest.mark.smoke
class TestDarazHomepage:
    @pytest.fixture(autouse=True)
    def setup(self, home_page):
        home_page.open()

    def test_should_load_homepage_successfully(self, home_page):
        home_page.expect_loaded()

    def test_should_display_daraz_logo_link_in_header(self, home_page):
        home_page.expect_logo_visible()

    def test_should_have_search_bar_visible(self, page: Page):
        search_input = page.locator(SELECTORS["search_input"]).first
        expect(search_input).to_be_visible(timeout=20_000)
