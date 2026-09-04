import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Header } from '@/components/commons/Header';
import { Footer } from '@/components/commons/Footer';
import { FaHome, FaCompass } from 'react-icons/fa';

const NotFound: NextPage = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
      <Head>
        <title>404 - Página Não Encontrada | Escola de Artes Gráficas e Design</title>
      </Head>

      <Header />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 bg-zinc-100 rounded-full border border-zinc-200 mb-6 shadow-sm">
          <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase flex items-center gap-2">
            <FaCompass /> Erro 404
          </span>
        </div>

        <h1 className="text-7xl md:text-9xl font-bold text-zinc-950 mb-4" style={{ fontFamily: 'Federo, serif' }}>
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4" style={{ fontFamily: 'Federo, serif' }}>
          Página Não Encontrada
        </h2>

        <p className="text-base text-zinc-600 max-w-md mx-auto mb-10 leading-relaxed">
          O conteúdo que você procura foi movido ou não existe mais. Navegue de volta ao início para conhecer nossas formações e cursos práticos.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-[#09090b] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-md uppercase tracking-wider text-xs cursor-pointer"
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
