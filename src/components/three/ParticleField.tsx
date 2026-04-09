"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 20000;

// Generate particle data at module level to avoid React Compiler purity errors with Math.random()
function generateSingularityData() {
  const positions  = new Float32Array(PARTICLE_COUNT * 3);
  const colors     = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const layers     = new Float32Array(PARTICLE_COUNT); // 0=core, 1=disk, 2=halo

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const norm = i / PARTICLE_COUNT;

    // Assign layer
    let layer = 0;
    if (norm > 0.30) layer = 1;
    if (norm > 0.80) layer = 2;
    layers[i] = layer;

    // Spawn radius per layer — tuned for camera z=260
    let r: number;
    if (layer === 0) {
      r = Math.random() * 30 + 3;           // core: 3–33
    } else if (layer === 1) {
      r = Math.random() * 100 + 33;         // disk: 33–133
    } else {
      r = Math.random() * 130 + 120;        // halo: 120–250
    }

    // Spiral distribution
    const goldenAngle = 2.39996322972865332;
    const theta = i * goldenAngle;
    const phi = Math.acos(1.0 - 2.0 * ((i * 0.618033) % 1.0));

    // Flatten to disk shape (y compressed) — increased for vertical screen fill
    const flatness = layer === 0 ? 0.6 : layer === 1 ? 0.35 : 0.5;
    positions[i * 3]     = Math.sin(phi) * Math.cos(theta) * r;
    positions[i * 3 + 1] = Math.cos(phi) * r * flatness;
    positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;

    // Orbital velocity (tangential)
    const speed = layer === 0 ? 0.8 : layer === 1 ? 0.3 : 0.08;
    velocities[i * 3]     = -Math.sin(theta) * speed;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i * 3 + 2] = Math.cos(theta) * speed;

    // Color per layer
    const color = new THREE.Color();
    if (layer === 0) {
      // Core: white → electric blue → cyan
      const t = Math.random();
      color.setHSL(0.57 + t * 0.08, 0.3 + t * 0.7, 0.6 + t * 0.4);
    } else if (layer === 1) {
      // Disk: electric blue → indigo → deep purple
      const t = Math.pow(Math.random(), 0.5);
      color.setHSL(0.62 + t * 0.15, 1.0, 0.25 + (1 - t) * 0.55);
    } else {
      // Halo: vivid indigo/purple — bright enough to see at edges
      const t = Math.random();
      color.setHSL(0.66 + t * 0.12, 1.0, 0.18 + t * 0.35);
    }
    colors[i * 3]     = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  return { positions, colors, velocities, layers };
}

const singularityData = generateSingularityData();

export default function SingularityField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();

  const { positions, colors, layers } = singularityData;

  // Store current positions in a ref for animation
  const posRef = useRef<Float32Array>(positions.slice());

  useFrame((state) => {
    if (!pointsRef.current) return;

    const t   = state.clock.elapsedTime;
    const pos = posRef.current;
    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Mouse in world space (normalized -1 to 1 → world units)
    const mx = pointer.x * 220;
    const my = pointer.y * 140;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const x = pos[ix];
      const y = pos[iy];
      const z = pos[iz];

      const layer = layers[i];

      // --- GRAVITATIONAL PULL toward singularity (0,0,0) ---
      const dist  = Math.sqrt(x * x + y * y + z * z) + 0.001;
      const grav  = layer === 0 ? 0.012 : layer === 1 ? 0.006 : 0.002;
      const pull  = grav / (dist * 0.08);

      // --- ORBITAL ROTATION per layer ---
      const speed = layer === 0 ? 0.6 : layer === 1 ? 0.22 : 0.06;
      const angle = speed * 0.016; // per frame rotation
      const cosA  = Math.cos(angle);
      const sinA  = Math.sin(angle);
      const nx    = x * cosA - z * sinA;
      const nz    = x * sinA + z * cosA;

      // --- CURSOR GRAVITY (repel from cursor position) ---
      const cdx  = x - mx;
      const cdy  = y - my;
      const cdist = Math.sqrt(cdx * cdx + cdy * cdy) + 0.001;
      const cursorForce = cdist < 80 ? (80 - cdist) / 80 * 1.0 : 0;
      const cx   = (cdx / cdist) * cursorForce;
      const cy   = (cdy / cdist) * cursorForce;

      // --- BREATHING PULSE (subtle scale oscillation) ---
      const pulse = 1.0 + Math.sin(t * 0.8 + dist * 0.02) * 0.003;

      // Combine forces
      pos[ix] = (nx - (nx / dist) * pull + cx) * pulse;
      pos[iy] = (y  - (y  / dist) * pull * 0.4 + cy) * pulse;
      pos[iz] = (nz - (nz / dist) * pull) * pulse;

      arr[ix] = pos[ix];
      arr[iy] = pos[iy];
      arr[iz] = pos[iz];
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.4}
        vertexColors
        transparent
        opacity={1.0}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
