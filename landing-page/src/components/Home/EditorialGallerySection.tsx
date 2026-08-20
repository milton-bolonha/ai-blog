"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaExpand, FaTimes } from "react-icons/fa";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: string;
  year: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Primeiros Passos",
    category: "Gestante",
    image: "/img/foto-perfil.jpg",
    aspect: "aspect-[3/4]",
    year: "2026",
  },
  {
    id: "g2",
    title: "Ternura Silenciosa",
    category: "Recém-nascido",
    image: "/img/foto-perfil.jpg",
    aspect: "aspect-[4/5]",
    year: "2026",
  },
  {
    id: "g3",
    title: "Manhã no Lar",
    category: "Família",
    image: "/img/foto-perfil.jpg",
    aspect: "aspect-[1/1]",
    year: "2025",
  },
  {
    id: "g4",
    title: "Cumplicidade & Afeto",
    category: "Casal",
    image: "/img/foto-perfil.jpg",
    aspect: "aspect-[3/4]",
    year: "2025",
  },
  {
    id: "g5",
    title: "Renovação de Votos",
    category: "Celebração",
    image: "/img/foto-perfil.jpg",
    aspect: "aspect-[4/3]",
    year: "2025",
  },
  {
    id: "g6",
    title: "Rituais do Cotidiano",
    category: "Lifestyle",
    image: "/img/foto-perfil.jpg",
    aspect: "aspect-[3/4]",
    year: "2024",
  },
];

// Spring config compartilhado — dá o efeito App Store fluido
const SPRING = { type: "spring" as const, stiffness: 300, damping: 30 };

// ─── GalleryCard ──────────────────────────────────────────────────────────────
interface GalleryCardProps {
  item: GalleryItem;
  onSelect: (item: GalleryItem) => void;
}

const GalleryCard = ({ item, onSelect }: GalleryCardProps) => (
  <motion.div
    layoutId={`card-${item.id}`}
    onClick={() => onSelect(item)}
    className="group relative rounded-2xl overflow-hidden shadow-xl border border-[#1d2d44]/15 cursor-pointer bg-[#e6d8cc] hover-lily"
    whileHover={{ scale: 1.015 }}
    transition={SPRING}
  >
    <motion.div className={`relative w-full ${item.aspect} overflow-hidden`}>
      <motion.img
        layoutId={`img-${item.id}`}
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1d2d44]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
    </motion.div>

    <div className="absolute bottom-6 left-6 right-6 text-[#f4ece4] flex justify-between items-end z-10">
      <div>
        <span className="text-xs uppercase tracking-wider text-[#D47E30] font-bold">
          {item.category}
        </span>
        <h3 className="text-2xl font-normal text-white mt-1" style={{ fontFamily: "Federo, serif" }}>
          {item.title}
        </h3>
      </div>
      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <FaExpand size={14} />
      </div>
    </div>
  </motion.div>
);

// ─── EditorialGallerySection ──────────────────────────────────────────────────
export const EditorialGallerySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Parallax Scroll de Três Colunas
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Coluna 1 sobe mais rápido, Coluna 2 desce mais suavemente, Coluna 3 intermediária
  const col1Y = useTransform(scrollYProgress, [0, 1], ["0px", "-140px"]);
  const col2Y = useTransform(scrollYProgress, [0, 1], ["60px", "-60px"]);
  const col3Y = useTransform(scrollYProgress, [0, 1], ["120px", "20px"]);

  const col1Items = GALLERY_ITEMS.filter((_, idx) => idx % 3 === 0);
  const col2Items = GALLERY_ITEMS.filter((_, idx) => idx % 3 === 1);
  const col3Items = GALLERY_ITEMS.filter((_, idx) => idx % 3 === 2);

  return (
    <section id="galeria" ref={containerRef} className="relative bg-[#f4ece4] text-[#1d2d44] py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#1d2d44]/15 pb-8">
          <div>
            <div className="inline-block px-3.5 py-1.5 bg-[#e6d8cc] rounded-full border border-[#1d2d44]/15 mb-3 shadow-sm">
              <span className="text-[11px] font-bold text-[#D47E30] tracking-widest uppercase">
                Galeria Documental Parallax
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-normal text-[#1d2d44] mt-1" style={{ fontFamily: "Federo, serif" }}>
              Um Fragmento de Cada História
            </h2>
          </div>
          <p className="text-base text-[#3b5068] max-w-md font-sans">
            Narrativas visuais capturadas na luz espontânea do dia a dia. Clique para abrir em tela cheia.
          </p>
        </div>

        {/* Grid Parallax de Três Colunas Assimétricas no Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <motion.div style={{ y: col1Y }} className="space-y-8">
            {col1Items.map((item) => (
              <GalleryCard key={item.id} item={item} onSelect={setSelectedItem} />
            ))}
          </motion.div>

          <motion.div style={{ y: col2Y }} className="space-y-8 md:pt-8 lg:pt-12">
            {col2Items.map((item) => (
              <GalleryCard key={item.id} item={item} onSelect={setSelectedItem} />
            ))}
          </motion.div>

          <motion.div style={{ y: col3Y }} className="space-y-8 lg:pt-24">
            {col3Items.map((item) => (
              <GalleryCard key={item.id} item={item} onSelect={setSelectedItem} />
            ))}
          </motion.div>

        </div>
      </div>

      {/* Modal Fullscreen com Layout Animation (layoutId) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[99990] bg-[#1d2d44]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
          >
            <motion.div
              layoutId={`card-${selectedItem.id}`}
              transition={SPRING}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#f4ece4] text-[#1d2d44] rounded-3xl overflow-hidden shadow-2xl border border-[#e6d8cc]"
            >
              {/* Botão Fechar */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-[#1d2d44]/80 hover:bg-[#1d2d44] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fechar Modal"
              >
                <FaTimes size={18} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
                {/* Imagem Ampliada em Modal com layoutId */}
                <div className="relative h-[50vh] lg:h-[75vh] w-full bg-black">
                  <motion.img
                    layoutId={`img-${selectedItem.id}`}
                    transition={SPRING}
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Detalhes da Fotografia */}
                <div className="p-8 lg:p-12 flex flex-col justify-between space-y-8 bg-[#f4ece4]">
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-widest text-[#D47E30] font-bold">
                      {selectedItem.category} • {selectedItem.year}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-normal text-[#1d2d44]" style={{ fontFamily: "Federo, serif" }}>
                      {selectedItem.title}
                    </h3>
                    <p className="text-base text-[#3b5068] leading-relaxed">
                      Fotografia capturada por Larissa Canhas. Direção de iluminação natural e composição autoral para coleções exclusivas.
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-[#1d2d44]/15 text-sm">
                    <div className="flex justify-between text-[#3b5068]">
                      <span>Fotógrafa:</span>
                      <strong className="text-[#1d2d44]">Larissa Canhas</strong>
                    </div>
                    <div className="flex justify-between text-[#3b5068]">
                      <span>Formato:</span>
                      <strong className="text-[#1d2d44]">Digital & Print Fine Art</strong>
                    </div>
                    <div className="flex justify-between text-[#3b5068]">
                      <span>Edição:</span>
                      <strong className="text-[#1d2d44]">Limitada / Assinada</strong>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
