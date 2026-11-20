/* ===================================================================
   Small helpers
   =================================================================== */
const rad = d => d*Math.PI/180, deg = r => r*180/Math.PI;
const clamp = (v,a=0,b=1) => Math.min(b,Math.max(a,v));
const ease = t => t<.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
const lerp = (a,b,t) => a+(b-a)*t;
const ph = (t,a,b) => ease(clamp((t-a)/(b-a)));          /* eased 0..1 progress between times a and b */
const T = (n,s) => n && n.setAttribute('transform', s);
const mk = (tag, attrs, parent) => { const e=document.createElementNS(NS,tag); for (const k in attrs) e.setAttribute(k,attrs[k]); if (parent) parent.appendChild(e); return e; };
/* A scene clock. tick(time, dt) runs every frame while started; time restarts at 0 on every start so each visit
   begins the little film from the top. o.reset() runs before a start. o.el gets .paused while stopped (freezes its
   CSS loops). With prefers-reduced-motion the scene is drawn once, as a still at o.still seconds (the key moment). */
const runner = (tick, o = {}) => {
  let run = false, t0 = 0, raf = 0, last = 0, drawn = false;
  const f = ts => {
    if (!run) return;
    const time = Math.max(0, (ts - t0) / 1000), dt = Math.min(.05, Math.max(0, time - last)); last = time;
    tick(time, dt); raf = requestAnimationFrame(f);
  };
  const still = () => {                                   /* settle the physics and particles into the key moment, silently */
    Kin.quiet = true;
    try { if (o.reset) o.reset(); const t1 = o.still || 0; for (let t = Math.max(0, t1 - (o.warm ?? 2.4)); t < t1; t += 1/30) tick(t, 1/30); tick(t1, 0); }
    finally { Kin.quiet = false; }
  };
  return {
    start(){
      if (o.el) o.el.classList.remove('paused');
      if (M.reduced){ if (!drawn){ drawn = true; still(); } return; }
      if (run) return; run = true; if (o.reset) o.reset(); t0 = performance.now(); last = 0; raf = requestAnimationFrame(f);
    },
    stop(){ run = false; cancelAnimationFrame(raf); if (o.el) o.el.classList.add('paused'); }
  };
};
document.head.insertAdjacentHTML('beforeend', `<style>
  /* narrow phones: date and place on two tidy lines; the small invitation line gets a little more room inside the arch */
  .when .wd,.when .wp{display:inline-block}
  @media (max-width:520px){
    .when .wdot{display:none}
    .when .wd,.when .wp{display:block}
    .when #heroWhen,.when #cvWhen{text-align:center}
  }
  @media (max-width:400px){
    .ptxt{left:3%;right:3%}
    .ptxt .invite{letter-spacing:.1em;font-size:.56rem}
  }
</style>`);

/* ===================================================================
   Kin: the scenes' shared animation kit (blinks, faces, follow-through, springs, particles, camera).
   Everything is driven from the scene clock; particles reuse a fixed set of elements.
   =================================================================== */
