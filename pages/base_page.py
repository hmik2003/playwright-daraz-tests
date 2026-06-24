from playwright.sync_api import Page

from fixtures.test_data import BASE_URL


class BasePage:
    def __init__(self, page: Page):
        self.page = page

    def goto(self, path: str = "/") -> None:
        self.page.goto(
            f"{BASE_URL}{path}",
            wait_until="domcontentloaded",
            timeout=45_000,
        )

    def dismiss_overlays(self) -> None:
        close_buttons = self.page.locator(
            '[aria-label="Close"], .modal-close, button:has-text("×"), '
            ".next-dialog-close, .lazada-modal-close"
        )
        count = close_buttons.count()
        for i in range(count):
            btn = close_buttons.nth(i)
            try:
                if btn.is_visible(timeout=1000):
                    btn.click(force=True)
                    self.page.wait_for_timeout(300)
            except Exception:
                pass
