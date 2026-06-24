import { expect } from '@playwright/test';
import { BasePage } from './base.page';
import { SELECTORS } from '../fixtures/test-data';

export class SearchResultsPage extends BasePage {
  private readonly productCards = this.page.locator(SELECTORS.productCard);

  private productLinks() {
    return this.page.locator('a[href*="/products/"], a[href*="-i"]');
  }

  async expectResultsLoaded() {
    const productLink = this.productLinks().first();
    await expect(productLink).toBeVisible({ timeout: 45_000 });
  }

  async expectMinimumResults(minCount: number) {
    const productLinks = this.productLinks();
    await expect(productLinks.first()).toBeVisible({ timeout: 45_000 });
    const count = await productLinks.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }

  async openFirstProduct() {
    const productLink = this.productLinks().first();
    await expect(productLink).toBeVisible({ timeout: 45_000 });
    await productLink.click();
  }

  async getResultCount(): Promise<number> {
    return this.productCards.count();
  }

  async expectSearchTermInUrl(term: string) {
    const normalized = term.replace(/\s+/g, '+').toLowerCase();
    await expect(this.page).toHaveURL(new RegExp(normalized.split('+')[0], 'i'), {
      timeout: 15_000,
    });
  }
}
