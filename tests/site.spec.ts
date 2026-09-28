import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import process from 'node:process';

const base = process.env.BASE_PATH || '/';
const routes = ['', 'projetos/ciape/', 'projetos/bi-para-ong/', 'projetos/iniciacao-cientifica/', '404.html'];

for (const width of [320, 390, 768, 1440]) {
  test(`páginas sem transbordamento e recursos válidos em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('404.html')) errors.push(`${response.status()} ${response.url()}`); });
    for (const route of routes) {
      await page.goto(`${base}${route}`);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await page.locator('html').getAttribute('lang')).toBe('pt-BR');
    }
    expect(errors).toEqual([]);
  });
}

for (const route of routes) {
  test(`acessibilidade WCAG na rota ${route || 'início'}`, async ({ page }) => {
    await page.goto(`${base}${route}`);
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(accessibility.violations).toEqual([]);
  });
}

test('menu móvel, teclado, âncora ativa e Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base);
  const button = page.getByRole('button', { name: 'Menu' });
  const nav = page.getByRole('navigation', { name: 'Navegação principal' });
  await expect(nav).toBeHidden();
  await page.keyboard.press('Tab');
  await expect(page.getByText('Pular para o conteúdo')).toBeFocused();
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(nav).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
  await expect(button).toBeFocused();
  await button.click();
  await nav.getByRole('link', { name: 'Projetos', exact: true }).click();
  await expect(page).toHaveURL(/#projetos$/);
  await expect(nav).toBeHidden();
  await expect(page.locator('[data-section="projetos"]')).toHaveAttribute('aria-current', 'location');
  await button.click();
  const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(accessibility.violations).toEqual([]);
});

test('conteúdo e navegação continuam disponíveis sem JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 800 } });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4331${base}`);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.locator('.project-info').getByRole('link', { name: 'CIAPE' }).click();
  await expect(page.locator('h1')).toHaveText('CIAPE');
  await context.close();
});

test('movimento reduzido e todos os destinos internos válidos', async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const checked = new Set<string>();
  for (const route of routes) {
    await page.goto(`${base}${route}`);
    expect(await page.locator('h1').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
    const links = await page.locator('a').evaluateAll(nodes => nodes.map(node => ({ href: (node as HTMLAnchorElement).href, raw: node.getAttribute('href') })));
    for (const link of links) {
      expect(link.raw).toBeTruthy();
      expect(link.raw).not.toBe('#');
      const url = new URL(link.href);
      if (url.origin !== 'http://127.0.0.1:4331') continue;
      expect(url.pathname.startsWith(base)).toBe(true);
      if (url.pathname === new URL(page.url()).pathname && url.hash) {
        await expect(page.locator(url.hash)).toHaveCount(1);
      }
      if (!checked.has(url.pathname)) {
        expect((await request.get(url.pathname)).ok()).toBe(true);
        checked.add(url.pathname);
      }
    }
  }
});
