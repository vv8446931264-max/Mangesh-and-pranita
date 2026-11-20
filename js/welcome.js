/* ===================================================================
   Welcome scene (in the invitation card): the couple ride in on horses,
   dismount, meet in the middle and say Namaskar.
   heroSync() starts/stops it; it only runs once the cover is open and it is on screen.
   =================================================================== */
let heroSync = () => {};
(function(){
  /* ---------- the couple ride in on horses, dismount, meet in the middle and say Namaskar ---------- */
  const ha = $('heroArt');
  /* a horse, side view, facing right: two-part legs (hip + knee), mane, tail, decorated blanket */
  const legHTML = (n, fill, hoof) => `<g data-p="h${n}"><path d="M0 0L-1 22" stroke="${fill}" stroke-width="8.4" stroke-linecap="round"/><g data-p="k${n}"><path d="M0 0L1 17" stroke="${fill}" stroke-width="6.4" stroke-linecap="round"/><rect x="-3.8" y="13" width="7.6" height="7" rx="1.6" fill="${hoof}"/></g></g>`;
  const horseHTML = (coat, shade, mane, blanket, trim) => `
    <ellipse cx="6" cy="2" rx="58" ry="4" fill="rgba(60,40,30,.28)"/>
    <g data-p="tail"><path d="M-35 -66Q-56 -60 -58 -32Q-54 -20 -49 -30Q-49 -46 -35 -54Z" fill="${mane}"/></g>
    ${legHTML(2,shade,'#3a2a20')}${legHTML(4,shade,'#3a2a20')}
    <path d="M-36 -52Q-42 -72 -16 -74L22 -74Q44 -74 46 -56L46 -50Q42 -38 28 -38L-22 -38Q-34 -40 -36 -52Z" fill="${coat}"/>
    <path d="M-30 -46Q0 -42 40 -48" fill="none" stroke="rgba(0,0,0,.09)" stroke-width="6"/>
    <path d="M-12 -74Q8 -80 28 -74L30 -52L-14 -52Z" fill="${blanket}"/>
    <path d="M-12 -74Q8 -80 28 -74M-14 -56H30" fill="none" stroke="${trim}" stroke-width="2"/>
    ${[-12,0,14,28].map(x => `<circle cx="${x}" cy="-50" r="2.2" fill="${trim}"/>`).join('')}
    <path d="M-2 -77Q8 -86 18 -77L16 -71L0 -71Z" fill="#6b3a1a"/>
    ${legHTML(1,coat,'#3a2a20')}${legHTML(3,coat,'#3a2a20')}
    <g data-p="head">
      <path d="M30 -72Q40 -94 52 -104L70 -98Q62 -80 52 -64Z" fill="${coat}"/>
      <path d="M30 -74Q42 -98 54 -108L58 -102Q48 -90 38 -70Z" fill="${mane}"/>
      <path d="M52 -106Q68 -112 78 -98L84 -86Q85 -80 79 -80L70 -82Q60 -88 54 -96Z" fill="${coat}"/>
      <ellipse cx="80.5" cy="-83" rx="4.8" ry="3.8" fill="${shade}"/><circle cx="82.6" cy="-84" r=".9" fill="#2a1a14"/>
      <path d="M56 -108L57.5 -119L63 -108Z" fill="${coat}"/><path d="M58 -108L58.6 -114L61 -108Z" fill="${mane}"/>
      <circle cx="66.5" cy="-97" r="1.9" fill="#2a1a14"/><circle cx="67.1" cy="-97.6" r=".6" fill="#fff"/>
      <path d="M55 -108Q62 -104 63 -94" fill="none" stroke="${mane}" stroke-width="3" stroke-linecap="round"/>
      <path d="M60 -103L72 -86L80 -86" fill="none" stroke="#c8283c" stroke-width="1.6"/>
      <path d="M36 -62Q47 -66 57 -80" fill="none" stroke="#f4a300" stroke-width="6" stroke-dasharray="0.1 7" stroke-linecap="round"/>
      <path d="M80 -84Q40 -66 10 -75" fill="none" stroke="#5a3418" stroke-width="1.2"/>
    </g>`;
  ha.innerHTML = `
    <defs>
      <linearGradient id="heSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd8ff"/><stop offset=".75" stop-color="#ffe8cc"/><stop offset="1" stop-color="#fff3df"/></linearGradient>
      <radialGradient id="heSun"><stop offset="0" stop-color="#fff6c8"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="400" height="230" fill="url(#heSky)"/>
    <circle cx="334" cy="46" r="48" fill="url(#heSun)"/><circle cx="334" cy="46" r="15" fill="#ffd45e"/>
    <g fill="#fff" opacity=".92"><ellipse cx="66" cy="40" rx="28" ry="9"/><ellipse cx="84" cy="33" rx="17" ry="10"/><ellipse cx="262" cy="66" rx="22" ry="7"/><ellipse cx="274" cy="60" rx="13" ry="8"/></g>
    <path d="M0 150Q60 118 120 142T240 140T360 132T400 146V176H0Z" fill="#cbe8c2"/><path d="M0 160Q90 138 170 156T320 152T400 160V176H0Z" fill="#b3d9a9"/>
    <g transform="translate(104 170)"><rect x="-12" y="-26" width="24" height="26" fill="#f8dcc2"/><path d="M-14 -26L0 -50L14 -26Z" fill="#e8730c"/><rect x="-4" y="-14" width="8" height="14" rx="4" fill="#8b1e3f"/><circle cy="-52" r="2" fill="#c8921f"/></g>
    ${[[16,170],[134,170],[300,170],[386,170],[250,170]].map(([x,y]) => `<g transform="translate(${x} ${y})"><rect x="-2" y="-16" width="4" height="16" fill="#8a5a3a"/><circle cy="-22" r="11" fill="#5fa968"/><circle cx="-6" cy="-17" r="7" fill="#4e9a58"/><circle cx="7" cy="-18" r="7" fill="#6bb574"/></g>`).join('')}
    <rect y="170" width="400" height="60" fill="#c9a977"/><rect y="168" width="400" height="6" fill="#e5cf9f"/>
    <path d="M0 196Q60 192 120 198T250 196T400 198M0 214Q80 210 160 216T400 212" fill="none" stroke="#b08e5c" stroke-width="2.4" opacity=".5"/>
    <path d="M146 176V106Q146 58 200 58Q254 58 254 106V176" fill="none" stroke="#f4a300" stroke-width="7" stroke-dasharray="0.1 8.4" stroke-linecap="round"/>
    <path d="M146 176V106Q146 58 200 58Q254 58 254 106V176" fill="none" stroke="#ff7aa8" stroke-width="4.6" stroke-dasharray="0.1 8.4" stroke-dashoffset="4.2" stroke-linecap="round"/>
    <g data-l="cars"></g><g data-l="people"></g><g data-l="fx"></g>
    <g data-l="bubble" opacity="0">
      <text y="0" text-anchor="middle" font-size="26" fill="#8b1e3f" stroke="#fffdf6" stroke-width="5" paint-order="stroke" stroke-linejoin="round" style="font-family:'Tiro Devanagari Marathi',serif">नमस्कार</text>
      <text y="16" text-anchor="middle" font-size="8.4" letter-spacing="3" fill="#e8730c" font-weight="600" stroke="#fffdf6" stroke-width="3.4" paint-order="stroke" stroke-linejoin="round">NAMASKAR</text>
    </g>`;
  const HL = {}; ha.querySelectorAll('[data-l]').forEach(n => HL[n.dataset.l] = n);
  const parts = g => { const m = {}; g.querySelectorAll('[data-p]').forEach(n => m[n.dataset.p] = n); return m; };
  const gc = mk('g', {}, HL.cars), bc = mk('g', {}, HL.cars);
  gc.innerHTML = horseHTML('#f6f1e8', '#d9d0c0', '#6a5a4a', '#e8730c', '#f1c75a');        /* the groom's white horse */
  bc.innerHTML = horseHTML('#9a5a34', '#7a4426', '#2e1d14', '#b8325a', '#f1c75a');        /* the bride's chestnut horse */
  const gcp = parts(gc), bcp = parts(bc);
  const CS = .72, GX = 62, BX = 338, GY = 206, GS = .62, SADDLE = [4,-77];
  const gp = fig(HL.people, P.pGroom, 50, GY, GS), bp = fig(HL.people, P.pBride, 350, GY, GS);   /* riding and walking (side view) */
  const gf = bodyRig(fig(HL.people, P.heroGroom, 176, GY, GS)), bf = bodyRig(fig(HL.people, P.bride, 224, GY, GS));   /* greeting (front view) */
  bp.sx = -1; bp.place();
  [gf,bf].forEach(f => f.g.setAttribute('opacity', 0));
  const HIP = {1:[28,-42], 2:[18,-42], 3:[-24,-42], 4:[-14,-42]}, OFF = {1:0, 2:Math.PI, 3:Math.PI, 4:0};
  const trot = (c, t, w) => [1,2,3,4].forEach(n => {
    const p = t*10 + OFF[n], a = Math.sin(p)*24*w, b = Math.max(0, Math.sin(p+1.3))*34*w;
    T(c['h'+n], `translate(${HIP[n][0]} ${HIP[n][1]}) rotate(${a})`); T(c['k'+n], `translate(-1 22) rotate(${b})`);
  });
  const seatPose = (f, kind, t, w) => {
    if (kind === 'm'){ f.r.legB.style.opacity = 0; T(f.r.legF, 'rotate(-12 0 -50)'); }
    else { T(f.r.footF, 'translate(2 -2)'); T(f.r.footB, 'translate(-2 -2)'); T(f.r.pallu, `rotate(${Math.sin(t*6)*5*w} -9 -84)`); }
    setArm(f.r,'N',-34,-26); setArm(f.r,'F',-22,-18);
    T(f.r.body, `translate(0 ${-Math.abs(Math.sin(t*10))*w}) rotate(${Math.sin(t*10)*1.5*w} 0 -50)`);
  };
  const dust = (x,y,dir) => { const c = mk('circle', {r:5, fill:'#e6d3b0', opacity:.8}, HL.fx);
    c.animate([{transform:`translate(${x}px,${y}px) scale(.6)`,opacity:.8},{transform:`translate(${x+dir*18}px,${y-6}px) scale(2.4)`,opacity:0}],{duration:900,easing:'ease-out'}).onfinish = () => c.remove(); };
  const REST = {L:[-15,-42], R:[15,-42]};
  let prevT = 0, bowIdx = -1;
  const hr = runner(time => {
    const t = Math.max(0, time - .9), cross = x => prevT < x && t >= x;
    /* 1. the groom and bride ride in from opposite sides */
    const k = clamp(t/2.8), ec = 1 - Math.pow(1-k, 3);
    const w = t < 2.8 ? .55 + .45*(1-k) : .55*(1 - ph(t,2.8,3.3));
    const gx = lerp(-130, GX, ec), bx = lerp(530, BX, ec), bob = -Math.abs(Math.sin(t*10))*1.6*w;
    T(gc, `translate(${gx} ${205+bob}) scale(${CS})`); T(bc, `translate(${bx} ${205+bob}) scale(${-CS} ${CS})`);
    trot(gcp, t, w); trot(bcp, t+.5, w);
    [gcp,bcp].forEach((c,i) => { T(c.tail, `rotate(${Math.sin(t*5+i)*(6+10*w)} -35 -64)`); T(c.head, `rotate(${Math.sin(t*10+i)*3*w + Math.sin(t*1.6+i)*2} 40 -70)`); });
    if (cross(2.8)){ dust(gx-34, 204, -1); dust(bx+34, 204, 1); }
    /* 2. they dismount, then walk to the middle */
    const sgx = gx + SADDLE[0]*CS, sbx = bx - SADDLE[0]*CS, seatY = 205 + bob + SADDLE[1]*CS + 50*GS;
    const dm = ph(t,3.2,3.8), wk = clamp((t-3.8)/2.7), step = ph(wk,0,.2), turn = ph(t,6.5,7.0);
    const amp = t >= 3.2 && wk < 1 ? 24*ph(t,3.2,3.7) : 0;
    const gy0 = lerp(seatY, GY-6, dm);
    gp.x = lerp(lerp(sgx, sgx-10, dm), 176, wk); gp.y = lerp(gy0, GY, step);
    bp.x = lerp(lerp(sbx, sbx+10, dm), 224, wk); bp.y = lerp(gy0, GY, step);
    gp.sx = Math.max(.08, 1-.92*turn); bp.sx = -Math.max(.08, 1-.92*turn); gp.place(); bp.place();
    if (t < 3.2){ seatPose(gp,'m',t,w); seatPose(bp,'f',t,w); }
    else { gp.r.legB.style.opacity = 1; walkPose(gp,'m',t*8,amp,t); walkPose(bp,'f',t*8+1,amp,t); }
    gp.g.setAttribute('opacity', 1 - turn); bp.g.setAttribute('opacity', 1 - turn);
    /* 3. they turn to face you, fold their hands and bow with "Namaskar" */
    const nam = ph(t,7.0,7.6);
    const u = t < 7.7 ? -1 : (t-7.7) % 7, bowK = u >= 0 && u < 1.3 ? Math.sin(Math.PI*u/1.3) : 0;
    [gf,bf].forEach((f,i) => {
      const s = i ? -1 : 1;
      f.sx = Math.max(.08, .08+.92*turn); f.place(); f.g.setAttribute('opacity', turn > 0 ? 1 : 0);
      ['L','R'].forEach(kk => { const rp = REST[kk], np = kk === 'L' ? [-3,-66] : [3,-66]; reach(f.r, kk, lerp(rp[0],np[0],nam), lerp(rp[1],np[1],nam)); });
      const sy = 1 - .07*bowK, br = s*7*bowK + Math.sin(t*1.5+i)*.6*(1-bowK);
      T(f.r.body, `rotate(${br} 0 -50) translate(0 -50) scale(1 ${sy}) translate(0 50)`);
      T(f.r.head, `translate(0 ${4*bowK}) rotate(${s*(4*nam + 10*bowK)} 0 -90)`);
    });
    /* the greeting appears with no box behind it, just the lettering */
    const pop = ph(t,7.6,8.05), pulse = u >= 0 && u < .5 ? Math.sin(Math.PI*u/.5)*.1 : 0, float = Math.sin(t*2)*1.2*pop;
    HL.bubble.setAttribute('opacity', pop); T(HL.bubble, `translate(200 ${100-(1-pop)*8+float}) scale(${pop*(1+.12*Math.sin(Math.PI*pop))+pulse})`);
    const idx = u < 0 ? -1 : Math.floor((t-7.7)/7);
    if (idx !== bowIdx){ bowIdx = idx; if (idx >= 0) Aud.fx('chime'); }
    prevT = t;
  });
  let heroIn = false;
  heroSync = () => heroIn && !document.documentElement.classList.contains('locked') ? hr.start() : hr.stop();
  new IntersectionObserver(es => { heroIn = es[0].isIntersecting; heroSync(); }).observe($('heroArt'));
})();
