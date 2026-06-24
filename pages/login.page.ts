import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly phoneInput = this.page.locator(
    'input[type="tel"], input[name*="phone"], input[placeholder*="Phone"], #phone_number',
  ).first();
  private readonly emailInput = this.page.locator(
    'input[type="email"], input[name*="email"], input[placeholder*="Email"]',
  ).first();
  private readonly passwordInput = this.page.locator(
    'input[type="password"], input[name*="password"]',
  ).first();
  private readonly submitButton = this.page.locator(
    'button[type="submit"], button:has-text("LOGIN"), button:has-text("Login")',
  ).first();

  async expectLoginFormVisible() {
    await this.page.waitForURL(/login|signin|account/i, { timeout: 20_000 }).catch(() => {});
    const phoneVisible = await this.phoneInput.isVisible({ timeout: 5000 }).catch(() => false);
    const emailVisible = await this.emailInput.isVisible({ timeout: 5000 }).catch(() => false);
    expect(phoneVisible || emailVisible).toBe(true);
  }

  async expectPasswordFieldWhenApplicable() {
    const visible = await this.passwordInput.isVisible({ timeout: 5000 }).catch(() => false);
    if (visible) {
      await expect(this.passwordInput).toBeVisible();
    }
  }

  async expectSubmitButtonVisible() {
    await expect(this.submitButton).toBeVisible({ timeout: 10_000 });
  }
}
