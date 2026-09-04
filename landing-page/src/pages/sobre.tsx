import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { getBusinessSettings, getGeneralSettings } from "@/lib/settings";
import { Header } from "@/components/commons/Header";
import { Footer } from "@/components/commons/Footer";
import { ProductionCTASection } from "@/components/Home/ProductionCTASection";
import {
  FaCheckCircle,
  FaPrint,
  FaPalette,
  FaLayerGroup,
  FaCogs,
  FaAward,
  FaArrowRight,
  FaUsers,
} from "react-icons/fa";

interface SobreProps {
  businessSettings: any;
  generalSettings: any;
}

const pilares = [
  {
    icon: FaPrint,
    title: "Pré-Impressão Profissional",
    desc: "Fechamento de arquivos, sangrias, trapping, geração PDF/X-4 e preflight automatizado.",
  },
  {
    icon: FaPalette,
    title: "Gerenciamento de Cores",
    desc: "RGB, CMYK, Pantone, perfis ICC, prova de cor e calibração de monitores.",
  },
  {
    icon: FaLayerGroup,
    title: "Impressão Offset e Digital",
    desc: "Processos de impressão, retícula, ganho de ponto, verniz e acabamentos especiais.",
  },
  {
    icon: FaCogs,
    title: "Automação Gráfica",
    desc: "Fluxos de trabalho com Enfocus PitStop Pro e Switch para produção escalável.",
  },
  {
    icon: FaAward,
    title: "Certificação Profissional",
    desc: "Certificado de conclusão com reconhecimento no mercado de artes gráficas.",
  },
  {
    icon: FaUsers,
    title: "+15 Mil Alunos Formados",
    desc: "Comunidade ativa de designers, arte-finalistas e profissionais gráficos.",
  },
];

const Sobre = ({ businessSettings }: SobreProps) => {
  return (
    <>
      <Head>
        <title>O Livro | Escola de Artes Gráficas e Design</title>
        <meta
          name="description"
          content="Conheça Arte-Final para Designers: O Manual de Impressão Digital e Offset, da Escola de Artes Gráficas e Design."
        />
        <meta
          property="og:title"
          content="O Livro | Escola de Artes Gráficas e Design"
        />
      </Head>

      <div className="min-h-screen bg-white text-zinc-900 font-sans">
        <Header />

        {/* Hero institucional */}
        <section className="bg-[#09090b] text-white pt-24 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-zinc-900 rounded-full border border-zinc-800 mb-6">
              <span className="text-[11px] font-mono font-bold text-[#d4af37] uppercase tracking-widest">
                Desde 1998 — Mais de duas décadas de expertise
              </span>
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "Federo, serif" }}
            >
              Arte-Final para Designers:
              <br />
              <span className="text-[#d4af37]">
                O Manual de Impressão Digital e Offset
              </span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10">
              Produzido pela Escola de Artes Gráficas e Design a partir de mais
              de{" "}
              <strong className="text-white">
                20 anos de experiência prática
              </strong>{" "}
              em gráficas digitais e offset, este manual reúne o que designers e
              arte-finalistas precisam para preparar arquivos com segurança.
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-3 bg-[#d4af37] text-black font-bold py-4 px-8 rounded-full text-sm uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-lg"
            >
              Conhecer o Livro <FaArrowRight />
            </Link>
          </div>
        </section>

        {/* Missão */}
        <section className="py-20 px-6 bg-zinc-50 border-y border-zinc-100">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800 mb-5">
                <span className="text-[11px] font-mono font-bold text-[#d4af37] uppercase tracking-widest">
                  Nossa Missão
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-zinc-950 mb-6"
                style={{ fontFamily: "Federo, serif" }}
              >
                Conheça o manual
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-6">
                Muitos designers sabem criar. Poucos sabem fechar. A Escola de
                Artes Gráficas e Design ensina o que as faculdades raramente
                ensinam: como um arquivo sai do computador e chega perfeito na
                folha — sem custos extras, sem reimpressão, sem surpresas.
              </p>
              <ul className="space-y-3">
                {[
                  "100% prático, baseado em projetos reais de gráficas",
                  "Instrutores com décadas de produção gráfica aplicada",
                  "Material complementar pronto para uso imediato",
                  "Consulta permanente, sem prazo de acesso",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-[#d4af37] mt-1 shrink-0" />
                    <span className="text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "+20", label: "Anos de Experiência" },
                { num: "+4", label: "Rotas Práticas" },
                { num: "CMYK", label: "Gestão de Cores" },
                { num: "100%", label: "Foco no Mercado" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#09090b] text-white rounded-2xl p-6 text-center border border-zinc-800"
                >
                  <div
                    className="text-3xl font-bold text-[#d4af37] mb-1"
                    style={{ fontFamily: "Federo, serif" }}
                  >
                    {stat.num}
                  </div>
                  <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pilares de formação */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-block px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800 mb-4">
                <span className="text-[11px] font-mono font-bold text-[#d4af37] uppercase tracking-widest">
                  Conteúdo do Livro
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-zinc-950"
                style={{ fontFamily: "Federo, serif" }}
              >
                O Que Você Vai Dominar
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pilares.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white border border-zinc-200 hover:border-[#d4af37] rounded-2xl p-7 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#09090b] flex items-center justify-center mb-5 group-hover:bg-[#d4af37] transition-colors duration-300">
                    <Icon className="text-[#d4af37] group-hover:text-black text-xl transition-colors duration-300" />
                  </div>
                  <h3
                    className="text-lg font-bold text-zinc-950 mb-2"
                    style={{ fontFamily: "Federo, serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProductionCTASection />

        <Footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<SobreProps> = async () => {
  const businessSettings = getBusinessSettings();
  const generalSettings = getGeneralSettings();

  return {
    props: {
      businessSettings,
      generalSettings,
    },
  };
};

export default Sobre;
