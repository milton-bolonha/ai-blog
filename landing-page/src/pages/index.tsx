import React, { useState, useEffect } from "react";
import { FaGamepad, FaCode, FaChalkboardTeacher, FaExpand, FaBriefcase, FaHeart } from "react-icons/fa";
import { Inicio } from "@/components/Home/Inicio";
import { AboutSection } from "@/components/Home/AboutSection";
import { FeaturedProjects } from "@/components/Home/FeaturedProjects";
import { TechStack } from "@/components/Home/TechStack";
import NewTimelineSection from "@/components/Home/NewTimelineSection";
import { NewStatsSection } from "@/components/Home/NewStatsSection";
import { FAQSection } from "@/components/Home/FAQSection";
import { CTASection } from "@/components/Home/CTASection";
import ContactSection from "@/components/Home/ContactSection";
import ExperienceShowcase from "@/components/Home/ExperienceShowcase";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import { Footer } from "@/components/commons/Footer";
import { AboutMe as TAboutMe } from "@/types/Home";
import { GetStaticProps } from "next";
import { getSortedPostsData, PostData } from "@/lib/posts";
import { useLanguage } from "@/contexts/LanguageContext";
import { getBusinessSettings, getGeneralSettings, getNavigatorSettings, getThemeSettings, getCategoriesSettings } from "@/lib/settings";
import dynamic from "next/dynamic";
import { GridBackground } from "@/components/commons/GridBackground";

const NeonFlightGame = dynamic(
  () => import("@/components/games/fly/components/NeonFlightGame"),
  { ssr: false }
);

const StrangerCraftGame = dynamic(
  () => import("@/components/games/StrangerCraftGame"),
  { ssr: false }
);

import { ClientOnly } from "@/components/commons/ClientOnly";
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

import { EditorialGallerySection } from "@/components/Home/EditorialGallerySection";
import { LensRevealSection } from "@/components/Home/LensRevealSection";
import { HorizontalPanoramaSection } from "@/components/Home/HorizontalPanoramaSection";
import { InstagramSection } from "@/components/Home/InstagramSection";

