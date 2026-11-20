/* ---------- Scroll choreography: reveals, ornaments, progress line, parallax (see MOTION.md) ---------- */
(function () {
  const root = document.documentElement;
  const SEL = '.rv,.rv-left,.rv-right,.rv-scale';
  const skip = el => el.closest('header.hero,.cover,[data-own-reveal]');
  const inTl = el => el.closest('#timeline,.tcard');

  /* ---- 1. Ornamental divider at the top of every content section: lines draw, lotus blooms ---- */
  const ORN = '<svg class="orn" viewBox="0 0 220 30" aria-hidden="true" focusable="false">' +
    '<path class="ln" pathLength="1" d="M88 16C70 16 62 13 44 13S24 16 10 16"/>' +
    '<path class="ln" pathLength="1" d="M132 16C150 16 158 13 176 13S196 16 210 16"/>' +
    '<path class="ln l2" pathLength="1" d="M92 21H60M128 21H160"/>' +
    '<circle class="dot" cx="5" cy="16" r="1.6"/><circle class="dot" cx="215" cy="16" r="1.6"/>' +
    ['-58 0', '58 0', '-30 1', '30 1', '0 2'].map(s => { const [a, k] = s.split(' ');
      return `<path class="pt k${k}" style="--a:${a}deg;--k:${k}" d="M110 24C104 19 104 10 110 3C116 10 116 19 110 24Z"/>`; }).join('') +
    '<path class="ln base" pathLength="1" d="M99 25.5Q110 29 121 25.5"/></svg>';
  const orns = [];
  document.querySelectorAll('section').forEach(s => {
    if (s.hasAttribute('data-own-reveal') || s.closest('header.hero,#timeline,.tcard')) return;
    s.insertAdjacentHTML('afterbegin', ORN); orns.push(s.firstElementChild);
  });
  document.querySelectorAll('section').forEach(s => M.onView(s, () => s.classList.add('in-view'), { threshold: .1 }));

  if (M.reduced) return;   /* reduced motion: everything stays put and visible (css/scroll.css) */
  root.classList.add('rvjs'); if (M.lite) root.classList.add('rv-lite');
  orns.forEach(o => M.onView(o, () => o.classList.add('on'), { threshold: .6, rootMargin: '0px 0px -6% 0px' }));

  /* ---- 2. Headings: words rise and un-blur (split lazily: some headings are filled in by main.js) ---- */
  const heads = [...document.querySelectorAll('section > .eyebrow, section > h2')]
    .filter(el => !skip(el) && !inTl(el) && !el.classList.contains('goldtxt'));
  heads.forEach(el => { el.classList.remove('rv', 'rv-left', 'rv-right', 'rv-scale'); el.classList.add('rvs'); });

  /* ---- 3. Everything else: batch by arrival so siblings come in reading order ---- */
  const items = [...heads, ...document.querySelectorAll(SEL)].filter(el => !skip(el));
  const uniq = [...new Set(items)];
  const io = new IntersectionObserver(es => {
    let i = 0;
    es.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top).forEach(e => {
      const el = e.target; io.unobserve(el);
      if (el.classList.contains('rvs')) M.splitText(el, 'word');
      el.style.setProperty('--rv-d', Math.min(i++, 6) * 80 + 'ms');
      el.classList.add('show');
    });
  }, { threshold: .1, rootMargin: '0px 0px -7% 0px' });
  uniq.forEach(el => io.observe(el));

  /* ---- 4. Scroll progress: a thin gold line with a marigold head, shown once the invitation opens ---- */
  const bar = document.createElement('div');
  bar.className = 'sprog'; bar.setAttribute('aria-hidden', 'true');
  bar.innerHTML = '<i class="sp-line"></i><i class="sp-head"></i>';
  document.body.appendChild(bar);
  const line = bar.firstChild, head = bar.lastChild; let lastP = -1, vw = innerWidth;
  addEventListener('resize', () => { vw = innerWidth; lastP = -1; }, { passive: true });
  M.opened(() => requestAnimationFrame(() => bar.classList.add('on')));
  M.onFrame(S => {
    if (Math.abs(S.p - lastP) < .0004) return; lastP = S.p;
    line.style.transform = 'scaleX(' + S.p.toFixed(4) + ')';
    head.style.transform = 'translate3d(' + (S.p * vw).toFixed(1) + 'px,0,0)';
  });

  /* ---- 5. Parallax: `translate` (composes with other agents' transforms), only on-screen, <= 10 px.
     Desktop only: on phones moving these cards repaints them (one holds the animated welcome scene) every
     frame of a scroll, which costs far more smoothness than a 10 px drift is worth (measured). ---- */
  const par = M.touch ? [] : [...document.querySelectorAll('.glass,.couple-showcase,.count,.contacts')]
    .filter(el => !skip(el) && !inTl(el)).map(el => ({ el, top: 0, h: 0, cur: 0, amp: el.matches('.glass') ? 8 : 10 }));
  const measure = () => par.forEach(p => { const r = p.el.getBoundingClientRect(); p.top = r.top + scrollY - p.cur; p.h = r.height; });
  if (par.length) {
    measure(); addEventListener('resize', measure, { passive: true }); addEventListener('load', measure);
    [1500, 4000].forEach(t => setTimeout(measure, t)); M.opened(() => setTimeout(measure, 300));
    M.onFrame(S => {
      par.forEach(p => {
        const n = (p.top + p.h / 2 - S.y - S.h / 2) / S.h;
        if (n > 1.2 || n < -1.2) return;
        const next = p.cur + (M.clamp(n, -1, 1) * -p.amp - p.cur) * .12;
        if (Math.abs(next - p.cur) < .015) return;
        p.cur = next; p.el.style.translate = '0 ' + next.toFixed(2) + 'px';
      });
    });
  }
})();
