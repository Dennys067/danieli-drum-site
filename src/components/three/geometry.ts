import * as THREE from "three";

type V3 = [number, number, number];

/** Gerador pseudo-aleatório determinístico para que a forma seja sempre igual. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class PointBuilder {
  points: number[] = [];
  rand: () => number;
  constructor(seed = 7, private density = 1) {
    this.rand = mulberry32(seed);
  }
  private n(count: number) {
    return Math.max(4, Math.round(count * this.density));
  }
  private jitter(amount: number) {
    return (this.rand() - 0.5) * amount;
  }
  push(x: number, y: number, z: number) {
    this.points.push(x, y, z);
  }
  ring(c: V3, r: number, count: number, j = 0.012) {
    const n = this.n(count);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + this.jitter(0.02);
      this.push(c[0] + Math.cos(a) * (r + this.jitter(j)), c[1] + this.jitter(j), c[2] + Math.sin(a) * (r + this.jitter(j)));
    }
  }
  disk(c: V3, r: number, count: number) {
    const n = this.n(count);
    for (let i = 0; i < n; i++) {
      const a = this.rand() * Math.PI * 2;
      const rho = r * Math.sqrt(this.rand());
      this.push(c[0] + Math.cos(a) * rho, c[1] + this.jitter(0.01), c[2] + Math.sin(a) * rho);
    }
  }
  line(a: V3, b: V3, count: number, j = 0.01, sag = 0) {
    const n = this.n(count);
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const s = Math.sin(t * Math.PI) * sag;
      this.push(
        a[0] + (b[0] - a[0]) * t + this.jitter(j),
        a[1] + (b[1] - a[1]) * t - s + this.jitter(j),
        a[2] + (b[2] - a[2]) * t + this.jitter(j),
      );
    }
  }
  cylinder(x: number, z: number, y0: number, y1: number, r: number, count: number) {
    const n = this.n(count);
    for (let i = 0; i < n; i++) {
      const a = this.rand() * Math.PI * 2;
      this.push(x + Math.cos(a) * r, y0 + this.rand() * (y1 - y0), z + Math.sin(a) * r);
    }
  }
  sphere(c: V3, r: number, count: number) {
    const n = this.n(count);
    for (let i = 0; i < n; i++) {
      const u = this.rand() * 2 - 1;
      const a = this.rand() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      this.push(c[0] + s * Math.cos(a) * r, c[1] + u * r, c[2] + s * Math.sin(a) * r);
    }
  }
  /** Prato côncavo (calota parabólica) com borda no plano y = c[1] */
  bowl(c: V3, r: number, depth: number, count: number) {
    const n = this.n(count);
    for (let i = 0; i < n; i++) {
      const a = this.rand() * Math.PI * 2;
      const k = Math.sqrt(this.rand());
      const rho = r * k;
      this.push(c[0] + Math.cos(a) * rho, c[1] - depth * (1 - k * k), c[2] + Math.sin(a) * rho);
    }
  }
  build() {
    const positions = new Float32Array(this.points);
    const count = positions.length / 3;
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      scales[i] = 0.55 + this.rand() * 0.9;
      phases[i] = this.rand() * Math.PI * 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return g;
  }
}

class LineBuilder {
  segs: number[] = [];
  seg(a: V3, b: V3) {
    this.segs.push(...a, ...b);
  }
  circle(c: V3, r: number, n = 96) {
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2;
      const a1 = ((i + 1) / n) * Math.PI * 2;
      this.seg([c[0] + Math.cos(a0) * r, c[1], c[2] + Math.sin(a0) * r], [c[0] + Math.cos(a1) * r, c[1], c[2] + Math.sin(a1) * r]);
    }
  }
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(this.segs), 3));
    return g;
  }
}

/** Dimensões da balança (unidades da cena) */
export const SCALE = {
  pivotY: 1.35,
  armHalf: 1.55,
  chainDrop: 1.45,
  panR: 0.5,
  panDepth: 0.2,
};

/** Estrutura fixa: base, coluna e remate */
export function buildStand(density: number) {
  const p = new PointBuilder(11, density);
  // base em degraus
  p.ring([0, -1.95, 0], 0.95, 260);
  p.ring([0, -1.9, 0], 0.9, 200);
  p.disk([0, -1.9, 0], 0.88, 260);
  p.ring([0, -1.78, 0], 0.62, 170);
  p.disk([0, -1.78, 0], 0.6, 120);
  p.ring([0, -1.66, 0], 0.32, 110);
  // coluna
  p.cylinder(0, 0, -1.66, SCALE.pivotY, 0.055, 900);
  p.ring([0, -1.0, 0], 0.11, 50);
  p.ring([0, 0.15, 0], 0.09, 40);
  p.ring([0, SCALE.pivotY - 0.05, 0], 0.13, 60);
  // remate
  p.sphere([0, SCALE.pivotY + 0.25, 0], 0.11, 220);
  p.line([0, SCALE.pivotY + 0.36, 0], [0, SCALE.pivotY + 0.62, 0], 40, 0.006);

  const l = new LineBuilder();
  l.circle([0, -1.95, 0], 0.95);
  l.circle([0, -1.78, 0], 0.62);
  l.circle([0, -1.66, 0], 0.32);
  l.seg([0, -1.66, 0], [0, SCALE.pivotY + 0.62, 0]);
  return { points: p.build(), lines: l.build() };
}

/** Travessão (gira em torno do pivô) */
export function buildBeam(density: number) {
  const p = new PointBuilder(23, density);
  const h = SCALE.armHalf;
  p.line([-h, 0, 0], [h, 0, 0], 700, 0.018, -0.06);
  p.sphere([-h, 0, 0], 0.05, 60);
  p.sphere([h, 0, 0], 0.05, 60);
  p.sphere([0, 0, 0], 0.07, 80);
  const l = new LineBuilder();
  const steps = 40;
  for (let i = 0; i < steps; i++) {
    const t0 = i / steps;
    const t1 = (i + 1) / steps;
    const x0 = -h + 2 * h * t0;
    const x1 = -h + 2 * h * t1;
    l.seg([x0, Math.sin(t0 * Math.PI) * 0.06, 0], [x1, Math.sin(t1 * Math.PI) * 0.06, 0]);
  }
  return { points: p.build(), lines: l.build() };
}

/** Prato com correntes (pendurado na ponta do travessão; origem = ponto de suspensão) */
export function buildPan(density: number, seed: number) {
  const p = new PointBuilder(seed, density);
  const drop = SCALE.chainDrop;
  const r = SCALE.panR;
  const l = new LineBuilder();
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + Math.PI / 2;
    const rim: V3 = [Math.cos(a) * r * 0.92, -drop, Math.sin(a) * r * 0.92];
    p.line([0, 0, 0], rim, 120, 0.006);
    l.seg([0, 0, 0], rim);
  }
  p.ring([0, -drop, 0], r, 260, 0.008);
  p.bowl([0, -drop, 0], r, SCALE.panDepth, 750);
  l.circle([0, -drop, 0], r);
  return { points: p.build(), lines: l.build() };
}

/** Poeira dourada ambiente (camada de profundidade) */
export function buildDust(count: number) {
  const rand = mulberry32(99);
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const phases = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * 14;
    positions[i * 3 + 1] = (rand() - 0.5) * 9;
    positions[i * 3 + 2] = (rand() - 0.5) * 10 - 1;
    scales[i] = 0.3 + rand() * 0.9;
    phases[i] = rand() * Math.PI * 2;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  g.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  return g;
}
