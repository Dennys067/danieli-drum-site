"use client";

import { about } from "./content";
import { Eyebrow, PendingText, Reveal } from "./motion";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative bg-transparent py-28 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
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
          <Reveal delay={0.16} className="mt-10">
            <p
              className="inline-block border border-[#B89B67]/60 px-5 py-3 font-sans text-[0.62rem] uppercase tracking-[0.3em] text-[#A08350]"
              data-pending={about.oab.pending || undefined}
            >
              {about.oab.text}
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-14 lg:mt-20">
            <figure className="border-l border-[#B89B67] pl-8">
              <figcaption className="font-sans text-[0.68rem] uppercase tracking-[0.3em] text-[#A08350]">
                {about.humanized.title}
              </figcaption>
              <blockquote className="mt-4 font-serif text-xl font-light italic leading-relaxed text-[#3A2B24] sm:text-[1.6rem]">
                {about.humanized.text}
              </blockquote>
            </figure>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <Reveal>
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

        </div>
      </div>
    </section>
  );
}
