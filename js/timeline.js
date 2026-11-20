/* ===================================================================
   Timeline: one event card at a time
   =================================================================== */
const CAPS = {sakharpuda:'Just engaged', haldi:'Tap to throw haldi', lagna:'Antarpat \u2022 Varmala \u2022 Rings', saptapadi:'Seven rounds around the fire'};
const BED = {sakharpuda:'engage', haldi:'haldi', lagna:'lagna', saptapadi:'phere'};
const sceneHTML = id => `<div class="scene" data-scene="${id}"><svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"></svg><div class="cap">${CAPS[id] || ''}</div></div>`;
const evEl = [], stepEl = [], ctrl = {}, ghEl = [];
C.events.forEach((e,i) => {
  const num = String(i+1).padStart(2,'0');
  const sec = document.createElement('section');
  sec.className = 'event'; sec.id = 'ev-' + e.id;
  const extra = e.id === 'saptapadi'
    ? `<div class="phera"><b id="pcount">1</b><span class="of"> / 7</span><span class="vow" id="pvow"></span></div>` : '';
  sec.innerHTML = `
    <div class="ghost" aria-hidden="true">${num}</div>
    <div class="eyebrow">${num} &mdash; ${fmtD(e,{weekday:'long',day:'numeric',month:'long'})} &bull; ${whenOf(e)}</div>
    <h3 class="mr goldtxt">${e.mr}</h3>
    <div style="width:100%;display:flex;justify-content:center">${SCN[e.id] ? sceneHTML(e.id) : ''}</div>
    ${extra}
    <p>${e.text}</p>`;
  let k = 0; [...sec.children].forEach(ch => { if (!ch.classList.contains('ghost')) ch.style.setProperty('--k', k++); });   /* stagger order for the settle */
  $('events').appendChild(sec); evEl.push(sec); ghEl.push(sec.querySelector('.ghost'));
  const sc = sec.querySelector('.scene'); if (sc && SCN[e.id]) ctrl[e.id] = SCN[e.id](sc);

  const b = document.createElement('button');
  b.type = 'button'; b.className = 'step'; b.setAttribute('aria-label', `${e.en}, ${fmtD(e,{day:'numeric',month:'long'})}, ${whenOf(e)}`);
  b.innerHTML = `<span class="dot">${num}</span><b>${e.mr}</b><small>${fmtD(e,{day:'numeric',month:'short'})}<span class="tm"><br>${whenOf(e)}</span></small>`;
  b.addEventListener('click', () => go(i));
  $('steps').appendChild(b); stepEl.push(b);
});
$('track').style.left = $('track').style.right = (50 / C.events.length) + '%';


/* ---------------------------------------------------------------------------
   The deck. Every card has a position X[j] in card-widths (0 = centred, -1 / +1 = parked
   off to the left / right) and a velocity; each frame a spring pulls it to its target.
   Dragging writes X directly, releasing hands the finger's velocity to the springs, and a
   button press just changes the targets. So drag, flick, tap and rapid re-taps are all
   the same mechanism and can interrupt each other without ever stranding a card.
   --------------------------------------------------------------------------- */
const TONE = ['#ffeef0','#fff6cc','#ffe8e2','#ffeacf'];
const stageEl = $('events'), tcardEl = $('timeline'), NEV = evEl.length;
const SPR_K = 120, SPR_C = 21.5;                        /* ~0.8 s settle, a hair under critical damping */
const X = evEl.map(() => 1), V = evEl.map(() => 0), shown = evEl.map(() => false);
let cur = -1, inView = false, held = false, stageW = 360, trackW = 300, raf = 0, lastTs = 0, touched = false, hinting = false, hintAbort = false;
let prog = 0, progV = 0, progT = 0;
const tgt = j => j === cur ? 0 : (j < cur ? -1 : 1);
const sgn = v => v < 0 ? -1 : 1;
const fillEl = $('fill'), headEl = $('head');

