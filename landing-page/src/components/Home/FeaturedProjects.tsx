import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import MagneticButton from "@/components/ui/MagneticButton";
import { TextMotion } from "@/components/ui/TextMotion";
import { useEffect, useRef } from "react";
import {
  FaPrint,
  FaPalette,
  FaBookOpen,
  FaLayerGroup,
  FaCogs,
  FaBoxOpen,
  FaAward,
  FaCheckCircle,
} from "react-icons/fa";

interface Category {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface FeaturedProjectsProps {
  categories: Category[];
}

// Icon mapping
const ICON_MAP: Record<string, any> = {
  FaPrint,
  FaPalette,
  FaBookOpen,
  FaLayerGroup,
  FaCogs,
  FaBoxOpen,
  FaAward,
  FaCheckCircle,
};

export const FeaturedProjects = ({ categories }: FeaturedProjectsProps) => {
  const { t } = useLanguage();
  const tiltRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    import("vanilla-tilt").then((VanillaTilt) => {
      tiltRefs.current.forEach((ref) => {
        if (ref) {
          VanillaTilt.default.init(ref, {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.08,
            scale: 1.015,
          });
        }
      });
    });

    return () => {
      tiltRefs.current.forEach((ref) => {
        if (ref && (ref as any).vanillaTilt) {
          (ref as any).vanillaTilt.destroy();
        }
      });
    };
  }, [categories]);

  return (
    <div
      id="projetos"
      className="relative w-full h-full min-h-screen bg-[#fbfbfb] text-zinc-900 py-24"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          {/* Badge: Programa */}
          <div className="inline-block px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 mb-4 shadow-sm">
            <span className="text-xs font-bold text-[#ffd400] tracking-widest uppercase">
              Conteúdo do Livro
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-950 mb-4 leading-tight"
            style={{ fontFamily: "Federo, serif" }}
          >
            <TextMotion trigger={true} stagger={0.05}>
              Conheça nossos
            </TextMotion>
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Do básico ao avançado, com foco total nas necessidades reais de
            gráficas, agências e estúdios de design.
          </p>
        </div>

        {/* 7 CATEGORY EXPERIENCES GRID */}
        <div className="flex flex-wrap justify-center gap-6 mb-14">
          {categories.map((category, index) => {
            const Icon = ICON_MAP[category.icon] || FaPrint;

            return (
              <div
                key={category.id}
                ref={(el) => {
                  tiltRefs.current[index] = el;
                }}
                className="group relative flex flex-col justify-between bg-white rounded-2xl p-8 border border-zinc-200 hover:border-[#d4af37] hover:shadow-xl transition-all duration-300 shadow-sm w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-[#ffd400] mb-6 group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="text-xl" />
                  </div>

                  <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                    Módulo 0{index + 1}
                  </span>

                  <h3
                    className="text-xl font-bold text-zinc-950 mb-3 group-hover:text-[#d4af37] transition-colors"
                    style={{ fontFamily: "Federo, serif" }}
                  >
                    {category.label}
                  </h3>

                  <p className="text-sm text-zinc-600 font-sans leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-500">
                  <span className="flex items-center gap-1.5 text-zinc-700">
                    <FaCheckCircle className="text-[#d4af37]" />
                    Prática de Produção
                  </span>
                  <span className="font-mono text-[11px] text-[#00bcd4]">
                    100% Mercado
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <MagneticButton>
            <Link
              href="/#contato"
              onClick={() =>
                trackEvent("click", "CTA", "Enroll - Projects Section")
              }
              className="inline-flex items-center gap-3 bg-[#09090b] text-white hover:bg-[#d4af37] hover:text-black font-bold py-4 px-10 rounded-full transition-all duration-300 uppercase tracking-wider text-xs shadow-lg"
            >
              Garantir Meu Exemplar
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};
