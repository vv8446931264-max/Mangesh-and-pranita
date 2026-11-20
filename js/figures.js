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
const runner = tick => {
  let run=false, t0=0, raf=0;
  const f = ts => { if (!run) return; tick((ts-t0)/1000); raf = requestAnimationFrame(f); };
  return { start(){ if (run) return; run=true; t0=performance.now(); raf=requestAnimationFrame(f); }, stop(){ run=false; cancelAnimationFrame(raf); } };
};
document.head.insertAdjacentHTML('beforeend', `<style>
  .ember{animation:rise 1.7s linear infinite}
  @keyframes rise{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(-62px) translateX(var(--dx,6px));opacity:0}}
  .diya.on .df{opacity:1;transform:scale(1)}
  .diya .df{opacity:0;transform:scale(.2);transition:all .5s;transform-box:fill-box;transform-origin:50% 100%}

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

/* a simple, friendly face for the front-view figures: brows, eyes, nose, smile (men also get a moustache) */
const faceF = male => {
  const ey = male ? -99.6 : -100, by = ey-3.1, ym = ey+8.4;
  return `<path d="M-6.8 ${by+.4}Q-4.6 ${by-1.2} -2 ${by+.2}M2 ${by+.2}Q4.6 ${by-1.2} 6.8 ${by+.4}" fill="none" stroke="#2a1a14" stroke-width="1.05" stroke-linecap="round"/>
    <ellipse cx="-3.8" cy="${ey}" rx="1.3" ry="1.65" fill="#2a1a14"/><ellipse cx="3.8" cy="${ey}" rx="1.3" ry="1.65" fill="#2a1a14"/>
    <circle cx="-3.3" cy="${ey-.6}" r=".45" fill="#fff"/><circle cx="4.3" cy="${ey-.6}" r=".45" fill="#fff"/>
    <path d="M0 ${ey+1.2}Q1.5 ${ey+3.8} 0 ${ey+4.5}" fill="none" stroke="rgba(120,60,30,.55)" stroke-width="1" stroke-linecap="round"/>
    ${male ? `<path d="M-3.4 ${ey+6.4}Q0 ${ey+5} 3.4 ${ey+6.4}" fill="none" stroke="#3a2418" stroke-width="1.3" stroke-linecap="round"/>` : ''}
    <path d="M-2.9 ${ym}Q0 ${ym+2.5} 2.9 ${ym}" fill="none" stroke="${male ? '#9a3a2e' : '#c2384a'}" stroke-width="1.25" stroke-linecap="round"/>
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
      <circle cx="0" cy="-100" r="10.5" fill="${o.skin}"/>
      ${o.head === 'pheta'
        ? `<path d="M-12.5 -101Q-13 -117 0 -118Q13 -117 12.5 -101Q0 -108 -12.5 -101Z" fill="${o.cap}"/><path d="M-12 -105Q0 -110 12 -105" stroke="${o.trim}" stroke-width="1.2" fill="none"/><path d="M9 -106Q24 -108 22 -92Q15 -97 9 -98Z" fill="${o.cap}"/>`
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
    <path d="M-14 -83L-4 -85L15 -52L26 -24L14 -23L5 -50Z" fill="${o.sariDark}"/>
    <path d="M-14 -83L-4 -85L15 -52L26 -24" fill="none" stroke="${o.border}" stroke-width="1.6"/>
    <rect x="-3.4" y="-92" width="6.8" height="9" rx="3" fill="${o.skin}"/>
    <path d="M-7 -88Q0 -81 7 -88" fill="none" stroke="${o.border}" stroke-width="1.8"/>
    <g data-p="head">
      <circle cx="0" cy="-100" r="10.2" fill="${o.skin}"/>
      <path d="M-11 -100Q-12.5 -115 0 -115.5Q12.5 -115 11 -100Q9 -108 0 -109Q-9 -108 -11 -100Z" fill="${o.hair}"/>
      <circle cx="0" cy="-117" r="5.2" fill="${o.hair}"/>
      ${[-5,-1.7,1.7,5].map(x => `<circle cx="${x}" cy="-117.6" r="1.3" fill="#fff6d8"/>`).join('')}
      <path d="M-8.4 -108Q0 -104.6 8.4 -108" fill="none" stroke="#fff" stroke-width="2.3" stroke-dasharray="0.1 3.1" stroke-linecap="round"/>
      <circle cx="-10.4" cy="-97" r="1.5" fill="${o.border}"/><circle cx="10.4" cy="-97" r="1.5" fill="${o.border}"/>
      ${faceF(false)}
      <circle cx="0" cy="-102.9" r="1.15" fill="#d6173a"/>
      <circle cx="2.6" cy="-95.4" r="1.5" fill="none" stroke="${o.border}" stroke-width=".9"/>
      <g data-p="dabs"></g>
    </g>
    ${armHTML('L', o.blouse, o.skin, o.skin, 7.4, o.bangle)}${armHTML('R', o.blouse, o.skin, o.skin, 7.4, o.bangle)}
    <g data-p="bdabs"></g>
  </g>`;

const profMaleHTML = o => `
  <ellipse cx="0" cy="0" rx="20" ry="4.2" fill="rgba(60,30,20,.22)"/>
  <g data-p="legB"><path d="M0 -50V-7" stroke="${o.pantsDark}" stroke-width="9.5" stroke-linecap="round"/><path d="M-4 -3q7-6 14 0v4h-14z" fill="${o.shoe}"/></g>
  <g data-p="legF"><path d="M0 -50V-7" stroke="${o.pants}" stroke-width="10" stroke-linecap="round"/><path d="M-4 -3q7-6 14 0v4h-14z" fill="${o.shoe}"/></g>
  <g data-p="body">
    ${armHTML('F', o.coatDark, o.coatDark, o.skin, 8)}
    <path d="M-10 -84Q0 -90 10 -84L13 -28Q0 -22 -13 -28Z" fill="${o.coat}"/>
    <path d="M-10 -84L2 -85L14 -34L7 -31Z" fill="${o.stole}"/>
    <path d="M3 -86V-26" stroke="${o.trim}" stroke-width="1.2"/>
    <rect x="-3" y="-93" width="7" height="10" rx="3" fill="${o.skin}"/>
    <g data-p="head">
      <circle cx="2" cy="-101" r="10.5" fill="${o.skin}"/>
      <path d="M-9 -102Q-10 -118 3 -119Q15 -118 13 -103Q3 -110 -9 -102Z" fill="${o.cap}"/>
      <path d="M-8 -106Q-22 -108 -20 -92Q-13 -97 -7 -98Z" fill="${o.cap}"/>
      <path d="M-8 -105Q3 -110 13 -105" fill="none" stroke="${o.trim}" stroke-width="1.2"/>
      <path d="M5.2 -104.6Q7.8 -106 10.4 -104.8" fill="none" stroke="#2a1a14" stroke-width="1.05" stroke-linecap="round"/>
      <ellipse cx="7.8" cy="-101.8" rx="1.2" ry="1.6" fill="#2a1a14"/><circle cx="8.2" cy="-102.4" r=".45" fill="#fff"/>
      <path d="M11.8 -103Q16.2 -99 12.2 -96.2Z" fill="${o.skin}" stroke="rgba(120,60,30,.45)" stroke-width=".8" stroke-linejoin="round"/>
      <path d="M8.6 -95.6Q10.8 -94.8 12.6 -96" fill="none" stroke="#3a2418" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M8.4 -92.6Q10.6 -91.2 12.2 -93" fill="none" stroke="#9a3a2e" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    ${armHTML('N', o.coat, o.coat, o.skin, 8.6)}
  </g>`;

const profFemaleHTML = o => `
  <ellipse cx="0" cy="0" rx="21" ry="4.4" fill="rgba(60,30,20,.22)"/>
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
      <circle cx="2" cy="-101" r="10" fill="${o.skin}"/>
      <path d="M-9 -101Q-10 -116 3 -116.5Q14 -115 12 -102Q4 -108 -9 -101Z" fill="${o.hair}"/>
      <circle cx="-8" cy="-107" r="5.6" fill="${o.hair}"/>
      ${[-12.4,-10.6,-8.4].map((x,i) => `<circle cx="${x}" cy="${-110.6+i*3.4}" r="1.35" fill="#fff6d8"/>`).join('')}
      <path d="M4.6 -108.4Q11 -106.6 11.8 -103.6" fill="none" stroke="#fff" stroke-width="2.2" stroke-dasharray="0.1 3" stroke-linecap="round"/>
      <circle cx="11.6" cy="-104.8" r="1.2" fill="#d6173a"/>
      <path d="M5.2 -104.4Q7.6 -105.8 10 -104.6" fill="none" stroke="#2a1a14" stroke-width="1.05" stroke-linecap="round"/>
      <ellipse cx="7.6" cy="-101.8" rx="1.2" ry="1.6" fill="#2a1a14"/><circle cx="8" cy="-102.4" r=".45" fill="#fff"/>
      <path d="M11.6 -102.6Q16 -98.8 12 -96.2Z" fill="${o.skin}" stroke="rgba(120,60,30,.45)" stroke-width=".8" stroke-linejoin="round"/>
      <circle cx="13.5" cy="-96.9" r="1.5" fill="none" stroke="${o.border}" stroke-width=".9"/>
      <path d="M8.4 -92.8Q10.6 -91.4 12.2 -93.2" fill="none" stroke="#c2384a" stroke-width="1.3" stroke-linecap="round"/>
      <circle cx="1" cy="-95.5" r="1.5" fill="${o.border}"/>
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
  const f = {g, r, x, y, s, sx:1};
  f.place = () => T(g, `translate(${f.x} ${f.y}) scale(${f.s*(Math.abs(f.sx)<.06 ? .06*Math.sign(f.sx||1) : f.sx)} ${f.s})`);
  f.loc = (px,py) => [(px-f.x)/(f.s*f.sx), (py-f.y)/f.s];       /* scene point -> figure-local point */
  f.world = (lx,ly) => [f.x + f.s*f.sx*lx, f.y + f.s*ly];       /* figure-local point -> scene point */
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
/* walking pose for the side-view figures: kind 'm' = groom, 'f' = bride; p = walk phase, amp = leg swing (0 = standing) */
function walkPose(f, kind, p, amp, t){
  const a = Math.sin(p)*amp, k = amp/24;
  if (kind === 'm'){ T(f.r.legF,`rotate(${a} 0 -50)`); T(f.r.legB,`rotate(${-a} 0 -50)`); setArm(f.r,'F',-a*.8,14); setArm(f.r,'N',a*.8,14); }
  else {
    T(f.r.footF,`translate(${Math.sin(p)*7*k} ${-Math.max(0,Math.cos(p))*2*k})`); T(f.r.footB,`translate(${-Math.sin(p)*7*k} ${-Math.max(0,-Math.cos(p))*2*k})`);
    T(f.r.pallu,`rotate(${Math.sin(t*3+1)*4} -9 -84)`); setArm(f.r,'F',a*.6,12); setArm(f.r,'N',-a*.6,12);
  }
  T(f.r.body,`translate(0 ${-Math.abs(Math.sin(p))*1.5*k})`);
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
  return f;
}
const SCN = {};
