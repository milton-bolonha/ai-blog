import { useState, useEffect } from "react";
import Image from "next/image";
import { OptimizedImage } from "@/components/commons/OptimizedImage";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import MagneticButton from "@/components/ui/MagneticButton";
import { WHATSAPP_URL } from "@/lib/contacts";
import { SplitText } from "@/components/ui/SplitText";
import { FaInfoCircle } from "react-icons/fa";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import heroPT from "../../../content/home/hero.json";
import heroEN from "../../../content/home/hero.en.json";

export const Inicio = ({
  onNavigate,
}: {
  onNavigate?: (index: number) => void;
}) => {
  const { language } = useLanguage();
  const content = language === "pt" ? heroPT.hero : heroEN.hero;

  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [spinY, setSpinY] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  // Motion values para o efeito 3D de perspectiva
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-300, 300], [12, -12]), {
    damping: 20,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-12, 12]), {
    damping: 20,
    stiffness: 200,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const heroImages = [
    content.photo.url,
    "/box-1.jpg",
    "/box-2.jpg",
  ];

  const handleCardClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinY((prev) => prev + 360);

    setTimeout(() => {
      setIsSpinning(false);
    }, 750);
  };

  return (
    <section
      id="hero"
      className="relative bg-[#09090b] text-white min-h-screen w-full flex items-center overflow-hidden py-16 lg:py-20"
    >
      {/* Pattern de fundo técnico / grid de impressão */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />

      {/* Luzes difusas de fundo nas cores CMYK */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00bcd4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f43f5e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Coluna esquerda: conteúdo */}
          <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
            {/* Badge Editorial / Tradição */}
            <div className="inline-flex self-center lg:self-start items-center gap-3 px-4 py-2 bg-zinc-900/90 rounded-full border border-zinc-700/80 shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffd400] animate-pulse" />
              <span className="text-xs font-semibold text-zinc-200 tracking-widest uppercase">
                {content.badge}
              </span>
            </div>

            <div className="space-y-4">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] font-bold tracking-tight"
                style={{ fontFamily: "Federo, serif" }}
              >
                <SplitText text={content.title} delay={0.2} stagger={0.05} />
              </h1>
              <div className="text-xs uppercase tracking-widest text-[#ffd400] font-mono font-semibold">
                Ordem de Produção • Modelagem • Imposição • RIP • Acabamentos
              </div>
              <p className="text-base md:text-lg text-zinc-300 font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                {content.subtitle}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <MagneticButton
                href={WHATSAPP_URL}
                target="_blank"
                onClick={() => trackEvent("click", "CTA", "Enroll - Hero")}
                className="group relative inline-flex items-center justify-center gap-3 bg-[#ffd400] text-black hover:bg-[#ffe566] font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 uppercase tracking-wider text-xs"
              >
                <span className="relative z-10">{content.cta.primary}</span>
                <svg
                  className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="/#planos"
                  onClick={(e) => {
                    trackEvent("click", "CTA", "View Syllabus - Hero");
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(6);
                    }
                  }}
                  className="inline-flex items-center justify-center gap-3 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white font-medium py-4 px-8 rounded-full border border-zinc-700 transition-all duration-300 uppercase tracking-wider text-xs"
                >
                  {content.cta.secondary}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </MagneticButton>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-6">
              {content.stats &&
                content.stats.map((stat: any, index: number) => (
                  <div key={index} className="relative group/stat">
                    <div className="flex items-center gap-2">
                      <div
                        className="text-3xl md:text-4xl font-bold text-[#ffd400]"
                        style={{ fontFamily: "Federo, serif" }}
                      >
                        {stat.value}
                      </div>

                      {stat.info && (
                        <button
                          className="text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                          onMouseEnter={() => setActiveTooltip(index)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          onClick={() =>
                            setActiveTooltip(
                              activeTooltip === index ? null : index,
                            )
                          }
                          aria-label={`Info about ${stat.label}`}
                        >
                          <FaInfoCircle size={13} />
                        </button>
                      )}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-zinc-400 font-medium font-sans">
                      {stat.label}
                    </div>

                    {stat.info && (
                      <div
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-60 px-3.5 py-2.5 bg-zinc-900 text-zinc-100 border border-zinc-700 rounded-lg text-xs transform transition-all duration-200 pointer-events-none z-20 shadow-2xl ${activeTooltip === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                      >
                        <span>{stat.info}</span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-zinc-900" />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Hero 3D Card com Perspectiva Reativa & Flip CSS */}
          <div className="flex justify-center lg:justify-center lg:pr-10 order-1 lg:order-2 perspective-1000">
            <motion.div
              onClick={handleCardClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateY: spinY }}
              transition={{ duration: 0.75, ease: [0.4, 0.0, 0.2, 1] }}
              className="w-full max-w-[280px] sm:max-w-xs cursor-pointer select-none origin-center will-change-transform"
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="relative group w-full"
                style={{
                  perspective: 1000,
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative aspect-2/3 overflow-hidden"
                  style={{
                    transform: "translateZ(30px)",
                  }}
                >
                  <OptimizedImage
                    src="/img/foto-perfil-png.png"
                    alt={content.photo.alt}
                    fill
                    priority
                    cubeFrame={false}
                    enableFlip={false}
                    bgColor="transparent"
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none flex flex-col justify-end p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#ffd400] uppercase tracking-widest">
                        Manual Completo
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-800/80 px-2 py-0.5 rounded-full border border-zinc-700">
                        Clique para virar &rarr;
                      </span>
                    </div>
                    <span className="text-base font-bold text-white mt-1">
                      Arte-Final para Designers
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
