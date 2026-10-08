"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { practiceAreas, type PracticeArea } from "./content";
import { ArrowIcon, ContractIcon, FamilyIcon } from "./icons";
import { EASE_LUXURY, Reveal, SectionHeading } from "./motion";

const ICONS: Record<PracticeArea["id"], typeof ContractIcon> = {
  previdenciario: FamilyIcon,
  civel: ContractIcon,
};

const MAX_TILT = 3; // graus: movimento 3D discreto, só com mouse

/** Card de área: fios de 1px, cantos retos e inclinação 3D sutil no hover. */
function AreaCard({ area, index }: { area: PracticeArea; index: number }) {
  const reduce = useReducedMotion();
  const Icon = ICONS[area.id];

  // Posição do cursor normalizada (0..1) dentro do card.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 140, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), spring);

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onPointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE_LUXURY, delay: index * 0.15 }}
      style={{ perspective: 1400 }}
      className="h-full"
      aria-labelledby={`area-${area.id}`}
    >
      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={reduce ? undefined : { rotateX, rotateY }}
        className="group relative flex h-full flex-col border border-[#CFB686]/70 bg-[#F8F4EC]/85 backdrop-blur-[2px] p-8 transition-colors duration-700 hover:border-[#B89B67] sm:p-12"
      >
        {/* Fio dourado que se desenha no topo ao passar o mouse */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-[#B89B67] transition-transform duration-1000 ease-out group-hover:scale-x-100"
        />

        <div className="flex items-start justify-between">
          <span className="flex h-16 w-16 items-center justify-center border border-[#CFB686] text-[#B89B67] transition-colors duration-700 group-hover:border-[#B89B67]">
            <Icon size={32} />
          </span>
          <span className="font-sans text-[0.62rem] tracking-[0.2em] text-[#A08350]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          id={`area-${area.id}`}
          className="mt-10 font-serif text-[1.6rem] font-light uppercase leading-snug tracking-[0.14em] text-[#3A2B24] sm:text-[1.9rem]"
        >
          {area.title}
        </h3>
        <p className="mt-4 max-w-md font-sans text-sm font-light leading-relaxed text-[#3A2B24]/75 sm:text-base">
          {area.description}
        </p>

        <ul className="mt-10 flex-1 divide-y divide-[#CFB686]/60 border-t border-[#CFB686]/60">
          {area.items.map((item) => (
            <li key={item.label} className="group/item flex items-start gap-4 py-4">
              <span
                aria-hidden="true"
                className="mt-[0.7rem] h-px w-4 shrink-0 bg-[#B89B67] transition-all duration-500 group-hover/item:w-7"
              />
              <div>
                <p className="font-sans text-[0.95rem] font-normal text-[#3A2B24]">{item.label}</p>
                <p className="mt-1 font-sans text-sm font-light leading-relaxed text-[#3A2B24]/70">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="mt-10 inline-flex items-center gap-3 self-start font-sans text-[0.68rem] uppercase tracking-[0.3em] text-[#3A2B24] transition-colors duration-500 hover:text-[#A08350]"
        >
          Falar sobre o meu caso
          <ArrowIcon className="transition-transform duration-500 group-hover:translate-x-1" />
        </a>
      </motion.div>
    </motion.article>
  );
}

export function PracticeAreas() {
  return (
    <section id="areas" aria-labelledby="areas-title" className="relative bg-[#E9E1D3]/40 py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          id="areas-title"
          eyebrow={practiceAreas.eyebrow}
          title={practiceAreas.title}
          lead={practiceAreas.lead}
          align="center"
        />

        <div className="mt-20 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {practiceAreas.areas.map((area, i) => (
            <AreaCard key={area.id} area={area} index={i} />
          ))}
        </div>

        <Reveal className="mt-14 text-center font-sans text-sm font-light text-[#3A2B24]/75">
          Sua situação não está listada? Cada caso é analisado individualmente.{" "}
          <a
            href="#contato"
            className="text-[#3A2B24] underline decoration-[#B89B67] underline-offset-4 transition-colors hover:text-[#A08350]"
          >
            Entre em contato
          </a>
          .
        </Reveal>
      </div>
    </section>
  );
}
