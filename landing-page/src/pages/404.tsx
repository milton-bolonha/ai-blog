import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Header } from '@/components/commons/Header';
import { Footer } from '@/components/commons/Footer';
import { FaHome, FaCompass } from 'react-icons/fa';

const NotFound: NextPage = () => {
  return (
    <div className="min-h-screen bg-[#f4ece4] text-[#1d2d44] flex flex-col font-sans selection:bg-[#D47E30] selection:text-white">
      <Head>
        <title>404 - Página Não Encontrada | Larissa Canhas</title>
      </Head>

      <Header />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 max-w-4xl mx-auto">
        <div className="inline-block px-4 py-2 bg-[#e6d8cc] rounded-full border border-[#1d2d44]/15 mb-6 shadow-sm">
          <span className="text-xs font-semibold text-[#D47E30] tracking-widest uppercase flex items-center gap-2">
            <FaCompass /> Erro 404
          </span>
        </div>

        <h1 className="text-7xl md:text-9xl font-normal text-[#1d2d44] mb-4" style={{ fontFamily: 'Federo, serif' }}>
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-normal text-[#1d2d44] mb-4" style={{ fontFamily: 'Federo, serif' }}>
          Página Não Encontrada
        </h2>

        <p className="text-base text-[#3b5068] max-w-md mx-auto mb-10 leading-relaxed">
          O conteúdo que você procura foi movido ou não existe mais. Navegue de volta ao início para explorar nossa galeria autoral.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-[#D47E30] text-white hover:bg-[#b86924] font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-md uppercase tracking-wider text-xs cursor-pointer"
        >
          <FaHome className="text-sm" />
          Voltar para a Página Inicial
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
