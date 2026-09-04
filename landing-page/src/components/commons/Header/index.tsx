"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "./Menu";
import { useCallback, useEffect, useRef, useState } from "react";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { UserButton } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { CustomSignInButton } from "@/components/commons/clerk/SignInButton";
import { CustomSignOutButton } from "@/components/commons/clerk/SignOutButton";
import { useRouter } from "next/router";
import { ThemeToggle } from "@/components/commons/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { getMainMenu, getLogos } from "@/lib/settings";
import { WHATSAPP_URL } from "@/lib/contacts";

// Importar SignedIn e SignedOut dinamicamente para garantir que sejam renderizados apenas no cliente
const SignedIn = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignedIn),
  { ssr: false },
);
const SignedOut = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignedOut),
  { ssr: false },
);

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const headerStartRef = useRef<number | null>(null);
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

  useEffect(() => {
    const updateScrollProgress = () => {
      if (headerStartRef.current === null && headerRef.current) {
        headerStartRef.current = headerRef.current.offsetTop;
      }
      const headerTop = headerStartRef.current ?? 0;
      const scrollableDistance = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight - headerTop,
      );
      setScrollProgress(
        Math.min(
          1,
          Math.max(0, (window.scrollY - headerTop) / scrollableDistance),
        ),
      );
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="bg-[#09090b]/95 backdrop-blur-md text-zinc-100 text-sm flex py-3.5 px-6 justify-between items-center sticky top-0 z-50 shadow-lg"
    >
      <div
        className="absolute left-0 right-0 -top-1 z-10 h-0.5 bg-lime-400 origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
      {/* Barra de Calibração CMYK no topo do Header */}
      <div className="absolute top-0 left-0 right-0 z-0 h-0.5 flex">
        <div className="w-1/4 bg-[#00a8c6]" />
        <div className="w-1/4 bg-[#e4007d]" />
        <div className="w-1/4 bg-[#ffd400]" />
        <div className="w-1/4 bg-[#09090b]" />
      </div>

      {/* Brand / Logomarca */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <Image
            src="/logo-mobile.png"
            alt="Instituto Organizacionista"
            width={36}
            height={36}
            className="w-9 h-9 rounded-lg object-cover border border-zinc-700 group-hover:border-[#ffd400] transition-colors"
          />
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-bold tracking-tight text-white group-hover:text-[#ffd400] transition-colors">
              Escola de Artes Gráficas e Design
            </span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono -mt-1 hidden sm:block">
              Arte Final • Digital • Offset
            </span>
          </div>
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        className="p-1 md:hidden"
        onClick={openMenu}
        aria-label="Abrir Menu"
      >
        <MenuIcon className="fill-zinc-200 w-7 h-7" />
      </button>

      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center gap-1 lg:gap-2 ml-auto text-xs font-semibold uppercase tracking-wider">
        <Link
          href="/"
          className={`px-3.5 py-2 rounded-full transition-colors duration-200 ${
            router.pathname === "/"
              ? "bg-zinc-800 text-[#d4af37]"
              : "text-zinc-300 hover:bg-zinc-800/70 hover:text-white"
          }`}
        >
          {t("navigation.home")}
        </Link>
        <Link
          href="/#panorama"
          className="px-3.5 py-2 rounded-full text-zinc-300 hover:bg-zinc-800/70 hover:text-white transition-colors"
        >
          Conteúdo do Livro
        </Link>
        <Link
          href="/#o-que-faco"
          className="px-3.5 py-2 rounded-full text-zinc-300 hover:bg-zinc-800/70 hover:text-white transition-colors"
        >
          Material Complementar
        </Link>
        <Link
          href="/#depoimentos"
          className="px-3.5 py-2 rounded-full text-zinc-300 hover:bg-zinc-800/70 hover:text-white transition-colors"
        >
          Depoimentos
        </Link>
        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 px-5 py-2.5 rounded-full bg-[#ffd400] text-black hover:bg-[#ffe566] font-bold transition-all shadow-md hover:shadow-yellow-500/20"
        >
          Garantir Meu Exemplar
        </Link>
      </nav>

      {/* Right side actions */}
      <div className="hidden md:flex items-center gap-3">
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