function sync(j){                                       /* a scene only runs while its card is on screen and the timeline is in view */
  const c = ctrl[C.events[j].id]; if (c) (inView && shown[j]) ? c.start() : c.stop();
}
function pose(j){
  const x = X[j], a = Math.abs(x), el = evEl[j], gh = ghEl[j], vis = a < .995;
  if (vis !== shown[j]){ shown[j] = vis; el.style.visibility = vis ? 'visible' : 'hidden'; sync(j); }
  if (!vis) return;
  if (a < .0004){ el.style.transform = ''; el.style.opacity = ''; if (gh){ gh.style.transform = ''; gh.style.opacity = ''; } return; }
  if (M.reduced){
    el.style.transform = `translate3d(${(x*stageW*.9).toFixed(1)}px,0,0)`; el.style.opacity = (1 - a*.5).toFixed(3);
  } else {
    /* a card turning away on a hinge of perspective: slides, rotates, recedes and fades */
    el.style.transform = `translate3d(${(x*stageW*.8).toFixed(1)}px,0,${(-a*150).toFixed(1)}px) rotateY(${(x*32).toFixed(2)}deg) scale(${(1 - a*.05).toFixed(4)})`;
    el.style.opacity = (1 - Math.pow(a, 1.5)).toFixed(3);
    if (gh){ gh.style.transform = `translate(-50%,-50%) translate3d(${(-x*stageW*.14).toFixed(1)}px,0,0) scale(${(1 - .3*x).toFixed(3)})`; gh.style.opacity = Math.max(0, 1 - a*1.3).toFixed(3); }
  }
}
function paintProg(){
  const p = Math.max(0, Math.min(1, prog));
  fillEl.style.clipPath = `inset(0 ${((1-p)*100).toFixed(2)}% 0 0)`;
  headEl.style.transform = `translate3d(${(p*trackW).toFixed(1)}px,0,0)`;
  headEl.style.opacity = p < .004 ? 0 : 1;
}
function tick(ts){
  raf = 0; const dt = lastTs ? Math.min(.034, (ts - lastTs)/1000) : 1/60; lastTs = ts;
  let moving = held;
  const h = dt/2;
  if (!held) for (let j = 0; j < NEV; j++){
    const T = tgt(j); if (X[j] === T && !V[j]) continue;
    for (let s = 0; s < 2; s++){ V[j] += (-SPR_K*(X[j] - T) - SPR_C*V[j]) * h; X[j] += V[j] * h; }
    if (Math.abs(X[j] - T) < .0008 && Math.abs(V[j]) < .02){ X[j] = T; V[j] = 0; } else moving = true;
  }
  for (let s = 0; s < 2; s++){ progV += (-SPR_K*.9*(prog - progT) - SPR_C*.95*progV) * h; prog += progV * h; }
  if (Math.abs(prog - progT) < .0004 && Math.abs(progV) < .01){ prog = progT; progV = 0; } else moving = true;
  for (let j = 0; j < NEV; j++) pose(j);
  paintProg();
  if (moving) raf = requestAnimationFrame(tick); else { lastTs = 0; stageEl.classList.remove('mv'); }
}
function kick(){ stageEl.classList.add('mv'); if (!raf) raf = requestAnimationFrame(tick); }

/* ---- selection: classes, stepper, nav, tone, soundtrack, height ---- */
let settleTimer = 0;
function live(){
  evEl.forEach((_, j) => sync(j));
  const was = Aud.track; Aud.setBed(inView ? C.events[cur].id : 'main'); if (Aud.track !== was) nowPlaying();
}
function fitStage(){ stageEl.style.height = evEl[cur].offsetHeight + 'px'; }
function measure(){ stageW = stageEl.clientWidth || 360; trackW = $('track').offsetWidth || 300; fitStage(); paintProg(); }
function select(i, o = {}){
  i = Math.max(0, Math.min(NEV-1, i)); if (i === cur) return false;
  const old = cur; cur = i;
  stageEl.style.setProperty('--dir', i < old ? -1 : 1);
  if (old < 0) o = {first:true};
  for (let j = 0; j < NEV; j++){                         /* cards parked out of sight wait on the side they will enter from */
    if (Math.abs(X[j]) >= .995){ X[j] = tgt(j); V[j] = 0; }
  }
  evEl.forEach((el, j) => { const on = j === i; el.classList.toggle('active', on); el.setAttribute('aria-hidden', String(!on)); });
  stepEl.forEach((s, j) => { s.classList.toggle('done', j < i); s.classList.toggle('active', j === i); s.setAttribute('aria-current', j === i ? 'step' : 'false'); });
  progT = i / (NEV-1);
  $('prev').disabled = i === 0; $('next').disabled = i === NEV-1;
  document.body.style.transition = 'background 1s'; document.body.style.background = TONE[i % TONE.length];
  if (o.settle && !M.reduced){
    const el = evEl[i]; el.classList.remove('settle'); void el.offsetWidth; el.classList.add('settle');
    clearTimeout(settleTimer); settleTimer = setTimeout(() => evEl.forEach(e => e.classList.remove('settle')), 1700);
  }
  if (M.reduced && !o.drag && !o.first){                              /* reduced motion: instant switch, short fade */
    evEl.forEach((_, j) => { X[j] = tgt(j); V[j] = 0; });
    evEl[i].animate([{opacity:0},{opacity:1}], {duration:220, easing:'ease-out'});
  }
  fitStage(); live(); kick();
  return true;
}
function go(i){ noteTouched(); select(i, {settle:true}); }
select(0);

