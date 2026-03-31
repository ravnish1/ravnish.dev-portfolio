# Ravnish Kumar — Developer Portfolio

> Hacker aesthetic meets premium motion design.  
> Built with React 19, GSAP, Framer Motion, Lenis, and Vite.

**Live:** [ravnish.dev](https://ravnish.dev)

---

## Tech Stack

| Category | Library |
|---|---|
| Framework | React 19 + Vite 8 |
| Animation | GSAP 3 + Framer Motion 12 |
| Scroll | Lenis (synced to GSAP ticker) |
| Routing | React Router DOM v7 |
| Icons | React Icons v5 |
| Text animation | SplitType |
| Deployment | GitHub Pages via `gh-pages` |

## Project Structure

```
src/
  components/     # Shared UI: Navbar, Cursor, Background, Terminal, Transition
  pages/          # Route-level pages: Home, Projects, Blogs, Contact
  assets/         # Images and SVGs
  styles/         # Component-scoped CSS (background.css)
  App.jsx         # Routes + Lenis setup
  main.jsx        # React entry point
  index.css       # Global design tokens + utility classes
public/
  resume/         # PDF resume (served at /resume/RAVNISH_KUMAR_CV.pdf)
  favicon.svg
```

## Local Development

```bash
npm install
npm run dev       # http://localhost:5173
```

## Deploy to GitHub Pages

```bash
npm run deploy    # builds + pushes to gh-pages branch
```

> Requires CNAME set to `ravnish.dev` and GitHub Pages configured to serve from `gh-pages` branch.

## Features

- **ASCII portrait background** — profile photo rendered in green ASCII chars with mouse-reactive glow
- **Cyber dot grid + particle constellation** — interactive canvas with proximity brightening and connecting lines
- **Ambient orb system** — 3 CSS blur orbs with GPU-composited drift animation
- **Cursor spotlight** — lerp-smoothed radial glow that follows the mouse
- **Custom cursor** — SVG arrow with hover scale/glow state
- **Kinetic typography** — SplitType + GSAP character stagger reveals
- **Magnetic interactive elements** — GSAP quickTo elastic hover on cards and nav items
- **Framer Motion page transitions** — slide-in/out wipe on route change
- **Smooth scroll** — Lenis synced to GSAP ticker (single rAF loop)

---

© 2026 Ravnish Kumar
