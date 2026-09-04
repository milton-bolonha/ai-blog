import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Inicio } from "@/components/Home/Inicio";
import { IntroSection } from "@/components/Home/IntroSection";
import { AboutMe as TAboutMe } from "@/types/Home";
import { GetStaticProps } from "next";
import { getSortedPostsData, PostData } from "@/lib/posts";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getBusinessSettings,
  getGeneralSettings,
  getNavigatorSettings,
  getThemeSettings,
  getCategoriesSettings,
} from "@/lib/settings";
import Seo from "@/components/commons/Seo";
import FloatingNavigator from "@/components/commons/FloatingNavigator";
import {
  ScrollContainer,
  SectionWrapper,
} from "@/components/commons/SectionWrapper";
import { SlideshowLayout } from "@/components/layouts/SlideshowLayout";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import homeData from "../../public/home.json";
import { ImmersiveModal } from "@/components/commons/ImmersiveModal";
import { Header } from "@/components/commons/Header";
import { FloatingObjects } from "@/components/Home/FloatingObjects";

const sectionFallback = () => (
  <div className="min-h-[50vh] w-full" aria-hidden />
);

const HorizontalPanoramaSection = dynamic(
  () =>
    import("@/components/Home/HorizontalPanoramaSection").then((mod) => ({
      default: mod.HorizontalPanoramaSection,
    })),
  { loading: sectionFallback },
);

const NewStatsSection = dynamic(
  () =>
    import("@/components/Home/NewStatsSection").then((mod) => ({
      default: mod.NewStatsSection,
    })),
  { loading: sectionFallback },
);

const PricingSection = dynamic(
  () =>
    import("@/components/Home/PricingSection").then((mod) => ({
      default: mod.PricingSection,
    })),
  { loading: sectionFallback },
);

const TestimonialsSection = dynamic(
  () => import("@/components/Home/TestimonialsSection"),
  { loading: sectionFallback },
);

const ContactSection = dynamic(
  () => import("@/components/Home/ContactSection"),
  { loading: sectionFallback },
);

const ProductionCTASection = dynamic(
  () => import("@/components/Home/ProductionCTASection"),
  { loading: sectionFallback },
);

const Footer = dynamic(
  () =>
    import("@/components/commons/Footer").then((mod) => ({
      default: mod.Footer,
    })),
  { loading: () => null },
);

interface HomeProps {
  home: {
    aboutMe: TAboutMe;
  };
  allPostsData: PostData[];
  businessSettings: any;
  generalSettings: any;
  navigatorSettings: any;
  themeSettings: any;
  categoriesSettings: any;
}

