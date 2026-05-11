/* GeoCities Time Machine — content script */

const THEMES = {
  neon: {
    bg: '#000000',
    bgImage: 'none',
    text: '#00ff00',
    heading: '#ffff00',
    link: '#ff00ff',
    linkHover: '#ff66ff',
    visited: '#cc00cc',
    border: '#ff00ff',
    tableBg: '#001100',
    tableHeader: '#003300',
    inputBg: '#001a00',
    inputText: '#00ff00',
    hr: 'linear-gradient(to right,#ff00ff,#00ff00,#ff00ff)',
    glowColor: '#00ff00',
    marqueeBg: '#000000',
    marqueeText: '#ffff00',
    counterBg: '#000000',
    counterText: '#00ff00',
    fontFamily: '"Courier New", monospace',
    headingFont: '"Impact", sans-serif',
    textShadow: '0 0 8px #00ff00',
    headingShadow: '0 0 12px #ffff00, 0 0 24px #ff8800',
  },
  space: {
    bg: '#000033',
    bgImage: `radial-gradient(ellipse at top, #000066 0%, #000022 60%, #000000 100%)`,
    text: '#ccccff',
    heading: '#ffdd00',
    link: '#00ffff',
    linkHover: '#88ffff',
    visited: '#9999ff',
    border: '#6666cc',
    tableBg: '#000055',
    tableHeader: '#000088',
    inputBg: '#000044',
    inputText: '#ccccff',
    hr: 'linear-gradient(to right,#000033,#00ffff,#000033)',
    glowColor: '#00ffff',
    marqueeBg: '#000022',
    marqueeText: '#ffdd00',
    counterBg: '#000033',
    counterText: '#00ffff',
    fontFamily: '"Verdana", sans-serif',
    headingFont: '"Impact", sans-serif',
    textShadow: '0 0 6px #6666ff',
    headingShadow: '0 0 10px #ffdd00, 0 0 20px #ff8800',
  },
  candy: {
    bg: '#ff69b4',
    bgImage: `repeating-linear-gradient(
      45deg,
      #ff69b4 0px, #ff69b4 10px,
      #ff99cc 10px, #ff99cc 20px
    )`,
    text: '#ffffff',
    heading: '#ffff00',
    link: '#00ffff',
    linkHover: '#ffffff',
    visited: '#ffaaff',
    border: '#ff00ff',
    tableBg: '#ff44aa',
    tableHeader: '#cc0077',
    inputBg: '#ffaadd',
    inputText: '#000000',
    hr: 'linear-gradient(to right,#ff69b4,#ffff00,#ff69b4)',
    glowColor: '#ff00ff',
    marqueeBg: '#cc0077',
    marqueeText: '#ffff00',
    counterBg: '#cc0077',
    counterText: '#ffffff',
    fontFamily: '"Comic Sans MS", cursive',
    headingFont: '"Comic Sans MS", cursive',
    textShadow: '1px 1px 2px #cc0077',
    headingShadow: '2px 2px 4px #ff00ff, 0 0 12px #ffff00',
  },
  forest: {
    bg: '#003300',
    bgImage: `repeating-linear-gradient(
      0deg,
      #003300 0px, #003300 4px,
      #004400 4px, #004400 8px
    )`,
    text: '#ccffcc',
    heading: '#ffdd00',
    link: '#99ff99',
    linkHover: '#ffffff',
    visited: '#66cc66',
    border: '#006600',
    tableBg: '#002200',
    tableHeader: '#004400',
    inputBg: '#001a00',
    inputText: '#ccffcc',
    hr: 'linear-gradient(to right,#003300,#99ff99,#003300)',
    glowColor: '#00ff00',
    marqueeBg: '#002200',
    marqueeText: '#ffdd00',
    counterBg: '#002200',
    counterText: '#99ff99',
    fontFamily: '"Georgia", serif',
    headingFont: '"Impact", sans-serif',
    textShadow: '0 0 4px #006600',
    headingShadow: '0 0 8px #ffdd00',
  },
  win95: {
    bg: '#008080',
    bgImage: 'none',
    text: '#000000',
    heading: '#000080',
    link: '#000080',
    linkHover: '#0000ff',
    visited: '#551a8b',
    border: '#808080',
    tableBg: '#c0c0c0',
    tableHeader: '#000080',
    inputBg: '#ffffff',
    inputText: '#000000',
    hr: 'linear-gradient(to right,#808080,#ffffff,#808080)',
    glowColor: '#000080',
    marqueeBg: '#000080',
    marqueeText: '#ffffff',
    counterBg: '#000000',
    counterText: '#00ff00',
    fontFamily: '"Arial", sans-serif',
    headingFont: '"Arial", sans-serif',
    textShadow: 'none',
    headingShadow: 'none',
  }
};

