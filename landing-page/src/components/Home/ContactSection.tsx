import { CopyButton } from "@/components/commons/CopyButton";
import React, { useState } from "react";
import { FaEnvelope, FaWhatsapp, FaClipboardList } from "react-icons/fa";

export interface Contact {
  name: string;
  link: string;
  isMail?: boolean;
  isDownload?: boolean;
  isWhatsapp?: boolean;
}

export interface ContactSectionProps {
  contacts?: Contact[];
  title?: string;
  formTitle?: string;
}

export default function ContactSection({
  contacts = [
    {
      name: "WhatsApp Pedagógico: (16) 99999-9999",
      link: "https://wa.me/5516999999999",
      isWhatsapp: true,
    },
    {
      name: "E-mail: arte@instituto.app",
      link: "arte@instituto.app",
      isMail: true,
    },
  ],
  title = "Garanta Seu Exemplar",
  formTitle = "Fale com a Equipe",
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [activePanel, setActivePanel] = useState<"whatsapp" | "email" | "form">(
    "whatsapp",
  );

  const whatsappContact = contacts.find((contact) => contact.isWhatsapp);
  const emailContact = contacts.find((contact) => contact.isMail);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_NETLIFY_FUNCTION_URL ||
          "/.netlify/functions/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          data.message ||
            "Mensagem enviada com sucesso! Nossa equipe entrará em contato.",
        );
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert(data.message || "Ocorreu um erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Ocorreu um erro. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <div
      id="contato"
      className="relative w-full flex flex-col bg-[#fbfbfb] text-zinc-900 pt-24 pb-20 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg-fundo-white.jpg')" }}
        aria-hidden="true"
      />
      <div className="grow flex flex-col max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-400 mb-4 shadow-sm">
            <span className="text-xs font-bold text-[#ffd400] tracking-widest uppercase">
              Aquisição & Atendimento
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-zinc-950"
            style={{ fontFamily: "Federo, serif" }}
          >
            {title}
          </h2>
          <p className="text-base text-zinc-600 max-w-2xl mx-auto font-sans">
            Fale com a gente sobre formatos físico e digital, material
            complementar incluso e condições especiais de lançamento.
          </p>
        </div>

        <div className="mx-auto w-full max-w-3xl">
          <div className="relative min-h-107.5 rounded-3xl border border-gray-200 bg-white/95 p-6 pb-24 shadow-lg md:p-10 md:pb-24">
            {activePanel === "whatsapp" && (
              <div className="flex min-h-82.5 flex-col items-center justify-center text-center">
                <FaWhatsapp className="mb-5 text-5xl text-green-600" />
                <h3
                  className="text-2xl font-bold text-zinc-950"
                  style={{ fontFamily: "Federo, serif" }}
                >
                  Atendimento pelo WhatsApp
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600">
                  Tire dúvidas sobre o conteúdo, o material complementar e as
                  formas de aquisição.
                </p>
                {whatsappContact && (
                  <a
                    href={whatsappContact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#09090b] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#ffd400] transition-colors hover:bg-[#ffd400] hover:text-black"
                  >
                    Abrir WhatsApp
                  </a>
                )}
              </div>
            )}

            {activePanel === "email" && (
              <div className="flex min-h-82.5 flex-col items-center justify-center text-center">
                <FaEnvelope className="mb-5 text-5xl text-[#00a8c6]" />
                <h3
                  className="text-2xl font-bold text-zinc-950"
                  style={{ fontFamily: "Federo, serif" }}
                >
                  Atendimento por E-mail
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600">
                  Envie sua dúvida e receba as informações completas da livro e
                  material complementar.
                </p>
                {emailContact && (
                  <div className="mt-7 flex items-center gap-3 rounded-xl bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-900">
                    <span>{emailContact.link}</span>
                    <CopyButton textToCopy={emailContact.link} />
                  </div>
                )}
              </div>
            )}

            {activePanel === "form" && (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <FaClipboardList className="text-2xl text-[#e4007d]" />
                  <div>
                    <h3
                      className="text-2xl font-bold text-zinc-950"
                      style={{ fontFamily: "Federo, serif" }}
                    >
                      {formTitle}
                    </h3>
                    <p className="text-xs text-zinc-500 font-sans">
                      Preencha os dados para falar com a equipe.
                    </p>
                  </div>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs uppercase tracking-wider font-bold text-zinc-700 mb-2 font-sans"
                    >
                      Nome Completo:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3.5 rounded-xl bg-white text-zinc-900 placeholder-zinc-400 border border-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#ffd400] transition-all font-sans text-sm"
                      placeholder="Seu Nome Completo"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-wider font-bold text-zinc-700 mb-2 font-sans"
                    >
                      E-mail Principal:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3.5 rounded-xl bg-white text-zinc-900 placeholder-zinc-400 border border-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#ffd400] transition-all font-sans text-sm"
                      placeholder="seu.email@exemplo.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-wider font-bold text-zinc-700 mb-2 font-sans"
                    >
                      Dúvidas ou Área de Atuação:
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3.5 rounded-xl bg-white text-zinc-900 placeholder-zinc-400 border border-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#ffd400] transition-all resize-none font-sans text-sm"
                      placeholder="Ex: Sou designer freelancer e quero aprender a fechar arquivos para gráfica offset..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#09090b] text-[#ffd400] hover:bg-[#ffd400] hover:text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-md uppercase tracking-wider text-xs"
                  >
                    Quero Meu Exemplar
                  </button>
                </form>
              </div>
            )}

            <nav
              className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-zinc-300 bg-white/95 p-2 shadow-xl backdrop-blur-sm"
              aria-label="Opções de contato"
            >
              <button
                type="button"
                onClick={() => setActivePanel("whatsapp")}
                aria-label="Abrir WhatsApp"
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${activePanel === "whatsapp" ? "bg-green-600 text-white shadow-md" : "text-zinc-500 hover:bg-green-50 hover:text-green-600"}`}
              >
                <FaWhatsapp className="text-xl" />
              </button>
              <button
                type="button"
                onClick={() => setActivePanel("email")}
                aria-label="Abrir e-mail"
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${activePanel === "email" ? "bg-[#00a8c6] text-white shadow-md" : "text-zinc-500 hover:bg-cyan-50 hover:text-[#00a8c6]"}`}
              >
                <FaEnvelope className="text-xl" />
              </button>
              <button
                type="button"
                onClick={() => setActivePanel("form")}
                aria-label="Abrir formulário de contato"
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${activePanel === "form" ? "bg-[#e4007d] text-white shadow-md" : "text-zinc-500 hover:bg-pink-50 hover:text-[#e4007d]"}`}
              >
                <FaClipboardList className="text-xl" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
