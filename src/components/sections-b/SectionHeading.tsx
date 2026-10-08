"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "./motion";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
};

// Rótulo em caixa alta, título Cormorant espaçado e fio dourado de 1px.
export default function SectionHeading({ id, eyebrow, title, lead, tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <div className="text-center">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={`font-sans text-[11px] uppercase tracking-[0.3em] ${dark ? "text-[#CFB686]" : "text-[#A08350]"}`}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        variants={fadeUp}
        custom={0.1}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className={`mt-6 font-serif text-[1.75rem] font-light uppercase leading-snug tracking-[0.14em] md:text-[2.5rem] ${
          dark ? "text-[#F4EEE2]" : "text-[#3A2B24]"
        }`}
      >
        {title}
      </motion.h2>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-8 block h-px w-14 bg-[#B89B67]"
      />
      {lead && (
        <motion.p
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={`mx-auto mt-8 max-w-xl font-sans text-[15px] leading-relaxed md:text-base ${
            dark ? "text-[#F4EEE2]/75" : "text-[#3A2B24]/85"
          }`}
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}
