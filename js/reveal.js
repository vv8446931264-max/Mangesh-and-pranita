/* ---------- Reveal ---------- */
const rio = new IntersectionObserver(es => es.forEach(x => {
  if (!x.isIntersecting) return; const el = x.target; el.classList.add('show'); rio.unobserve(el);
  setTimeout(() => el.style.transitionDelay = '', 1800);
}), {threshold:.08, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('section,footer').forEach(s => s.querySelectorAll('.rv,.rv-left,.rv-right,.rv-scale').forEach((el,i) => { el.style.transitionDelay = (i%5)*.1 + 's'; }));
document.querySelectorAll('.rv,.rv-left,.rv-right,.rv-scale').forEach(el => rio.observe(el));

/* ---------- Section in-view class for separator animations ---------- */
const sio = new IntersectionObserver(es => es.forEach(x => {
  if (x.isIntersecting) x.target.classList.add('in-view');
}), {threshold:.15});
document.querySelectorAll('section').forEach(s => sio.observe(s));

/* ---------- Subtle parallax float on scroll ---------- */
const prlxEls = document.querySelectorAll('.cs-frame,.portrait-wrap,.mapcard');
if (prlxEls.length && !window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
  let ticking = false;
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => {
    const vh = window.innerHeight;
    prlxEls.forEach(el => { const r = el.getBoundingClientRect(); const pct = (r.top + r.height/2 - vh/2) / vh; el.style.transform = 'translateY(' + (pct * -12) + 'px)'; });
    ticking = false;
  }); } }, {passive:true});
}