const Kin = (() => {
  const E = M.E;
  const hash = (a, b) => { const s = Math.sin(a*127.1 + b*311.7) * 43758.5453; return s - Math.floor(s); };
  const half = k => M.lite ? Math.max(1, Math.round(k/2)) : k;
  /* eye openness 1..0.1: a natural blink every 0.5–6 s, sometimes a double blink. Pure function of time. */
  const lid = u => u < 0 || u > .2 ? 1 : u < .065 ? 1 - u/.065 : u < .095 ? 0 : (u - .095) / .105;
  function blink(time, seed){
    const P = 3.7, i = Math.floor(time / P), o = .25 + hash(i, seed) * (P - .85), u = time - i*P - o;
    let k = lid(u); if (hash(i + .5, seed) < .24) k = Math.min(k, lid(u - .27));
    return .1 + .9*k;
  }
  /* damped spring (x towards target), sub-stepped so it is stable at any frame rate */
  function spring(k, c, x = 0){
    return { x, v:0, k, c, step(dt, target = 0, force = 0){
      if (dt <= 0) return this.x;
      const n = Math.ceil(dt / .008), h = dt / n;
      for (let i = 0; i < n; i++){ this.v += (this.k*(target - this.x) - this.c*this.v + force) * h; this.x += this.v * h; }
      return this.x;
    }, set(v){ this.x = v; this.v = 0; } };
  }
  /* a fixed set of reusable elements: spawn() wakes a sleeping one, tick() animates the awake ones */
  function pool(parent, n, make){
    const ps = Array.from({length:n}, (_, i) => { const el = make(i); el.setAttribute('display', 'none'); parent.appendChild(el); return {el, on:false, i}; });
    let rr = 0;
    return { ps,
      spawn(t, o){
        for (let j = 0; j < n; j++){ const p = ps[(rr + j) % n]; if (!p.on){ rr = (rr + j + 1) % n; Object.assign(p, o); p.t0 = t; p.on = true; return p; } }
        return null;
      },
      tick(t, fn){ for (const p of ps){ if (!p.on) continue; const age = t - p.t0, k = age / p.life;
        if (k >= 1){ p.on = p.vis = false; p.el.setAttribute('display', 'none'); continue; }
        if (age < 0) continue;                                                  /* spawned with a small delay */
        if (!p.vis){ p.vis = true; p.el.removeAttribute('display'); }
        fn(p, k, age); } },
      clear(){ ps.forEach(p => { p.on = p.vis = false; p.el.setAttribute('display', 'none'); }); }
    };
  }
  /* four-point twinkling stars */
  const STAR = 'M0 -10C.9 -2.4 2.4 -.9 10 0C2.4 .9 .9 2.4 0 10C-.9 2.4 -2.4 .9 -10 0C-2.4 -.9 -.9 -2.4 0 -10Z';
  function sparkles(parent, count){
    const P = pool(parent, half(count), i => mk('path', {d:STAR, fill:i % 3 ? '#fffbe8' : '#ffe9a6', stroke:'#f2b51e', 'stroke-width':.9, 'stroke-linejoin':'round'}));
    return {
      burst(t, x, y, n = 7, spread = 24, size = .62, life = 1.1){
        n = half(n);
        for (let i = 0; i < n; i++){
          const a = (i / n) * 6.283 + Math.random() * .7, d = spread * (.45 + Math.random() * .55);
          P.spawn(t, {x, y, vx:Math.cos(a)*d, vy:Math.sin(a)*d*.8 - spread*.18, s:size*(.55 + Math.random()*.6), r:Math.random()*40, life:life*(.75 + Math.random()*.5), tw:Math.random()*6});
        }
      },
      one(t, x, y, size = .5, life = .9){ P.spawn(t, {x, y, vx:0, vy:-3, s:size, r:Math.random()*40, life, tw:Math.random()*6}); },
      tick(t){ P.tick(t, (p, k, age) => {
        const g = 1 - Math.exp(-3.2*age), sc = p.s * Math.pow(Math.sin(Math.PI*k), .7) * (.82 + .18*Math.sin(age*26 + p.tw));
        T(p.el, `translate(${(p.x + p.vx*g/1.1).toFixed(2)} ${(p.y + p.vy*g/1.1 + 6*k*k).toFixed(2)}) rotate(${(p.r + 70*k).toFixed(1)}) scale(${Math.max(.001, sc).toFixed(3)})`);
      }); },
      clear: P.clear
    };
  }
  /* hearts that drift up and sway like paper on warm air */
  const HEART = 'M0 4C-7 -2 -7 -9 0 -6C7 -9 7 -2 0 4Z';
  function hearts(parent, count, cols = ['#e8508a', '#ff7a8a', '#f4a300', '#d9405e']){
    const P = pool(parent, half(count), i => mk('path', {d:HEART, fill:cols[i % cols.length]}));
    return {
      emit(t, x, y, o = {}){ return P.spawn(t, {x, y, vx:o.vx ?? (Math.random()*10 - 5), rise:o.rise ?? (46 + Math.random()*24), A:o.A ?? (5 + Math.random()*5),
        w:2 + Math.random()*1.2, f:Math.random()*6, s:o.s ?? (.8 + Math.random()*.45), life:o.life ?? (2.4 + Math.random()*.8)}); },
      tick(t){ P.tick(t, (p, k, age) => {
        const sw = Math.sin(age*p.w + p.f), x = p.x + p.vx*age + p.A*sw, y = p.y - p.rise*(1 - Math.exp(-1.1*age)) - 4*age;
        const sc = p.s * (k < .22 ? E.back(k / .22) : 1);
        T(p.el, `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${(16*Math.cos(age*p.w + p.f)).toFixed(1)}) scale(${Math.max(.001, sc).toFixed(3)})`);
        p.el.setAttribute('opacity', (k < .12 ? k / .12 : k > .62 ? (1 - k) / .38 : 1).toFixed(3));
      }); },
      clear: P.clear
    };
  }
  /* a gentle virtual camera on a root group: z >= 1, the view never leaves the artwork */
  function camera(g, W = 400, H = 300){
    const c = {z:1, x:W/2, y:H/2};
    c.set = (z, x, y) => {
      z = Math.max(1, z); const hw = W/2/z, hh = H/2/z;
      c.z = z; c.x = clamp(x, hw, W - hw); c.y = clamp(y, hh, H - hh);
      T(g, `translate(${W/2} ${H/2}) scale(${z.toFixed(4)}) translate(${(-c.x).toFixed(2)} ${(-c.y).toFixed(2)})`);
    };
    c.set(1, W/2, H/2);
    return c;
  }
  /* face: blinks, plus an optional laugh (happy closed eyes and an open smile), 0..1 */
  const setOp = (f, key, el, v) => { if (!el) return; v = Math.round(v * 50) / 50; if (f['_' + key] !== v){ f['_' + key] = v; el.setAttribute('opacity', v); } };
  function face(f, time, laugh = 0, shut = 0){
    const r = f.r; if (!r.eyes) return;
    let o = blink(time, f.seed); o = Math.min(o, 1 - .9*Math.max(laugh, shut));
    o = Math.round(o * 40) / 40;
    if (f._eo !== o){ f._eo = o; T(r.eyes, o >= 1 ? '' : `translate(0 ${f.ey}) scale(1 ${o}) translate(0 ${-f.ey})`); }
    setOp(f, 'hp', r.happy, laugh); setOp(f, 'lg', r.laugh, laugh); setOp(f, 'sm', r.smile, 1 - laugh*.9);
  }
  /* follow-through on the things that hang: bun and veni, earrings, the pheta's tail, the pallu's end */
  function sec(f, dt){
    const r = f.r, s = f.s2 || (f.s2 = spring(64, 6.5)), w = f.s3 || (f.s3 = spring(34, 3.2));
    const rot = (f.b ? f.b.rot : 0) + (f.hr || 0), sx = f.sx < 0 ? -1 : 1;
    if (dt > 0){
      const vx = (f.x - (f._px ?? f.x)) / dt / f.s * sx, vy = (f.y - (f._py ?? f.y)) / dt / f.s, vr = (rot - (f._pr ?? rot)) / dt;
      const by = f.b ? f.b.ty : 0, vb = (by - (f._pb ?? by)) / dt;
      s.step(dt, clamp(vx*.05 - vr*.07, -18, 18));
      w.step(dt, clamp(vx*.09 - vr*.12, -26, 26), (vy + vb) * -.9);
    }
    f._px = f.x; f._py = f.y; f._pr = rot; f._pb = f.b ? f.b.ty : 0;
    const a = s.x, q = w.x;
    if (r.bun) T(r.bun, `rotate(${(a*.5).toFixed(2)} ${f.bunP})`);
    if (r.veni) T(r.veni, `rotate(${(q*1.1 - rot*.6).toFixed(2)} ${f.veniP})`);
    if (r.earL) T(r.earL, `translate(${f.earL}) rotate(${(q*2 - rot).toFixed(2)})`);
    if (r.earR) T(r.earR, `translate(${f.earR}) rotate(${(q*2 - rot).toFixed(2)})`);
    if (r.ptail) T(r.ptail, `rotate(${(a*.9).toFixed(2)} ${f.ptailP})`);
    if (r.pend) T(r.pend, `rotate(${(q*.55 - rot*.35).toFixed(2)} 11 -51)`);
  }
  return { hash, half, blink, spring, pool, sparkles, hearts, camera, face, sec, STAR, HEART, E, quiet:false,
    sfx(name){ if (Kin.quiet) return; try { Aud.fx(name); } catch (e) {} } };
})();

