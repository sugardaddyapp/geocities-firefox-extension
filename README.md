# 🌐 GeoCities Time Machine

> Transform any modern website into a glorious 1990s GeoCities masterpiece — complete with neon text, scrolling marquees, visitor counters, and cursor sparkles.

A Firefox extension by [Best Sugar Daddy Apps](https://bestsugardaddyapps.com)

---

## What Is This?

GeoCities Time Machine is a Firefox extension that overlays a retro 1990s aesthetic on any website you visit. With one click, sites like Wikipedia, Reddit, or your bank's homepage are instantly transported back to the golden age of the World Wide Web — Comic Sans, blinking headings, neon glow effects, and all.

Five era-accurate themes are included, each inspired by the iconic "neighbourhoods" of the original GeoCities hosting platform (1994–2009).

---

## Features

| Feature | Description |
|---|---|
| **5 retro themes** | Neon, Space, Candy, Forest, Windows 95 |
| **Scrolling marquee** | A top-of-page ticker with authentic 90s announcements |
| **Visitor counter** | LCD-style digit display fixed to the bottom-right corner |
| **Cursor sparkles** | Stars and diamonds trail your mouse cursor across the page |
| **Blink effect** | Random headings pulse and blink like the legendary `<blink>` tag |
| **Per-tab state** | Toggle on/off per session; theme choice is remembered across tabs |

---

## Themes

### ⚡ Neon
Black background with lime-green text, yellow headings, and magenta links. Headings glow and pulse. Inspired by "hacker" and Matrix-era aesthetics. Monospace font throughout.

### 🚀 Space
Deep navy background with a radial gradient suggesting deep space. Light blue body text, gold headings, cyan links. Hints at the countless "My Space Page" and astronomy fan sites of the era.

### 🍬 Candy
Hot-pink diagonal stripe background. White text, yellow headings, cyan links. Comic Sans everywhere. Loud, chaotic, and unapologetically cheerful.

### 🌲 Forest
Dark green scanline background. Light green text, gold headings, bright green links. Georgia serif font. Inspired by nature fan sites and RPG dungeon crawl pages.

### 🖥️ Windows 95
Classic teal desktop background. Black text on grey surfaces, navy blue headings and links. Beveled inset/outset borders on inputs and buttons. Arial font. Unmistakably Windows.

---

## Installation

### Option A — Firefox Add-ons (Permanent)

1. Go to the [extension listing on addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/geocities-time-machine/)
2. Click **Add to Firefox**
3. Confirm the permissions prompt
4. The 🌐 icon appears in your Firefox toolbar

### Option B — Load from ZIP/XPI (Permanent, manual)

1. Download `geocities-time-machine.xpi` from the [Releases page](https://github.com/sugardaddyapp/geocities-firefox-extension/releases)
2. Open Firefox and go to `about:addons`
3. Click the gear icon ⚙️ → **Install Add-on From File...**
4. Select the `.xpi` file
5. Confirm the permissions prompt

### Option C — Developer Mode (Temporary, for testing)

This method loads the extension until Firefox is closed. Useful for trying it without installing.

1. Clone or download this repository
2. Open Firefox and go to `about:debugging`
3. Click **This Firefox** in the left sidebar
4. Click **Load Temporary Add-on...**
5. Navigate into the `geocities-extension/` folder and select `manifest.json`
6. The extension loads immediately — the 🌐 icon appears in the toolbar

---

## How to Use

### Turning it on

1. Click the **🌐 icon** in your Firefox toolbar while on any webpage
2. The popup panel opens — click the **OFF** button to switch it to **ON**
3. The current page instantly transforms into a GeoCities-era site

### Choosing a theme

Click any of the five theme buttons in the popup:

- **⚡ Neon** — green on black, magenta accents
- **🚀 Space** — navy starfield, cyan and gold
- **🍬 Candy** — hot pink stripes, Comic Sans
- **🌲 Forest** — dark green, serif font
- **🖥️ Windows 95** — teal desktop, grey chrome

Clicking a theme while the extension is OFF will also turn it ON automatically.

### Toggling extras

Below the theme buttons, four checkboxes let you turn individual effects on or off:

| Checkbox | What it does |
|---|---|
| **Scrolling marquee** | Shows/hides the scrolling text bar at the top of the page |
| **Visitor counter** | Shows/hides the LCD digit counter in the bottom-right corner |
| **Cursor sparkles** | Enables/disables the star trail that follows your mouse |
| **Blink tags** | Enables/disables the pulsing blink effect on random headings |

### Turning it off

Click the **ON** button in the popup to switch it back to **OFF**. The page returns to its original styling immediately — no reload needed.

---

## Permissions Explained

The extension requests three permissions:

| Permission | Why it's needed |
|---|---|
| `activeTab` | To inject the retro CSS and overlay elements into the current page |
| `storage` | To remember your chosen theme and which extras are enabled |
| `tabs` | To send the current state to the active tab when you change settings in the popup |

No data is collected, transmitted, or stored outside your own browser.

---

## Building from Source

```bash
git clone https://github.com/sugardaddyapp/geocities-firefox-extension
cd geocities-firefox-extension/geocities-extension

# Package as .xpi
zip -r ../geocities-time-machine.xpi .
```

Then load the `.xpi` via `about:addons → Install Add-on From File...`

---

## Contributing

Pull requests welcome. If you have a theme idea (Anime, Under Construction, Hamster Dance...) open an issue first to discuss it.

---

## License

MIT — do whatever you want with it. Just don't remove the visitor counter. The visitor counter stays.

---

## Other Projects

Also checkout my other projects:
[Geocities Boilerplate](https://github.com/sugardaddyapp/geocities-boilerplate/)
[NPM create-geocities-app](https://www.npmjs.com/package/create-geocities-app)
[Best Sugar Daddy Apps 2026](https://bestsugardaddyapps.com/)
[Best Sugar Daddy App](https://hanker.app)

---
*Best viewed in Netscape Navigator 4.0 at 800×600 resolution.*