/* ---- input: buttons, steps, keys ---- */
const HINT_KEY = 'mp_swipe_hint';
function noteTouched(){
  if (hinting){ hinting = false; held = false; }
  if (touched) return; touched = true; hintAbort = true;
  try { localStorage.setItem(HINT_KEY, '1'); } catch (e) {}
}
$('prev').addEventListener('click', () => go(cur-1));
$('next').addEventListener('click', () => go(cur+1));
addEventListener('keydown', ev => {
  const r = tcardEl.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight || ev.altKey || ev.ctrlKey || ev.metaKey) return;
  if (ev.key === 'ArrowRight') go(cur+1); else if (ev.key === 'ArrowLeft') go(cur-1);
});

/* ---- drag: the card follows the pointer ---- */
let dg = null, suppress = false;
const rubber = a => .22 * (1 - Math.exp(-a * 3));         /* resistance past the first / last card */
function applyDrag(D){
  const ok = D === 0 || (D > 0 ? cur > 0 : cur < NEV-1);
  const e = ok ? Math.max(-1, Math.min(1, D)) : sgn(D) * rubber(Math.abs(D));
  for (let j = 0; j < NEV; j++){
    const b = dg.base[j];
    if (Math.abs(b) < .995 || Math.abs(j - cur) <= 1) X[j] = b + e;
  }
  progT = Math.max(0, Math.min(1, (cur - e) / (NEV-1)));
  dg.e = e; kick();
}
function endDrag(cancelled){
  const d = dg; dg = null; stageEl.classList.remove('drag');
  try { stageEl.releasePointerCapture(d.id); } catch (e) {}
  if (d.lock !== 1){                                      /* a tap: let the scene have it (e.g. throw haldi) */
    if (!cancelled && d.fwd && d.lock !== 2) d.fwd.dispatchEvent(new PointerEvent('pointerdown', {bubbles:true, clientX:d.x0, clientY:d.y0, pointerType:d.type}));
    return;
  }
  suppress = true; setTimeout(() => suppress = false, 80);
  const s = d.s, a = s[0], b = s[s.length-1];
  const vx = b.t > a.t ? (b.x - a.x) / (b.t - a.t) : 0;   /* px per ms */
  const D = d.e, dir = D < 0 ? 1 : -1, can = cur + dir >= 0 && cur + dir < NEV;
  const commit = !cancelled && can && Math.abs(D) > .005 && (Math.abs(D) > .2 || (Math.abs(vx) > .4 && sgn(-vx) === dir));
  held = false;
  const vc = Math.max(-5, Math.min(5, vx / stageW * 1000));
  if (commit) select(cur + dir, {drag:true});
  if (M.reduced){ evEl.forEach((_, j) => { X[j] = tgt(j); V[j] = 0; }); if (commit) evEl[cur].animate([{opacity:.3},{opacity:1}], {duration:200}); }
  else evEl.forEach((_, j) => { V[j] = Math.abs(X[j]) < .995 ? vc : 0; });
  kick();
}
stageEl.addEventListener('pointerdown', ev => {
  if (!ev.isPrimary || (ev.pointerType === 'mouse' && ev.button !== 0)) return;
  noteTouched();
  if (hinting){ hinting = false; held = false; }
  const onScene = ev.target.closest && ev.target.closest('.scene svg');
  if (onScene) ev.stopPropagation();                      /* a swipe must not throw haldi: forwarded on release if it was a tap */
  dg = {id: ev.pointerId, x0: ev.clientX, y0: ev.clientY, lock: 0, s: [], type: ev.pointerType, fwd: onScene ? ev.target : null};
}, true);
stageEl.addEventListener('pointermove', ev => {
  if (!dg || ev.pointerId !== dg.id) return;
  const dx = ev.clientX - dg.x0, dy = ev.clientY - dg.y0;
  if (!dg.lock){
    if (Math.hypot(dx, dy) < 8) return;
    if (Math.abs(dx) > Math.abs(dy)){
      dg.lock = 1; dg.xl = ev.clientX; held = true;
      for (let j = 0; j < NEV; j++) V[j] = 0;
      dg.base = X.slice(); stageEl.classList.add('drag');
      try { stageEl.setPointerCapture(ev.pointerId); } catch (e) {}
    } else { dg.lock = 2; return; }                       /* vertical: the page scrolls, we stay out of it */
  }
  if (dg.lock !== 1) return;
  const s = dg.s; s.push({t: ev.timeStamp, x: ev.clientX});
  while (s.length > 2 && ev.timeStamp - s[0].t > 90) s.shift();
  applyDrag((ev.clientX - dg.xl) / stageW);
});
stageEl.addEventListener('pointerup', ev => { if (dg && ev.pointerId === dg.id) endDrag(false); });
stageEl.addEventListener('pointercancel', ev => { if (dg && ev.pointerId === dg.id) endDrag(true); });
stageEl.addEventListener('click', ev => { if (suppress){ ev.preventDefault(); ev.stopPropagation(); } }, true);
stageEl.addEventListener('dragstart', ev => ev.preventDefault());

