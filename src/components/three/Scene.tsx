"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import SingularityField from "./ParticleField";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 60, 260], fov: 60 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "transparent",
        zIndex: 0,
      }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 0, 0]} intensity={5} color="#60a5fa" />
      <Suspense fallback={null}>
        <SingularityField />
      </Suspense>
    </Canvas>
  );
}
