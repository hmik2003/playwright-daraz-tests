import re

from playwright.sync_api import Page, expect

from fixtures.test_data import SELECTORS
from pages.base_page import BasePage


class HomePage(BasePage):
    def __init__(self, page: Page):
        super().__init__(page)
        self.search_input = page.locator(SELECTORS["search_input"]).first
        self.login_link = page.locator(SELECTORS["login_link"]).first

    def open(self) -> None:
        self.goto("/")
        self.dismiss_overlays()

    def expect_loaded(self) -> None:
        expect(self.page).to_have_url(re.compile(r"daraz\.pk"))
        expect(self.search_input).to_be_visible(timeout=30_000)

    def search(self, query: str) -> None:
        self.search_input.click()
        self.search_input.fill(query)
        self.search_input.press("Enter")
        try:
            self.page.wait_for_url(
                r".*(search|catalog|q=).*",
                timeout=45_000,
                wait_until="domcontentloaded",
            )
        except Exception:
            search_button = self.page.locator(SELECTORS["search_button"]).first
            try:
                if search_button.is_visible(timeout=3000):
                    search_button.click()
            except Exception:
                pass

    def open_login(self) -> None:
        self.login_link.click()

    def expect_logo_visible(self) -> None:
        logo_link = self.page.get_by_role(
            "link", name=re.compile(r"Online Shopping Daraz", re.IGNORECASE)
        )
        expect(logo_link).to_be_visible(timeout=20_000)
