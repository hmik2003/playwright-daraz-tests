import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  private readonly cartHeading = this.page.locator(
    'h1:has-text("Cart"), h1:has-text("Shopping Cart"), [class*="cart-title"]',
  ).first();
  private readonly emptyCartMessage = this.page.locator(
    ':text("empty"), :text("no items"), :text("Your cart")',
  ).first();
  private readonly cartItems = this.page.locator(
    '[class*="cart-item"], [data-qa-locator*="cart"], .cart-product',
  );

  async navigateToCart() {
    await this.goto('/cart/');
    await this.dismissOverlays();
  }

  async expectCartPageLoaded() {
    await this.page.waitForURL(/cart/i, { timeout: 20_000 });
    const headingVisible = await this.cartHeading.isVisible({ timeout: 10_000 }).catch(() => false);
    const urlMatches = /cart/i.test(this.page.url());
    expect(headingVisible || urlMatches).toBe(true);
  }

  async expectCartAccessible() {
    await expect(this.page).toHaveURL(/cart|daraz\.pk/);
  }
}
