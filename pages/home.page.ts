import { expect } from '@playwright/test';
import { BasePage } from './base.page';
import { SELECTORS } from '../fixtures/test-data';

export class HomePage extends BasePage {
  private readonly searchInput = this.page.locator(SELECTORS.searchInput).first();
  private readonly logo = this.page.locator('img[alt*="Daraz"], .lzd-logo-content, [class*="logo"]').first();
  private readonly loginLink = this.page.locator(SELECTORS.loginLink).first();

  async open() {
    await this.goto('/');
    await this.dismissOverlays();
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/daraz\.pk/);
    await expect(this.searchInput).toBeVisible({ timeout: 20_000 });
  }

  async search(query: string) {
    await this.searchInput.click();
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async openLogin() {
    await this.loginLink.click();
  }

  async expectLogoVisible() {
    await expect(this.logo).toBeVisible({ timeout: 15_000 });
  }
}
