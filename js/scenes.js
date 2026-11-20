/* ===================================================================
   1. ENGAGEMENT (साखरपुडा): beside their decorated car the couple exchange rings (the hero beat), walk round to
   the far side, hop in and drive off with "JUST ENGAGED" swinging on the back. The road rolls on and brings them to
   the next stop, where they hop out again. One 24 s loop that always passes through the same parked moment.
   Coordinates: people, rings and the car's parts are in car-local units (car at translate(carX 272) scale(.95)).
   =================================================================== */
SCN.sakharpuda = el => {
  const svg = el.querySelector('svg'), E = M.E;
  const tile = s => `<g>${s}</g><g transform="translate(400 0)">${s}</g>`;
  const tree = x => `<g transform="translate(${x} 238)"><rect x="-2.5" y="-22" width="5" height="22" fill="#8a5a3a"/><circle cy="-30" r="15" fill="#5fa968"/><circle cx="-8" cy="-24" r="10" fill="#4e9a58"/><circle cx="9" cy="-25" r="10" fill="#6bb574"/></g>`;
  const heartD = Kin.HEART;
  /* three heart balloons, each on its own string so each can swing on its own */
  const BAL = [[60, -14, '#e8508a'], [70, 5, '#f4a300'], [57, 25, '#d9405e']];
  const balloons = BAL.map(([len, , col]) => `<g data-b="1"><path data-s="1" d="M0 0Q2 ${-len/2} 0 ${-len+8}" fill="none" stroke="#b9b0a4" stroke-width="1"/>
    <g transform="translate(0 ${-len})"><g data-h="1"><path d="M0 8C-13 -4 -13 -18 0 -12C13 -18 13 -4 0 8Z" fill="${col}"/><path d="M-5 -8Q-8 -4 -6 0" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/></g></g></g>`).join('');
  svg.innerHTML = `
  <defs>
    <linearGradient id="enSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd8ff"/><stop offset=".72" stop-color="#ffe8cc"/><stop offset="1" stop-color="#fff3df"/></linearGradient>
    <linearGradient id="enCar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9405e"/><stop offset="1" stop-color="#8b1e3f"/></linearGradient>
    <radialGradient id="enSun"><stop offset="0" stop-color="#fff6c8"/><stop offset=".45" stop-color="#fff6c8" stop-opacity=".55"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient>
  </defs>
  <g data-l="cam">
  <rect x="-10" y="-10" width="420" height="320" fill="url(#enSky)"/>
  <g transform="translate(330 62)"><circle data-l="sunGlow" r="58" fill="url(#enSun)"/>
    <g data-l="rays" opacity=".42">${Array.from({length:12}, (_, i) => `<path d="M0 -25L1.8 -33L0 ${i%2 ? -38 : -44}L-1.8 -33Z" fill="#ffe27a" transform="rotate(${i*30})"/>`).join('')}</g>
    <circle r="19" fill="#ffd45e"/><circle cx="-5" cy="-5" r="8" fill="#ffe89a" opacity=".6"/></g>
  <g data-l="clouds">${tile(`<g fill="#fff" opacity=".93"><ellipse cx="70" cy="52" rx="30" ry="10"/><ellipse cx="88" cy="44" rx="18" ry="11"/><ellipse cx="52" cy="46" rx="16" ry="9"/></g>
    <g fill="#fff" opacity=".85"><ellipse cx="250" cy="82" rx="26" ry="8"/><ellipse cx="266" cy="75" rx="16" ry="9"/></g>
    <g fill="#fff" opacity=".9"><ellipse cx="368" cy="40" rx="20" ry="7"/><ellipse cx="380" cy="34" rx="12" ry="8"/></g>`)}</g>
  <g data-l="hills">${tile(`<path d="M0 205Q50 168 100 192T200 198T300 186T400 205V242H0Z" fill="#cbe8c2"/><path d="M0 216Q70 190 140 210T280 208T400 216V242H0Z" fill="#b3d9a9"/>`)}</g>
  <g data-l="village">${tile(`
    <g transform="translate(100 240)"><rect x="-16" y="-34" width="32" height="34" fill="#f8dcc2"/><path d="M-19 -34L0 -68L19 -34Z" fill="#e8730c"/><path d="M-8 -34L0 -50L8 -34Z" fill="#fff" opacity=".4"/><rect x="-5" y="-18" width="10" height="18" rx="5" fill="#8b1e3f"/><circle cy="-70" r="2.6" fill="#c8921f"/></g>
    <g transform="translate(250 240)"><rect x="-22" y="-26" width="44" height="26" fill="#fff0d8"/><path d="M-26 -26L0 -46L26 -26Z" fill="#c8501c"/><rect x="-12" y="-17" width="9" height="17" fill="#8b5a3a"/><rect x="4" y="-20" width="10" height="9" fill="#9fd8ff"/></g>
    ${tree(30)}${tree(175)}${tree(335)}`)}</g>
  <rect x="-10" y="238" width="420" height="72" fill="#a9a7b2"/><rect x="-10" y="238" width="420" height="7" fill="#efe0c8"/><rect x="-10" y="245" width="420" height="3" fill="rgba(0,0,0,.1)"/>
  <g data-l="near">${tile(`
    <g transform="translate(60 246)"><ellipse rx="24" ry="10" fill="#4e9a58"/>${[-14,-5,5,14,-9,9].map((x,i)=>`<circle cx="${x}" cy="${-4-(i%3)*2}" r="3.4" fill="${i%2?'#ffd23f':'#f4a300'}"/>`).join('')}</g>
    <g transform="translate(205 247)"><rect x="-1.6" y="-50" width="3.2" height="50" fill="#7a5a3a"/><circle cy="-52" r="5.4" fill="#ffe9a0"/><circle cy="-52" r="10" fill="#ffe9a0" opacity=".35"/></g>
    <g transform="translate(330 246)"><ellipse rx="24" ry="10" fill="#4e9a58"/>${[-14,-5,5,14,-9,9].map((x,i)=>`<circle cx="${x}" cy="${-4-(i%3)*2}" r="3.4" fill="${i%2?'#ff7aa8':'#f4a300'}"/>`).join('')}</g>`)}</g>
  <g data-l="lane"><path d="M-60 288H470" stroke="#fff" stroke-width="3.5" stroke-dasharray="26 22" opacity=".9"/></g>
  <g data-l="fx"></g>
  <g data-l="car">
    <ellipse cx="-4" cy="2" rx="114" ry="6" fill="rgba(40,20,30,.3)"/>
    <g data-l="cb">
      <g data-l="balloons" transform="translate(-124 -50)">${balloons}</g>
      <g data-l="sign">
        <path d="M-8 6L0 -2M-84 6L-3 -6" stroke="#8b6b4a" stroke-width="1.4" fill="none"/>
        <rect x="-86" y="6" width="80" height="36" rx="6" fill="#fffdf6" stroke="#8b1e3f" stroke-width="2.6"/>
        <rect x="-83" y="9" width="74" height="30" rx="4" fill="none" stroke="#f4a300" stroke-width="1" stroke-dasharray="3 3"/>
        <text x="-46" y="21" text-anchor="middle" font-size="9" font-weight="600" letter-spacing="3.2" fill="#e8730c">JUST</text>
        <text x="-46" y="35" text-anchor="middle" font-size="12.5" font-weight="700" letter-spacing="1.4" fill="#8b1e3f">ENGAGED</text>
        <g transform="translate(-78 16) scale(.55)"><path d="${heartD}" fill="#e8508a"/></g><g transform="translate(-14 16) scale(.55)"><path d="${heartD}" fill="#e8508a"/></g>
        <circle cx="-76" cy="34" r="3" fill="none" stroke="#c8921f" stroke-width="1.4"/><circle cx="-71" cy="34" r="3" fill="none" stroke="#c8921f" stroke-width="1.4"/>
        <circle cx="-21" cy="34" r="3" fill="none" stroke="#c8921f" stroke-width="1.4"/><circle cx="-16" cy="34" r="3" fill="none" stroke="#c8921f" stroke-width="1.4"/>
        <g data-l="ribbons"><path d="M-6 30Q10 36 4 46Q-2 52 8 58M-6 24Q16 22 14 36Q12 44 22 48" fill="none" stroke="#ffd23f" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M-6 34Q8 44 -2 52Q-6 58 4 62" fill="none" stroke="#ff7aa8" stroke-width="2.2" stroke-linecap="round"/></g>
      </g>
    </g>
    <g data-l="ppl"></g>
    <g data-l="cb2">
      <path d="M-104 -16L-104 -34Q-104 -42 -94 -42L-40 -44L36 -44L66 -46Q92 -44 102 -36L104 -20Q104 -14 96 -14L-96 -14Q-104 -14 -104 -16Z" fill="url(#enCar)"/>
      <path d="M-100 -36Q0 -40 100 -34" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
      <rect x="-74" y="-48" width="116" height="6" rx="3" fill="#5a1128"/>
      <path d="M18 -46L25 -55" stroke="#3a1520" stroke-width="2.2" stroke-linecap="round"/><ellipse cx="26" cy="-56.5" rx="1.7" ry="6.2" transform="rotate(-28 26 -56.5)" fill="none" stroke="#3a1520" stroke-width="2"/>
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
  <g data-l="fx2"></g>
  </g>`;
  const L = {}; svg.querySelectorAll('[data-l]').forEach(n => L[n.dataset.l] = n);
  const balG = [...L.balloons.querySelectorAll('[data-b]')], balS = balG.map(g => g.querySelector('[data-s]')), balH = balG.map(g => g.querySelector('[data-h]'));
  const cam = Kin.camera(L.cam), spk = Kin.sparkles(L.fx2, 14), hts = Kin.hearts(L.fx2, 9);
  const dust = Kin.pool(L.fx, Kin.half(9), () => mk('circle', {r:5, fill:'#e9dcc8'}));
  /* the two rings (tiny gold bands that travel hand to hand) and the interlocked-rings glint that rises after */
  const ringEl = [0, 1].map(i => mk('circle', {r:1.7, fill:'none', stroke:i ? '#f6c84c' : '#e3a094', 'stroke-width':1.2, opacity:0}, L.fx2));
  const emblem = mk('g', {opacity:0}, L.fx2);
  emblem.innerHTML = `<circle cx="-4.5" r="4.8" fill="none" stroke="#d9a521" stroke-width="2.1"/><circle cx="4.5" r="4.8" fill="none" stroke="#e3a094" stroke-width="2.1"/><path d="${Kin.STAR}" transform="translate(0 -9) scale(.55)" fill="#fffbe8" stroke="#f2b51e" stroke-width="1"/>`;

  /* ---- the people: side view, in car-local units, each inside a wrapper that rides the car body once seated ---- */
  const S = .7, Y0 = -8, SEAT = -6, VW = 70, RAMP = .22;
  const gW = mk('g', {}, L.ppl), bW = mk('g', {}, L.ppl);
  const bF = bodyRig(fig(bW, P.pBride, 128, Y0, S)), gF = bodyRig(fig(gW, P.pGroom, 164, Y0, S));
  /* a walk with smooth starts and stops: returns position, distance walked and relative speed (0..1) */
  const trap = u => { u = clamp(u); const r = RAMP, n = 1 - r/2; let p, v;
    if (u < r){ p = u/2 - r/(2*Math.PI)*Math.sin(Math.PI*u/r); v = (1 - Math.cos(Math.PI*u/r))/2; }
    else if (u <= 1 - r){ p = r/2 + u - r; v = 1; }
    else { const w = 1 - u; p = n - (w/2 - r/(2*Math.PI)*Math.sin(Math.PI*w/r)); v = (1 - Math.cos(Math.PI*w/r))/2; }
    return [p/n, v]; };
  const walkSeg = (t, t0, x0, x1) => { const dist = Math.abs(x1 - x0), D = dist/(VW*(1 - RAMP/2)), [p, v] = trap((t - t0)/D);
    return {x:lerp(x0, x1, p), ph:p*dist/S/76*2*Math.PI, v:t > t0 && t < t0 + D ? v : 0}; };
  /* hop into the seat (u 0..1 over .85 s): crouch, spring up over the door, turn to face forward, sink in */
  const hopIn = u => {
    const y = u < .2 ? Y0 : u < .55 ? Y0 - 9*E.out((u - .2)/.35) : lerp(Y0 - 9, SEAT, E.inOut((u - .55)/.45));
    return {y, crouch:u < .2 ? 2.6*Math.sin(Math.PI*u/.4) : u > .82 ? 1.6*Math.sin(Math.PI*(u - .82)/.18) : 0, legs:u < .42 ? 1 : 0, w:clamp((u - .5)/.3), turn:E.inOut(clamp((u - .3)/.5))};
  };
  /* and out again: lean, rise over the door, land on the far side of the car with a little squash */
  const hopOut = u => {
    const y = u < .25 ? SEAT : u < .6 ? lerp(SEAT, Y0 - 9, E.out((u - .25)/.35)) : lerp(Y0 - 9, Y0, E.in(clamp((u - .6)/.28)));
    return {y, crouch:u < .25 ? 1.6*Math.sin(Math.PI*u/.5) : u > .88 ? 2.6*Math.sin(Math.PI*(u - .88)/.12) : 0, legs:u > .5 ? 1 : 0, w:1 - clamp((u - .25)/.3), lean:u < .3 ? 6*Math.sin(Math.PI*u/.3) : 0};
  };
  const legsOn = (f, on) => { if (f._legs === on) return; f._legs = on;
    ['legF', 'legB', 'skirt', 'footF', 'footB', 'shadow'].forEach(k => f.r[k] && f.r[k].setAttribute('opacity', on)); };

  /* ---- the drive: speed profile, distance table, where the car sits in frame (the camera lags it a little) ---- */
  const CYC = 24, V = 118, A0 = 9.6, A1 = 11.8, B0 = 16.8, B1 = 18.9, CX0 = 190;
  const spdAt = t => {
    if (t < A0 || t >= B1) return 0;
    if (t < A1) return 1 - Math.pow(1 - (t - A0)/(A1 - A0), 2.2);
    if (t < B0) return 1;
    const u = (t - B0)/(B1 - B0), r = .18; return 1 - (u < r ? u*u/(2*r) : u - r/2)/(1 - r/2);
  };
  const DT = .01, LUT = [0]; for (let t = DT; t <= CYC + DT; t += DT) LUT.push(LUT[LUT.length - 1] + V*(spdAt(t - DT) + spdAt(t))/2*DT);
  const DCYC = LUT[Math.round(CYC/DT)];
  const distAt = time => { const n = Math.floor(time/CYC), t = time - n*CYC, i = Math.min(LUT.length - 2, Math.floor(t/DT)), f = t/DT - i; return n*DCYC + lerp(LUT[i], LUT[i + 1], f); };
  const carXAt = t => CX0 + 40*(E.inOut(clamp((t - 9.9)/2.4)) - E.inOut(clamp((t - 16.9)/1.8)));
  const toScreen = (x, y, cx) => [cx + .95*x, 272 + .95*y];
  const env = (t, a, b, c, d) => E.inOut(clamp((t - a)/(b - a))) * (1 - E.inOut(clamp((t - c)/(d - c))));
  const bump = (t, a, b) => t <= a || t >= b ? 0 : Math.sin(Math.PI*(t - a)/(b - a));

  /* ---- springs: body pitch and bounce, the sign, the balloons, the passengers' lean ---- */
  let pitch, boun, sign, bal, lean, prev, nh, nd, first;
  const reset = () => {
    pitch = Kin.spring(60, 6.5); boun = Kin.spring(120, 8); sign = Kin.spring(15, 1.7); lean = Kin.spring(40, 5);
    bal = BAL.map((b, i) => Kin.spring(10 + i*1.6, 1.3)); prev = 0; nh = 0; nd = 0; first = true;
    spk.clear(); hts.clear(); dust.clear(); legsOn(bF, 1); legsOn(gF, 1);
  };
  reset();
  const idleArms = (f, s) => { setArm(f.r, 'F', 6 + s, -10); setArm(f.r, 'N', -3 - s, -12); };

  const tick = (time, dt) => {
    const t = time % CYC; if (first){ prev = t; first = false; }
    const cross = x => prev < x && t >= x;
    const breath = Math.sin(time*1.9), spd = spdAt(t), acc = V*(spdAt(t + .02) - spdAt(Math.max(0, t - .02)))/.04;
    const carX = carXAt(t), dCar = distAt(time), dCam = dCar - (carX - CX0), camV = V*spd - (carXAt(t + .02) - carXAt(Math.max(0, t - .02)))/.04;

    /* scenery parallax, clouds drifting on their own, the sun breathing */
    T(L.clouds, `translate(${-((time*2.2 + dCam*.03) % 400)} 0)`); T(L.hills, `translate(${-((dCam*.08) % 400)} 0)`);
    T(L.village, `translate(${-((dCam*.22) % 400)} 0)`); T(L.near, `translate(${-((dCam*.55) % 400)} 0)`); T(L.lane, `translate(${-(dCam % 48)} 0)`);
    T(L.sunGlow, `scale(${1 + .05*Math.sin(time*1.25)})`); T(L.rays, `rotate(${time*5}) scale(${1 + .04*Math.sin(time*1.25 + 1)})`);

    /* the car: squats as it pulls away, dips its nose as it brakes, bounces on the road, settles when people sit */
    const crouch = bump(t, 9.0, 9.75), shiver = crouch*.32*Math.sin(time*68);
    pitch.step(dt, clamp(-acc*.016, -3, 3)); boun.step(dt, spd*(Math.sin(time*13)*.35 + Math.sin(time*7.3 + 1)*.3) + crouch*1.4 + shiver);
    if (cross(7.15 + .85*.82) || cross(7.45 + .85*.82)) boun.v += 9;                /* someone lands in a seat */
    if (cross(19.3 + .85*.3) || cross(19.7 + .85*.3)) boun.v -= 6;                  /* someone pushes off */
    const by = boun.x, pr = pitch.x, sq = crouch;
    const bodyT = `translate(0 ${by.toFixed(2)}) rotate(${pr.toFixed(2)} 0 -16) translate(0 -14) scale(${(1 + .012*sq).toFixed(4)} ${(1 - .03*sq).toFixed(4)}) translate(0 14)`;
    T(L.car, `translate(${carX.toFixed(2)} 272) scale(.95)`); T(L.cb, bodyT); T(L.cb2, bodyT);
    const wd = dCar/15.2*57.3; T(L.w1, `rotate(${wd % 360})`); T(L.w2, `rotate(${wd % 360})`);
    sign.step(dt, spd*6.5 + spd*Math.sin(time*4.4)*2.2 + clamp(acc*.05, -7, 7));
    T(L.sign, `translate(-104 -46) rotate(${sign.x.toFixed(2)})`); T(L.ribbons, `rotate(${(sign.v*.4 + Math.sin(time*6)*spd*4).toFixed(2)} -6 30)`);
    bal.forEach((s, i) => {
      s.step(dt, BAL[i][1] - spd*20 + Math.sin(time*1.6 + i*2)*3.5, clamp(-acc*.9, -120, 120));
      T(balG[i], `rotate(${s.x.toFixed(2)})`); balS[i].setAttribute('d', `M0 0Q${(2 + s.v*.25).toFixed(2)} ${-BAL[i][0]/2} 0 ${-BAL[i][0] + 8}`);
      T(balH[i], `rotate(${(-s.x*.6 + Math.sin(time*2.1 + i)*4).toFixed(2)} 0 8)`);
    });
    lean.step(dt, clamp(-acc*.03, -5, 4));

    /* ---- the couple ---- */
    const people = [[bF, bW, 'f'], [gF, gW, 'm']];
    for (const [f, w, kind] of people){
      const isB = kind === 'f', hIn = isB ? 7.15 : 7.45, hOut = isB ? 19.7 : 19.3, seatX = isB ? -36 : 4, homeX = isB ? 128 : 164;
      let x = homeX, y = Y0, sx = isB ? 1 : -1, wk = null, crouchB = 0, legs = 1, wv = 0, lb = 0;
      if (t < hIn){
        if (isB){ sx = lerp(1, -1, E.inOut(clamp((t - 4.15)/.5))); if (t >= 4.5) wk = walkSeg(t, 4.5, 128, -36); }
        else if (t >= 4.75) wk = walkSeg(t, 4.75, 164, 4);
        if (wk) x = wk.x;
        if (isB && t > 4.15 && t < 4.65) y = Y0 - 1.6*Math.sin(Math.PI*(t - 4.15)/.5);                /* a little step as she turns */
      } else if (t < hIn + .85){
        const h = hopIn((t - hIn)/.85); x = seatX; y = h.y; sx = lerp(-1, 1, h.turn); crouchB = h.crouch; legs = h.legs; wv = h.w;
      } else if (t < hOut){ x = seatX; y = SEAT; sx = 1; legs = 0; wv = 1; }
      else if (t < hOut + .85){ const h = hopOut((t - hOut)/.85); x = seatX; y = h.y; sx = 1; crouchB = h.crouch; legs = h.legs; wv = h.w; lb = h.lean; }
      else {
        wk = walkSeg(t, hOut + .9, seatX, homeX); x = wk.x;
        if (!isB) sx = lerp(1, -1, E.inOut(clamp((t - 22.8)/.55)));
        if (!isB && t > 22.8 && t < 23.35) y = Y0 - 1.6*Math.sin(Math.PI*(t - 22.8)/.55);
      }
      f.x = x; f.y = y; f.sx = sx; f.place(); legsOn(f, legs);
      T(w, wv > 0 ? `translate(0 ${(by*wv).toFixed(2)}) rotate(${(pr*wv).toFixed(2)} 0 -16)` : '');
      const seated = t >= hIn + .85 && t < hOut;
      if (wk && wk.v > 0){ walkPose(f, kind, wk.ph + (isB ? 0 : 1.3), 24*wk.v, time, 2*wk.v); }
      else if (seated || (t >= hIn && t < hOut + .85)){
        /* in the car: lean with the ride, groom's hands on the wheel, bride waves */
        f.setBody(0, crouchB + breath*.3, (seated ? lean.x*(isB ? 1.15 : 1) : 0) + lb);
        f.head(seated ? -lean.x*.5 + Math.sin(time*1.3 + (isB ? 2 : 0))*1.5 : 0);
        if (!isB){
          const hold = env(t, hIn + .7, hIn + 1.3, hOut - .3, hOut + .1);
          const a = f.locB(25, -58), b = f.locB(23.5, -53);
          reach(f.r, 'N', lerp(10, a[0], hold), lerp(-44, a[1], hold)); reach(f.r, 'F', lerp(8, b[0], hold), lerp(-44, b[1], hold));
        } else {
          const wave = Math.max(env(t, 8.3, 8.8, 10.6, 11.1), env(t, 12.8, 13.3, 15.6, 16.1), env(t, 17.6, 18.0, 19.2, 19.6));
          const ws = Math.sin(time*9.5);
          reach(f.r, 'N', lerp(10, 9 + 5*ws, wave), lerp(-44, -108 + 2*Math.abs(ws), wave)); reach(f.r, 'F', 10, -42);
        }
        if (!seated && t < hOut) setArm(f.r, 'F', -30, -40);
      } else {
        f.setBody(0, crouchB + breath*.35, 0); f.head(0); idleArms(f, breath);
        if (kind === 'm') { T(f.r.legF, ''); T(f.r.legB, ''); } else { T(f.r.footF, ''); T(f.r.footB, ''); T(f.r.pallu, `rotate(${Math.sin(time*1.6)*2} -9 -84)`); }
      }
    }

    /* ---- the ring exchange (0..4.3 s): the hero beat ---- */
    if (t < 4.15){
      const Mx = 146, My = -47.5;
      const gR = env(t, .75, 1.35, 3.6, 4.1), bR = env(t, .95, 1.65, 3.55, 4.05);
      /* groom: draws back a touch (anticipation), then offers the ring to her hand; later receives hers */
      const gLean = -2.2*bump(t, .5, 1.1) + 4*env(t, 1.1, 1.8, 3.5, 4.2) + 2*bump(t, 2.7, 3.4);
      const bLean = 2.5*env(t, 1.2, 1.9, 3.5, 4.2) + 3*bump(t, 2.6, 3.4) - 2*bump(t, 2.15, 2.65);
      gF.setBody(0, breath*.35, gLean); bF.setBody(0, breath*.35, bLean);
      const gH = [lerp(156, Mx + 1.5, E.inOut(clamp((t - 1.3)/.6))), lerp(-52, My - 1, E.inOut(clamp((t - 1.3)/.6)))];
      const bH = t < 2.1 ? [Mx - 1.5, My] : t < 2.6 ? [lerp(Mx - 1.5, 136, bump(t, 2.1, 2.9)), lerp(My, -53, bump(t, 2.1, 2.9))] : [Mx + .5, My - .5];
      const g = gF.locB(gH[0], gH[1] + Math.sin(time*3)*.3), b = bF.locB(bH[0], bH[1]);
      reach(gF.r, 'N', lerp(-3, g[0], gR), lerp(-38, g[1], gR)); reach(bF.r, 'N', lerp(-3, b[0], bR), lerp(-38, b[1], bR));
      gF.head(-1.5*bump(t, .5, 1.1) + 5*bump(t, 1.2, 2.2) + 3*env(t, 3.3, 3.7, 3.9, 4.3));
      bF.head(6*bump(t, 1.4, 2.0) + 9*bump(t, 2.1, 2.9) + 4*env(t, 3.3, 3.7, 3.9, 4.3));
      /* the rings: a glint appears in the giver's hand, travels, and settles on the other's finger */
      const gh = toScreen(...gF.handB('N'), carX), bh = toScreen(...bF.handB('N'), carX);
      const r1 = t < 2.0 ? gh : bh, r2 = t < 3.2 ? bh : gh;
      const o1 = clamp((t - .85)/.2)*(1 - clamp((t - 3.9)/.4)), o2 = clamp((t - 2.45)/.2)*(1 - clamp((t - 3.9)/.4));
      ringEl[0].setAttribute('opacity', o1.toFixed(2)); T(ringEl[0], `translate(${r1[0].toFixed(2)} ${(r1[1] - 1.5).toFixed(2)})`);
      ringEl[1].setAttribute('opacity', (t > 2.45 ? o2 : 0).toFixed(2)); T(ringEl[1], `translate(${r2[0].toFixed(2)} ${(r2[1] - 1.5).toFixed(2)})`);
      if (cross(.85)) spk.one(time, gh[0], gh[1] - 2, .42);
      if (cross(2.45)) spk.one(time, bh[0], bh[1] - 2, .42);
      const mid = toScreen(Mx, My - 2, carX);
      const gap = toScreen(Mx, -84, carX);
      if (cross(2.0)){ Kin.sfx('sparkle'); spk.burst(time, mid[0], mid[1], 8, 26, .62); hts.emit(time, gap[0], gap[1], {vx:-2, A:3, s:.6, rise:40}); }
      if (cross(3.2)){ Kin.sfx('chime'); spk.burst(time, mid[0], mid[1], 10, 32, .7); [0, 1, 2].forEach(i => hts.emit(time + i*.22, gap[0] + (i - 1)*2, gap[1] - 4, {vx:(i - 1)*4, A:3 + i, s:.55 + .1*i, rise:48})); }
    } else { ringEl[0].setAttribute('opacity', 0); ringEl[1].setAttribute('opacity', 0); }
    /* faces: blinks, and a shared happy laugh once both rings are on */
    const joy = env(t, 3.3, 3.6, 4.0, 4.5), giggle = Math.max(joy, env(t, 11.9, 12.3, 12.9, 13.3)*.8);
    Kin.face(bF, time, giggle); Kin.face(gF, time + 1.3, joy);
    Kin.sec(bF, dt); Kin.sec(gF, dt);
    /* the interlocked rings rise from their hands and melt into the sky */
    const ek = clamp((t - 3.3)/2.3);
    if (ek > 0 && ek < 1){ const m = toScreen(146, -96, carX); emblem.setAttribute('opacity', (Math.min(1, ek*6)*(1 - E.in(ek))).toFixed(2));
      T(emblem, `translate(${(m[0] + Math.sin(ek*5)*3).toFixed(2)} ${(m[1] - 34*E.out(ek)).toFixed(2)}) scale(${(.4 + .75*E.back(Math.min(1, ek*2.5))).toFixed(3)})`); }
    else emblem.setAttribute('opacity', 0);

    /* ---- on the road: dust from the back wheel, hearts streaming up from the car ---- */
    if (spd > .2 && time >= nd){ nd = time + .15 + (1 - spd)*.15; const p = toScreen(-78, -3, carX); dust.spawn(time, {x:p[0], y:p[1], v:camV, life:.95}); }
    if (cross(A0 + .05)){ const p = toScreen(-112, -16, carX); dust.spawn(time, {x:p[0], y:p[1], v:20, life:1.1}); dust.spawn(time + .08, {x:p[0] - 3, y:p[1] - 2, v:25, life:1.1}); }
    dust.tick(time, (p, k, age) => { T(p.el, `translate(${(p.x - p.v*age*.75 - 12*age).toFixed(2)} ${(p.y - 10*age).toFixed(2)}) scale(${(.5 + 2.1*E.out(k)).toFixed(3)})`); p.el.setAttribute('opacity', (.6*(1 - k)).toFixed(3)); });
    if (spd > .55 && t < B0 + .6 && time >= nh){ nh = time + .85 + Math.random()*.4; const p = toScreen(-20 + Math.random()*30, -92, carX); hts.emit(time, p[0], p[1], {vx:-camV*.12 - 6, rise:58, life:2.6}); }
    spk.tick(time); hts.tick(time);

    /* ---- camera: pushes in on the rings, eases out; follows the car very slightly on the road ---- */
    const kr = env(t, .7, 2.0, 3.7, 5.3), kd = env(t, 10.4, 12.8, 16.4, 19.0);
    cam.set(1 + .24*kr + .035*kd, lerp(200, 330, kr) + (carX - 37 - 200)*kd, lerp(150, 222, kr) + 70*kd);
    prev = t;
  };
  return runner(tick, {el, reset, still:3.45});
};