/* ===================================================================
   Figure library: stylised, faceless people (front and side views)
   Origin of each figure is the centre of its feet; it is ~120 units tall.
   =================================================================== */
const SK = {a:'#f3c9a5', b:'#e2aa7e', c:'#c98d62'};
const L1 = 21, L2 = 20;                                   /* upper arm / forearm length */
const armHTML = (k, sleeve, fore, skin, w, bangle) =>
  `<g data-p="u${k}"><path d="M0 0V${L1}" stroke="${sleeve}" stroke-width="${w}" stroke-linecap="round"/>
   <g data-p="f${k}"><path d="M0 0V${L2}" stroke="${fore}" stroke-width="${w-1.4}" stroke-linecap="round"/>
   ${bangle ? `<path d="M-2.6 ${L2-4}h5.2M-2.6 ${L2-6.6}h5.2" stroke="${bangle}" stroke-width="1.5"/>` : ''}
   <circle cx="0" cy="${L2+1.6}" r="3.4" fill="${skin}"/></g></g>`;
/* a little gold jhumka that can swing (drawn hanging from 0,0) */
const jhumka = (k, col, at) => `<g data-p="ear${k}" transform="translate(${at})"><path d="M0 -.6V1.6" stroke="${col}" stroke-width=".8"/><path d="M-1.7 1.4Q0 -.6 1.7 1.4L1.3 3.2H-1.3Z" fill="${col}"/></g>`;

