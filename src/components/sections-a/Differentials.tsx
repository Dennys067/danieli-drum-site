"use client";

import { motion, useReducedMotion } from "framer-motion";
import { differentials, type DifferentialIcon } from "./content";
import { ClockIcon, CompassIcon, EyeIcon, PersonIcon, SealIcon } from "./icons";
import { EASE_LUXURY, SectionHeading } from "./motion";

const ICONS: Record<DifferentialIcon, typeof ClockIcon> = {
  person: PersonIcon,
  eye: EyeIcon,
  compass: CompassIcon,
  clock: ClockIcon,
  seal: SealIcon,
};

function DifferentialRow({ item, index }: { item: (typeof differentials.items)[number]; index: number }) {
  const reduce = useReducedMotion();
  const Icon = ICONS[item.icon];

  return (
    <motion.li
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      className="group relative grid grid-cols-[auto_1fr] gap-x-6 py-10 sm:grid-cols-[3rem_auto_1fr] sm:gap-x-8"
    >
      {/* Fio dourado de 1px que se desenha da esquerda para a direita */}
      <motion.span
        aria-hidden="true"
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        transition={{ duration: 1.4, ease: EASE_LUXURY }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-[#B89B67]/60"
      />

      <motion.span
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden pt-2 font-sans text-[0.62rem] tracking-[0.2em] text-[#CFB686] sm:block"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <motion.span
        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 1, ease: EASE_LUXURY, delay: 0.15 }}
        className="flex h-14 w-14 items-center justify-center border border-[#B89B67]/50 text-[#CFB686] transition-colors duration-700 group-hover:border-[#CFB686]"
      >
        <Icon size={28} />
      </motion.span>

      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 1, ease: EASE_LUXURY, delay: 0.25 }}
      >
        <h3 className="font-serif text-xl font-normal uppercase tracking-[0.14em] text-[#F4EEE2] transition-transform duration-700 group-hover:translate-x-1 sm:text-2xl">
          {item.title}
        </h3>
        <p className="mt-3 max-w-lg font-sans text-sm font-light leading-relaxed text-[#F4EEE2]/70 sm:text-base">
          {item.text}
        </p>
      </motion.div>
    </motion.li>
  );
}

export function Differentials() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-title"
      className="relative bg-[#30231D] py-28 text-[#F4EEE2] sm:py-40"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="diferenciais-title"
              eyebrow={differentials.eyebrow}
              title={differentials.title}
              lead={differentials.lead}
              tone="dark"
            />
          </div>
        </div>

        <ol className="border-b border-[#B89B67]/60 lg:col-span-7">
          {differentials.items.map((item, i) => (
            <DifferentialRow key={item.title} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
