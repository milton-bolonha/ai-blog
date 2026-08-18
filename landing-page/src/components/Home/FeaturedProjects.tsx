import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import MagneticButton from "@/components/ui/MagneticButton";
import { TextMotion } from "@/components/ui/TextMotion";
import { useEffect, useRef } from "react";
import { FaHeart, FaHome, FaGlassCheers, FaSmile, FaSun, FaCamera, FaGlobe } from "react-icons/fa";

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
  FaHeart,
  FaHome,
  FaGlassCheers,
  FaSmile,
  FaSun,
  FaCamera,
  FaGlobe,
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
            "max-glare": 0.1,
            scale: 1.02,
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
    <div id="projetos" className="relative w-full h-full min-h-screen bg-[#f4ece4] text-[#1d2d44] py-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          {/* Badge: Experiências */}
          <div className="inline-block px-3.5 py-1.5 bg-[#e6d8cc] rounded-full border border-[#1d2d44]/15 mb-4 shadow-sm">
            <span className="text-[11px] font-bold text-[#D47E30] tracking-widest uppercase">
              Experiências Fotográficas
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-4xl md:text-6xl font-normal text-[#1d2d44] mb-4 leading-tight"
            style={{ fontFamily: "Federo, serif" }}
          >
            <TextMotion trigger={true} stagger={0.05}>
              Cada história tem seus capítulos.
            </TextMotion>
          </h2>

          {/* Description */}
          <p className="text-lg text-[#3b5068] max-w-2xl mx-auto font-sans leading-relaxed">
            Experiências fotográficas documentais pensadas para guardar o essencial de cada fase da sua família.
          </p>
        </div>

        {/* 7 CATEGORY EXPERIENCES GRID */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = ICON_MAP[category.icon] || FaHeart;

            return (
              <Link
                key={category.id}
                href={`/catalogo?category=${category.id}`}
                onClick={() =>
                  trackEvent(
                    "click",
                    "Category Card",
                    `Category ${category.id} - Home`
                  )
                }
                className="group relative flex flex-col justify-between bg-[#e6d8cc] rounded-2xl p-7 border border-[#1d2d44]/15 hover:border-[#D47E30] hover:shadow-xl transition-all duration-300 shadow-sm w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#f4ece4] border border-[#1d2d44]/10 flex items-center justify-center text-[#D47E30] mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="text-xl" />
                  </div>

                  <h3 className="text-2xl font-normal text-[#1d2d44] mb-3 group-hover:text-[#D47E30] transition-colors" style={{ fontFamily: 'Federo, serif' }}>
                    {category.label}
                  </h3>

                  <p className="text-sm text-[#3b5068] font-sans leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D47E30] uppercase tracking-wider group-hover:underline pt-4 border-t border-[#1d2d44]/10">
                  <span>Conheça</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <MagneticButton>
            <Link
              href="/catalogo"
              onClick={() =>
                trackEvent("click", "CTA", "View All Items - Home")
              }
              className="inline-flex items-center gap-3 bg-[#D47E30] text-white hover:bg-[#b86924] font-semibold py-4 px-8 rounded-full transition-all duration-300 uppercase tracking-wider text-xs shadow-md"
            >
              Ver Catálogo Completo
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