/* a simple, friendly face for the front-view figures: brows, eyes, nose, smile (men also get a moustache) */
const faceF = male => {
  const ey = male ? -99.6 : -100, by = ey-3.1, ym = ey+8.4;
  return `<path d="M-6.8 ${by+.4}Q-4.6 ${by-1.2} -2 ${by+.2}M2 ${by+.2}Q4.6 ${by-1.2} 6.8 ${by+.4}" fill="none" stroke="#2a1a14" stroke-width="1.05" stroke-linecap="round"/>
    <g data-p="eyes"><ellipse cx="-3.8" cy="${ey}" rx="1.3" ry="1.65" fill="#2a1a14"/><ellipse cx="3.8" cy="${ey}" rx="1.3" ry="1.65" fill="#2a1a14"/>
    <circle cx="-3.3" cy="${ey-.6}" r=".45" fill="#fff"/><circle cx="4.3" cy="${ey-.6}" r=".45" fill="#fff"/></g>
    <path data-p="happy" opacity="0" d="M-5.4 ${ey+.7}Q-3.8 ${ey-1.5} -2.2 ${ey+.7}M2.2 ${ey+.7}Q3.8 ${ey-1.5} 5.4 ${ey+.7}" fill="none" stroke="#2a1a14" stroke-width="1.1" stroke-linecap="round"/>
    <path d="M0 ${ey+1.2}Q1.5 ${ey+3.8} 0 ${ey+4.5}" fill="none" stroke="rgba(120,60,30,.55)" stroke-width="1" stroke-linecap="round"/>
    ${male ? `<path d="M-3.4 ${ey+6.4}Q0 ${ey+5} 3.4 ${ey+6.4}" fill="none" stroke="#3a2418" stroke-width="1.3" stroke-linecap="round"/>` : ''}
    <path data-p="smile" d="M-2.9 ${ym}Q0 ${ym+2.5} 2.9 ${ym}" fill="none" stroke="${male ? '#9a3a2e' : '#c2384a'}" stroke-width="1.25" stroke-linecap="round"/>
    <path data-p="laugh" opacity="0" d="M-3.3 ${ym-.5}Q0 ${ym+5.2} 3.3 ${ym-.5}Z" fill="#8a2430" stroke="${male ? '#9a3a2e' : '#c2384a'}" stroke-width=".8" stroke-linejoin="round"/>
    <circle cx="-6.2" cy="${ey+3.6}" r="2" fill="#ff8a7a" opacity=".22"/><circle cx="6.2" cy="${ey+3.6}" r="2" fill="#ff8a7a" opacity=".22"/>`;
};
const maleHTML = o => `
  <ellipse cx="0" cy="0" rx="22" ry="4.6" fill="rgba(60,30,20,.2)"/>
  <g data-p="legL"><rect x="-11" y="-50" width="9.5" height="48" rx="4.7" fill="${o.pants}"/><path d="M-12 -2q5-5 11 0v3h-11z" fill="${o.shoe}"/></g>
  <g data-p="legR"><rect x="1.5" y="-50" width="9.5" height="48" rx="4.7" fill="${o.pants}"/><path d="M1 -2q5-5 11 0v3h-11z" fill="${o.shoe}"/></g>
  <g data-p="body">
    <path d="M-17 -82Q0 -89 17 -82L20 -27Q0 -21 -20 -27Z" fill="${o.coat}"/>
    <path d="M-17 -82Q0 -89 17 -82L19 -62Q0 -57 -19 -62Z" fill="rgba(255,255,255,.3)"/>
    <path d="M0 -86V-25" stroke="${o.trim}" stroke-width="1.3"/>
    ${[-72,-60,-48,-36].map(y => `<circle cx="0" cy="${y}" r="1.5" fill="${o.trim}"/>`).join('')}
    <path d="M-17 -82L-5 -84L19 -34L11 -31Z" fill="${o.stole}" opacity=".96"/>
    <path d="M-17 -82L-5 -84L19 -34L11 -31Z" fill="none" stroke="${o.trim}" stroke-width=".8" opacity=".7"/>
    <rect x="-3.6" y="-92" width="7.2" height="9" rx="3" fill="${o.skin}"/>
    <path d="M-5 -88L0 -82L5 -88" fill="none" stroke="${o.trim}" stroke-width="1.6"/>
    <g data-p="head">
      ${o.head === 'pheta' ? `<g data-p="ptail"><path d="M9 -106Q24 -108 22 -92Q15 -97 9 -98Z" fill="${o.cap}"/><path d="M14 -104Q20 -102 19.5 -95" fill="none" stroke="${o.trim}" stroke-width=".8" opacity=".8"/></g>` : ''}
      <circle cx="0" cy="-100" r="10.5" fill="${o.skin}"/>
      ${o.head === 'pheta'
        ? `<path d="M-12.5 -101Q-13 -117 0 -118Q13 -117 12.5 -101Q0 -108 -12.5 -101Z" fill="${o.cap}"/><path d="M-12 -105Q0 -110 12 -105" stroke="${o.trim}" stroke-width="1.2" fill="none"/>`
        : `<path d="M-10.8 -103L-9.5 -114Q0 -117 9.5 -114L10.8 -103Q0 -108 -10.8 -103Z" fill="${o.cap}"/>`}
      <ellipse cx="-10.6" cy="-99" rx="1.6" ry="2.6" fill="${o.skin}"/><ellipse cx="10.6" cy="-99" rx="1.6" ry="2.6" fill="${o.skin}"/>
      ${faceF(true)}
      <g data-p="dabs"></g>
    </g>
    ${armHTML('L', o.coat, o.coat, o.skin, 8.6)}${armHTML('R', o.coat, o.coat, o.skin, 8.6)}
    <g data-p="bdabs"></g>
  </g>`;

