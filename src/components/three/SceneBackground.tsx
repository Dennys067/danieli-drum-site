"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionState } from "./motionState";

const JusticeScale = dynamic(() => import("./JusticeScale"), { ssr: false });

/**
 * Camada fixa atrás de todo o conteúdo com a balança 3D.
 * O GSAP ScrollTrigger alimenta o progresso de scroll e suaviza a presença
 * da balança à medida que o usuário avança pela página.
 */
export default function SceneBackground() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const page = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (s) => (motionState.scroll = s.progress),
    });
    const hero = ScrollTrigger.create({
      trigger: "#inicio",
      start: "top top",
      end: "bottom top",
      onUpdate: (s) => (motionState.hero = s.progress),
    });
    const fade = gsap.to(wrap.current, {
      opacity: 0.4,
      scale: 1.08,
      ease: "none",
      scrollTrigger: { trigger: "#inicio", start: "top top", end: "bottom top", scrub: 0.8 },
    });

    const onMove = (e: PointerEvent) => {
      motionState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      motionState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      page.kill();
      hero.kill();
      fade.scrollTrigger?.kill();
      fade.kill();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden className="pointer-events-none fixed inset-0 z-0 will-change-transform">
      {/* Halo de luz suave atrás da balança */}
      <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(207,182,134,0.22)_0%,rgba(248,244,236,0)_65%)]" />
      <JusticeScale reduced={reduced} />
    </div>
  );
}
