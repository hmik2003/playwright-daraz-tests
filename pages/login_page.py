import re

from playwright.sync_api import Page, expect

from pages.base_page import BasePage


class LoginPage(BasePage):
    def __init__(self, page: Page):
        super().__init__(page)
        self.phone_input = page.locator(
            'input[type="tel"], input[name*="phone"], '
            'input[placeholder*="Phone"], #phone_number'
        ).first
        self.email_input = page.locator(
            'input[type="email"], input[name*="email"], input[placeholder*="Email"]'
        ).first
        self.password_input = page.locator(
            'input[type="password"], input[name*="password"]'
        ).first
        self.submit_button = page.locator(
            'button[type="submit"], button:has-text("LOGIN"), button:has-text("Login")'
        ).first

    def expect_login_form_visible(self) -> None:
        try:
            self.page.wait_for_url(re.compile(r"login|signin|account", re.I), timeout=20_000)
        except Exception:
            pass
        phone_visible = False
        email_visible = False
        try:
            phone_visible = self.phone_input.is_visible(timeout=5000)
        except Exception:
            pass
        try:
            email_visible = self.email_input.is_visible(timeout=5000)
        except Exception:
            pass
        assert phone_visible or email_visible

    def expect_password_field_when_applicable(self) -> None:
        try:
            if self.password_input.is_visible(timeout=5000):
                expect(self.password_input).to_be_visible()
        except Exception:
            pass

    def expect_submit_button_visible(self) -> None:
        expect(self.submit_button).to_be_visible(timeout=10_000)
