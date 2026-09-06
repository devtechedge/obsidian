# Security Assessment — The Obsidian Archive

**Date:** 2026-09-06  
**Scope:** Auth, XSS, injection, supply chain (CDN), secrets, CSP, localStorage  
**Context:** Public site is a **single-file, client-side-only** GitHub Pages demo. There is **no backend**, no database, and no user accounts.

---

## Executive summary

| Area | Risk | Notes |
|------|------|--------|
| Authentication | **N/A (by design)** | No login. Fictional studio portfolio. |
| Authorization | **N/A** | No mutating APIs. |
| XSS | **Low** | `innerHTML` / `dangerouslySetInnerHTML` only for **generated SVG** from allow-listed pattern types and hardcoded command-palette icons. Search query is **not** interpolated into HTML (`textContent` / filter only). |
| Injection (SQL / command) | **N/A** | No server, no SQL, no shell. Contact is `mailto:` only. |
| Secrets in repo | **None** | No `.env`, no API keys, no tokens. |
| CORS / network | **N/A** | No `fetch` / XHR. |
| Supply chain | **Medium → reduced** | Runtime comes from CDNs (unpkg + Tailwind Play + Google Fonts). React / Lenis / Three.js are **version-pinned with SRI**. Tailwind Play CDN cannot take SRI (dynamic compiler) — accepted. |
| CSP | **Present (meta)** | GitHub Pages cannot set response headers. Meta CSP allows the known CDNs plus `'unsafe-inline'` / `'unsafe-eval'` required by Tailwind Play. |

**Overall (public Pages demo):** Low residual risk. Browser-only art site, no auth boundary, no secrets, no form posts.

---

## 1. Authentication & session

None. Do not claim OAuth, NextAuth, or a “secured studio portal”.

Theme preference is stored in `localStorage` key `obsidian-theme` (`light` \| `dark`) only. No PII.

---

## 2. XSS

**Findings**
- Generative sculptures inject SVG via `dangerouslySetInnerHTML` / `innerHTML`. Strings are produced by `buildPatternSVG(type, w, h, color)` from a **closed allow-list**: `vortex`, `grid`, `waves`, `facets`, `rings`, `hex`. Dimensions are numbers. Colors in data are hardcoded hex (`#dc2626`).
- Command palette labels/meta come from a static `cmdkCommands` table. User query is used only in `fuzzyMatch` (comparison), not written into `innerHTML`.
- Konami overlay SVG is a static template with a numeric opacity.
- No `eval`, no `document.write`, no `fetch`.

**Hardening applied**
- HTML contract tests fail CI if `eval(`, `document.write`, or `fetch(` appear.
- Pattern-type allow-list is asserted in unit tests.

---

## 3. Contact / data exfiltration

Contact CTA is `mailto:studio@obsidianarchive.art`. No form `POST`, no analytics pixels, no third-party trackers beyond fonts + CDNs.

Web Audio is **opt-in** (oscillators + filter in-page). No microphone permission is requested.

---

## 4. Supply chain (CDNs)

| Asset | Pin | SRI |
|-------|-----|-----|
| `react` / `react-dom` | `18.3.1` (was floating `@18`) | sha384 |
| `lenis` | `1.1.18` | sha384 |
| `three` | `0.160.0` | sha384 |
| Tailwind Play `cdn.tailwindcss.com` | floating compiler | **not possible** |
| Google Fonts Inter | CSS API | n/a |

**Accepted:** Tailwind Play CDN uses `'unsafe-eval'` / extra network to compile utilities in the browser. Replacing it with a built CSS file would add a build step and break the product’s zero-build identity.

**Operational rule:** Do not switch React/Lenis/Three to floating tags (`@18`, `@latest`).

---

## 5. Content-Security-Policy

Meta CSP (Pages cannot emit `Content-Security-Policy` headers):

- `default-src 'self'`
- Scripts: self + inline + eval (Tailwind Play) + `cdn.tailwindcss.com` + `unpkg.com`
- Styles: self + inline + Google Fonts + Tailwind
- Fonts: `fonts.gstatic.com`
- Images: self + `data:`
- `connect-src` limited to self + Tailwind
- `form-action 'none'`, `object-src 'none'`, `frame-ancestors 'none'`

---

## 6. Residual risk & acceptance

**Accepted for this portfolio demo**
- No user authentication.
- Tailwind Play CDN without SRI.
- `'unsafe-inline'` / `'unsafe-eval'` required by the zero-build stack.
- Generated SVG via `innerHTML` from allow-listed types.

**Not accepted**
- Adding a real backend without auth, CSP headers, and a new threat model.
- Floating CDN versions for React / Three / Lenis.
- Collecting visitor data.

---

## 7. How to re-test

```bash
npm ci
npm test          # HTML contract / allow-list
npx playwright install --with-deps chromium
npm run test:e2e  # Chromium smokes against python http.server
```

`package.json` is **CI-only**. The live site is still a single `index.html` with no bundler.

## Repository visibility

This repository is currently **public** for portfolio review. When the open-source
build story is no longer needed, **the GitHub repo will go private**. Making the
repo private reduces source disclosure; it does **not** replace strong production
secrets, auth allow-lists, webhook signatures, or Vercel/Actions environment
hygiene. Rotate any credential that was pasted into chat, tickets, or screenshots.
