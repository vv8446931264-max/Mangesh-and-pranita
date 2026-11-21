/* ===================================================================
   Hero: mandala, marigold toran, the portrait's gold arch and the names.
   The entrance itself is CSS (cinematic.css). It is paused while html.locked, so it
   starts the moment the doors give way (or at once with ?skip). This file builds the
   parts and, once the invitation is open, adds a little depth from pointer/tilt and scroll.
   =================================================================== */

/* ---- the couple's names, letter by letter (cover and hero) ----
   Every letter paints its own slice of the gradient: --w is the width of the whole line and
   --o the letter's offset in it, so the line still reads as one continuous gradient. */
const namesAll = [];
const namesFit = h => {
  const L = h.querySelectorAll('.sc'); if (!L.length) return;
  let a = 1e9, b = -1e9;
  L.forEach(s => { a = Math.min(a, s.offsetLeft); b = Math.max(b, s.offsetLeft + s.offsetWidth); });
  if (b <= a) return;
  h.style.setProperty('--w', (b - a).toFixed(1) + 'px');
  L.forEach(s => s.style.setProperty('--o', (s.offsetLeft - a).toFixed(1) + 'px'));
};
const namesSplit = (h, label) => {
  if (!h || h.dataset.split) return h;
  h.dataset.split = '1'; h.setAttribute('aria-label', label);
  let i = 0;
  [...h.children].forEach(c => {
    c.setAttribute('aria-hidden', 'true');
    if (c.classList.contains('amp')) { c.style.setProperty('--i', i++); return; }
    const chars = [...c.textContent]; c.textContent = '';
    chars.forEach(ch => { const s = document.createElement('span'); s.className = 'sc'; s.textContent = ch; s.style.setProperty('--i', i++); c.appendChild(s); });
  });
  h.style.setProperty('--n', i);
  namesAll.push(h); namesFit(h);
  return h;
};
/* one sweep of light across the letters (background-position of ~15 small letters, once) */
const namesGlint = (h, delay) => {
  if (M.reduced || !h || !(window.CSS && CSS.supports && CSS.supports('(-webkit-background-clip:text) or (background-clip:text)'))) return;
  const W = parseFloat(h.style.getPropertyValue('--w')); if (!W) return;
  h.querySelectorAll('.sc').forEach(s => {
    const o = parseFloat(s.style.getPropertyValue('--o')) || 0;
    s.animate([{backgroundPosition: `${(-.75*W - o).toFixed(1)}px 0, ${-o}px 0`}, {backgroundPosition: `${(.75*W - o).toFixed(1)}px 0, ${-o}px 0`}],
      {duration: 1400, delay, easing: 'cubic-bezier(.65,0,.35,1)'});
  });
};
(function(){
  const refit = () => namesAll.forEach(namesFit);
  let rt = 0; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(refit, 150); }, {passive:true});
  if (document.fonts){ document.fonts.ready.then(refit); document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', refit); }
  addEventListener('load', refit);
})();

