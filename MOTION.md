# Mangesh & Pranita · v4 motion brief

A Marathi wedding invitation that guests open from a WhatsApp link, mostly on mid-range
Android phones over mobile data. v4 keeps every word, photo, scene and track of v3. The
change is in how it **moves**: it should feel like one continuous, hand-crafted film
rather than a page whose blocks fade in.

## The feeling

Warm, festive, unhurried, *premium*. Think of a temple lamp rather than a disco light.
Every motion has a physical reason: doors swing on hinges, petals drift on air, lamps
flicker, cloth sways, gold catches the light. Nothing pops in from nowhere and nothing
moves "because it can".

## Principles

1. **Choreograph, don't stack.** Elements in a group arrive in an order that tells the
   eye where to look (largest/most important first, details after), overlapping by
   about 60% rather than strictly in sequence. Use `--stagger` (60 ms) between siblings.
2. **Continuity.** When one thing ends, the next begins from where the eye already is
   (e.g. the door's light becomes the hero's glow). Avoid hard cuts and blank frames.
3. **Ease like the real world.** Arrivals use `--ease-out` (expo-out), moves between two
   rests use `--ease-in-out`, departures use `--ease-in`, small playful settles use
   `--ease-spring`. Never `linear` except for continuous loops (rotation, scrolling
   texture) and never the browser default `ease`.
4. **Secondary motion.** The main action is followed by a smaller, later echo
   (a garland swings after the hand stops; a heading's underline draws after the words land).
5. **Restraint.** Loops are slow and subtle (mandala 120 s+, sway 3 s+, glow 2 s+).
   At any moment there should be one focal animation per viewport.
6. **Respond to the guest.** Touch/drag should feel physical (follow the finger, then
   settle with a spring); pointer and scroll can add a little depth (parallax ≤ 12 px).

## Tokens

CSS (`css/style.css` `:root`): `--ease-out`, `--ease-in-out`, `--ease-in`, `--ease-back`,
`--ease-spring`, durations `--d-xs .18s`, `--d-s .42s`, `--d-m .8s`, `--d-l 1.2s`,
`--d-xl 2s`, `--stagger .06s`.

JS (`js/motion.js`, global `M`):

| | |
|---|---|
| `M.reduced`, `M.lite`, `M.touch` | prefers-reduced-motion; low-end device; touch device |
| `M.E.out/inOut/in/back/spring` | the same curves as the CSS tokens, `t` 0..1 |
| `M.tween(ms, fn(e,k), ease, delay)` | rAF tween, returns a Promise; jumps to the end when reduced |
| `M.onView(el or NodeList, cb, {once, threshold, rootMargin})` | IntersectionObserver helper |
| `M.splitText(el, 'word' or 'char')` | wraps words/letters as `.sw > .sc` with `--i`; Devanagari is always split by word |
| `M.onFrame(fn(S,P))` | ONE shared rAF loop: `S.y`, `S.vy` (smoothed velocity), `S.p` (page progress), `P.x/P.y` (pointer or tilt, -1..1, smoothed). Returns an unsubscribe. |
| `M.opened(cb)` / `invite:open` event | runs once the cover has opened (immediately with `?skip`) |

Do not add separate `scroll` listeners or rAF loops for scroll/pointer effects: use `M.onFrame`.

## Performance rules (non-negotiable)

- Animate only `transform`, `opacity`, `clip-path` and SVG attributes on small elements.
  Never animate `width/height/top/left/box-shadow/filter` on large elements.
  (Animated `filter: blur()` is fine on a few short words; use `M.lite` to skip it.)
- No `backdrop-filter` on anything that scrolls over animated content on phones.
- Pause anything off-screen (`M.onView(..., {once:false})` or the scenes' `runner`).
- Particle counts: halve them when `M.lite`. Canvas DPR is capped at 2.
- `will-change` only while something is actually animating.
- Must hold 60 fps on a mid-range phone; test with 4× CPU throttling in Playwright
  (`await page.context().newCDPSession(page)` then `Emulation.setCPUThrottlingRate {rate:4}`).
- Everything must work, and look finished, with `prefers-reduced-motion: reduce`:
  content visible, no motion beyond simple fades.
- Never hide content in a way that depends on JS succeeding: entrance styles start from
  visible and animate *from* hidden (`animation-fill-mode: backwards`), or are gated by a
  class JS adds. `html.failsafe` must still show everything.
- Keep the existing guarantees: names readable on every phone (see the hardening block in
  style.css), iOS audio unlock in the tap, `?to=Name` personalisation, no horizontal scroll
  at 320 px.

## Content is fixed

Do not change names, dates, family text, Marathi copy, phone numbers, venue, music or credits.
Visual layout tweaks for polish are welcome; rewriting copy is not.

## Files and ownership

Source is modular; `python3 build.py` inlines everything into `dist/index.html` for deploy.
Load order: config → motion → figures → scenes → audio → timeline → reveal → hero → welcome → ambient → cover → main.
Top-level `const`s are shared between these classic scripts, so names must stay unique.

| Area | Files (owner edits only these) | `index.html` region |
|---|---|---|
| Cinematic: cover opening + hero entrance | `js/cover.js`, `js/hero.js`, `css/cinematic.css`; cover/hero rules in `style.css` | `.cover`, `header.hero` |
| Scenes: the 4 event animations + horse Namaskar | `js/scenes.js`, `js/figures.js`, `js/welcome.js`, `css/scenes.css` | `#heroArt` only |
| Timeline card | `js/timeline.js`, `css/timeline.css`; stepper/tcard/event rules in `style.css` | `#timeline` and its heading |
| Scroll & ambient | `js/reveal.js`, `js/ambient.js`, `css/scroll.css` | none (inject via JS) |
| Sections | `js/main.js`, `css/sections.css`; calendar/map/showcase/countdown/contact/footer/sound-button rules in `style.css` | save-the-date, venue, couple showcase, countdown, rsvp, footer, `.snd`/`.np` |

Prefer putting new and overriding CSS in your own css file (it loads after `style.css`).
`js/audio.js`, `js/config.js` and `js/motion.js` are shared: change them only if essential
and say so in your report.

## Testing

Serve the folder (`python3 -m http.server <port>`) and drive it with Playwright (pre-installed:
`require('playwright')`, `devices['iPhone 13']`, `deviceScaleFactor: 1` for your own checks).
`?skip` skips the cover. Check iPhone 13 (390×664), a 360×740 Android, and 1366×800 desktop,
plus `reducedMotion: 'reduce'`. Zero console errors.
