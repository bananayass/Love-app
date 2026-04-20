# Happy Birthday GF — Interactive Birthday Website

A romantic, multi-page birthday website for a girlfriend. Flows through 5 pages of puzzles, surprises, and love.

## Page Flow

```
locket.html → index.html → birthday.html → last.html
              (profile.html — accessible from birthday.html)
```

---

## Pages

### 1. `src/html/locket.html` — Crystal Locket (Entry Puzzle)
The entry point. User must find the correct date on a calendar.
- **CSS animations:** `#orb` floating keyframe, nebula cloud pulses, aura ring rotations, sparkle orbit, crystal heart pulsing glow, calendar cell hover
- **Canvas effects:** Heart particle burst on correct answer, background floating petals + bokeh blobs
- **Interaction:** Click crystal orb → calendar builds (Aug 2026). Wrong day → blur overlay + angry message (`😤 Bé có nhớ đâu :(`). Correct day (30/08) → heart burst + success state → redirect to `index.html`
- **Key CSS:** `@keyframes float`, `swing`, `pulse-glow`, `orbit-spin` | CSS radial gradients for nebula | `backdrop-filter: blur()` for wrong-answer overlay
- **Fonts:** Dancing Script (title), Quicksand (body)

### 2. `src/html/index.html` — Valentine Question
Asks "Em có yêu anh hemmmmmmmm?" with growing Yes button and dodging No button.
- **CSS animations:** Bounce keyframe for Yes button growing on each No click | Shake animation for final No dodge
- **Effects:** canvas-confetti heart burst on Yes click (via CDN)
- **Interaction:** No button cycles through 6 messages, grows Yes button + increases font size. At max clicks, No button dodges mouse. Yes triggers confetti + popup linking to `birthday.html`
- **Images:** 7 GIFs swapped on each No click
- **Key CSS:** `@keyframes bounce`, `shake` | Tailwind CSS via CDN

### 3. `src/html/birthday.html` — Birthday Cake Card
3-layer SVG cake with animated candle flames. User blows out candles to reveal the wish.
- **CSS animations:** `flicker` keyframe on flames (flicker + rotate micro-movements) | `blowOut` keyframe (scaleY up, scaleX squeeze, fade) | `cardReveal` keyframe (scale + translateY) | `lineReveal` keyframe (staggered opacity + translateY per wish line) | `hintPulse` keyframe (opacity 0.5→1 pulse)
- **Canvas effects:** Heart particle burst on blow (canvas, `requestAnimationFrame` loop, bezier heart drawing)
- **CSS confetti:** Lightweight CSS-only falling confetti rectangles, no canvas overhead
- **Interaction:** Click cake OR "💨 Thổi nến 💨" button (appears after 4s) → flames blow out with staggered smoke puffs → wish card scales in with staggered text line reveals → party button fires burst, link to `profile.html`
- **SVG elements:** 3-layer cake with frosting drip paths, cherry (radial gradient + stem path), sprinkles (rects with rotate transforms), heart decorations (bezier path), star decorations (polygon points), cake board (ellipse)
- **Key CSS:** `@keyframes gradientFlow` (background), `confFall` (CSS confetti), `smokeRise` | CSS `radial-gradient` for flames, `linear-gradient` for frosting

### 4. `src/html/last.html` — Love Letter
A letter card that opens with a heart seal. Click to reveal the love letter with staggered text animation.
- **CSS animations:** Card float keyframe | Heart pulse keyframe | Letter expand `max-height: 0→950px` transition | Text line reveal keyframe | Close shrink/fade animation
- **Canvas effects:** Fireworks dots + bezier hearts + flower petals (`requestAnimationFrame` loop, color-coordinated particles)
- **Interaction:** Card always visible. Click card → card fades out, `.letter-expand` wrapper expands, letter lines stagger in, signature slides in. Close button → reverse animation. On open, all animations restart via `void el.offsetWidth` reflow trick.
- **Key CSS:** `@keyframes float-card`, `pulse-heart`, `sway-shake`, `bloom` | CSS `transition: max-height 0.8s cubic-bezier()` for open/close | `pointer-events: none/auto` to prevent ghost clicks on closed letter | `max-height: 0` with `overflow: hidden` for smooth collapse

### 5. `src/html/profile.html` — Profile Page
Accessible from birthday.html. A romantic profile/profile page.
- **CSS:** `profile.css` — custom styling
- **JS:** `profile.js` — interactive profile logic

---

## Other Pages

### `src/html/anniversary.html` — Anniversary Page
Anniversary celebration page.
- **CSS:** `anniversary.css`
- **JS:** `anniversary.js`

### `src/html/cause.html` — Cause Page
- **CSS:** `cause.css`
- **JS:** `cause.js`

---

## CSS Files

| File | Purpose |
|------|---------|
| `src/css/style.css` | Base styles (referenced by birthday.html) |
| `src/css/last.css` | Love letter page styles |
| `src/css/profile.css` | Profile page styles |
| `src/css/anniversary.css` | Anniversary page styles |
| `src/css/cause.css` | Cause page styles |

---

## Animation Techniques Used

### CSS Keyframes
- `float` — gentle Y translate for floating elements
- `pulse`, `pulse-glow` — scale + opacity for glowing effects
- `flicker` — rapid micro scale/rotate for candle flames
- `blowOut` — scaleY expand + scaleX squeeze + opacity fade for candle extinguish
- `swing`, `sway-shake` — rotation oscillation for shaking/locket effects
- `confFall` — falling confetti with rotation and fade
- `hintPulse` — opacity 0.5↔1 pulsing for hint/button hints
- `lineReveal` — translateY + opacity for staggered text reveals
- `cardReveal` — scale + translateY for card entrance
- `bloom` — scale burst for particle/section reveals
- `gradientFlow` — background-position animation for gradient shift

### CSS Transitions
- `max-height` expand/collapse for letter open (0 → 950px)
- `opacity`, `transform` for fade/scale effects
- `backdrop-filter: blur()` for overlay effects

### Canvas API (`requestAnimationFrame`)
- Heart particle system: bezier heart drawing, gravity, rotation, alpha decay
- Firework dots: radial burst, gravity, shrink
- Flower petals: varied colors, bezier petal shape

### CSS-in-JS
- Dynamically created elements (confetti, balloons, smoke puffs) get inline styles via `element.style.cssText`

---

## Fonts

- **Dancing Script** (Google Fonts CDN) — cursive titles, signatures
- **Quicksand** (Google Fonts CDN) — body text, UI elements

---

## Third-Party CDN

- `canvas-confetti@1.9.3` — heart-shaped confetti on index.html (Yes button)
- Google Fonts — Dancing Script, Quicksand
- Tailwind CSS (index.html only)

---

## Getting Started

Open any `.html` file directly in a browser — no build step needed.

```
HappyBirthdayGF-main/
└── src/
    ├── html/          ← all page HTML files
    ├── css/           ← all stylesheets
    ├── js/            ← all scripts
    └── images/        ← GIFs and images
```