const femaleHTML = o => `
  <ellipse cx="0" cy="0" rx="24" ry="4.8" fill="rgba(60,30,20,.2)"/>
  <g data-p="skirt">
    <path d="M-15 -54L-25 -1Q0 6 25 -1L15 -54Z" fill="${o.sari}"/>
    <path d="M-15 -54L-25 -1Q-14 2 -8 3L-6 -54Z" fill="rgba(255,255,255,.16)"/>
    <path d="M-5 -52L-8 2M5 -52L8 2M0 -52V4" stroke="${o.sariDark}" stroke-width="1" opacity=".55"/>
    <path d="M-25 -1Q0 6 25 -1" fill="none" stroke="${o.border}" stroke-width="3"/>
    <ellipse cx="-7" cy="1.4" rx="5" ry="2.4" fill="${o.skin}"/><ellipse cx="7" cy="1.4" rx="5" ry="2.4" fill="${o.skin}"/>
  </g>
  <g data-p="body">
    <path d="M-13 -83Q0 -88 13 -83L12 -50L-12 -50Z" fill="${o.blouse}"/>
    <path d="M-14 -83L-4 -85L15 -52L5 -50Z" fill="${o.sariDark}"/>
    <g data-p="pend"><path d="M14.6 -53L26 -24L14 -23L5 -50.6Z" fill="${o.sariDark}"/><path d="M15 -52L26 -24" fill="none" stroke="${o.border}" stroke-width="1.6"/><path d="M14 -23.4L26 -24" fill="none" stroke="${o.border}" stroke-width="2.2"/></g>
    <path d="M-14 -83L-4 -85L15 -52" fill="none" stroke="${o.border}" stroke-width="1.6"/>
    <rect x="-3.4" y="-92" width="6.8" height="9" rx="3" fill="${o.skin}"/>
    <path d="M-7 -88Q0 -81 7 -88" fill="none" stroke="${o.border}" stroke-width="1.8"/>
    <g data-p="head">
      <g data-p="bun"><circle cx="0" cy="-117" r="5.2" fill="${o.hair}"/>
      ${[-5,-1.7,1.7,5].map(x => `<circle cx="${x}" cy="-117.6" r="1.3" fill="#fff6d8"/>`).join('')}</g>
      <circle cx="0" cy="-100" r="10.2" fill="${o.skin}"/>
      <path d="M-11 -100Q-12.5 -115 0 -115.5Q12.5 -115 11 -100Q9 -108 0 -109Q-9 -108 -11 -100Z" fill="${o.hair}"/>
      <path d="M-8.4 -108Q0 -104.6 8.4 -108" fill="none" stroke="#fff" stroke-width="2.3" stroke-dasharray="0.1 3.1" stroke-linecap="round"/>
      ${jhumka('L', o.border, '-10.4 -97.6')}${jhumka('R', o.border, '10.4 -97.6')}
      ${faceF(false)}
      <circle cx="0" cy="-102.9" r="1.15" fill="#d6173a"/>
      <circle cx="2.6" cy="-95.4" r="1.5" fill="none" stroke="${o.border}" stroke-width=".9"/>
      <g data-p="dabs"></g>
    </g>
    ${armHTML('L', o.blouse, o.skin, o.skin, 7.4, o.bangle)}${armHTML('R', o.blouse, o.skin, o.skin, 7.4, o.bangle)}
    <g data-p="bdabs"></g>
  </g>`;

const profMaleHTML = o => `
  <ellipse data-p="shadow" cx="0" cy="0" rx="20" ry="4.2" fill="rgba(60,30,20,.22)"/>
  <g data-p="legB"><path d="M0 -50V-7" stroke="${o.pantsDark}" stroke-width="9.5" stroke-linecap="round"/><path d="M-4 -3q7-6 14 0v4h-14z" fill="${o.shoe}"/></g>
  <g data-p="legF"><path d="M0 -50V-7" stroke="${o.pants}" stroke-width="10" stroke-linecap="round"/><path d="M-4 -3q7-6 14 0v4h-14z" fill="${o.shoe}"/></g>
  <g data-p="body">
    ${armHTML('F', o.coatDark, o.coatDark, o.skin, 8)}
    <path d="M-10 -84Q0 -90 10 -84L13 -28Q0 -22 -13 -28Z" fill="${o.coat}"/>
    <path d="M-10 -84L2 -85L14 -34L7 -31Z" fill="${o.stole}"/>
    <path d="M3 -86V-26" stroke="${o.trim}" stroke-width="1.2"/>
    <rect x="-3" y="-93" width="7" height="10" rx="3" fill="${o.skin}"/>
    <g data-p="head">
      <g data-p="ptail"><path d="M-8 -106Q-22 -108 -20 -92Q-13 -97 -7 -98Z" fill="${o.cap}"/><path d="M-12 -104Q-18 -102 -17.5 -95" fill="none" stroke="${o.trim}" stroke-width=".8" opacity=".8"/></g>
      <circle cx="2" cy="-101" r="10.5" fill="${o.skin}"/>
      <path d="M-9 -102Q-10 -118 3 -119Q15 -118 13 -103Q3 -110 -9 -102Z" fill="${o.cap}"/>
      <path d="M-8 -105Q3 -110 13 -105" fill="none" stroke="${o.trim}" stroke-width="1.2"/>
      <path d="M5.2 -104.6Q7.8 -106 10.4 -104.8" fill="none" stroke="#2a1a14" stroke-width="1.05" stroke-linecap="round"/>
      <g data-p="eyes"><ellipse cx="7.8" cy="-101.8" rx="1.2" ry="1.6" fill="#2a1a14"/><circle cx="8.2" cy="-102.4" r=".45" fill="#fff"/></g>
      <path data-p="happy" opacity="0" d="M6.2 -101.2Q7.8 -103.4 9.4 -101.2" fill="none" stroke="#2a1a14" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M11.8 -103Q16.2 -99 12.2 -96.2Z" fill="${o.skin}" stroke="rgba(120,60,30,.45)" stroke-width=".8" stroke-linejoin="round"/>
      <path d="M8.6 -95.6Q10.8 -94.8 12.6 -96" fill="none" stroke="#3a2418" stroke-width="1.2" stroke-linecap="round"/>
      <path data-p="smile" d="M8.4 -92.6Q10.6 -91.2 12.2 -93" fill="none" stroke="#9a3a2e" stroke-width="1.2" stroke-linecap="round"/>
      <path data-p="laugh" opacity="0" d="M8.2 -93.2Q10.4 -89.6 12.6 -93.4Z" fill="#8a2430" stroke="#9a3a2e" stroke-width=".7" stroke-linejoin="round"/>
    </g>
    ${armHTML('N', o.coat, o.coat, o.skin, 8.6)}
  </g>`;

