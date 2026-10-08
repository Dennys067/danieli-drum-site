"use client";

import { motion } from "framer-motion";
import { whatsappLink, messages } from "@/content/site";
import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappLink(messages.schedule)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.8 }}
      className="fixed bottom-5 right-5 z-50 flex h-13 w-13 items-center justify-center rounded-full border border-gold/60 bg-coffee text-ivory-text transition-colors duration-500 hover:bg-coffee-deep"
    >
      <WhatsAppIcon className="h-5 w-5" />
    </motion.a>
  );
}
