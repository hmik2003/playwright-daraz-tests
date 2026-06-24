import { expect } from '@playwright/test';
import { BasePage } from './base.page';
import { SELECTORS } from '../fixtures/test-data';

export class HomePage extends BasePage {
  private readonly searchInput = this.page.locator(SELECTORS.searchInput).first();
  private readonly loginLink = this.page.locator(SELECTORS.loginLink).first();

  async open() {
    await this.goto('/');
    await this.dismissOverlays();
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/daraz\.pk/);
    await expect(this.searchInput).toBeVisible({ timeout: 30_000 });
  }

  async search(query: string) {
    await this.searchInput.click();
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page
      .waitForURL(/search|catalog|q=/, { timeout: 45_000, waitUntil: 'domcontentloaded' })
      .catch(async () => {
        const searchButton = this.page.locator(SELECTORS.searchButton).first();
        if (await searchButton.isVisible({ timeout: 3000 }).catch(() => false)) {
          await searchButton.click();
        }
      });
  }

  async openLogin() {
    await this.loginLink.click();
  }

  async expectLogoVisible() {
    const logoLink = this.page.getByRole('link', { name: /Online Shopping Daraz/i });
    await expect(logoLink).toBeVisible({ timeout: 20_000 });
  }
}