const profFemaleHTML = o => `
  <ellipse data-p="shadow" cx="0" cy="0" rx="21" ry="4.4" fill="rgba(60,30,20,.22)"/>
  <g data-p="skirt">
    <path d="M-11 -55L-18 -1Q0 6 18 -1L11 -55Z" fill="${o.sari}"/>
    <path d="M-11 -55L-18 -1Q-9 2 -4 3L-3 -55Z" fill="rgba(255,255,255,.16)"/>
    <path d="M-4 -52L-6 2M4 -52L6 2" stroke="${o.sariDark}" stroke-width="1" opacity=".55"/>
    <path d="M-18 -1Q0 6 18 -1" fill="none" stroke="${o.border}" stroke-width="3"/>
  </g>
  <g data-p="footB"><ellipse cx="-3" cy="1.2" rx="6.5" ry="2.6" fill="${o.skin}"/></g>
  <g data-p="footF"><ellipse cx="6" cy="1.2" rx="6.5" ry="2.6" fill="${o.skin}"/></g>
  <g data-p="body">
    ${armHTML('F', o.blouse, o.skin, o.skin, 7, o.bangle)}
    <g data-p="pallu"><path d="M-9 -84L-24 -62L-22 -22L-10 -26L-8 -56Z" fill="${o.sariDark}"/><path d="M-9 -84L-24 -62L-22 -22" fill="none" stroke="${o.border}" stroke-width="1.6"/></g>
    <path d="M-10 -84Q0 -89 10 -84L9 -52L-9 -52Z" fill="${o.blouse}"/>
    <path d="M-10 -84L-2 -86L11 -54L14 -30L6 -29L2 -52Z" fill="${o.sariDark}"/>
    <rect x="-3" y="-93" width="6.4" height="10" rx="3" fill="${o.skin}"/>
    <path d="M-5 -89Q2 -82 8 -88" fill="none" stroke="${o.border}" stroke-width="1.8"/>
    <g data-p="head">
      <g data-p="veni"><path d="M-10.6 -104Q-14 -96 -12.4 -86" fill="none" stroke="#fff6d8" stroke-width="2.6" stroke-dasharray=".1 3" stroke-linecap="round"/><circle cx="-12.4" cy="-85" r="1.3" fill="#ff8a2b"/></g>
      <circle cx="2" cy="-101" r="10" fill="${o.skin}"/>
      <path d="M-9 -101Q-10 -116 3 -116.5Q14 -115 12 -102Q4 -108 -9 -101Z" fill="${o.hair}"/>
      <g data-p="bun"><circle cx="-8" cy="-107" r="5.6" fill="${o.hair}"/>
      ${[-12.4,-10.6,-8.4].map((x,i) => `<circle cx="${x}" cy="${-110.6+i*3.4}" r="1.35" fill="#fff6d8"/>`).join('')}</g>
      <path d="M4.6 -108.4Q11 -106.6 11.8 -103.6" fill="none" stroke="#fff" stroke-width="2.2" stroke-dasharray="0.1 3" stroke-linecap="round"/>
      <circle cx="11.6" cy="-104.8" r="1.2" fill="#d6173a"/>
      <path d="M5.2 -104.4Q7.6 -105.8 10 -104.6" fill="none" stroke="#2a1a14" stroke-width="1.05" stroke-linecap="round"/>
      <g data-p="eyes"><ellipse cx="7.6" cy="-101.8" rx="1.2" ry="1.6" fill="#2a1a14"/><circle cx="8" cy="-102.4" r=".45" fill="#fff"/></g>
      <path data-p="happy" opacity="0" d="M6 -101.2Q7.6 -103.4 9.2 -101.2" fill="none" stroke="#2a1a14" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M11.6 -102.6Q16 -98.8 12 -96.2Z" fill="${o.skin}" stroke="rgba(120,60,30,.45)" stroke-width=".8" stroke-linejoin="round"/>
      <circle cx="13.5" cy="-96.9" r="1.5" fill="none" stroke="${o.border}" stroke-width=".9"/>
      <path data-p="smile" d="M8.4 -92.8Q10.6 -91.4 12.2 -93.2" fill="none" stroke="#c2384a" stroke-width="1.3" stroke-linecap="round"/>
      <path data-p="laugh" opacity="0" d="M8.2 -93.4Q10.4 -89.8 12.6 -93.6Z" fill="#8a2430" stroke="#c2384a" stroke-width=".7" stroke-linejoin="round"/>
      ${jhumka('L', o.border, '1 -96')}
    </g>
    ${armHTML('N', o.blouse, o.skin, o.skin, 7.4, o.bangle)}
  </g>`;

