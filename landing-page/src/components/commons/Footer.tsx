import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getGeneralSettings, getLinkTreeData } from '@/lib/settings';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

import businessData from '../../../content/settings/business.json';

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
      <footer className={`bg-[#1d2d44] text-[#f4ece4] border-t border-[#f4ece4]/10 ${className}`}>
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
    <footer className={`bg-[#1d2d44] text-[#f4ece4] border-t border-[#e6d8cc]/15 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="mb-4">
              <Image
                src="/mark.png"
                alt="Larissa Canhas Mark Logo"
                width={54}
                height={54}
                className="h-12 w-auto object-contain"
                unoptimized
              />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#D47E30] font-bold block mb-4">
              Antes do clique, o encontro.
            </span>
            <p className="text-[#e6d8cc]/80 leading-relaxed text-sm font-sans max-w-md">
              Fotografia documental de famílias, casais e celebrações com direção sensível.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-normal text-[#D47E30] uppercase tracking-widest block mb-4" style={{ fontFamily: 'Federo, serif' }}>
              Navegação
            </h4>
            <ul className="space-y-3 text-sm font-sans">
              <li>
                <Link href="/" className="text-[#e6d8cc]/80 hover:text-[#D47E30] transition-colors">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link href="/#galeria" className="text-[#e6d8cc]/80 hover:text-[#D47E30] transition-colors">
                  Galeria Fine Art
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-[#e6d8cc]/80 hover:text-[#D47E30] transition-colors">
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-[#e6d8cc]/80 hover:text-[#D47E30] transition-colors">
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-normal text-[#D47E30] uppercase tracking-widest mb-4" style={{ fontFamily: 'Federo, serif' }}>
              Contato & Redes
            </h4>
            <div className="space-y-3 text-sm font-sans">
              <p className="text-[#e6d8cc]/80">
                <a
                  href="mailto:contato@larissacanhas.com.br"
                  className="hover:text-[#D47E30] transition-colors"
                >
                  contato@larissacanhas.com.br
                </a>
              </p>

              {/* Social */}
              <div className="flex gap-3 pt-2">
                {linkTreeData.linkTree?.filter((link: LinkTreeItem) => link.icon !== 'FaEnvelope').map((link: LinkTreeItem, index: number) => {
                  const IconComponent = getIcon(link.icon);
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-[#e6d8cc]/10 rounded-lg hover:bg-[#D47E30] transition-colors text-[#f4ece4] hover:text-white"
                      aria-label={link.label}
                    >
                      <IconComponent />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#e6d8cc]/15 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#e6d8cc]/60 text-xs font-sans">
            <p>© {new Date().getFullYear()} Larissa Canhas Fotografia. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
