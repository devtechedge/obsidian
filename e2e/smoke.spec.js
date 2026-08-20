import { test, expect } from '@playwright/test';

async function dismissPreloader(page) {
  await page.goto('/');
  await page.waitForFunction(() => {
    const el = document.getElementById('preloader');
    return !el || el.classList.contains('hidden');
  }, null, { timeout: 12_000 });
}

test('hero renders after preloader', async ({ page }) => {
  await dismissPreloader(page);
  await expect(page.locator('#hero')).toBeVisible();
  await expect(page.locator('#hero h1').first()).toContainText('The Obsidian');
});

test('theme toggle persists class on body', async ({ page }) => {
  await dismissPreloader(page);
  const toggle = page.locator('#themeToggle');
  await expect(toggle).toBeVisible();
  const before = await page.locator('body').evaluate((b) => b.classList.contains('theme-dark'));
  await toggle.click();
  await expect.poll(async () =>
    page.locator('body').evaluate((b) => b.classList.contains('theme-dark'))
  ).not.toBe(before);
});

test('command palette opens from the trigger', async ({ page }) => {
  await dismissPreloader(page);
  await page.locator('#cmdkTrigger').click();
  await expect(page.locator('#commandPalette')).toHaveClass(/open/);
  await expect(page.locator('#cmdkInput')).toBeVisible();
});

test('contact is a mailto link', async ({ page }) => {
  await dismissPreloader(page);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  const mail = page.locator('a[href^="mailto:studio@obsidianarchive.art"]');
  await expect(mail.first()).toBeVisible();
});

test('archive grid is present', async ({ page }) => {
  await dismissPreloader(page);
  await page.locator('#archive').scrollIntoViewIfNeeded();
  await expect(page.locator('#archive')).toBeVisible();
});
