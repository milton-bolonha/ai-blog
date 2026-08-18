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
    <div className="min-h-screen bg-[#f4ece4] text-[#1d2d44] flex flex-col selection:bg-[#D47E30] selection:text-white">
      <BoutiqueCursor />
      <main className="flex-1">
        {children}
      </main>
      <FloatingLanguageSelector />
      <FloatingContactButton />
      <GlobalClickFeedback />
      <style>{`
        body {
          background-color: #f4ece4;
        }
      `}</style>
    </div>
  );
};
