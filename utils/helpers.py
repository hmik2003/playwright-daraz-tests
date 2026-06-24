import time
from collections.abc import Callable
from typing import TypeVar

from playwright.sync_api import Page

T = TypeVar("T")


def wait_for_network_settle(page: Page, timeout_ms: int = 3000) -> None:
    page.wait_for_load_state("domcontentloaded")
    try:
        page.wait_for_load_state("networkidle", timeout=timeout_ms)
    except Exception:
        pass


def sanitize_search_term(term: str) -> str:
    return " ".join(term.strip().split())


def retry_action(action: Callable[[], T], retries: int = 2, delay_ms: int = 1000) -> T:
    last_error: Exception | None = None
    for attempt in range(retries + 1):
        try:
            return action()
        except Exception as error:
            last_error = error
            if attempt < retries:
                time.sleep(delay_ms / 1000)
    raise last_error  # type: ignore[misc]
