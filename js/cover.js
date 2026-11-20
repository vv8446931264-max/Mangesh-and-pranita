/* ---------- Opening cover: palace doors (?to=Name personalises it) ---------- */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const guest = (new URLSearchParams(location.search).get('to') || '').trim().slice(0,40);
const wideQ = matchMedia('(min-aspect-ratio:11/10)'), stg = $('cvStage'), still = matchMedia('(prefers-reduced-motion:reduce)').matches;
const setDoors = () => {                                       /* tall photo for phones, wide one for laptops; the leaves are cut from the same photo */
  stg.classList.remove('ready'); stg.querySelectorAll('img').forEach(i => i.src = wideQ.matches ? 'img/doors-wide.webp' : 'img/doors-tall.webp');
  const im = stg.querySelector('img'); (im.decode ? im.decode() : Promise.resolve()).catch(() => {}).then(() => stg.classList.add('ready'));
};
setDoors(); wideQ.addEventListener && wideQ.addEventListener('change', setDoors);
$('cvDeities').innerHTML = '<span>\u0965 ' + C.deities[1] + ' \u0965</span>';
$('cvG').textContent = C.groom; $('cvB').textContent = C.bride; $('cvWhen').innerHTML = $('heroWhen').innerHTML;
if (guest){ $('cvTo').textContent = `प्रिय / Dear ${guest}`; $('cvTo').hidden = false;
  document.querySelectorAll('.contact[data-wa]').forEach(a => { a.href += encodeURIComponent(' \u2014 ' + guest); }); }
const petals = cv => {                                         /* a burst of petals as the doors part */
  const cols = ['#f4a300','#ff8a2b','#e8508a','#ffd23f','#c43c4c'];
  for (let i=0;i<30;i++){
    const p = document.createElement('i'), a = Math.random()*Math.PI*2, d = 140 + Math.random()*Math.min(innerWidth,700)*.5;
    p.className = 'cvpetal'; p.style.background = cols[i%5]; cv.appendChild(p);
    p.animate([{transform:'translate(-50%,-50%) scale(.4)', opacity:0}, {opacity:1, offset:.15},
      {transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d*.7 + 220}px) rotate(${Math.random()*900 - 450}deg)`, opacity:0}],
      {duration:1800 + Math.random()*1000, delay:700 + Math.random()*400, easing:'cubic-bezier(.2,.7,.3,1)', fill:'both'});
  }
};
$('openBtn').addEventListener('click', () => {
  try { if (!Aud.on) toggleSound(); Aud.fx('bell'); setTimeout(() => { try { Aud.fx('chime'); } catch(e){} }, 900); } catch(e){}   /* sound trouble must never keep the doors shut */
  const cv = $('cover'); cv.classList.add('open'); if (!still) petals(cv);
  setTimeout(() => { document.documentElement.classList.remove('locked'); scrollTo(0,0); heroSync(); M.markOpen(); }, still ? 0 : 2600);   /* names glow in as the doors give way */
  setTimeout(() => cv.remove(), still ? 0 : 3500);
}, {once:true});
$('scrollCue').addEventListener('click', e => { e.preventDefault(); scrollTo({top: $('hero').offsetHeight, behavior: 'smooth'}); });
addEventListener('scroll', () => { if (scrollY > 160) document.documentElement.classList.add('scrolled'); }, {passive:true});
$('openBtn').focus({preventScroll:true});
/* testing shortcut: ?skip opens straight onto the page with no cover (sound stays off) */
if (new URLSearchParams(location.search).has('skip')){
  $('cover').remove(); document.documentElement.classList.remove('locked'); heroSync(); M.markOpen();
}
