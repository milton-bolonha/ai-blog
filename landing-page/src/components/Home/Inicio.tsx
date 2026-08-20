import { useState, useEffect } from "react";
import Image from "next/image";
import { OptimizedImage } from "@/components/commons/OptimizedImage";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import MagneticButton from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/ui/SplitText";
import { FaInfoCircle } from "react-icons/fa";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import heroPT from "../../../content/home/hero.json";
import heroEN from "../../../content/home/hero.en.json";

export const Inicio = ({ onNavigate }: { onNavigate?: (index: number) => void }) => {
  const { language } = useLanguage();
  const content = language === 'pt' ? heroPT.hero : heroEN.hero;

  const [enable3D, setEnable3D] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  // Motion values para o efeito 3D de perspectiva
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-300, 300], [12, -12]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-12, 12]), { damping: 20, stiffness: 200 });

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnable3D(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#f4ece4] text-[#1d2d44] min-h-screen w-full flex items-center overflow-hidden py-12 lg:py-16"
    >
      {/* Pattern de fundo editorial */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(29,45,68,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(29,45,68,0.04)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">

          {/* Coluna esquerda: conteúdo */}
          <div className="flex flex-col gap-5 text-center lg:text-left order-2 lg:order-1">

            {/* Badge Editorial */}
            <div className="inline-flex self-center lg:self-start items-center gap-3 px-4 py-2 bg-[#e6d8cc] rounded-full border border-[#1d2d44]/15 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D47E30] animate-pulse" />
              <span className="text-xs font-semibold text-[#1d2d44] tracking-widest uppercase">
                {content.badge}
              </span>
            </div>

            <div className="space-y-4">
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl text-[#1d2d44] leading-[1.02] font-normal tracking-tight" 
                style={{ fontFamily: 'Federo, serif' }}
              >
                <SplitText text={content.title} delay={0.2} stagger={0.05} />
              </h1>
              <p className="text-lg md:text-xl text-[#3b5068] font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                {content.subtitle}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <MagneticButton>
                <Link
                  href="/contato"
                  onClick={(e) => {
                    trackEvent("click", "CTA", "Lets Talk - Hero");
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(6);
                    }
                  }}
                  className="group relative inline-flex items-center gap-3 bg-[#D47E30] text-white hover:bg-[#b86924] font-medium py-4 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span className="relative z-10 uppercase tracking-wider text-sm font-semibold">{content.cta.primary}</span>
                  <svg className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="/#projetos"
                  onClick={(e) => {
                    trackEvent("click", "CTA", "View Projects - Hero");
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(3);
                    }
                  }}
                  className="inline-flex items-center gap-3 bg-[#e6d8cc] text-[#1d2d44] hover:bg-[#dcd0c4] font-medium py-4 px-8 rounded-full border border-[#1d2d44]/20 transition-all duration-300 cursor-pointer uppercase tracking-wider text-sm"
                >
                  {content.cta.secondary}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </MagneticButton>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8 border-t border-[#1d2d44]/15">
              {content.stats && content.stats.map((stat: any, index: number) => (
                <div key={index} className="relative group/stat">
                  <div className="flex items-center gap-2">
                    <div className="text-3xl md:text-4xl font-normal text-[#1d2d44]" style={{ fontFamily: 'Federo, serif' }}>{stat.value}</div>

                    {stat.info && (
                      <button
                        className="text-[#3b5068]/60 hover:text-[#1d2d44] transition-colors focus:outline-none cursor-pointer"
                        onMouseEnter={() => setActiveTooltip(index)}
                        onMouseLeave={() => setActiveTooltip(null)}
                        onClick={() => setActiveTooltip(activeTooltip === index ? null : index)}
                        aria-label={`Info about ${stat.label}`}
                      >
                        <FaInfoCircle size={14} />
                      </button>
                    )}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#3b5068] font-medium">{stat.label}</div>

                  {stat.info && (
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[220px] px-3 py-2 bg-[#1d2d44] text-[#f4ece4] border border-[#1d2d44]/20 rounded-lg text-xs transform transition-all duration-200 pointer-events-none z-20 shadow-xl ${activeTooltip === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                      <span>{stat.info}</span>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#1d2d44]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hero 3D Card com Perspectiva Reativa */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 perspective-1000">
            <motion.div 
              className="relative group w-full max-w-md cursor-pointer"
              style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#f4ece4]" style={{ transform: "translateZ(30px)", boxShadow: "0 0 50px 30px #f4ece4" }}>
                <OptimizedImage
                  src={content.photo.url}
                  alt={content.photo.alt}
                  fill
                  priority
                  cubeFrame={true}
                  shouldLoad={enable3D}
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
