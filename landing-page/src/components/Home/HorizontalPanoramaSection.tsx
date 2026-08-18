"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PANORAMA_SERIES = [
  {
    id: 1,
    title: "Família Amélie",
    category: "Fotografia de Família",
    image: "/img/foto-perfil.jpg",
    year: "2026",
  },
  {
    id: 2,
    title: "Casal Miguel & Clara",
    category: "Retratos de Casal",
    image: "/img/foto-perfil.jpg",
    year: "2025",
  },
  {
    id: 3,
    title: "Ensaio Luísa",
    category: "Gestante & Maternidade",
    image: "/img/foto-perfil.jpg",
    year: "2025",
  },
  {
    id: 4,
    title: "Celebração de Bodas",
    category: "Momentos & Legado",
    image: "/img/foto-perfil.jpg",
    year: "2024",
  },
];

export const HorizontalPanoramaSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Traduz o scroll vertical Y em deslocamento X (0% -> -75%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div id="panorama" ref={containerRef} className="relative h-[300vh] bg-[#e6d8cc] text-[#1d2d44]">
      {/* Sticky container preso na tela */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-10">
        
        {/* Cabeçalho */}
        <div className="max-w-7xl mx-auto px-6 w-full mb-8 flex justify-between items-end">
          <div>
            <div className="inline-block px-3.5 py-1.5 bg-[#f4ece4] rounded-full border border-[#1d2d44]/15 mb-2 shadow-sm">
              <span className="text-[11px] font-bold text-[#D47E30] tracking-widest uppercase">
                Fragmentos de Legado
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-normal text-[#1d2d44] mt-1" style={{ fontFamily: "Federo, serif" }}>
              O que o tempo não pode apagar
            </h2>
          </div>
          <span className="text-sm font-sans text-[#3b5068] hidden md:block">
            Deslize para navegar pelas memórias &rarr;
          </span>
        </div>

        {/* Faixa Horizontal Animada via Scroll */}
        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-16 w-max">
          {PANORAMA_SERIES.map((item) => (
            <div
              key={item.id}
              className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[55vh] rounded-3xl overflow-hidden shadow-xl border border-[#1d2d44]/15 bg-[#f4ece4] group flex-shrink-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d2d44]/90 via-[#1d2d44]/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
              
              <div className="absolute bottom-8 left-8 right-8 text-[#f4ece4] flex justify-between items-end">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#D47E30] font-bold">
                    {item.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-normal text-white mt-1" style={{ fontFamily: "Federo, serif" }}>
                    {item.title}
                  </h3>
                </div>
                <span className="text-sm font-mono text-[#f4ece4]/70">{item.year}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
