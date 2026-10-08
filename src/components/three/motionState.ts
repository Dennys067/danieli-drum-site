/** Estado compartilhado (fora do React) entre GSAP/eventos e o loop do Three.js. */
export const motionState = {
  /** Progresso do scroll na página inteira (0 → 1) */
  scroll: 0,
  /** Progresso do scroll dentro do hero (0 → 1) */
  hero: 0,
  /** Ponteiro normalizado (-1 → 1) */
  pointerX: 0,
  pointerY: 0,
};
