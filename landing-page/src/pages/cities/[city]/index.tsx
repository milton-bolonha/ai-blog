import { GetStaticPaths, GetStaticProps } from 'next';
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getBusinessSettings, getGeneralSettings } from "@/lib/settings";
import { getSortedPostsData, PostData } from "@/lib/posts";
import { ClientOnly } from "@/components/commons/ClientOnly";
import { FaRobot, FaGlobe, FaBook, FaGamepad, FaChalkboardTeacher, FaRocket, FaMapMarkerAlt } from "react-icons/fa";
import citiesData from "../../../../content/cities.json";
import { GridBackground } from "@/components/commons/GridBackground";
import ContactSection from "@/components/Home/ContactSection";
import { normalizeImage } from "@/lib/media";
import { getCategoryGradient, getCategoryColor } from "@/lib/colors";

interface CityCatalogProps {
    businessSettings: any;
    generalSettings: any;
    allPosts: PostData[];
    city: { id: string, name: string };
}

// ... imports

const CATEGORIES = [
    { id: "Todos", label: "Todos", icon: null },
    { id: "AI", label: "AI Solutions", icon: FaRobot },
    { id: "WEB", label: "Web Services", icon: FaGlobe },
    { id: "GAME DEV", label: "Game Dev", icon: FaGamepad },
    { id: "BOOK", label: "Books", icon: FaBook },
    { id: "MENTORIA", label: "Mentoria", icon: FaChalkboardTeacher },
    { id: "ENTREPRENEUR", label: "Entrepreneur", icon: FaRocket },
];

const CityCatalogContent = ({
    businessSettings,
    allPosts,
    city
}: CityCatalogProps) => {
    const { t } = useLanguage();
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [filteredPosts, setFilteredPosts] = useState<PostData[]>(allPosts);

    // Filter posts when category changes
    useEffect(() => {
        if (selectedCategory === "Todos") {
            setFilteredPosts(allPosts);
        } else {
            setFilteredPosts(allPosts.filter((post) => post.category === selectedCategory));
        }
    }, [selectedCategory, allPosts]);

    return (
        <>
            <Head>
                <title>
                    Catálogo em {city.name} | {businessSettings.brandName}
                </title>
                <meta
                    name="description"
                    content={`Catálogo completo de soluções de IA, Web e Mentoria em ${city.name} por ${businessSettings.brandName}.`}
                />
                <meta name="robots" content="index, follow" />
            </Head>

            <div className="min-h-screen bg-[#f4ece4] text-[#1d2d44] relative catalog-page font-sans">
                {/* Background Grid */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <GridBackground inverted={false} />
                </div>

                <div className="relative z-10 flex flex-col min-h-screen">
                    {/* Header */}
                    <div className="pt-24 pb-12 px-6 bg-[#e6d8cc] border-b border-[#1d2d44]/10 shadow-sm">
                        <div className="max-w-7xl mx-auto px-6 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1d2d44]/15 bg-[#f4ece4] text-[#D47E30] font-semibold text-xs mb-6 uppercase tracking-widest shadow-sm">
                                <FaMapMarkerAlt />
                                Atendendo {city.name} e Região
                            </div>

                            <h1 className="text-4xl md:text-6xl font-normal text-[#1d2d44] mb-4" style={{ fontFamily: 'Federo, serif' }}>
                                Ensaios & Fotografia em <span className="text-[#D47E30]">{city.name}</span>
                            </h1>

                            <p className="text-base text-[#3b5068] max-w-2xl mx-auto font-sans leading-relaxed">
                                Produções editoriais, direção de arte e ensaios fine art disponíveis para clientes e projetos em {city.name}.
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="sticky top-0 z-40 bg-[#f4ece4]/90 backdrop-blur-md py-4 border-b border-[#1d2d44]/10 shadow-sm">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="flex flex-wrap justify-center gap-3 pb-2 md:pb-0">
                                {CATEGORIES.map((cat) => {
                                    const Icon = cat.icon;
                                    const isActive = selectedCategory === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`
                                        flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 border cursor-pointer
                                        ${isActive
                                                    ? 'bg-[#1d2d44] text-[#f4ece4] border-[#1d2d44] scale-105 shadow-md'
                                                    : 'bg-[#e6d8cc] text-[#1d2d44] border-[#1d2d44]/15 hover:bg-[#dcd0c4] hover:text-[#D47E30]'}
                                    `}
                                        >
                                            {Icon && <Icon className={isActive ? "text-[#D47E30]" : "text-[#3b5068]"} />}
                                            {cat.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="max-w-7xl mx-auto px-6 py-16">
                        {filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/cities/${city.id}/${post.slug}`}
                                        className="group flex flex-col bg-[#e6d8cc] rounded-2xl overflow-hidden border border-[#1d2d44]/15 hover:border-[#D47E30] hover:shadow-xl transition-all duration-300 h-full cursor-pointer relative shadow-sm"
                                    >
                                        <div className="aspect-video relative overflow-hidden bg-black/10">
                                            <img
                                                src={normalizeImage((post as any).featuredImage, post.title)}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = normalizeImage(null, post.title);
                                                }}
                                            />

                                            {/* Colored Badge */}
                                            <div className="absolute top-4 right-4 z-20 bg-[#D47E30] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                                {post.category || 'Geral'}
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-normal text-[#1d2d44] mb-2 group-hover:text-[#D47E30] transition-colors leading-tight" style={{ fontFamily: 'Federo, serif' }}>
                                                {post.title}
                                            </h3>

                                            <div className="text-[#3b5068] text-sm mb-6 line-clamp-3 font-sans leading-relaxed">
                                                {(post as any).description || `Produção autoral de ${post.category} disponível para ${city.name}. Clique para ver detalhes.`}
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-[#1d2d44]/10 flex items-center justify-between">
                                                <span className="text-xs text-[#D47E30] font-bold flex items-center gap-1">
                                                    <FaMapMarkerAlt /> {city.name}
                                                </span>
                                                <span className="text-xs text-[#1d2d44] font-bold uppercase tracking-wider group-hover:text-[#D47E30] transition-colors flex items-center gap-1">
                                                    Ver Detalhes &rarr;
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-32 border border-dashed border-white/10 rounded-3xl bg-white/5">
                                <h3 className="text-2xl font-bold text-white mb-2">Nenhum item encontrado</h3>
                                <p className="text-white/50">
                                    Não encontramos itens nesta categoria para {city.name}.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Contact Footer */}
                    <div className="relative z-10 w-full bg-black">
                        <ContactSection
                            contacts={[
                                { name: "LinkedIn", link: "https://www.linkedin.com/in/miltonbolonha/" },
                                { name: "GitHub", link: "https://github.com/miltonbolonha" },
                                { name: "Email", link: "contato@miltonbolonha.com.br", isMail: true },
                                { name: "Baixar Currículo", link: "/files/Curriculo 02072025.pdf", isDownload: true },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

const CityCatalog = (props: CityCatalogProps) => {
    return (
        <ClientOnly>
            <CityCatalogContent {...props} />
        </ClientOnly>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = citiesData.map((city) => ({
        params: { city: city.id },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<CityCatalogProps> = async ({ params }) => {
    const businessSettings = getBusinessSettings();
    const generalSettings = getGeneralSettings();
    const allPosts = getSortedPostsData();

    const city = citiesData.find(c => c.id === params?.city) || { id: 'sp', name: 'São Paulo' };

    return {
        props: {
            businessSettings,
            generalSettings,
            allPosts,
            city
        },
    };
};

export default CityCatalog;
