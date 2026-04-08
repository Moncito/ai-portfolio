"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import FloatingObjects from "./FloatingObjects";
import ParticleField from "./ParticleField";

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#818cf8" />
    </>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <SceneLights />
      <Suspense fallback={null}>
        <ParticleField />
        <FloatingObjects />
      </Suspense>
    </Canvas>
  );
}
