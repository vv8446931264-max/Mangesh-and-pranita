/* ===================================================================
   1. ENGAGEMENT: the couple drive off in a decorated car, "JUST ENGAGED" on the back
   =================================================================== */
SCN.sakharpuda = el => {
  const svg = el.querySelector('svg');
  const tile = s => `<g>${s}</g><g transform="translate(400 0)">${s}</g>`;
  const tree = x => `<g transform="translate(${x} 238)"><rect x="-2.5" y="-22" width="5" height="22" fill="#8a5a3a"/><circle cy="-30" r="15" fill="#5fa968"/><circle cx="-8" cy="-24" r="10" fill="#4e9a58"/><circle cx="9" cy="-25" r="10" fill="#6bb574"/></g>`;
  const heartD = 'M0 4C-7 -2 -7 -9 0 -6C7 -9 7 -2 0 4Z';
  svg.innerHTML = `
  <defs>
    <linearGradient id="enSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd8ff"/><stop offset=".72" stop-color="#ffe8cc"/><stop offset="1" stop-color="#fff3df"/></linearGradient>
    <linearGradient id="enCar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9405e"/><stop offset="1" stop-color="#8b1e3f"/></linearGradient>
    <radialGradient id="enSun"><stop offset="0" stop-color="#fff6c8"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#enSky)"/>
  <circle cx="330" cy="62" r="54" fill="url(#enSun)"/><circle cx="330" cy="62" r="19" fill="#ffd45e"/>
  <g data-l="clouds">${tile(`<g fill="#fff" opacity=".93"><ellipse cx="70" cy="52" rx="30" ry="10"/><ellipse cx="88" cy="44" rx="18" ry="11"/><ellipse cx="52" cy="46" rx="16" ry="9"/></g>
    <g fill="#fff" opacity=".85"><ellipse cx="250" cy="82" rx="26" ry="8"/><ellipse cx="266" cy="75" rx="16" ry="9"/></g>
    <g fill="#fff" opacity=".9"><ellipse cx="368" cy="40" rx="20" ry="7"/><ellipse cx="380" cy="34" rx="12" ry="8"/></g>`)}</g>
  <g data-l="hills">${tile(`<path d="M0 205Q50 168 100 192T200 198T300 186T400 205V242H0Z" fill="#cbe8c2"/><path d="M0 216Q70 190 140 210T280 208T400 216V242H0Z" fill="#b3d9a9"/>`)}</g>
  <g data-l="village">${tile(`
    <g transform="translate(100 240)"><rect x="-16" y="-34" width="32" height="34" fill="#f8dcc2"/><path d="M-19 -34L0 -68L19 -34Z" fill="#e8730c"/><path d="M-8 -34L0 -50L8 -34Z" fill="#fff" opacity=".4"/><rect x="-5" y="-18" width="10" height="18" rx="5" fill="#8b1e3f"/><circle cy="-70" r="2.6" fill="#c8921f"/></g>
    <g transform="translate(250 240)"><rect x="-22" y="-26" width="44" height="26" fill="#fff0d8"/><path d="M-26 -26L0 -46L26 -26Z" fill="#c8501c"/><rect x="-12" y="-17" width="9" height="17" fill="#8b5a3a"/><rect x="4" y="-20" width="10" height="9" fill="#9fd8ff"/></g>
    ${tree(30)}${tree(175)}${tree(335)}`)}</g>
  <rect y="238" width="400" height="62" fill="#a9a7b2"/><rect y="238" width="400" height="7" fill="#efe0c8"/><rect y="245" width="400" height="3" fill="rgba(0,0,0,.1)"/>
  <g data-l="near">${tile(`
    <g transform="translate(60 246)"><ellipse rx="24" ry="10" fill="#4e9a58"/>${[-14,-5,5,14,-9,9].map((x,i)=>`<circle cx="${x}" cy="${-4-(i%3)*2}" r="3.4" fill="${i%2?'#ffd23f':'#f4a300'}"/>`).join('')}</g>
    <g transform="translate(205 247)"><rect x="-1.6" y="-50" width="3.2" height="50" fill="#7a5a3a"/><circle cy="-52" r="5.4" fill="#ffe9a0"/><circle cy="-52" r="10" fill="#ffe9a0" opacity=".35"/></g>
    <g transform="translate(330 246)"><ellipse rx="24" ry="10" fill="#4e9a58"/>${[-14,-5,5,14,-9,9].map((x,i)=>`<circle cx="${x}" cy="${-4-(i%3)*2}" r="3.4" fill="${i%2?'#ff7aa8':'#f4a300'}"/>`).join('')}</g>`)}</g>
  <g data-l="lane"><path d="M-60 288H470" stroke="#fff" stroke-width="3.5" stroke-dasharray="26 22" opacity=".9"/></g>
  <g data-l="fx"></g>
  <g data-l="car" transform="translate(215 272) scale(.95)">
    <ellipse cx="-4" cy="2" rx="114" ry="6" fill="rgba(40,20,30,.3)"/>
    <g data-l="cb">
      <!-- heart balloons tied to the back -->
      <g data-l="balloons" transform="translate(-124 -50)">
        <path d="M0 0Q-6 -30 -14 -58M0 0Q4 -34 6 -70M0 0Q12 -28 24 -52" fill="none" stroke="#b9b0a4" stroke-width="1"/>
        <g transform="translate(-14 -58)"><path d="M0 8C-13 -4 -13 -18 0 -12C13 -18 13 -4 0 8Z" fill="#e8508a"/><path d="M-5 -8Q-8 -4 -6 0" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/></g>
        <g transform="translate(6 -70)"><path d="M0 8C-13 -4 -13 -18 0 -12C13 -18 13 -4 0 8Z" fill="#f4a300"/><path d="M-5 -8Q-8 -4 -6 0" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/></g>
        <g transform="translate(24 -52)"><path d="M0 8C-13 -4 -13 -18 0 -12C13 -18 13 -4 0 8Z" fill="#d9405e"/><path d="M-5 -8Q-8 -4 -6 0" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/></g>
      </g>
      <!-- the sign on the back -->
      <g data-l="sign" transform="translate(-104 -46)">
        <path d="M-8 6L0 -2M-84 6L-3 -6" stroke="#8b6b4a" stroke-width="1.4" fill="none"/>
        <rect x="-86" y="6" width="80" height="36" rx="6" fill="#fffdf6" stroke="#8b1e3f" stroke-width="2.6"/>
        <rect x="-83" y="9" width="74" height="30" rx="4" fill="none" stroke="#f4a300" stroke-width="1" stroke-dasharray="3 3"/>
        <text x="-46" y="21" text-anchor="middle" font-size="9" font-weight="600" letter-spacing="3.2" fill="#e8730c">JUST</text>
        <text x="-46" y="35" text-anchor="middle" font-size="12.5" font-weight="700" letter-spacing="1.4" fill="#8b1e3f">ENGAGED</text>
        <g transform="translate(-78 16) scale(.55)"><path d="${heartD}" fill="#e8508a"/></g><g transform="translate(-14 16) scale(.55)"><path d="${heartD}" fill="#e8508a"/></g>
        <circle cx="-76" cy="34" r="3" fill="none" stroke="#c8921f" stroke-width="1.4"/><circle cx="-71" cy="34" r="3" fill="none" stroke="#c8921f" stroke-width="1.4"/>
        <circle cx="-21" cy="34" r="3" fill="none" stroke="#c8921f" stroke-width="1.4"/><circle cx="-16" cy="34" r="3" fill="none" stroke="#c8921f" stroke-width="1.4"/>
        <path d="M-6 30Q10 36 4 46Q-2 52 8 58M-6 24Q16 22 14 36Q12 44 22 48" fill="none" stroke="#ffd23f" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M-6 34Q8 44 -2 52Q-6 58 4 62" fill="none" stroke="#ff7aa8" stroke-width="2.2" stroke-linecap="round"/>
      </g>
      <!-- bride (behind) -->
      <g data-l="brideBust" opacity="0" transform="translate(-36 0)">
        <g data-l="brideArm" transform="translate(11 -56)"><g data-l="wave"><path d="M0 0L4 -16" stroke="#8b1e3f" stroke-width="6.4" stroke-linecap="round"/><path d="M4 -16L8 -32" stroke="#f3c9a5" stroke-width="5" stroke-linecap="round"/><path d="M5 -26h6M5.6 -22h6" stroke="#d9a521" stroke-width="1.4"/><circle cx="8.6" cy="-34.5" r="3.4" fill="#f3c9a5"/></g></g>
        <path d="M-14 -40Q-14 -64 0 -66Q12 -64 14 -40Z" fill="#8b1e3f"/>
        <path d="M-14 -62Q0 -71 14 -58L16 -40L-14 -40Z" fill="#2f8f5b"/><path d="M-14 -62Q0 -71 14 -58" fill="none" stroke="#d9a521" stroke-width="1.6"/>
        <rect x="-2.6" y="-72" width="6.2" height="8" rx="3" fill="#f3c9a5"/>
        <g data-l="brideH">
          <circle cx="1" cy="-79" r="9.6" fill="#f3c9a5"/>
          <path d="M-9 -79Q-10 -92 2 -92.6Q12 -91 10.6 -80Q3 -85 -9 -79Z" fill="#2a1a14"/><circle cx="-8" cy="-85" r="5" fill="#2a1a14"/>
          ${[-12,-10.4,-8.4].map((x,i)=>`<circle cx="${x}" cy="${-88.4+i*3.2}" r="1.2" fill="#fff6d8"/>`).join('')}
          <path d="M4.4 -89Q10 -87 10.8 -83.8" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="0.1 2.8" stroke-linecap="round"/>
          <circle cx="10.6" cy="-84.4" r="1.1" fill="#d6173a"/>
          <path d="M4.8 -83.6Q6.8 -84.8 8.8 -83.8" fill="none" stroke="#2a1a14" stroke-width=".95" stroke-linecap="round"/>
          <ellipse cx="6.6" cy="-80.8" rx="1.05" ry="1.4" fill="#2a1a14"/><circle cx="6.9" cy="-81.3" r=".4" fill="#fff"/>
          <path d="M10.4 -81Q13.8 -77.8 10.6 -75.6Z" fill="#f3c9a5" stroke="rgba(120,60,30,.45)" stroke-width=".7" stroke-linejoin="round"/>
          <circle cx="12" cy="-76.4" r="1.3" fill="none" stroke="#d9a521" stroke-width=".8"/>
          <path d="M7 -73.2Q9 -71.8 10.4 -73.4" fill="none" stroke="#c2384a" stroke-width="1.15" stroke-linecap="round"/>
        </g>
      </g>
      <!-- groom (front seat) -->
      <g data-l="groomBust" opacity="0" transform="translate(4 0)">
        <path d="M-14 -40Q-14 -66 0 -67Q12 -66 14 -40Z" fill="#fff0d0" stroke="#c8921f" stroke-width=".8"/>
        <path d="M-12 -62L-2 -66L14 -44L8 -41Z" fill="#e8730c"/>
        <rect x="-2.6" y="-73" width="6.2" height="8" rx="3" fill="#e2aa7e"/>
        <g data-l="groomH">
          <circle cx="1" cy="-80" r="10" fill="#e2aa7e"/>
          <path d="M-10 -81Q-11 -97 3 -98Q14 -97 12 -82Q2 -90 -10 -81Z" fill="#e8730c"/>
          <path d="M-8 -86Q-23 -88 -21 -72Q-14 -77 -7 -79Z" fill="#e8730c"/>
          <path d="M-9 -86Q3 -91 12 -86" fill="none" stroke="#c8921f" stroke-width="1.2"/>
          <path d="M5.4 -84.4Q7.6 -85.8 9.8 -84.6" fill="none" stroke="#2a1a14" stroke-width="1" stroke-linecap="round"/>
          <ellipse cx="7.4" cy="-81.6" rx="1.1" ry="1.5" fill="#2a1a14"/><circle cx="7.7" cy="-82.1" r=".4" fill="#fff"/>
          <path d="M10.8 -82.2Q14.4 -78.8 11 -76.4Z" fill="#e2aa7e" stroke="rgba(120,60,30,.45)" stroke-width=".7" stroke-linejoin="round"/>
          <path d="M7.6 -76Q10 -75.4 11.4 -76.4" fill="none" stroke="#3a2418" stroke-width="1.1" stroke-linecap="round"/>
          <path d="M7.4 -73.6Q9.6 -72.2 11 -73.8" fill="none" stroke="#9a3a2e" stroke-width="1.15" stroke-linecap="round"/>
        </g>
      </g>
      <!-- car body -->
      <path d="M-104 -16L-104 -34Q-104 -42 -94 -42L-40 -44L36 -44L66 -46Q92 -44 102 -36L104 -20Q104 -14 96 -14L-96 -14Q-104 -14 -104 -16Z" fill="url(#enCar)"/>
      <path d="M-100 -36Q0 -40 100 -34" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
      <rect x="-74" y="-48" width="116" height="6" rx="3" fill="#5a1128"/>
      <path d="M34 -44L47 -70L52 -70L46 -44Z" fill="rgba(190,230,255,.85)" stroke="#c8921f" stroke-width="1.6"/>
      <path d="M-18 -42V-17" stroke="rgba(0,0,0,.22)"/><rect x="-12" y="-37" width="10" height="2.6" rx="1.3" fill="#f1dc8c"/>
      <circle cx="97" cy="-37" r="5.4" fill="#fff6c0" stroke="#c8921f" stroke-width="1.4"/><rect x="99" y="-30" width="5" height="12" fill="#d9dde6"/>
      <rect x="99" y="-19" width="10" height="4" rx="2" fill="#d9dde6"/><rect x="-110" y="-19" width="10" height="4" rx="2" fill="#d9dde6"/>
      <path d="M-100 -41Q-30 -34 36 -43T102 -35" fill="none" stroke="#f4a300" stroke-width="6.4" stroke-dasharray="0.1 7.6" stroke-linecap="round"/>
      <path d="M-100 -41Q-30 -34 36 -43T102 -35" fill="none" stroke="#ff7aa8" stroke-width="4.4" stroke-dasharray="0.1 7.6" stroke-dashoffset="3.8" stroke-linecap="round"/>
      <circle cx="-62" cy="-16" r="18.5" fill="#3a1520"/><circle cx="64" cy="-16" r="18.5" fill="#3a1520"/>
    </g>
    <g transform="translate(-62 -16)"><circle r="16" fill="#2b2b33"/><circle r="10.5" fill="#e4e8f0"/><g data-l="w1">${[0,60,120].map(a=>`<path d="M0 -10V10" stroke="#9aa0ae" stroke-width="1.8" transform="rotate(${a})"/>`).join('')}</g><circle r="3.4" fill="#8b8f99"/></g>
    <g transform="translate(64 -16)"><circle r="16" fill="#2b2b33"/><circle r="10.5" fill="#e4e8f0"/><g data-l="w2">${[0,60,120].map(a=>`<path d="M0 -10V10" stroke="#9aa0ae" stroke-width="1.8" transform="rotate(${a})"/>`).join('')}</g><circle r="3.4" fill="#8b8f99"/></g>
  </g>
  <g data-l="ppl"></g>
  <g data-l="fx2"></g>`;
  const L = {}; svg.querySelectorAll('[data-l]').forEach(n => L[n.dataset.l] = n);
  const heart = (x,y) => {
    const h = mk('path', {d:heartD, fill:['#e8508a','#ff7a8a','#f4a300'][Math.random()*3|0]}, L.fx2);
    const dx = -30-Math.random()*50, dy = -50-Math.random()*40;
    h.animate([{transform:`translate(${x}px,${y}px) scale(.5)`,opacity:0},{opacity:1,offset:.2},{transform:`translate(${x+dx}px,${y+dy}px) scale(1.4)`,opacity:0}],{duration:2300,easing:'ease-out'}).onfinish = () => h.remove();
  };
  const dust = (x,y) => {
    const c = mk('circle', {r:5, fill:'#e9dcc8', opacity:.8}, L.fx);
    c.animate([{transform:`translate(${x}px,${y}px) scale(.6)`,opacity:.8},{transform:`translate(${x-26}px,${y-7}px) scale(2.6)`,opacity:0}],{duration:900,easing:'ease-out'}).onfinish = () => c.remove();
  };
  /* The couple: first they exchange rings, then walk to the car, get in and drive away. */
  const gF = fig(L.ppl, P.pGroom, 335, 284, .66), bF = fig(L.ppl, P.pBride, 372, 284, .66);
  bF.sx = -1; bF.place();
  const rings = mk('g', {opacity:0}, L.ppl);
  rings.innerHTML = `<circle cx="-4.5" cy="0" r="4.8" fill="none" stroke="#d9a521" stroke-width="2.1"/><circle cx="4.5" cy="0" r="4.8" fill="none" stroke="#e3a094" stroke-width="2.1"/>
    <path d="M0 -15L1.8 -3.4L11 0L1.8 3.4L0 15L-1.8 3.4L-11 0L-1.8 -3.4Z" fill="#fff" stroke="#f4a300" stroke-width=".8"/>`;
  const SEAT = {g:219, b:181};                                   /* where they sit in the car (scene x) */
  const CYC = 18.5, SP = {clouds:6, hills:14, village:38, near:95, lane:190};
  const off = {clouds:0, hills:0, village:0, near:0, lane:0};
  let wheel = 0, lastT = 0, nh = 0, nd = 0, prev = 0;
  const run = runner(time => {
    const t = time % CYC, dt = Math.max(0, Math.min(.05, time - lastT)); lastT = time;
    const cross = x => prev < x && t >= x;
    /* the car stands still while they exchange rings and get in, then pulls away */
    const spd = ph(t,7.7,9.3) * (1 - ph(t,16.2,17.6));
    for (const k in SP) off[k] = (off[k] + dt*SP[k]*spd) % (k === 'lane' ? 48 : 400);
    wheel += dt*430*spd;
    T(L.clouds, `translate(${-off.clouds} 0)`); T(L.hills, `translate(${-off.hills} 0)`); T(L.village, `translate(${-off.village} 0)`);
    T(L.near, `translate(${-off.near} 0)`); T(L.lane, `translate(${-off.lane} 0)`);
    T(L.cb, `translate(0 ${(Math.sin(t*14)*.9 + Math.sin(t*5.3)*.7)*spd}) rotate(${Math.sin(t*4.1)*.5*spd})`);
    T(L.w1, `rotate(${wheel})`); T(L.w2, `rotate(${wheel})`);
    T(L.sign, `translate(-104 -46) rotate(${Math.sin(t*5.2)*3.4*(.3+.7*spd)})`);
    T(L.balloons, `translate(-124 -50) rotate(${Math.sin(t*2.6)*6})`);
    T(L.wave, `rotate(${Math.sin(t*7)*22})`);
    T(L.brideH, `rotate(${Math.sin(t*3)*3} 1 -70)`);
    T(L.groomH, `translate(0 ${Math.sin(t*9)*.7}) rotate(${Math.sin(t*2.2)*2.5} 1 -70)`);
    const seated = ph(t,6.9,7.4);
    L.brideBust.setAttribute('opacity', seated); L.groomBust.setAttribute('opacity', seated);

    /* 1. they stand facing each other and exchange rings */
    const rise = ph(t,.7,1.7) * (1 - ph(t,3.3,3.9));
    /* 2. then turn, walk to the car and climb in */
    const turn = ph(t,3.5,3.9), wk = clamp((t-3.9)/3.0), step = ph(wk,.85,1), amp = (t > 3.9 && wk < 1) ? 24 : 0;
    gF.x = lerp(335, SEAT.g, wk); bF.x = lerp(372, SEAT.b, wk);
    gF.y = lerp(284, 272, step); bF.y = lerp(284, 272, step);
    gF.sx = lerp(1, -1, turn); bF.sx = -1; gF.place(); bF.place();
    const op = ph(t,0,.5) * (1 - ph(t,6.9,7.4));
    gF.g.setAttribute('opacity', op); bF.g.setAttribute('opacity', op);
    walkPose(gF, 'm', t*8, amp, t); walkPose(bF, 'f', t*8+1, amp, t);
    if (t < 3.9){
      reach(gF.r,'N', lerp(8,27,rise), lerp(-40,-62,rise)); reach(bF.r,'N', lerp(8,22.5,rise), lerp(-40,-62,rise));
      T(gF.r.body, `translate(0 ${Math.sin(t*2)*.5})`); T(bF.r.body, `translate(0 ${Math.sin(t*2+1)*.5})`);
    }
    /* the rings and a little sparkle where their hands meet */
    const h1 = hand(gF,'N'), h2 = hand(bF,'N'), ro = ph(t,1.9,2.3) * (1 - ph(t,3.2,3.6));
    rings.setAttribute('opacity', ro); T(rings, `translate(${(h1[0]+h2[0])/2} ${(h1[1]+h2[1])/2-2}) scale(${.2+ro*(1+.25*Math.sin(Math.PI*ro))}) rotate(${t*40})`);
    if (cross(2.0)){ Aud.fx('sparkle'); heart(347, 240); }
    if (cross(2.9)){ Aud.fx('chime'); heart(340, 244); }

    /* 3. driving away: hearts and dust only while the car moves */
    if (spd > .35 && time > nh){ nh = time + .75; heart(205, 174); }
    if (spd > .35 && time > nd){ nd = time + .22; dust(215-62*.95-14, 266); }
    prev = t;
  });
  return run;
};

