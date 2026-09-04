import { FaArrowRight } from "react-icons/fa";
import { WHATSAPP_URL } from "@/lib/contacts";

export const ProductionCTASection = () => {
  return (
    <section className="relative bg-[#09090b] text-white text-center py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />
      <div className="absolute left-0 top-0 h-0.5 w-1/4 bg-[#00a8c6]" />
      <div className="absolute left-1/4 top-0 h-0.5 w-1/4 bg-[#e4007d]" />
      <div className="absolute left-2/4 top-0 h-0.5 w-1/4 bg-[#ffd400]" />
      <div className="absolute left-3/4 top-0 h-0.5 w-1/4 bg-[#09090b]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-5"
          style={{ fontFamily: "Federo, serif" }}
        >
          Pronto para parar de aprender arte-final no erro?
        </h2>
        <p className="text-zinc-400 mb-10 text-lg leading-relaxed">
          Garanta seu exemplar de{" "}
          <strong className="text-white">
            Arte-Final para Designers: O Manual de Impressão Digital e Offset
          </strong>{" "}
          com material complementar completo para te preparar como um
          profissional de alto nível.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#ffd400] text-black font-bold py-4 px-8 rounded-full text-sm uppercase tracking-wider hover:bg-[#ffe566] transition-all duration-300"
          >
            Quero Meu Exemplar <FaArrowRight />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-zinc-700 text-zinc-300 hover:border-[#00a8c6] hover:text-[#00a8c6] font-bold py-4 px-8 rounded-full text-sm uppercase tracking-wider transition-all duration-300"
          >
            Falar com a Equipe
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductionCTASection;
