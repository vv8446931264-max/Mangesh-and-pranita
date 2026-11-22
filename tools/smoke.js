// usage: node tools/smoke.js http://localhost:PORT/  -> cover flow, ?skip at 360px, reduced motion, desktop: errors + horizontal overflow
const { chromium, devices } = require('playwright');
(async () => {
  const base = process.argv[2]; const b = await chromium.launch(); const out = [];
  for (const [name, opts, q, click] of [['iphone', devices['iPhone 13'], '', true], ['skip-360', {viewport:{width:360,height:740}, isMobile:true, hasTouch:true}, '?skip', false],
       ['reduced', {...devices['iPhone 13'], reducedMotion:'reduce'}, '', true], ['desktop', {viewport:{width:1366,height:800}}, '', true]]) {
    const ctx = await b.newContext({ ...opts, deviceScaleFactor: 1 }); const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
    p.on('response', r => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
    await p.goto(base + q, { waitUntil: 'networkidle' });
    if (click) { await p.click('#openBtn'); await p.waitForTimeout(4000); }
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } });
    const st = await p.evaluate(() => ({ locked: document.documentElement.classList.contains('locked'), cover: !!document.getElementById('cover'), ok: window.__ok, overflowX: document.documentElement.scrollWidth - innerWidth, opened: M.isOpen }));
    out.push(`${name}: ${JSON.stringify(st)} errors=${JSON.stringify(errs)}`); await ctx.close();
  }
  console.log(out.join('\n')); await b.close();
})();