/* ===================================================================
   2. HALDI: dancing relatives, turmeric on the couple's faces, dhol
   =================================================================== */
SCN.haldi = el => {
  const svg = el.querySelector('svg');
  let arches = '', garland = '', petals = '';
  for (let i=0;i<4;i++) arches += `<path d="M${22+i*98} 240V150Q${22+i*98} 108 ${52+i*98} 108Q${82+i*98} 108 ${82+i*98} 150V240" fill="rgba(255,255,255,.35)" stroke="#f5c242" stroke-width="2.4" opacity=".75"/>`;
  for (let i=0;i<29;i++){
    const x = 7+i*14, n = 3+((i*7)%5);
    garland += `<g class="sway vb" style="transform-origin:${x}px 0px;animation-delay:${-i*.23}s"><line x1="${x}" y1="0" x2="${x}" y2="${n*9}" stroke="#7a9a3a" stroke-width="1"/>`
      + Array.from({length:n},(_,k)=>`<circle cx="${x}" cy="${6+k*9}" r="5" fill="${k%2?'#ffd23f':'#f4a300'}"/><circle cx="${x}" cy="${6+k*9}" r="2" fill="#e8730c"/>`).join('') + '</g>';
  }
  for (let i=0;i<10;i++) petals += `<ellipse class="petalf" cx="${20+i*38}" cy="0" rx="3.2" ry="6.4" fill="${i%2?'#ffb703':'#ff8a2b'}" style="animation-duration:${5+i%4}s;animation-delay:${-i*.9}s"/>`;
  svg.innerHTML = `
  <defs>
    <linearGradient id="hdWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#fff3c4"/></linearGradient>
    <linearGradient id="hdFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7d98a"/><stop offset="1" stop-color="#eec46a"/></linearGradient>
    <radialGradient id="hdGlow" cx="50%" cy="58%" r="50%"><stop offset="0" stop-color="#fffbe0" stop-opacity=".95"/><stop offset="1" stop-color="#fffbe0" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#hdWall)"/><rect width="400" height="300" fill="url(#hdGlow)"/>
  ${arches}${garland}
  <path d="M0 238Q200 224 400 238V300H0Z" fill="url(#hdFloor)"/>
  <ellipse cx="200" cy="270" rx="150" ry="22" fill="#ffb703" opacity=".55"/>
  <ellipse cx="200" cy="270" rx="130" ry="17" fill="none" stroke="#fff6d8" stroke-width="2" stroke-dasharray="3 6"/>
  <ellipse cx="200" cy="270" rx="100" ry="12" fill="#ff9f1c" opacity=".35"/>
  <g data-l="cast"></g><g data-l="fx"></g><g>${petals}</g>`;
  const cast = svg.querySelector('[data-l="cast"]'), fx = svg.querySelector('[data-l="fx"]');
  const dF = bodyRig(fig(cast, P.danceF, 52, 266, 1));
  const aA = bodyRig(fig(cast, P.auntA, 128, 266, 1.02));
  const gr = bodyRig(fig(cast, P.hGroom, 178, 268, 1.12));
  const br = bodyRig(fig(cast, P.hBride, 224, 268, 1.12));
  const aB = bodyRig(fig(cast, P.auntB, 274, 266, 1.02));
  const dM = bodyRig(fig(cast, P.danceM, 352, 266, 1));
  const drum = mk('g', {}, cast);   /* the two kids are added after the bowls so they run in front */
  drum.innerHTML = `<rect x="-26" y="-11" width="52" height="22" rx="9" fill="#b4472a" stroke="#7a2a14" stroke-width="2"/>
    <ellipse cx="-26" cy="0" rx="4.5" ry="11" fill="#f2d9a8" stroke="#7a2a14" stroke-width="1.6"/><ellipse cx="26" cy="0" rx="4.5" ry="11" fill="#f2d9a8" stroke="#7a2a14" stroke-width="1.6"/>
    <path d="M-18 -11L-12 11M-6 -11L0 11M6 -11L12 11M18 -11L24 11" stroke="#ffd24d" stroke-width="1.6"/>`;
  const bowls = [aA,aB].map(() => { const b = mk('g', {}, cast); b.innerHTML = `<path d="M-7 0Q0 9 7 0Z" fill="#c8501c"/><ellipse cx="0" cy="0" rx="7" ry="2.4" fill="#ffc400"/><path d="M-4 -1Q0 -6 4 -1Z" fill="#ffb300"/>`; return b; });
  const kidA = bodyRig(fig(cast, P.kidA, 60, 276, .6)), kidB = bodyRig(fig(cast, P.kidB, 340, 274, .56));
  [dF,aA,gr,br,aB,dM,kidA,kidB].forEach(f => f.setBody(0,0,0));

  const puff = (x,y,col) => {
    const c = mk('circle', {r:6, fill:col||'#ffc400', opacity:.7}, fx);
    c.animate([{transform:`translate(${x}px,${y}px) scale(.4)`,opacity:.8},{transform:`translate(${x}px,${y-10}px) scale(3.4)`,opacity:0}],{duration:1100,easing:'ease-out'}).onfinish = () => c.remove();
  };
  const burst = (x,y) => {
    puff(x,y);
    for (let i=0;i<16;i++){
      const c = mk('circle', {r:1.6+Math.random()*2, fill:['#ffc400','#ff9f1c','#ffe066'][i%3]}, fx), a = Math.random()*6.28, d = 20+Math.random()*50;
      c.animate([{transform:`translate(${x}px,${y}px)`,opacity:1},{transform:`translate(${x+Math.cos(a)*d}px,${y+Math.sin(a)*d+22}px)`,opacity:0}],{duration:900+Math.random()*500,easing:'ease-out'}).onfinish = () => c.remove();
    }
  };
  const HC = ['#f5b800','#ffc933','#e6a400'], pick = a => a[Math.random()*a.length|0];
  const fade = (e, dur, peak) => { e.animate([{opacity:peak},{opacity:peak*.8,offset:.4},{opacity:0}], {duration:dur, fill:'forwards'}).onfinish = () => e.remove(); };
  const addDab = f => {
    const side = Math.random()<.5 ? -1 : 1, put = (g,cx,cy,rx,ry,dur,peak) => { if (!g) return; const e = mk('ellipse', {cx,cy,rx,ry,fill:pick(HC), class:'dabE'}, g); fade(e, dur, peak); };
    /* cheek: small, see-through and quick to fade, so the face always shows through */
    put(f.r.dabs, side*(5.6+Math.random()*2.4), -97.5+Math.random()*3.5, 1.5+Math.random()*1.5, 1.2+Math.random()*1.2, 2600+Math.random()*900, .5);
    /* shoulder, upper arm, forearm and hand */
    put(f.r.bdabs, side*(13+Math.random()*5), -80+Math.random()*4, 3.2+Math.random()*2, 2.4+Math.random()*1.4, 5200+Math.random()*1500, .62);
    put(f.r['u'+(side<0?'L':'R')], (Math.random()-.5)*4, L1*(.35+Math.random()*.3), 2.4+Math.random()*1.2, 3+Math.random()*1.4, 5200, .62);
    put(f.r['f'+(Math.random()<.5?'L':'R')], (Math.random()-.5)*3, L2*(.55+Math.random()*.4), 2.2+Math.random()*1.2, 2.6+Math.random()*1.2, 4800, .7);
  };  svg.addEventListener('pointerdown', ev => {
    const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse()); burst(p.x, p.y); Aud.fx('dhol');
  });

  const CYC = 2.6, lastCyc = {A:-1,B:-1};
  /* a relative reaches to the couple's cheek, rubs haldi, and returns */
  function applyHaldi(a, bowl, f, side, arm, key, t, off){
    const idx = Math.floor((t+off)/CYC), u = ((t+off)%CYC)/CYC, tgt = f.world(side*9, -97);
    const sh = a.world(arm==='R' ? 22 : -22, -50), restP = [sh[0], sh[1]];
    let p;
    if (u<.28){ const k = ease(u/.28); p = [lerp(restP[0],tgt[0],k), lerp(restP[1],tgt[1],k)]; }
    else if (u<.7){ const w = (u-.28)*42; p = [tgt[0]+Math.sin(w)*2.4, tgt[1]+Math.cos(w*1.3)*2]; }
    else { const k = ease((u-.7)/.3); p = [lerp(tgt[0],restP[0],k), lerp(tgt[1],restP[1],k)]; }
    const q = a.locB(p[0],p[1]); reach(a.r, arm, q[0], q[1]);
    const other = arm==='R' ? 'L' : 'R', bx = a.world(other==='R' ? 15 : -15, -56);
    const o = a.locB(bx[0], bx[1]); reach(a.r, other, o[0], o[1]);
    const hp = a.handB(other); T(bowl, `translate(${hp[0]} ${hp[1]+4})`);
    if (u>=.35 && lastCyc[key] !== idx){ lastCyc[key] = idx; addDab(f); puff(tgt[0], tgt[1], '#ffc400'); }
    return u>.2 && u<.8 ? Math.sin(Math.PI*clamp((u-.2)/.6)) : 0;
  }
  let np = 0, kidT = 0, kidB2 = 0;
  return runner(t => {
    const w = 2*Math.PI*1.25;
    /* dancing woman, arms up */
    setArm(dF.r,'L', 148+14*Math.sin(w*t), 52+22*Math.sin(w*t+1));
    setArm(dF.r,'R',-(148+14*Math.sin(w*t+Math.PI)), -(52+22*Math.sin(w*t+1+Math.PI)));
    dF.setBody(0, -Math.abs(Math.sin(w*t/2))*3.4, 7*Math.sin(w*t/2));
    T(dF.r.skirt, `rotate(${4*Math.sin(w*t/2+.6)} 0 -52)`);
    T(dF.r.head, `rotate(${6*Math.sin(w*t/2+.5)} 0 -90)`);
    /* dhol player */
    const beat = 2*Math.PI*2.2*t, hitL = Math.max(0,Math.sin(beat)), hitR = Math.max(0,Math.sin(beat+Math.PI));
    dM.setBody(0, -Math.abs(Math.sin(beat/2))*2.2, 3*Math.sin(beat/2));
    T(dM.r.legL, `rotate(${7*Math.sin(beat/2)} -6 -50)`); T(dM.r.legR, `rotate(${-7*Math.sin(beat/2)} 6 -50)`);
    { const a = dM.locB(352-27, 205+hitL*8), b = dM.locB(352+27, 205+hitR*8); reach(dM.r,'L',a[0],a[1]); reach(dM.r,'R',b[0],b[1]); }
    T(drum, `translate(352 ${216-Math.abs(Math.sin(beat/2))*2.2}) scale(${1+.035*Math.max(hitL,hitR)})`);
    T(dM.r.head, `rotate(${5*Math.sin(beat/2)} 0 -90)`);
    /* relatives applying haldi */
    const kA = applyHaldi(aA, bowls[0], gr, -1, 'R', 'A', t, 0);
    const kB = applyHaldi(aB, bowls[1], br,  1, 'L', 'B', t, 1.3);
    aA.setBody(5*kA+1, 0, 7+5*kA); aB.setBody(-5*kB-1, 0, -7-5*kB);
    /* the couple: hands folded, bowing slightly into the blessing */
    [gr,br].forEach((f,i) => { namaste(f); f.setBody(0, Math.sin(t*2+i)*.5, Math.sin(t*1.4+i)*1.6); });
    T(gr.r.head, `rotate(${-8*kA} 0 -90)`); T(br.r.head, `rotate(${8*kB} 0 -90)`);
    /* two kids chase each other back and forth in front of everyone, throwing haldi */
    { const a1 = t*.62, a2 = t*.62 + 2.4;
      [[kidA,a1,0,.6,276],[kidB,-a2,1,.56,274]].forEach(([k,a,id,sc,y0]) => {
        const vx = Math.cos(a)*(id ? -1 : 1), ph2 = t*11 + id*2;
        k.x = 200 + 168*Math.sin(a); k.y = y0 + 7*Math.sin(t*1.3 + id*2); k.s = sc*(1 + (k.y-270)/180);
        k.sx = clamp(vx*5, -1, 1); k.place();
        k.setBody(0, -Math.abs(Math.sin(ph2))*3.4, 7*Math.sin(ph2) * (k.sx < 0 ? -1 : 1) * .5);
        if (k.r.legL){ T(k.r.legL, `rotate(${26*Math.sin(ph2)} -6 -50)`); T(k.r.legR, `rotate(${-26*Math.sin(ph2)} 6 -50)`); }
        else { T(k.r.skirt, `rotate(${5*Math.sin(ph2)} 0 -52)`); }
        setArm(k.r,'L', 40+34*Math.sin(ph2), -30); setArm(k.r,'R', 150+22*Math.sin(ph2+1.4), 20);
      });
      if (t > kidT){ kidT = t + .8; const k = Math.random()<.5 ? kidA : kidB; puff(k.x + (k.sx>0?14:-14), k.y-52*k.s/.6, '#ffc400'); }
      if (t > kidB2 && Math.abs(kidA.x - kidB.x) < 46){ kidB2 = t + 2.2; burst((kidA.x+kidB.x)/2, 235); }
    }
    if (t > np){ np = t + 1.3; puff(30+Math.random()*50, 150+Math.random()*30, '#ffb703'); puff(330+Math.random()*50, 160+Math.random()*30, '#ff8a2b'); }
  });
};

