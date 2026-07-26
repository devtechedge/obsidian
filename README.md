# The Obsidian Archive

Single-file immersive portfolio for a fictional generative digital sculpture studio. Twenty complex frontend features, Three.js crystal, Web Audio drone, command palette, and pinned horizontal gallery — all with zero build step.

![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-black?logo=github)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.160-black?logo=threedotjs)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-Play%20CDN-06b6d4?logo=tailwindcss)
![Lenis](https://img.shields.io/badge/Lenis-Smooth%20Scroll-black)
![License](https://img.shields.io/badge/License-MIT-green)

## Live Demo

**https://devtechedge.github.io/obsidian/**

Client-side only · zero build · open the single HTML file anywhere. Fully self-contained (React UMD + Tailwind Play CDN + Three.js + Lenis + Web Audio).

## Screenshots

> Screenshots coming shortly — will live in `docs/screenshots/`.

<!-- Placeholder structure:
![Hero with 3D crystal](docs/screenshots/01-hero.png)
![Archive grid](docs/screenshots/02-archive.png)
![Horizontal gallery / Featured](docs/screenshots/03-gallery.png)
![Command palette](docs/screenshots/04-cmdk.png)
-->

## Features

- **One file, zero build** — entire experience ships as a single `index.html` (~140 KB)
- **Three.js hero crystal** with custom GLSL shader + mouse-drag rotation
- **Six generative SVG sculptures** (Vortex, Grid, Waves, Facets, Rings, Hex)
- **Pinned horizontal-scroll gallery** driven by vertical scroll
- **Web Audio ambient drone** (opt-in, four-oscillator with LFO filter)
- **⌘K command palette** with fuzzy search across sections, actions, and sculptures
- **Editorial light + gallery dark themes** with localStorage persistence and no FOUC
- **Accessible lightbox**, magnetic buttons, particle bursts, cursor trail, scroll progress, Konami easter egg, and more

## Tech Stack

| Layer | Choice |
|-------|--------|
| UI | React 18 (UMD) |
| Styling | Tailwind CSS (Play CDN) |
| 3D | Three.js 0.160 |
| Scroll | Lenis |
| Audio | Web Audio API |
| Fonts | Inter (variable) |
| Hosting | GitHub Pages |

No bundler. No package manager. The file is the project.

## Quick Start

```bash
# Clone and open locally
git clone https://github.com/devtechedge/obsidian.git
cd obsidian
# Just open index.html in a browser

# Or visit the live demo
# https://devtechedge.github.io/obsidian/
```

## License

MIT License. See [LICENSE](LICENSE) for details.
