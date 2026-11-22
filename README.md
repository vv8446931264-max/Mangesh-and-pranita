# Mangesh & Pranita · Wedding invitation (v4)

Live: https://vv8446931264-max.github.io/Mangesh-and-pranita/

- `index.html`, `css/`, `js/`: the source, split into modules (see `MOTION.md` for the motion brief and who owns what).
- `python3 build.py` → `dist/`: one self-contained `index.html` plus `img/`, `audio/`, `preview.jpg`. This is what gets deployed.
- `node tools/smoke.js http://localhost:8000/`: quick check for console errors and sideways scrolling.
- Edit names, dates, venue, contacts and music in `js/config.js` (the `C` object).
- `?to=Name` on the link personalises the cover; `?skip` jumps past the cover (for testing).
