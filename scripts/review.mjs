import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  if (process.argv.includes('--photos')) {
    const folder = '/tmp/everton-site-review';
    await mkdir(folder, { recursive: true });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('http://127.0.0.1:4321/');
      await page.evaluate(() => document.fonts.ready);
      for (const img of await page.locator('.media-figure img:visible').all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(image => image.decode());
      }
      await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
      await page.screenshot({ path: `${folder}/abertura-fotos-${width}.png` });
      for (const [id, selector] of [['etec', '.admin-chapter'], ['comunidade', '#comunidade'], ['sobre', '#sobre']]) {
        await page.locator(selector).screenshot({ path: `${folder}/${id}-fotos-${width}.png`, style: '.site-header, .skip-link { visibility: hidden !important; }' });
      }
      console.log(JSON.stringify({ width, overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), folder }));
    }
  } else if (process.argv.includes('--external')) {
    const urls = process.argv.includes('--ciape') ? ['https://ciapemvp.streamlit.app/'] : ['https://ciapemvp.streamlit.app/', 'https://www.youtube.com/watch?v=q6y0X02nLXM', 'https://www.instagram.com/gremio_serra_do_mar/', 'https://www.instagram.com/cacdn.ufpb/'];
    for (const url of urls) {
      try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await page.waitForTimeout(5000);
        if (url.includes('ciapemvp.streamlit.app')) {
          const wake = page.getByRole('button', { name: 'Yes, get this app back up!' });
          if (await wake.isVisible()) {
            await wake.click();
            console.log('CIAPE: solicitada a abertura do app adormecido.');
            await page.waitForFunction(() => !document.body.innerText.includes('This app has gone to sleep') && document.body.innerText.length > 300, undefined, { timeout: 45000 }).catch(() => {});
            await page.waitForTimeout(8000);
          }
        }
        const frames = [];
        for (const frame of page.frames()) {
          const body = await frame.locator('body').innerText({ timeout: 12000 }).catch(() => 'Conteúdo indisponível.');
          frames.push({ url: frame.url(), body: body.slice(0, 14000) });
        }
        console.log(JSON.stringify({ requested: url, status: response?.status(), url: page.url(), title: await page.title(), frames }));
      } catch (error) { console.log(JSON.stringify({ url, error: error.message })); }
    }
  } else {
    const folder = '/tmp/everton-site-review';
    await mkdir(folder, { recursive: true });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('http://127.0.0.1:4321/');
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${folder}/inicio-${width}.png`, fullPage: true });
      await page.screenshot({ path: `${folder}/abertura-${width}.png` });
      console.log(JSON.stringify({ width, overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), screenshot: `${folder}/inicio-${width}.png` }));
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('http://127.0.0.1:4321/projetos/ciape/');
    await page.screenshot({ path: `${folder}/ciape-desktop.png`, fullPage: true });
  }
} finally { await browser.close(); }