const MARQUEE_MESSAGES = [
  '★ WELCOME TO MY HOMEPAGE ★ SIGN MY GUESTBOOK ★ YOU ARE VISITOR NUMBER 1,337 ★',
  '☆ THIS SITE IS UNDER CONSTRUCTION ☆ BEST VIEWED IN 800x600 ☆ NETSCAPE 4.0+ ☆',
  '★ HOT LINKS ★ CLICK HERE ★ FREE STUFF ★ WIN A PRIZE ★ CLICK HERE NOW ★',
  '☆ WEB RING MEMBER ☆ ANIMATED GIF OF THE WEEK ☆ DOWNLOAD WINAMP SKINS ☆',
];

let currentState = null;
let styleEl = null;
let overlayEl = null;
let sparkleListenerAttached = false;

// ── helpers ──────────────────────────────────────────────────────────────────

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateCounterDigits() {
  const n = randomInt(1000, 9999999);
  const frag = document.createDocumentFragment();
  for (const d of n.toString().padStart(7, '0')) {
    const span = document.createElement('span');
    span.textContent = d;
    span.style.cssText = 'display:inline-block;background:#111;color:#00ff00;font-family:monospace;' +
      'font-size:20px;font-weight:bold;padding:2px 5px;margin:1px;' +
      'border:1px solid #333;box-shadow:inset 0 0 4px #000;';
    frag.appendChild(span);
  }
  return frag;
}

// ── CSS injection ─────────────────────────────────────────────────────────────

