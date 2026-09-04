"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FaExpand, FaTimes, FaCheckCircle } from "react-icons/fa";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: string;
  year: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Catálogo Editorial com Hot Stamping & Verniz UV Localizado",
    category: "Acabamento Especial",
    image: "/img/foto-perfil.jpg",
    aspect: "aspect-[3/4]",
    year: "Offset",
    description:
      "Preparação de camadas de verniz e máscara de faca em canais spot separados, garantindo precisão milimétrica no registro da chapa.",
  },
  {
    id: "g2",
    title: "Embalagem Rígida e Montagem de Faca Especial",
    category: "Packaging & Facas",
    image: "/img/foto-perfil.jpg",
    aspect: "aspect-[4/5]",
    year: "Corte & Vinco",
    description:
      "Desenvolvimento técnico de linhas de corte, vinco, picote e sangrias compensadas para dobra em papel cartão duplex 350g.",
  },
  {
    id: "g3",
    title: "Revista Periódica em PDF/X-4 com Perfil Fogra 39",
    category: "Editorial & CTP",
    image: "/img/foto-perfil.jpg",
    aspect: "aspect-[1/1]",
    year: "ISO 12647-2",
    description:
      "Controle de limite total de tinta (TAC 300%), trapping de textos em preto 100% overprint e separação fiel de quadricromia CMYK.",
  },
  {
    id: "g4",
    title: "Papelaria Corporativa com Cor Especial Pantone",
    category: "Spot Colors",
    image: "/img/foto-perfil.jpg",
    aspect: "aspect-[3/4]",
    year: "Pantone",
    description:
      "Definição de canais diretos Pantone Solid Coated e Uncoated sem conversão acidental para processo CMYK.",
  },
  {
    id: "g5",
    title: "Cartaz Promocional com Alinhamento de Retícula",
    category: "Gráfica Digital",
    image: "/img/foto-perfil.jpg",
    aspect: "aspect-[4/3]",
    year: "Alta Resolução",
    description:
      "Imagens tratadas em 300 DPI na proporção final 1:1, evitando interpolação de pixels e borrões na prova contratual.",
  },
  {
    id: "g6",
    title: "Fluxo de Preflight Automatizado com PitStop Pro",
    category: "Automação",
    image: "/img/foto-perfil.jpg",
    aspect: "aspect-[3/4]",
    year: "Enfocus",
    description:
      "Criação de Action Lists para correção automática de fontes em curvas, conversão de RGB indesejado e correção de sangras.",
  },
];

// Spring config compartilhado
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
    className="group relative rounded-2xl overflow-hidden shadow-md border border-zinc-200 cursor-pointer bg-zinc-900"
    whileHover={{ scale: 1.015 }}
    transition={SPRING}
  >
    <motion.div className={`relative w-full ${item.aspect} overflow-hidden`}>
      <motion.img
        layoutId={`img-${item.id}`}
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover opacity-75 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
    </motion.div>

    <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end z-10">
      <div>
        <span className="text-xs uppercase tracking-wider text-[#d4af37] font-bold">
          {item.category}
        </span>
        <h3
          className="text-xl font-bold text-white mt-1 leading-snug"
          style={{ fontFamily: "Federo, serif" }}
        >
          {item.title}
        </h3>
      </div>
      <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
        <FaExpand size={13} />
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

  const col1Y = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);
  const col2Y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const col3Y = useTransform(scrollYProgress, [0, 1], ["100px", "10px"]);

  const col1Items = GALLERY_ITEMS.filter((_, idx) => idx % 3 === 0);
  const col2Items = GALLERY_ITEMS.filter((_, idx) => idx % 3 === 1);
  const col3Items = GALLERY_ITEMS.filter((_, idx) => idx % 3 === 2);

  return (
    <section
      id="galeria"
      ref={containerRef}
      className="relative bg-white text-zinc-900 py-28 px-6 overflow-hidden border-b border-zinc-200"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-200 pb-8">
          <div>
            <div className="inline-block px-4 py-1.5 bg-zinc-100 rounded-full border border-zinc-200 mb-3 shadow-sm">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                Casos Reais de Produção Gráfica
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-950 mt-1"
              style={{ fontFamily: "Federo, serif" }}
            >
              Conheça nossos
            </h2>
          </div>
          <p className="text-base text-zinc-600 max-w-md font-sans">
            Do fechamento de arquivos à rodagem final em máquina. Clique nos
            projetos para visualizar os detalhes técnicos.
          </p>
        </div>

        {/* Grid Parallax de Três Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div style={{ y: col1Y }} className="space-y-8">
            {col1Items.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onSelect={setSelectedItem}
              />
            ))}
          </motion.div>

          <motion.div
            style={{ y: col2Y }}
            className="space-y-8 md:pt-8 lg:pt-12"
          >
            {col2Items.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onSelect={setSelectedItem}
              />
            ))}
          </motion.div>

          <motion.div style={{ y: col3Y }} className="space-y-8 lg:pt-24">
            {col3Items.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onSelect={setSelectedItem}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modal Fullscreen com Layout Animation */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-99990 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
          >
            <motion.div
              layoutId={`card-${selectedItem.id}`}
              transition={SPRING}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-zinc-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-zinc-800"
            >
              {/* Botão Fechar */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white flex items-center justify-center transition-colors cursor-pointer border border-zinc-700"
                aria-label="Fechar Modal"
              >
                <FaTimes size={16} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
                {/* Imagem Ampliada */}
                <div className="relative h-[45vh] lg:h-[70vh] w-full bg-black">
                  <motion.img
                    layoutId={`img-${selectedItem.id}`}
                    transition={SPRING}
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Detalhes Técnicos */}
                <div className="p-8 lg:p-12 flex flex-col justify-between space-y-6 bg-zinc-900">
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-widest text-[#d4af37] font-mono font-bold">
                      {selectedItem.category} • {selectedItem.year}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-bold text-white leading-snug"
                      style={{ fontFamily: "Federo, serif" }}
                    >
                      {selectedItem.title}
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-zinc-800 text-xs font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Escola:</span>
                      <strong className="text-white">
                        Escola de Artes Gráficas e Design
                      </strong>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Padrão ISO:</span>
                      <strong className="text-[#00bcd4]">
                        ISO 12647-2 (CMYK Fogra)
                      </strong>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Formato de Entrega:</span>
                      <strong className="text-white">PDF/X-1a & PDF/X-4</strong>
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
