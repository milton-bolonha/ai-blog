import { ReactNode } from 'react';
import { FloatingContactButton } from './FloatingContactButton';
import { GlobalClickFeedback } from '../ui/Animocon';
import { FloatingLanguageSelector } from './FloatingLanguageSelector';
import { BoutiqueCursor } from './BoutiqueCursor';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-[#d4af37] selection:text-black">
      <BoutiqueCursor />
      <main className="flex-1">
        {children}
      </main>
      {/* <FloatingLanguageSelector /> */}
      <FloatingContactButton />
      <GlobalClickFeedback />
      <style>{`
        body {
          background-color: #ffffff;
        }
      `}</style>
    </div>
  );
};
