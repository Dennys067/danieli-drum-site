"use client";

import { motion } from "framer-motion";
import { whatsappUrl } from "./data";
import { WhatsAppIcon } from "./icons";
import { fadeUp, viewportOnce } from "./motion";

export default function FinalCta() {
  const external = whatsappUrl.startsWith("http");

  return (
    <section
      id="contato"
      aria-labelledby="cta-title"
      className="relative bg-[#30231D] px-6 py-28 text-center md:py-40"
    >
      <div className="mx-auto max-w-4xl">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#CFB686]"
        >
          Agende seu atendimento
        </motion.p>
        <motion.h2
          id="cta-title"
          variants={fadeUp}
          custom={0.12}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 font-serif text-[1.85rem] font-light uppercase leading-[1.35] tracking-[0.14em] text-[#F4EEE2] md:text-[3.25rem]"
        >
          Seu direito merece
          <span className="block text-[#CFB686]">atenção especializada.</span>
        </motion.h2>
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 block h-px w-14 bg-[#B89B67]"
        />
        <motion.p
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-10 max-w-md font-sans text-[15px] font-light leading-relaxed text-[#F4EEE2]/75 md:text-base"
        >
          Converse com a Dra. Danieli Drum para agendar um atendimento e apresentar a sua situação.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={0.45}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12"
        >
          <a
            href={whatsappUrl}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center gap-4 border border-[#CFB686] bg-[#CFB686] px-9 py-[18px] font-sans text-xs font-medium uppercase tracking-[0.24em] text-[#30231D] transition-colors duration-500 hover:bg-transparent hover:text-[#F4EEE2] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F4EEE2] focus-visible:ring-offset-4 focus-visible:ring-offset-[#30231D]"
          >
            <WhatsAppIcon width={20} height={20} strokeWidth={1.25} />
            Falar pelo WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
