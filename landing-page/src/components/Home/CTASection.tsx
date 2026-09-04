import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import MagneticButton from "@/components/ui/MagneticButton";
import { TextMotion } from "@/components/ui/TextMotion";
import ctaData from "../../../content/home/cta.json";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { WHATSAPP_URL } from "@/lib/contacts";

export const CTASection = () => {
  const { t } = useLanguage();

  const titleText = "Conheça o manual";

  const descriptionText =
    "Domine pré-impressão, fechamento de arquivos, gerenciamento de cores, impressão digital e offset com um manual prático e material complementar pronto para consulta.";

  const buttonText = "Quero Meu Exemplar";

  return (
    <section
      id="cta"
      className="relative bg-[#fbfbfb] text-zinc-900 py-28 overflow-hidden"
    >
      {/* Luz difusa de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-[#ffd400]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="space-y-8">
          <div className="inline-block px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 shadow-sm">
            <span className="text-xs font-bold text-[#ffd400] tracking-widest uppercase">
              Manual Completo • Material Complementar Incluso
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-950 leading-tight"
            style={{ fontFamily: "Federo, serif" }}
          >
            <TextMotion trigger={true} stagger={0.05}>
              {titleText}
            </TextMotion>
          </h2>

          <p className="text-base md:text-lg text-zinc-600 font-sans max-w-2xl mx-auto leading-relaxed">
            {descriptionText}
          </p>

          <div className="pt-4">
            <MagneticButton
              href={WHATSAPP_URL}
              target="_blank"
              onClick={() => trackEvent("click", "CTA", "Final CTA - Home")}
              className="inline-flex items-center gap-3 bg-[#09090b] text-[#ffd400] hover:bg-[#ffd400] hover:text-black font-bold py-4 px-12 rounded-full transition-all duration-300 shadow-xl uppercase tracking-wider text-xs"
            >
              <span>{buttonText}</span>
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
            </MagneticButton>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 text-zinc-500 text-sm font-sans">
            <a
              href="mailto:arte@instituto.app"
              className="flex items-center gap-2 hover:text-[#ffd400] transition-colors font-medium"
            >
              <FaEnvelope className="text-[#ffd400]" />
              <span>arte@instituto.app</span>
            </a>
            <a
              href="https://wa.me/5516999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#d4af37] transition-colors font-medium"
            >
              <FaWhatsapp className="text-green-600" />
              <span>WhatsApp: (16) 99999-9999</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
