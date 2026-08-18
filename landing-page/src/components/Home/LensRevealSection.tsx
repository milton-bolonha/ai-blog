"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

interface LensRevealSectionProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const LensRevealSection: React.FC<LensRevealSectionProps> = ({
  title = "A casa deixa de ser cenário. E vira parte da história.",
  subtitle = "A bagunça boa dos brinquedos, o café na mesa de domingo, os abraços espontâneos e os pequenos rituais do cotidiano retratados em luz natural com direção sensível.",
  imageSrc = "/img/foto-perfil.jpg",
  imageAlt = "Larissa Canhas Fotografia Lifestyle",
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

  // Máscara radial dinâmica do tamanho da lente (lupa)
  const maskImage = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  return (
    <section id="lente-reveal" className="relative bg-[#1d2d44] text-[#f4ece4] py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-block px-3.5 py-1.5 bg-[#f4ece4]/10 rounded-full border border-[#f4ece4]/20 mb-2 shadow-sm">
            <span className="text-[11px] font-bold text-[#D47E30] tracking-widest uppercase">
              📷 Fotografia Lifestyle em Luz Natural
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-normal text-[#f4ece4]" style={{ fontFamily: "Federo, serif" }}>
            {title}
          </h2>
          <p className="text-base text-[#e6d8cc]/80 font-sans leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Container da Imagem com Revelação por Máscara de Lente */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden cursor-crosshair border border-[#e6d8cc]/20 shadow-2xl bg-black/40"
        >
          {/* Camada Base (Suave / Monocromática) */}
          <div className="absolute inset-0">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover filter grayscale contrast-125 opacity-40 blur-[1px]"
            />
            <div className="absolute inset-0 bg-[#1d2d44]/30" />
          </div>

          {/* Camada Revelada pela Máscara de Lente (Alta Nitidez + Inversão / Luminosidade) */}
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
              className="w-full h-full object-cover filter saturate-150 contrast-150 mix-blend-luminosity scale-105 transition-transform duration-200"
            />
            {/* Anel indicador da lente */}
            <motion.div
              className="absolute w-44 h-44 rounded-full border-2 border-[#D47E30] shadow-[0_0_30px_rgba(212,126,48,0.5)] pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{
                left: mouseX,
                top: mouseY,
              }}
            />
          </motion.div>

          {/* Badge Informativo no Rodapé do Container */}
          <div className="absolute bottom-6 left-6 z-10 px-4 py-2 bg-[#1d2d44]/80 backdrop-blur-md rounded-full border border-[#e6d8cc]/20 text-xs text-[#f4ece4] uppercase tracking-wider font-medium">
            🔍 Lente Interativa 50mm f/1.2
          </div>
        </div>
      </div>
    </section>
  );
};