(function(){
  const hero = $('hero'), tor = $('toran'), pw = hero.querySelector('.portrait-wrap'), po = pw.querySelector('.portrait');

  /* ---- mandala: two whole layers turning in opposite directions (turning whole layers is composited;
     turning groups inside one SVG repaints it every frame) ---- */
  const layers = [{n:12,r:70,rx:16,ry:56,a:1},{n:24,r:150,rx:12,ry:46},{n:18,r:240,rx:22,ry:70,a:1},{n:36,r:335,rx:10,ry:40}];
  let A = '', B = '';
  [40,120,200,290,385].forEach(r => A += `<circle r="${r}" stroke-dasharray="2 7"/>`);
  layers.forEach(l => {
    let g = '';
    for (let i=0;i<l.n;i++) g += `<ellipse cx="0" cy="-${l.r}" rx="${l.rx}" ry="${l.ry}" transform="rotate(${i*360/l.n})"/>`;
    l.a ? A += g : B += g;
  });
  const vb = 'viewBox="-400 -400 800 800"';
  $('mandala').innerHTML = `<div class="mdisc"><svg class="mla" ${vb}>${A}</svg><svg class="mlb" ${vb}>${B}</svg></div>`;

  /* ---- toran: mango leaves and marigold strings that drop in from the centre outwards, then keep swaying ---- */
  const toran = again => {
    const w = Math.round(tor.getBoundingClientRect().width) || innerWidth + 16, n = Math.ceil(w/28)+1, mid = w/2;
    let t = `<path class="rope" style="transform-origin:${mid}px 5px" d="M0 5H${w}" stroke="#c8921f" stroke-width="3"/>`;
    for (let i=0;i<n;i++){
      const x = i*28+14, dur = 2.6+(i%4)*.4, d = .6 + Math.min(1, Math.abs(x-mid)/mid)*.7;
      t += `<g class="tl" style="--d:${d.toFixed(2)}s;transform-origin:${x}px 5px"><g class="vb" style="transform-origin:${x}px 5px;animation:swayS ${dur}s ${-i*.3}s ease-in-out infinite alternate">
        <path d="M${x} 5C${x-11} 22 ${x-6} 44 ${x} 56C${x+6} 44 ${x+11} 22 ${x} 5Z" fill="#3d8b4e"/><path d="M${x} 9V52" stroke="#2a6a3a" stroke-width="1"/></g></g>`;
      if (i%2 === 0){
        const m = 2+(i%3);
        t += `<g class="ts" style="--d:${(d+.1).toFixed(2)}s"><g class="vb" style="transform-origin:${x+14}px 5px;animation:swayS ${dur+.5}s ${-i*.2}s ease-in-out infinite alternate"><line x1="${x+14}" y1="5" x2="${x+14}" y2="${12+m*10}" stroke="#7a9a3a"/>`
          + Array.from({length:m},(_,k)=>`<circle cx="${x+14}" cy="${14+k*10}" r="5.4" fill="${k%2?'#ffd23f':'#f4a300'}"/><circle cx="${x+14}" cy="${14+k*10}" r="2.2" fill="#e8730c"/>`).join('') + '</g></g>';
      }
    }
    tor.classList.toggle('built', !!again);   /* a rebuild after a rotation does not replay the entrance */
    tor.setAttribute('viewBox', `0 0 ${w} 96`); tor.innerHTML = t;
  };
  toran();
  let lw = innerWidth, tt = 0;
  addEventListener('resize', () => { if (innerWidth === lw) return; lw = innerWidth; clearTimeout(tt); tt = setTimeout(() => toran(true), 200); }, {passive:true});

  /* ---- a gold arch that draws itself around the portrait, from a small finial at the apex down both sides ---- */
  pw.insertAdjacentHTML('beforeend', '<svg class="parch" aria-hidden="true"><defs><linearGradient id="parchG" x1="0" y1="0" x2="0" y2="1">'
    + '<stop offset="0" stop-color="#f1c75a"/><stop offset=".55" stop-color="#c8921f"/><stop offset="1" stop-color="#e0b04a"/></linearGradient></defs>'
    + '<path pathLength="1"/><path pathLength="1"/><g><path class="fin" d="M0 -7L4 0L0 7L-4 0Z"/></g></svg>');
  const arch = pw.querySelector('.parch'), [pl, pr] = arch.querySelectorAll('path'), fin = arch.querySelector('g');
  const drawArch = () => {
    const W = po.offsetWidth, H = po.offsetHeight; if (!W || !H) return;
    const o = 6.75, x0 = -o, x1 = W+o, y0 = -o, y1 = H+o, cx = W/2, rx = W/2+o, ry = .2*H+o, rb = 22+o, f = v => v.toFixed(1);
    const side = (xe, sw) => `M${f(cx)} ${f(y0)}A${f(rx)} ${f(ry)} 0 0 ${sw} ${f(xe)} ${f(y0+ry)}V${f(y1-rb)}A${rb} ${rb} 0 0 ${sw} ${f(xe + (sw ? -rb : rb))} ${f(y1)}H${f(cx)}`;
    arch.setAttribute('width', W); arch.setAttribute('height', H);
    pl.setAttribute('d', side(x0, 0)); pr.setAttribute('d', side(x1, 1));
    fin.setAttribute('transform', `translate(${f(cx)} ${f(y0)})`);
  };
  drawArch(); pw.classList.add('drawn');   /* the CSS ring stays as the fallback when this never runs */
  if (window.ResizeObserver) new ResizeObserver(drawArch).observe(po); else addEventListener('resize', drawArch);
  po.querySelector('img').addEventListener('load', drawArch);

  /* ---- the scroll cue never sits on top of the date: where the date reaches the bottom of the screen, the cue waits just above it ---- */
  const cue = $('scrollCue'), when = hero.querySelector('.when');
  const placeCue = () => {
    cue.style.bottom = '';
    const top = hero.offsetTop + when.offsetTop, bot = top + when.offsetHeight, ct = innerHeight - parseFloat(getComputedStyle(cue).bottom) - cue.offsetHeight;
    if (bot > ct && top < innerHeight) cue.style.bottom = (innerHeight - top + 10) + 'px';
  };
  placeCue(); addEventListener('resize', placeCue, {passive:true}); addEventListener('load', placeCue);

  /* ---- names, and a single sweep of light once they have landed ---- */
  namesSplit(hero.querySelector('.names'), `${C.groom} & ${C.bride}`);
  M.opened(() => namesGlint(hero.querySelector('.names'), 2850));

  /* ---- depth while reading: pointer/tilt parallax between the layers; scrolling away eases the portrait
     a little smaller and turns the mandala a little faster as it fades. Only while the hero is on screen. ---- */
  if (M.reduced) return;
  M.opened(() => {
    const md = $('mandala'); let hh = hero.offsetHeight || innerHeight, off = 0, last = '';
    addEventListener('resize', () => { hh = hero.offsetHeight || innerHeight; }, {passive:true});
    const frame = (S, Pt) => {
      const k = M.clamp(S.y / hh), e = k*(2-k), px = Pt.x, py = Pt.y;
      const key = `${px.toFixed(3)}|${py.toFixed(3)}|${S.y|0}`; if (key === last) return; last = key;
      md.style.transform = `translate3d(${(-px*7).toFixed(2)}px,${(-py*7).toFixed(2)}px,0) rotate(${(S.y*.035).toFixed(2)}deg)`;
      md.style.opacity = (.55*(1-.7*e)).toFixed(3);
      tor.style.transform = `translate3d(${(px*5).toFixed(2)}px,0,0)`;
      pw.style.translate = `${(px*8).toFixed(2)}px ${(py*6).toFixed(2)}px`;
      pw.style.scale = (1-.08*e).toFixed(4);
    };
    const els = [md, tor, pw];
    M.onView(hero, (el, on) => {
      if (on && !off){ els.forEach(x => x.style.willChange = 'transform'); off = M.onFrame(frame); }
      else if (!on && off){ off(); off = 0; last = ''; els.forEach(x => x.style.willChange = ''); }
    }, {once:false, threshold:0, rootMargin:'0px'});
  });
})();
