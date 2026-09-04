import { MenuCloseIcon } from "@/components/icons/MenuCloseIcon";
import { ThemeToggle } from "@/components/commons/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CustomSignInButton } from "@/components/commons/clerk/SignInButton";
import { CustomSignOutButton } from "@/components/commons/clerk/SignOutButton";
import { UserButton } from "@clerk/nextjs";
import { WHATSAPP_URL } from "@/lib/contacts";

// Importar SignedIn e SignedOut dinamicamente
const SignedIn = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignedIn),
  { ssr: false },
);
const SignedOut = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignedOut),
  { ssr: false },
);

interface MenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Menu = ({ isVisible, onClose }: MenuProps) => {
  const { t } = useLanguage();

  return (
    <div
      className={`${isVisible ? "flex" : "hidden"}
      fixed inset-0 w-full h-full bg-black bg-opacity-40 backdrop-blur-sm md:hidden
    `}
      onClick={onClose}
    >
      <div
        className="w-full bg-[#09090b] text-white h-auto shadow-2xl py-6 px-6 border-b border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-mobile.png"
              alt="Instituto Organizacionista"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg object-cover border border-zinc-700"
            />
            <span className="font-bold text-white text-base">
              Escola de Artes Gráficas e Design
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={onClose} aria-label="Fechar Menu">
              <MenuCloseIcon className="fill-white w-7 h-7" />
            </button>
          </div>
        </div>
        <nav className="flex flex-col gap-1 text-sm p-1 font-semibold uppercase tracking-wider">
          <Link
            href="/"
            onClick={onClose}
            className="w-full text-center py-3 rounded-full text-zinc-200 hover:bg-zinc-800 hover:text-[#ffd400] transition-colors"
          >
            Início
          </Link>
          <Link
            href="/#panorama"
            onClick={onClose}
            className="w-full text-center py-3 rounded-full text-zinc-200 hover:bg-zinc-800 hover:text-[#ffd400] transition-colors"
          >
            Conteúdo do Livro
          </Link>
          <Link
            href="/#o-que-faco"
            onClick={onClose}
            className="w-full text-center py-3 rounded-full text-zinc-200 hover:bg-zinc-800 hover:text-[#ffd400] transition-colors"
          >
            Material Complementar
          </Link>
          <Link
            href="/#depoimentos"
            onClick={onClose}
            className="w-full text-center py-3 rounded-full text-zinc-200 hover:bg-zinc-800 hover:text-[#ffd400] transition-colors"
          >
            Depoimentos
          </Link>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full text-center mt-2 py-3.5 rounded-full bg-[#ffd400] text-black hover:bg-[#ffe566] font-bold uppercase tracking-wider text-xs shadow-md"
          >
            Garantir Meu Exemplar
          </Link>

          {/* Botões de Login */}
          {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && (
            <div className="mt-4 flex flex-col gap-3 items-center w-full">
              <SignedIn>
                <div className="flex items-center gap-3">
                  <UserButton />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {t("auth.loggedIn") || "Logged in"}
                  </span>
                </div>
                <CustomSignOutButton />
              </SignedIn>

              <SignedOut>
                <CustomSignInButton />
              </SignedOut>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};
