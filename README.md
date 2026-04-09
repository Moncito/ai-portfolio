# Portfolio OS

A dark, immersive creative developer portfolio built with Awwwards-level polish. Featuring a 3D singularity particle field, magnetic cursor, cinematic preloader, and buttery-smooth scroll.

## ✦ Features

- **3D Singularity Particle Field** — 20,000 particles orbiting a gravitational core with cursor-reactive physics, built with Three.js + React Three Fiber
- **Magnetic Custom Cursor** — Dot + ring cursor with magnetic pull on interactive elements and elastic snap-back
- **Scramble Decode Preloader** — Loading bar with glitch-style text reveal and curtain-split page entrance
- **Film Grain Overlay** — Subtle animated SVG noise texture for cinematic depth
- **Smooth Scroll** — Lenis-powered buttery scrolling with custom easing
- **GSAP Animations** — Staggered entrance animations, scramble text effects, and timeline orchestration

## ✦ Tech Stack

| Layer      | Tech                                |
| ---------- | ----------------------------------- |
| Framework  | Next.js 16 + React 19               |
| Language   | TypeScript                          |
| 3D         | Three.js + React Three Fiber + Drei |
| Animation  | GSAP + Framer Motion                |
| Scroll     | Lenis                               |
| Styling    | Tailwind CSS 4 + CSS Variables      |
| Typography | Syne · DM Sans · JetBrains Mono     |
| Deployment | Vercel                              |

## ✦ Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view.

## ✦ Project Structure

```
src/
├── app/                  # Next.js app router
│   ├── globals.css       # CSS variables, grain overlay, scrollbar
│   ├── layout.tsx        # Root layout with ClientShell wrapper
│   └── page.tsx          # Home page
├── components/
│   ├── sections/
│   │   └── Hero.tsx      # Hero section with scramble name + CTAs
│   ├── three/
│   │   ├── Scene.tsx     # R3F Canvas setup
│   │   └── ParticleField.tsx  # Singularity particle system
│   └── ui/
│       ├── ClientShell.tsx    # Preloader + cursor + grain orchestrator
│       ├── CustomCursor.tsx   # Magnetic cursor component
│       ├── Preloader.tsx      # Loading animation
│       └── SmoothScroll.tsx   # Lenis scroll wrapper
└── data/
    └── moncito.ts        # Portfolio content data
```

## ✦ Design Philosophy

Inspired by Awwwards SOTD portfolios like Dennis Snellenberg, Aristide Benoist, and Greg Lallé. Dark-mode-first with an indigo/purple accent system, monospace UI elements for a dev/terminal aesthetic, and cinematic overlays (vignette, scanlines, grain) for depth.

## ✦ License

MIT

---

Built by [Moncito Glenn N. Hernandez](https://github.com/Moncito)
