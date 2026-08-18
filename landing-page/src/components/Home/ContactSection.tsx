import { CopyButton } from '@/components/commons/CopyButton';
import React, { useState } from 'react';
import { Footer } from '@/components/commons/Footer';
import { FaDownload } from 'react-icons/fa';

export interface Contact {
  name: string;
  link: string;
  isMail?: boolean;
  isDownload?: boolean;
}

export interface ContactSectionProps {
  contacts: Contact[];
  title?: string;
  formTitle?: string;
}

export default function ContactSection({
  contacts,
  title = "Contatos",
  formTitle = "Solicite um Orçamento"
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_NETLIFY_FUNCTION_URL || '/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Mensagem enviada com sucesso!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        alert(data.message || 'Ocorreu um erro ao enviar.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ocorreu um erro. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#f4ece4] text-[#1d2d44] py-20">
      <div className="flex-grow flex flex-col justify-center max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#e6d8cc] rounded-full border border-[#1d2d44]/15 mb-6 shadow-sm">
            <span className="text-xs font-semibold text-[#D47E30] tracking-widest uppercase">Contato & Agendamento</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-normal mb-4 text-[#1d2d44]" style={{ fontFamily: 'Federo, serif' }}>
            {title}
          </h2>
          <p className="text-base text-[#3b5068] max-w-2xl mx-auto font-sans">
            Entre em contato para agendar ensaios, conversar sobre produções editoriais ou tirar dúvidas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-normal text-[#1d2d44] mb-6" style={{ fontFamily: 'Federo, serif' }}>Meus Canais</h3>
            <ul className="space-y-4">
              {contacts.map(({ link, name, isMail, isDownload }, idx) => (
                <li
                  key={name + idx}
                  className="flex items-center gap-4 p-4 bg-[#e6d8cc] rounded-xl border border-[#1d2d44]/15 hover:border-[#D47E30]/40 transition-all duration-300 shadow-sm"
                >
                  <span className="text-xl text-[#D47E30]">
                    {isMail ? "📧" : isDownload ? <FaDownload /> : "🔗"}
                  </span>
                  <a
                    href={isMail ? `mailto:${link}` : link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1d2d44] hover:text-[#D47E30] transition-colors font-medium text-base flex-1"
                    download={isDownload}
                  >
                    {name}
                  </a>
                  {isMail && <CopyButton textToCopy={link} />}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Form */}
          <div className="space-y-6 bg-[#e6d8cc] p-8 rounded-2xl border border-[#1d2d44]/15 shadow-md">
            <h3 className="text-2xl font-normal text-[#1d2d44] mb-4" style={{ fontFamily: 'Federo, serif' }}>{formTitle}</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wider font-semibold text-[#3b5068] mb-2 font-sans">
                  Nome:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#f4ece4] text-[#1d2d44] placeholder-[#3b5068]/50 border border-[#1d2d44]/15 focus:outline-none focus:ring-2 focus:ring-[#D47E30] transition-all font-sans text-sm"
                  placeholder="Seu Nome Completo"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold text-[#3b5068] mb-2 font-sans">
                  E-mail:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#f4ece4] text-[#1d2d44] placeholder-[#3b5068]/50 border border-[#1d2d44]/15 focus:outline-none focus:ring-2 focus:ring-[#D47E30] transition-all font-sans text-sm"
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold text-[#3b5068] mb-2 font-sans">
                  Mensagem / Projeto:
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#f4ece4] text-[#1d2d44] placeholder-[#3b5068]/50 border border-[#1d2d44]/15 focus:outline-none focus:ring-2 focus:ring-[#D47E30] transition-all resize-none font-sans text-sm"
                  placeholder="Detalhes do ensaio ou orçamento..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#D47E30] text-white font-semibold py-4 px-6 rounded-xl hover:bg-[#b86924] transition-all duration-300 shadow-md uppercase tracking-wider text-xs cursor-pointer"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
