import { Page } from '@playwright/test';
import { BASE_URL } from '../fixtures/test-data';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/') {
    await this.page.goto(`${BASE_URL}${path}`, {
      waitUntil: 'domcontentloaded',
      timeout: 45_000,
    });
  }

  async dismissOverlays() {
    const closeButtons = this.page.locator(
      '[aria-label="Close"], .modal-close, button:has-text("×"), .next-dialog-close, .lazada-modal-close',
    );
    const count = await closeButtons.count();
    for (let i = 0; i < count; i++) {
      const btn = closeButtons.nth(i);
      if (await btn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await btn.click({ force: true }).catch(() => {});
        await this.page.waitForTimeout(300);
      }
    }
  }
}