function buildCSS(theme) {
  const t = THEMES[theme];
  return `
:root {
  --gc-bg: ${t.bg};
  --gc-text: ${t.text};
  --gc-heading: ${t.heading};
  --gc-link: ${t.link};
  --gc-border: ${t.border};
}

html.geocities-active,
html.geocities-active body {
  background-color: ${t.bg} !important;
  background-image: ${t.bgImage} !important;
  color: ${t.text} !important;
  font-family: ${t.fontFamily} !important;
  text-shadow: ${t.textShadow} !important;
  scrollbar-color: ${t.border} ${t.bg};
}

html.geocities-active body * {
  color: ${t.text} !important;
  background-color: transparent !important;
  background-image: none !important;
  border-color: ${t.border} !important;
  font-family: ${t.fontFamily} !important;
  text-shadow: ${t.textShadow} !important;
  box-shadow: none !important;
  text-decoration-color: ${t.link} !important;
}

html.geocities-active h1,
html.geocities-active h2,
html.geocities-active h3,
html.geocities-active h4,
html.geocities-active h5,
html.geocities-active h6 {
  color: ${t.heading} !important;
  font-family: ${t.headingFont} !important;
  text-shadow: ${t.headingShadow} !important;
  text-transform: uppercase !important;
  letter-spacing: 2px !important;
}

html.geocities-active a,
html.geocities-active a * {
  color: ${t.link} !important;
  text-decoration: underline !important;
}

html.geocities-active a:hover,
html.geocities-active a:hover * {
  color: ${t.linkHover} !important;
}

html.geocities-active a:visited,
html.geocities-active a:visited * {
  color: ${t.visited} !important;
}

html.geocities-active table,
html.geocities-active td,
html.geocities-active th,
html.geocities-active tr {
  background-color: ${t.tableBg} !important;
  border: 1px solid ${t.border} !important;
  color: ${t.text} !important;
}

html.geocities-active th {
  background-color: ${t.tableHeader} !important;
  color: ${t.heading} !important;
  font-family: ${t.headingFont} !important;
}

html.geocities-active input,
html.geocities-active textarea,
html.geocities-active select {
  background-color: ${t.inputBg} !important;
  color: ${t.inputText} !important;
  border: 2px inset ${t.border} !important;
  font-family: ${t.fontFamily} !important;
}

html.geocities-active button,
html.geocities-active [role="button"],
html.geocities-active [type="button"],
html.geocities-active [type="submit"] {
  background-color: ${t.tableBg} !important;
  color: ${t.text} !important;
  border: 2px outset ${t.border} !important;
  font-family: ${t.fontFamily} !important;
}

html.geocities-active img {
  filter: saturate(1.4) contrast(1.1) !important;
  border: 2px solid ${t.border} !important;
}

html.geocities-active hr {
  border: none !important;
  height: 4px !important;
  background: ${t.hr} !important;
  margin: 12px 0 !important;
}

html.geocities-active svg * {
  fill: ${t.text} !important;
  stroke: ${t.border} !important;
}

/* blinking elements */
html.geocities-active .gc-blink {
  animation: gc-blink-anim 1s step-end infinite !important;
}
@keyframes gc-blink-anim { 50% { opacity: 0; } }

/* neon pulse for headings in neon/space */
html.geocities-active .gc-neon-pulse {
  animation: gc-neon-pulse-anim 2s ease-in-out infinite !important;
}
@keyframes gc-neon-pulse-anim {
  0%, 100% { text-shadow: ${t.headingShadow}; }
  50% { text-shadow: none; }
}

/* marquee bar */
#gc-marquee-bar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 2147483647 !important;
  background: ${t.marqueeBg} !important;
  color: ${t.marqueeText} !important;
  font-family: ${t.headingFont} !important;
  font-size: 14px !important;
  font-weight: bold !important;
  padding: 4px 0 !important;
  border-bottom: 2px solid ${t.border} !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  text-shadow: none !important;
}
#gc-marquee-bar * {
  color: ${t.marqueeText} !important;
  text-shadow: none !important;
}
#gc-marquee-inner {
  display: inline-block;
  animation: gc-marquee-scroll 25s linear infinite;
  padding-left: 100%;
}
@keyframes gc-marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

/* visitor counter */
#gc-counter {
  position: fixed !important;
  bottom: 12px !important;
  right: 12px !important;
  z-index: 2147483646 !important;
  background: ${t.counterBg} !important;
  color: ${t.counterText} !important;
  border: 3px ridge ${t.border} !important;
  padding: 8px 12px !important;
  font-family: monospace !important;
  font-size: 11px !important;
  text-align: center !important;
  text-shadow: none !important;
  box-shadow: 4px 4px 0 #000000 !important;
}
#gc-counter * { text-shadow: none !important; background: transparent !important; }
#gc-counter-label {
  display: block;
  color: ${t.counterText} !important;
  font-weight: bold;
  margin-bottom: 4px;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* sparkle canvas */
#gc-sparkle-canvas {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  pointer-events: none !important;
  z-index: 2147483645 !important;
}

/* push page content down for marquee */
html.geocities-active body {
  padding-top: 30px !important;
}
`;
}

// ── sparkle effect ────────────────────────────────────────────────────────────

let sparkles = [];
let sparkleCanvas = null;
let sparkleCtx = null;
let sparkleRAF = null;

const SPARKLE_COLORS = ['#ffff00','#ff00ff','#00ffff','#ff8800','#00ff00','#ffffff'];

function initSparkle() {
  if (sparkleCanvas) return;
  sparkleCanvas = document.createElement('canvas');
  sparkleCanvas.id = 'gc-sparkle-canvas';
  document.body.appendChild(sparkleCanvas);
  sparkleCtx = sparkleCanvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  drawSparkles();
}

function resizeCanvas() {
  if (!sparkleCanvas) return;
  sparkleCanvas.width = window.innerWidth;
  sparkleCanvas.height = window.innerHeight;
}

function addSparkle(x, y) {
  const count = 6;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
    sparkles.push({
      x, y,
      vx: Math.cos(angle) * (1 + Math.random() * 2),
      vy: Math.sin(angle) * (1 + Math.random() * 2) - 1,
      life: 1,
      color: SPARKLE_COLORS[randomInt(0, SPARKLE_COLORS.length - 1)],
      size: randomInt(3, 7),
      shape: randomInt(0, 1),
    });
  }
}

function drawSparkles() {
  if (!sparkleCtx) return;
  sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
  sparkles = sparkles.filter(s => s.life > 0);
  for (const s of sparkles) {
    sparkleCtx.save();
    sparkleCtx.globalAlpha = s.life;
    sparkleCtx.fillStyle = s.color;
    sparkleCtx.strokeStyle = s.color;
    if (s.shape === 0) {
      // star
      sparkleCtx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const r = i % 2 === 0 ? s.size : s.size / 2;
        sparkleCtx[i === 0 ? 'moveTo' : 'lineTo'](s.x + r * Math.cos(a), s.y + r * Math.sin(a));
      }
      sparkleCtx.closePath();
      sparkleCtx.fill();
    } else {
      sparkleCtx.fillRect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
    }
    sparkleCtx.restore();
    s.x += s.vx;
    s.y += s.vy;
    s.vy += 0.08;
    s.life -= 0.04;
  }
  sparkleRAF = requestAnimationFrame(drawSparkles);
}

