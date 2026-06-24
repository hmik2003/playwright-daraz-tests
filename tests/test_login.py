class TestDarazLoginPage:
    def test_should_navigate_to_login_and_display_form(self, home_page, login_page):
        home_page.open()
        home_page.open_login()
        login_page.expect_login_form_visible()
        login_page.expect_submit_button_visible()

    def test_should_show_password_field_when_applicable(self, home_page, login_page):
        home_page.open()
        home_page.open_login()
        login_page.expect_login_form_visible()
        login_page.expect_password_field_when_applicable()
