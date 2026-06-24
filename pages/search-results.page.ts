import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { SELECTORS } from '../fixtures/test-data';

export class SearchResultsPage extends BasePage {
  private readonly productCards = this.page.locator(SELECTORS.productCard);
  private readonly resultHeading = this.page.locator('h1, [class*="title"], .title--wrap').first();

  async expectResultsLoaded() {
    await this.page.waitForURL(/search|catalog|q=/, { timeout: 30_000 }).catch(() => {});
    await expect(this.productCards.first()).toBeVisible({ timeout: 25_000 });
  }

  async expectMinimumResults(minCount: number) {
    await expect(this.productCards).not.toHaveCount(0);
    const count = await this.productCards.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }

  async openFirstProduct() {
    const firstProduct = this.productCards.first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();
  }

  async getResultCount(): Promise<number> {
    return this.productCards.count();
  }

  async expectSearchTermInUrl(term: string) {
    const normalized = term.replace(/\s+/g, '+').toLowerCase();
    await expect(this.page).toHaveURL(new RegExp(normalized.split('+')[0], 'i'));
  }
}
