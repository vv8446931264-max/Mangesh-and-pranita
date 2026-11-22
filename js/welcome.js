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
    <g data-p="torso"><path d="M-36 -52Q-42 -72 -16 -74L22 -74Q44 -74 46 -56L46 -50Q42 -38 28 -38L-22 -38Q-34 -40 -36 -52Z" fill="${coat}"/>
    <path d="M-30 -46Q0 -42 40 -48" fill="none" stroke="rgba(0,0,0,.09)" stroke-width="6"/>
    <path d="M-12 -74Q8 -80 28 -74L30 -52L-14 -52Z" fill="${blanket}"/>
    <path d="M-12 -74Q8 -80 28 -74M-14 -56H30" fill="none" stroke="${trim}" stroke-width="2"/>
    ${[-12,0,14,28].map(x => `<circle cx="${x}" cy="-50" r="2.2" fill="${trim}"/>`).join('')}
    <path d="M-2 -77Q8 -86 18 -77L16 -71L0 -71Z" fill="#6b3a1a"/></g>
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
  const gp = bodyRig(fig(HL.people, P.pGroom, 50, GY, GS)), bp = bodyRig(fig(HL.people, P.pBride, 350, GY, GS));   /* riding and walking (side view) */
  const gf = bodyRig(fig(HL.people, P.heroGroom, 176, GY, GS)), bf = bodyRig(fig(HL.people, P.bride, 224, GY, GS));   /* greeting (front view) */
  bp.sx = -1; bp.place();
  [gf,bf].forEach(f => f.g.setAttribute('opacity', 0));
  const E = M.E, HIP = {1:[28,-42], 2:[18,-42], 3:[-24,-42], 4:[-14,-42]}, OFF = {1:0, 2:Math.PI, 3:Math.PI, 4:0};
  /* the gait: legs in diagonal pairs; the torso rises and falls twice per stride, pitches with it, the head nods against the pitch and the tail trails */
  const trot = (c, t, w, i) => {
    const hoofs = [];
    [1,2,3,4].forEach(n => {
      const p = t*10 + OFF[n], a = Math.sin(p)*24*w, b = Math.max(0, Math.sin(p+1.3))*34*w;
      T(c['h'+n], `translate(${HIP[n][0]} ${HIP[n][1]}) rotate(${a})`); T(c['k'+n], `translate(-1 22) rotate(${b})`);
    });
    const p = t*10, bob = -Math.abs(Math.sin(p + .55))*2.6*w, pitch = 2.4*Math.sin(2*p + .9)*w, nod = (-pitch*.9 + 4*Math.sin(p + 1.1)*w + Math.sin(t*1.6 + i)*2*(1 - w*.5));
    const tb = `translate(0 ${bob.toFixed(2)}) rotate(${pitch.toFixed(2)} 0 -55)`;
    T(c.torso, tb); T(c.tail, `${tb} rotate(${(Math.sin(t*5 + i)*(5 + 11*w) - pitch*1.5).toFixed(2)} -35 -64)`);
    T(c.head, `${tb} rotate(${nod.toFixed(2)} 40 -70)`);
    return {bob, pitch};
  };
  const seatPose = (f, kind, t, w, h) => {
    if (kind === 'm'){ f.r.legB.style.opacity = 0; T(f.r.legF, 'rotate(-12 0 -50)'); }
    else { T(f.r.footF, 'translate(2 -2)'); T(f.r.footB, 'translate(-2 -2)'); T(f.r.pallu, `rotate(${Math.sin(t*6)*5*w} -9 -84)`); }
    setArm(f.r,'N',-34 + h.pitch*2,-26); setArm(f.r,'F',-22 + h.pitch*2,-18);
    f.setBody(0, h.bob*.3, h.pitch*.7 + Math.sin(t*10)*1.1*w);
    f.head(-h.pitch*.8 + Math.sin(t*5)*1.5*w);
  };
  /* dust trail and landing puffs: a fixed pool of soft circles */
  const dust = Kin.pool(HL.fx, Kin.half(16), () => mk('circle', {r:5, fill:'#e6d3b0'}));
  const puff = (t, x, y, vx = 0, s = 1) => dust.spawn(t, {x, y, vx, s, life:.9 + Math.random()*.3});
  /* marigold petals that flutter down and tumble as they fall */
  const pets = Kin.pool(HL.fx, Kin.half(30), i => mk('ellipse', {rx:2.7, ry:4.6, fill:['#ffb703', '#ff8a2b', '#ffd23f', '#f4a300'][i % 4]}));
  const shower = t => { for (let i = 0; i < Kin.half(15); i++) pets.spawn(t + Math.random()*.9, {x:150 + Math.random()*100, y:-12 - Math.random()*14, vy:40 + Math.random()*26, A:5 + Math.random()*8, w:1.4 + Math.random()*1.4, f:Math.random()*6, r:Math.random()*360, life:5.6 + Math.random()*1.2}); };
  const sparks = Kin.sparkles(HL.fx, 10);
  const REST = {L:[-15,-42], R:[15,-42]};
  let prevT, bowIdx, nd;
  const reset = () => { dust.clear(); pets.clear(); sparks.clear(); prevT = 0; bowIdx = -1; nd = 0; };
  reset();
  const hr = runner(((time, dt) => {
    const t = Math.max(0, time - .9), cross = x => prevT < x && t >= x;
    /* 1. the groom and bride ride in from opposite sides, easing to a halt */
    const k = clamp(t/2.8), ec = 1 - Math.pow(1-k, 3);
    const w = t < 2.8 ? .55 + .45*(1-k) : .55*(1 - ph(t,2.8,3.3));
    const gx = lerp(-130, GX, ec), bx = lerp(530, BX, ec);
    T(gc, `translate(${gx.toFixed(2)} 205) scale(${CS})`); T(bc, `translate(${bx.toFixed(2)} 205) scale(${-CS} ${CS})`);
    const hg = trot(gcp, t, w, 0), hb = trot(bcp, t + .5, w, 1);
    if (t < 3.0 && t > .05 && time >= nd){ nd = time + .1 + (1 - w)*.2; puff(time, gx - 30, 204, -1, .8); puff(time + .03, bx + 30, 204, 1, .8); }
    if (cross(2.8)){ puff(t, gx - 36, 204, -1, 1.3); puff(t, bx + 36, 204, 1, 1.3); puff(t + .08, gx - 28, 205, -1, 1); puff(t + .08, bx + 28, 205, 1, 1); }
    /* 2. they hop down, land with a little squash, then walk to the middle */
    const sgx = gx + SADDLE[0]*CS, sbx = bx - SADDLE[0]*CS, seatY = 205 + hg.bob*CS + SADDLE[1]*CS + 50*GS, seatYb = 205 + hb.bob*CS + SADDLE[1]*CS + 50*GS;
    const dm = ph(t,3.2,3.85), wk = clamp((t-3.8)/2.7), step = ph(wk,0,.2), turn = ph(t,6.5,7.0);
    const amp = t >= 3.85 && wk < 1 ? 24*ph(t,3.85,4.3) : 0;
    const hop = Math.sin(Math.PI*dm), land = Math.sin(Math.PI*clamp((t - 3.85)/.3));
    const gyd = lerp(seatY, GY, E.in(dm)) - 15*hop, byd = lerp(seatYb, GY, E.in(dm)) - 15*hop;
    gp.x = lerp(lerp(sgx, sgx - 14, E.out(dm)), 176, wk); gp.y = t < 3.85 ? gyd : lerp(GY, GY, step);
    bp.x = lerp(lerp(sbx, sbx + 14, E.out(dm)), 224, wk); bp.y = t < 3.85 ? byd : GY;
    gp.sx = Math.max(.08, 1-.92*turn); bp.sx = -Math.max(.08, 1-.92*turn); gp.place(); bp.place();
    if (t < 3.2){ seatPose(gp,'m',t,w,hg); seatPose(bp,'f',t,w,hb); }
    else if (t < 3.85){                                    /* in the air: legs tucked, arms out for balance */
      const o = 1 - dm*.0; gp.r.legB.style.opacity = 1; T(gp.r.legF, `rotate(${-30*hop} 0 -50)`); T(gp.r.legB, `rotate(${25*hop} 0 -50)`);
      T(bp.r.footF, `translate(${4*hop} ${-4*hop})`); T(bp.r.footB, `translate(${-4*hop} ${-3*hop})`); T(bp.r.pallu, `rotate(${-8*hop} -9 -84)`);
      [gp, bp].forEach(f => { setArm(f.r,'N', -20 - 40*hop, -10); setArm(f.r,'F', 30 + 40*hop, 10); f.setBody(0, 0, -5*hop); f.head(2*hop); });
    }
    else { gp.r.legB.style.opacity = 1; walkPose(gp,'m',t*8,amp,t); walkPose(bp,'f',t*8+1,amp,t);
      if (land > 0){ gp.setBody(0, 2.4*land, 0); bp.setBody(0, 2.4*land, 0); gp.r.legF.style.opacity = 1; } }
    if (cross(3.85)){ puff(t, gp.x - 4, GY + 2, -1, .9); puff(t, bp.x + 4, GY + 2, 1, .9); Kin.sfx('bell'); }
    gp.g.setAttribute('opacity', 1 - turn); bp.g.setAttribute('opacity', 1 - turn);
    Kin.face(gp, time, 0); Kin.face(bp, time + 1.4, 0);
    /* 3. they turn to face you, fold their hands and bow with "Namaskar" while marigold petals drift down */
    const nam = ph(t,7.0,7.6);
    const u = t < 7.7 ? -1 : (t-7.7) % 7, bowK = u >= 0 && u < 1.3 ? Math.sin(Math.PI*u/1.3) : 0;
    [gf,bf].forEach((f,i) => {
      const s = i ? -1 : 1;
      f.sx = Math.max(.08, .08+.92*turn); f.place(); f.g.setAttribute('opacity', turn > 0 ? 1 : 0);
      ['L','R'].forEach(kk => { const rp = REST[kk], np = kk === 'L' ? [-3,-66] : [3,-66]; reach(f.r, kk, lerp(rp[0],np[0],nam), lerp(rp[1],np[1],nam)); });
      const sy = 1 - .07*bowK, br = s*7*bowK + Math.sin(t*1.5+i)*.6*(1-bowK);
      f.setBody(0, 0, 0); T(f.r.body, `rotate(${br} 0 -50) translate(0 -50) scale(1 ${sy}) translate(0 50)`);
      f.head(s*(4*nam + 10*bowK), 0, 4*bowK);
      Kin.face(f, time + i*1.3, Math.max(0, ph(t, 7.9, 8.4)*.55)*(1 - .4*bowK), bowK*.9);
    });
    const pop = ph(t,7.6,8.05), pulse = u >= 0 && u < .5 ? Math.sin(Math.PI*u/.5)*.1 : 0, float = Math.sin(t*2)*1.2*pop;
    HL.bubble.setAttribute('opacity', pop); T(HL.bubble, `translate(200 ${100-(1-pop)*8+float}) scale(${pop*(1+.12*Math.sin(Math.PI*pop))+pulse})`);
    const idx = u < 0 ? -1 : Math.floor((t-7.7)/7);
    if (idx !== bowIdx){ bowIdx = idx; if (idx >= 0){ Kin.sfx('chime'); shower(time); sparks.burst(time + .2, 200, 112, 5, 30, .5); } }
    [gf, bf, gp, bp].forEach(f => Kin.sec(f, dt));
    dust.tick(time, (p, kk, age) => { T(p.el, `translate(${(p.x + p.vx*14*E.out(kk)).toFixed(2)} ${(p.y - 7*E.out(kk)).toFixed(2)}) scale(${(p.s*(.5 + 1.9*E.out(kk))).toFixed(3)})`); p.el.setAttribute('opacity', (.55*(1 - kk)).toFixed(3)); });
    pets.tick(time, (p, kk, age) => {
      const x = p.x + p.A*Math.sin(age*p.w + p.f) + 4*age, y = p.y + p.vy*age, fl = Math.cos(age*3.2 + p.f);
      T(p.el, `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${(p.r + 50*age + 25*Math.sin(age*p.w + p.f)).toFixed(1)}) scale(${(.25 + .75*Math.abs(fl)).toFixed(3)} 1)`);
      p.el.setAttribute('opacity', (Math.min(1, age*3)*(kk > .8 ? (1 - kk)/.2 : 1)).toFixed(3));
    });
    sparks.tick(time);
    prevT = t;
  }), {el:ha, reset, still:.9 + 7.7 + .65, warm:3});
  let heroIn = false;
  heroSync = () => heroIn && !document.documentElement.classList.contains('locked') ? hr.start() : hr.stop();
  new IntersectionObserver(es => { heroIn = es[0].isIntersecting; heroSync(); }).observe($('heroArt'));
})();
