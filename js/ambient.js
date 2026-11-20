/* ---------- Ambient petals: three depth layers, 3D tumble, scroll-driven wind, marigolds, gold motes, tap puff ---------- */
(function () {
  const cv = $('dust');
  if (!cv) return;
  if (M.reduced) { cv.style.display = 'none'; return; }
  const c = cv.getContext('2d');
  let w = 0, h = 0;
  const size = () => { w = innerWidth; h = innerHeight; cv.width = w * DPR; cv.height = h * DPR; };
  size(); let lw = w;
  addEventListener('resize', () => { if (innerWidth !== lw) { lw = innerWidth; size(); } });   /* ignore URL-bar height jitter */

  const R = Math.random, TAU = Math.PI * 2;
  const PETAL = new Path2D('M0 -1C.85 -.9 1 .3 0 1C-1 .3 -.85 -.9 0 -1Z');
  const MARI = new Path2D();
  for (let k = 0; k < 8; k++) {
    const a = k * TAU / 8, cx = Math.cos(a) * .55, cy = Math.sin(a) * .55;
    MARI.moveTo(cx + .5 * Math.cos(a), cy + .5 * Math.sin(a)); MARI.ellipse(cx, cy, .5, .28, a, 0, TAU);
  }
  /* [front, back] colours: back face is a shade deeper, as a turned petal would be */
  const COLS = [['#f4a300', '#d98200'], ['#ff8a2b', '#e0661a'], ['#ff7aa8', '#e0557f'], ['#ffd23f', '#e8b020']];
  const LAYERS = [   /* depth, size, fall speed, alpha, count */
    { d: .35, r: [3, 4.5], vy: [.22, .4], a: .3, n: 13 },
    { d: .7, r: [5, 7], vy: [.45, .75], a: .42, n: 9 },
    { d: 1.2, r: [8, 11], vy: [.8, 1.25], a: .5, n: 4 }
  ];
  const scale = M.lite ? .5 : SMALL ? .65 : 1;
  const ps = [];
  const spawn = (p, init) => {
    p.x = R() * w; p.y = init ? R() * h : -24;
    return p;
  };
  LAYERS.forEach(L => {
    for (let i = 0, n = Math.round(L.n * scale); i < n; i++) {
      const r = L.r[0] + R() * (L.r[1] - L.r[0]);
      ps.push(spawn({ t: 0, L, r, vy: L.vy[0] + R() * (L.vy[1] - L.vy[0]), ph: R() * TAU, vph: .02 + R() * .03, rot: R() * TAU, vr: (R() - .5) * .02, sw: R() * TAU, col: COLS[(R() * 4) | 0] }, true));
    }
  });
  for (let i = 0, n = Math.round(3 * scale); i < n; i++)   /* marigolds */
    ps.push(spawn({ t: 1, L: LAYERS[1 + (i & 1)], r: 6 + R() * 3, vy: .5 + R() * .4, ph: R() * TAU, vph: .015 + R() * .02, rot: R() * TAU, vr: (R() - .5) * .012, sw: R() * TAU }, true));
  for (let i = 0, n = Math.round(10 * scale); i < n; i++)   /* gold motes */
    ps.push(spawn({ t: 2, L: LAYERS[i % 2], r: 1 + R() * 1.4, vy: -(.06 + R() * .12), ph: R() * TAU, vph: .8 + R() * 1.4, sw: R() * TAU }, true));
  ps.sort((a, b) => a.L.d - b.L.d);

  /* tap puff: short-lived petals thrown up from the point of the tap */
  const puffs = []; let lastPuff = 0;
  function puff(x, y) {
    const now = performance.now(); if (now - lastPuff < 220 || puffs.length > 14) return; lastPuff = now;
    const n = 5 + ((R() * 3) | 0);
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (R() - .5) * 2.2, s = 1.6 + R() * 2.4;
      puffs.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: 4 + R() * 3, ph: R() * TAU, vph: .08 + R() * .08, rot: R() * TAU, vr: (R() - .5) * .18, life: 0, max: 70 + R() * 40, col: COLS[(R() * 4) | 0] });
    }
  }
  const BLOCK = 'a,button,input,textarea,select,label,summary,[role=button],.scene,[data-scene],#timeline,.tcard,.cover,.snd,.np,.scrollcue';
  let down = null;
  addEventListener('pointerdown', e => { down = e.isPrimary && e.button < 1 ? { x: e.clientX, y: e.clientY, t: performance.now() } : null; }, { passive: true });
  addEventListener('pointerup', e => {
    if (!down || !M.isOpen) return;
    const d = down; down = null;
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 10 || performance.now() - d.t > 450) return;
    if (e.target.closest && e.target.closest(BLOCK)) return;
    const sel = getSelection && getSelection(); if (sel && sel.toString()) return;
    puff(e.clientX, e.clientY);
  }, { passive: true });

  let t = 0, prev = 0;
  const drawPetal = (p, x, y, cosv, alpha, rot) => {
    const front = cosv >= 0, k = Math.max(.1, Math.abs(cosv));
    c.setTransform(DPR, 0, 0, DPR, x * DPR, y * DPR);
    c.rotate(rot); c.scale(p.r * .62 * k, p.r);
    c.globalAlpha = alpha * (.55 + .45 * k); c.fillStyle = p.col[front ? 0 : 1]; c.fill(PETAL);
  };

  M.onFrame(S => {
    if (document.hidden) { prev = 0; return; }
    const now = performance.now(), dt = prev ? Math.min(3, (now - prev) / 16.67) : 1; prev = now;
    t += dt * .012;
    const vy = Math.max(-40, Math.min(40, S.vy));
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i], d = p.L.d;
      /* wind: scrolling down lifts the air a little and nudges it sideways */
      p.y += p.vy * dt - vy * .22 * d;
      p.x += (Math.sin(t * 40 * .06 + p.sw) * .28 + .1) * d * dt + vy * .09 * d;
      if (p.y > h + 28) { p.y = -24; p.x = R() * w; } else if (p.y < -28) { p.y = h + 24; p.x = R() * w; }
      if (p.x > w + 24) p.x = -20; else if (p.x < -24) p.x = w + 20;
      if (p.t === 2) {   /* mote: soft twinkle */
        const tw = .5 + .5 * Math.sin(t * 60 * p.vph + p.sw);
        c.setTransform(DPR, 0, 0, DPR, p.x * DPR, p.y * DPR);
        c.globalAlpha = .1 + .45 * tw; c.fillStyle = '#e8b830'; c.beginPath(); c.arc(0, 0, p.r * (.8 + .5 * tw), 0, TAU); c.fill();
        c.globalAlpha = .06 * tw; c.beginPath(); c.arc(0, 0, p.r * 3.4, 0, TAU); c.fill();
        continue;
      }
      p.ph += p.vph * dt; p.rot += p.vr * dt;
      const cs = Math.cos(p.ph);
      if (p.t === 1) {
        c.setTransform(DPR, 0, 0, DPR, p.x * DPR, p.y * DPR); c.rotate(p.rot); c.scale(p.r, p.r * (.4 + .6 * Math.abs(cs)));
        c.globalAlpha = p.L.a * .9; c.fillStyle = '#f4a300'; c.fill(MARI);
        c.globalAlpha = p.L.a; c.fillStyle = '#e8730c'; c.beginPath(); c.arc(0, 0, .22, 0, TAU); c.fill();
      } else drawPetal(p, p.x, p.y, cs, p.L.a, p.rot);
    }
    for (let i = puffs.length - 1; i >= 0; i--) {
      const q = puffs[i]; q.life += dt;
      if (q.life > q.max) { puffs.splice(i, 1); continue; }
      q.vx *= .985; q.vy = q.vy * .985 + .05 * dt; q.x += q.vx * dt; q.y += q.vy * dt; q.ph += q.vph * dt; q.rot += q.vr * dt;
      const f = q.life / q.max;
      drawPetal(q, q.x, q.y, Math.cos(q.ph), .75 * Math.min(1, (1 - f) * 2.5), q.rot);
    }
  });
})();
