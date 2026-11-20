/* ---------- Share ---------- */
$('share').addEventListener('click', async () => {
  const url = location.origin + location.pathname, title = `${C.groom} & ${C.bride} \u2022 Wedding Invitation`;   /* never forward someone else's ?to= name */
  if (navigator.share){ try { await navigator.share({title, text:title, url}); } catch(e){} return; }
  open('https://wa.me/?text=' + encodeURIComponent(`${title}\n${url}`), '_blank', 'noopener');
});
if (C.credits && C.credits.length){ $('credits').innerHTML = 'Music via Wikimedia Commons: ' + C.credits.join(' \u2022 ');   /* our own config strings, so HTML (links) is fine */ $('credits').hidden = false; }

/* ---------- Countdown: split-flap cards ---------- */
const target = dOf(lag).getTime();
const flips = {};
['d','h','m','s'].forEach(id => {
  const el = $(id);
  el.innerHTML = '<span class="u"><em></em></span><span class="l"><em></em></span><span class="fu"><em></em></span><span class="fl"><em></em></span>';
  flips[id] = { el, v: null, t: 0, u: el.children[0].firstChild, l: el.children[1].firstChild, fu: el.children[2].firstChild, fl: el.children[3].firstChild };
  if (id !== 's'){ const sr = document.createElement('span'); sr.className = 'sr'; el.parentNode.appendChild(sr); flips[id].sr = sr; flips[id].lab = el.nextElementSibling.textContent; }
  else el.parentNode.setAttribute('aria-hidden', 'true');
  el.setAttribute('aria-hidden', 'true');
});
function setFlip(id, v){
  const f = flips[id]; v = String(v); if (f.v === v) return;
  const old = f.v; f.v = v;
  if (f.sr) f.sr.textContent = v + ' ' + f.lab;
  clearTimeout(f.t); f.el.classList.remove('go');
  if (old === null || M.reduced || document.hidden){ f.u.textContent = f.l.textContent = v; return; }
  f.u.textContent = v; f.fu.textContent = old; f.fl.textContent = v; f.l.textContent = old;
  void f.el.offsetWidth; f.el.classList.add('go');
  f.t = setTimeout(() => { f.l.textContent = v; f.el.classList.remove('go'); }, 620);
}
(function tick(){
  const t = Math.max(0, target - Date.now());
  setFlip('d', Math.floor(t/864e5));
  setFlip('h', String(Math.floor(t/36e5)%24).padStart(2,'0'));
  setFlip('m', String(Math.floor(t/6e4)%60).padStart(2,'0'));
  setFlip('s', String(Math.floor(t/1e3)%60).padStart(2,'0'));
  setTimeout(tick, 1000);
})();
/* ======================= v4 motion: sections ======================= */
(function(){
  const $q = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const R = M.reduced;

  /* ---- tap ripple on buttons and contact cards ---- */
  if (!R) document.addEventListener('pointerdown', e => {
    const t = e.target.closest && e.target.closest('.btn,.contact');
    if (!t || t.disabled) return;
    const b = t.getBoundingClientRect(), s = document.createElement('span');
    s.className = 'rip'; s.style.left = (e.clientX - b.left) + 'px'; s.style.top = (e.clientY - b.top) + 'px';
    s.style.setProperty('--r', Math.max(b.width, b.height) * 2.2 / 20);
    t.appendChild(s); s.addEventListener('animationend', () => s.remove());
  }, { passive: true });

  /* ---- calendar rows slide in ---- */
  const cal = $('cal');
  if (!R && cal) { cal.classList.add('pre'); M.onView(cal, () => cal.classList.remove('pre'), { threshold: .3 }); }

  /* ---- venue map: trees and buildings pop, route draws, pin drops, then pulse + tag ---- */
  const mc = $('dir');
  if (mc) {
    let i = 0;
    $$('#mapTrees circle,#mapLawn circle,#mapBld rect').forEach(el => { el.classList.add('tr'); el.style.setProperty('--i', i++); });
    if (!R) {
      mc.classList.add('pre');
      M.onView(mc, () => {
        mc.classList.add('go'); mc.classList.remove('pre');
        setTimeout(() => mc.classList.add('done'), 4200);
      }, { threshold: .4 });
    }
  }

  /* ---- couple showcase: Ken Burns, tilt + glare, sparkles, quote ---- */
  const tilt = $q('.cs-tilt');
  if (tilt) {
    const frame = $q('.cs-frame', tilt), n = M.lite ? 4 : 7;
    for (let k = 0; k < n; k++) {      /* sparkles ride the arch: left edge, crown, right edge */
      const a = Math.PI * (k + .5) / n, s = document.createElement('span');
      s.className = 'cs-sp';
      s.style.left = (50 - 56 * Math.cos(a)) + '%'; s.style.top = (46 - 40 * Math.sin(a) + (k % 2) * 6) + '%';
      s.style.setProperty('--z', (15 + (k * 5) % 10) + 'px'); s.style.setProperty('--dl', (k * .83 % 3.2).toFixed(2) + 's');
      tilt.appendChild(s);
    }
    if (!R) {
      let off = null, tx = 0, ty = 0;
      const step = (S, P) => {
        const r = tilt.getBoundingClientRect(), sy = M.clamp((r.top + r.height / 2 - S.h / 2) / S.h, -1, 1);
        const ry = P.x * 5, rx = -P.y * 4 - sy * 2;
        if (Math.abs(ry - tx) + Math.abs(rx - ty) > .01) {
          tx = ry; ty = rx;
          tilt.style.transform = `perspective(900px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg)`;
          frame.style.setProperty('--gx', (P.x * 60 + sy * 90 + 90).toFixed(1) + '%');
        }
      };
      M.onView(tilt, (el, vis) => {
        tilt.classList.toggle('live', vis);
        if (vis && !off) off = M.onFrame(step); else if (!vis && off) { off(); off = null; }
      }, { once: false, threshold: .05, rootMargin: '0px' });
    } else tilt.classList.add('live');
  }
  [$q('.cs-quote'), $q('.cs-quote-en')].forEach((q, k) => {
    if (!q) return;
    M.splitText(q, 'word');
    if (R) return;
    q.classList.add('pre');
    M.onView(q, () => setTimeout(() => q.classList.remove('pre'), k * 700), { threshold: .6, rootMargin: '0px 0px -12% 0px' });
  });

  /* ---- finale: sky lanterns, turning ring, sign-off ink, blessing ---- */
  const ft = $q('footer');
  if (ft) {
    const box = document.createElement('div'); box.className = 'lanterns'; box.setAttribute('aria-hidden', 'true');
    const n = M.lite ? 4 : 7;
    for (let k = 0; k < n; k++) {
      const l = document.createElement('div'); l.className = 'lt';
      const w = 15 + (k * 7) % 11;
      l.style.cssText = `--x:${(8 + (k * 37) % 84)}%;--w:${w}px;--t:${(15 + (k * 3) % 7)}s;--dl:${(-k * 2.9).toFixed(1)}s;--dx:${((k % 2) ? 1 : -1) * (14 + (k * 9) % 30)}px`;
      l.appendChild(document.createElement('i')); box.appendChild(l);
    }
    ft.insertBefore(box, ft.firstChild);
    const setRise = () => ft.style.setProperty('--rise', -(ft.offsetHeight + 80) + 'px'); setRise(); addEventListener('resize', setRise, { passive: true });
    [['.ft-photo', 0], ['footer > p.mr', .35], ['footer > p.mr + p', .65], ['#blessings', 3.3]].forEach(([s, d]) => {
      const e = $q(s); if (e) { e.classList.add('fx'); e.style.setProperty('--d', d + 's'); }
    });
    if (!R) ft.classList.add('pre');
    M.onView(ft, (el, vis) => {
      ft.classList.toggle('live', vis);
      if (vis && ft.classList.contains('pre')) { ft.classList.add('go'); ft.classList.remove('pre'); }
    }, { once: false, threshold: .25, rootMargin: '0px' });
  }
})();
window.__ok = true;
