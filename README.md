<div align="center">

# Portfolio OS

**A high-fidelity, immersive developer portfolio engineered for visual impact.**

Built with Next.js 16, React 19, Three.js, and GSAP — designed to deliver an award-quality browsing experience with real-time 3D graphics, physics-driven interactions, and cinematic motion design.

[Live Demo](https://moncito.vercel.app) | [Report Issue](https://github.com/Moncito/ai-portfolio/issues)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Design System](#design-system)
- [Performance](#performance)
- [License](#license)

---

## Overview

Portfolio OS is a personal portfolio website for **Moncito Glenn N. Hernandez**, a Full-Stack Creative Developer specializing in 3D web experiences and AI-powered applications. The project prioritizes cinematic presentation, fluid motion, and technical depth — built from scratch without templates or starter kits.

The site features a GPU-accelerated 3D particle system, cursor-reactive physics, glitch-style text animations, and a fully orchestrated loading sequence — all rendered client-side with zero external animation libraries beyond GSAP and Three.js.

---

## Features

### 3D Singularity Particle Field

A real-time particle system rendering 20,000 particles across three orbital layers (core, disk, halo) using golden-angle spiral distribution. Particles respond to cursor position with gravitational physics, orbital velocity, and per-layer color grading (cyan core, indigo disk, purple halo). Built with React Three Fiber and raw Three.js buffer geometry.

### Magnetic Custom Cursor

A dual-element cursor (dot + ring) with independent easing. Interactive elements trigger a magnetic pull effect that draws the cursor toward the element center with elastic snap-back on leave. Entirely driven by GSAP tweens.

### Scramble Decode Preloader

A cinematic loading sequence featuring a progress bar with percentage counter, a character-by-character glitch decode animation, and a curtain-split page reveal. The preloader orchestrates scroll lock, DOM readiness, and opacity transitions before handing control to the main content.

### Film Grain Overlay

A full-viewport SVG noise texture rendered as a fixed overlay, providing subtle analog grain for visual depth. Composited via CSS pointer-events passthrough.

### Smooth Scroll

Lenis-powered scroll normalization with custom easing curves, delivering consistent frame-rate-independent scrolling across all browsers and input devices.

### GSAP Timeline Orchestration

All entrance animations, text reveals, and section transitions are coordinated through GSAP timelines with staggered offsets, ensuring precise sequencing and consistent timing across the full page lifecycle.

---

## Tech Stack

| Layer      | Technology                             |
| ---------- | -------------------------------------- |
| Framework  | Next.js 16 (App Router) + React 19     |
| Language   | TypeScript (strict)                    |
| 3D Engine  | Three.js + React Three Fiber + Drei    |
| Animation  | GSAP + Framer Motion                   |
| Scroll     | Lenis                                  |
| Styling    | Tailwind CSS 4 + CSS Custom Properties |
| AI         | Anthropic Claude SDK + Vercel AI SDK   |
| Auth       | Clerk                                  |
| Database   | Supabase (PostgreSQL)                  |
| Typography | Syne, DM Sans, JetBrains Mono          |
| Deployment | Vercel                                 |

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/Moncito/ai-portfolio.git
cd ai-portfolio/portfolio-os
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
portfolio-os/
  public/                        Static assets
  src/
    app/
      globals.css                Global styles, CSS variables, grain overlay
      layout.tsx                 Root layout with metadata, ClientShell, SmoothScroll
      page.tsx                   Home page entry point
    components/
      ai/                       AI chat interface components (planned)
      sections/
        Hero.tsx                 Hero section with scramble decode animation and CTAs
      three/
        Scene.tsx                React Three Fiber canvas configuration
        ParticleField.tsx        Singularity particle system (20k particles, 3 layers)
      ui/
        ClientShell.tsx          Top-level client orchestrator (preloader, cursor, grain)
        CustomCursor.tsx         Magnetic dot + ring cursor with interactive states
        Preloader.tsx            Cinematic loading sequence with glitch text reveal
        SmoothScroll.tsx         Lenis scroll wrapper with custom easing
    data/
      moncito.ts                Portfolio content, project data, and AI system prompt
    hooks/                      Custom React hooks
    lib/
      utils.ts                  Shared utility functions (cn, clsx + tailwind-merge)
```

---

## Architecture

The application follows a layered client architecture:

```
ClientShell (orchestration layer)
  +-- Preloader          Blocks rendering until assets are ready
  +-- CustomCursor       Global cursor overlay
  +-- Film Grain         SVG noise overlay
  +-- SmoothScroll       Lenis scroll normalization
       +-- Page Content  Sections rendered by Next.js App Router
            +-- Hero     3D Scene + GSAP entrance animations
```

- **Server Components** handle layout, metadata, and static rendering via the Next.js App Router.
- **Client Components** (marked with `"use client"`) manage all interactive behavior: 3D rendering, cursor tracking, scroll physics, and animation timelines.
- **Dynamic Imports** with `next/dynamic` and `ssr: false` ensure Three.js and GSAP components are excluded from the server bundle.

---

## Design System

| Token            | Value                         |
| ---------------- | ----------------------------- |
| Background       | `#0a0a0a` (near-black)        |
| Surface          | `#111111` / `#161616`         |
| Accent Primary   | `#6366f1` (Indigo 500)        |
| Accent Secondary | `#a855f7` (Purple 500)        |
| Accent Glow      | `#818cf8` (Indigo 400)        |
| Heading Font     | Syne (geometric sans-serif)   |
| Body Font        | DM Sans (humanist sans-serif) |
| Monospace Font   | JetBrains Mono                |

The visual language is dark-mode-first with an indigo/purple accent system, monospace UI elements for a developer/terminal aesthetic, and cinematic overlays (vignette, grain) for depth. Inspired by award-winning portfolios from Dennis Snellenberg, Aristide Benoist, and Greg Lalle.

---

## Performance

- **Code Splitting** — Three.js and animation libraries are dynamically imported, keeping the initial JavaScript bundle minimal.
- **Buffer Geometry** — The particle system uses raw `Float32Array` buffers instead of individual mesh instances, enabling 20,000 particles at 60fps.
- **Module-level Initialization** — Particle positions, colors, and velocities are computed once at module load, not on every render cycle.
- **SSR Exclusion** — Heavy client-side libraries are excluded from server-side rendering via dynamic imports with `ssr: false`.

---

## License

MIT

---

<div align="center">

Built by [Moncito Glenn N. Hernandez](https://github.com/Moncito)

</div>