const P = {
  groom:  {sex:'m', skin:SK.b, coat:'#fff0d0', trim:'#c8921f', stole:'#e8730c', pants:'#f6e6c4', shoe:'#6b3a1a', head:'pheta', cap:'#e8730c'},
  bride:  {sex:'f', skin:SK.a, sari:'#d81b60', sariDark:'#a00f48', border:'#f4c542', blouse:'#ffd24d', hair:'#2a1a14', bangle:'#d9a521'},
  hGroom: {sex:'m', skin:SK.b, coat:'#0e6b6f', trim:'#ffd24d', stole:'#d81b60', pants:'#f7ead0', shoe:'#5a3418', head:'pheta', cap:'#d81b60'},
  kidA:   {sex:'m', skin:SK.c, coat:'#2f7de1', trim:'#ffd24d', stole:'#ff8a2b', pants:'#fff4d6', shoe:'#6b3a1a', head:'cap', cap:'#ffffff'},
  kidB:   {sex:'f', skin:SK.b, sari:'#8e44c8', sariDark:'#6a2c9e', border:'#ffd24d', blouse:'#ff6fa5', hair:'#2a1a14', bangle:'#ffd24d'},
  hBride: {sex:'f', skin:SK.a, sari:'#ffc928', sariDark:'#e8a400', border:'#fffdf0', blouse:'#fff4c4', hair:'#2a1a14', bangle:'#e8a400'},
  auntA:  {sex:'f', skin:SK.b, sari:'#e8508a', sariDark:'#b72f66', border:'#ffd24d', blouse:'#fffdf5', hair:'#3a2a24', bangle:'#ffd24d'},
  auntB:  {sex:'f', skin:SK.c, sari:'#ff8a2b', sariDark:'#d6620c', border:'#ffe27a', blouse:'#7a1d3a', hair:'#2a1a14', bangle:'#ffe27a'},
  danceF: {sex:'f', skin:SK.a, sari:'#7b3fb5', sariDark:'#5a2a8a', border:'#ffd24d', blouse:'#ffe27a', hair:'#2a1a14', bangle:'#ffd24d'},
  danceM: {sex:'m', skin:SK.c, coat:'#ffcf3d', trim:'#b87500', stole:'#e8508a', pants:'#fffbe8', shoe:'#6b3a1a', head:'cap', cap:'#ffffff'},
  pGroom: {sex:'pm', skin:SK.b, coat:'#2c4a8c', coatDark:'#223a70', trim:'#f1c75a', stole:'#e8730c', pants:'#f1dfb4', pantsDark:'#d8c698', shoe:'#5a3418', cap:'#e8730c'},
  heroGroom: {sex:'m', skin:SK.b, coat:'#2c4a8c', trim:'#f1c75a', stole:'#e8730c', pants:'#f1dfb4', shoe:'#5a3418', head:'pheta', cap:'#e8730c'},
  pBride: {sex:'pf', skin:SK.a, sari:'#d81b60', sariDark:'#a00f48', border:'#f4c542', blouse:'#ffd24d', hair:'#2a1a14', bangle:'#d9a521'}
};

/* Create a figure inside `root`. Returns a handle with the rig (named body parts) and positioning helpers. */
function fig(root, o, x, y, s){
  const g = mk('g', {class:'fig'}, root);
  g.innerHTML = o.sex==='m' ? maleHTML(o) : o.sex==='f' ? femaleHTML(o) : o.sex==='pm' ? profMaleHTML(o) : profFemaleHTML(o);
  const sh = o.sex==='m' ? {L:[-17,-79],R:[17,-79]} : o.sex==='f' ? {L:[-13,-79],R:[13,-79]} : {N:[0,-79],F:[0,-79]};
  const r = {sh, ang:{}};
  g.querySelectorAll('[data-p]').forEach(n => r[n.dataset.p] = n);
  const f = {g, r, x, y, s, sx:1, kind:o.sex, seed:Math.random()*997, hr:0};
  const sxs = () => Math.abs(f.sx) < .12 ? .12*Math.sign(f.sx||1) : f.sx;   /* a turning figure never becomes a hairline */
  /* pivots for the follow-through parts */
  const prof = o.sex === 'pm' || o.sex === 'pf';
  f.ey = o.sex === 'm' ? -99.6 : o.sex === 'f' ? -100 : -101.8;
  f.bunP = prof ? '-6 -104' : '0 -112'; f.veniP = '-10.6 -104';
  f.earL = prof ? '1 -96' : '-10.4 -97.6'; f.earR = '10.4 -97.6';
  f.ptailP = prof ? '-8 -104' : '9 -104';
  f.place = () => T(g, `translate(${f.x} ${f.y}) scale(${f.s*sxs()} ${f.s})`);
  f.loc = (px,py) => [(px-f.x)/(f.s*sxs()), (py-f.y)/f.s];      /* scene point -> figure-local point */
  f.world = (lx,ly) => [f.x + f.s*sxs()*lx, f.y + f.s*ly];       /* figure-local point -> scene point */
  f.head = (rot, tx = 0, ty = 0) => { f.hr = rot; T(r.head, `translate(${tx} ${ty}) rotate(${rot} ${prof ? 2 : 0} -90)`); };
  f.place();
  return f;
}
function setArm(r,k,a,b){
  const s = r.sh[k]; r.ang[k] = [a,b];
  T(r['u'+k], `translate(${s[0]} ${s[1]}) rotate(${a})`);
  T(r['f'+k], `translate(0 ${L1}) rotate(${b})`);
}
const wrap = a => { while (a > 180) a -= 360; while (a < -180) a += 360; return a; };
function reach(r,k,tx,ty){                                     /* two-bone IK: put the hand on (tx,ty), figure-local */
  const s = r.sh[k]; let dx=tx-s[0], dy=ty-s[1], d=Math.hypot(dx,dy)||.001; const mx=L1+L2-.8;
  if (d>mx){ dx*=mx/d; dy*=mx/d; d=mx; }
  const cx=s[0]+dx, cy=s[1]+dy, base=Math.atan2(-dx,dy);
  const al=Math.acos(clamp((L1*L1+d*d-L2*L2)/(2*L1*d),-1,1)); let best=null;
  for (const sg of [1,-1]){ const t1=base+sg*al, ex=s[0]-L1*Math.sin(t1), ey=s[1]+L1*Math.cos(t1); if (!best || ey>best.ey) best={t1,ex,ey}; }
  const t2=Math.atan2(-(cx-best.ex), cy-best.ey) - best.t1;
  setArm(r, k, wrap(deg(best.t1)), wrap(deg(t2)));
}
function hand(f,k){                                            /* where the hand currently is (scene coordinates) */
  const s=f.r.sh[k], [a,b]=f.r.ang[k]||[0,0], A=rad(a), B=rad(a+b);
  return f.world(s[0]-L1*Math.sin(A)-L2*Math.sin(B), s[1]+L1*Math.cos(A)+L2*Math.cos(B));
}
function namaste(f){ reach(f.r,'L',-3,-66); reach(f.r,'R',3,-66); }
/* walking pose for the side-view figures: kind 'm' = groom, 'f' = bride; p = walk phase (radians, 2π per stride pair),
   amp = leg swing (0 = standing). The body dips on each footfall, the head counters it, the arms swing opposite the legs. */
