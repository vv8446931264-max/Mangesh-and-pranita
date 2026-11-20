/* ---------- Opening cover: palace doors (?to=Name personalises it) ----------
   At rest its lines arrive in order and a warm light breathes through the seam (cinematic.css).
   The tap plays one ~3 s shot (times from the tap):
     0      button presses, card retreats            .2  seam light flares
     .45    the leaves unlatch, then swing (to 2.55, settling)
     .5     sparks, then petals, spill from the seam  .8  the camera steps in (to 3.0)
     1.45   light blooms from the doorway            1.85 hero entrance starts underneath
     1.95   the cover dissolves through a widening oval centred on the doorway (to 3.0) */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const guest = (new URLSearchParams(location.search).get('to') || '').trim().slice(0,40);
const wideQ = matchMedia('(min-aspect-ratio:11/10)'), stg = $('cvStage'), still = M.reduced;
const setDoors = () => {                                       /* tall photo for phones, wide one for laptops; the leaves are cut from the same photo */
  stg.classList.remove('ready'); stg.querySelectorAll('img').forEach(i => i.src = wideQ.matches ? 'img/doors-wide.webp' : 'img/doors-tall.webp');
  const im = stg.querySelector('img'); (im.decode ? im.decode() : Promise.resolve()).catch(() => {}).then(() => stg.classList.add('ready'));
};
setDoors(); wideQ.addEventListener && wideQ.addEventListener('change', setDoors);
$('cvDeities').innerHTML = '<span>॥ ' + C.deities[1] + ' ॥</span>';
$('cvG').textContent = C.groom; $('cvB').textContent = C.bride; $('cvWhen').innerHTML = $('heroWhen').innerHTML;
namesSplit($('cvNames'), `${C.groom} & ${C.bride}`); namesGlint($('cvNames'), 2500);
if (guest){ $('cvTo').textContent = `प्रिय / Dear ${guest}`; $('cvTo').hidden = false;
  document.querySelectorAll('.contact[data-wa]').forEach(a => { a.href += encodeURIComponent(' — ' + guest); }); }

/* the opening's clock: everything below is timed from the tap (ms) */
const CV = {dolly:800, dollyDur:2200, unlock:1850, mask:1950, maskDur:1050, gone:3100};

/* petals and gold sparks spilling from the seam. They live in a layer above the cover so they drift on over the hero.
   at(ms) gives the seam's screen position at that moment (the camera is moving). */
const cvSpill = at => {
  const fx = document.createElement('div'); fx.className = 'cvfx'; fx.setAttribute('aria-hidden', 'true'); document.body.appendChild(fx);
  const R = Math.random, W = innerWidth, H = innerHeight, reach = Math.min(W*.5, 320);
  const cols = [['#ffd23f','#f4a300'],['#ffb347','#e8730c'],['#ff9ec4','#e8508a'],['#ff8a5c','#c43c4c'],['#ffe27a','#f4a300']];
  const add = (cls, delay, frames, dur, ease) => {
    const s = at(delay), p = document.createElement('i'); p.className = cls;
    p.style.left = s.x.toFixed(1) + 'px'; p.style.top = (s.y + (R()-.5)*s.h*.8).toFixed(1) + 'px';
    fx.appendChild(p); p.animate(frames, {duration:dur, delay, easing:ease, fill:'both'});
    return p;
  };
  for (let i=0, n = M.lite ? 14 : 30; i<n; i++){             /* sparks: quick and bright, fanning out of the crack */
    const sx = (i%2 ? 1 : -1)*(30 + R()*reach*.8), sy = -20 - R()*120;
    add('cvspark', 450 + R()*600, [{transform:'translate(0,0) scale(1.2)', opacity:0}, {opacity:1, offset:.08},
      {transform:`translate(${sx*.8}px,${sy}px) scale(.8)`, opacity:.95, offset:.55},
      {transform:`translate(${sx}px,${sy + 90 + R()*60}px) scale(.2)`, opacity:0}], 900 + R()*700, 'cubic-bezier(.15,.7,.35,1)');
  }
  for (let i=0, n = M.lite ? 14 : 28; i<n; i++){             /* petals: tumble out towards us, then drift down over the page */
    const c = cols[i%5], px = (i%2 ? 1 : -1)*(30 + R()*reach), up = -20 - R()*70, fall = H*(.35 + R()*.5), rz = (R()-.5)*720, sc = 1.2 + R()*.9;
    const p = add('cvpetal', 900 + R()*800, [
      {transform:'translate(0,0) rotate(0) scale(.35)', opacity:0, easing:'cubic-bezier(.2,.7,.4,1)'},
      {transform:`translate(${px*.45}px,${up}px) rotate(${rz*.25}deg) scale(${(sc*.75).toFixed(2)})`, opacity:1, offset:.22, easing:'cubic-bezier(.45,0,.7,1)'},
      {transform:`translate(${px + (R()-.5)*60}px,${fall}px) rotate(${rz}deg) scale(${sc.toFixed(2)})`, opacity:0}], 2600 + R()*1300, 'linear');
    p.style.background = `linear-gradient(135deg,${c[0]},${c[1]})`;
  }
  setTimeout(() => fx.remove(), 5200);
};

