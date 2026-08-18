import React from 'react';
import { FaInstagram, FaHeart, FaComment } from 'react-icons/fa';
import Link from 'next/link';

export const InstagramSection = () => {
  const posts = [
    { id: 1, img: '/img/foto-perfil.jpg', likes: 142, comments: 18, tag: 'Família' },
    { id: 2, img: '/img/foto-perfil.jpg', likes: 210, comments: 24, tag: 'Gestante' },
    { id: 3, img: '/img/foto-perfil.jpg', likes: 189, comments: 15, tag: 'Lifestyle' },
    { id: 4, img: '/img/foto-perfil.jpg', likes: 305, comments: 42, tag: 'Casal' },
  ];

  return (
    <section className="relative bg-[#e6d8cc] text-[#1d2d44] py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#1d2d44]/15 pb-8">
          <div>
            <div className="inline-block px-3.5 py-1.5 bg-[#f4ece4] rounded-full border border-[#1d2d44]/15 mb-3 shadow-sm">
              <span className="text-[11px] font-bold text-[#D47E30] tracking-widest uppercase">
                Instagram
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-normal text-[#1d2d44]" style={{ fontFamily: "Federo, serif" }}>
              Janela para as próximas histórias
            </h2>
          </div>
          <Link
            href="https://instagram.com/larissacanhas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#1d2d44] text-[#f4ece4] hover:bg-[#D47E30] hover:text-white px-6 py-3 rounded-full transition-all duration-300 text-xs font-bold uppercase tracking-wider shadow-md"
          >
            <FaInstagram className="text-base" />
            <span>Siga @larissacanhas</span>
          </Link>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href="https://instagram.com/larissacanhas"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-[#1d2d44]/10 bg-[#f4ece4]"
            >
              <img
                src={post.img}
                alt="Instagram Larissa Canhas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#1d2d44]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-semibold text-sm">
                <span className="flex items-center gap-1.5"><FaHeart className="text-[#D47E30]" /> {post.likes}</span>
                <span className="flex items-center gap-1.5"><FaComment /> {post.comments}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