const HomeContent = ({
  home,
  allPostsData,
  businessSettings,
  generalSettings,
  navigatorSettings,
  themeSettings,
  categoriesSettings,
}: HomeProps) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const themeLayout =
    themeSettings?.generalThemeSettings?.layoutMode || "vertical";
  const layoutMode = themeLayout;

  // SECTIONS (Slides)
  const sections = [
    "intro",
    "header",
    "inicio",
    "depoimentos",
    "panorama",
    "o-que-faco",
    "planos",
    "contato",
  ];

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // SLIDE TRANSITION LOGIC
  const handleSlideChange = (newIndex: number) => {
    setCurrentSlide(newIndex);
  };

  const seoData = {
    title:
      "Arte-Final para Designers: O Manual de Impressão Digital e Offset | Escola de Artes Gráficas e Design",
    description:
      "Formação profissional em Arte-Final, Pré-Impressão, Fechamento de Arquivos, Impressão Digital e Offset com mais de 20 anos de experiência de mercado.",
    siteUrl: generalSettings?.siteUrl || "https://escoladeartesgraficas.com.br",
    slug: "/",
    author: "Escola de Artes Gráficas e Design",
    keywords: [
      "arte-final",
      "design gráfico",
      "pré-impressão",
      "offset",
      "gráfica digital",
      "fechamento de arquivos",
      "pitstop pro",
      "cmyk",
      "escola de artes graficas",
    ],
    featuredImage: `${generalSettings?.siteUrl || ""}/img/og-image.jpg`,
    topology: "page" as const,
  };

  return (
    <>
      <Seo data={seoData} />
      <ImmersiveModal />
      <ScrollContainer>
        {!isLoaded && (
          <div className="fixed inset-0 z-50 bg-[#09090b] text-white flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-zinc-800 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-zinc-400 tracking-wider uppercase text-xs font-mono">
                Carregando Escola de Artes Gráficas...
              </p>
            </div>
          </div>
        )}

        {/* Floating Navigator */}
        <FloatingNavigator
          config={navigatorSettings}
          mode={layoutMode}
          currentSlide={currentSlide}
          onNavigate={(index) => handleSlideChange(index)}
          sections={sections}
          isMobile={isMobile}
        />

        <div
          className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="relative">
            <FloatingObjects />
            <SlideshowLayout
              mode={layoutMode}
              currentSlide={currentSlide}
              onSlideChange={handleSlideChange}
              sections={sections}
            >
            {/* Slide 0: Selo 3D Circular Centralizado */}
            <SectionWrapper id="intro" vPadding="py-0" fullHeight>
              <IntroSection onNavigate={handleSlideChange} />
            </SectionWrapper>

            <Header />

            {/* Slide 1: Hero 3D Perspective */}
            <SectionWrapper id="inicio" vPadding="py-0" fullHeight>
              <Inicio onNavigate={handleSlideChange} />
            </SectionWrapper>

            {/* Slide 2: Depoimentos de alunos e profissionais */}
            <SectionWrapper id="depoimentos" vPadding="py-0" fullHeight>
              <TestimonialsSection />
            </SectionWrapper>

            {/* Slide 3: Panorama Scroll Horizontal (+20 Anos de História) */}
            <SectionWrapper id="panorama" vPadding="py-0">
              <HorizontalPanoramaSection />
            </SectionWrapper>

            {/* Slide 4: Resultados e métricas */}
            <SectionWrapper
              id="o-que-faco"
              vPadding="py-0"
              className="relative flex flex-col w-full bg-[#09090b]"
            >
              <NewStatsSection />
            </SectionWrapper>

            {/* Slide 5: Planos & Kits (Tabela de Preços) */}
            <SectionWrapper
              id="planos"
              vPadding="py-0"
              className="relative flex flex-col w-full bg-[#09090b]"
            >
              <PricingSection onNavigate={handleSlideChange} />
            </SectionWrapper>

            {/* Slide 8: Contact Section */}
            <SectionWrapper id="contato" vPadding="pt-0 pb-0">
              <ContactSection
                contacts={[
                  {
                    name: "WhatsApp Pedagógico: (16) 99999-9999",
                    link: "https://wa.me/5516999999999",
                    isWhatsapp: true,
                  },
                  {
                    name: "E-mail: arte@instituto.app",
                    link: "arte@instituto.app",
                    isMail: true,
                  },
                ]}
                title="Garanta Seu Exemplar"
                formTitle="Fale com a Equipe"
              />
            </SectionWrapper>

            {/* Slide 9: CTA Final */}
            <SectionWrapper id="cta" vPadding="pt-0 pb-0">
              <ProductionCTASection />
            </SectionWrapper>
          </SlideshowLayout>
          </div>

          {/* Footer as the absolute last element */}
          <Footer />
        </div>
      </ScrollContainer>
    </>
  );
};

const Home = (props: HomeProps) => {
  return <HomeContent {...props} />;
};

const loadHome = async () => {
  return homeData;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const home = await loadHome();
  const allPostsData = getSortedPostsData();

  const businessSettings = getBusinessSettings();
  const generalSettings = getGeneralSettings();
  const navigatorSettings =
    typeof getNavigatorSettings === "function"
      ? getNavigatorSettings()
      : { enabled: true, showProgress: true }; // Temporary safety
  const themeSettings = getThemeSettings();
  const categoriesSettings = getCategoriesSettings();

  return {
    props: {
      home,
      allPostsData,
      businessSettings,
      generalSettings,
      navigatorSettings,
      themeSettings,
      categoriesSettings,
    },
  };
};

export default Home;
