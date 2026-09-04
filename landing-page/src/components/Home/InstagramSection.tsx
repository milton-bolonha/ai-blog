import React from "react";
import { FaInstagram, FaHeart, FaComment } from "react-icons/fa";
import Link from "next/link";

export const InstagramSection = () => {
  const posts = [
    {
      id: 1,
      img: "/img/foto-perfil.jpg",
      likes: 242,
      comments: 28,
      tag: "Offset 4 Cores",
    },
    {
      id: 2,
      img: "/img/foto-perfil.jpg",
      likes: 310,
      comments: 34,
      tag: "Pré-Impressão",
    },
    {
      id: 3,
      img: "/img/foto-perfil.jpg",
      likes: 189,
      comments: 22,
      tag: "PitStop Pro",
    },
    {
      id: 4,
      img: "/img/foto-perfil.jpg",
      likes: 405,
      comments: 51,
      tag: "Hot Stamping",
    },
  ];

  return (
    <section className="relative bg-zinc-100 text-zinc-900 py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-300 pb-8">
          <div>
            <div className="inline-block px-4 py-1.5 bg-white rounded-full border border-zinc-200 mb-3 shadow-sm">
              <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                Comunidade & Bastidores
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-950"
              style={{ fontFamily: "Federo, serif" }}
            >
              Acompanhe Nossa Rotina Gráfica
            </h2>
          </div>
          <Link
            href="https://instagram.com/escoladeartesgraficas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#09090b] text-[#d4af37] hover:bg-[#d4af37] hover:text-black px-6 py-3.5 rounded-full transition-all duration-300 text-xs font-bold uppercase tracking-wider shadow-md"
          >
            <FaInstagram className="text-base" />
            <span>Siga @escoladeartesgraficas</span>
          </Link>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href="https://instagram.com/escoladeartesgraficas"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-zinc-300 bg-zinc-900"
            >
              <img
                src={post.img}
                alt="Escola de Artes Gráficas e Design"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-semibold text-sm">
                <span className="flex items-center gap-1.5">
                  <FaHeart className="text-[#d4af37]" /> {post.likes}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaComment /> {post.comments}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
