"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motionState } from "./motionState";
import { SCALE, buildBeam, buildDust, buildPan, buildStand } from "./geometry";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uDrift;
  attribute float aScale;
  attribute float aPhase;
  varying float vTwinkle;
  varying float vLight;

  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.35 + aPhase) * uDrift;
    p.x += cos(uTime * 0.25 + aPhase * 1.3) * uDrift * 0.6;

    vec4 world = modelMatrix * vec4(p, 1.0);
    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;

    vTwinkle = 0.72 + 0.28 * sin(uTime * 1.4 + aPhase);
    gl_PointSize = uSize * aScale * uPixelRatio * vTwinkle / -mv.z;

    // Luz suave vindo do alto, à esquerda e à frente
    vec3 lightDir = normalize(vec3(-0.45, 0.75, 0.9));
    vLight = clamp(0.5 + 0.5 * dot(normalize(world.xyz + vec3(0.0, 0.0, 0.8)), lightDir), 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uShadow;
  uniform vec3 uHighlight;
  uniform float uOpacity;
  varying float vTwinkle;
  varying float vLight;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a = pow(a, 1.8);
    vec3 col = mix(uShadow, uHighlight, smoothstep(0.15, 0.95, vLight));
    gl_FragColor = vec4(col, a * vTwinkle * uOpacity);
  }
`;

function useParticleMaterial(size: number, opacity: number, drift = 0) {
  const dpr = useThree((s) => s.viewport.dpr);
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: size },
          uPixelRatio: { value: dpr },
          uDrift: { value: drift },
          uOpacity: { value: opacity },
          uShadow: { value: new THREE.Color("#a08350") },
          uHighlight: { value: new THREE.Color("#cfb686") },
        },
      }),
    [size, opacity, drift, dpr],
  );
}

const lineMaterial = () =>
  new THREE.LineBasicMaterial({ color: "#b89b67", transparent: true, opacity: 0.32, depthWrite: false });

function Scale({ density, reduced }: { density: number; reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const arm = useRef<THREE.Group>(null);
  const panL = useRef<THREE.Group>(null);
  const panR = useRef<THREE.Group>(null);

  const stand = useMemo(() => buildStand(density), [density]);
  const beam = useMemo(() => buildBeam(density), [density]);
  const left = useMemo(() => buildPan(density, 31), [density]);
  const right = useMemo(() => buildPan(density, 47), [density]);
  const mat = useParticleMaterial(46, 0.95);
  const lmat = useMemo(() => lineMaterial(), []);
  const standPoints = useRef<THREE.Points>(null);

  const smooth = useRef({ x: 0, y: 0, scroll: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const m = standPoints.current?.material as THREE.ShaderMaterial | undefined;
    if (m) m.uniforms.uTime.value = t;
    const s = smooth.current;
    const k = 1 - Math.pow(0.0025, delta);
    s.x += (motionState.pointerX - s.x) * k;
    s.y += (motionState.pointerY - s.y) * k;
    s.scroll += (motionState.scroll - s.scroll) * k;

    if (!root.current || !arm.current || !panL.current || !panR.current) return;
    const motion = reduced ? 0 : 1;

    // Flutuação lenta + rotação contínua guiada pelo scroll
    root.current.position.y = Math.sin(t * 0.55) * 0.08 * motion;
    root.current.rotation.y = (-0.35 + t * 0.04 * motion + s.scroll * Math.PI * 2.4 * motion) + s.x * 0.12;
    root.current.rotation.x = -s.y * 0.12 + 0.04;
    // Mantém a balança sempre centralizada; o mouse só inclina levemente
    root.current.position.x = 0;

    // O travessão oscila suavemente e os pratos permanecem na vertical
    const tilt = Math.sin(t * 0.45) * 0.05 * motion;
    arm.current.rotation.z = tilt;
    panL.current.rotation.z = -tilt;
    panR.current.rotation.z = -tilt;
  });

  return (
    <group ref={root}>
      <points ref={standPoints} geometry={stand.points} material={mat} />
      <lineSegments geometry={stand.lines} material={lmat} />
      <group ref={arm} position={[0, SCALE.pivotY, 0]}>
        <points geometry={beam.points} material={mat} />
        <lineSegments geometry={beam.lines} material={lmat} />
        <group ref={panL} position={[-SCALE.armHalf, 0, 0]}>
          <points geometry={left.points} material={mat} />
          <lineSegments geometry={left.lines} material={lmat} />
        </group>
        <group ref={panR} position={[SCALE.armHalf, 0, 0]}>
          <points geometry={right.points} material={mat} />
          <lineSegments geometry={right.lines} material={lmat} />
        </group>
      </group>
    </group>
  );
}

function Dust({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => buildDust(count), [count]);
  const mat = useParticleMaterial(34, 0.55, reduced ? 0 : 0.18);
  useFrame((state) => {
    if (!ref.current) return;
    (ref.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
    // Parallax: a poeira se move mais que a balança, criando profundidade
    ref.current.position.x += (motionState.pointerX * 0.45 - ref.current.position.x) * 0.03;
    ref.current.position.y += (-motionState.pointerY * 0.3 - ref.current.position.y) * 0.03;
    ref.current.position.z = motionState.scroll * 4.5;
    ref.current.rotation.y = motionState.scroll * 0.6;
  });
  return <points ref={ref} geometry={geo} material={mat} />;
}

/** Ajusta o tamanho da balança à largura visível (telas estreitas). */
function Fit({ children }: { children: React.ReactNode }) {
  const width = useThree((s) => s.viewport.width);
  const k = Math.min(1, width / 4.3);
  return (
    <group scale={k} position={[0, k < 1 ? 0.25 : 0, 0]}>
      {children}
    </group>
  );
}

function CameraRig() {
  useFrame(({ camera }) => {
    // O ambiente ganha profundidade conforme o scroll
    const targetZ = 7.2 + motionState.hero * 1.6 + motionState.scroll * 2;
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.position.y += (0.15 - motionState.hero * 0.35 - camera.position.y) * 0.06;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function JusticeScale({ reduced = false }: { reduced?: boolean }) {
  const isSmall = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.15, 7.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <CameraRig />
      <Fit>
        <Scale density={isSmall ? 0.75 : 1} reduced={reduced} />
      </Fit>
      <Dust count={isSmall ? 260 : 620} reduced={reduced} />
    </Canvas>
  );
}
