"use client";

import React, { useState, useEffect, ReactNode } from "react";
import MagneticButton from "@/components/ui/MagneticButton";

// ============================================================================
// INTERFACES
// ============================================================================

export interface TabButton {
  text: string;
  link?: string;
  onClick?: () => void;
  variant: 'primary' | 'secondary';
  icon?: React.ComponentType<any>;
  action?: string;
}

export interface TabContent {
  type: 'slideshow' | 'game' | 'placeholder';
  // Para slideshow
  slides?: Array<{
    bg: string;
    fg: string;
  }>;
  manualSlideshow?: boolean;

  buttons?: TabButton[];
  // Para game
  gameComponent?: ReactNode;
  games?: Record<string, ReactNode>;
  // Para placeholder
  placeholderIcon?: React.ComponentType<any>;
  placeholderTitle?: string;
  placeholderDescription?: string;
}

export interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  content: TabContent;
}

export interface ExperienceShowcaseProps {
  badge?: string;
  title: string;
  description: string;
  tabs: Tab[];
  defaultTab?: string;
}

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

interface ActionButtonProps {
  button: TabButton;
  onAction?: (action: string) => void;
}

function ActionButton({ button, onAction }: ActionButtonProps) {
  const Icon = button.icon;
  const isPrimary = button.variant === 'primary';

  const handleClick = () => {
    if (button.action && onAction) {
      onAction(button.action);
    } else if (button.onClick) {
      button.onClick();
    } else if (button.link) {
      window.open(button.link, '_blank');
    }
  };

  return (
    <MagneticButton
      onClick={handleClick}
      className={`
        group relative inline-flex items-center gap-3 font-medium py-4 px-8 rounded-full 
        transition-all duration-300 cursor-pointer uppercase tracking-wider text-xs
        ${isPrimary
          ? 'bg-[#D47E30] text-white hover:bg-[#b86924] shadow-md'
          : 'bg-[#e6d8cc] text-[#1d2d44] border border-[#1d2d44]/20 hover:bg-[#dcd0c4]'
        }
      `}
    >
      <span className="relative z-10 tracking-widest text-xs font-bold">
        {button.text}
      </span>
      {Icon && <Icon className="w-4 h-4 relative z-10" />}
    </MagneticButton>
  );
}

import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import { FaExpand, FaTimes } from "react-icons/fa";

interface SlideshowContentProps {
  slides: Array<{ bg: string; fg: string }>;
  currentSlide: number;
  buttons?: TabButton[];
  onAction?: (action: string) => void;
  onHover?: (index: number | null) => void;
  onOpenModal?: (slide: { bg: string; fg: string; title: string }) => void;
}

