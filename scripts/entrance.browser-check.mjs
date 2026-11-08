// Run against `npm run dev -- --port 5199`, using an available Playwright installation.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const baseURL = process.env.TEST_URL || 'http://localhost:5199';
const output = process.env.SHOT_DIR;
if (output) await mkdir(output, { recursive: true });
const errors = [];
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
page.on('pageerror', (error) => errors.push(error.message));
const frame = () => page.evaluate(() => new Promise(requestAnimationFrame));
const seek = async (fraction) => {
  await page.evaluate((t) => {
    const el = document.querySelector('#entrance');
    const stage = el.querySelector('.entrance-sticky');
    window.scrollTo({ top: el.offsetTop + t * (el.offsetHeight - stage.offsetHeight), behavior: 'instant' });
  }, fraction);
  await frame(); await frame();
};
const shot = async (name) => {
  // Capture settled introductions, rather than transparent first animation frames.
  await page.evaluate(() => Promise.all(document.getAnimations().filter((animation) =>
    animation.playState === 'running' &&
    (animation instanceof CSSTransition ||
      (animation instanceof CSSAnimation && ['introUp', 'charRise', 'tDraw', 'tFade', 'tUnfurl', 'tBead'].includes(animation.animationName)))
  ).map((animation) => animation.finished.catch(() => {}))));
  if (output) await page.screenshot({ path: `${output}/${name}.png` });
};
try {
  await page.goto(baseURL);
  assert.equal(await page.locator('#entrance').count(), 1, 'scroll entrance exists');
  await page.locator('#entrance h1').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole('button', { name: 'Begin with music' }).waitFor();
  assert.equal(await page.getByRole('button', { name: 'Begin with music' }).getAttribute('aria-pressed'), 'false');
  await page.getByRole('button', { name: 'Begin with music' }).click();
  assert.equal(await page.getByRole('button', { name: 'Pause music', exact: true }).getAttribute('aria-pressed'), 'true');
  await page.getByRole('button', { name: 'Pause music', exact: true }).click();
  assert.equal(await page.locator('header').getAttribute('inert'), '', 'header cannot take focus over entrance');
  await shot('01-gate');
  await seek(0.17);
  assert.equal(await page.locator('.entrance-sticky').evaluate((el) => Math.round(el.getBoundingClientRect().top)), 0);
  await shot('02-doors');
  await seek(0.5);
  await page.getByRole('button', { name: 'Pause dance' }).waitFor();
  await page.waitForFunction(() => document.querySelector('.dance-video').currentTime > 1);
  await page.getByRole('button', { name: 'Pause dance' }).click();
  assert.equal(await page.locator('.dance-video').evaluate((v) => v.paused), true);
  const pausedAt = await page.locator('.dance-video').evaluate((v) => v.currentTime);
  await shot('03-dance');
  await seek(.36);
  await seek(.5);
  assert.equal(await page.getByRole('button', { name: 'Resume dance' }).count(), 1, 'explicit pause survives leaving the dance phase');
  assert.equal(await page.locator('.dance-video').evaluate((v, t) => v.paused && Math.abs(v.currentTime - t) < .05, pausedAt), true, 'playback position survives phase boundary');
  for (const t of [3, 5.5, 9.5]) {
    await page.locator('.dance-video').evaluate((v, time) => new Promise((done) => { v.addEventListener('seeked', done, { once: true }); v.currentTime = time; }), t);
    await shot(`dance-${t}`);
  }
  await page.getByRole('button', { name: 'Resume dance' }).click();
  await page.getByRole('button', { name: 'Skip dance' }).focus();
  await page.keyboard.press('Enter');
  await page.getByRole('link', { name: /Discover the celebrations/ }).waitFor();
  assert.equal(await page.evaluate(() => document.activeElement?.closest('.entrance-invitation') !== null), true, 'keyboard skip transfers focus to invitation');
  await shot('04-invitation');
  await page.getByRole('link', { name: /Discover the celebrations/ }).click();
  await page.waitForFunction(() => !document.querySelector('header').inert);
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('button', { name: 'Replay Entrance', exact: true }).click();
  await page.waitForFunction(() => window.scrollY < 5);
  await page.getByRole('button', { name: 'Begin with music' }).waitFor();
  await seek(0.5);
  await page.getByRole('button', { name: 'Pause dance' }).waitFor();
  // Let the real ~10s sequence finish (not a synthetic completion event).
  await page.getByRole('link', { name: /Discover the celebrations/ }).waitFor({ timeout: 14000 });
  await seek(0.17);
  assert.equal(await page.locator('.entrance-invitation').getAttribute('inert'), '');
  await seek(0);
  await seek(.5);
  await seek(.95);
  await seek(.5);
  assert.equal(await page.locator('.entrance-invitation').getAttribute('inert'), null, 'fast bypass stays completed until return to top');
  await seek(1);
  await page.evaluate(() => document.getElementById('home').scrollIntoView());
  await page.waitForFunction(() => !document.querySelector('header').inert);
  for (const hash of ['home', 'celebrations']) {
    await page.goto('about:blank');
    await page.goto(`${baseURL}/#${hash}`);
    await page.waitForFunction(() => !document.querySelector('header').inert, null, { timeout: 5000 });
    assert.ok(await page.evaluate(() => window.scrollY > 1000), `cold-load #${hash} reaches the section`);
  }
  for (const [width, height] of [[360,640], [844,390], [768,1024], [1280,800]]) {
    await page.setViewportSize({ width, height });
    await page.goto(baseURL);
    await seek(0);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}: no horizontal overflow`);
    const bounds = await page.getByRole('button', { name: 'Begin with music' }).boundingBox();
    assert.ok(bounds && bounds.y >= 0 && bounds.y + bounds.height <= height, `${width}: music control fits`);
    await shot(`gate-${width}`);
    await seek(0.95);
    const link = await page.getByRole('link', { name: /Discover the celebrations/ }).boundingBox();
    assert.ok(link && link.y >= 0 && link.y + link.height <= height, `${width}: invitation control fits`);
    await shot(`invite-${width}`);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(baseURL);
  assert.equal(await page.locator('.entrance-sticky').evaluate((el) => getComputedStyle(el).position), 'relative');
  assert.equal(await page.locator('.dance-video').count(), 0);
  await page.getByRole('link', { name: /Discover the celebrations/ }).waitFor();
  await shot('reduced');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await seek(.5);
  await page.getByRole('button', { name: 'Pause dance' }).waitFor();
  await page.getByRole('button', { name: 'Pause dance' }).focus();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => !document.querySelector('.dance-video'));
  await page.getByRole('link', { name: /Discover the celebrations/ }).waitFor();
  assert.equal(await page.evaluate(() => document.activeElement?.closest('.entrance-invitation') !== null), true, 'live reduced motion retains keyboard focus');
  assert.deepEqual(errors, []);
  console.log('Entrance browser checks passed: scroll, dance, pause, skip, finish, replay, deep link, 4 sizes, reduced motion.');
} finally {
  await browser.close();
}
