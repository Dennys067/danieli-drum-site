"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { messages, whatsappLink } from "@/content/site";

// Logo oficial (arquivo pronto da identidade visual). Nunca redesenhar, esticar ou recolorir.
const LOGO_SRC = "/brand/logo-vertical-transparente.png";

// Número do WhatsApp vem de src/content/site.ts.
const WHATSAPP_URL = whatsappLink(messages.schedule);

// Paleta da identidade visual.
const C = {
  ivory: "#F8F4EC",
  gold: "#B89B67",
  bronze: "#A08350",
};

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } },
};
const logoIn: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.8, ease: EASE } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE } },
};
const ruleIn: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.4, ease: EASE } },
};

/** Moldura de fios dourados de 1px que se desenha ao abrir a página. */
function Frame() {
  const line = { backgroundColor: C.gold, opacity: 0.35 };
  const draw = (axis: "x" | "y", delay: number) => ({
    initial: axis === "x" ? { scaleX: 0 } : { scaleY: 0 },
    animate: axis === "x" ? { scaleX: 1 } : { scaleY: 1 },
    transition: { duration: 2, ease: EASE, delay },
  });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-4 bottom-4 top-20 z-20 sm:inset-x-8 sm:bottom-8 sm:top-24 lg:inset-x-10 lg:bottom-10">
      <motion.span {...draw("x", 0.1)} style={line} className="absolute inset-x-0 top-0 block h-px origin-center" />
      <motion.span {...draw("x", 0.1)} style={line} className="absolute inset-x-0 bottom-0 block h-px origin-center" />
      <motion.span {...draw("y", 0.3)} style={line} className="absolute inset-y-0 left-0 block w-px origin-center" />
      <motion.span {...draw("y", 0.3)} style={line} className="absolute inset-y-0 right-0 block w-px origin-center" />
    </div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  // A balança 3D é o fundo fixo da página (src/components/three/SceneBackground).
  // Ao rolar, o conteúdo desce mais devagar que a página e esmaece.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      aria-label="Apresentação"
      className="relative h-svh w-full overflow-hidden"
    >
      <div className="relative h-full w-full">
        <Frame />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={reduced ? undefined : { y, opacity }}
            className="relative flex w-full flex-col items-center text-center"
          >
            {/* Véu marfim: mantém a área livre do logo sempre sobre fundo marfim liso. */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[min(100vw,680px)] -translate-x-1/2 -translate-y-1/2"
              style={{ background: `radial-gradient(closest-side, ${C.ivory} 56%, rgba(248,244,236,0) 100%)` }}
            />

            <motion.h1 variants={logoIn} className="w-[min(92vw,600px)]">
              {/* O PNG já traz área livre em volta; as margens negativas só aproximam o conteúdo abaixo. */}
              <Image
                src={LOGO_SRC}
                alt="Danieli Drum, Advocacia e Consultoria Jurídica"
                width={3200}
                height={2560}
                priority
                sizes="(max-width: 640px) 92vw, 600px"
                className="-mb-[9%] -mt-[8%] h-auto w-full select-none"
                draggable={false}
              />
            </motion.h1>

            <motion.span variants={ruleIn} aria-hidden className="block h-px w-14" style={{ backgroundColor: C.gold }} />


            <motion.div
              variants={rise}
              className="mt-12 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-[2px] bg-[#3A2B24] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#F4EEE2] transition-colors duration-500 ease-out hover:bg-[#30231D] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#A08350]"
              >
                <WhatsAppIcon className="h-[15px] w-[15px]" />
                Falar pelo WhatsApp
              </a>
              <a
                href="#contato"
                className="inline-flex items-center justify-center rounded-[2px] border border-[#B89B67] bg-[#F8F4EC] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#3A2B24] transition-colors duration-500 ease-out hover:border-[#A08350] hover:bg-[#E9E1D3] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#A08350]"
              >
                Agendar Atendimento
              </a>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.93.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.9.99 6.7 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.53A11.33 11.33 0 0 0 12.05.63C5.77.63.66 5.74.66 12.02c0 2 .52 3.96 1.52 5.69L.57 23.6l6.04-1.58a11.37 11.37 0 0 0 5.44 1.38h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.34-8.04z" />
    </svg>
  );
}
