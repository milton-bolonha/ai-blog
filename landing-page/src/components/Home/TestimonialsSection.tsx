import React from "react";
import { FaTwitter, FaLinkedin, FaYoutube, FaQuoteLeft, FaPlay } from "react-icons/fa";
import { OptimizedImage } from "@/components/commons/OptimizedImage";

interface Testimonial {
  id: string;
  type: 'tweet' | 'comment' | 'video' | 'card';
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
    likes: number;
    shares?: number;
    comments?: number;
  };
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    type: "card",
    author: {
      name: "Federico H.",
      role: "Milão, Itália",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    content: "Larissa tem um olhar poético e único para a iluminação de estúdio. Dirigiu nossa campanha editorial de moda em Milão com maestria. Resultado cinematográfico!",
    stats: { likes: 124 }
  },
  {
    id: "2",
    type: "card",
    author: {
      name: "Renato Q.",
      role: "Lisboa, Portugal",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    content: "A experiência do ensaio portrait com a Larissa foi transformadora. Ela consegue extrair a essência e a vulnerabilidade do fotografado com muita elegância.",
    stats: { likes: 89 }
  },
  {
    id: "3",
    type: "card",
    author: {
      name: "Ryan M.",
      role: "Denver, EUA",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    content: "Trabalhar com a Larissa na direção de arte da nossa marca foi excepcional. O cuidado com a estética fine art e a paleta de cores superou nossas expectativas.",
    stats: { likes: 56 }
  },
  {
    id: "4",
    type: "card",
    author: {
      name: "Tatiana V.",
      role: "São Paulo, BR",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    content: "Sessão impecável! A atenção aos detalhes de textura, iluminação dramática e o ambiente acolhedor fizeram toda a diferença no resultado das fotos.",
    stats: { likes: 94 }
  },
  {
    id: "5",
    type: "card",
    author: {
      name: "Nathan P.",
      role: "Richmond, EUA",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    content: "Larissa capturou imagens surreais e poéticas para nossa capa de revista. Profissionalismo admirável do conceito à entrega final.",
    stats: { likes: 78 }
  },
  {
    id: "6",
    type: "card",
    author: {
      name: "Gustavo P.",
      role: "São Paulo, BR",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    content: "Uma das diretoras de fotografia mais talentosas com quem já colaborei. Sensibilidade autoral ímpar e entrega no mais alto padrão fine art.",
    stats: { likes: 85 }
  }
];

const TestimonialCard = ({ item }: { item: Testimonial }) => {
  return (
    <div className="mb-6 break-inside-avoid shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-[#1d2d44]/15 bg-[#e6d8cc] p-6 text-[#1d2d44]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#1d2d44]/15">
            <OptimizedImage
              src={item.author.avatar}
              alt={item.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-[#1d2d44] text-sm truncate">{item.author.name}</h4>
            <div className="flex items-center gap-2 text-xs text-[#3b5068]">
              {item.author.role && <span>{item.author.role}</span>}
            </div>
          </div>
          <div className="text-[#D47E30]">
            <FaQuoteLeft className="w-3 h-3" />
          </div>
        </div>

        {/* Content */}
        <p className="text-[#1d2d44]/90 text-sm leading-relaxed mb-4 font-sans">
          {item.content}
        </p>

        {/* Stats / Footer */}
        {item.stats && (
          <div className="flex items-center gap-6 pt-4 border-t border-[#1d2d44]/10 text-xs text-[#3b5068]">
            <div className="flex items-center gap-1.5 hover:text-[#D47E30] transition-colors cursor-pointer">
              <span>❤️</span>
              <span>{item.stats.likes}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <div className="relative bg-[#f4ece4] text-[#1d2d44] w-full z-10 py-16">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#e6d8cc] rounded-full border border-[#1d2d44]/15 mb-6 shadow-sm">
            <span className="text-xs font-semibold text-[#D47E30] tracking-widest uppercase">
              Depoimentos & Avaliações
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-normal text-[#1d2d44] mb-4" style={{ fontFamily: 'Federo, serif' }}>
            O Que Dizem Nossos Clientes
          </h2>
          <p className="text-[#3b5068] max-w-2xl mx-auto font-sans">
            Experiências e opiniões de quem vivenciou a direção de fotografia autoral de Larissa Canhas.
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
