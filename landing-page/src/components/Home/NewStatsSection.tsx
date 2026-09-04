import React, { useState } from "react";
import { NumberCounter } from "@/components/ui/NumberCounter";
import { TextMotion } from "@/components/ui/TextMotion";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaInfoCircle } from "react-icons/fa";

import statsPT from "../../../content/home/stats.json";
import statsEN from "../../../content/home/stats.en.json";

export const NewStatsSection = () => {
  const { language } = useLanguage();
  const content =
    language === "pt" ? statsPT.statsSection : statsEN.statsSection;
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const extractNumber = (val: string) => {
    const match = val.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  return (
    <div className="relative w-full h-full bg-[#09090b] text-white py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />
      <div className="absolute left-[-10%] top-1/4 h-72 w-72 rounded-full bg-[#00a8c6]/10 blur-3xl pointer-events-none" />
      <div className="absolute right-[-10%] bottom-1/4 h-80 w-80 rounded-full bg-[#e4007d]/10 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 mb-4 shadow-sm">
            <span className="text-xs font-bold text-[#ffd400] tracking-widest uppercase">
              Instituto Organizacionista
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Federo, serif" }}
          >
            <TextMotion trigger={true} stagger={0.05}>
              {content.title || "Mais de 20 Anos de Excelência Gráfica"}
            </TextMotion>
          </h2>
          <p className="text-sm md:text-base text-zinc-300 font-sans max-w-xl mx-auto">
            {content.subtitle ||
              "Capacitação comprovada para o mercado de design, pré-impressão e gráficas"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {content.items.map((stat: any, index: number) => (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center p-8 rounded-2xl border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 hover:border-[#ffd400] hover:shadow-xl transition-all duration-300 shadow-sm"
            >
              <div className="relative flex items-center gap-2 mb-2">
                <div
                  className="text-4xl md:text-5xl font-bold text-[#ffd400] tracking-tight"
                  style={{ fontFamily: "Federo, serif" }}
                >
                  {/^\d+$/.test(stat.value) || /^\d+\+$/.test(stat.value) ? (
                    <NumberCounter
                      end={extractNumber(stat.value)}
                      prefix={stat.value.includes("$") ? "$" : undefined}
                      suffix={
                        stat.value.includes("+")
                          ? "+"
                          : stat.value.includes("k")
                            ? "k"
                            : stat.value.includes("h")
                              ? "h"
                              : undefined
                      }
                      duration={2.5}
                      className="font-bold"
                    />
                  ) : (
                    <span>{stat.value}</span>
                  )}
                </div>

                {(stat.info || stat.sublabel) && (
                  <button
                    className="text-zinc-400 hover:text-zinc-800 transition-colors focus:outline-none"
                    onMouseEnter={() => setActiveTooltip(index)}
                    onMouseLeave={() => setActiveTooltip(null)}
                    onClick={() =>
                      setActiveTooltip(activeTooltip === index ? null : index)
                    }
                  >
                    <FaInfoCircle size={13} />
                  </button>
                )}

                {(stat.info || stat.sublabel) && (
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-55 px-3.5 py-2.5 bg-zinc-900 text-white border border-zinc-700 rounded-lg text-xs transform transition-all duration-200 pointer-events-none z-30 shadow-2xl ${activeTooltip === index ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"}`}
                  >
                    <span>{stat.info || stat.sublabel}</span>
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent"
                      style={{ borderTopColor: "#09090b" }}
                    />
                  </div>
                )}
              </div>

              <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold text-center font-sans mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