const HomeContent = ({
  home,
  allPostsData,
  businessSettings,
  generalSettings,
  navigatorSettings,
  themeSettings,
  categoriesSettings
}: HomeProps) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const themeLayout = themeSettings?.generalThemeSettings?.layoutMode || 'vertical';
  const layoutMode = themeLayout;

  // SECTIONS (Slides)
  const sections = [
    'inicio',        // 0: Hero 3D
    'galeria',       // 1: Galeria Vertical Parallax
    'lente-reveal',  // 2: Lens Reveal Mask
    'panorama',      // 3: Horizontal Scroll Panorama
    'sobre',         // 4: Sobre Larissa Canhas
    'projetos',      // 5: Categorias
    'o-que-faco',    // 6: Showcase
    'contato'        // 7: Contato
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
    title: "Larissa Canhas — Fotografia Autoral & Direção de Arte",
    description: "Portfólio de Fotografia Editorial, Retratos Fine Art e Direção Visual por Larissa Canhas.",
    siteUrl: generalSettings.siteUrl,
    slug: "/",
    author: "Larissa Canhas",
    keywords: ["fotografia", "fotografia editorial", "fine art", "retratos", "larissa canhas", "direção de arte"],
    featuredImage: `${generalSettings.siteUrl}/img/og-image.jpg`,
    topology: "page" as const,
  };

  return (
    <>
      <Seo data={seoData} />
      <ImmersiveModal />
      <ScrollContainer>
        {!isLoaded && (
          <div className="fixed inset-0 z-50 bg-[#f4ece4] text-[#1d2d44] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#1d2d44]/20 border-t-[#D47E30] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#3b5068] text-sm font-sans">Carregando galeria editorial...</p>
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

        <div className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <SlideshowLayout
            mode={layoutMode}
            currentSlide={currentSlide}
            onSlideChange={handleSlideChange}
            sections={sections}
          >
            {/* Slide 0: Hero 3D Perspective */}
            <SectionWrapper id="inicio" vPadding="py-0" fullHeight>
              <Inicio onNavigate={handleSlideChange} />
            </SectionWrapper>

            {/* Slide 1: Galeria Vertical Parallax & Modal Fullscreen (layoutId) */}
            <SectionWrapper id="galeria" vPadding="py-0">
              <EditorialGallerySection />
            </SectionWrapper>

            {/* Slide 2: Lens Reveal Mask (Máscara de Lente Interativa) */}
            <SectionWrapper id="lente-reveal" vPadding="py-0">
              <LensRevealSection />
            </SectionWrapper>

            {/* Slide 3: Panorama Scroll Horizontal (0% -> -75%) */}
            <SectionWrapper id="panorama" vPadding="py-0">
              <HorizontalPanoramaSection />
            </SectionWrapper>

            {/* Slide 4: About Larissa Canhas */}
            <SectionWrapper id="sobre" vPadding="py-0">
              <AboutSection />
            </SectionWrapper>

            {/* Slide 5: Featured Projects */}
            <SectionWrapper id="projetos" vPadding="pt-24 pb-0">
              <FeaturedProjects categories={categoriesSettings.categories} />
            </SectionWrapper>

            {/* Slide 6: Showcase Merged */}
            <SectionWrapper
              id="o-que-faco"
              vPadding="pt-24 pb-0"
              className="relative flex flex-col w-full"
              background={<GridBackground />}
            >
              <div className="mb-24">
                <ClientOnly>
                  <ExperienceShowcase
                    badge="Capítulos & Histórias"
                    title="Experiências & Registros"
                    description="Explore as diferentes coleções de fotografia documental e direção sensível por Larissa Canhas."
                    tabs={[
                      {
                        id: 'familias',
                        label: 'Gestante & Família',
                        icon: FaHeart,
                        content: {
                          type: 'slideshow',
                          manualSlideshow: true,
                          slides: [
                            { bg: "/img/thumb-insights-a.jpg", fg: "/img/thumb-insights-b.jpg" },
                            { bg: "/img/thumb-blog-a.jpg", fg: "/img/thumb-blog-b.jpg" },
                          ],
                          buttons: [
                            { text: 'Reserve seu Capítulo', variant: 'primary', link: '/contato' },
                            { text: 'Ver Coleção Família', variant: 'secondary', link: '/catalogo' },
                          ]
                        },
                      },
                      {
                        id: 'casais',
                        label: 'Casais & Celebrações',
                        icon: FaBriefcase,
                        content: {
                          type: 'slideshow',
                          manualSlideshow: true,
                          slides: [
                            { bg: "/img/thumb-wp-a.jpg", fg: "/img/thumb-wp-b.jpg" },
                            { bg: "/img/fly-1-a.jpg", fg: "/img/fly-1-b.jpg" },
                          ],
                          buttons: [
                            { text: 'Reserve seu Ensaio', variant: 'primary', link: '/contato' },
                            { text: 'Ver Galeria de Casais', variant: 'secondary', link: '/catalogo' },
                          ]
                        },
                      },
                      {
                        id: 'lifestyle',
                        label: 'Documental & Lifestyle',
                        icon: FaChalkboardTeacher,
                        content: {
                          type: 'slideshow',
                          manualSlideshow: true,
                          slides: [
                            { bg: "/img/thumb-stranger-b.jpg", fg: "/img/thumb-stranger-a.jpg" },
                          ],
                          buttons: [
                            { text: 'Conheça o Estilo', variant: 'primary', link: '/contato' },
                            { text: 'Ver Galeria Lifestyle', variant: 'secondary', link: '/catalogo' },
                          ]
                        },
                      },
                    ]}
                    defaultTab="familias"
                  />
                </ClientOnly>
              </div>

              <div className="mb-24">
                <NewStatsSection />
              </div>

              <div className="mb-12">
                <TestimonialsSection />
              </div>
            </SectionWrapper>

            {/* Slide 7: Contact Section */}
            <SectionWrapper id="contato" vPadding="pt-0 pb-0">
              <ContactSection
                contacts={[
                  { name: "Instagram", link: "https://instagram.com/larissacanhas" },
                  { name: "Email", link: "contato@larissacanhas.com.br", isMail: true },
                  { name: "Agendar Sessão", link: "/contato" },
                ]}
                title="Entre em Contato"
                formTitle="Solicite um Orçamento para seu Ensaio"
              />
            </SectionWrapper>

            {/* Instagram Section */}
            <SectionWrapper id="instagram" vPadding="pt-12 pb-0">
              <InstagramSection />
            </SectionWrapper>

            {/* Slide 8: CTA Final ("Vamos Conversar") */}
            <SectionWrapper id="cta" vPadding="pt-12 pb-0">
              <CTASection />
            </SectionWrapper>
          </SlideshowLayout>

          {/* Footer as the absolute last element */}
          <Footer />
        </div>
      </ScrollContainer>
    </>
  );
};

const Home = (props: HomeProps) => {
  return (
    <HomeContent {...props} />
  );
};

const loadHome = async () => {
  return homeData;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const home = await loadHome();
  const allPostsData = getSortedPostsData();

  const businessSettings = getBusinessSettings();
  const generalSettings = getGeneralSettings();
  const navigatorSettings = typeof getNavigatorSettings === 'function' ? getNavigatorSettings() : { enabled: true, showProgress: true }; // Temporary safety
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
