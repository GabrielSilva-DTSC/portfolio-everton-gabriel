import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import process from 'node:process';

const base = process.env.BASE_PATH || '/';

for (const width of [320, 1440]) {
  test(`fotos e galerias acessíveis sem JavaScript em ${width}px`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width, height: 900 } });
    const page = await context.newPage();
    for (const route of ['', 'projetos/ciape/']) {
      await page.goto(`http://127.0.0.1:4331${base}${route}`);
      const galleries = page.locator('.media-disclosure');
      for (const gallery of await galleries.all()) {
        const summary = gallery.locator('summary');
        await summary.focus();
        await page.keyboard.press('Enter');
        await expect(gallery).toHaveAttribute('open', '');
      }
      const images = page.locator('.media-figure img');
      expect(await images.count()).toBeGreaterThan(0);
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toBeVisible();
        await expect(image).toHaveAttribute('alt', /\S/);
        await image.evaluate((node: HTMLImageElement) => node.decode());
        const dimensions = await image.evaluate((node: HTMLImageElement) => {
          const rect = node.getBoundingClientRect();
          return { naturalWidth: node.naturalWidth, renderedRatio: rect.width / rect.height, sourceRatio: Number(node.getAttribute('width')) / Number(node.getAttribute('height')) };
        });
        expect(dimensions.naturalWidth).toBeGreaterThan(0);
        expect(Math.abs(dimensions.renderedRatio - dimensions.sourceRatio)).toBeLessThan(.015);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await context.close();
  });
}

test('acessibilidade das galerias abertas', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base);
  for (const summary of await page.locator('.media-disclosure summary').all()) {
    await summary.focus();
    await page.keyboard.press('Enter');
  }
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(accessibility.violations).toEqual([]);
});