/* ===================================================================
   3. WEDDING: Antarpat lifts, couple exchange varmala and rings
   =================================================================== */
const garlandHTML = (id, c2) => {
  const U = 'M-11 0C-15 27 15 27 11 0';          /* the garland hanging round the neck, down over the chest */
  return `<g data-l="${id}"><g data-p="ring"><ellipse rx="17" ry="8" fill="none" stroke="#3d8b4e" stroke-width="2.4"/>
  <ellipse rx="17" ry="8" fill="none" stroke="#f4a300" stroke-width="7.5" stroke-dasharray="0.1 8.8" stroke-linecap="round"/>
  <ellipse rx="17" ry="8" fill="none" stroke="${c2}" stroke-width="5" stroke-dasharray="0.1 8.8" stroke-dashoffset="4.4" stroke-linecap="round"/></g>
  <g data-p="hang" opacity="0"><path d="${U}" fill="none" stroke="#3d8b4e" stroke-width="2.4"/>
  <path d="${U}" fill="none" stroke="#f4a300" stroke-width="7.5" stroke-dasharray="0.1 7.6" stroke-linecap="round"/>
  <path d="${U}" fill="none" stroke="${c2}" stroke-width="5" stroke-dasharray="0.1 7.6" stroke-dashoffset="3.8" stroke-linecap="round"/>
  <path d="M-11 0Q0 -5 11 0" fill="none" stroke="#f4a300" stroke-width="4.4" stroke-dasharray="0.1 6" stroke-linecap="round"/></g></g>`;
};
const scallops = (w, depth, n) => { let d = `M0 0H${w}V22`; for (let i=0;i<n;i++) d += `q${-w/n/2} ${depth} ${-w/n} 0`; return d + 'Z'; };

