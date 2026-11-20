/* ---------- Falling petals (ambient) ---------- */
(function(){
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const cv = $('dust'), c = cv.getContext('2d'); let w, h;
  const size = () => { w = innerWidth; h = innerHeight; cv.width = w*DPR; cv.height = h*DPR; c.setTransform(DPR,0,0,DPR,0,0); };
  size(); let lw = w; addEventListener('resize', () => { if (innerWidth !== lw){ lw = innerWidth; size(); } });
  const cols = ['#f4a300','#ff8a2b','#ff7aa8','#ffd23f'];
  const mkp = (i, init) => ({x:Math.random()*w, y:init ? Math.random()*h : -12, r:3+Math.random()*4, vy:.35+Math.random()*.7, a:Math.random()*6, va:(Math.random()-.5)*.04, col:cols[i%4]});
  const ps = Array.from({length:SMALL?14:26}, (_,i) => mkp(i,true)); let t = 0;
  (function f(){
    if (!document.hidden){
      t += .012; c.clearRect(0,0,w,h); c.globalAlpha = .5;
      ps.forEach((p,i) => {
        p.y += p.vy; p.x += Math.sin(t+p.a)*.45; p.a += p.va; if (p.y > h+12) ps[i] = mkp(i,false);
        c.save(); c.translate(p.x,p.y); c.rotate(p.a); c.fillStyle = p.col; c.beginPath(); c.ellipse(0,0,p.r,p.r/2.1,0,0,7); c.fill(); c.restore();
      });
    }
    requestAnimationFrame(f);
  })();
})();
