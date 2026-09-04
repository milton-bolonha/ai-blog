import React from "react";
import { FaQuoteLeft, FaStar, FaCheckCircle } from "react-icons/fa";
import { OptimizedImage } from "@/components/commons/OptimizedImage";

interface Testimonial {
  id: string;
  type: "tweet" | "comment" | "video" | "card";
  author: {
    name: string;
    handle?: string;
    avatar: string;
    role?: string;
  };
  content: string;
  date?: string;
  image?: string;
  stats?: {
    rating: number;
  };
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    type: "card",
    author: {
      name: "Rodrigo Mendes",
      role: "Arte-finalista em transição • Offset",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content:
      "Eu já tinha anos de gráfica, mas sentia que estava travado no mesmo cargo. O método me deu o vocabulário e a segurança que faltavam para assumir arquivos mais complexos — e a equipe passou a me procurar antes de gravar chapa.",
    stats: { rating: 5 },
  },
  {
    id: "2",
    type: "card",
    author: {
      name: "Camila Guimarães",
      role: "Designer editorial no início da carreira",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    content:
      "Saí da faculdade sabendo criar, mas não sabia entregar. Cada prova voltava diferente da tela. Entender cor, arquivo e o que a gráfica espera me tirou do medo — hoje eu fecho com calma e o cliente para de me cobrar retrabalho.",
    stats: { rating: 5 },
  },
  {
    id: "3",
    type: "card",
    author: {
      name: "Lucas Ferreira",
      role: "Diretor de produção • Agência",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    content:
      "O gargalo da agência era o tempo entre o layout aprovado e o arquivo que a gráfica aceitava. Organizei o fluxo da equipe com o que aprendi aqui. Menos madrugada, menos briga com fornecedor, mais previsibilidade.",
    stats: { rating: 5 },
  },
  {
    id: "4",
    type: "card",
    author: {
      name: "Tatiana Silveira",
      role: "Designer de embalagens",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    content:
      "Eu amava o que criava e chorava quando ia para a produção. A peça bonita na tela virava outra coisa no plástico. Aprender o caminho até o acabamento me devolveu o gosto de ver o trabalho nas prateleiras — do jeito que eu imaginei.",
    stats: { rating: 5 },
  },
  {
    id: "5",
    type: "card",
    author: {
      name: "Nathan Prado",
      role: "Dono de gráfica rápida",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
    content:
      "Meus operadores apagavam incêndio o dia inteiro. Padronizei o recebimento de arquivos e o time parou de perder folha e turno. Não foi um milagre: foi método, da ordem de produção ao acabamento.",
    stats: { rating: 5 },
  },
  {
    id: "6",
    type: "card",
    author: {
      name: "Gustavo Pinheiro",
      role: "Freelancer & brand designer",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    content:
      "Eu cobrava barato porque tinha medo de errar na gráfica. Quando passei a entregar arquivo redondo, o cliente parou de me tratar como executor e passou a me tratar como parceiro. Isso mudou minha renda — e a forma como eu me via.",
    stats: { rating: 5 },
  },
];

const TestimonialCard = ({ item }: { item: Testimonial }) => {
  return (
    <div className="mb-6 break-inside-avoid shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/80 p-7 text-white shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-zinc-300">
            <OptimizedImage
              src={item.author.avatar}
              alt={item.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-white text-sm truncate">
              {item.author.name}
            </h4>
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-sans">
              {item.author.role && <span>{item.author.role}</span>}
            </div>
          </div>
          <div className="text-[#ffd400]">
            <FaQuoteLeft className="w-4 h-4 opacity-70" />
          </div>
        </div>

        {/* Content */}
        <p className="text-zinc-300 text-sm leading-relaxed mb-4 font-sans">
          "{item.content}"
        </p>

        {/* Stars / Footer */}
        <div className="flex items-center justify-between pt-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1 text-[#ffd400]">
            {[...Array(item.stats?.rating || 5)].map((_, i) => (
              <FaStar key={i} className="text-xs" />
            ))}
          </div>
          <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
            <FaCheckCircle className="text-[#00a8c6]" /> Leitor Profissional
          </span>
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090b] text-white w-full z-10 py-20">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#00a8c6]/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#e4007d]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-0.5 flex"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-700 mb-4 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#ffd400]" />
            <span className="text-xs font-bold text-[#ffd400] tracking-widest uppercase">
              Depoimentos de Designers & Arte-Finalistas
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Federo, serif" }}
          >
            Testemunhos e Vidas Transformadas
          </h2>
          <p className="text-base text-zinc-300 max-w-2xl mx-auto font-sans">
            Histórias de quem estava em estágios diferentes da carreira e
            encontrou um caminho mais seguro até a produção.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
