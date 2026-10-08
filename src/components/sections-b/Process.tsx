"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "./data";
import { ease } from "./motion";
import SectionHeading from "./SectionHeading";

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.4 });

  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="relative bg-[#E9E1D3] px-6 py-24 md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="como-funciona-title"
          eyebrow="Atendimento"
          title="Como funciona"
          lead="Um percurso conduzido com método, proximidade e transparência, do primeiro contato à conclusão do caso."
        />

        <ol ref={listRef} className="relative mt-16 md:mt-24">
          {/* Trilho e fio dourado de 1px que se preenche conforme o scroll */}
          <span
            aria-hidden
            className="absolute bottom-0 left-[19px] top-0 w-px bg-[#3A2B24]/10 md:left-1/2 md:-translate-x-1/2"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: reduceMotion ? 1 : lineProgress }}
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-[#B89B67] md:left-1/2 md:-translate-x-1/2"
          />

          {processSteps.map((step, i) => {
            const isRight = i % 2 === 1;
            return (
              <li
                key={step.title}
                className="relative grid grid-cols-[40px_1fr] gap-6 pb-14 last:pb-0 md:grid-cols-[1fr_80px_1fr] md:gap-0 md:pb-20"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.7, ease }}
                  className="relative z-10 col-start-1 row-start-1 grid h-10 w-10 place-items-center border border-[#B89B67] bg-[#E9E1D3] font-serif text-[15px] tracking-[0.08em] text-[#A08350] md:col-start-2 md:mx-auto"
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: reduceMotion ? 0 : isRight ? 32 : -32, y: reduceMotion ? 0 : 12 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease, delay: 0.1 }}
                  className={`col-start-2 row-start-1 pt-1.5 ${
                    isRight ? "md:col-start-3 md:pl-10" : "md:col-start-1 md:pr-10 md:text-right"
                  }`}
                >
                  <h3 className="font-serif text-xl font-normal uppercase tracking-[0.12em] text-[#3A2B24] md:text-[1.4rem]">
                    {step.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-sm font-sans text-[15px] leading-relaxed text-[#3A2B24]/85 ${
                      isRight ? "" : "md:ml-auto"
                    }`}
                  >
                    {step.description}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
