/* ===================================================================
   Sound: music and effects are synthesised in the browser (no audio files).
   Only soft voices (bansuri, santoor, veena, soft shehnai, tanpura, tabla, dhol, bells)
   through a warm hall reverb and a gentle limiter, so nothing is harsh on phone speakers.
   =================================================================== */
const Aud = (() => {
  let ctx=null, out=null, comp=null, mg=null, unlocked=false, on=false, track='main', timer=null, nextT=0, step=0, noiseBuf=null, bus=null, prevF=0, prevStep=-9;
  const files = {}, cache = new Map();
  /* ragas (just-intonation ratios) */
  const SCALES = {
    bhoopali:[1,9/8,5/4,3/2,5/3],
    bilawal:[1,9/8,5/4,4/3,3/2,5/3,15/8],
    yaman:[1,9/8,5/4,45/32,3/2,5/3,15/8]
  };
  /* one soundtrack for the main page and one for each card: tempo, key (sa), raga, melody (32 steps), instrument, rhythm */
  const TRACKS = {
    main:{ bpm:72, sa:293.66, scale:'bhoopali', inst:'flute', drone:true, bell:32,
      mel:[5,null,null,7, 6,5,null,4, 5,null,7,null,9,null,null,null, 8,null,7,null,6,5,null,7, 5,null,4,null,3,null,null,null] },
    sakharpuda:{ bpm:80, sa:261.63, scale:'bhoopali', inst:'santoor', pad:true, tv:.26,
      tabla:['Dha',0,'Na','Ti','Na',0,'Dhi','Na'],
      mel:[2,null,3,null,4,null,3,2, 0,null,null,null,2,null,null,null, 3,null,4,null,5,null,4,3, 2,null,3,null,2,0,null,null] },
    haldi:{ bpm:116, sa:293.66, scale:'bilawal', inst:'pluck', shaker:.012, clap:[2,6],
      dhol:[['D',0,'t','t','D',0,'t',0],['D','t','t',0,'D','t','D','t']],
      mel:[7,7,9,7,null,5,4,5, 7,7,9,11,9,7,null,5, 7,7,9,7,null,5,4,5, 4,5,7,5,4,2,0,null] },
    lagna:{ bpm:62, sa:277.18, scale:'yaman', inst:'reed', drone:true, bell:16, tv:.24,
      tabla:['Dha',0,'Dhi',0,'Na',0,'Dhi',0],
      mel:[4,null,null,null,5,null,6,null, 7,null,null,null,6,null,5,null, 4,null,null,3,null,4,null,null, 2,null,null,null,0,null,null,null] },
    saptapadi:{ bpm:54, sa:196.0, scale:'bhoopali', inst:'veena', drone:true, bowl:16, tv:.18,
      tabla:['Ge',0,0,0,0,0,0,0],
      mel:[0,null,null,null,null,null,2,null, 3,null,null,null,2,null,0,null, null,null,4,null,null,null,3,null, 2,null,null,null,0,null,null,null] }
  };
  /* wind voices: harmonic recipe, tone filter, attack, vibrato, meend (glide) and breath */
  const FLUTE = {h:[1,.16,.05,.02], lp:3200, atk:.09, vr:5, vd:.006, glide:.09, breath:.06};
  const REED  = {h:[1,.62,.48,.34,.22,.13,.07,.035], lp:2600, atk:.07, vr:5.6, vd:.009, glide:.12};
  const freqOf = (b,i) => { const S = SCALES[b.scale], n = S.length; return b.sa * S[((i%n)+n)%n] * Math.pow(2, Math.floor(i/n)); };

  function newBus(){
    const g = ctx.createGain(), t = ctx.currentTime;
    g.gain.setValueAtTime(.0001,t); g.gain.linearRampToValueAtTime(1,t+.9); g.connect(out); return g;
  }
  function fadeBus(old){
    const t = ctx.currentTime;
    old.gain.cancelScheduledValues(t); old.gain.setValueAtTime(Math.max(old.gain.value,.0001),t); old.gain.linearRampToValueAtTime(.0001,t+.8);
    setTimeout(() => { try { old.disconnect(); } catch(e){} }, 6500);
  }
  /* warm hall: decaying noise that also gets darker as it fades, so the tail never hisses */
  function hall(sec){
    const sr = ctx.sampleRate, len = Math.floor(sr*sec), pre = Math.floor(sr*.018), b = ctx.createBuffer(2,len,sr);
    for (let c=0;c<2;c++){ const d = b.getChannelData(c); let y = 0;
      for (let i=pre;i<len;i++){ const k = (i-pre)/(len-pre); y += (.55-.5*k)*((Math.random()*2-1) - y); d[i] = y*Math.pow(1-k,2.4); } }
    return b;
  }
  function init(){
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch(e){}   /* iPhone: still plays with the silent switch on */
    out = ctx.createGain();
    const warm = ctx.createBiquadFilter(), dry = ctx.createGain(), wet = ctx.createGain(), rev = ctx.createConvolver();
    comp = ctx.createDynamicsCompressor(); mg = ctx.createGain();
    warm.type = 'lowpass'; warm.frequency.value = 7500; warm.Q.value = .5;
    dry.gain.value = .8; wet.gain.value = .3; mg.gain.value = 0;
    comp.threshold.value = -16; comp.knee.value = 12; comp.ratio.value = 4; comp.attack.value = .01; comp.release.value = .25;
    rev.buffer = hall(2.8);
    out.connect(warm); warm.connect(dry); warm.connect(rev); rev.connect(wet); dry.connect(comp); wet.connect(comp); comp.connect(mg); mg.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0); for (let i=0;i<nd.length;i++) nd[i] = Math.random()*2-1;
    for (const k in files){                                             /* recordings skip the synth's reverb and go straight to the limiter */
      const f = files[k]; f.g = ctx.createGain(); f.g.gain.value = 0; ctx.createMediaElementSource(f.a).connect(f.g); f.g.connect(comp);
    }
    bus = newBus();
  }
  const env = (g,t,a,peak,dur) => { g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(peak,t+a); g.gain.exponentialRampToValueAtTime(.0001,t+dur); };
  const tone = (type,f,t,a,peak,dur,f1) => {                          /* one enveloped oscillator, optional pitch drop to f1 */
    const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type;
    o.frequency.setValueAtTime(f,t); if (f1) o.frequency.exponentialRampToValueAtTime(f1,t+dur*.45);
    env(g,t,a,peak,dur); o.connect(g); g.connect(bus); o.start(t); o.stop(t+dur+.05);
  };
  const vib = (o,f,t,rate,depth,delay) => {                         /* delayed vibrato on an oscillator */
    const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = rate;
    lg.gain.setValueAtTime(0,t); lg.gain.linearRampToValueAtTime(f*depth,t+delay); l.connect(lg); lg.connect(o.frequency); l.start(t); return l;
  };

  /* ---------- plucked strings: Karplus-Strong string model (santoor, veena, tanpura) ---------- */
  function ksBuf(f,dur,damp,pos){
    const key = `${Math.round(f*10)}|${dur}|${damp}|${pos}`; if (cache.has(key)) return cache.get(key);
    const sr = ctx.sampleRate, N = Math.max(2,Math.round(sr/f)), len = Math.floor(sr*dur), buf = ctx.createBuffer(1,len,sr), d = buf.getChannelData(0);
    const line = new Float32Array(N); for (let i=0;i<N;i++) line[i] = Math.random()*2-1;
    const k = Math.max(1,Math.floor(N*pos)), tmp = line.slice(); for (let i=0;i<N;i++) line[i] = tmp[i] - .9*tmp[(i+k)%N];   /* pick position */
    let p = 0; for (let i=0;i<len;i++){ const a = line[p], b = line[(p+1)%N], v = damp*.5*(a+b); line[p] = v; d[i] = a; p = (p+1)%N; }
    let m = 0; for (let i=0;i<len;i++) m = Math.max(m,Math.abs(d[i])); if (m > 0) for (let i=0;i<len;i++) d[i] /= m;
    const r = {buf,N}; cache.set(key,r); return r;
  }
  function pluck(f,t,vol,o){
    const dur = o.dur||2.4, lpf = o.lp||3000, {buf,N} = ksBuf(f,dur,o.damp||.9965,o.pos||.18);
    const rate = f*N/ctx.sampleRate*(o.mul||1);                         /* exact tuning: the buffer's own pitch is sampleRate/N */
    const s = ctx.createBufferSource(), lp = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = buf;
    if (o.from){ s.playbackRate.setValueAtTime(rate*o.from/f,t); s.playbackRate.exponentialRampToValueAtTime(rate,t+.1); } else s.playbackRate.value = rate;
    lp.type = 'lowpass'; lp.frequency.setValueAtTime(lpf,t); lp.frequency.exponentialRampToValueAtTime(lpf*.35,t+dur*.6);   /* the string mellows as it rings */
    g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(.0001,t+dur*.97);
    s.connect(lp); lp.connect(g); g.connect(bus); s.start(t); s.stop(t+dur);
  }
  /* santoor: two hammered strings per note, a hair apart in pitch, for its shimmer */
  const santoor = (f,t,vol) => { pluck(f,t,vol,{dur:2.2,damp:.9962,pos:.12,lp:4200}); pluck(f,t+.004,vol*.7,{dur:2.2,damp:.9962,pos:.2,lp:3600,mul:1.0025}); };

  /* ---------- sustained wind voice: bansuri (FLUTE) or a soft, round shehnai (REED) ---------- */
  function blow(f,t,dur,vol,from,o){
    const osc = ctx.createOscillator(), lp = ctx.createBiquadFilter(), g = ctx.createGain(), pk = Math.max(o.atk+.02, dur-Math.min(.35,dur*.4));
    osc.setPeriodicWave(o.pw || (o.pw = ctx.createPeriodicWave(new Float32Array(o.h.length+1), Float32Array.from([0,...o.h]))));
    osc.frequency.setValueAtTime(from||f,t); if (from) osc.frequency.exponentialRampToValueAtTime(f,t+o.glide);   /* meend from the last note */
    lp.type = 'lowpass'; lp.frequency.value = o.lp; lp.Q.value = .4;
    g.gain.setValueAtTime(.0001,t); g.gain.linearRampToValueAtTime(vol*.82,t+o.atk); g.gain.linearRampToValueAtTime(vol,t+pk); g.gain.linearRampToValueAtTime(.0001,t+dur);
    const l = vib(osc,f,t,o.vr,o.vd,.3), e = t+dur+.05;
    osc.connect(lp); lp.connect(g); g.connect(bus); osc.start(t); osc.stop(e); l.stop(e);
    if (o.breath){
      const n = ctx.createBufferSource(), nf = ctx.createBiquadFilter(), ng = ctx.createGain();
      n.buffer = noiseBuf; n.loop = true; nf.type = 'bandpass'; nf.frequency.value = f*2; nf.Q.value = 2; ng.gain.value = o.breath;
      n.connect(nf); nf.connect(ng); ng.connect(g); n.start(t, Math.random()*.5); n.stop(e);
    }
  }
  /* ---------- soft chord pad ---------- */
  function pad(freqs,t,dur,vol){
    freqs.forEach(f => [.997,1.003].forEach(m => {
      const o = ctx.createOscillator(), g = ctx.createGain(), lp = ctx.createBiquadFilter(); o.type = 'triangle'; o.frequency.value = f*m; lp.type = 'lowpass'; lp.frequency.value = 1100;
      g.gain.setValueAtTime(.0001,t); g.gain.linearRampToValueAtTime(vol,t+.9); g.gain.setValueAtTime(vol,t+dur-1); g.gain.linearRampToValueAtTime(.0001,t+dur);
      o.connect(lp); lp.connect(g); g.connect(bus); o.start(t); o.stop(t+dur+.05);
    }));
  }
  function noise(t,dur,vol,fq=3000,band){
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; f.type = band ? 'bandpass' : 'highpass'; f.frequency.value = fq; env(g,t,.003,vol,dur);
    s.connect(f); f.connect(g); g.connect(bus); s.start(t, Math.random()*.5); s.stop(t+dur+.02);
  }
  /* ---------- drums ---------- */
  const bayan = (t,v) => tone('sine',140,t,.005,v*.9,.5,70);
  const dayan = (t,v,f) => { [[1,.6,.45],[2,.18,.22],[2.9,.08,.12]].forEach(([m,a,d]) => tone('sine',f*m,t,.002,v*a,d)); noise(t,.02,v*.1,2500,true); };
  const BOL = {
    Dha:(t,v,f) => { bayan(t,v); dayan(t,v,f); },
    Dhi:(t,v,f) => { bayan(t,v*.7); dayan(t,v*.9,f*1.12); },
    Na :(t,v,f) => dayan(t,v*.9,f),
    Ge :(t,v)   => bayan(t,v),
    Ti :(t,v)   => noise(t,.03,v*.18,3000,true)
  };
  const dholBass = (t,v) => tone('sine',110,t,.005,v,.5,52);
  const dholStick = (t,v) => { noise(t,.045,v*.32,2200,true); tone('triangle',330,t,.002,v*.22,.1,240); };
  /* ---------- bells ---------- */
  const bell = (t,vol,f0) => [[1,1,3],[2.01,.4,2],[2.76,.22,1.3],[4.07,.08,.8]].forEach(([m,a,d]) => tone('sine',f0*m,t,.004,vol*a,d));
  const bowl = (t,vol,f0) => [[1,1,6],[2.74,.5,4],[5.1,.2,2.6]].forEach(([m,a,d]) => [-.35,.35].forEach(dt => tone('sine',f0*m+dt,t,.02,vol*a/2,d)));   /* singing bowl */

  function stepAt(t,s,b){
    const i = s%32, eighth = 60/b.bpm/2, m = b.mel[i];
    if (m != null){
      const f = freqOf(b,m); let n = 1; while (n < 8 && b.mel[(i+n)%32] == null) n++;
      const hold = n*eighth, glide = (s-prevStep) <= 3 && prevF ? prevF : 0;
      if (b.inst === 'flute') blow(f,t,Math.min(hold*.96,2.6),.12,glide,FLUTE);
      else if (b.inst === 'reed') blow(f,t,hold*.98,.09,glide,REED);
      else if (b.inst === 'santoor'){ santoor(f,t,.24); if (n >= 4) santoor(f,t+hold/2,.1); }
      else if (b.inst === 'pluck') pluck(f,t,.26,{dur:1,damp:.993,pos:.14,lp:4200});
      else if (b.inst === 'veena') pluck(f,t,.4,{dur:3.6,damp:.9986,pos:.25,lp:2600,from:glide});
      prevF = f; prevStep = s;
    }
    if (b.drone && i%2 === 0) pluck([b.sa*.75, b.sa, b.sa, b.sa*.5][(i%8)/2|0],t,.1,{dur:4,damp:.9988,pos:.1,lp:1800});   /* tanpura: Pa Sa Sa Sa(low) */
    if (b.pad && i%16 === 0){ const ch = (i%32) === 0 ? [1,5/4,3/2] : [5/6,1,5/4]; pad(ch.map(r => b.sa*r),t,eighth*16,.025); }
    if (b.tabla){ const bol = b.tabla[i%8]; if (bol) BOL[bol](t,b.tv,b.sa*2); }
    if (b.dhol){ const x = b.dhol[((s/8)|0)%b.dhol.length][i%8]; if (x === 'D'){ dholBass(t,.55); dholStick(t,.3); } else if (x === 't') dholStick(t,.38); }
    if (b.clap && b.clap.includes(i%8)) noise(t,.06,.09,1400,true);
    if (b.shaker && i%2 === 1) noise(t,.03,b.shaker,6000);
    if (b.bell && i%b.bell === 0) bell(t,.05,b.sa*2);
    if (b.bowl && i%b.bowl === 0) bowl(t,.14,b.sa*2);
  }
  function sched(){
    if (!on || !ctx) return; const b = TRACKS[track] || TRACKS.main, eighth = 60/b.bpm/2;
    if (files[track]){ nextT = ctx.currentTime+.12; return; }               /* a real recording is playing instead */
    while (nextT < ctx.currentTime+.35){ stepAt(nextT, step, b); nextT += eighth; step++; }
  }
  /* real recordings (C.audio). Crossfades run on Web Audio gains because iPhones ignore media.volume. */
  const REC = .55, LOUD = 1.2;
  function fail(k){ const f = files[k]; if (!f) return; delete files[k]; f.a.pause(); }   /* missing or blocked file: that part uses the built-in music */
  function applyFiles(){
    const t = ctx ? ctx.currentTime : 0;
    for (const k in files){
      const f = files[k], want = on && k === track;
      if (want) f.a.play().catch(e => { if (e.name !== 'AbortError') fail(k); });
      if (f.g){ f.g.gain.cancelScheduledValues(t); f.g.gain.setTargetAtTime(want ? REC : 0, t, .3); }
      if (!want && !f.a.paused) setTimeout(() => { if (!(on && k === track)) f.a.pause(); }, 1500);
    }
  }
  /* iOS lets a recording start later (on scroll) only if it was played once inside a tap: touch each one now */
  function unlock(){
    if (unlocked) return; unlocked = true;
    for (const k in files) if (k !== track){ const a = files[k].a, p = a.play(); a.pause(); if (p) p.catch(() => {}); }
  }
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden){ ctx.suspend(); for (const k in files) files[k].a.pause(); }
    else if (on){ ctx.resume(); applyFiles(); }
  });
  return {
    get on(){ return on; },
    get track(){ return track; },
    get file(){ return !!files[track]; },                                 /* is a recording (not the synth) playing here? */
    loadFiles(map){
      if (location.protocol === 'file:') return;                              /* opened as a local file: browsers play recordings silently, so use the built-in music */
      Object.keys(map||{}).forEach(k => {
        if (!map[k]) return; const a = new Audio(); a.preload = 'none'; a.loop = true; a.src = map[k];
        a.addEventListener('error', () => fail(k));
        files[k] = {a, g:null};
      });
    },
    toggle(){
      init(); if (ctx.state === 'suspended') ctx.resume(); on = !on;
      const t = ctx.currentTime; mg.gain.cancelScheduledValues(t); mg.gain.setTargetAtTime(on ? LOUD : 0, t, on ? .05 : .12);   /* fade, never click */
      clearInterval(timer);
      if (on){ nextT = t+.1; step = 0; timer = setInterval(sched,100); unlock(); }
      applyFiles(); return on;
    },
    setBed(name){                                                          /* 'main' or a card id: only one soundtrack plays at a time */
      if (!TRACKS[name]) name = 'main'; if (name === track) return;
      track = name; step = 0; prevF = 0; prevStep = -9;
      if (ctx){ fadeBus(bus); bus = newBus(); }
      if (on) nextT = ctx.currentTime+.15;
      applyFiles();
    },
    fx(name){                                                              /* effects are tuned to the soundtrack's key, so they always fit */
      if (!on || !ctx) return; const t = ctx.currentTime+.02, sa = (TRACKS[track] || TRACKS.main).sa;
      if (name === 'bell') bell(t,.1,sa*2);
      else if (name === 'gong'){ bell(t,.16,sa); bowl(t,.12,sa*2); }
      else if (name === 'chime') [1,5/4,3/2].forEach((r,i) => santoor(sa*2*r,t+i*.13,.12));
      else if (name === 'sparkle') [1,9/8,5/4,3/2,2].forEach((r,i) => pluck(sa*4*r,t+i*.06,.07,{dur:1.2,damp:.995,pos:.2,lp:6000}));
      else if (name === 'dhol'){ dholBass(t,.6); dholStick(t,.4); dholStick(t+.12,.25); }
    }
  };
})();

Aud.loadFiles(C.audio);
function toggleSound(){
  const on = Aud.toggle(), b = $('snd');
  b.classList.toggle('on', on); b.classList.remove('hint'); b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', on ? 'Turn sound off' : 'Turn sound on');
  if (on) nowPlaying();
}
$('snd').addEventListener('click', () => { try { toggleSound(); } catch(e){} });
/* "now playing" chip: shows the recording's name for ~3 s when the music changes (checked after a beat, so a missing file never shows a name) */
let npT = 0;
function nowPlaying(){
  clearTimeout(npT);
  npT = setTimeout(() => {
    const el = $('np'), n = Aud.on && Aud.file && C.trackNames[Aud.track];
    if (!n) return el.classList.remove('show');
    el.textContent = '\u266B ' + n; el.classList.add('show'); npT = setTimeout(() => el.classList.remove('show'), 3000);
  }, 700);
}
