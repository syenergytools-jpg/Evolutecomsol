"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Sphere,
  Torus,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { useRef, Suspense, useMemo } from "react";
import * as THREE from "three";

/**
 * Cinematic chrome centerpiece.
 *  • Premium torus knot, very low roughness, high envMap intensity
 *  • Glowing electric-blue back-orb (volumetric light fake)
 *  • Thin chrome outer ring (slow rotate)
 *  • 60-particle dust field drifting in 3D space
 *  • Three-light setup: key (top), rim copper, fill electric
 */

function ChromeKnot() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.18;

    // mouse parallax — subtle, not jumpy
    const { x, y } = state.pointer;
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      x * 0.25,
      0.04
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      y * 0.18,
      0.04
    );

    // breathing scale
    const breath = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.018;
    ref.current.scale.setScalar(1.25 * breath);
  });

  return (
    <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[0.85, 0.28, 240, 36]} />
        <meshPhysicalMaterial
          color="#e8ecf2"
          metalness={1}
          roughness={0.08}
          envMapIntensity={2.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>
    </Float>
  );
}

/**
 * Volumetric back-glow — a large soft sphere placed behind the knot,
 * emissive electric blue. Reads as "ambient light" through the scene.
 */
function BackGlow() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.35 + Math.sin(t * 0.6) * 0.08;
  });
  return (
    <mesh ref={ref} position={[0, 0, -1.8]}>
      <sphereGeometry args={[1.6, 32, 32]} />
      <meshBasicMaterial color="#3d8bff" transparent opacity={0.35} />
    </mesh>
  );
}

/**
 * A second, small copper accent orb that drifts on a slow path —
 * gives the scene warmth opposite the electric blue.
 */
function CopperAccent() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = Math.cos(t * 0.3) * 2.2;
    ref.current.position.y = Math.sin(t * 0.4) * 1.0;
    ref.current.position.z = Math.sin(t * 0.3) * 0.5 - 0.5;
  });
  return (
    <Float speed={1.3} floatIntensity={0.8}>
      <mesh ref={ref} scale={0.28}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          chromaticAberration={0.08}
          anisotropy={0.5}
          roughness={0.04}
          ior={1.5}
          transmission={1}
          color="#ff8a5c"
        />
      </mesh>
    </Float>
  );
}

/**
 * Chrome outer ring — wider than before, slow rotate, slight tilt.
 */
function OuterRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.05;
    ref.current.rotation.x += delta * 0.012;
  });
  return (
    <Torus ref={ref} args={[2.7, 0.012, 16, 220]} rotation={[Math.PI / 2.6, 0, 0]}>
      <meshPhysicalMaterial
        color="#cfd5dc"
        metalness={1}
        roughness={0.06}
        clearcoat={1}
        emissive="#3d8bff"
        emissiveIntensity={0.06}
      />
    </Torus>
  );
}

/**
 * Particle dust field — 80 small instanced spheres drifting through
 * the scene at varying depths. Reads as ambient atmosphere.
 */
function ParticleDust() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const COUNT = 80;

  const particles = useMemo(() => {
    const arr: { pos: THREE.Vector3; speed: THREE.Vector3; phase: number; size: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 3
        ),
        speed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.06,
          (Math.random() - 0.5) * 0.06,
          (Math.random() - 0.5) * 0.04
        ),
        phase: Math.random() * Math.PI * 2,
        size: 0.012 + Math.random() * 0.024,
      });
    }
    return arr;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      const driftX = Math.sin(t * 0.3 + p.phase) * 0.4;
      const driftY = Math.cos(t * 0.4 + p.phase) * 0.3;
      dummy.position.set(
        p.pos.x + driftX + p.speed.x * t * 8,
        p.pos.y + driftY + p.speed.y * t * 8,
        p.pos.z
      );
      // wrap
      if (dummy.position.x > 4) dummy.position.x -= 8;
      if (dummy.position.x < -4) dummy.position.x += 8;
      if (dummy.position.y > 3) dummy.position.y -= 6;
      if (dummy.position.y < -3) dummy.position.y += 6;

      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
    </instancedMesh>
  );
}

/**
 * Camera that slowly orbits + responds to mouse.
 */
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      Math.sin(t * 0.06) * 0.4 + x * 0.5,
      0.04
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      Math.cos(t * 0.08) * 0.25 + y * 0.3,
      0.04
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function ChromeScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4.8], fov: 38 }}
      className="!absolute inset-0 z-0"
    >
      <Suspense fallback={null}>
        {/* 3-light cinematic setup */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-4, 2, -2]} intensity={0.9} color="#e8704a" />
        <pointLight position={[0, 0, 4]} intensity={0.7} color="#3d8bff" />
        <spotLight
          position={[0, 5, 3]}
          intensity={0.8}
          angle={0.6}
          penumbra={1}
          color="#ffffff"
        />

        <BackGlow />
        <ParticleDust />
        <OuterRing />
        <ChromeKnot />
        <CopperAccent />
        <CameraRig />

        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
