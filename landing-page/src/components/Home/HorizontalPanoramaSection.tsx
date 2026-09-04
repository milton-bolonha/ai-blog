"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PANORAMA_SERIES = [
  {
    id: 1,
    title: "Op Ordem de Produção",
    category: "Fluxo",
    image: "/box-1.jpg",
    year: "OP",
    description:
      "Do briefing à entrega: como estruturar a ordem de produção, prazos, responsabilidades e o rastro que a gráfica realmente usa no dia a dia.",
  },
  {
    id: 2,
    title: "Modelagem de Container de Impressão",
    category: "Estrutura",
    image: "/box-2.jpg",
    year: "CONTAINER",
    description:
      "Modelagem, gabaritos e dimensões exatas de containers e formatos para otimização de matrizes impressas.",
  },
  {
    id: 3,
    title: "Imposição",
    category: "Montagem",
    image: "/box-3.jpg",
    year: "CAD",
    description:
      "Distribuição e arranjo de páginas e peças na folha de impressão, reduzindo desperdício e garantindo o encaixe perfeito.",
  },
  {
    id: 4,
    title: "RIP",
    category: "Processamento",
    image: "/box-4.jpg",
    year: "RIP / RASTER",
    description:
      "Raster Image Processor: interpretação de curvas, retículas, conversão de cor e envio de dados para a gravadora de chapa ou impressora digital.",
  },
  {
    id: 5,
    title: "Acabamentos",
    category: "Peça Final",
    image: "/box-5.jpg",
    year: "ESPECIAIS",
    description:
      "Verniz, hot stamping, faca, laminação e os acabamentos que transformam o impresso em peça — e o arquivo em responsabilidade.",
  },
];

export const HorizontalPanoramaSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Traduz o scroll vertical Y em deslocamento X (0% -> -80%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <div
      id="panorama"
      ref={containerRef}
      className="relative h-[300vh] bg-[#09090b] text-white"
    >
      <div className="absolute inset-0 bg-[#09090b]/55" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />
      <div className="absolute left-[-10%] top-1/3 h-72 w-72 rounded-full bg-[#00a8c6]/10 blur-3xl pointer-events-none" />
      <div className="absolute right-[-10%] bottom-1/3 h-80 w-80 rounded-full bg-[#e4007d]/10 blur-3xl pointer-events-none" />
      {/* Sticky container preso na tela */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-10">
        <div
          className="absolute inset-0 w-full h-full bg-top bg-no-repeat opacity-85 z-[-1]"
          style={{
            backgroundImage: "url('/bg-section.jpg')",
            backgroundSize: "100% auto",
          }}
          aria-hidden="true"
        />
        {/* Cabeçalho */}
        <div className="max-w-7xl mx-auto px-6 w-full mb-8 flex justify-between items-end">
          <div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1"
              style={{ fontFamily: "Federo, serif" }}
            >
              O Que Você Vai Dominar
            </h2>
          </div>
          <span className="text-xs uppercase tracking-widest font-mono text-zinc-400 hidden md:block">
            Role para conhecer o manual &rarr;
          </span>
        </div>

        {/* Faixa Horizontal Animada via Scroll */}
        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-16 w-max">
          {PANORAMA_SERIES.map((item) => (
            <div
              key={item.id}
              className="relative w-[85vw] md:w-[60vw] lg:w-[42vw] h-[55vh] rounded-3xl overflow-hidden shadow-xl border border-zinc-800 bg-zinc-950 group shrink-0"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col justify-end space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wider text-[#ffd400] font-bold">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-zinc-800 rounded-full border border-zinc-700 text-[#00bcd4]">
                    {item.year}
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mt-1"
                  style={{ fontFamily: "Federo, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
