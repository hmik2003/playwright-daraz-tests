import { Page } from '@playwright/test';

export async function waitForNetworkSettle(page: Page, timeoutMs = 3000) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle', { timeout: timeoutMs }).catch(() => {});
}

export function sanitizeSearchTerm(term: string): string {
  return term.trim().replace(/\s+/g, ' ');
}

export async function retryAction<T>(
  action: () => Promise<T>,
  retries = 2,
  delayMs = 1000,
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await action();
    } catch (error) {
      lastError = error;
      if (i < retries) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  throw lastError;
}
