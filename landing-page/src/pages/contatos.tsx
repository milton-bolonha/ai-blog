import { CopyButton } from '@/components/commons/CopyButton';
import Head from 'next/head';
import React, { useState } from 'react';
import { FaEnvelope, FaWhatsapp, FaInstagram, FaYoutube, FaLink } from 'react-icons/fa';

interface ContatosProps {
  contacts: {
    name: string;
    link: string;
    isMail?: boolean;
    isWhatsapp?: boolean;
  }[];
}

const getIcon = (name: string, isMail?: boolean, isWhatsapp?: boolean) => {
  if (isMail) return <FaEnvelope className="text-[#d4af37] flex-shrink-0" />;
  if (isWhatsapp) return <FaWhatsapp className="text-[#d4af37] flex-shrink-0" />;
  if (name.toLowerCase().includes('instagram')) return <FaInstagram className="text-[#d4af37] flex-shrink-0" />;
  if (name.toLowerCase().includes('youtube')) return <FaYoutube className="text-[#d4af37] flex-shrink-0" />;
  return <FaLink className="text-[#d4af37] flex-shrink-0" />;
};

const Contatos = ({ contacts }: ContatosProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_NETLIFY_FUNCTION_URL || '/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>Contato e Matricula | Escola de Artes Graficas e Design</title>
      </Head>
      <div className="min-h-screen bg-white text-zinc-900 px-6 md:px-20 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block px-4 py-1 bg-zinc-900 rounded-full border border-zinc-800 mb-6">
            <span className="text-[11px] font-mono font-bold text-[#d4af37] uppercase tracking-widest">
              Escola de Artes Graficas e Design
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-950 mb-3" style={{ fontFamily: 'Federo, serif' }}>
            Fale com a Equipe
          </h1>
          <p className="text-zinc-600 mb-10 leading-relaxed">
            Duvidas sobre matriculas, turmas, ementa ou suporte pedagogico? Entre em contato - respondemos em ate 24 horas.
          </p>

          <ul className="space-y-4 mb-14">
            {contacts.map(({ link, name, isMail, isWhatsapp }, idx) => (
              <li key={name + idx} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#09090b] flex items-center justify-center">
                  {getIcon(name, isMail, isWhatsapp)}
                </div>
                <a
                  href={isMail ? `mailto:${link}` : isWhatsapp ? `https://wa.me/${link.replace(/\D/g, '')}` : link}
                  target={isMail ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-zinc-800 hover:text-[#d4af37] transition-colors font-semibold underline underline-offset-2"
                >
                  {name}
                </a>
                {isMail && <CopyButton textToCopy={link} />}
              </li>
            ))}
          </ul>

          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-zinc-950 mb-6" style={{ fontFamily: 'Federo, serif' }}>
              Envie uma Mensagem
            </h2>
            <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">Nome</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  placeholder="Seu nome completo" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">E-mail</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  placeholder="seu.email@exemplo.com" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">Mensagem</label>
                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent resize-none"
                  placeholder="Sua duvida ou mensagem..." required />
              </div>
              {status === 'success' && <p className="text-green-600 font-semibold text-sm">Mensagem enviada! Retornaremos em breve.</p>}
              {status === 'error' && <p className="text-red-600 font-semibold text-sm">Erro ao enviar. Tente pelo WhatsApp.</p>}
              <button type="submit" className="bg-[#09090b] text-[#d4af37] hover:bg-[#d4af37] hover:text-black font-bold py-4 px-8 rounded-full transition-all duration-300 uppercase tracking-wider text-sm">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const loadContacts = async () => {
  return [
    { name: "contato@escoladeartesgraficas.com.br", link: "contato@escoladeartesgraficas.com.br", isMail: true },
    { name: "WhatsApp: +55 (16) 99999-9999", link: "+5516999999999", isWhatsapp: true },
    { name: "@escoladeartesgraficas", link: "https://instagram.com/escoladeartesgraficas" },
  ];
};

export const getStaticProps = async () => {
  const contacts = await loadContacts();
  return { props: { contacts } };
};

export default Contatos;
