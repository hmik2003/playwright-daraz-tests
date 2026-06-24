import { expect } from '@playwright/test';
import { BasePage } from './base.page';
import { SELECTORS } from '../fixtures/test-data';

export class ProductPage extends BasePage {
  private readonly productTitle = this.page.locator(SELECTORS.productTitle).first();
  private readonly addToCartButton = this.page.locator(SELECTORS.addToCart).first();
  private readonly priceLabel = this.page.locator('[class*="price"], .pdp-price').first();

  async expectLoaded() {
    await this.page.waitForURL(/products|-i\d+/i, { timeout: 45_000 });
    await this.dismissOverlays();
    await expect(this.productTitle).toBeVisible({ timeout: 30_000 });
  }

  async expectTitleNotEmpty() {
    const title = await this.productTitle.textContent();
    expect(title?.trim().length).toBeGreaterThan(0);
  }

  async expectPriceVisible() {
    await expect(this.priceLabel).toBeVisible({ timeout: 20_000 });
  }

  async addToCart() {
    await this.dismissOverlays();
    await this.addToCartButton.scrollIntoViewIfNeeded();
    await this.addToCartButton.click({ timeout: 20_000 });
  }

  async expectAddToCartAvailable() {
    await expect(this.addToCartButton).toBeVisible({ timeout: 25_000 });
  }
}
