import pytest

from pages.cart_page import CartPage
from pages.home_page import HomePage
from pages.login_page import LoginPage
from pages.product_page import ProductPage
from pages.search_results_page import SearchResultsPage


@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        "base_url": "https://www.daraz.pk",
        "locale": "en-PK",
        "timezone_id": "Asia/Karachi",
        "extra_http_headers": {"Accept-Language": "en-PK,en;q=0.9"},
    }


@pytest.fixture
def home_page(page):
    return HomePage(page)


@pytest.fixture
def search_results_page(page):
    return SearchResultsPage(page)


@pytest.fixture
def product_page(page):
    return ProductPage(page)


@pytest.fixture
def login_page(page):
    return LoginPage(page)


@pytest.fixture
def cart_page(page):
    return CartPage(page)