/* the dissolve: a soft-edged oval (taller than wide, like the doorway) opens from the doorway until the cover is gone */
const cvDissolve = (cv, centre, t0) => {
  const W = innerWidth, H = innerHeight, E = 1.3, k0 = .7;     /* ry = 1.3 rx; fully clear inside 70% of the oval, feathered outside */
  const need = (x, y) => Math.max(...[[0,0],[W,0],[0,H],[W,H]].map(([a,b]) => Math.hypot(a-x, (b-y)/E))) / k0 + 24;
  const f = now => {
    if (!cv.isConnected) return;
    const k = M.clamp((now - t0 - CV.mask) / CV.maskDur);
    if (k > 0){
      const c = centre(now - t0), rx = 6 + need(c.x, c.y) * (k < .5 ? 2*k*k : 1 - Math.pow(-2*k+2, 2)/2);
      const g = `radial-gradient(${rx.toFixed(1)}px ${(rx*E).toFixed(1)}px at ${c.x.toFixed(1)}px ${c.y.toFixed(1)}px,transparent ${k0*100}%,#000 100%)`;
      cv.style.webkitMaskImage = g; cv.style.maskImage = g;
    }
    if (k < 1) requestAnimationFrame(f); else cv.style.opacity = 0;
  };
  requestAnimationFrame(f);
};

const btn = $('openBtn');
const cvRipple = (x, y) => {                                     /* a ripple of light from where the finger landed */
  const r = btn.getBoundingClientRect(), i = document.createElement('i');
  i.className = 'cvrip'; i.style.left = (x - r.left).toFixed(1) + 'px'; i.style.top = (y - r.top).toFixed(1) + 'px';
  i.style.width = i.style.height = (r.width*2.2).toFixed(0) + 'px';
  btn.querySelector('.cvshine').appendChild(i); setTimeout(() => i.remove(), 900);
};
btn.addEventListener('pointerdown', e => { if (!still) cvRipple(e.clientX, e.clientY); });
btn.addEventListener('click', e => {
  try { if (!Aud.on) toggleSound(); Aud.fx('bell'); setTimeout(() => { try { Aud.fx('chime'); } catch(e){} }, 900); setTimeout(() => { try { Aud.fx('sparkle'); } catch(e){} }, 1600); } catch(e){}   /* sound trouble must never keep the doors shut */
  const cv = $('cover'), root = document.documentElement;
  const done = () => { root.classList.remove('locked'); scrollTo(0,0); heroSync(); M.markOpen(); };
  if (still){                                                    /* reduced motion: a simple crossfade onto the page */
    done(); cv.animate([{opacity:1},{opacity:0}], {duration:600, easing:'cubic-bezier(.65,0,.35,1)', fill:'forwards'});
    return setTimeout(() => cv.remove(), 650);
  }
  if (!e.detail){ const r = btn.getBoundingClientRect(); cvRipple(r.left + r.width/2, r.top + r.height/2); }   /* keyboard: ripple from the centre */
  const t0 = performance.now();
  try {
    /* where the camera goes: the doorway's centre moves towards the portrait it is about to become, growing to about its width */
    const d = stg.querySelector('.cvglow').getBoundingClientRect(), s0 = stg.getBoundingClientRect(), p = document.querySelector('.portrait').getBoundingClientRect();
    const W = innerWidth, H = innerHeight, dcx = d.left + d.width/2, dcy = d.top + d.height/2;
    const tx = p.width ? p.left + p.width/2 : W/2, ty = M.clamp(p.height ? p.top + p.height*.5 : H/2, H*.3, H*.62);
    const sc = M.clamp((p.width || d.width) * 1.1 / d.width, 1.3, 2.4), dx = tx - dcx, dy = ty - dcy;
    stg.style.transformOrigin = `${(dcx - s0.left).toFixed(1)}px ${(dcy - s0.top).toFixed(1)}px`;
    const pre = wideQ.matches && !(window.CSS && CSS.supports && CSS.supports('translate', '1px')) ? 'translate(-50%,-50%) ' : '';
    stg.animate([{transform:pre + 'translate(0,0) scale(1)'}, {transform:`${pre}translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px) scale(${sc.toFixed(3)})`}],
      {duration:CV.dollyDur, delay:CV.dolly, easing:'cubic-bezier(.65,0,.35,1)', fill:'both'});
    const prog = ms => M.E.inOut(M.clamp((ms - CV.dolly) / CV.dollyDur));
    const centre = ms => { const k = prog(ms); return {x: dcx + dx*k, y: dcy + dy*k, h: d.height*(1 + (sc-1)*k)}; };
    cvSpill(centre);
    if (window.CSS && CSS.supports && (CSS.supports('mask-image', 'none') || CSS.supports('-webkit-mask-image', 'none'))) cvDissolve(cv, centre, t0);
    else cv.animate([{opacity:1},{opacity:0}], {duration:CV.maskDur, delay:CV.mask, easing:'cubic-bezier(.7,0,.84,0)', fill:'forwards'});
  } catch(err){ cv.animate([{opacity:1},{opacity:0}], {duration:800, delay:1600, fill:'forwards'}); }
  cv.classList.add('open');
  setTimeout(() => { cv.style.pointerEvents = 'none'; done(); }, CV.unlock);   /* the hero's entrance is already playing as it is revealed */
  setTimeout(() => cv.remove(), CV.gone);
}, {once:true});
$('scrollCue').addEventListener('click', e => { e.preventDefault(); scrollTo({top: $('hero').offsetHeight, behavior: 'smooth'}); });
addEventListener('scroll', () => { if (scrollY > 160) document.documentElement.classList.add('scrolled'); }, {passive:true});
btn.focus({preventScroll:true});
/* testing shortcut: ?skip opens straight onto the page with no cover (sound stays off) */
if (new URLSearchParams(location.search).has('skip')){
  $('cover').remove(); document.documentElement.classList.remove('locked'); heroSync(); M.markOpen();
}
