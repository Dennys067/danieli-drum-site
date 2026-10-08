import type { Transition, Variants } from "framer-motion";

// Curva suave usada em todas as entradas das seções.
export const ease: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease, delay },
  }),
};

export const viewportOnce = { once: true, amount: 0.3 } as const;
