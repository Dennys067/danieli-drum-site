"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.4 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled || open ? "border-b border-gold/30 bg-ivory/90 py-3 backdrop-blur-md" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#inicio" aria-label={site.name} className="block">
          {/* Logo oficial: proporção preservada, sem recolorir */}
          <Image
            src="/brand/logo-horizontal-recorte.png"
            alt={`${site.name} · ${site.tagline}`}
            width={3060}
            height={720}
            priority
            className={`w-auto transition-all duration-700 ${scrolled ? "h-8" : "h-10"}`}
          />
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Principal">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.3em] text-coffee transition-colors hover:text-bronze"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            className="rounded-[2px] border border-gold px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] text-coffee transition-colors hover:bg-coffee hover:text-ivory-text"
          >
            Agendar
          </a>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center text-coffee lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} strokeWidth={1.2} /> : <Menu size={22} strokeWidth={1.2} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
            aria-label="Menu móvel"
          >
            <ul className="flex flex-col px-5 pb-4 pt-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-gold/25 py-4 font-serif text-xl uppercase tracking-[0.14em] text-coffee"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
