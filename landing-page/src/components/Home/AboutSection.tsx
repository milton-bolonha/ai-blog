import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { OptimizedImage } from "@/components/commons/OptimizedImage";
import { trackEvent } from "@/lib/analytics";
import { TextMotion } from "@/components/ui/TextMotion";
import aboutData from "../../../content/home/about.json";
import { FaCheckCircle } from "react-icons/fa";

export const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <div
      id="sobre"
      className="relative w-full h-full min-h-screen flex items-center bg-white text-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Image Card */}
          <div className="order-2 lg:order-1">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl">
                <OptimizedImage
                  src={aboutData.about.photo.url}
                  alt={aboutData.about.photo.alt}
                  fill
                  className="object-cover"
                  cubeFrame={true}
                  enableFlip={true}
                  bgColor="#09090b"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8">
                  <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest">
                    Escola de Artes Gráficas e Design
                  </span>
                  <span className="text-xl font-bold text-white mt-1">
                    Tradição & Maestria Técnica
                  </span>
                  <span className="text-xs text-zinc-400 mt-1">
                    Mais de duas décadas formando profissionais de alto valor
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <div className="inline-block px-4 py-1.5 bg-zinc-100 rounded-full border border-zinc-200 mb-6 shadow-sm">
                <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                  Sobre o Livro
                </span>
              </div>

              <h2
                className="text-3xl md:text-5xl font-bold text-zinc-950 mb-6 leading-tight"
                style={{ fontFamily: "Federo, serif" }}
              >
                <TextMotion trigger={true} stagger={0.05}>
                  {aboutData.about.title}
                </TextMotion>
              </h2>
            </div>

            <div className="space-y-4 text-base text-zinc-600 font-sans leading-relaxed">
              {aboutData.about.description
                .split("\n\n")
                .map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                {aboutData.about.list.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-sm font-semibold text-zinc-800"
                  >
                    <FaCheckCircle className="text-[#d4af37] text-base flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <Link
                href="/#contato"
                onClick={() => trackEvent("click", "CTA", "Enroll - About")}
                className="inline-flex items-center gap-3 bg-[#09090b] text-white hover:bg-[#d4af37] hover:text-black font-bold py-4 px-8 rounded-full transition-all duration-300 uppercase tracking-wider text-xs shadow-md"
              >
                <span>{aboutData.about.cta}</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
