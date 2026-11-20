/* ===================================================================
   Timeline: one event card at a time
   =================================================================== */
const CAPS = {sakharpuda:'Just engaged', haldi:'Tap to throw haldi', lagna:'Antarpat \u2022 Varmala \u2022 Rings', saptapadi:'Seven rounds around the fire'};
const BED = {sakharpuda:'engage', haldi:'haldi', lagna:'lagna', saptapadi:'phere'};
const sceneHTML = id => `<div class="scene" data-scene="${id}"><svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"></svg><div class="cap">${CAPS[id] || ''}</div></div>`;
const evEl = [], stepEl = [], ctrl = {};
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
  $('events').appendChild(sec); evEl.push(sec);
  const sc = sec.querySelector('.scene'); if (sc && SCN[e.id]) ctrl[e.id] = SCN[e.id](sc);

  const b = document.createElement('button');
  b.type = 'button'; b.className = 'step'; b.setAttribute('aria-label', `${e.en}, ${fmtD(e,{day:'numeric',month:'long'})}, ${whenOf(e)}`);
  b.innerHTML = `<span class="dot">${num}</span><b>${e.mr}</b><small>${fmtD(e,{day:'numeric',month:'short'})}<span class="tm"><br>${whenOf(e)}</span></small>`;
  b.addEventListener('click', () => go(i));
  $('steps').appendChild(b); stepEl.push(b);
});
$('track').style.left = $('track').style.right = (50 / C.events.length) + '%';

const TONE = ['#ffeef0','#fff6cc','#ffe8e2','#ffeacf'];
/* While the timeline card is on screen its own soundtrack plays and the main-page music stops; scroll away and the main music returns. */
let inView = false;
function live(){
  evEl.forEach((el,j) => { const c = ctrl[C.events[j].id]; if (c) (j === cur && inView) ? c.start() : c.stop(); });
  const was = Aud.track; Aud.setBed(inView && cur >= 0 ? C.events[cur].id : 'main'); if (Aud.track !== was) nowPlaying();
}
new IntersectionObserver(es => { inView = es[0].isIntersecting; live(); }, {threshold:.25}).observe($('timeline'));
let cur = -1;
function go(i){
  i = Math.max(0, Math.min(evEl.length-1, i)); if (i === cur) return;
  $('events').style.setProperty('--dir', i < cur ? -1 : 1); cur = i;
  evEl.forEach((el,j) => {
    const on = j === i; el.classList.toggle('active', on); el.setAttribute('aria-hidden', String(!on));
  });
  stepEl.forEach((s,j) => { s.classList.toggle('done', j<i); s.classList.toggle('active', j===i); s.setAttribute('aria-current', j===i ? 'step' : 'false'); });
  $('fill').style.width = (i/(evEl.length-1)*100) + '%';
  $('prev').disabled = i === 0; $('next').disabled = i === evEl.length-1;
  document.body.style.transition = 'background 1s'; document.body.style.background = TONE[i % TONE.length];
  live();
  fitStage();
}
/* card height follows the active event, so shorter events leave no empty gap */
function fitStage(){ if (cur >= 0) $('events').style.height = evEl[cur].offsetHeight + 'px'; }
addEventListener('load', fitStage); addEventListener('resize', fitStage);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitStage);
go(0);
$('prev').addEventListener('click', () => go(cur-1));
$('next').addEventListener('click', () => go(cur+1));
addEventListener('keydown', ev => {
  const r = $('timeline').getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight) return;
  if (ev.key === 'ArrowRight') go(cur+1); else if (ev.key === 'ArrowLeft') go(cur-1);
});
let tx = 0, ty = 0;
$('events').addEventListener('touchstart', ev => { tx = ev.touches[0].clientX; ty = ev.touches[0].clientY; }, {passive:true});
$('events').addEventListener('touchend', ev => {
  const dx = ev.changedTouches[0].clientX - tx, dy = ev.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)*1.6) go(cur + (dx < 0 ? 1 : -1));
}, {passive:true});
/* gentle 3D tilt of the active scene card on desktop */
const stageEl = $('events');
stageEl.addEventListener('pointermove', ev => {
  if (ev.pointerType === 'touch' || cur < 0) return;
  const sc = evEl[cur].querySelector('.scene'); if (!sc) return;
  const r = stageEl.getBoundingClientRect(), x = (ev.clientX-r.left)/r.width-.5, y = (ev.clientY-r.top)/r.height-.5;
  sc.style.transform = `rotateY(${x*9}deg) rotateX(${-y*7}deg)`;
});
stageEl.addEventListener('pointerleave', () => { if (cur >= 0){ const sc = evEl[cur].querySelector('.scene'); if (sc) sc.style.transform = ''; } });
