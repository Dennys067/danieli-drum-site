"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Curva de easing usada em todas as seções: lenta no fim, sem rebote. */
export const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Fade-in + slide-up quando o elemento entra na tela (uma única vez). */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE_LUXURY, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Rótulo pequeno em caixa alta (0.3em) com fio dourado de 1px. */
export function Eyebrow({
  children,
  tone = "light",
  centered = false,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  centered?: boolean;
}) {
  const color = tone === "dark" ? "text-[#CFB686]" : "text-[#A08350]";
  return (
    <p
      className={`flex items-center gap-4 font-sans text-[0.68rem] font-normal uppercase tracking-[0.3em] ${color} ${
        centered ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-10 bg-[#B89B67]" aria-hidden="true" />
      {children}
      {centered && <span className="h-px w-10 bg-[#B89B67]" aria-hidden="true" />}
    </p>
  );
}

/** Cabeçalho de seção: rótulo, título Cormorant em caixa alta e texto de apoio. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  id,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
}) {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <Reveal>
        <Eyebrow tone={tone} centered={centered}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className={`mt-7 font-serif text-[1.9rem] font-light uppercase leading-[1.2] tracking-[0.14em] sm:text-[2.6rem] ${
            dark ? "text-[#F4EEE2]" : "text-[#3A2B24]"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={`mt-6 font-sans text-base font-light leading-relaxed ${
              dark ? "text-[#F4EEE2]/70" : "text-[#3A2B24]/75"
            } ${centered ? "mx-auto max-w-lg" : ""}`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/** Texto ainda não fornecido pela cliente: aparece marcado como pendente. */
export function PendingText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      data-pending="true"
      className={`inline-block border border-dashed border-[#B89B67] px-3 py-2 font-sans text-sm italic text-[#A08350] ${className}`}
    >
      {children}
    </span>
  );
}