SCN.lagna = el => {
  const svg = el.querySelector('svg');
  /* continuous rose petals falling through the wedding scene */
  const RC = [['#b3123f','#e0457b'],['#c2185b','#f06292'],['#d81b60','#ff80ab'],['#e91e63','#f8bbd0']];
  const rose = Array.from({length:22}, (_,i) => { const c = RC[i%4], s = .8+((i*7)%5)*.14;
    return `<g transform="translate(${12+i*17.6} 0) scale(${s})"><path class="rosef" d="M0 -8C7 -6 7 4 0 8C-7 4 -7 -6 0 -8Z" fill="${c[i%2?1:0]}" stroke="${c[0]}" stroke-width=".5" style="animation-duration:${6+(i*5)%5}s;animation-delay:${-(i*1.37)%9}s"/></g>`; }).join('');
  let petals = '';
  for (let i=0;i<14;i++) petals += `<ellipse class="petalf" cx="${14+i*28}" cy="0" rx="3.4" ry="6.6" fill="${['#ff7aa8','#ffb703','#ff8a2b','#fff'][i%4]}" style="animation-duration:${4+i%4}s;animation-delay:${-i*.7}s"/>`;
  svg.innerHTML = `
  <defs>
    <linearGradient id="wdBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff1d6"/><stop offset="1" stop-color="#ffd9a8"/></linearGradient>
    <linearGradient id="wdDrape" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b3263f"/><stop offset="1" stop-color="#7d1a35"/></linearGradient>
    <linearGradient id="wdGold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8921f"/><stop offset=".5" stop-color="#ffe9a0"/><stop offset="1" stop-color="#c8921f"/></linearGradient>
    <radialGradient id="wdGlow"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".85"/><stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient>
    <pattern id="wdPat" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M11 3L19 11L11 19L3 11Z" fill="none" stroke="#f1c75a" stroke-width="1" opacity=".6"/><circle cx="11" cy="11" r="1.6" fill="#f1c75a" opacity=".8"/></pattern>
  </defs>
  <rect width="400" height="300" fill="url(#wdBg)"/>
  <rect x="46" y="22" width="308" height="232" fill="url(#wdDrape)"/><rect x="46" y="22" width="308" height="232" fill="url(#wdPat)"/>
  <ellipse cx="200" cy="168" rx="124" ry="104" fill="url(#wdGlow)"/>
  <g>${[14,354].map(x=>`<rect x="${x}" y="20" width="34" height="236" fill="url(#wdGold)"/><rect x="${x}" y="64" width="34" height="14" fill="#a3203f"/><rect x="${x}" y="150" width="34" height="14" fill="#a3203f"/><rect x="${x-4}" y="246" width="42" height="12" rx="3" fill="#c8921f"/>`).join('')}</g>
  <path d="${scallops(400,26,8)}" fill="#a3203f" stroke="#e8b84a" stroke-width="2"/>
  <path d="M40 36Q120 76 200 36T360 36" fill="none" stroke="#f4a300" stroke-width="7" stroke-dasharray="0.1 8.4" stroke-linecap="round"/>
  <path d="M40 36Q120 76 200 36T360 36" fill="none" stroke="#ff7aa8" stroke-width="4.6" stroke-dasharray="0.1 8.4" stroke-dashoffset="4.2" stroke-linecap="round"/>
  <path d="M0 250H400V300H0Z" fill="#f2cf9a"/>
  <ellipse cx="200" cy="270" rx="122" ry="18" fill="#fff3d0"/><ellipse cx="200" cy="270" rx="108" ry="15" fill="#e85d8a"/><ellipse cx="200" cy="270" rx="94" ry="12.5" fill="#ffd23f"/>
  <ellipse cx="200" cy="270" rx="78" ry="10" fill="#2f8f5b"/><ellipse cx="200" cy="270" rx="60" ry="7.4" fill="#fff3d0"/>
  ${[40,360].map(x=>`<g transform="translate(${x} 280)"><path d="M-9 0Q0 10 9 0Z" fill="#c8501c"/><path class="flame f2" d="M0 -2C-4 -7 -1 -11 0 -15C1 -11 4 -7 0 -2Z" fill="#ffb300"/></g>`).join('')}
  <g data-l="cast"></g>
  <g data-l="curtain">
    <path d="M176 28V94M226 28V94" stroke="#c8921f" stroke-width="1.4"/><rect x="164" y="92" width="74" height="6" rx="3" fill="#c8921f"/>
    <path d="M170 98H232V212Q224 220 216 212T201 212T186 212T170 212Z" fill="#ffe28a" stroke="#c8501c" stroke-width="2.4"/>
    <path d="M180 98V212M191 98V214M202 98V216M213 98V214M223 98V212" stroke="#f1c75a" opacity=".6"/>
    <rect x="170" y="194" width="62" height="8" fill="#c8501c" opacity=".85"/>
    <text x="201" y="150" text-anchor="middle" font-size="22" fill="#c8501c" opacity=".9">ॐ</text>
  </g>
  <g data-l="gars">${garlandHTML('gar1','#ff7aa8')}${garlandHTML('gar2','#ffffff')}</g>
  <g data-l="rose" pointer-events="none">${rose}</g>
  <g data-l="spark" opacity="0"><circle cx="-6" cy="6" r="6" fill="none" stroke="#d9a521" stroke-width="2.6"/><circle cx="6" cy="6" r="6" fill="none" stroke="#f1c75a" stroke-width="2.6"/>
    <path d="M0 -16L2.4 -4L14 0L2.4 4L0 16L-2.4 4L-14 0L-2.4 -4Z" fill="#fff" stroke="#f4a300" stroke-width="1"/></g>
  <g data-l="mantra" opacity="0"><rect x="-84" y="-15" width="168" height="30" rx="15" fill="#fffaf0" stroke="#c8921f" stroke-width="1.8"/>
    <text y="6" text-anchor="middle" font-size="15" fill="#8b1e3f" style="font-family:'Tiro Devanagari Marathi',serif">शुभमंगल सावधान!</text></g>
  <g data-l="petals" opacity="0">${petals}</g>`;
  const L = {}; svg.querySelectorAll('[data-l]').forEach(n => L[n.dataset.l] = n);
  const cast = L.cast;
  const gr = bodyRig(fig(cast, P.groom, 168, 266, 1.28)), br = bodyRig(fig(cast, P.bride, 234, 266, 1.28));
  const CYC = 14, bump = (t,a,b) => t<a || t>b ? 0 : Math.pow(Math.sin(Math.PI*(t-a)/(b-a)), .7);
  let prev = 0;
  const bodyPt = (f,lx,ly) => { const r = rad(f.b.rot), dx = lx, dy = ly+50; return f.world(dx*Math.cos(r)-dy*Math.sin(r)+f.b.tx, dx*Math.sin(r)+dy*Math.cos(r)-50+f.b.ty); };   /* a point on the body, moving with it */
  const holdArms = (f, gp, w) => {
    const a = f.locB(gp[0]-15, gp[1]), b = f.locB(gp[0]+15, gp[1]);
    reach(f.r,'L', lerp(-3,a[0],w), lerp(-66,a[1],w)); reach(f.r,'R', lerp(3,b[0],w), lerp(-66,b[1],w));
  };
  return runner(time => {
    const t = time % CYC, cross = x => prev < x && t >= x; 
    if (cross(2.4)) Aud.fx('bell'); if (cross(6.4)) Aud.fx('bell'); if (cross(9.5)) Aud.fx('chime'); if (cross(11.0)) Aud.fx('sparkle');
    prev = t;
    const lift = ph(t,2.3,3.9);
    T(L.curtain, `translate(0 ${-lift*175})`); L.curtain.style.opacity = ph(t,0,.5) * (1-ph(t,3.4,3.9));
    L.mantra.setAttribute('opacity', ph(t,3.5,4.1)*(1-ph(t,11.6,12.3))); T(L.mantra, `translate(200 ${74 + (1-ph(t,3.5,4.4))*8})`);
    const b1 = bump(t,4.8,7.2), b2 = bump(t,7.8,10.2), bw = 6 + Math.sin(t*1.3);
    br.setBody(-11*b1, 0, -4*b1 + Math.sin(t*1.4)*.8); gr.setBody(11*b2, 0, 4*b2 + Math.sin(t*1.4+1)*.8);
    /* garland 1: bride -> groom's neck */
    const h1 = bodyPt(br,0,-62), ab1 = bodyPt(gr,0,-146), nk1 = bodyPt(gr,0,-87);
    let p1;
    if (t < 5.0) p1 = h1;
    else if (t < 6.1){ const k = ph(t,5.0,6.1); p1 = [lerp(h1[0],ab1[0],k), lerp(h1[1],ab1[1],k) - 8*Math.sin(Math.PI*k)]; }
    else { const k = ph(t,6.1,7.0); p1 = [lerp(ab1[0],nk1[0],k), lerp(ab1[1],nk1[1],k)]; }
    /* garland 2: groom -> bride's neck */
    const h2 = bodyPt(gr,0,-62), ab2 = bodyPt(br,0,-146), nk2 = bodyPt(br,0,-87);
    let p2;
    if (t < 8.0) p2 = h2;
    else if (t < 9.1){ const k = ph(t,8.0,9.1); p2 = [lerp(h2[0],ab2[0],k), lerp(h2[1],ab2[1],k) - 8*Math.sin(Math.PI*k)]; }
    else { const k = ph(t,9.1,10.0); p2 = [lerp(ab2[0],nk2[0],k), lerp(ab2[1],nk2[1],k)]; }
    const vis = ph(t,.2,.8)*(1-ph(t,13.2,13.9));
    L.gar1.style.opacity = vis; L.gar2.style.opacity = vis;
    const d1 = t >= 6.1 ? ph(t,6.1,7.0) : 0, d2 = t >= 9.1 ? ph(t,9.1,10.0) : 0;       /* 0 = carried as a ring, 1 = settled round the neck */
    [[L.gar1,p1,d1,gr],[L.gar2,p2,d2,br]].forEach(([g,p,d,w]) => {
      g.querySelector('[data-p=ring]').setAttribute('opacity', 1-d); g.querySelector('[data-p=hang]').setAttribute('opacity', d);
      T(g, `translate(${p[0]} ${p[1]}) rotate(${w.b.rot*d})`);
    });
    holdArms(br, p1, ph(t,.2,.9)*(1-ph(t,6.9,7.5)));
    holdArms(gr, p2, ph(t,.2,.9)*(1-ph(t,9.9,10.5)));
    /* ring exchange */
    const wr = ph(t,10.4,11.0)*(1-ph(t,12.2,12.8));
    if (wr > 0){
      const a = gr.locB(197, 170), b = br.locB(204, 170);
      reach(gr.r,'R', lerp(3,a[0],wr), lerp(-66,a[1],wr)); reach(br.r,'L', lerp(-3,b[0],wr), lerp(-66,b[1],wr));
    }
    const sp = ph(t,10.9,11.3)*(1-ph(t,12.8,13.4)); L.spark.setAttribute('opacity', sp); T(L.spark, `translate(200 168) scale(${.6+.5*sp})`);
    T(gr.r.head, `rotate(${6*bump(t,5.4,6.9) - 5*b2} 0 -90)`); T(br.r.head, `rotate(${-6*bump(t,8.5,10) + 5*b1} 0 -90)`);
    L.petals.setAttribute('opacity', ph(t,11.6,12.3)*(1-ph(t,13.2,13.9)));
  });
};

