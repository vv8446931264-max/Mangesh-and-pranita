/* ---------- Share ---------- */
$('share').addEventListener('click', async () => {
  const url = location.origin + location.pathname, title = `${C.groom} & ${C.bride} \u2022 Wedding Invitation`;   /* never forward someone else's ?to= name */
  if (navigator.share){ try { await navigator.share({title, text:title, url}); } catch(e){} return; }
  open('https://wa.me/?text=' + encodeURIComponent(`${title}\n${url}`), '_blank', 'noopener');
});
if (C.credits && C.credits.length){ $('credits').innerHTML = 'Music via Wikimedia Commons: ' + C.credits.join(' \u2022 ');   /* our own config strings, so HTML (links) is fine */ $('credits').hidden = false; }

/* ---------- Countdown ---------- */
const target = dOf(lag).getTime();
(function tick(){
  const t = Math.max(0, target - Date.now());
  const set = (id,v) => { const e = $(id); v = String(v); if (e.textContent === v) return; e.textContent = v; e.classList.remove('tk'); void e.offsetWidth; e.classList.add('tk'); };
  set('d', Math.floor(t/864e5));
  set('h', String(Math.floor(t/36e5)%24).padStart(2,'0'));
  set('m', String(Math.floor(t/6e4)%60).padStart(2,'0'));
  set('s', String(Math.floor(t/1e3)%60).padStart(2,'0'));
  setTimeout(tick, 1000);
})();
window.__ok = true;
