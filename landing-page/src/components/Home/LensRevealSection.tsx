"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { FaSearchPlus, FaCrosshairs } from "react-icons/fa";

interface LensRevealSectionProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const LensRevealSection: React.FC<LensRevealSectionProps> = ({
  title = "Conheça nossos",
  subtitle = "A excelência da produção gráfica começa muito antes da impressão — com controle de qualidade, perfis corretos e atenção real aos detalhes técnicos.",
  imageSrc = "/img/foto-perfil.jpg",
  imageAlt = "Inspeção Gráfica e Retícula CMYK",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(200);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Máscara radial dinâmica do tamanho do conta-fios
  const maskImage = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  return (
    <section
      id="lente-reveal"
      className="relative bg-[#09090b] text-white py-28 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-700 mb-2 shadow-sm">
            <FaCrosshairs className="text-[#00bcd4] text-xs" />
            <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
              Controle de Qualidade & Pré-Impressão
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "Federo, serif" }}
          >
            {title}
          </h2>
          <p className="text-base text-zinc-400 font-sans leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Container da Imagem com Revelação por Máscara de Conta-Fios */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full h-450 md:h-550 rounded-3xl overflow-hidden cursor-crosshair border border-zinc-800 shadow-2xl bg-zinc-950"
        >
          {/* Camada Base (Monocromática / Prova de Máquina) */}
          <div className="absolute inset-0">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover filter grayscale contrast-125 opacity-30 blur-[1px]"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Camada Revelada pelo Conta-Fios (Cromia Completa CMYK + Nitidez 100%) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              maskImage: maskImage,
              WebkitMaskImage: maskImage,
            }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover filter saturate-150 contrast-125 scale-105 transition-transform duration-200"
            />
            {/* Anel indicador do conta-fios */}
            <motion.div
              className="absolute w-44 h-44 rounded-full border-2 border-[#d4af37] shadow-[0_0_35px_rgba(212,175,55,0.4)] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                left: mouseX,
                top: mouseY,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00bcd4]" />
            </motion.div>
          </motion.div>

          {/* Badge Informativo no Rodapé do Container */}
          <div className="absolute bottom-6 left-6 z-10 px-4 py-2 bg-zinc-900/90 backdrop-blur-md rounded-full border border-zinc-700 text-xs text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-2 shadow-lg">
            <FaSearchPlus className="text-[#d4af37]" />
            <span>Conta-Fios 50x • Verificação de Roseta & Ganho de Ponto</span>
          </div>
        </div>
      </div>
    </section>
  );
};