function walkPose(f, kind, p, amp, t, lean = 0){
  const a = Math.sin(p)*amp, k = amp/24, bob = -Math.abs(Math.sin(p))*1.6*k;
  if (kind === 'm'){ T(f.r.legF,`rotate(${a} 0 -50)`); T(f.r.legB,`rotate(${-a} 0 -50)`); setArm(f.r,'F',-a*.8,14+6*k); setArm(f.r,'N',a*.8,14+6*k); }
  else {
    T(f.r.footF,`translate(${Math.sin(p)*7*k} ${-Math.max(0,Math.cos(p))*2*k})`); T(f.r.footB,`translate(${-Math.sin(p)*7*k} ${-Math.max(0,-Math.cos(p))*2*k})`);
    T(f.r.pallu,`rotate(${Math.sin(t*3+1)*3 + Math.sin(p*2)*2*k + lean*.5} -9 -84)`); setArm(f.r,'F',a*.6,12); setArm(f.r,'N',-a*.6,12);
  }
  if (f.setBody) f.setBody(0, bob, lean + Math.sin(p*2)*.6*k);
  else T(f.r.body,`translate(0 ${bob}) rotate(${lean} 0 -50)`);
  if (f.head) f.head(-lean*.4 + Math.sin(p*2 + .6)*1.2*k, 0, -bob*.35);
}
function rest(f,sw=0){ setArm(f.r,'L',6+sw,-6); setArm(f.r,'R',-6-sw,6); }

/* body pose helper: lets us lean / bob a figure and still aim hands in scene coordinates */
function bodyRig(f){
  f.b = {tx:0, ty:0, rot:0};
  f.setBody = (tx,ty,rot) => { f.b = {tx,ty,rot}; T(f.r.body, `translate(${tx} ${ty}) rotate(${rot} 0 -50)`); };
  f.locB = (px,py) => {
    let [x,y] = f.loc(px,py); x -= f.b.tx; y -= f.b.ty;
    const a = -rad(f.b.rot), dx = x, dy = y+50;
    return [dx*Math.cos(a)-dy*Math.sin(a), dx*Math.sin(a)+dy*Math.cos(a)-50];
  };
  f.handB = k => {                                         /* hand position in scene coordinates, including body pose */
    const s=f.r.sh[k], [a,b]=f.r.ang[k]||[0,0], A=rad(a), B=rad(a+b);
    let x = s[0]-L1*Math.sin(A)-L2*Math.sin(B), y = s[1]+L1*Math.cos(A)+L2*Math.cos(B);
    const r = rad(f.b.rot), dx = x, dy = y+50;
    x = dx*Math.cos(r)-dy*Math.sin(r)+f.b.tx; y = dx*Math.sin(r)+dy*Math.cos(r)-50+f.b.ty;
    return f.world(x,y);
  };
  f.bodyPt = (lx, ly) => {                                 /* a point on the body (figure-local), moving with it, in scene coordinates */
    const r = rad(f.b.rot), dx = lx, dy = ly+50;
    return f.world(dx*Math.cos(r)-dy*Math.sin(r)+f.b.tx, dx*Math.sin(r)+dy*Math.cos(r)-50+f.b.ty);
  };
  return f;
}
const SCN = {};