function SlideshowContent({ slides, currentSlide, buttons, onAction, onHover, onOpenModal }: SlideshowContentProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* SLIDESHOW LAYER */}
      {slides.map((slide, index) => {
        const isCurrent = currentSlide === index;
        const currentButton = buttons && buttons[index];
        const slideTitle = currentButton ? currentButton.text : `Obra Selecionada #${index + 1}`;

        return (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-[1000ms] ease-in-out ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            {/* Background Image (Blurred & Darkened) */}
            <div className="absolute inset-0">
              <Image
                src={slide.bg}
                alt="Background"
                fill
                className="object-cover filter brightness-[0.35] blur-[8px]"
                loading="lazy"
              />
            </div>

            {/* Central Box Image (Interactive Modal Trigger) */}
            <div className="absolute inset-x-12 md:inset-x-20 top-16 md:top-20 bottom-0 flex items-center justify-center pointer-events-auto">
              <div
                onClick={() => onOpenModal && onOpenModal({ bg: slide.bg, fg: slide.fg, title: slideTitle })}
                className="group/box w-[90%] md:w-[80%] max-w-4xl h-[240px] md:h-[280px] relative border border-[#1d2d44]/30 shadow-2xl overflow-hidden rounded-2xl cursor-pointer bg-[#1d2d44]"
              >
                <Image
                  src={slide.fg}
                  alt={slideTitle}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover/box:scale-105"
                  loading="lazy"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d2d44]/90 via-[#1d2d44]/20 to-transparent opacity-50 group-hover/box:opacity-80 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#f4ece4]/90 text-[#1d2d44] font-semibold text-xs uppercase tracking-widest opacity-0 group-hover/box:opacity-100 transition-all duration-300 transform group-hover/box:scale-105 shadow-xl">
                    <FaExpand className="text-[#D47E30]" />
                    <span>Expandir Obra Em Tela Cheia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* CONTENT LAYER */}
      <div className="relative z-20 mt-24 md:mt-72 flex flex-col items-center gap-4">


        {/* Buttons */}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-6">
            {buttons.map((button, idx) => (
              <div
                key={idx}
                onMouseEnter={() => onHover && onHover(idx)}
              // Removed onMouseLeave to persist selection
              >
                <ActionButton button={button} onAction={onAction} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface GameContentProps {
  gameComponent: ReactNode;
}

function GameContent({ gameComponent }: GameContentProps) {
  return (
    <div className="w-full h-full">
      {gameComponent}
    </div>
  );
}

interface PlaceholderContentProps {
  icon?: React.ComponentType<any>;
  title: string;
  description: string;
}

function PlaceholderContent({ icon: Icon, title, description }: PlaceholderContentProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 min-h-[500px]">
      <div className="text-center p-12 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm max-w-2xl w-full">
        {Icon && <Icon className="text-6xl mb-6 mx-auto opacity-50 block" />}
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-white/60">{description}</p>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ExperienceShowcase({
  badge = "+20 Anos de Experiência",
  title,
  description,
  tabs,
  defaultTab,
}: ExperienceShowcaseProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id || '');
  const [isGameActive, setIsGameActive] = useState(false);
  const [activeGameKey, setActiveGameKey] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState<number | null>(null);
  const [isPageVisible, setIsPageVisible] = useState(true);

  const [modalSlide, setModalSlide] = useState<{ bg: string; fg: string; title: string } | null>(null);

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const slides = activeTabData?.content.slides || [];
  const isManual = activeTabData?.content.manualSlideshow;

  // Handle Page Visibility to prevent animation stacking
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible');
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Update current slide on hover (Manual Mode)
  useEffect(() => {
    if (isManual && hoveredButtonIndex !== null) {
      setCurrentSlide(hoveredButtonIndex);
    }
  }, [isManual, hoveredButtonIndex]);

  // Slideshow Interval (Pauses if game active or page hidden or Manual Mode)
  useEffect(() => {
    if (isGameActive || !isPageVisible || activeTabData?.content.type !== 'slideshow' || slides.length === 0 || isManual) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isGameActive, isPageVisible, activeTabData, slides.length, isManual]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
      {/* HEADER AREA */}
      <div className="text-center z-20 relative max-w-4xl px-6">
        {/* Badge */}
        {badge && (
          <div className="inline-block px-3.5 py-1.5 bg-[#e6d8cc] rounded-full border border-[#1d2d44]/15 mb-6 shadow-sm">
            <span className="text-[11px] font-bold text-[#D47E30] tracking-widest uppercase">
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-4xl md:text-6xl text-[#1d2d44] font-normal mb-4" style={{ fontFamily: 'Federo, serif' }}>
          {title}
        </h2>

        {/* Description */}
        <p className="text-base text-[#3b5068] font-sans max-w-2xl mx-auto leading-relaxed mb-10">
          {description}
        </p>

        {/* Tabs / Selectors */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsGameActive(false);
                  setActiveGameKey(null);
                  setCurrentSlide(0);
                }}
                className={`
                  px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-3 cursor-pointer border
                  ${activeTab === tab.id
                    ? 'bg-[#1d2d44] text-[#f4ece4] border-[#1d2d44] scale-105 shadow-md'
                    : 'bg-[#e6d8cc] text-[#1d2d44] border-[#1d2d44]/15 hover:bg-[#dcd0c4] hover:text-[#D47E30]'}
                `}
              >
                <Icon className="text-lg" />
                <span className="tracking-widest uppercase text-xs font-semibold pt-[2px]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-[600px] -mt-[100px]">
        {activeTabData && (
          <div className="w-full h-full absolute inset-0">
            {/* SLIDESHOW CONTENT */}
            {activeTabData.content.type === 'slideshow' && !isGameActive && (
              <SlideshowContent
                slides={slides}
                currentSlide={currentSlide}
                buttons={activeTabData.content.buttons}
                onAction={(action) => {
                  if (action === 'startGame') {
                    setActiveGameKey(null);
                    setIsGameActive(true);
                  } else if (action && action.startsWith('playGame:')) {
                    const key = action.split(':')[1];
                    setActiveGameKey(key);
                    setIsGameActive(true);
                  }
                }}
                onHover={setHoveredButtonIndex}
                onOpenModal={(slide) => setModalSlide(slide)}
              />
            )}

            {/* GAME CONTENT */}
            {isGameActive && (
              (() => {
                const gameNode = activeGameKey && activeTabData.content.games
                  ? activeTabData.content.games[activeGameKey]
                  : activeTabData.content.gameComponent;

                if (!gameNode) return null;

                return (
                  <GameContent gameComponent={
                    React.isValidElement(gameNode)
                      ? React.cloneElement(gameNode as React.ReactElement<any>, {
                        onExit: () => {
                          setIsGameActive(false);
                          setActiveGameKey(null);
                        }
                      })
                      : gameNode
                  } />
                );
              })()
            )}

            {/* PLACEHOLDER CONTENT */}
            {activeTabData.content.type === 'placeholder' && (
              <PlaceholderContent
                icon={activeTabData.content.placeholderIcon}
                title={activeTabData.content.placeholderTitle || 'Em Breve'}
                description={activeTabData.content.placeholderDescription || 'Conteúdo em desenvolvimento'}
              />
            )}
          </div>
        )}
      </div>

      {/* MODAL FULLSCREEN VIEWER */}
      <AnimatePresence>
        {modalSlide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalSlide(null)}
            className="fixed inset-0 z-50 bg-[#1d2d44]/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#f4ece4] text-[#1d2d44] rounded-3xl overflow-hidden shadow-2xl border border-[#1d2d44]/20 flex flex-col md:flex-row"
            >
              {/* Fechar */}
              <button
                onClick={() => setModalSlide(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#1d2d44]/80 text-white flex items-center justify-center hover:bg-[#D47E30] transition-colors cursor-pointer"
              >
                <FaTimes size={16} />
              </button>

              {/* Imagem */}
              <div className="w-full md:w-2/3 h-[320px] md:h-[500px] relative bg-black">
                <Image
                  src={modalSlide.fg || modalSlide.bg}
                  alt={modalSlide.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Conteúdo do Modal */}
              <div className="w-full md:w-1/3 p-8 flex flex-col justify-between bg-[#f4ece4]">
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-widest text-[#D47E30] font-bold block">
                    {activeTabData?.label || "Coleção Autoral"}
                  </span>
                  <h3 className="text-3xl font-normal text-[#1d2d44]" style={{ fontFamily: "Federo, serif" }}>
                    {modalSlide.title}
                  </h3>
                  <p className="text-sm text-[#3b5068] font-sans leading-relaxed">
                    Obra integrante da coleção de fotografia e direção de arte por Larissa Canhas. Conceito de iluminação autoral e enquadramento dramático.
                  </p>
                </div>

                <div className="pt-6 border-t border-[#1d2d44]/15">
                  <a
                    href="/contato"
                    onClick={() => setModalSlide(null)}
                    className="inline-flex items-center justify-center w-full bg-[#D47E30] text-white hover:bg-[#b86924] font-semibold py-3.5 px-6 rounded-full transition-all duration-300 uppercase tracking-wider text-xs shadow-md"
                  >
                    Solicitar Ensaio Semelhante
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
