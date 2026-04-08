"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function GlowMesh({
  geometry,
  position,
  color,
  speed,
  distort,
  scale,
}: {
  geometry: "icosahedron" | "octahedron" | "torus" | "tetrahedron" | "dodecahedron";
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.003 * speed;
    meshRef.current.rotation.y += 0.005 * speed;
    // Subtle mouse parallax
    meshRef.current.position.x =
      position[0] + pointer.x * 0.3;
    meshRef.current.position.y =
      position[1] + pointer.y * 0.2;
  });

  const renderGeometry = () => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[scale, 1]} />;
      case "octahedron":
        return <octahedronGeometry args={[scale]} />;
      case "torus":
        return <torusGeometry args={[scale, scale * 0.35, 16, 50]} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={[scale]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[scale]} />;
    }
  };

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        {renderGeometry()}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingObjects() {
  return (
    <group>
      <GlowMesh
        geometry="icosahedron"
        position={[-4, 1.5, -2]}
        color="#6366f1"
        speed={1.2}
        distort={0.4}
        scale={0.9}
      />
      <GlowMesh
        geometry="octahedron"
        position={[4, -1, -1]}
        color="#a855f7"
        speed={0.8}
        distort={0.3}
        scale={0.7}
      />
      <GlowMesh
        geometry="torus"
        position={[3, 2, -3]}
        color="#818cf8"
        speed={1.5}
        distort={0.2}
        scale={0.6}
      />
      <GlowMesh
        geometry="tetrahedron"
        position={[-3.5, -2, -2]}
        color="#ec4899"
        speed={1.0}
        distort={0.5}
        scale={0.65}
      />
      <GlowMesh
        geometry="dodecahedron"
        position={[0.5, 2.8, -4]}
        color="#6366f1"
        speed={0.6}
        distort={0.25}
        scale={0.5}
      />
    </group>
  );
}