/* ===================================================================
   4. SAAT PHERE: the couple walk seven rounds around the sacred fire (front view)
   =================================================================== */
const VOWS = ['Nourish and care for each other','Grow strong together','Share prosperity and wealth',
  'Build a home full of joy','Raise a loving family','Walk through life as one','Be friends for life'];
SCN.saptapadi = el => {
  const svg = el.querySelector('svg');
  const CX = 200, CY = 226, RX = 122, RY = 31, LAP = 3.9, LAPS = 7, HOLD = 4.6, TOTAL = LAP*LAPS;
  const ember = Array.from({length:8},(_,i)=>`<circle class="ember" cx="${192+i*2.4}" cy="196" r="1.7" fill="#ffb300" style="--dx:${(i%2?1:-1)*(4+i)}px;animation-delay:${-i*.22}s"/>`).join('');
  let petals = '';
  for (let i=0;i<14;i++) petals += `<ellipse class="petalf" cx="${14+i*28}" cy="0" rx="3.4" ry="6.6" fill="${['#ff7aa8','#ffb703','#ff8a2b','#fff'][i%4]}" style="animation-duration:${4+i%4}s;animation-delay:${-i*.7}s"/>`;
  svg.innerHTML = `
  <defs>
    <linearGradient id="phSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd9b0"/><stop offset="1" stop-color="#ffb995"/></linearGradient>
    <linearGradient id="phFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6d6a4"/><stop offset="1" stop-color="#e9b77a"/></linearGradient>
    <radialGradient id="phSun"><stop offset="0" stop-color="#fff3c4" stop-opacity=".95"/><stop offset="1" stop-color="#fff3c4" stop-opacity="0"/></radialGradient>
    <radialGradient id="phFire"><stop offset="0" stop-color="#ffb23c" stop-opacity=".7"/><stop offset="1" stop-color="#ff7a00" stop-opacity="0"/></radialGradient>
    <linearGradient id="phFl1" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ff5a00"/><stop offset="1" stop-color="#ffb300"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#phSky)"/><circle cx="200" cy="120" r="100" fill="url(#phSun)"/>
  <path d="M0 0H70Q40 90 20 214H0Z" fill="#a3203f"/><path d="M400 0H330Q360 90 380 214H400Z" fill="#a3203f"/>
  <path d="M70 0Q40 90 20 214M330 0Q360 90 380 214" fill="none" stroke="#e8b84a" stroke-width="2.4"/>
  <path d="${scallops(400,22,10)}" fill="#c8501c" stroke="#e8b84a" stroke-width="2"/>
  <path d="M34 30Q110 62 200 30T366 30" fill="none" stroke="#f4a300" stroke-width="7" stroke-dasharray="0.1 8.4" stroke-linecap="round"/>
  ${[80,150,250,320].map((x,i)=>`<g><line x1="${x}" y1="24" x2="${x}" y2="${50+i%2*14}" stroke="#8b6b4a"/><circle cx="${x}" cy="${58+i%2*14}" r="9" fill="#ffd45e"/><circle cx="${x}" cy="${58+i%2*14}" r="16" fill="#ffd45e" opacity=".3" class="glow"/></g>`).join('')}
  <path d="M0 200Q200 188 400 200V300H0Z" fill="url(#phFloor)"/>
  <ellipse cx="${CX}" cy="${CY}" rx="${RX*1.3}" ry="${RY*1.45}" fill="rgba(255,255,255,.28)" stroke="#e8730c" stroke-width="1.6" stroke-dasharray="2 6" stroke-linecap="round"/>
  <ellipse cx="${CX}" cy="${CY}" rx="${RX}" ry="${RY}" fill="none" stroke="#c8921f" stroke-width="1.2" stroke-dasharray="1 5" stroke-linecap="round" opacity=".8"/>
  <ellipse cx="${CX}" cy="${CY+6}" rx="62" ry="14" fill="#a3203f" opacity=".3"/>
  <g data-l="back"></g>
  <g>
    <circle cx="${CX}" cy="${CY-22}" r="62" fill="url(#phFire)" class="glow"/>
    <path d="M168 ${CY-6}H232L240 ${CY+12}H160Z" fill="#7b3f1d" stroke="#c8921f" stroke-width="1.4"/>
    <ellipse cx="${CX}" cy="${CY-6}" rx="32" ry="6" fill="#4a2410"/>
    <path d="M178 ${CY-8}L222 ${CY-2}M222 ${CY-8}L178 ${CY-2}" stroke="#a0622a" stroke-width="5" stroke-linecap="round"/>
    <path class="flame" d="M${CX} ${CY-4}C176 ${CY-24} 186 ${CY-44} ${CX} ${CY-72}C214 ${CY-44} 224 ${CY-24} ${CX} ${CY-4}Z" fill="url(#phFl1)"/>
    <path class="flame f2" d="M${CX} ${CY-4}C184 ${CY-20} 192 ${CY-36} ${CX} ${CY-56}C208 ${CY-36} 216 ${CY-20} ${CX} ${CY-4}Z" fill="#ffc933"/>
    <path class="flame f3" d="M${CX} ${CY-4}C192 ${CY-14} 195 ${CY-24} ${CX} ${CY-38}C205 ${CY-24} 208 ${CY-14} ${CX} ${CY-4}Z" fill="#fff3b0"/>
    <g transform="translate(0 ${CY-196})">${ember}</g>
  </g>
  <g data-l="front"></g>
  <g data-l="petals" opacity="0">${petals}</g>`;
  const L = {}; svg.querySelectorAll('[data-l]').forEach(n => L[n.dataset.l] = n);
  /* seven diyas around the fire, lit one by one */
  const diyas = Array.from({length:7}, (_,k) => {
    const th = k*2*Math.PI/7, x = CX - RX*1.2*Math.sin(th), y = CY + RY*1.28*Math.cos(th);
    const g = mk('g', {class:'diya', transform:`translate(${x} ${y})`}, Math.cos(th) >= 0 ? L.front : L.back);
    g.innerHTML = `<path d="M-8 0Q0 9 8 0Z" fill="#c8501c"/><ellipse cx="0" cy="0" rx="8" ry="2.4" fill="#e8730c"/>
      <g class="df"><circle cy="-8" r="9" fill="#ffd45e" opacity=".4"/><path class="flame f2" d="M0 -2C-3.4 -6 -1 -10 0 -14C1 -10 3.4 -6 0 -2Z" fill="#ffb300"/></g>`;
    return g;
  });
  const gF = fig(L.back, P.pGroom, CX, CY+RY, 1.1), bF = fig(L.back, P.pBride, CX, CY+RY, 1.1);
  const cloth = mk('path', {fill:'none', stroke:'#e8730c', 'stroke-width':3, 'stroke-linecap':'round'}, L.front);
  const cloth2 = mk('path', {fill:'none', stroke:'#ffd23f', 'stroke-width':1.4, 'stroke-linecap':'round', 'stroke-dasharray':'3 3'}, L.front);
  let prevLaps = 0;
  const showLap = laps => { $('pcount').textContent = Math.min(laps+1,7); $('pvow').textContent = VOWS[Math.min(laps,6)]; };
  const reset = () => { diyas.forEach(d => d.classList.remove('on')); showLap(0); };
  reset();
  const pose = (f, th, kind, walkAmp, t) => {
    const c = Math.cos(th), s = Math.sin(th);
    let sx = -c; sx = Math.sign(sx||1) * Math.pow(Math.abs(sx), .7);
    f.x = CX - RX*s; f.y = CY + RY*c; f.s = .94 + .2*c; f.sx = sx; f.place();
    const phz = th*RX/13, a = Math.sin(phz)*walkAmp;
    if (kind === 'm'){ T(f.r.legF, `rotate(${a} 0 -50)`); T(f.r.legB, `rotate(${-a} 0 -50)`); setArm(f.r,'F', -a*.8, 14); setArm(f.r,'N', 30, -10); }
    else { T(f.r.footF, `translate(${Math.sin(phz)*7*(walkAmp/24)} ${-Math.max(0,Math.cos(phz))*2})`); T(f.r.footB, `translate(${-Math.sin(phz)*7*(walkAmp/24)} ${-Math.max(0,-Math.cos(phz))*2})`);
      T(f.r.pallu, `rotate(${Math.sin(t*3+1)*4} -9 -84)`); setArm(f.r,'F', a*.7, 12); setArm(f.r,'N', -30, -10); }
    T(f.r.body, `translate(0 ${-Math.abs(Math.sin(phz))*1.5*(walkAmp/24)})`);
    const want = c >= 0 ? L.front : L.back;
    if (f.g.parentNode !== want) want.appendChild(f.g);
    return c;
  };
  return runner(time => {
    const u = time % (TOTAL+HOLD), moving = u < TOTAL;
    const th = moving ? 2*Math.PI*u/LAP : 2*Math.PI*LAPS;
    const laps = Math.floor(th/(2*Math.PI) + 1e-6);
    if (laps < prevLaps){ reset(); prevLaps = 0; }
    if (laps > prevLaps){
      prevLaps = laps; diyas[laps-1].classList.add('on'); Aud.fx('bell');
      if (laps >= LAPS){ $('pcount').textContent = 7; $('pvow').textContent = 'सात फेरे • सात वचने • सात जन्मांची साथ'; Aud.fx('gong'); }
      else showLap(laps);
    }
    const amp = moving ? 24 : 0;
    const c1 = pose(gF, th, 'm', amp, time), c2 = pose(bF, th-.33, 'f', amp, time);
    /* the knot joining them: groom's hand to bride's hand */
    const h1 = hand(gF,'N'), h2 = hand(bF,'N'), want = (c1+c2) >= 0 ? L.front : L.back;
    const d = `M${h1[0]} ${h1[1]}Q${(h1[0]+h2[0])/2} ${(h1[1]+h2[1])/2+9} ${h2[0]} ${h2[1]}`;
    cloth.setAttribute('d', d); cloth2.setAttribute('d', d);
    if (cloth.parentNode !== want){ want.appendChild(cloth); want.appendChild(cloth2); }
    L.petals.setAttribute('opacity', moving ? 0 : ph(u,TOTAL+.3,TOTAL+1.2)*(1-ph(u,TOTAL+HOLD-.9,TOTAL+HOLD)));
  });
};
