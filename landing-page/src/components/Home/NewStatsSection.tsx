import React, { useState } from "react";
import { NumberCounter } from "@/components/ui/NumberCounter";
import { TextMotion } from "@/components/ui/TextMotion";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaInfoCircle } from "react-icons/fa";

import statsPT from "../../../content/home/stats.json";
import statsEN from "../../../content/home/stats.en.json";

export const NewStatsSection = () => {
  const { language } = useLanguage();
  const content = language === 'pt' ? statsPT.statsSection : statsEN.statsSection;
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const extractNumber = (val: string) => {
    const match = val.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  return (
    <div className="relative w-full h-full bg-[#f4ece4] text-[#1d2d44] py-12">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block px-4 py-2 bg-[#e6d8cc] rounded-full border border-[#1d2d44]/15 mb-6 shadow-sm">
            <span className="text-xs font-semibold text-[#D47E30] tracking-widest uppercase">
              Resultados & Métricas
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-normal text-[#1d2d44] mb-4" style={{ fontFamily: 'Federo, serif' }}>
            <TextMotion trigger={true} stagger={0.05}>
              Reconhecimento & Números
            </TextMotion>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {content.items.map((stat: any, index: number) => (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-[#1d2d44]/15 bg-[#e6d8cc] hover:bg-[#dcd0c4] hover:border-[#D47E30]/40 transition-all duration-500 shadow-md"
            >
              <div className="relative flex items-center gap-2 mb-2">
                <div className="text-4xl md:text-4xl font-normal text-[#1d2d44] tracking-tight" style={{ fontFamily: 'Federo, serif' }}>
                  {/^\d+$/.test(stat.value) || /^\d+\+$/.test(stat.value) ? (
                    <NumberCounter
                      end={extractNumber(stat.value)}
                      prefix={stat.value.includes('$') ? '$' : undefined}
                      suffix={stat.value.includes('+') ? '+' : (stat.value.includes('k') ? 'k' : undefined)}
                      duration={2.5}
                      className="font-normal"
                    />
                  ) : (
                    <span>{stat.value}</span>
                  )}
                </div>

                {(stat.info || stat.sublabel) && (
                  <button
                    className="text-[#3b5068]/60 hover:text-[#1d2d44] transition-colors focus:outline-none cursor-pointer"
                    onMouseEnter={() => setActiveTooltip(index)}
                    onMouseLeave={() => setActiveTooltip(null)}
                    onClick={() => setActiveTooltip(activeTooltip === index ? null : index)}
                  >
                    <FaInfoCircle size={14} />
                  </button>
                )}

                {(stat.info || stat.sublabel) && (
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] px-3 py-2 bg-[#1d2d44] text-[#f4ece4] border border-[#1d2d44]/20 rounded-lg text-xs transform transition-all duration-200 pointer-events-none z-30 shadow-xl ${activeTooltip === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}>
                    <span>{stat.info || stat.sublabel}</span>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#1d2d44]" />
                  </div>
                )}
              </div>

              <div className="text-xs uppercase tracking-wider text-[#3b5068] font-medium text-center font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