function destroySparkle() {
  if (sparkleRAF) cancelAnimationFrame(sparkleRAF);
  sparkleRAF = null;
  if (sparkleCanvas) sparkleCanvas.remove();
  sparkleCanvas = null;
  sparkleCtx = null;
  sparkles = [];
}

function onMouseMove(e) {
  addSparkle(e.clientX, e.clientY);
}

// ── DOM overlay elements ──────────────────────────────────────────────────────

function buildOverlay(state) {
  const div = document.createElement('div');
  div.id = 'gc-overlay';

  if (state.marquee) {
    const bar = document.createElement('div');
    bar.id = 'gc-marquee-bar';
    const inner = document.createElement('span');
    inner.id = 'gc-marquee-inner';
    inner.textContent = MARQUEE_MESSAGES[randomInt(0, MARQUEE_MESSAGES.length - 1)];
    bar.appendChild(inner);
    div.appendChild(bar);
  }

  if (state.counter) {
    const counter = document.createElement('div');
    counter.id = 'gc-counter';
    const label = document.createElement('span');
    label.id = 'gc-counter-label';
    label.textContent = 'You Are Visitor';
    const digits = document.createElement('div');
    digits.id = 'gc-counter-digits';
    digits.appendChild(generateCounterDigits());
    counter.appendChild(label);
    counter.appendChild(digits);
    div.appendChild(counter);
  }

  return div;
}

function addBlinkingTags() {
  // wrap random text nodes to simulate <blink>
  const walker = document.createTreeWalker(
    document.body, NodeFilter.SHOW_ELEMENT, null
  );
  let node;
  const candidates = [];
  while ((node = walker.nextNode())) {
    if (['SCRIPT','STYLE','NOSCRIPT','IFRAME','#gc-overlay'].includes(node.id)) continue;
    if (node.id && node.id.startsWith('gc-')) continue;
    if (['H1','H2','H3','STRONG','B','MARK'].includes(node.tagName) &&
        node.textContent.trim().length > 0) {
      candidates.push(node);
    }
  }
  // blink a random subset (max 3)
  const chosen = candidates.sort(() => Math.random() - 0.5).slice(0, 3);
  chosen.forEach(el => el.classList.add('gc-blink', 'gc-neon-pulse'));
}

// ── main enable/disable ───────────────────────────────────────────────────────

function enable(state) {
  // inject CSS
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'gc-style';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = buildCSS(state.theme);

  document.documentElement.classList.add('geocities-active');

  // overlay
  if (overlayEl) overlayEl.remove();
  overlayEl = buildOverlay(state);
  document.body.appendChild(overlayEl);

  // blink
  if (state.blink) addBlinkingTags();

  // sparkle
  if (state.sparkle) {
    initSparkle();
    if (!sparkleListenerAttached) {
      document.addEventListener('mousemove', onMouseMove);
      sparkleListenerAttached = true;
    }
  }
}

function disable() {
  document.documentElement.classList.remove('geocities-active');
  if (styleEl) { styleEl.textContent = ''; }
  if (overlayEl) { overlayEl.remove(); overlayEl = null; }
  destroySparkle();
  if (sparkleListenerAttached) {
    document.removeEventListener('mousemove', onMouseMove);
    sparkleListenerAttached = false;
  }
  document.querySelectorAll('.gc-blink,.gc-neon-pulse').forEach(el => {
    el.classList.remove('gc-blink', 'gc-neon-pulse');
  });
}

// ── message listener ──────────────────────────────────────────────────────────

browser.runtime.onMessage.addListener((msg) => {
  if (msg.type !== 'UPDATE_STATE') return;
  const state = msg.state;
  currentState = state;
  if (state.enabled) {
    enable(state);
  } else {
    disable();
  }
});

// ── init on load ──────────────────────────────────────────────────────────────

browser.storage.local.get({
  enabled: false, theme: 'neon',
  marquee: true, counter: true, sparkle: true, blink: true
}, (state) => {
  currentState = state;
  if (state.enabled) enable(state);
});
