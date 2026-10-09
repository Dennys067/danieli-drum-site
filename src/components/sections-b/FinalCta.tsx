"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { triageAreas, triageWhatsappUrl } from "./data";
import { WhatsAppIcon } from "./icons";
import { fadeUp, viewportOnce } from "./motion";

const fieldClass =
  "w-full border-0 border-b border-[#CFB686]/40 bg-transparent px-0 py-3 font-sans text-[15px] font-light text-[#F4EEE2] placeholder:text-[#F4EEE2]/40 transition-colors duration-500 focus:border-[#CFB686] focus:outline-none";
const labelClass = "block font-sans text-[10px] uppercase tracking-[0.3em] text-[#CFB686]";

export default function FinalCta() {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [summary, setSummary] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = triageWhatsappUrl({ name, area, summary });
    if (url.startsWith("http")) window.open(url, "_blank", "noopener,noreferrer");
    else window.location.hash = url;
  }

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
          Contato e
          <span className="block text-[#CFB686]">agendamento.</span>
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
          Conte em poucas palavras a sua situação. A mensagem segue pelo WhatsApp com as informações
          sobre a consulta e o agendamento.
        </motion.p>

        <motion.form
          variants={fadeUp}
          custom={0.45}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onSubmit={handleSubmit}
          className="mx-auto mt-14 grid max-w-xl gap-8 text-left sm:grid-cols-2"
        >
          <label className="sm:col-span-1">
            <span className={labelClass}>Nome</span>
            <input
              required
              name="nome"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className={fieldClass}
            />
          </label>
          <label className="sm:col-span-1">
            <span className={labelClass}>Assunto</span>
            <select
              required
              name="assunto"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className={`${fieldClass} cursor-pointer [&>option]:bg-[#30231D] ${area ? "" : "text-[#F4EEE2]/40"}`}
            >
              <option value="" disabled>
                Selecionar
              </option>
              {triageAreas.map((a) => (
                <option key={a} className="text-[#F4EEE2]">
                  {a}
                </option>
              ))}
            </select>
          </label>
          <label className="sm:col-span-2">
            <span className={labelClass}>Resumo da situação</span>
            <textarea
              name="resumo"
              rows={3}
              maxLength={400}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Em poucas linhas, o que você precisa"
              className={`${fieldClass} resize-none`}
            />
          </label>
          <div className="text-center sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-4 border border-[#CFB686] bg-[#CFB686] px-9 py-[18px] font-sans text-xs font-medium uppercase tracking-[0.24em] text-[#30231D] transition-colors duration-500 hover:bg-transparent hover:text-[#F4EEE2] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F4EEE2] focus-visible:ring-offset-4 focus-visible:ring-offset-[#30231D]"
            >
              <WhatsAppIcon width={20} height={20} strokeWidth={1.25} />
              Enviar pelo WhatsApp
            </button>
            <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.24em] text-[#F4EEE2]/50">
              Atendimento mediante agendamento
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
