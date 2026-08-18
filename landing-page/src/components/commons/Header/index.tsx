"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from './Menu';
import { useCallback, useState } from 'react';
import { MenuIcon } from '@/components/icons/MenuIcon';
import { UserButton } from "@clerk/nextjs";
import dynamic from 'next/dynamic';
import { CustomSignInButton } from "@/components/commons/clerk/SignInButton";
import { CustomSignOutButton } from "@/components/commons/clerk/SignOutButton";
import { useRouter } from 'next/router';
import { ThemeToggle } from '@/components/commons/ThemeToggle';
import { LanguageSwitcher } from '@/components/commons/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { getMainMenu, getLogos } from '@/lib/settings';

// Importar SignedIn e SignedOut dinamicamente para garantir que sejam renderizados apenas no cliente
const SignedIn = dynamic(() => import("@clerk/nextjs").then((mod) => mod.SignedIn), { ssr: false });
const SignedOut = dynamic(() => import("@clerk/nextjs").then((mod) => mod.SignedOut), { ssr: false });

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();
  const mainMenu = getMainMenu();
  const logos = getLogos();

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      className="bg-[#f4ece4]/90 backdrop-blur-md text-[#1d2d44] text-sm flex py-4 px-6 justify-between items-center sticky top-0 z-50 border-b border-[#1d2d44]/10"
    >
      {/* Brand / Logomarca */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <Image
            src="/logo.png"
            alt="Larissa Canhas Logomarca"
            width={240}
            height={72}
            className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            priority
            unoptimized
          />
          <span className="text-xl md:text-2xl font-normal tracking-wide text-[#1d2d44] group-hover:text-[#D47E30] transition-colors hidden sm:inline-block" style={{ fontFamily: 'Federo, serif' }}>
            Larissa Canhas
          </span>
        </Link>
      </div>

      {/* Mobile menu button */}
      <button className="p-1 md:hidden cursor-pointer" onClick={openMenu} aria-label="Abrir Menu">
        <MenuIcon className="fill-[#1d2d44] w-8 h-8" />
      </button>

      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center gap-3 text-sm font-medium">
        <Link
          href="/"
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${router.pathname === '/'
              ? 'bg-[#1d2d44] text-[#f4ece4]'
              : 'text-[#1d2d44] hover:bg-[#e6d8cc] hover:text-[#D47E30]'
            }`}
        >
          {t('navigation.home')}
        </Link>
        <Link
          href="/#galeria"
          className="px-4 py-2 rounded-full text-[#1d2d44] hover:bg-[#e6d8cc] hover:text-[#D47E30] transition-colors"
        >
          Galeria Fine Art
        </Link>
        <Link
          href="/sobre"
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${router.pathname === '/sobre'
              ? 'bg-[#1d2d44] text-[#f4ece4]'
              : 'text-[#1d2d44] hover:bg-[#e6d8cc] hover:text-[#D47E30]'
            }`}
        >
          {t('navigation.about')}
        </Link>
        <Link
          href="/contato"
          className="px-5 py-2.5 rounded-full bg-[#D47E30] text-white hover:bg-[#b86924] font-semibold transition-colors shadow-sm"
        >
          Agendar Ensaio
        </Link>
      </nav>

      {/* Right side actions */}
      <div className="hidden md:flex items-center gap-4">
        <LanguageSwitcher />
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && (
          <>
            <SignedIn>
              <UserButton />
              <CustomSignOutButton />
            </SignedIn>

            <SignedOut>
              <CustomSignInButton />
            </SignedOut>
          </>
        )}
      </div>

      <Menu isVisible={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};