/* ---- gentle 3D tilt of the active scene card on desktop (idle pointer only) ---- */
stageEl.addEventListener('pointermove', ev => {
  if (ev.pointerType === 'touch' || (dg && dg.lock === 1) || M.reduced) return;
  const sc = evEl[cur].querySelector('.scene'); if (!sc) return;
  const r = stageEl.getBoundingClientRect(), x = (ev.clientX-r.left)/r.width-.5, y = (ev.clientY-r.top)/r.height-.5;
  sc.style.transform = `rotateY(${x*9}deg) rotateX(${-y*7}deg)`;
});
stageEl.addEventListener('pointerleave', () => { const sc = evEl[cur].querySelector('.scene'); if (sc) sc.style.transform = ''; });

/* ---- visibility, layout ---- */
new IntersectionObserver(es => { inView = es[0].isIntersecting; tcardEl.classList.toggle('live', inView); live(); }, {threshold:.25}).observe(tcardEl);
addEventListener('load', measure); addEventListener('resize', measure);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
measure();

/* ---- one-time swipe hint (touch only): the card nudges toward the next one and back, twice ---- */
(function(){
  let seen = false; try { seen = !!localStorage.getItem(HINT_KEY); } catch (e) {}
  if (!M.touch || M.reduced || seen) return;
  let fired = false;
  const run = async () => {
    if (fired || touched || cur !== 0 || dg) return; fired = true; hinting = true; hintAbort = false; held = true;
    const base = X.slice(), peek = e => { if (hintAbort || !hinting) return; X.forEach((_, j) => { if (j <= 1) X[j] = base[j] + e; }); kick(); };
    for (const amp of [-.17, -.13]){
      await M.tween(520, e => peek(amp * e), M.E.out);
      await M.tween(620, e => peek(amp * (1 - e)), M.E.inOut);
      await new Promise(r => setTimeout(r, 380));
      if (hintAbort || !hinting) return;
    }
    hinting = false; held = false; kick();
  };
  M.opened(() => {
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting){ io.disconnect(); setTimeout(run, 900); } }, {threshold:.7});
    io.observe(stageEl);
  });
})();