/* ===================================================================
   2. HALDI (हळद): everyone moves to the dhol at the track's tempo (116 bpm). Two aunts take turns: scoop paste,
   reach for a cheek, rub it on; the bride and groom see it coming, lean away, then laugh. Two kids chase each other
   across the front. Tap anywhere to throw a pinch of haldi (and tickle whoever you hit).
   =================================================================== */
SCN.haldi = el => {
  const svg = el.querySelector('svg'), E = M.E;
  const BEAT = 60/116, BAR = 4*BEAT;
  let arches = '', garland = '', petals = '';
  for (let i=0;i<4;i++) arches += `<path d="M${22+i*98} 240V150Q${22+i*98} 108 ${52+i*98} 108Q${82+i*98} 108 ${82+i*98} 150V240" fill="rgba(255,255,255,.35)" stroke="#f5c242" stroke-width="2.4" opacity=".75"/>`;
  for (let i=0;i<29;i++){
    const x = 7+i*14, n = 3+((i*7)%5);
    garland += `<g class="sway vb" style="transform-origin:${x}px 0px;animation-delay:${-i*.23}s"><line x1="${x}" y1="0" x2="${x}" y2="${n*9}" stroke="#7a9a3a" stroke-width="1"/>`
      + Array.from({length:n},(_,k)=>`<circle cx="${x}" cy="${6+k*9}" r="5" fill="${k%2?'#ffd23f':'#f4a300'}"/><circle cx="${x}" cy="${6+k*9}" r="2" fill="#e8730c"/>`).join('') + '</g>';
  }
  if (!M.reduced) for (let i=0;i<Kin.half(10);i++) petals += `<ellipse class="petalf" cx="${20+i*38*(M.lite ? 2 : 1)}" cy="0" rx="3.2" ry="6.4" fill="${i%2?'#ffb703':'#ff8a2b'}" style="animation-duration:${6+i%4}s;animation-delay:${-i*1.1}s"/>`;
  svg.innerHTML = `
  <defs>
    <linearGradient id="hdWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#fff3c4"/></linearGradient>
    <linearGradient id="hdFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7d98a"/><stop offset="1" stop-color="#eec46a"/></linearGradient>
    <radialGradient id="hdGlow" cx="50%" cy="58%" r="50%"><stop offset="0" stop-color="#fffbe0" stop-opacity=".95"/><stop offset="1" stop-color="#fffbe0" stop-opacity="0"/></radialGradient>
    <radialGradient id="hdPaste"><stop offset="0" stop-color="#f0a800" stop-opacity=".95"/><stop offset=".55" stop-color="#f6bd12" stop-opacity=".8"/><stop offset="1" stop-color="#f9cc2e" stop-opacity="0"/></radialGradient>
    <radialGradient id="hdPuff"><stop offset="0" stop-color="#ffc400" stop-opacity=".85"/><stop offset="1" stop-color="#ffd84a" stop-opacity="0"/></radialGradient>
  </defs>
  <g data-l="cam">
  <rect x="-10" y="-10" width="420" height="320" fill="url(#hdWall)"/><rect data-l="glow" width="400" height="300" fill="url(#hdGlow)"/>
  ${arches}${garland}
  <path d="M-10 238Q200 224 410 238V310H-10Z" fill="url(#hdFloor)"/>
  <ellipse cx="200" cy="270" rx="150" ry="22" fill="#ffb703" opacity=".55"/>
  <ellipse cx="200" cy="270" rx="130" ry="17" fill="none" stroke="#fff6d8" stroke-width="2" stroke-dasharray="3 6"/>
  <ellipse cx="200" cy="270" rx="100" ry="12" fill="#ff9f1c" opacity=".35"/>
  <g data-l="cast"></g><g data-l="fx"></g><g>${petals}</g>
  </g>`;
  const L = {}; svg.querySelectorAll('[data-l]').forEach(n => L[n.dataset.l] = n);
  const cast = L.cast, fx = L.fx, cam = Kin.camera(L.cam);
  const dF = bodyRig(fig(cast, P.danceF, 52, 266, 1));
  const aA = bodyRig(fig(cast, P.auntA, 128, 266, 1.02));
  const gr = bodyRig(fig(cast, P.hGroom, 178, 268, 1.12));
  const br = bodyRig(fig(cast, P.hBride, 224, 268, 1.12));
  const aB = bodyRig(fig(cast, P.auntB, 274, 266, 1.02));
  const dM = bodyRig(fig(cast, P.danceM, 352, 266, 1));
  const drum = mk('g', {}, cast);
  drum.innerHTML = `<rect x="-26" y="-11" width="52" height="22" rx="9" fill="#b4472a" stroke="#7a2a14" stroke-width="2"/>
    <path d="M-18 -11L-12 11M-6 -11L0 11M6 -11L12 11M18 -11L24 11" stroke="#ffd24d" stroke-width="1.6"/>
    <path d="M-24 -9Q0 -14 24 -9" fill="none" stroke="#e8a23a" stroke-width="1.2" opacity=".7"/>`;
  const heads = [-26, 26].map(x => mk('ellipse', {cx:x, cy:0, rx:4.5, ry:11, fill:'#f2d9a8', stroke:'#7a2a14', 'stroke-width':1.6}, drum));
  const stick = mk('path', {d:'M0 0L-9 7', stroke:'#7a4a24', 'stroke-width':1.6, 'stroke-linecap':'round'}, cast);
  const bowls = [aA,aB].map(() => { const b = mk('g', {}, cast); b.innerHTML = `<path d="M-7 0Q0 9 7 0Z" fill="#c8501c"/><ellipse cx="0" cy="0" rx="7" ry="2.4" fill="#ffc400"/><path d="M-4 -1Q0 -6 4 -1Z" fill="#ffb300"/>`; return b; });
  const kidA = bodyRig(fig(cast, P.kidA, 60, 276, .6)), kidB = bodyRig(fig(cast, P.kidB, 340, 274, .56));
  const all = [dF, aA, gr, br, aB, dM, kidA, kidB];
  all.forEach(f => f.setBody(0, 0, 0));

  /* ---- haldi paste: soft finger-swipes that grow under the hand, then slowly soak in ---- */
  const SMEAR = 'M-4.4 .2C-3.6 -2.2 2.6 -2.6 4.4 -.6C4 1.8 -2.4 2.4 -4.4 .2Z';
  const smear = (parent) => mk('path', {d:SMEAR, fill:'url(#hdPaste)', opacity:0}, parent);
  /* slot 0: near cheek, 1: far cheek, 2: near upper arm (positions figure-local) */
  const targetsOf = (f, side) => [
    {el:smear(f.r.dabs), at:[side*6.2, -96.6], head:true, rot:side*-18},
    {el:smear(f.r.dabs), at:[-side*6.2, -96.2], head:true, rot:side*14},
    {el:smear(f.r[side < 0 ? 'uL' : 'uR']), at:[0, 9], arm:side < 0 ? 'L' : 'R', rot:80}
  ];
  const GT = targetsOf(gr, -1), BT = targetsOf(br, 1);
  [...GT, ...BT].forEach(s => { T(s.el, `translate(${s.at[0]} ${s.at[1]}) rotate(${s.rot}) scale(0 1)`); s.t0 = -99; });
  /* a point on a figure (head or arm aware) in scene coordinates */
  const ptOn = (f, s) => {
    if (s.head){ const a = rad(f.hr), x = s.at[0], y = s.at[1] + 90; return f.bodyPt(x*Math.cos(a) - y*Math.sin(a), x*Math.sin(a) + y*Math.cos(a) - 90); }
    const sh = f.r.sh[s.arm], A = rad((f.r.ang[s.arm] || [0, 0])[0]); return f.bodyPt(sh[0] - 9*Math.sin(A), sh[1] + 9*Math.cos(A));
  };

  /* ---- particles: puffs of powder, flung grains, a soft ring off the drum on the strong beats ---- */
  const puffs = Kin.pool(fx, Kin.half(8), () => mk('circle', {r:7, fill:'url(#hdPuff)'}));
  const grains = Kin.pool(fx, Kin.half(20), i => mk('circle', {r:1.3 + (i%3)*.45, fill:['#ffc400','#ff9f1c','#ffe066'][i%3]}));
  const rings = Kin.pool(fx, 3, () => mk('ellipse', {rx:4.5, ry:11, fill:'none', stroke:'#fff3c4', 'stroke-width':1.6}));
  const puff = (t, x, y, s = 1, life = 1.1) => puffs.spawn(t, {x, y, s, life});
  const burst = (t, x, y, n = 14, up = 34) => { puff(t, x, y, 1.25); for (let i = 0; i < Kin.half(n); i++){ const a = Math.random()*6.283, d = 18 + Math.random()*46;
    grains.spawn(t, {x, y, vx:Math.cos(a)*d, vy:Math.sin(a)*d*.7 - up, life:.8 + Math.random()*.5}); } };

  /* ---- the dhol pattern (same as the haldi track): D = both hands (bass + stick), t = stick only ---- */
  const PAT = ['D',0,'t','t','D',0,'t',0, 'D','t','t',0,'D','t','D','t'];
  const hitsL = [], hitsR = [];
  PAT.forEach((x, i) => { if (x === 'D') hitsL.push(i); if (x) hitsR.push(i); });
  /* hand lift for a list of hit eighths: rebound up after a hit, accelerate down into the next */
  const lift = (hits, e8) => {
    const n = 16, c = ((e8 % n) + n) % n; let p = hits[hits.length - 1] - n, q = hits[0];
    for (let i = 0; i < hits.length; i++){ if (hits[i] <= c){ p = hits[i]; q = i + 1 < hits.length ? hits[i + 1] : hits[0] + n; } }
    const u = (c - p)/(q - p), H = Math.min(1, (q - p)/2.2);
    return {h:H*Math.pow(Math.sin(Math.PI*Math.pow(u, .8)), 1.2), since:(c - p)*BEAT/2};
  };

  /* ---- interaction: tap to throw; a hit near a face makes them laugh ---- */
  const tapT = {g:-9, b:-9};
  let clock = 0;
  svg.addEventListener('pointerdown', ev => {
    const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
    const p = pt.matrixTransform(L.cam.getScreenCTM().inverse()); burst(clock, p.x, p.y); Kin.sfx('dhol');
    [[gr, 'g'], [br, 'b']].forEach(([f, k]) => { const h = f.bodyPt(0, -100); if (Math.hypot(h[0] - p.x, h[1] - p.y) < 26) tapT[k] = clock; });
  });

  /* ---- the aunts' haldi round: scoop, reach, rub, laugh (2 bars per round, the two aunts a bar apart) ---- */
  const env = (t, a, b, c, d) => E.inOut(clamp((t - a)/(b - a))) * (1 - E.inOut(clamp((t - c)/(d - c))));
  function round(a, bowl, f, arm, slots, side, time, off){
    const tl = time - off, idx = Math.floor(tl/(2*BAR)), b = (tl - idx*2*BAR)/BEAT;      /* b: beats into this round, 0..8 */
    const slot = slots[((idx % 3) + 3) % 3];
    const other = arm === 'R' ? 'L' : 'R', bx = a.world(other === 'R' ? 13 : -13, -55), o = a.locB(bx[0], bx[1]);
    reach(a.r, other, o[0], o[1]);
    const bp = a.handB(other); T(bowl, `translate(${bp[0]} ${bp[1] + 4})`);
    const tgt = ptOn(f, slot), restP = [bp[0] - side*6, bp[1] - 5];
    let p, rub = 0;
    if (tl < 0 || b >= 4.7){ p = [restP[0], restP[1] + Math.sin(time*2*Math.PI/BEAT)*1.2]; }
    else if (b < 1){ const w = b*2*Math.PI; p = [bp[0] + Math.sin(w)*2.4, bp[1] - 1.5 + Math.cos(w)*1.2]; }     /* scoop */
    else if (b < 2.2){ const k = E.inOut((b - 1)/1.2); p = [lerp(bp[0], tgt[0], k), lerp(bp[1], tgt[1], k) - 6*Math.sin(Math.PI*k)]; }
    else if (b < 3.6){ rub = (b - 2.2)/1.4; const w = (b - 2.2)*2*Math.PI*1.5; p = [tgt[0] + Math.sin(w)*1.8 - side*(rub - .5)*2.4, tgt[1] + Math.cos(w)*1.1]; }
    else { const k = E.inOut((b - 3.6)/1.1); p = [lerp(tgt[0], restP[0], k), lerp(tgt[1], restP[1], k) - 4*Math.sin(Math.PI*k)]; }
    const q = a.locB(p[0], p[1]); reach(a.r, arm, q[0], q[1]);
    const rubStart = off + idx*2*BAR + 2.2*BEAT;
    if (tl >= 0 && b >= 2.2 && b < 3.6 && Math.abs(slot.t0 - rubStart) > .01){ slot.t0 = rubStart; puff(time, tgt[0], tgt[1], .55, .8); }
    const lean = (tl < 0 ? 0 : env(b, .8, 2.0, 2.6, 3.8))*5 + (tl < 0 ? 0 : env(b, 2.0, 2.4, 3.8, 4.8))*3;
    a.setBody(-side*(lean*.6 + .8), -Math.abs(Math.sin(Math.PI*time/BEAT))*1.4, -side*(5 + lean));
    /* what the receiver feels: anticipation (lean away, squint), then a laugh that fades as the hand leaves */
    return tl < 0 ? {ant:0, laugh:0, b} : {ant:env(b, 1.0, 2.0, 2.3, 2.7), laugh:env(b, 2.15, 2.5, 4.2, 5.4), b};
  }
  const updSmear = (s, time) => {
    const age = time - s.t0, rubD = 1.4*BEAT;
    if (age < 0 || age > 14){ if (s._o !== 0){ s._o = 0; s.el.setAttribute('opacity', 0); } return; }
    const grow = E.out(clamp(age/rubD)), o = .9*(1 - E.inOut(clamp((age - 8)/6)));
    T(s.el, `translate(${s.at[0]} ${s.at[1]}) rotate(${s.rot}) scale(${(.25 + .75*grow).toFixed(3)} ${(.7 + .3*grow).toFixed(3)})`);
    s._o = o; s.el.setAttribute('opacity', o.toFixed(3));
  };

  let kidT = 0, kidB2 = 0, np = 0, prevT = 0;
  const kids = [{f:kidA, d:0, id:0, sc:.6, y0:276}, {f:kidB, d:0, id:1, sc:.56, y0:274}];
  const reset = () => { puffs.clear(); grains.clear(); rings.clear(); [...GT, ...BT].forEach(s => { s.t0 = -99; s._o = -1; }); kidT = kidB2 = np = prevT = 0; kids.forEach(o => o.d = 0); };

  const tick = (time, dt) => {
    clock = time;
    const hb = time/BEAT, e8 = time/(BEAT/2), pulse = Math.exp(-6*((hb % 1 + 1) % 1)), sway = Math.sin(Math.PI*hb/2);
    /* warm light breathes with the bar */
    L.glow.setAttribute('opacity', (.88 + .12*Math.sin(2*Math.PI*time/BAR)).toFixed(3));

    /* ---- the dancing woman: arms up, bounce on every beat, a twirl at the end of every 4-bar phrase ---- */
    { const ph16 = hb % 16, spin = ph16 >= 12 && ph16 < 14 ? (ph16 - 12)/2 : 0, sk = spin ? E.inOut(spin) : 0;
      setArm(dF.r,'L', 148 + 14*Math.sin(Math.PI*hb), 52 + 22*Math.sin(Math.PI*hb + 1));
      setArm(dF.r,'R', -(148 + 14*Math.sin(Math.PI*hb + Math.PI)), -(52 + 22*Math.sin(Math.PI*hb + 1 + Math.PI)));
      dF.sx = Math.cos(2*Math.PI*sk); dF.y = 266 - 3*Math.sin(Math.PI*sk); dF.place();
      dF.setBody(0, -Math.abs(Math.sin(Math.PI*hb))*3.2, 7*sway*(1 - Math.sin(Math.PI*sk)));
      T(dF.r.skirt, `rotate(${(4*Math.sin(Math.PI*hb/2 + .6)).toFixed(2)} 0 -52) scale(${(1 + .14*Math.sin(Math.PI*sk)).toFixed(3)} 1)`);
      dF.head(6*Math.sin(Math.PI*hb/2 + .5)); }

    /* ---- the dhol player: hands lift and strike on the pattern, body bounces on the beat ---- */
    { const l = lift(hitsL, e8), r = lift(hitsR, e8 - .02), hitK = Math.max(Math.exp(-l.since*22), Math.exp(-r.since*22));
      dM.setBody(0, 2.2*pulse - 1, 3*sway);
      T(dM.r.legL, `rotate(${(6*sway).toFixed(2)} -6 -50)`); T(dM.r.legR, `rotate(${(-6*sway).toFixed(2)} 6 -50)`);
      const dy = 216 + 1.2*hitK - .6;
      T(drum, `translate(352 ${dy.toFixed(2)}) rotate(${(1.5*sway).toFixed(2)})`);
      T(heads[0], `translate(-26 0) scale(${(1 + .12*Math.exp(-l.since*16)).toFixed(3)} 1) translate(26 0)`);
      T(heads[1], `translate(26 0) scale(${(1 + .1*Math.exp(-r.since*16)).toFixed(3)} 1) translate(-26 0)`);
      const a = dM.locB(352 - 30 - l.h*3, dy - 3 - l.h*14), b = dM.locB(352 + 22 + r.h*4, dy - 8 - r.h*13);
      reach(dM.r, 'L', a[0], a[1]); reach(dM.r, 'R', b[0], b[1]);
      const hr = dM.handB('R'); T(stick, `translate(${hr[0].toFixed(2)} ${hr[1].toFixed(2)}) rotate(${(-12 + r.h*30).toFixed(1)})`);
      dM.head(5*sway + 3*pulse);
      if (l.since < dt + .001 && l.since >= 0) rings.spawn(time, {x:352 - 26, y:dy, life:.55}); }
    rings.tick(time, (p, k) => { T(p.el, `translate(${p.x} ${p.y}) scale(${(1 + 1.4*E.out(k)).toFixed(3)})`); p.el.setAttribute('opacity', (.7*(1 - k)).toFixed(3)); });

    /* ---- the aunts and the couple ---- */
    const rA = round(aA, bowls[0], gr, 'R', GT, -1, time, .4), rB = round(aB, bowls[1], br, 'L', BT, 1, time, .4 + BAR);
    [GT, BT].forEach(S => S.forEach(s => updSmear(s, time)));
    const tg = env(time - tapT.g, 0, .2, .9, 1.6), tb = env(time - tapT.b, 0, .2, .9, 1.6);
    const gl = Math.max(rA.laugh, tg), bl = Math.max(rB.laugh, tb);
    /* groom: aunt on his left. He leans away, half-raises a hand to fend her off, then laughs with his shoulders */
    { const away = 6*rA.ant + 4*gl, shake = -Math.abs(Math.sin(time*13))*1.3*gl;
      gr.setBody(away*.5, Math.sin(time*2)*.4 + shake, away + 1.2*sway*(1 - gl));
      const fend = rA.ant;
      reach(gr.r, 'L', lerp(-3, -24, fend), lerp(-66, -88, fend)); reach(gr.r, 'R', lerp(3, 4, fend), lerp(-66, -70, fend));
      gr.head(away*.9 + 4*gl*Math.sin(time*6.5)*.4, 0, -gl*.6);
      Kin.face(gr, time, gl, rA.ant*.6); }
    /* bride: aunt on her right. She shies away, then giggles behind her hand */
    { const away = -(6*rB.ant + 4*bl), shake = -Math.abs(Math.sin(time*12 + 1))*1.1*bl;
      br.setBody(away*.5, Math.sin(time*2 + 1)*.4 + shake, away + 1.2*sway*(1 - bl));
      const k = clamp(bl*1.4);
      reach(br.r, 'L', lerp(-3, -2, k), lerp(-66, -91, k)); reach(br.r, 'R', lerp(3, 5, k*.5), lerp(-66, -70, k*.5));
      br.head(away*.9 - 3*bl, 0, -bl*.5);
      Kin.face(br, time + .7, bl, rB.ant*.6); }
    { const ph16 = hb % 16; Kin.face(dF, time, env(ph16, 11.6, 12.2, 13.8, 14.6)); }
    Kin.face(aA, time + 1.7, gl*.7); Kin.face(aB, time + 3.4, bl*.7); Kin.face(dM, time + 5.1, .35*pulse);

    /* ---- two kids chase across the front, easing into each turn, legs keeping pace with the ground ---- */
    kids.forEach(o => {
      const k = o.f, a = time*.62 + (o.id ? 2.4 : 0), dir = o.id ? -1 : 1;
      const x = 200 + dir*168*Math.sin(a), vx = dir*168*.62*Math.cos(a), sp = Math.abs(vx);
      o.d += sp*dt; const ph2 = o.d/(34*o.sc)*Math.PI;
      k.x = x; k.y = o.y0 + 7*Math.sin(time*1.3 + o.id*2); k.s = o.sc*(1 + (k.y - 270)/180);
      k.sx = Math.tanh(vx/30); k.place();
      const run = clamp(sp/70), lean = clamp(vx/104, -1, 1)*9;
      k.setBody(0, -Math.abs(Math.sin(ph2))*3.4*run, lean*(k.sx < 0 ? -1 : 1) + 4*Math.sin(ph2)*run*.4);
      if (k.r.legL){ T(k.r.legL, `rotate(${(26*Math.sin(ph2)*run).toFixed(1)} -6 -50)`); T(k.r.legR, `rotate(${(-26*Math.sin(ph2)*run).toFixed(1)} 6 -50)`); }
      else T(k.r.skirt, `rotate(${(5*Math.sin(ph2)*run).toFixed(1)} 0 -52)`);
      setArm(k.r,'L', 40 + 34*Math.sin(ph2)*run + 10*(1 - run), -30); setArm(k.r,'R', 150 + 22*Math.sin(ph2 + 1.4), 20);
      Kin.face(k, time + o.id*2.3, .8*run);
    });
    if (time > kidT){ kidT = time + .9 + Math.random()*.5; const k = Math.random() < .5 ? kidA : kidB; const h = k.handB('R'); puff(time, h[0], h[1] - 4, .8); }
    if (time > kidB2 && Math.abs(kidA.x - kidB.x) < 40){ kidB2 = time + 2.2; burst(time, (kidA.x + kidB.x)/2, 236, 12, 30); }
    if (time > np){ np = time + 1.6; puff(time, 30 + Math.random()*50, 150 + Math.random()*30, .9, 1.4); puff(time + .5, 330 + Math.random()*50, 160 + Math.random()*30, .9, 1.4); }
    all.forEach(f => Kin.sec(f, dt));

    puffs.tick(time, (p, k) => { T(p.el, `translate(${p.x.toFixed(1)} ${(p.y - 12*E.out(k)).toFixed(1)}) scale(${(p.s*(.5 + 2.6*E.out(k))).toFixed(3)})`); p.el.setAttribute('opacity', (1 - k).toFixed(3)); });
    grains.tick(time, (p, k, age) => { T(p.el, `translate(${(p.x + p.vx*age).toFixed(1)} ${(p.y + p.vy*age + 80*age*age).toFixed(1)})`); p.el.setAttribute('opacity', (1 - k*k).toFixed(3)); });

    /* a slow, barely-there camera drift towards the couple */
    const cz = .5 - .5*Math.cos(2*Math.PI*time/17);
    cam.set(1 + .045*cz, 200 + 3*Math.sin(time*.23), 165 + 10*cz);
    prevT = time;
  };
  return runner(tick, {el, reset, still:.4 + BAR + 2.9*BEAT, warm:4});
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
