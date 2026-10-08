"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { about, MONOGRAM_SRC } from "./content";
import { EASE_LUXURY, Eyebrow, PendingText, Reveal } from "./motion";

/** Retrato com parallax suave. Sem foto, mostra o monograma oficial sobre bege. */
function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);
  const frameY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["3%", "-3%"]);

  // A imagem pode terminar de carregar antes da hidratação, quando onLoad
  // ainda não existe: confere o estado real ao montar.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Moldura deslocada em fio dourado de 1px */}
      <motion.div
        style={{ y: frameY }}
        className="absolute -right-3 -top-3 bottom-6 left-6 border border-[#B89B67]/70 sm:-right-5 sm:-top-5"
        aria-hidden="true"
      />
      <motion.div
        initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.4, ease: EASE_LUXURY }}
        className="relative aspect-[4/5] overflow-hidden bg-[#E9E1D3]"
      >
        {!loaded && (
          // PENDENTE: foto profissional em public/images/danieli-drum.jpg
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MONOGRAM_SRC}
              alt=""
              aria-hidden="true"
              className="h-auto w-[42%] object-contain"
              decoding="async"
            />
            <span className="font-sans text-[0.62rem] uppercase tracking-[0.3em] text-[#A08350]">
              Foto profissional pendente
            </span>
          </div>
        )}
        <motion.img
          ref={imgRef}
          src={about.photo.src}
          alt={about.photo.alt}
          onLoad={() => setLoaded(true)}
          style={{ y: imageY, scale: 1.1 }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          decoding="async"
        />
      </motion.div>

      {/* Assinatura e OAB sobre a foto */}
      <Reveal delay={0.4} className="absolute -bottom-7 left-5 sm:left-10">
        <div className="border border-[#B89B67]/60 bg-[#F8F4EC] px-6 py-4">
          <p className="font-serif text-lg font-light uppercase tracking-[0.16em] text-[#3A2B24]">Danieli Drum</p>
          <p
            className="mt-1 font-sans text-[0.62rem] uppercase tracking-[0.3em] text-[#A08350]"
            data-pending={about.oab.pending || undefined}
          >
            {about.oab.text}
          </p>
        </div>
      </Reveal>
    </div>
  );
}

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative bg-transparent py-28 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 sm:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:pt-4">
          <Portrait />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow>{about.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="sobre-title"
              className="mt-7 font-serif text-[2rem] font-light uppercase leading-[1.15] tracking-[0.16em] text-[#3A2B24] sm:text-[2.8rem]"
            >
              {about.title}
            </h2>
            <p className="mt-3 font-sans text-[0.68rem] uppercase tracking-[0.3em] text-[#A08350]">
              {about.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-8">
            {about.presentation.pending ? (
              <PendingText>{about.presentation.text}</PendingText>
            ) : (
              <p className="font-sans text-base font-light leading-relaxed text-[#3A2B24]/80 sm:text-lg">
                {about.presentation.text}
              </p>
            )}
          </Reveal>

          <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {about.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.08 * i} className="border-t border-[#B89B67]/50 pt-6">
                <dt className="flex items-baseline gap-3 font-serif text-lg font-normal uppercase tracking-[0.14em] text-[#3A2B24]">
                  <span className="font-sans text-[0.62rem] tracking-[0.2em] text-[#A08350]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {pillar.title}
                </dt>
                <dd className="mt-3">
                  {pillar.pending ? (
                    <PendingText>{pillar.text}</PendingText>
                  ) : (
                    <span className="font-sans text-sm font-light leading-relaxed text-[#3A2B24]/75">{pillar.text}</span>
                  )}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.1} className="mt-14">
            <figure className="border-l border-[#B89B67] pl-8">
              <figcaption className="font-sans text-[0.68rem] uppercase tracking-[0.3em] text-[#A08350]">
                {about.humanized.title}
              </figcaption>
              <blockquote className="mt-4 font-serif text-xl font-light italic leading-relaxed text-[#3A2B24] sm:text-2xl">
                {about.humanized.text}
              </blockquote>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
