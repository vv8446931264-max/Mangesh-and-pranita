// Visual + smoothness QA.  node tools/qa.js http://localhost:PORT/ OUTDIR
//  - opening.png : contact sheet of the cover opening, one frame every 200 ms (iPhone 13)
//  - page.png    : contact sheet of the page scrolled in viewport steps (?skip)
//  - timeline.png: the four timeline events
//  - prints frame-time stats while scrolling and during the opening at 4x CPU throttle
//    (a rough stand-in for a budget Android phone): p50/p95 frame ms and % of frames over 33 ms.
const { chromium, devices } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const [, , base, out = '/tmp/qa'] = process.argv;
fs.mkdirSync(out, { recursive: true });

const sheet = (files, name, cols = 5, scale = .5) => execFileSync('python3', ['-c', `
import sys
from PIL import Image
fs=sys.argv[3:]; cols=int(sys.argv[1]); s=float(sys.argv[2])
ims=[Image.open(f) for f in fs]; w,h=ims[0].size; tw,th=int(w*s),int(h*s)
rows=(len(ims)+cols-1)//cols; S=Image.new('RGB',(tw*cols,th*rows),'white')
for i,im in enumerate(ims): S.paste(im.convert('RGB').resize((tw,th)),((i%cols)*tw,(i//cols)*th))
S.save('${out}/${name}')`, String(cols), String(scale), ...files]);

const frameProbe = () => {
  window.__ft = []; let last = performance.now();
  const f = t => { window.__ft.push(t - last); last = t; if (window.__ft.length < 5000) requestAnimationFrame(f); };
  requestAnimationFrame(f);
};
const stats = a => {
  a = a.slice(2).sort((x, y) => x - y); if (!a.length) return 'n/a';
  const q = p => a[Math.min(a.length - 1, Math.floor(a.length * p))].toFixed(1);
  return `frames=${a.length} p50=${q(.5)}ms p95=${q(.95)}ms over33=${(100 * a.filter(x => x > 33).length / a.length).toFixed(1)}%`;
};

(async () => {
  const b = await chromium.launch();
  const errs = [];
  const mk = async (opts) => {
    const ctx = await b.newContext({ ...devices['iPhone 13'], deviceScaleFactor: 1, ...opts });
    const p = await ctx.newPage();
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
    return p;
  };

  // 1. opening sequence frames (no throttle, for visuals)
  let p = await mk();
  await p.goto(base, { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
  const of = [];
  await p.screenshot({ path: `${out}/o00.png` }); of.push(`${out}/o00.png`);
  await p.click('#openBtn');
  for (let i = 1; i <= 24; i++) { await p.waitForTimeout(200); const f = `${out}/o${String(i).padStart(2, '0')}.png`; await p.screenshot({ path: f }); of.push(f); }
  sheet(of, 'opening.png', 5, .5);
  await p.context().close();

  // 2. opening smoothness at 4x throttle
  p = await mk();
  await p.goto(base, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  let cdp = await p.context().newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.evaluate(frameProbe); await p.click('#openBtn'); await p.waitForTimeout(4500);
  console.log('opening @4x  ', stats(await p.evaluate(() => window.__ft)));
  await p.context().close();

  // 3. page sections + scroll smoothness at 4x throttle
  p = await mk();
  await p.goto(base + '?skip', { waitUntil: 'networkidle' }); await p.waitForTimeout(3000);
  const H = await p.evaluate(() => document.body.scrollHeight), vh = 664, pf = [];
  for (let y = 0, i = 0; y < H; y += vh - 80, i++) {
    await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(1600);
    const f = `${out}/p${String(i).padStart(2, '0')}.png`; await p.screenshot({ path: f }); pf.push(f);
  }
  sheet(pf, 'page.png', 5, .5);
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
  cdp = await p.context().newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.evaluate(frameProbe);
  for (let y = 0; y < H; y += 120) { await p.mouse.wheel(0, 120); await p.waitForTimeout(40); }
  console.log('scroll @4x   ', stats(await p.evaluate(() => window.__ft)));
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });

  // 4. timeline events
  const tf = [];
  await p.evaluate(() => document.getElementById('timeline').scrollIntoView({ block: 'start' })); await p.waitForTimeout(1200);
  for (let i = 0; i < 4; i++) {
    await p.evaluate(i => go(i), i); await p.waitForTimeout(2600);
    const f = `${out}/t${i}.png`; await p.screenshot({ path: f }); tf.push(f);
  }
  sheet(tf, 'timeline.png', 4, .6);
  await p.evaluate(frameProbe); await p.waitForTimeout(3000);
  console.log('scene idle   ', stats(await p.evaluate(() => window.__ft)));

  console.log('errors', JSON.stringify(errs));
  await b.close();
})();
