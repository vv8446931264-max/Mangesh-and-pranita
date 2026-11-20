/* ===================================================================
   Motion kit: one shared vocabulary for every animation on the page.
   See MOTION.md. Everything here is cheap: one rAF loop for scroll/pointer,
   one IntersectionObserver per call site, transforms and opacity only.
   =================================================================== */
const M = (() => {
  const mq = q => (window.matchMedia ? matchMedia(q).matches : false);
  const reduced = mq('(prefers-reduced-motion: reduce)');
  const touch = mq('(hover: none)') || 'ontouchstart' in window;
  const cores = navigator.hardwareConcurrency || 4, mem = navigator.deviceMemory || 4;
  /* "lite": low-end phones get fewer particles and no blur filters */
  const lite = reduced || cores <= 4 || mem <= 2 || innerWidth < 360;

  /* ---- easing (same curves as the CSS tokens in style.css) ---- */
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const E = {
    out: t => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),                       /* expo-out: arrivals */
    inOut: t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),  /* cubic in-out: moves */
    in: t => t * t * t,                                                       /* departures */
    back: t => { const c = 1.6; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
    /* damped spring, settles by t = 1 */
    spring: t => (t >= 1 ? 1 : 1 - Math.exp(-6.5 * t) * Math.cos(t * 13))
  };

  /* ---- tween: rAF-driven 0..1 progress, returns a promise; reduced motion jumps to the end ---- */
  function tween(ms, fn, ease = E.out, delay = 0) {
    return new Promise(res => {
      if (reduced || ms <= 0) { fn(1, 1); return res(); }
      let t0 = 0;
      const f = now => {
        if (!t0) t0 = now + delay;
        const k = clamp((now - t0) / ms);
        if (now >= t0) fn(ease(k), k);
        k < 1 ? requestAnimationFrame(f) : res();
      };
      requestAnimationFrame(f);
    });
  }

  /* ---- onView: run cb when el enters the viewport (once by default) ---- */
  function onView(el, cb, o = {}) {
    if (!el) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { cb(e.target, true); if (o.once !== false) io.unobserve(e.target); }
      else if (o.once === false) cb(e.target, false);
    }), { threshold: o.threshold ?? .15, rootMargin: o.rootMargin || '0px 0px -8% 0px' });
    (el.length !== undefined ? [...el] : [el]).forEach(x => io.observe(x));
    return io;
  }

  /* ---- splitText: wrap words (and, for Latin text, letters) in spans with --i for staggering.
     Devanagari is only ever split into WORDS: splitting letters breaks conjuncts and matras. ---- */
  const DEV = /[ऀ-ॿ]/;
  function splitText(el, by = 'word') {
    if (!el || el.dataset.split) return el;
    const text = el.textContent;
    el.dataset.split = by; el.setAttribute('aria-label', text.trim());
    let i = 0;
    const words = text.split(/(\s+)/);
    el.innerHTML = words.map(w => {
      if (!w.trim()) return w;
      if (by === 'char' && !DEV.test(w)) {
        return `<span class="sw" aria-hidden="true">${[...w].map(ch => `<span class="sc" style="--i:${i++}">${ch}</span>`).join('')}</span>`;
      }
      return `<span class="sw" aria-hidden="true"><span class="sc" style="--i:${i++}">${w}</span></span>`;
    }).join('');
    el.style.setProperty('--n', i);
    return el;
  }

  /* ---- one shared frame loop for scroll + pointer driven effects ---- */
  const S = { y: scrollY, vy: 0, h: innerHeight, max: 1, p: 0 };      /* p: page progress 0..1, vy: smoothed px/frame */
  const P = { x: 0, y: 0, tx: 0, ty: 0 };                              /* pointer / tilt, -1..1, smoothed */
  const subs = new Set();
  let lastY = scrollY, running = false;
  const measure = () => { S.h = innerHeight; S.max = Math.max(1, document.documentElement.scrollHeight - S.h); };
  addEventListener('resize', measure, { passive: true });
  addEventListener('load', measure);
  function frame() {
    const y = scrollY;
    S.vy = lerp(S.vy, y - lastY, .2); lastY = y; S.y = y; S.p = clamp(y / S.max);
    P.x = lerp(P.x, P.tx, .08); P.y = lerp(P.y, P.ty, .08);
    subs.forEach(fn => fn(S, P));
    if (subs.size) requestAnimationFrame(frame); else running = false;
  }
  /* fn(scrollState, pointerState) runs every frame while subscribed; returns an unsubscribe */
  function onFrame(fn) {
    subs.add(fn); measure();
    if (!running) { running = true; requestAnimationFrame(frame); }
    return () => subs.delete(fn);
  }
  if (!reduced) {
    addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      P.tx = e.clientX / innerWidth * 2 - 1; P.ty = e.clientY / innerHeight * 2 - 1;
    }, { passive: true });
    /* phones: gentle tilt where the browser gives orientation without asking (Android) */
    addEventListener('deviceorientation', e => {
      if (e.gamma == null) return;
      P.tx = clamp(e.gamma / 25, -1, 1); P.ty = clamp((e.beta - 45) / 25, -1, 1);
    }, { passive: true });
  }

  /* ---- opening: the cover fires this once the doors have parted ---- */
  let isOpen = false;
  const openCbs = [];
  function opened(cb) { isOpen ? cb() : openCbs.push(cb); }
  function markOpen() {
    if (isOpen) return; isOpen = true;
    document.dispatchEvent(new Event('invite:open'));
    openCbs.splice(0).forEach(cb => { try { cb(); } catch (e) { console.error(e); } });
  }

  /* ---- stillness: every top-level block that is off screen gets .still, which pauses all CSS animation
     inside it (style.css). A running CSS animation anywhere makes the phone redo style/paint work every
     frame, so the page should only ever pay for what the guest can see. ---- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('still', !e.isIntersecting)),
      { rootMargin: '80px 0px' });
    document.querySelectorAll('body > header, body > section, body > footer, body > .tcard').forEach(b => io.observe(b));
  }

  return { reduced, touch, lite, E, clamp, lerp, tween, onView, splitText, onFrame, S, P, opened, markOpen,
           get isOpen() { return isOpen; } };
})();
