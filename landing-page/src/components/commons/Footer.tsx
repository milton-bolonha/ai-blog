import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getGeneralSettings, getLinkTreeData } from "@/lib/settings";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

import businessData from "../../../content/settings/business.json";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/contacts";

interface LinkTreeItem {
  href: string;
  label: string;
  icon: string;
}

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = "" }: FooterProps) => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const linkTreeData = getLinkTreeData();

  useEffect(() => {
    setMounted(true);
  }, []);

  const businessSettings = businessData;

  if (!mounted) {
    return (
      <footer
        className={`bg-[#1d2d44] text-[#f4ece4] border-t border-[#f4ece4]/10 ${className}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="h-64"></div>
        </div>
      </footer>
    );
  }

  const getIcon = (iconName: string): (() => React.JSX.Element) => {
    const icons: { [key: string]: () => React.JSX.Element } = {
      FaLinkedin: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      FaGithub: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    };
    return icons[iconName] || (() => <span className="w-5 h-5 block" />);
  };

  return (
    <footer className={`relative bg-[#09090b] text-zinc-300 ${className}`}>
      {/* Barra de Calibração CMYK */}
      <div className="absolute top-0 left-0 right-0 h-0.5 flex">
        <div className="w-1/4 bg-[#00a8c6]" />
        <div className="w-1/4 bg-[#e4007d]" />
        <div className="w-1/4 bg-[#ffd400]" />
        <div className="w-1/4 bg-[#09090b]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-mobile.png"
                alt="Instituto Organizacionista"
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl object-cover border border-zinc-700"
              />
              <div>
                <span className="text-lg font-bold tracking-tight text-white block">
                  Escola de Artes Gráficas e Design
                </span>
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
                  Arte Final • Digital • Offset
                </span>
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed text-sm font-sans max-w-md">
              O Instituto Organizacionista é especializado em produzir manual
              prático técnico de qualidade, com material complementar pedagógico
              especializado.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-[#d4af37]">
              <span>Ordem de Produção</span>
              <span>•</span>
              <span>Modelagem</span>
              <span>•</span>
              <span>Imposição</span>
              <span>•</span>
              <span>RIP</span>
              <span>•</span>
              <span>Acabamentos</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-widest block mb-4">
              Navegação
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              <li>
                <Link
                  href="/"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/#projetos"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Conteúdo do Livro
                </Link>
              </li>
              <li>
                <Link
                  href="/#o-que-faco"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Material Complementar
                </Link>
              </li>
              <li>
                <Link
                  href="/#contato"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Aquisição & Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-widest mb-4">
              Atendimento e Aquisição
            </h4>
            <div className="space-y-3 text-sm font-sans">
              <p className="text-zinc-400">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-zinc-400">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] transition-colors"
                >
                  WhatsApp: (16) 99999-9999
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 text-center">
          <div className="text-zinc-500 text-xs font-sans">
            <p>
              © {new Date().getFullYear()} Escola de Artes Gráficas e Design.
              Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
