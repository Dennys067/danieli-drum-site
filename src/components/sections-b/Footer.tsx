"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PENDING_LABEL, contact, darkLogo, instagramUrl, mapEmbedUrl, whatsappUrl } from "./data";
import { IdCardIcon, InstagramIcon, MailIcon, PinIcon, WhatsAppIcon } from "./icons";
import { fadeUp, viewportOnce } from "./motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="rodape"
      className="relative bg-[#30231D] px-6 pb-10 pt-16 font-sans text-[#F4EEE2] md:pt-20"
    >
      <div aria-hidden className="mx-auto h-px max-w-6xl bg-[#B89B67]/35" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto mt-6 flex justify-center md:mt-8"
      >
        {/* O PNG já traz a área de proteção do logo em volta; não recortar nem esticar. */}
        <Image
          src={darkLogo.src}
          width={darkLogo.width}
          height={darkLogo.height}
          alt={darkLogo.alt}
          sizes="(min-width: 768px) 360px, 300px"
          className="h-auto w-[300px] md:w-[360px]"
        />
      </motion.div>

      <div className="mx-auto mt-6 grid max-w-6xl gap-14 md:mt-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <motion.ul
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="divide-y divide-[#F4EEE2]/10 border-y border-[#F4EEE2]/10"
        >
          <ContactItem icon={<WhatsAppIcon />} label="WhatsApp">
            {contact.whatsappDisplay ? (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {contact.whatsappDisplay}
              </a>
            ) : (
              <Pending />
            )}
          </ContactItem>
          <ContactItem icon={<MailIcon />} label="E-mail">
            {contact.email ? (
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            ) : (
              <Pending />
            )}
          </ContactItem>
          <ContactItem icon={<PinIcon />} label="Endereço">
            {contact.addressLines ? (
              <address className="not-italic leading-relaxed text-[#F4EEE2]/85">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            ) : (
              <Pending />
            )}
          </ContactItem>
          <ContactItem icon={<InstagramIcon />} label="Instagram">
            {contact.instagramHandle && instagramUrl ? (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {contact.instagramHandle}
              </a>
            ) : (
              <Pending />
            )}
          </ContactItem>
          <ContactItem icon={<IdCardIcon />} label="OAB">
            {contact.oab ? <span className="text-[#F4EEE2]/85">{contact.oab}</span> : <Pending />}
          </ContactItem>
        </motion.ul>

        <motion.div
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative min-h-[300px] border border-[#B89B67]/40 lg:min-h-full"
        >
          {mapEmbedUrl ? (
            <iframe
              title="Mapa com a localização do escritório"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 opacity-90 grayscale sepia-[.2]"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
              <PinIcon width={26} height={26} className="text-[#B89B67]" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#CFB686]">Mapa</p>
              <p className="max-w-[260px] text-sm font-light leading-relaxed text-[#F4EEE2]/55">
                O mapa será exibido assim que o endereço do escritório for definido.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-3 border-t border-[#B89B67]/35 pt-8 text-[11px] uppercase tracking-[0.2em] text-[#F4EEE2]/50 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} Danieli Drum · {contact.oab ?? `OAB ${PENDING_LABEL.toLowerCase()}`}
        </p>
        <p>Conteúdo de caráter exclusivamente informativo</p>
        <a href="/privacidade" className="transition-colors duration-300 hover:text-[#CFB686]">
          Política de Privacidade
        </a>
        <p className="text-[#F4EEE2]/40">
          Desenvolvido por <span className="text-[#CFB686]/70">AS Websites</span>
        </p>
      </div>
    </footer>
  );
}

const linkClass =
  "text-[#F4EEE2]/85 underline-offset-4 transition-colors duration-300 hover:text-[#CFB686] hover:underline focus-visible:text-[#CFB686] focus-visible:outline-none";

function Pending() {
  return <span className="text-sm italic text-[#F4EEE2]/45">{PENDING_LABEL}</span>;
}

function ContactItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-5 py-5">
      <span className="mt-0.5 shrink-0 text-[#B89B67]">{icon}</span>
      <div className="min-w-0 flex-1 sm:flex sm:items-baseline sm:justify-between sm:gap-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#CFB686]">{label}</p>
        <div className="mt-1.5 text-[15px] font-light sm:mt-0 sm:text-right">{children}</div>
      </div>
    </li>
  );
}
