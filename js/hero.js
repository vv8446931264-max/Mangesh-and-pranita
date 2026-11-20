/* ===================================================================
   Hero: mandala and marigold toran
   =================================================================== */
(function(){
  const layers = [{n:12,r:70,rx:16,ry:56,g:'ra'},{n:24,r:150,rx:12,ry:46,g:'rb'},{n:18,r:240,rx:22,ry:70,g:'ra'},{n:36,r:335,rx:10,ry:40,g:'rb'}];
  let s = '';
  [40,120,200,290,385].forEach(r => s += `<circle r="${r}" stroke-dasharray="2 7"/>`);
  layers.forEach(l => {
    s += `<g class="${l.g}">`;
    for (let i=0;i<l.n;i++) s += `<ellipse cx="0" cy="-${l.r}" rx="${l.rx}" ry="${l.ry}" transform="rotate(${i*360/l.n})"/>`;
    s += '</g>';
  });
  $('mandala').innerHTML = s;
  /* toran */
  const w = innerWidth, n = Math.ceil(w/28)+1; let t = `<path d="M0 5H${w}" stroke="#c8921f" stroke-width="3"/>`;
  for (let i=0;i<n;i++){
    const x = i*28+14, dur = 2.6+(i%4)*.4;
    t += `<g class="vb" style="transform-origin:${x}px 5px;animation:swayS ${dur}s ${-i*.3}s ease-in-out infinite alternate">
      <path d="M${x} 5C${x-11} 22 ${x-6} 44 ${x} 56C${x+6} 44 ${x+11} 22 ${x} 5Z" fill="#3d8b4e"/><path d="M${x} 9V52" stroke="#2a6a3a" stroke-width="1"/></g>`;
    if (i%2 === 0){
      const m = 2+(i%3);
      t += `<g class="vb" style="transform-origin:${x+14}px 5px;animation:swayS ${dur+.5}s ${-i*.2}s ease-in-out infinite alternate"><line x1="${x+14}" y1="5" x2="${x+14}" y2="${12+m*10}" stroke="#7a9a3a"/>`
        + Array.from({length:m},(_,k)=>`<circle cx="${x+14}" cy="${14+k*10}" r="5.4" fill="${k%2?'#ffd23f':'#f4a300'}"/><circle cx="${x+14}" cy="${14+k*10}" r="2.2" fill="#e8730c"/>`).join('') + '</g>';
    }
  }
  $('toran').setAttribute('viewBox', `0 0 ${w} 96`); $('toran').innerHTML = t;
})();
